### Set up the Okta configuration settings

Use the required [configuration settings](#okta-org-app-integration-configuration-settings) to initialize your Sign-In Widget and your Auth JS instance:

* `clientId`: Your client ID &mdash; `${yourClientId}`
* ` issuer`: The authorization server in your Okta org &mdash; `${yourIssuer}`
* `useInteractionCodeFlow`: Set this option to `true` to enable the [Interaction Code flow](/docs/concepts/interaction-code/#the-interaction-code-flow) in the embedded Widget.
* `pkce`: Set this option to `true` to enable PKCE in the Widget. This is used for SPA apps that use the [Authentication Code with PKCE flow](/docs/guides/implement-grant-type/authcodepkce/main/).
* `scopes`: Set the OAuth 2.0 scopes that your app requires.
* `redirectUri`: Set your callback redirect URI. This value must be configured in your Okta app **Sign-in redirect URIs** and **Trusted Origins** lists.

You can create a `src/config.js` file to define your configuration settings. For example:

```js
const oktaAuthConfig = {
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
};

const oktaSignInConfig = {
  baseUrl: 'https://${yourOktaDomain}',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
  authParams: {
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
