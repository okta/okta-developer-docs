---
title: Okta Sign-In Widget and Angular
language: Angular
excerpt: Integrate Okta with an Angular application using the Sign-In Widget.
icon: code-angular
---

This guide walks you through integrating authentication into an Angular application with Okta by performing these steps:

- [Prerequisites](#prerequisites)
- [Add an OpenID Connect Client](#add-an-openid-connect-client)
- [Create an Angular App](#create-an-angular-app)
- [Install Dependencies](#install-dependencies)
- [Create Routes](#create-routes)
  - [`/`](#index-page)
  - [`/protected`](#protected)
  - [`/login`](#login)
  - [Connect the Routes](#connect-the-routes)
- [Start your App](#start-your-app)
- [Conclusion](#conclusion)
- [Support](#support)

## Prerequisites

If you don't already have a  **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client

* Sign in to the Admin Console, and select **Create New App**. <br/>
You can sign in to the Admin Console using <https://login.okta.com>, and then click **Admin**.
* Choose **Single-Page Application** as the platform, and then populate your new OpenID Connect application with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| Application Name     | OpenId Connect App (must be unique)                 |
| Login redirect URIs  | `http://localhost:4200/login/callback`              |
| Logout redirect URIs | `http://localhost:4200/login`                       |
| Allowed grant types  | Authorization Code                                  |

Replace `${clientId}` placeholders further in this tutorial with the `Client ID` of the created application.

> **Note:** It's important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret that public clients aren't designed to have, hence breaking the sign-in or sign-out flow.

## Create an Angular App

To quickly create an Angular app, we recommend the **Angular CLI**.

```bash
npm install -g @angular/cli
ng new okta-app --routing
```

If you need more information, see [the Angular CLI installation guide](https://github.com/angular/angular-cli#installation).

## Install dependencies

A simple way to add authentication into an Angular app is using the library [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/). We can install it through `npm`:

```bash
cd okta-app
npm install @okta/okta-signin-widget
```

To easily interact with the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/), we also need [`@okta/okta-angular`](https://github.com/okta/okta-angular/):

```bash
npm install @okta/okta-angular
```

> **Note:** If you're using **Angular 6.x**, you need to install `rxjs-compat`:

```bash
npm install rxjs-compat
```

## Create Routes

Some routes require authentication to render. Defining these protected routes is easy with the `OktaAuthGuard` from `@okta/okta-angular`. Let's take a look at what routes are required for this example, using [Angular Router](https://angular.io/guide/router):

* `/`: A default page to handle basic control of the app.
* `/protected`: A protected route that only the authenticated user can access.
* `/login`: A custom sign-in page to handle signing users into your app.

### `/ - index page`

First, update `src/app/app.component.html` to provide the Login logic, replacing `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget (-=OKTA_REPLACE_WITH_WIDGET_VERSION=-):

```html
<!-- src/app/app.component.html -->


<!-- Latest CDN production CSS -->
<link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>

<button routerLink="/"> Home </button>
<button *ngIf="!isAuthenticated" routerLink="/login"> Login </button>
<button *ngIf="isAuthenticated" (click)="logout()"> Logout </button>
<button routerLink="/protected"> Protected </button>

<router-outlet></router-outlet>
```

Then, update `src/app/app.component.ts` to handle the `logout()` call:

```typescript
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.signInWithRedirect({
      originalUri: '/profile'
    });
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.signOut();
    this.router.navigateByUrl('/');
  }
}
```

### `/protected`

This route is only visible to users with a valid `accessToken` or `idToken`.

Create a new component `src/app/protected.component.ts`:


```typescript
// src/app/protected.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-secure',
  template: `{{message}}`
})
export class ProtectedComponent {
  message;

  constructor() {
    this.message = 'Protected endpoint!';
  }
}
```

When a user attempts to access a route that is protected by `OktaAuthGuard`, it first checks to see if the user is authenticated. If `isAuthenticated()` returns `false`, start the login flow.

### `/login`

This route hosts the Sign-In Widget and redirects if the user is already signed in. If the user is coming from a protected page, they are redirected back to the page upon completing the sign-in flow.

Create a new component `src/app/login.component.ts`:

```typescript
// src/app/login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import { Tokens } from '@okta/okta-auth-js';
//@ts-ignore
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-secure',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <div id="okta-signin-container"></div>
  `
})
export class LoginComponent implements OnInit {
  authService;
  widget = new OktaSignIn({
    el: '#okta-signin-container',
    baseUrl: 'https://${yourOktaDomain}',
    authParams: {
      pkce: true
    },
         clientId: '${clientId}',
         redirectUri: 'http://localhost:4200/login/callback'
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.authService = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch(event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  async ngOnInit() {
    const originalUri = this.authService.getOriginalUri();
    if (!originalUri) {
      this.authService.setOriginalUri('/');
    }

    const tokens: Tokens = await this.widget.showSignInToGetTokens({
      el: '#okta-signin-container',
    });
    this.authService.handleLoginRedirect(tokens);
    this.widget.hide();
  }
}
```

### Connect the Routes

The `OktaAuthModule` handles different authentication flows for your application, so it requires your OpenID Connect configuration. By default `okta/okta-angular` redirects to the Okta Sign-In Page when the user isn't authenticated. We override this behavior by passing an `onAuthRequired` function to the `OktaAuthGuard`. See [Using a custom login-page](https://github.com/okta/okta-angular#using-a-custom-login-page).

Update `src/app/app.module.ts` to include your project components and routes. Your completed file should look similar to:

```typescript
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected.component';
import { LoginComponent } from './login.component';

const config = {
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  clientId: '${clientId}',
  pkce: true
}

export function onAuthRequired(oktaAuth: OktaAuthService, injector: Injector) {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const appRoutes: Routes = [
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Start your App

Finally, start your application by running:

```bash
npm start
```

## Conclusion

You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

Want to learn how to use the user's `access_token`? Check out our <a href='/docs/guides/sign-into-spa-redirect/angular/main' data-proofer-ignore>how to guide</a>.
