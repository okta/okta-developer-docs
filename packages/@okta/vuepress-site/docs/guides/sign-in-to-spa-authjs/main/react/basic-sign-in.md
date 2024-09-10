This section helps you review the simple password-only sign-in use case from the sample app. This use case is outlined in the following sequence diagram with your single-page app as the client:

<div class="full">

![Sequence diagram that displays the back and forth between the resource owner, sdk, authorization server, and resource server for a basic SPA password sign-in flow.](/img/oie-embedded-sdk/password-only-spa-authjs-flow.svg)

</div>

### Set up the Okta configuration settings

Review the `src/config.js` file that references the required [configuration settings](#app-integration-settings) to initialize your Okta Auth JS instance. The `config.js` file references the values you add to the `testenv` file.

```JavaScript
const CLIENT_ID = process.env.SPA_CLIENT_ID || process.env.CLIENT_ID || '{clientId}';
const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}/oauth2/default';
const REDIRECT_URI = `{window.location.origin}/login/callback`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
};
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
  const { state } = urlParamsToObject(window.location.search);
  return new OktaAuth(Object.assign({}, oidcConfig, {
    state
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

    const newTransaction = await oktaAuth.idx.proceed(inputValues); // inputValues = username, password
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
