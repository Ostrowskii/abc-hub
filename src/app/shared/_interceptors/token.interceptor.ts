import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AI_TOKEN } from 'variables';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  noTokenRoutes = ['auth/local', 'auth/google'];
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token_jwt');
    const aiToken = AI_TOKEN;
    console.log(request);
    const isAIUrl = request.url.includes('prediction');
    const finded = this.noTokenRoutes.find((item) =>
      request.url.includes(item)
    );
    if (!finded) {
      if (isAIUrl) {
        request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + aiToken),
        });
      } else {
        request = request.clone({
          headers: request.headers.set('Authorization', 'bearer ' + token),
        });
      }
    }
    return next.handle(request);
  }
}
