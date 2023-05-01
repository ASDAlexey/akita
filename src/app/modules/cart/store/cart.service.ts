import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyPairsRates } from '@cart/store/cart.model';
import { CartStore } from '@cart/store/cart.store';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient, private cartStore: CartStore) {}

  loadCurrencyPairsRates(pairs: string[]): Observable<Record<CurrencyPairsRates, number>> {
    const data = this.getCurrencyPairsRatesFromStorage();

    if (data) {
      const diffInSec = (Date.now() - data.date) / 1000;

      return diffInSec > 3600 ? this.loadCurrencyPairsRatesFromAPI(pairs) : of(data.currencyPairsRates);
    } else {
      return this.loadCurrencyPairsRatesFromAPI(pairs);
    }
  }

  loadCurrencyPairsRatesFromAPI(pairs: string[]): Observable<Record<CurrencyPairsRates, number>> {
    return this.http
      .get<{ rates: Record<keyof CurrencyPairsRates, string>; date: string; base: 'USD' }>(`/latest`, {
        params: { apikey: environment.CURRENCY_FREAKS_API_KEY }
      })
      .pipe(
        map(data => data.rates),
        map((rates: Record<string, string>) => {
          return pairs.reduce((acc, currency) => {
            return { ...acc, [`USD${currency}`]: +rates[currency] };
          }, {} as Record<CurrencyPairsRates, number>);
        }),
        tap(currencyPairsRates => this.saveCurrencyPairsRatesToStorage(currencyPairsRates))
      );
  }

  private saveCurrencyPairsRatesToStorage(currencyPairsRates: Record<CurrencyPairsRates, number>) {
    localStorage.setItem('currencyPairsRates', JSON.stringify({ currencyPairsRates, date: Date.now() }));
  }

  private getCurrencyPairsRatesFromStorage(): {
    currencyPairsRates: Record<CurrencyPairsRates, number>;
    date: number;
  } | null {
    const currencyPairsRates = localStorage.getItem('currencyPairsRates');

    if (currencyPairsRates) {
      return JSON.parse(currencyPairsRates);
    } else {
      return null;
    }
  }
}
