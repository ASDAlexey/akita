import { Injectable } from '@angular/core';
import { CurrencyPairsRates, Product } from '@cart/services/cart.service';
import { Currencies } from '@shared/helpers/app.constants';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartFacadeService {
  products$ = of([] as Product[]);
  totalProductsPrice$ = of(0);
  activeCurrency$ = of(Currencies.USD);
  currencyPairsRates$ = of({} as Record<CurrencyPairsRates, number>);

  // constructor(private store$: Store<CartState>) {
  //   this.store$.dispatch(loadSelectedCart({ data: [{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1035 }] }));
  //   this.store$.dispatch(loadCurrencyPairsRates({ pairs: ['RUB', 'EUR', 'GBP', 'JPY'] }));
  // }

  setActiveCurrency(activeCurrency: Currencies): void {
    // this.store$.dispatch(setActiveCurrency({ activeCurrency }));
  }
}
