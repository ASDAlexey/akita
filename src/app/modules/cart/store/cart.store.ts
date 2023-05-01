import { Injectable } from '@angular/core';
import { CurrencyPairsRates, Product } from '@cart/store/cart.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Status } from '@shared/constants/app.constants';
import { Currencies } from '@shared/helpers/app.constants';

export interface CartState {
  currencyPairsRates: Record<CurrencyPairsRates, number>;
  activeCurrency: Currencies;
  statusCurrencyPairsRate: Status;
  ids: string[];
  entities: Record<string, Product>;
  error: string | null;
}

export function createInitialState(): CartState {
  return {
    currencyPairsRates: {} as Record<CurrencyPairsRates, number>,
    activeCurrency: Currencies.USD,
    statusCurrencyPairsRate: Status.UNINITIALIZED,
    ids: [],
    entities: {},
    error: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cart' })
export class CartStore extends Store<CartState> {
  constructor() {
    super(createInitialState());
  }
}
