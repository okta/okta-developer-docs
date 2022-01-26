The first step for any application is to install or embed the Widget. Best practice is to install locally through a package manager (for example, `npm`) for better performance and testing purposes.

### npm

```bash
# Run this command in your project root folder.
npm install @okta/okta-signin-widget@-=OKTA_REPLACE_WITH_WIDGET_VERSION=-
```

More information, including the latest published version, is available in the [Okta Sign-In Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-npm-module).

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

The sample application instantiates the Sign-In Widget in the `login.components.ts` file:

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
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
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
      useInteractionCodeFlow: sampleConfig.widget.useInteractionCodeFlow === 'true',
    });
  }
```

And references the Okta app configuration information in `app.config.js` or `env.js` and the `testenv` file:

```javascript
// Read environment variables from "testenv" in the repository root. Override environment vars if they are already set.
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
