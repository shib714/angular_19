import { Component, inject, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../model/vehicle';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { VehicleDataSource } from './vehicle-datasource';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vehicle-selection',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    JumbotronComponent,
    MatTableModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule,
  ],
  templateUrl: './vehicle-selection.component.html',
  styleUrl: './vehicle-selection.component.scss'
})
export class VehicleSelectionComponent {

  displayedColumns: string[] = ['name', 'model', 'cost_in_credits', 'cargo_capacity','created'];

  private vehicleService = inject(VehicleService);

  vehicles: Signal<Vehicle[]> = this.vehicleService.vehicles;
  dataSource = new MatTableDataSource<Vehicle>();


 // dataSource = new VehicleDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vehicle>;


  selectedVehicle: WritableSignal<Vehicle | undefined> = this.vehicleService.selectedVehicle;
  quantity: WritableSignal<1 | 0> = this.vehicleService.quantity;
  total: Signal<number> = this.vehicleService.total;

  color: Signal<'blue' | 'green'> = this.vehicleService.color;

  ngOnInit() {
    this.dataSource.connect().subscribe({
      next: (data: any) => this.dataSource = new MatTableDataSource(data),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }

  ngAfterViewInit(): void {

    console.log(this.vehicles())
    //console.log(this.dataSource)   
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

}
