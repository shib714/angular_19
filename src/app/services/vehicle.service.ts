import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { VehicleResponse } from '../model/vehicle-response';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';
  private http: HttpClient = inject(HttpClient);
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  quantity = linkedSignal({
    source: this.selectedVehicle,
    computation: (vehicle) => {
      if (vehicle) {
        return 1;
      }
      return 0;
    }
  });

  total = computed(() => (this.selectedVehicle()?.cost_in_credits ?? 0) * this.quantity()); //readonly signal
  color = computed(() => this.total() > 50000 ? 'green' : 'blue');

  vehicleResource = rxResource({
    loader: () => this.http.get<VehicleResponse>(this.vehicleUrl).pipe(
      map(vr => vr.results)
    )
  });

  vehicles = computed(() => this.vehicleResource.value() ?? [] as Vehicle[]);
}
