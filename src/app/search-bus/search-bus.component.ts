import { Component, OnInit } from '@angular/core';
import * as haversineDistance from 'haversine-distance';
import { ToastrService } from 'ngx-toastr';
import { LinesEntityProxy2, LinesProxy2 } from '../dtos/AllLines.dtos';
import { BusProxy } from '../dtos/Bus.dto';
import { LinesProxy } from '../dtos/Lines.dto';
import { LinesEntityProxy } from '../dtos/LinesEntityProxy.dto';
import { StopsEntityProxy } from '../dtos/Stops.dto';
import { VehicleProxy } from '../dtos/Vehicle.dto';
import { TbApiService } from '../services/tb-api.service';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  bus: BusProxy;
  filteredStops: StopsEntityProxy[] = [];
  allStops: StopsEntityProxy[] = [];
  lines: LinesEntityProxy[] = [];
  busNumber: string = "";
  allLines: LinesProxy2;
  filteredLines: LinesEntityProxy2[] = [];
  selectedStop: StopsEntityProxy;
  filterTerm: string = '';
  vehicles: VehicleProxy[] = [];
  vehicleDistance: number = 0;
  direction: number = 0;
  directionName: string = '';
  allStopsFromCity: StopsEntityProxy[] = [];
  vehicleNearStation: string = '';

  directionsView: boolean = false;
  stopsView: boolean = false;
  realTimeView: boolean = false;
  searchView: boolean = true;

  constructor(private api: TbApiService, private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.api.getAllBusses()
      .subscribe((data: LinesProxy2) => {
        this.allLines = data;
        this.filteredLines = this.allLines.lines;
      },
        (err) => this.toastr.error("Nu se poate face conexiunea cu serverul"));
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

  public getRealTimeData(stop: StopsEntityProxy) {
    if (this.selectedStop == null) {
      this.selectedStop = stop;
    }
    this.api.getRealTimeData(this.bus.id, stop.id)
      .subscribe((data: LinesProxy[]) => {
        this.lines = data[0].lines != null ?
          data[0].lines : this.lines;
        // console.log(JSON.stringify(this.lines));
      });
    this.realTimeView = true;
    this.stopsView = false;

    this.checkDistance();
  }

  private checkDistance() {
    this.computeVehicleDistance();
    this.vehicleDistance = this.vehicleDistance | 0;
    this.api.GetVehicles(this.bus.id + '', this.direction)
      .subscribe((data: VehicleProxy[]) =>
        this.vehicles = data,
        (err) => this.toastr.error("Nu se poate face conexiunea cu serverul"));
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
        // console.log("vehicle - current" + haversineDistance(vehicleLocation, current) +
        // "selected - current" + haversineDistance(selectedLocation, current));
        if ((haversineDistance(previousCurrent, selectedLocation) >= haversineDistance(vehicleLocation, selectedLocation)) &&
          (haversineDistance(vehicleLocation, selectedLocation) >= haversineDistance(current, selectedLocation))) {
          // (haversineDistance(vehicleLocation, current) <= haversineDistance(selectedLocation, current))) {
          this.vehicleNearStation = tempStop.name;
          this.vehicleDistance = haversineDistance(selectedLocation, vehicleLocation);
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
    this.vehicleDistance = 0;
  }
}
