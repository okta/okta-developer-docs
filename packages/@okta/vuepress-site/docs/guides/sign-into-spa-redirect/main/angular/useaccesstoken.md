The recommended way to add your access token to HTTP calls in Angular is to use an interceptor. To follow security best practices, the access token should only be added on calls to allowed origins.

1. Create an [Angular interceptor](https://angular.io/guide/http#intercepting-requests-and-responses) called `auth.interceptor`, using the CLI command `ng generate interceptor auth`.

2. Add the following imports into `app.module.ts`:

   ```ts
   import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
   import { AuthInterceptor } from './auth.interceptor';
   ```

3. Register the interceptor in `app.module.ts` by adding the following into the `providers` array:

   ```ts
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
   ```

4. Update `auth.interceptor.ts` to add the access code when calling a trusted origin:

   ```ts
   import { Inject, Injectable } from '@angular/core';
   import {
     HttpRequest,
     HttpHandler,
     HttpEvent,
     HttpInterceptor
   } from '@angular/common/http';
   import { Observable } from 'rxjs';
   import { OKTA_AUTH } from '@okta/okta-angular';
   import { OktaAuth } from '@okta/okta-auth-js';

   @Injectable()
   export class AuthInterceptor implements HttpInterceptor {

     constructor(@Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) {}

     intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
       return next.handle(this.addAuthHeaderToAllowedOrigins(request));
     }

     private addAuthHeaderToAllowedOrigins(request: HttpRequest<unknown>): HttpRequest<unknown> {
       let req = request;
       const allowedOrigins = ['http://localhost'];
       if (!!allowedOrigins.find(origin => request.url.includes(origin))) {
         const authToken = this._oktaAuth.getAccessToken();
         req = request.clone({ setHeaders: { 'Authorization': `Bearer {authToken}` } });
       }

       return req;
     }
   }
   ```

When making HTTP calls within allowed origins, you should now see the `Authorization` header.
