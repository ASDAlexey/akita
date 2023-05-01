import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BASE_URL } from '@app/injection-tokens';
import { BaseUrlInterceptor } from '@app/interceptors/base-url.interceptor';
import { CartModule } from '@cart/cart.module';
import { CartComponent } from '@cart/containers/cart/cart.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '@env/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    environment.production ? [] : AkitaNgDevtools.forRoot({ maxAge: 25 }),
    AkitaNgRouterStoreModule,
    CartModule,
    RouterModule.forRoot([{ path: '', component: CartComponent }] as Routes)
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.BASE_URL },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
