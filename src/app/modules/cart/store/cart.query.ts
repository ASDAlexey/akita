import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { CartState, CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartQuery extends Query<CartState> {
  readonly currencyPairsRates$ = this.select('currencyPairsRates');
  readonly activeCurrency$ = this.select('activeCurrency');
  readonly products$ = this.select(['ids', 'entities']);
  readonly totalProductsPrice$ = this.products$.pipe(map(({ ids, entities }) => ids.reduce((acc, id) => acc + entities[id].price, 0)));

  constructor(protected override store: CartStore) {
    super(store);
  }
}
