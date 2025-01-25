import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Currency } from '../../../model/currency';
import { CurrencyInfo, CurrencyService } from '../../../services/currency.service';

@Component({
  selector: 'app-currency-switcher',
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    FormsModule,
    MatButtonModule, 
    MatMenuModule],
  templateUrl: './currency-switcher.component.html',
  styleUrl: './currency-switcher.component.scss'
})
export class CurrencySwitcherComponent {

  showItems: boolean = false;

  currencyService: CurrencyService = inject(CurrencyService);

  currencyInfo: Signal<CurrencyInfo> = this.currencyService.getCurrencyInfo();

  changeCurrency(currency: Currency) : void {
    this.currencyService.setCurrency(currency);
    this.showItems = false;
  }

}
