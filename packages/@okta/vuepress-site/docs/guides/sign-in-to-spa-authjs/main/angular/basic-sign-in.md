xyz

### Create an Authentication Service

In this example, users can sign in to your Angular application through the custom sign-in form in your Angular application or the form you created earlier.

To build an authentication service, create `src/app/app.service.ts` as an authorization utility file and use it to bootstrap the required fields to sign in.

> **Important:** We're using Okta's organization authorization server to make set up easy, but it's less flexible than a custom authorization server. Many SPAs send access tokens to access APIs. If you're building an API that will need to accept access tokens, [create an authorization server](/docs/guides/customize-authz-server/).

```typescript
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';

@Injectable({providedIn: 'root'})
export class OktaAuthService {

  // IMPORTANT!
  // Replace ${clientId} with your actual Client ID
  // Replace ${yourOktaDomain} with your actual Okta domain
  // If using a custom authorization server, ISSUER should be 'https://${yourOktaDomain}/oauth2/${authorizationServerId}'

  CLIENT_ID = '${clientId}';
  ISSUER = 'https://${yourOktaDomain}'
  LOGIN_REDIRECT_URI = 'http://localhost:4200/callback';
  LOGOUT_REDIRECT_URI = 'http://localhost:4200/';

  oktaAuth = new OktaAuth({
    clientId: this.CLIENT_ID,
    issuer: this.ISSUER,
    redirectUri: this.LOGIN_REDIRECT_URI,
    pkce: true
  });

  $isAuthenticated: Observable<boolean>;
  private observer?: Observer<boolean>;
  constructor(private router: Router) {
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
      this.isAuthenticated().then(val => {
        observer.next(val);
      });
    });
  }

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.oktaAuth.tokenManager.get('accessToken'));
  }

  login(originalUrl: string) {
    // Save current URL before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
    const tokenContainer = await this.oktaAuth.token.parseFromUrl();

    this.oktaAuth.tokenManager.add('idToken', tokenContainer.tokens.idToken as IDToken);
    this.oktaAuth.tokenManager.add('accessToken', tokenContainer.tokens.accessToken as AccessToken);

    if (await this.isAuthenticated()) {
      this.observer?.next(true);
    }

    // Retrieve the saved URL and navigate back
    const url = sessionStorage.getItem('okta-app-url') as string;
    this.router.navigateByUrl(url);
  }

  async logout() {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: this.LOGOUT_REDIRECT_URI
    });
  }
}
```



### Create an Authorization Guard





### Add Routes



### Run the sample application?