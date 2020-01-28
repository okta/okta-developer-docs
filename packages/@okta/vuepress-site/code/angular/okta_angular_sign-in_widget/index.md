---
title: Okta Sign-In Widget and Angular
language: Angular
excerpt: Integrate Okta with an Angular application using the Sign-In Widget.
component: Code
---

# <i class='icon-48 docsPage code-angular'></i> Overview

This guide will walk you through integrating authentication into an Angular application with Okta by performing these steps:

1. [Add an OpenID Connect Client in Okta](#add-an-openid-connect-client)
2. [Create an Angular App](#create-an-angular-app)
3. [Install Dependencies](#install-dependencies)
4. [Create Routes](#create-routes)
5. [Connect the Routes](#connect-the-routes)
6. [Start your App](#start-your-app)

## Prerequisites

If you do not already have a  **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client

* Log into the Okta Developer Dashboard, and **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect application with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| Application Name     | OpenId Connect App *(must be unique)*               |
| Login redirect URIs  | http://localhost:4200/callback                      |
| Logout redirect URIs | http://localhost:4200/login                         |
| Allowed grant types  | Authorization Code                                  |

## Create an Angular App

To quickly create an Angular app, we recommend the **angular-cli**. Follow [their installation guide](https://github.com/angular/angular-cli#installation) to create a new Angular app.

## Install Dependencies

A simple way to add authentication into an Angular app is using the library [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/). We can install it via `npm`:

```bash
cd okta-app
npm install @okta/okta-signin-widget --save
```

To easily interact with the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/), we will also need [`@okta/okta-angular`](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular/):

```bash
npm install @okta/okta-angular --save
```

> If you're using **Angular 6.x**, you'll need to install `rxjs-compat`:

```bash
npm install rxjs-compat --save
```

## Create Routes

Some routes require authentication in order to render. Defining these protected routes is easy with the `OktaAuthGuard` from `@okta/okta-angular`. Lets take a look at what routes are required for this example, using [Angular Router](https://angular.io/guide/router):

* `/`: A default page to handle basic control of the app.
* `/protected`: A protected route that can only be accessed by an authenticated user.
* `/login`: A custom login page to handle signing users into your app.

### `/`

First, update `src/app/app.component.html` to provide the Login logic:

```html
<!-- src/app/app.component.html -->


<!-- Latest CDN production CSS -->
<link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>

<button routerLink="/"> Home </button>
<button *ngIf="!isAuthenticated" routerLink="/login"> Login </button>
<button *ngIf="isAuthenticated" (click)="logout()"> Logout </button>
<button routerLink="/protected"> Protected </button>

<router-outlet></router-outlet>
```

Then, update `src/app/app.component.ts` to handle the `logout()` call:

```typescript
// src/app/app.component.ts

export class AppComponent {
  isAuthenticated: boolean;

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
    this.oktaAuth.loginRedirect('/profile');
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }
}
```

### `/protected`

This route will only be visible to users with a valid `accessToken` or `idToken`.

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


When a user attempts to access a route that is protected by `OktaAuthGuard`, it first checks to see if the user has been authenticated. If `isAuthenticated()` returns `false`, start the login flow.

### `/login`

This route hosts the Sign-In Widget and redirects if the user is already logged in. If the user is coming from a protected page, they'll be redirected back to the page upon login.

Create a new component `src/app/login.component.ts`:

```typescript
// src/app/login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-secure',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <div id="okta-signin-container"></div>
  `
})
export class LoginComponent {
  signIn;
  widget = new OktaSignIn({
    baseUrl: 'https://${yourOktaDomain}',
    authParams: {
      pkce: true
    }
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.signIn = oktaAuth;

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

  ngOnInit() {
    this.widget.renderEl({
      el: '#okta-signin-container'},
      (res) => {
        if (res.status === 'SUCCESS') {
          this.signIn.loginRedirect('/', { sessionToken: res.session.token });
          // Hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
  }
}
```

### Connect the Routes

The `OktaAuthModule` handles different authentication flows for your application, so it requires your OpenID Connect configuration. By default `okta/okta-angular` redirects to the Okta Sign-In Page when the user is not authenticated. We override this behavior by passing an `onAuthRequired` function to the `OktaAuthGuard`. For more information, see [using a custom login-page](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular#using-a-custom-login-page).

Update `src/app/app.module.ts` to include your project components and routes. Your completed file should look similar to:

```typescript
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected.component';
import { LoginComponent } from './login.component';

const config = {
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '{clientId}',
  pkce: true
}

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const appRoutes: Routes = [
  {
    path: 'implicit/callback',
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
    OktaAuthModule.initAuth(config)
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

Want to learn how to use the user's `access_token`? Check out our <a href='/quickstart/#/angular/nodejs/generic' data-proofer-ignore>Angular Quickstart integrations</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support

Have a question or see a bug? Post your question on [Okta Developer Forums](https://devforum.okta.com/).
