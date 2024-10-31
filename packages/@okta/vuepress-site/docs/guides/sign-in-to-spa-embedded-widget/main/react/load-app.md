### Set up the Okta configuration settings

Use the required [configuration settings](#okta-org-app-integration-configuration-settings) to initialize your Sign-In Widget and your Auth JS instance:

* `clientId`: Your client ID &mdash; `{yourClientId}`
* `issuer`: The authorization server in your Okta org (for example, `https://{yourOktaDomain}/oauth2/default`)
* `scopes`: Set the OAuth 2.0 scopes that your app requires. For example, `['openid', 'profile', 'email']` are commonly used scopes. See [Scopes](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#scopes) for details on more supported scopes.
* `redirectUri`: Set your callback redirect URI. This value must be configured in your Okta app **Sign-in redirect URIs** and the URI host must be in the **Trusted Origins** list.

You can create a `src/config.js` file to define your configuration settings. For example:

```js
export default {
  oidc: {
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    clientId: '{clientId}',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: `{window.location.origin}/login/callback`
  },
  widget: {
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    clientId: '{clientId}',
    redirectUri: `{window.location.origin}/login/callback`,
    scopes: ['openid', 'profile', 'email'],
  }
};
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you’re using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: true` in the configuration settings shown above. If you’re using version 7+ and you want to use Classic Engine rather than Identity Engine, specify `useClassicEngine: true` in the configuration settings.

> **Note:** The `baseUrl` configuration setting is required in the Sign-In Widget for OIDC applications before [version 5.15.0](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-5.15.0). See [Okta Sign-In Widget basic configuration options](https://github.com/okta/okta-signin-widget#basic-config-options) for more widget configurations.

> **Note:** See the [Okta Auth JS configuration reference](https://github.com/okta/okta-auth-js#configuration-reference) for more Auth JS client configurations.

### Create a Sign-In Widget wrapper

To render the Sign-In Widget in React, you must create a wrapper that allows your app to treat it as a React component. For example, create a `src/OktaSignInWidget.jsx` file with the following content:

```js
import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import config from './config';

const OktaSignInWidget = ({ onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    const widget = new OktaSignIn(config.widget);

   // Search for URL Parameters to see if a user is being routed to the application to recover password
   var searchParams = new URL(window.location.href).searchParams;
   widget.otp = searchParams.get('otp');
   widget.state = searchParams.get('state');
   widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);

    return () => widget.remove();
  }, [onSuccess, onError]);

  return (<div ref={widgetRef} />);
};

export default OktaSignInWidget;

```

> **Note:** Use the [Auth JS `showSignInToGetTokens()`](https://github.com/okta/okta-signin-widget#showsignintogettokens) function to call the Sign-In Widget for OIDC single-page embedded apps.