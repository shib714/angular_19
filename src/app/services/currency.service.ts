import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Currency } from '../model/currency';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

export type ExchangeRates = Record<Currency, number>;

export interface CurrencyInfo {
  currency: Currency;
  exchangeRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private readonly currency = signal<Currency>("USD");
  private http = inject(HttpClient);
  private exchangeRates$ = this.http.get<ExchangeRates>('https://lp-store-server.vercel.app/rates');
  private exchangeRates = toSignal(this.exchangeRates$, { initialValue: { USD: 1, GBP: 1, EUR: 1 } });

  //computed signal is already readonly
  currencyInfo: Signal<CurrencyInfo> = computed(() => {
    return { currency: this.currency(), exchangeRate: this.exchangeRates()[this.currency()] };
  })

  getCurrencyInfo(): Signal<CurrencyInfo> {
    return this.currencyInfo;
  }
  // getCurrency(): Signal<Currency> {
  //   return this.currency.asReadonly();
  // }

  setCurrency(currency: Currency): void {
    this.currency.set(currency);
  }
}
