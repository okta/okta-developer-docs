The recommended way to add your access token to HTTP calls in Angular is to use an interceptor. To follow security best practices, the access token should only be added on calls to allowed origins.

Create an [Angular interceptor](https://angular.io/guide/http#intercepting-requests-and-responses) and register the interceptor in the `AppModule`.

Update the interceptor to add the access code when calling a trusted origin.

```ts
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
    if(!!allowedOrigins.find(origin => request.url.includes(origin))) {
      const authToken = this._oktaAuth.getAccessToken();
      req = request.clone({ setHeaders: { 'Authorization': `Bearer ${authToken}` } });
    }

    return req;
  }
}
```