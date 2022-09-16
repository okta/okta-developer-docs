There are many different ways to store these configuration values. Wherever you place them, ultimately, you need to create an object with the following properties:

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

The [React sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/react-embedded-auth-with-sdk) supports setting the configuration values in the following locations:

### Directly in code

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

### Environment variables

Add environment variables on the server-side for each of the settings. Use names such as:

* `ISSUER`
* `CLIENT_ID`

Access these values using the global `process.env` object. For example, use `process.env.ISSUER` to access the issuer setting. Use [webpack](https://webpack.js.org/), [vite](https://vitejs.dev/config/#environment-variables), or another bundler to access these environment variables from the browser.

### External configuration file

Read the settings from a configuration file that's created on the server-side. For example, use the [dotenv](https://www.npmjs.com/package/dotenv) package and create an external configuration file that defines each setting.

```yaml
ISSUER=https://${yourOktaDomain}/oauth2/default
CLIENT_ID=0oa1kelclsb...
...
```

With dotenv you can access these values through `process.env`. As mentioned in the previous option, use webpack, vite, or another bundler to access these same environment variables from the browser.
