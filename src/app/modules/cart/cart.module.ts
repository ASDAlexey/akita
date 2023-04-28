import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CurrencyButtonComponent } from './components/currency-button/currency-button.component';
import { CurrencySymbolComponent } from './components/currency-symbol/currency-symbol.component';
import { ProductComponent } from './components/product/product.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { CartComponent } from './containers/cart/cart.component';
import { PriceInfoPipe } from './pipes/priceInfo.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
    // StoreModule.forFeature('cart', reducer),
    // EffectsModule.forFeature([CartEffects]),
    // ReactiveComponentModule,
  ],
  declarations: [CartComponent, PriceInfoPipe, CurrencySymbolComponent, CurrencyButtonComponent, ProductComponent, TotalPriceComponent],
  exports: [CartComponent]
})
export class CartModule {}
