import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '@app/injection-tokens';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(BASE_URL) private baseUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/')) {
      req = req.clone({ url: this.baseUrl + req.url });
    }

    return next.handle(req);
  }
}
