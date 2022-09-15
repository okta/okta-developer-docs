
You have many options on where to store these configuration values. Whereever you place them, ultimately you need to create an object with the following properties:

```javascript
const appConfig = {
    "clientId": "0oa1kelclsb...",
    "issuer": "https://${yourOktaDomain}/oauth2/default",
    "redirectUri": "http://app.example.com/login/callback",
    "scopes": [
        "openid",
        "profile",
        ...
    ],
    "pkce": true
 };
```

And pass this object to  `OktaAuth ` during initialization.

```javascript
const oktaAuth = (() => {
  return new OktaAuth(appConfig);
})();
```

The [React sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/react-embedded-auth-with-sdk) supports the following options:

### Option 1: Directly in code

Set the configuration values directly in your code. For example, create a configuration file in your project with the name `config.js`. Add the settings to the default object.

```javascript
export default {
  clientId: `0oa1kelclsb...`,
  issuer: `https://${yourOktaDomain}/oauth2/default`,
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: [
    'openid',
    'profile',
    ...
  ],
  pkce: true
};
```

In another file where you are instantiating `OktaAuth`, import the file as a module. Pass it's default object into `OktaAuth`'s constructor.

```javascript
import appConfig from './config';

const oktaAuth = (() => {
  return new OktaAuth(appConfig);
})();
```

### Option 2: Environment variables

Add environment variables on the server-side for each of the settings. Use names such as:

* `ISSUER`
* `CLIENT_ID`

Access these values using the global `process.env` object. For example, use `process.env.ISSUER` to access the issuer setting. Use [webpack](https://webpack.js.org/), [vite](https://vitejs.dev/config/#environment-variables), or another bundler to access these environment variables from the browser.

### Option 3: External onfiguration file

Read the settings from a configuration file. This file  created on the server-side. For example, use the [dotenv](https://www.npmjs.com/package/dotenv) package and create an external configuration file that defines each setting.

```yaml
ISSUER=https://${yourOktaDomain}/oauth2/default
CLIENT_ID=0oa1kelclsb...
...
```

Since you are using dotenv, access these values through `process.env`. As mentioned in the previous option, use webpack, vite, or another bundler to access these values from the browser.
