import { Component, input, output } from '@angular/core';
import { LicensePlate } from '../../model/license-plate';
import { CurrencyInfo } from '../../services/currency.service';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-plate-store',
  imports: [CurrencyPipe, MatCardModule, MatButtonModule],
  templateUrl: './plate-store.component.html',
  styleUrl: './plate-store.component.scss'
})
export class PlateStoreComponent {

  plate = input.required<LicensePlate>();
  //TODD:  handle exchange rates for each currency using endpoint https://lp-store-server.vercel.app/rates
  currencyInfo = input.required<CurrencyInfo>();

  buttonText = input<string>("");

  buttonClicked = output<LicensePlate>();

}
