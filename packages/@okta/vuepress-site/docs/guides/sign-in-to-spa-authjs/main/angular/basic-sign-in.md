Review the simple password-only sign-in use case from the sample app. This use case is outlined in the following sequence diagram with your single-page app as the client:

<div class="full">

![Sequence diagram that displays the interactions between the resource owner, SDK, authorization server, and resource server for a basic SPA password sign-in flow.](/img/oie-embedded-sdk/password-only-spa-authjs-flow.svg)

</div>

### Review the Okta configuration settings

Review the `src/app/okta-config.ts` file that references the required [app integration settings](#app-integration-settings) to initialize your Auth JS instance. The `okta-config.ts` file references the values from your app integration.

```TypeScript
import { OktaAuth } from '@okta/okta-auth-js';
import { FactoryProvider, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

const oidcConfig = {
  clientId: '{clientId}',
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
```

### Instantiate the Okta Auth JS client

Review the same Angular `src/app/okta-config.ts` file that imports required libraries and instantiates the Okta Auth JS client with values from the `oidcConfig` variable.

```TypeScript
import { OktaAuth } from '@okta/okta-auth-js';
import { FactoryProvider, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

const oidcConfig = {
  clientId: '{clientId}',
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};

export const OKTA_AUTH = new InjectionToken('okta-auth');

const oktaAuthFactory = (router: Router, doc: any) => {
  const params = router.parseUrl(doc.location.search);
  const state = params.queryParamMap.get('state') ?? undefined;
  const recoveryToken = params.queryParamMap.get('recoveryToken') ?? undefined;
  const redirectUri = `{doc.location.origin}/login/callback`;
  return new OktaAuth({...oidcConfig, redirectUri, state, recoveryToken})
};

export const OKTA_PROVIDER: FactoryProvider = {
  provide: OKTA_AUTH,
  useFactory: oktaAuthFactory,
  deps: [Router, DOCUMENT]
}
```

To start the Okta Auth JS service, see this code snippet from the `okta-auth-service.ts` file:

```TypeScript
import { OKTA_AUTH } from './okta-config';

constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  this.oktaAuth.start();
}
```

### Handle the password authentication

Review the `okta-auth.service.ts` file for details on handling a successful password authentication by receiving the `SUCCESS` status, which also returns tokens. For example, for the simple authentication case:

```TypeScript
public authenticateFlow(): Observable<NextStep | undefined> {
  return defer(() => this.oktaAuth.idx.authenticate().pipe(
    tap( transaction => {
      if (transaction.status === IdxStatus.SUCCESS && !!transaction.tokens) {
        this.oktaAuth.tokenManager.setToken(transaction.tokens);
      }
    }),
    map( transaction => {
      const status = transaction.status;

      if (status === IdxStatus.SUCCESS || status === IdxStatus.CANCELED) {
        return undefined;
      }

      if (status === Idx.FAILURE) throw 'Idx error';
      return transaction.nextStep;
    }
  );
}
```

The sample app includes other flow states and authentication:

```TypeScript
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
