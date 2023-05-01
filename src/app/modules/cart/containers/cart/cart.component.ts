import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyPairsNames } from '@cart/store/cart.model';
import { CartQuery } from '@cart/store/cart.query';
import { CartService } from '@cart/store/cart.service';
import { Currencies } from '@shared/helpers/app.constants';

@Component({
  selector: 'cc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  currencyPairsNames = CurrencyPairsNames;
  currencies = Currencies;

  products$ = this.cartQuery.products$;
  totalProductsPrice$ = this.cartQuery.totalProductsPrice$;
  activeCurrency$ = this.cartQuery.activeCurrency$;
  currencyPairsRates$ = this.cartQuery.currencyPairsRates$;

  constructor(private cartService: CartService, private cartQuery: CartQuery) {}

  setActiveCurrency(activeCurrency: Currencies): void {
    this.cartService.setActiveCurrency(activeCurrency);
  }
}
