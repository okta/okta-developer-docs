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
    useInteractionCodeFlow: true,
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

Now that you have a shared service to start, control, and end the authentication state, use it to protect the endpoints of an app.

Create `src/app/app.guard.ts` that implements [`CanActivate`](https://angular.io/api/router/CanActivate):

```typescript
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from './app.service';

@Injectable({providedIn: 'root'})
export class OktaAuthGuard implements CanActivate {
  constructor(private okta: OktaAuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticated = await this.okta.isAuthenticated();
    if (authenticated) { return true; }

    // Redirect to login flow.
    this.okta.login(state.url);
    return false;
  }
}
```

Whenever a user attempts to access a route that is protected by `OktaAuthGuard`, it first checks to see if the user has been authenticated. If `isAuthenticated` returns `false`, the sign-in flow begins.

### Add Routes

Let's take a look at what routes are needed:

* `/`: A default page to handle basic control of the app.
* `/callback`: Handle the response back from Okta and store the returned tokens.
* `/protected`: A protected route by the `OktaAuthGuard`.

### `/`

First, update `src/app/app.component.ts` to inject the `OktaAuthService` into the component. This makes the service available within the component's template as the variable `oktaAuth`. Subscribe to the `Observable` exposed by the `OktaAuthService`. This keeps the variable `isAuthenticated` updated. We use this variable within the template to control visibility of the login and logout buttons.

```typescript
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'okta-app';
  isAuthenticated: boolean = false;
  constructor(public oktaAuth: OktaAuthService) {}

  ngOnInit(): void {
    this.oktaAuth.$isAuthenticated.subscribe(val => this.isAuthenticated = val);
  }
}
```

Next, update `src/app/app.component.html` with some buttons to trigger login or logout. Also add a link to the `/protected` route. There may be a large block of "placeholder" code in this file generated by the Angular CLI. You can safely remove this.

```html
<button routerLink="/"> Home </button>
<button *ngIf="!isAuthenticated" (click)="oktaAuth.login('/')"> Login </button>
<button *ngIf="isAuthenticated" (click)="oktaAuth.logout()"> Logout </button>
<button routerLink="/protected"> Protected </button>

<router-outlet></router-outlet>
```

### `/callback`

In order to handle the redirect back from Okta, we need to capture the token values from the URL. Use the `/callback` route to handle the logic of storing these tokens and redirecting back to the main page.

Create a new component `src/app/callback.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from './app.service';

@Component({ template: `` })
export class CallbackComponent implements OnInit {

  constructor(private okta: OktaAuthService) {}

  ngOnInit(): void {
    // Handles the response from Okta and parses tokens
    this.okta.handleAuthentication();
  }
}
```

### `/protected`

This route protects the `OktaAuthGuard`, only permitting authenticated users access with a valid `accessToken`.

Create a new component `src/app/protected.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-secure',
  template: `<h2>PROTECTED!</h2>`,
})
export class ProtectedComponent {}
```

### Connect the Routes

Add each of our new routes to `src/app/app-routing.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OktaAuthGuard } from './app.guard';
import { CallbackComponent } from './callback.component';
import { ProtectedComponent } from './protected.component';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [OktaAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

> **Note:** The path [/protected](#protected) uses the `canActivate` parameter to gate access to the route.

Update your `@NgModule` in `src/app/app.module.ts`:

* Import the newly created components
* Add the components to the array of `declarations`

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback.component';
import { ProtectedComponent } from './protected.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Run the sample application

Build and start the app. In the terminal:

```bash
npm start
```

After the server starts, this message appears in your terminal:

`** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **`
