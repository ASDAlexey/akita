import { Injectable } from '@angular/core';
import { CurrencyPairsRates } from '@cart/services/cart.repository';
import { Product } from '@cart/store/cart.model';
import { Query } from '@datorama/akita';
import { Currencies } from '@shared/helpers/app.constants';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartState, CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartQuery extends Query<CartState> {
  readonly products$ = of(
    [{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1035 }].map((item, index) => this.createProduct(item, index)) as Product[]
  );
  readonly totalProductsPrice$ = this.products$.pipe(map(products => products.reduce((acc, product) => acc + product.price, 0)));
  readonly activeCurrency$ = new BehaviorSubject(Currencies.USD);
  readonly currencyPairsRates$ = new BehaviorSubject({} as Record<CurrencyPairsRates, number>);

  constructor(protected override store: CartStore) {
    super(store);
  }

  // constructor(private sessionStore: CartStore, private http: HttpClient) {
  // this.store$.dispatch(loadSelectedCart({ data: [{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1035 }] }));
  // this.store$.dispatch(loadCurrencyPairsRates({ pairs: ['RUB', 'EUR', 'GBP', 'JPY'] }));
  // }

  setActiveCurrency(activeCurrency: Currencies): void {
    // this.store$.dispatch(setActiveCurrency({ activeCurrency }));
    this.activeCurrency$.next(activeCurrency);
  }

  private createProduct(data: { price: number }, index: number): Product {
    return {
      ...data,
      uuid: crypto.randomUUID(),
      name: 'Product name ' + (index + 1),
      image: 'https://picsum.photos/id/' + index * 10 + '/200/200',
      createdAt: new Date().toISOString()
    };
  }
}
