This section helps you review the simple password-only sign-in use case from the sample app. This use case is outlined in the following sequence diagram with your single-page app as the client:

![Sequence diagram that displays the back and forth between the resource owner, sdk, authorization server, and resource server for a basic SPA password sign-in flow.](/img/oie-embedded-sdk/password-only-spa-authjs-flow.svg "Auth JS + SPA password-only sign-in flow")

### Review the Okta configuration settings

Review the `src/app/okta-config.ts` file that references the required [configuration settings](#configuration-settings) to initialize your Okta Auth JS instance. The `okta-config.ts` file references the values from your Okta app integration.

```TypeScript
import { OktaAuth } from '@okta/okta-auth-js';
import { FactoryProvider, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

const oidcConfig = {
  clientId: '${clientId}',
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
```

### Instantiate the Okta Auth JS client

Review the same Angular `src/app/okta-config.ts` file that imports required libraries and instantiates the Okta Auth JS client with values from the `oidcConfig` variable.

```TypeScript
import {
  AuthState,
  hasErrorInUrl,
  IdxMessage,
  IdxStatus,
  IdxTransaction,
  NextStep,
  OktaAuth,
  Tokens
} from '@okta/okta-auth-js';

....

export interface AppAuthState {
  transaction: IdxTransaction | undefined;
  authState: AuthState;
}

const defaultAppAuthState: AppAuthState = {
  authState: {
    isAuthenticated: false
  },
  transaction: undefined
}
```

### Handle the password authentication

Review the `okta-auth.service.ts` file for details on handling a successful password authentication by receiving the `SUCCESS` status, which also returns tokens:

```JavaScript
....
export type FLOW_TYPE = 'authenticate' | 'recoverPassword' | 'register' | 'idp';
....

public startIdxFlow(flow: FLOW_TYPE): Observable<NextStep | undefined> {
    return defer(() => flow === 'idp' ? this.oktaAuth.idx.startTransaction() : this.oktaAuth.idx[flow]()).pipe(
      map(transaction => this.transactionStateHandler(transaction))
    );
  }
  ....

private transactionStateHandler(transaction: IdxTransaction): NextStep | undefined {
    const appState = this.appAuthStateSub$.getValue();
    this.appAuthStateSub$.next({...appState, transaction});

    const status = transaction.status;
    if (status === IdxStatus.SUCCESS || status === IdxStatus.CANCELED) {
      return undefined;
    }

    if (transaction.status === IdxStatus.FAILURE) {
      throw 'Idx error';
    }

    return transaction.nextStep;
  }

  ```
