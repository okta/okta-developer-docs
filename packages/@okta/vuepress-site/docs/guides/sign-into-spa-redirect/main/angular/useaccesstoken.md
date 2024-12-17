The recommended way to add your access token to HTTP calls in Angular is to use an interceptor. To follow security best practices, add the access token only on calls to allowed origins.

1. Create an [Angular interceptor](https://angular.dev/guide/http/interceptors) called `auth.interceptor`, using the CLI command `ng generate interceptor auth`.

2. Add the following imports into `app.config.ts`:

   ```ts
   import { provideHttpClient, withInterceptors } from '@angular/common/http';
   import { authInterceptor } from './auth.interceptor';
   ```

3. Register the interceptor in `app.config.ts` by adding the following into the `providers` array:

   ```ts
   provideHttpClient(withInterceptors([
      authInterceptor
    ]))
   ```

4. Update `auth.interceptor.ts` to add the access token when calling a trusted origin:

   ```ts
   import { inject } from '@angular/core';
   import { HttpInterceptorFn } from '@angular/common/http';
   import { OKTA_AUTH } from '@okta/okta-angular';

   export const authInterceptor: HttpInterceptorFn = (req, next, oktaAuth = inject(OKTA_AUTH)) => {
      let request = req;
      const allowedOrigins = ['http://localhost'];
      const accessToken = oktaAuth.getAccessToken();
      if (accessToken && !!allowedOrigins.find(origin => request.url.includes(origin))) {
         request = req.clone({ setHeaders: { 'Authorization': `Bearer {accessToken}` } });
       }

      return next(request);
   }
   ```

When making HTTP calls within allowed origins, you should now see the `Authorization` header.
