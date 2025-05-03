import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const csrfToken = cookieService.get('XSRF-TOKEN');

  const tenantID =
    typeof window !== 'undefined'
      ? localStorage.getItem('tenant_id') || ''
      : '';

  let headers = req.headers;

  if (csrfToken) headers = headers.set('X-XSRF-TOKEN', csrfToken);

  if (tenantID) {
    headers = headers.set('X-Organization', tenantID);
  }

  const authReq = req.clone({ headers, withCredentials: true });

  return next(authReq);
};
