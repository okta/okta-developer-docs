### Create Okta instances

Create a `src/config.js` file to instantiate `OktaSignIn` and `OktaAuth` with your configuration settings:

```js
const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
};

const oktaSignInConfig = {
  baseUrl: 'https://${yourOktaDomain}',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
  authParams: {
    // If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to uncomment the below line
    // pkce: false
  }
 useInteractionCodeFlow: true,
  // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};

export { oktaAuthConfig, oktaSignInConfig };
```

Replace the `${...}` placeholders with values from your [Okta org app integration configuration settings](#okta-org-app-integration-configuration-settings).

### Create a SIW wrapper

To render the Sign-In Widget in React, you must create a wrapper that allows you to treat it as a React component.

Create a `src/OktaSignInWidget.js` file:

```js
import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current)
      return false;

    const widget = new OktaSignIn(config);

    widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return (<div ref={widgetRef} />);
};
export default OktaSignInWidget;
```
