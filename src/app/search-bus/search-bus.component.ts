import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { LinesEntityProxy2, LinesProxy2 } from '../dtos/AllLines.dtos';
import { BusProxy } from '../dtos/Bus.dto';
import { LinesProxy } from '../dtos/Lines.dto';
import { LinesEntityProxy } from '../dtos/LinesEntityProxy.dto';
import { StopsEntityProxy } from '../dtos/Stops.dto';
import { TbApiService } from '../services/tb-api.service';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  bus: BusProxy;
  stops: StopsEntityProxy[] = [];
  allStops: StopsEntityProxy[] = [];
  lines: LinesEntityProxy[] = [];
  busNumber: string = "";
  allLines: LinesProxy2;
  selectedStop: StopsEntityProxy;
  filterTerm = '';
  directionsView: boolean = false;
  stopsView: boolean = false;
  realTimeView: boolean = false;

  constructor(private api: TbApiService, private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.api.getAllBusses()
      .subscribe((data: LinesProxy2) => {
        this.allLines = data;
      });
  }

  public getBus() {
    this.clearData();
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
      });
    this.directionsView = true;
    this.stopsView = false;
    this.realTimeView = false;
  }

  public getStations(direction: number) {
    this.api.getBusInformations(this.bus.id.toString(), direction)
      .subscribe((data: BusProxy) => {
        this.allStops = data.stops != null ?
          data.stops : [];
        this.stops = this.allStops;
      });
    this.directionsView = true;
    this.stopsView = true;
    this.realTimeView = false
  }

  public filterStops(value: string): void {
    this.stops = this.allStops.filter((val) =>
      val.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  public getRealTimeData(stop: StopsEntityProxy) {
    this.selectedStop = stop;
    this.filterTerm = "";
    this.api.getRealTimeData(this.bus.id, stop.id)
      .subscribe((data: LinesProxy[]) => {
        this.lines = data[0].lines != null ?
          data[0].lines : [];
        // console.log(JSON.stringify(this.lines));
      });
    this.realTimeView = true;
    this.stopsView = false;
  }

  private clearData() {
    this.stops = [];
    this.lines = [];
    this.directionsView = false;
    this.stopsView = false;
    this.realTimeView = false;
    this.filterTerm = "";
  }
}
