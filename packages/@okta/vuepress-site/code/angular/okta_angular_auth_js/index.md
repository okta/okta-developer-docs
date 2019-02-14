---
title: Okta Auth JS and Angular
language: Angular
excerpt: Integrate Okta with an Angular application using Auth JS.
---

# Overview

This guide will walk you through integrating authentication and authorization into an Angular application with Okta.

## Prerequisites

If you do not already have a  **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

### Add an OpenID Connect Client

* Log into the Okta Developer Dashboard, and **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect application with values similar to:

| Setting             | Value                                               |
| ------------------- | --------------------------------------------------- |
| Application Name    | OpenId Connect App *(must be unique)*               |
| Login redirect URIs | http://localhost:4200/callback                      |
| Logout redirect URIs| http://localhost:4200/login                         |

> **Note:** CORS is automatically enabled for the granted login redirect URIs.

## Create an Angular App

To quickly create an Angular app, install the Angular CLI:

```bash
npm install -g @angular/cli
```

Now, create a new application:

```bash
ng new okta-app
```

This creates a new project named `okta-app` and installs all required dependencies.

The simplest way to add authentication into an Angular app is using the library [Okta Auth JS](/code/javascript/okta_auth_sdk). We can install it via `npm`:

```bash
npm install @okta/okta-auth-js --save
```

## Create an Authentication Service

Users can sign in to your Angular application a number of different ways.
The easiest, and most secure way is to use the **default login page**. This page renders the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget), equipped to handle User Lifecycle operations, MFA, and more.

First, create `src/app/app.service.ts` as an authorization utility file and use it to bootstrap the required fields to login:

> Important: We're using Okta's organization authorization server to make setup easy, but it's less flexible than a custom authorization server. Most SPAs send access tokens to access APIs. If you're building an API that will need to accept access tokens, [create an authorization server](/authentication-guide/implementing-authentication/set-up-authz-server).

```typescript
// app.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as OktaAuth from '@okta/okta-auth-js';

@Injectable()
export class OktaAuthService {

  oktaAuth = new OktaAuth({
    url: 'https://{yourOktaDomain}',
    clientId: '{clientId}',
    issuer: 'https://{yourOktaDomain}/oauth2/{authServerId}',
    redirectUri: 'http://localhost:4200/callback',
  });

  constructor(private router: Router) {}

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.oktaAuth.tokenManager.get('accessToken'));
  }

  login() {
    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
    const tokens = await this.oktaAuth.token.parseFromUrl();
    tokens.forEach(token => {
      if (token.idToken) {
        this.oktaAuth.tokenManager.add('idToken', token);
      }
      if (token.accessToken) {
        this.oktaAuth.tokenManager.add('accessToken', token);
      }
    });
  }

  async logout() {
    this.oktaAuth.tokenManager.clear();
    await this.oktaAuth.signOut();
  }
}
```

## Create an Authorization Guard

Now that you have a shared service to start, control, and end the authentication state, use it to protect the endpoints of an app.

Create `src/app/app.guard.ts` that implements [`CanActivate`](https://angular.io/api/router/CanActivate):

```typescript
// app.guard.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from './app.service';

@Injectable()
export class OktaAuthGuard implements CanActivate {
  oktaAuth;
  authenticated;
  constructor(private okta: OktaAuthService, private router: Router) {
    this.authenticated = okta.isAuthenticated()
    this.oktaAuth = okta;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) { return true; }

    // Redirect to login flow.
    this.oktaAuth.login();
    return false;
  }
}
```

Whenever a user attempts to access a route that is protected by `OktaAuthGuard`, it first checks to see if the user has been authenticated. If `isAuthenticated()` returns `false`, start the login flow.

Finally, inject the guard and service into `src/app/app.module.ts` so we can use it in any declared routes:

```typescript
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Okta Guard and Service
import { OktaAuthGuard } from './app.guard';
import { OktaAuthService } from './app.service';
```

## Add Routes

Lets take a look at what routes are needed:

* `/`: A default page to handle basic control of the app.
* `/callback`: Handle the response back from Okta and store the returned tokens.
* `/protected`: A protected route by the `OktaAuthGuard`.

### `/`

First, update `src/app/app.component.html` to provide the Login logic:

```html
<!-- app.component.html -->

<button routerLink="/"> Home </button>
<button *ngIf="!oktaAuth.isAuthenticated()" (click)="oktaAuth.login()"> Login </button>
<button *ngIf="oktaAuth.isAuthenticated()" (click)="oktaAuth.logout()"> Logout </button>
<button routerLink="/protected"> Protected </button>

<router-outlet></router-outlet>
```

Then, update `src/app/app.component.ts` to handle the `login()` and `logout()` calls:

```typescript
// app.component.ts

import { Component } from '@angular/core';
import { OktaAuthService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public oktaAuth: OktaAuthService) {}
}
```

### `/callback`

In order to handle the redirect back from Okta, we need to capture the token values from the URL. Use the `/callback` route to handle the logic of storing these tokens and redirecting back to the main page.

Create a new component `src/app/callback.component.ts`:

```typescript
// callback.component.ts

import { Component } from '@angular/core';
import { OktaAuthService } from './app.service';

@Component({ template: `` })
export class CallbackComponent {

  constructor(private okta: OktaAuthService) {
    // Handles the response from Okta and parses tokens
    okta.handleAuthentication();
  }
}
```

### `/protected`

This route will be protected by the `OktaAuthGuard`, only permitting users with a valid `accessToken`.

```typescript
// protected.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-secure',
  template: ``
})
export class ProtectedComponent {
  constructor() { console.log("Protected endpont!"); }
}
```

### Connect the Routes

Add each of our new routes to `src/app/app.module.ts`:

```typescript
// app.module.ts

import { CallbackComponent } from './callback.component';
import { ProtectedComponent } from './protected.component';
...

const appRoutes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ]
  }
]
```

*Notice how the path [/protected](#protected) uses the `canActivate` parameter to gate access to the route.*

Finally, update your `@NgModule` to include your project components and routes in `src/app/app.module.ts`:

```typescript
// app.module.ts

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    OktaAuthGuard,
    OktaAuthService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
```

## Conclusion

You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/api/resources/oidc).

Want to learn how to use the user's `access_token`? Check out our <a href='/quickstart/#/angular/nodejs/generic' data-proofer-ignore>Angular Quickstart integrations</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support

Have a question or see a bug? Post your question on [Okta Developer Forums](https://devforum.okta.com/).
