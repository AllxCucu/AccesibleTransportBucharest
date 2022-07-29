import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LinesProxy2 } from '../dtos/AllLines.dtos';
import { BusProxy } from '../dtos/Bus.dto';
import { LinesProxy } from '../dtos/Lines.dto';
import { LinesEntityProxy } from '../dtos/LinesEntityProxy.dto';
import { VehicleProxy } from '../dtos/Vehicle.dto';

@Injectable({
  providedIn: 'root'
})
export class TbApiService {
  serverUrl: String;

  constructor(private http: HttpClient) {
    this.serverUrl = "https://info.stbsa.ro/rp/api/lines";
  }

  getAllBusses(): Observable<LinesProxy2> {
    return this.http.get<LinesProxy2>(this.serverUrl + '/');
  }

  getBusInformations(id: string, direction: number): Observable<BusProxy> {
    return this.http.get<BusProxy>(this.serverUrl + '/' + id + "/direction/" + direction);
  }

  getRealTimeData(busId: number, stopId: number): Observable<LinesProxy[]> {
    return this.http.get<LinesProxy[]>(this.serverUrl + '/' + busId + '/stops/' + stopId);
  }

  GetVehicles(busId: string, direction: number): Observable<VehicleProxy[]> {
    return this.http.get<VehicleProxy[]>(this.serverUrl + '/' + busId + '/vehicles/' + direction);
  }
}