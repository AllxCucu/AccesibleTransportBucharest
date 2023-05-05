import { Component, OnInit } from '@angular/core';
import * as haversineDistance from 'haversine-distance';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LinesEntityProxy2, LinesProxy2 } from '../dtos/AllLines.dtos';
import { BusProxy } from '../dtos/Bus.dto';
import { LinesProxy } from '../dtos/Lines.dto';
import { LinesEntityProxy } from '../dtos/LinesEntityProxy.dto';
import { SavedData } from '../dtos/saved-data.dto';
import { StopsEntityProxy } from '../dtos/Stops.dto';
import { VehicleProxy } from '../dtos/Vehicle.dto';
import { LocalService } from '../services/local.service';
import { TbApiService } from '../services/tb-api.service';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  test: string = "";
  bus: BusProxy;
  allStops: StopsEntityProxy[] = [];
  filteredStops: StopsEntityProxy[] = [];
  lines: LinesEntityProxy[] = [];
  busNumber: string = "";
  allLines: LinesProxy2;
  filteredLines: LinesEntityProxy2[] = [];
  savedData: SavedData[] = [];
  savedDirectionName: string = '';
  selectedStop!: StopsEntityProxy;
  filterTerm: string = '';
  vehicles: VehicleProxy[] = [];
  vehicleDistance: string = '0';
  direction: number = 0;
  directionName: string = '';
  vehicleNearStation: string = '';
  linesRealTyme: string = '';
  distanceToStation: string = '';

  directionsView: boolean = false;
  stopsView: boolean = false;
  realTimeView: boolean = false;
  searchView: boolean = true;

  constructor(private api: TbApiService, private toastr: ToastrService, private localStore: LocalService) {
  }

  ngOnInit(): void {
    this.api.getAllBusses()
      .subscribe((data: LinesProxy2) => {
        this.allLines = data;
        this.filteredLines = this.allLines.lines;
      },
        (err) => this.toastr.error("Nu se poate face conexiunea cu serverul"));
    this.savedData = this.localStore.getData();
  }

  public filterLines(value: String) {
    this.filteredLines = this.allLines.lines.filter((line: LinesEntityProxy2) => line.name.toLowerCase().includes(value.toLowerCase())
    );
    this.searchView = true;
  }

  public getBus(busNumber: string) {
    this.clearData();
    this.busNumber = busNumber;
    let busId: string = '';
    let notfound: Boolean = true;
    this.allLines.lines?.forEach((el: LinesEntityProxy2) => {
      if (el.name.toUpperCase() == this.busNumber.toUpperCase()) {
        busId = el.id + '';
        notfound = false;
      }
    });
    if (notfound) {
      this.toastr.error("eroare", "Linia cautata nu a fost gasita");
      return;
    }
    this.api.getBusInformations(busId, 1)
      .subscribe((data: BusProxy) => {
        this.bus = data;
      },
        (err) => this.toastr.error("Nu se poate face conexiunea cu serverul"));
    this.directionsView = true;
    this.searchView = false;
    this.stopsView = false;
    this.realTimeView = false;
  }

  public getStations(direction: number) {
    this.direction = direction;
    this.directionName = !direction ? this.bus.direction_name_tur : this.bus.direction_name_retur;
    this.api.getBusInformations(this.bus.id.toString(), direction)
      .subscribe((data: BusProxy) => {
        this.allStops = data.stops != null ?
          data.stops : [];
        this.filteredStops = this.allStops;
        // console.log(JSON.stringify(this.allStops));
      });
    this.api.GetVehicles(this.bus.id + '', this.direction)
      .subscribe((data: VehicleProxy[]) =>
        this.vehicles = data);

    this.directionsView = true;
    this.stopsView = true;
    this.realTimeView = false;
  }

  public filterStops(value: string): void {
    this.filteredStops = this.allStops.filter((val) =>
      val.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  public getRealBySavedData(stop: SavedData) {
    this.direction = stop.direction;
    this.bus = stop.bus;
    this.directionName = stop.direction ? this.bus.direction_name_tur : this.bus.direction_name_retur;
    this.selectedStop = stop.stop;
    this.getStations(this.direction);
    this.getRealTimeData(stop.stop, false);
  }

  public getRealTimeData(stop: StopsEntityProxy, fromOnline: boolean) {
    this.selectedStop = stop;
    let test: string = "";
    this.getPosition().subscribe((position) => {
      this.api.getLocation(position.coords.latitude, position.coords.longitude)
        .subscribe((location: any) => {
          this.test = location[0].display_name;
        });
      this.distanceToStation = haversineDistance({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }, {
        lat: this.selectedStop.lat,
        lng: this.selectedStop.lng
      }).toFixed(0);
      //  position.coords.latitude + " longitudine " + position.coords.longitude;
    });
    if (fromOnline) {
      let dataForSave = new SavedData(this.direction, this.directionName, this.bus, stop);
      this.localStore.saveData(dataForSave);
      this.savedData = this.localStore.getData();
    }
    this.api.getRealTimeData(this.bus.id, stop.id)
      .subscribe((data: LinesProxy[]) => {
        this.lines = data[0].lines != null ?
          data[0].lines : this.lines;

        this.linesRealTyme = '';
        this.lines.forEach((value) => {
          this.linesRealTyme += value.name + ' | ' + value.arriving_time / 60 + ' min';
          if (value.is_timetable) {
            this.linesRealTyme += ' estimat';
          } else {
            this.linesRealTyme += ' real';
          }
          this.linesRealTyme += '\r';
        });
        // console.log(JSON.stringify(this.lines));
      });
    this.realTimeView = true;
    this.directionsView = true;
    this.stopsView = false;
    this.searchView = false;
    this.checkDistance();
  }

  private checkDistance() {
    if (this.allStops.length == 0)
      return;

    this.api.GetVehicles(this.bus.id + '', this.direction)
      .subscribe((data: VehicleProxy[]) => {
        this.vehicles = data;
        this.computeVehicleDistance();
      }, (err) => this.toastr.error("Nu se poate face conexiunea cu serverul"));
  }

  private computeVehicleDistance() {
    let previousCurrent = {
      lat: this.allStops[0].lat,
      lng: this.allStops[0].lng
    };
    let selectedLocation = {
      lat: this.selectedStop.lat,
      lng: this.selectedStop.lng
    };

    let tempStop: StopsEntityProxy = this.allStops[0];
    for (let stop of this.allStops) {

      let current = {
        lat: stop.lat,
        lng: stop.lng
      };
      this.vehicles.forEach((el: VehicleProxy) => {
        let vehicleLocation = {
          lat: el.lat,
          lng: el.lng
        };
        if ((haversineDistance(previousCurrent, selectedLocation) >= haversineDistance(vehicleLocation, selectedLocation)) &&
          (haversineDistance(vehicleLocation, selectedLocation) >= haversineDistance(current, selectedLocation))) {
          // (haversineDistance(vehicleLocation, this.allStops[0]) <= haversineDistance(selectedLocation, this.allStops[0]))) {
          this.vehicleNearStation = tempStop.name;
          this.vehicleDistance = haversineDistance(selectedLocation, vehicleLocation).toFixed(0);
        }
      });

      if (stop.id == this.selectedStop.id)
        break;

      previousCurrent = {
        lat: stop.lat,
        lng: stop.lng
      };
      tempStop = stop;
    }
  }

  private clearData() {
    this.filteredStops = [];
    this.lines = [];
    this.directionsView = false;
    this.stopsView = false;
    this.realTimeView = false;
    this.filterTerm = "";
    this.vehicleNearStation = '';
    this.vehicleDistance = '0';
  }

  getPosition(): Observable<any> {
    return Observable.create((observer: any) => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => observer.error(error));
    });
  }
}
