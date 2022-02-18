This section helps you review the simple password-only sign-in use case from the sample app. This use case is outlined in the following sequence diagram with your single-page app as the client:

<Insert vans diagram here>


### Set up the Okta configuration settings

Review the `src/config.js` file that references the required [configuration settings](#configuration-settings) to initialize your Okta Auth JS instance. The `config.js`file references the values you add to the `testenv` file.

```JavaScript
const CLIENT_ID = process.env.SPA_CLIENT_ID || process.env.CLIENT_ID || '{clientId}';
const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const REDIRECT_URI = `${window.location.origin}/login/callback`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
```

### Review the sign-in component

The `index.js` file renders the simple sign-in form for the sample app:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Instantiate the Okta Auth JS client

Review the React `app.js` file that imports required libraries and instantiates the Okta Auth JS client with values from the `config.js`.

```JavaScript
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OktaAuth, IdxStatus, urlParamsToObject, hasErrorInUrl } from '@okta/okta-auth-js';
import { formTransformer } from './formTransformer';
import oidcConfig from './config';
import './App.css';

function createOktaAuthInstance() {
  const { state, recoveryToken } = urlParamsToObject(window.location.search);
  return new OktaAuth(Object.assign({}, oidcConfig, {
    state,
    recoveryToken
  }));
}

const oktaAuth = createOktaAuthInstance();

...
```

### Handle the password authentication

Review the `apps.js` file for details on handling a successful password authentication by receiving the `SUCCESS` status and storing the returned tokens:

```JavaScript
....

const handleSubmit = async e => {
    e.preventDefault();

    const newTransaction = await oktaAuth.idx.proceed(inputValues);
    console.log('Transaction:', newTransaction);

    setInputValues({});
    if (newTransaction.status === IdxStatus.SUCCESS) {
      oktaAuth.tokenManager.setTokens(newTransaction.tokens);
    } else {
      setTransaction(newTransaction);
    }
  };

  ...
  ```
