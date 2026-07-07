Review the simple password-only sign-in use case from the sample app. This use case is outlined in the following sequence diagram with your single-page app (SPA) as the client:

<div class="full">

![Sequence diagram that displays the interactions between the resource owner, SDK, authorization server, and resource server for a basic SPA password sign-in flow.](/img/oie-embedded-sdk/password-only-spa-authjs-flow.svg)

</div>

### Set up the Okta configuration settings

Review the `src/config.js` file that references the required [app integration settings](#app-integration-settings) to initialize your Okta Auth JS instance. The `config.js` file references the values that you add to the `.env` file.

```JavaScript
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '{clientId}';
const ISSUER = import.meta.env.VITE_ISSUER || 'https://{yourOktaDomain}/oauth2/default';
const REDIRECT_URI = `${window.location.origin}/login/callback`;

export default {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: REDIRECT_URI,
  scopes: ['openid', 'offline_access', 'profile', 'email'],
  pkce: true,
  idx: {
    // Okta Auth JS 8.x defaults idx.proceed() to Step Mode, which requires every
    // call to name a step or action. This guide uses the older, generic
    // remediation-driven pattern below instead (calling idx.proceed() with just
    // the form values), so Legacy Mode is enabled here to keep that working.
    enableLegacyMode: true
  }
};
```

> **Note:** Legacy Mode is on a deprecation path in Okta Auth JS but is still fully supported. It's what lets the generic, response-driven form pattern in this guide work without hardcoding every remediation step by name. See [Step Mode vs Legacy Mode](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#step-mode-vs-legacy-mode) in the Auth JS SDK docs if you want to build against the newer, explicit-step approach instead.

### Instantiate the Okta Auth JS client

Review the React `app.js` file that imports the required libraries and instantiates the Okta Auth JS client with values from the `config.js`. Wrap your app in the `Security` component from the Okta React SDK so it can manage the Auth JS instance for you.

```JavaScript
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OktaAuth, IdxStatus, urlParamsToObject } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
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
const restoreOriginalUri = () => {};

...

function App() {
  const history = useHistory();

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      ...
    </Security>
  );
}
```

> **Note:** This guide's simplified example doesn't cover redirect callbacks (for example, social IdP sign-in or email magic links). If your app needs them, see [Redirect callbacks](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#redirect-callbacks) in the Auth JS SDK docs and the `LoginCallback` component in [Okta's reference sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/react-embedded-auth-with-sdk).

### Start the sign-in transaction

Before you can render a sign-in form, you need an in-progress IDX transaction to drive it. Start one when your component mounts by calling `idx.authenticate()` with no arguments — the response's `nextStep.inputs` tells you which fields to render. For this password-only use case, that's `username` and `password`:

```JavaScript
const [transaction, setTransaction] = useState(null);

useEffect(() => {
  const startTransaction = async () => {
    const newTransaction = await oktaAuth.idx.authenticate();
    setTransaction(newTransaction);
  };
  startTransaction();
}, []);
```

Pass `transaction.nextStep` into `formTransformer` (see [Basic sign-in flow](#basic-sign-in-flow)) to render the form fields for the current step.

### Handle the password authentication

Review the `app.js` file for details on handling a successful password authentication by receiving the `SUCCESS` status and storing the returned tokens:

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
