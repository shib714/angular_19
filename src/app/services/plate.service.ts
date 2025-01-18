import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LicensePlate } from '../model/license-plate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  url: string = 'https://lp-store-server.vercel.app/data';

  http: HttpClient = inject(HttpClient);

  fetchPlates(): Observable<LicensePlate[]> {
    return this.http.get<LicensePlate[]>(this.url);
  }
}
