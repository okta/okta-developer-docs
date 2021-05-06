
In your application code, build a config object. This is used to initialize the Okta services with the values specific to your application:

```javascript
const config = {
  clientId: '{clientId}',
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  redirectUri: 'http://localhost:8080/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
```

You can also build it from dynamic values like environment variables:

```javascript
const OKTA_DOMAIN = process.env.DOMAIN;
const CLIENT_ID = process.env.CLIENT_ID;
const CALLBACK_PATH = '/login/callback';

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = 'openid profile email';

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES.split(/\s+/)
};
```

> **Note:**
>
> `openid`, `profile`, and `email` are reserved scopes in OpenID Connect that allow you to get access to user's data. You can read more about scopes [here](/docs/reference/api/oidc/#scopes).
>
> The `issuer` in the configuration above points to the default [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server),
which is created by default with the [Okta Developer Edition](https://developer.okta.com/signup/) account.
See [Which Authorization Server should you use](/docs/concepts/auth-servers/#which-authorization-server-should-you-use) for more information on the types of Authorization Servers available to you and what you can use them for.

With the configuration ready, initialize the SDK:

Configure an [OktaAuth](https://github.com/okta/okta-auth-js) object in your top-level component and pass it as a prop to the [Security](https://github.com/okta/okta-react#security) component. This component provides the [React.Context](https://reactjs.org/docs/context.html) to make an `oktaAuth` object and an [authState](https://github.com/okta/okta-auth-js#authstatemanager) object available to child or descendant components.  

```javascript
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';

const config = {
  // Configuration here
};

const oktaAuth = new OktaAuth(config);

const App = () => {
  return (
    <Router>
      <Security oktaAuth={oktaAuth}>
        { /* App routes go here */ }
      </Security>
    </Router>
  );
};

export default App;
```
