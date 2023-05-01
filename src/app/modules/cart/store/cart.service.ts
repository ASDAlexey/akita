import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyPairsRates, Product } from '@cart/store/cart.model';
import { CartStore } from '@cart/store/cart.store';
import { environment } from '@env/environment';
import { Currencies } from '@shared/helpers/app.constants';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient, private store: CartStore) {
    this.loadSelectedCart([20, 45, 67, 1035]);
    this.loadCurrencyPairsRates(['RUB', 'EUR', 'GBP', 'JPY']).subscribe(currencyPairsRates => {
      this.setCurrencyPairsRates(currencyPairsRates);
    });
  }

  setCurrencyPairsRates(currencyPairsRates: Record<CurrencyPairsRates, number>): void {
    this.store.update({ currencyPairsRates });
  }

  setActiveCurrency(activeCurrency: Currencies): void {
    this.store.update({ activeCurrency });
  }

  loadSelectedCart(prices: number[]): void {
    const products = prices.map((item, index) => this.createProduct(item, index));
    const ids = products.map(product => product.uuid);
    const entities = products.reduce((acc, product) => {
      return { ...acc, [product.uuid]: product };
    }, {} as Record<number, Product>);
    this.store.update({ entities, ids });
  }

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

  private createProduct(price: number, index: number): Product {
    return {
      price,
      uuid: crypto.randomUUID(),
      name: 'Product name ' + (index + 1),
      image: 'https://picsum.photos/id/' + index * 10 + '/200/200',
      createdAt: new Date().toISOString()
    };
  }
}
