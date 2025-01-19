import { Component, inject, Signal, WritableSignal } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';

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
    CurrencyPipe,
  ],
  templateUrl: './vehicle-selection.component.html',
  styleUrl: './vehicle-selection.component.scss'
})
export class VehicleSelectionComponent {

  displayedColumns: string[] = ['name', 'model', 'cost_in_credits', 'cargo_capacity','created'];

  private vehicleService = inject(VehicleService);

  vehicles: Signal<Vehicle[]> = this.vehicleService.vehicles;

  selectedVehicle: WritableSignal<Vehicle | undefined> = this.vehicleService.selectedVehicle;
  quantity: WritableSignal<1 | 0> = this.vehicleService.quantity;
  total: Signal<number> = this.vehicleService.total;

  color: Signal<'blue' | 'green'> = this.vehicleService.color;

}
