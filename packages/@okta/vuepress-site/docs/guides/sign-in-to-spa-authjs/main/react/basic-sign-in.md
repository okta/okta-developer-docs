Review the simple password-only sign-in use case from the sample app.

<!-- The sequence diagram below is out of date. It shows the old Step Mode
flow: a single idx.authenticate(username, password) call. The current flow
instead primes and submits each remediation step in turn with proceed({
step }). This comment hides the diagram until the design team updates it.
See OKTA-1220704 for the tracking ticket.
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
import { OktaAuth, IdxStatus, urlParamsToObject, toRelativeUrl } from '@okta/okta-auth-js';
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

...

function App() {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      ...
    </Security>
  );
}
```

> **Note:** This guide's simplified example doesn't cover redirect callbacks (for example, social IdP sign-in or email magic links). If your app needs them, see [Redirect callbacks](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#redirect-callbacks) in the Auth JS SDK docs and the `LoginCallback` component in [Okta's reference sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/react-embedded-auth-with-sdk).

### Start the sign-in transaction

Before you can render a sign-in form, you need an in-progress IDX transaction to drive it. Start one when your component mounts by calling `idx.start()`. `idx.start()` begins the transaction. It doesn't resolve a step's field data until you name that step. Call `idx.proceed()` with only a `step` name and no other values. The SDK then returns that step's `inputs` for rendering. For this password-only use case, the sign-in flow always begins with the `identify` step, which asks for `username`:

```JavaScript
const [transaction, setTransaction] = useState(null);

useEffect(() => {
  const startTransaction = async () => {
    await oktaAuth.idx.start();
    const newTransaction = await oktaAuth.idx.proceed({ step: 'identify' });
    setTransaction(newTransaction);
  };
  startTransaction();
}, []);
```

Pass `transaction.nextStep` into `formTransformer` to render the form fields for the current step. See [Basic sign-in flow](#basic-sign-in-flow) for the full form code. Okta's Identity Engine collects the username first. It then challenges for the password on a separate step. This password-only flow therefore renders two forms in sequence, not one combined form.

### Handle the password authentication

Name the step you're submitting on every `idx.proceed()` call. `transaction.nextStep.name` holds that name. It matches the step the form already rendered. Submitting a step's values reveals the name of the next step. It does not reveal that step's renderable field data. Call `idx.proceed()` again with just the step name to prime the next form before you render it. Review the `app.js` file for details on handling a successful password authentication. It receives the `SUCCESS` status and stores the returned tokens:

```JavaScript
const handleSubmit = async e => {
  e.preventDefault();

  const submittedTransaction = await oktaAuth.idx.proceed({ step: transaction.nextStep.name, ...inputValues });
  console.log('Transaction:', submittedTransaction);
  setInputValues({});

  if (submittedTransaction.status === IdxStatus.SUCCESS) {
    oktaAuth.tokenManager.setTokens(submittedTransaction.tokens);
    return;
  }

  const newTransaction = await oktaAuth.idx.proceed({ step: submittedTransaction.nextStep.name });
  setTransaction(newTransaction);
};
```

For this password-only use case, `handleSubmit` runs twice. The first run submits `username` from the `identify` step and primes the `challenge-authenticator` step. The second run submits `password` from that step and reaches `IdxStatus.SUCCESS`.

### The full sign-in component code

With the pieces above in place, here's the complete `App.jsx` for the password-only sign-in flow, with everything shown together:

```JavaScript
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OktaAuth, IdxStatus, urlParamsToObject, toRelativeUrl } from '@okta/okta-auth-js';
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

function SignInForm() {
  const [transaction, setTransaction] = useState(null);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const startTransaction = async () => {
      await oktaAuth.idx.start();
      const newTransaction = await oktaAuth.idx.proceed({ step: 'identify' });
      setTransaction(newTransaction);
    };
    startTransaction();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const submittedTransaction = await oktaAuth.idx.proceed({ step: transaction.nextStep.name, ...inputValues });
    console.log('Transaction:', submittedTransaction);
    setInputValues({});

    if (submittedTransaction.status === IdxStatus.SUCCESS) {
      oktaAuth.tokenManager.setTokens(submittedTransaction.tokens);
      return;
    }

    const newTransaction = await oktaAuth.idx.proceed({ step: submittedTransaction.nextStep.name });
    setTransaction(newTransaction);
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
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <SignInForm />
    </Security>
  );
}

export default App;
```
