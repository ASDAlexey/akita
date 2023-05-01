import { Injectable } from '@angular/core';
import { CurrencyPairsRates } from '@cart/services/cart.repository';
import { Product } from '@cart/store/cart.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Status } from '@shared/constants/app.constants';
import { Currencies } from '@shared/helpers/app.constants';

export interface CartState {
  activeCurrency: Currencies;
  currencyPairsRates: Record<CurrencyPairsRates, number>;
  statusCurrencyPairsRate: Status;
  ids: number[];
  entities: Record<number, Product>;
  error: string | null;
}

export function createInitialState(): CartState {
  return {
    activeCurrency: Currencies.USD,
    currencyPairsRates: {} as Record<CurrencyPairsRates, number>,
    statusCurrencyPairsRate: Status.UNINITIALIZED,
    error: null,
    ids: [],
    entities: {}
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cart' })
export class CartStore extends Store<CartState> {
  constructor() {
    super(createInitialState());
  }
}
