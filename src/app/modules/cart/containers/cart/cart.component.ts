import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartRepository, CurrencyPairsNames } from '@cart/services/cart.repository';
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

  products$ = this.cartService.products$;
  totalProductsPrice$ = this.cartService.totalProductsPrice$;
  activeCurrency$ = this.cartService.activeCurrency$;
  currencyPairsRates$ = this.cartService.currencyPairsRates$;

  constructor(private cartService: CartService, private cartRepository: CartRepository) {
    this.cartRepository.loadCurrencyPairsRates(['RUB', 'EUR', 'GBP', 'JPY']).subscribe(currencyPairsRates => {
      this.cartService.currencyPairsRates$.next(currencyPairsRates);
    });
  }

  setActiveCurrency(activeCurrency: Currencies): void {
    this.cartService.setActiveCurrency(activeCurrency);
  }
}
