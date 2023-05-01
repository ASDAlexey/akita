import { Injectable } from '@angular/core';
import { CartStore } from '@cart/store/cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private cartStore: CartStore) {}
}
