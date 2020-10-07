---
title: Okta Auth JS and Angular
language: Angular
excerpt: Integrate Okta with an Angular application using Auth JS.
icon: code-angular
---


This guide will walk you through integrating authentication and authorization into an Angular application using the [Okta Auth SDK](https://github.com/okta/okta-auth-js).

> The Auth SDK is a lower level SDK than the [Okta Angular SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular), which builds upon the Auth SDK to implement many of the features shown in this guide. Our complete [Angular Sample Apps](https://github.com/okta/samples-js-angular) are built using the Angular SDK. For a simple integration, we generally recommend using the Angular SDK. However, in certain cases it may be preferable to use the Auth SDK directly, as shown here.

## Prerequisites

If you do not already have a  **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

### Add an OpenID Connect Client

* Sign in to the Okta Developer Dashboard, and select **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect application with appropriate values for your app. For example:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| Application Name     | OpenId Connect App (must be unique)                 |
| Login redirect URIs  | `http://localhost:4200/callback`                    |
| Logout redirect URIs | `http://localhost:4200`                             |
| Allowed grant types  | Authorization Code                                  |

> **Note:** CORS is automatically enabled for the granted login redirect URIs.

## Create an Angular App

To create an Angular app, open a terminal and install the Angular CLI:

```bash
npm install -g @angular/cli
```

Now, create a new application using the Angular CLI:

```bash
ng new okta-app
```

When asked `Would you like to add Angular routing?`, press "y"

For this example we are using `CSS` as the style engine. If you would like to use `SCSS` or another style engine, you may need to make a few adjustments to the code snippets shown in this guide.

After all prompts have been answered, the Angular CLI will create a new project in a folder named `okta-app` and installs all required dependencies.

```bash
cd okta-app
```

Install the [Okta Auth SDK](https://github.com/okta/okta-auth-js) using `npm`:

```bash
npm install @okta/okta-auth-js --save
```

## Create an Authentication Service

Users can sign in to your Angular application a number of different ways.
The easiest, and most secure way is to use the **default login page**. This page renders the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/), equipped to handle User Lifecycle operations, MFA, and more.

First, create `src/app/app.service.ts` as an authorization utility file and use it to bootstrap the required fields to login:

> Important: We're using Okta's organization authorization server to make setup easy, but it's less flexible than a custom authorization server. Many SPAs send access tokens to access APIs. If you're building an API that will need to accept access tokens, [create an authorization server](/docs/guides/customize-authz-server/).

```typescript
// app.service.ts

import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as OktaAuth from '@okta/okta-auth-js';

@Injectable()
export class OktaAuthService {

  // IMPORTANT!
  // Replace {clientId} with your actual Client ID
  // Replace {yourOktaDomain} with your actual Okta domain
  // If using a custom authorization server, ISSUER should be 'https://{yourOktaDomain}/oauth2/${authServerId}'

  CLIENT_ID = '{clientId}';
  ISSUER = 'https://{yourOktaDomain}'
  LOGIN_REDIRECT_URI = 'http://localhost:4200/callback';
  LOGOUT_REDIRECT_URI = 'http://localhost:4200/';

  oktaAuth = new OktaAuth({
    clientId: this.CLIENT_ID,
    issuer: this.ISSUER,
    redirectUri: this.LOGIN_REDIRECT_URI,
    pkce: true
  });

  $isAuthenticated: Observable<boolean>;
  private observer: Observer<boolean>;
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

  login(originalUrl) {
    // Save current URL before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
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

    if (await this.isAuthenticated()) {
      this.observer.next(true);
    }

    // Retrieve the saved URL and navigate back
    const url = sessionStorage.getItem('okta-app-url');
    this.router.navigateByUrl(url);
  }

  async logout() {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: this.LOGOUT_REDIRECT_URI
    });
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

Whenever a user attempts to access a route that is protected by `OktaAuthGuard`, it first checks to see if the user has been authenticated. If `isAuthenticated()` returns `false`, the login flow will be started.

## Add Routes

Let's take a look at what routes are needed:

* `/`: A default page to handle basic control of the app.
* `/callback`: Handle the response back from Okta and store the returned tokens.
* `/protected`: A protected route by the `OktaAuthGuard`.

### `/`

First, update `src/app/app.component.ts` to inject the `OktaAuthService` into the component. This will make the service available within the component's template as the variable `oktaAuth`. Subscribe to the `Observable` exposed by the `OktaAuthService`. This will keep the variable `isAuthenticated` updated. We will use this variable within the template to control visibility of the login and logout buttons.

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
  isAuthenticated: boolean;
  constructor(public oktaAuth: OktaAuthService) {}

  ngOnInit() {
    this.oktaAuth.$isAuthenticated.subscribe(val => this.isAuthenticated = val);
  }
}

```

Next, update `src/app/app.component.html` with some buttons to trigger login or logout. Also add a link to the `/protected` route. There may be a large block of "placeholder" code in this file generated by the Angular CLI. You can safely remove this.

```html
<!-- app.component.html -->

<button routerLink="/"> Home </button>
<button *ngIf="!isAuthenticated" (click)="oktaAuth.login()"> Login </button>
<button *ngIf="isAuthenticated" (click)="oktaAuth.logout()"> Logout </button>
<button routerLink="/protected"> Protected </button>

<router-outlet></router-outlet>

```

### `/callback`

In order to handle the redirect back from Okta, we need to capture the token values from the URL. Use the `/callback` route to handle the logic of storing these tokens and redirecting back to the main page.

Create a new component `src/app/callback.component.ts`:

```typescript
// callback.component.ts

import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from './app.service';

@Component({ template: `` })
export class CallbackComponent implements OnInit {

  constructor(private okta: OktaAuthService) {}

  ngOnInit() {
    // Handles the response from Okta and parses tokens
    this.okta.handleAuthentication();
  }
}

```

### `/protected`

This route will be protected by the `OktaAuthGuard`, only permitting authenticated users with a valid `accessToken`.

```typescript
// protected.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-secure',
  template: ``
})
export class ProtectedComponent {
  constructor() { console.log('Protected endpont!'); }
}
```

### Connect the Routes

Add each of our new routes to `src/app/app-routing.module.ts`:

```typescript
// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OktaAuthGuard } from './app.guard';
import { CallbackComponent } from './callback.component';
import { ProtectedComponent } from './protected.component';

const routes: Routes = [{
  path: 'callback',
  component: CallbackComponent
}, {
  path: 'protected',
  component: ProtectedComponent,
  canActivate: [ OktaAuthGuard ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

*Notice how the path [/protected](#protected) uses the `canActivate` parameter to gate access to the route.*

Update your `@NgModule` in `src/app/app.module.ts`:

* Import OktaAuthGuard, OktaAuthService, and the newly created components
* Add the components to the array of `declarations`
* Add the guard and service to the array of `providers`

```typescript
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Okta Guard and Service
import { OktaAuthGuard } from './app.guard';
import { OktaAuthService } from './app.service';

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
  providers: [
    OktaAuthGuard,
    OktaAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Build and start the app. In the terminal:

```bash
npm start
```

After the server is started, this message will appear in your terminal:

`** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **`

## Conclusion

You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

Want to learn how to use the user's `access_token`? Check out our <a href='/docs/guides/sign-into-spa/angular/before-you-begin/' data-proofer-ignore>how to guide</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support

Have a question or see a bug? Post your question on the [Okta Developer Forums](https://devforum.okta.com/).
