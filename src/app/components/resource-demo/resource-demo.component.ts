import { Component, effect, resource, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Lesson } from '../../model/lesson';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { VehicleResponse } from '../../model/vehicle-response';
import { Vehicle } from '../../model/vehicle';

@Component({
  selector: 'app-resource-demo',
  imports: [MatProgressSpinner],
  templateUrl: './resource-demo.component.html',
  styleUrl: './resource-demo.component.scss'
})
export class ResourceDemoComponent {
  private vehicleUrl = 'https://swapi.py4e.com/api';
  //private http: HttpClient = inject(HttpClient);

  search = signal<string>('');

  vehicles = resource<Vehicle[], {search:string}>({

    request: () => ({
      search: this.search()
      
    }),
    loader: async ({request, abortSignal}) => {

        const response = await
        // fetch(`${this.env.apiRoot}/search-lessons?query=${request.search}&courseId=18`,
       
          fetch(`${this.vehicleUrl}/starships/${request.search}`,
          {
            signal: abortSignal
          });
      const json = await response.json();
      return json.vehicles;
    }
  });

//  async getVehicle(id: string): Promise<Vehicle> {

//     const vehicle = this.vehicles.find((vehicle: { id: string; }) => vehicle.id === id);
//     if(!vehicle) {
//       throw new Error('Contact not found');
//     }
//     return vehicle;
//   }





  constructor() {

    effect(() => {
      console.log('searching vehicles:', this.search() );
    })
  }

  searchVehicles(search: string) {
    this.search.set(search);
  }

  reset() {

  }

  reload() {

  }

}
