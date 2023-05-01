import { Injectable } from '@angular/core';
import { CurrencyPairsRates, Product } from '@cart/services/cart.service';
import { Currencies } from '@shared/helpers/app.constants';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartFacadeService {
  products$ = of([{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1035 }] as Product[]);
  totalProductsPrice$ = this.products$.pipe(map(products => products.reduce((acc, product) => acc + product.price, 0)));
  activeCurrency$ = new BehaviorSubject(Currencies.USD);
  currencyPairsRates$ = of({} as Record<CurrencyPairsRates, number>);

  constructor() {
    // this.store$.dispatch(loadSelectedCart({ data: [{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1035 }] }));
    // this.store$.dispatch(loadCurrencyPairsRates({ pairs: ['RUB', 'EUR', 'GBP', 'JPY'] }));
  }

  setActiveCurrency(activeCurrency: Currencies): void {
    // this.store$.dispatch(setActiveCurrency({ activeCurrency }));
    this.activeCurrency$.next(activeCurrency);
  }
}
