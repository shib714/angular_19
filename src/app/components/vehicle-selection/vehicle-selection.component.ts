import { Component, inject, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../model/vehicle';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
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
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { TableDataSource } from './table-datasource';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
    RouterModule,
    CommonModule,
    DatePipe,
    CurrencyPipe,
  ],

  templateUrl: './vehicle-selection.component.html',
  styleUrl: './vehicle-selection.component.scss'
})
export class VehicleSelectionComponent {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
   displayedColumns = ['name', 'model', 'manufacturer', 'cost_in_credits', 'cargo_capacity', 'vehicle_class', 'created',  'actions'];

  vehicleService = inject(VehicleService);
  vehicles = this.vehicleService.vehicles;

  routerService = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vehicle>;
  dataSource = new TableDataSource();


  selectedVehicle: WritableSignal<Vehicle | undefined> = this.vehicleService.selectedVehicle;
  quantity: WritableSignal<1 | 0> = this.vehicleService.quantity;
  total: Signal<number> = this.vehicleService.total;

  color: Signal<'blue' | 'green'> = this.vehicleService.color;

  ngAfterViewInit(): void {
    console.log("TableComponent dataSource: " + this.dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  navigateToLicensePlate(): void {
    this.routerService.navigate(['/store-view']);
  }

}
