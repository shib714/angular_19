import { Component, inject, Signal } from '@angular/core';
import { CurrencyInfo, CurrencyService } from '../../services/currency.service';
import { Currency } from '../../model/currency';

@Component({
  selector: 'app-currency-switcher',
  imports: [],
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
