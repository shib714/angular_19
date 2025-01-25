import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Signal, inject } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../model/vehicle';

export class VehicleDataSource extends DataSource<Vehicle> {

  private vehicleService = inject(VehicleService);
  //vehicles: Signal<Vehicle[]> = this.vehicleService.vehicles;
  data: Vehicle[] = this.vehicleService.vehicles();
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;


  constructor() {    
    super();
    console.log('VehicleDataSource: ', this.data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Vehicle[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Vehicle[]): Vehicle[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Vehicle[]): Vehicle[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);        
        case 'model': return compare(a.model, b.model, isAsc);
        case 'manufacturer': return compare(a.manufacturer, b.manufacturer, isAsc);
        case 'cargo_capacity': return compare(a.cargo_capacity, b.cargo_capacity, isAsc);
        case 'vehicle_class': return compare(a.vehicle_class, b.vehicle_class, isAsc);
        case 'cost_in_credits': return compare(+a.cost_in_credits, +b.cost_in_credits, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'created': return compare(a.created, b.created, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

