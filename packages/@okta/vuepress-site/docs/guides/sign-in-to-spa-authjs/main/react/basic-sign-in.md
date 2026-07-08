Review the simple password-only sign-in use case from the sample app.

<!-- The sequence diagram below is out of date with the Step Mode rework in this
guide (it shows a single idx.authenticate(username,password) call, not the
two-call authenticate()-then-proceed({ step }) flow). Commented out until the
updated diagram is ready — see the design request ticket (TBD) for tracking
this.
<div class="full">

![Sequence diagram that displays the interactions between the resource owner, SDK, authorization server, and resource server for a basic SPA password sign-in flow.](/img/oie-embedded-sdk/password-only-spa-authjs-flow.svg)

</div>
-->

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
  pkce: true
};
```

> **Note:** Okta Auth JS 8.x requires every `idx.proceed()` call to name the remediation step it's submitting. This guide uses that Step Mode pattern throughout. See [Step Mode vs Legacy Mode](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#step-mode-vs-legacy-mode) in the Auth JS SDK docs if you're migrating an older app that relies on the deprecated, generic remediation-driven pattern.

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

Name the step you're submitting on every `idx.proceed()` call — `transaction.nextStep.name` holds the value, and it's the same step the form already rendered against. For this password-only use case, the step name is `identify`. Review the `app.js` file for details on handling a successful password authentication by receiving the `SUCCESS` status and storing the returned tokens:

```JavaScript
const handleSubmit = async e => {
  e.preventDefault();

  const newTransaction = await oktaAuth.idx.proceed({ step: 'identify', ...inputValues }); // inputValues = username, password
  console.log('Transaction:', newTransaction);

  setInputValues({});
  if (newTransaction.status === IdxStatus.SUCCESS) {
    oktaAuth.tokenManager.setTokens(newTransaction.tokens);
  } else {
    setTransaction(newTransaction);
  }
};
```

### The full sign-in component code

With the pieces above in place, here's the complete `App.jsx` for the password-only sign-in flow, with everything shown together:

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

function SignInForm() {
  const [transaction, setTransaction] = useState(null);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const startTransaction = async () => {
      const newTransaction = await oktaAuth.idx.authenticate();
      setTransaction(newTransaction);
    };
    startTransaction();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const newTransaction = await oktaAuth.idx.proceed({ step: 'identify', ...inputValues });
    console.log('Transaction:', newTransaction);

    setInputValues({});
    if (newTransaction.status === IdxStatus.SUCCESS) {
      oktaAuth.tokenManager.setTokens(newTransaction.tokens);
    } else {
      setTransaction(newTransaction);
    }
  };

  if (!transaction?.nextStep) {
    return null;
  }

  const { inputs } = formTransformer(transaction.nextStep)({});

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map(({ label, name, type, required }) => (
        <label key={name}>
          {label}
          <input
            name={name}
            type={type}
            required={required}
            value={inputValues[name] || ''}
            onChange={handleChange}
          />
        </label>
      ))}
      <button type="submit">Sign in</button>
    </form>
  );
}

function App() {
  const history = useHistory();

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <SignInForm />
    </Security>
  );
}

export default App;
```
