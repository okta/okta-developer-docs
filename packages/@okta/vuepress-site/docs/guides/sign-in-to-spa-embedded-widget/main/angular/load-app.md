The first step for any application is to install or embed the widget. Best practice is to install locally through a package manager (for example, `npm`) for better performance and testing purposes.

### npm

To install the [latest version of the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases) locally through `npm`, run the following command in your project root folder:

```bash
npm install @okta/okta-signin-widget@latest
```

See also [Using the npm module](https://github.com/okta/okta-signin-widget#using-the-npm-module). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

### Add styles

To add or customize application styles, you need to update the `angular.json` config file. You can do so manually or at the terminal.

#### Terminal

 Run the following command. This replaces all existing styles, so you need to add any existing style files to this command.

```shell
ng config projects.okta-signin-test.architect.build.options.styles '["src/styles.css", "./node_modules/@okta/okta-signin-widget/dist/css/okta-sign-in.min.css"]'
```

#### Angular.json

Add the styles manually by opening `src/angular.json`, and updating `projects.custom-login.architect.options`. When complete, the configuration appears as follows:

```json
"options": {
            "outputPath": "dist/custom-login",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css",
              "./node_modules/@okta/okta-signin-widget/dist/css/okta-sign-in.min.css"
            ],
            "scripts": []
          },
```

### Sample application code

The sample application adds the Okta Sign-In Widget in the `apps.module.ts` file:

```JavaScript
providers: [
    {
      provide: OKTA_CONFIG,
      useFactory: () => {
        const oktaAuth = new OktaAuth(config.oidc);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const router = injector.get(Router);
            // Redirect the user to your custom login page
            router.navigate(['/login']);
          }
        }
      }
    },
    { provide: APP_BASE_HREF, useValue: environment.appBaseHref },
  ]
```

The Sign-In Widget is instantiated in the `login.components.ts` file:

```javascript
import { Component, OnInit } from '@angular/core';
import { OktaAuth, Tokens } from '@okta/okta-auth-js';

// @ts-ignore
import * as OktaSignIn from '@okta/okta-signin-widget';
import sampleConfig from '../app.config';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signIn: any;
  constructor(public oktaAuth: OktaAuth) {
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, you still
       * need to configure the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: sampleConfig.oidc.issuer.split('/oauth2')[0],
      clientId: sampleConfig.oidc.clientId,
      redirectUri: sampleConfig.oidc.redirectUri,
      logo: 'assets/angular.svg',
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Angular & Company',
        },
      },
      authClient: oktaAuth,
    });
  }

  ngOnInit() {
    // When navigating to a protected route, the route path is saved as the `originalUri`
    // If no `originalUri` has been saved, then redirect back to the app root
    const originalUri = this.oktaAuth.getOriginalUri();
    if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
      this.oktaAuth.setOriginalUri('/');
    }

    // Search for URL Parameters to see if a user is being routed to the application to recover password
    var searchParams = new URL(window.location.href).searchParams;
    this.signIn.otp = searchParams.get('otp');
    this.signIn.state = searchParams.get('state');

    this.signIn.showSignInToGetTokens({
      el: '#sign-in-widget',
      scopes: sampleConfig.oidc.scopes
    }).then((tokens: Tokens) => {
      // Remove the widget
      this.signIn.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
  }

  ngOnDestroy() {
    this.signIn.remove();
  }
}
```

And references the Okta app configuration information in `app.config.js` or in the `env.js` and the `testenv` files:

```javascript
// Read environment variables from "testenv" in the repository root.
// Override environment vars if they are already set.
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const TESTENV = path.resolve(__dirname, 'testenv');
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}
process.env.CLIENT_ID = process.env.CLIENT_ID || process.env.SPA_CLIENT_ID;
process.env.USE_INTERACTION_CODE = process.env.USE_INTERACTION_CODE || false;
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you are using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: sampleConfig.widget.useInteractionCodeFlow === 'true'` inside the `OktaSignIn()` constructor call shown above. If you are using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `useClassicEngine: sampleConfig.widget.useClassicEngine === 'true'` in the `OktaSignIn()` constructor call.
