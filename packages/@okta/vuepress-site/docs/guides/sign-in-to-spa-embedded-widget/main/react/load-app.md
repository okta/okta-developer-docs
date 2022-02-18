### Set up the Okta configuration settings

Use the required [configuration settings](#okta-org-app-integration-configuration-settings) to initialize your Sign-In Widget and your Auth JS instance:

* `clientId`: Your client ID &mdash; `${yourClientId}`
* ` issuer`: The authorization server in your Okta org (for example, `https://${yourOktaDomain}/oauth2/default`)
* `useInteractionCodeFlow`: Set this option to `true` to enable the [Interaction Code flow](/docs/concepts/interaction-code/#the-interaction-code-flow) in the embedded Widget.
* `scopes`: Set the OAuth 2.0 scopes that your app requires.
* `redirectUri`: Set your callback redirect URI. This value must be configured in your Okta app **Sign-in redirect URIs** and **Trusted Origins** lists.

You can create a `src/config.js` file to define your configuration settings. For example:

```js
const oktaAuthConfig = {
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback'
};

const oktaSignInConfig = {
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  useInteractionCodeFlow: true
};

export { oktaAuthConfig, oktaSignInConfig };
```

> **Note:** The `baseUrl` configuration setting isn't required in the Sign-In Widget for OIDC applications as of [version 5.15.0](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-5.15.0). The `pkce` configuration setting is set to `true` by default in the Widget. `['openid', 'profile', 'email']` are commonly used scopes. See [Scopes](/docs/reference/api/oidc/#scopes) for details on additional supported scopes. See [Okta Sign-In Widget basic configuration options](https://github.com/okta/okta-signin-widget#basic-config-options) for additional Widget configurations.

> **Note:** See the [Okta Auth JS configuration reference](https://github.com/okta/okta-auth-js#configuration-reference) for additional Auth JS client configurations.

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
