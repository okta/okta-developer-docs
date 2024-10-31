### Set up the Okta configuration settings

Use the required [configuration settings](#okta-org-app-integration-configuration-settings) to initialize your Sign-In Widget and your Auth JS instance:

* `clientId`: Your client ID &mdash; `{yourClientId}`
* ` issuer`: The authorization server in your Okta org (for example, `https://{yourOktaDomain}/oauth2/default`)
* `pkce`: Set this option to `true` to enable PKCE in the widget. This is used for SPA apps that use the [Authentication Code with PKCE flow](/docs/guides/implement-grant-type/authcodepkce/main/).
* `scopes`: Set the OAuth 2.0 scopes that your app requires.
* `redirectUri`: Set your callback redirect URI. This value must be configured in your Okta app **Sign-in redirect URIs** and the URI host must be in the **Trusted Origins** list.

You can create a `src/config.js` file to define your configuration settings. For example:

```js
export default {
  oidc: {
    clientId: '{yourClientId}',
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    redirectUri: '{yourLocalAppDomain}/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  }
}
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you’re using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: true` in the configuration settings shown above. If you’re using version 7+ and you want to use Classic Engine rather than Identity Engine, specify `useClassicEngine: true` in the configuration settings.

> **Note:** The `baseUrl` configuration setting isn't required in the Sign-In Widget for OIDC applications as of [version 5.15.0](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-5.15.0). The `['openid', 'profile', 'email']` scopes are the most commonly used. See [Scopes](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#scopes).

### Instantiate Okta authentication

Add Okta authentication by instantiating `OktaAuth` with the settings from [Set up the Okta configuration settings](#set-up-the-okta-configuration-settings) in your `main.js` file:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'

import sampleConfig from '@/config'

const oktaAuth = new OktaAuth(sampleConfig.oidc)

createApp(App)
  .use(router)
  .use(OktaVue, {
    oktaAuth,
    onAuthRequired: () => {
      router.push('/login')
    },
    onAuthResume: () => {
      router.push('/login')
    },
  })
  .mount('#app')
```

### Create a Sign-In Widget container

To render the Sign-In Widget in Vue.js, you must create a wrapper that allows your app to treat it as a Vue component. For example, create a `src/components/Login.vue` file with the following content:

```html
<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

import sampleConfig from '../config'

export default {
  name: 'Login',
  mounted: function () {
    this.$nextTick(function () {
      const { issuer, clientId, redirectUri, scopes } = sampleConfig.oidc
      this.widget = new OktaSignIn({
        clientId,
        redirectUri,
        logo: require('@/assets/logo.png'),
        i18n: {
          en: {
            'primaryauth.title': 'Sign in to my Okta Sign-In Widget Vue.js app'
          }
        },
        authParams: {
          issuer,
          scopes,
        }
      })

      const originalUri = this.$auth.getOriginalUri();
      if (!originalUri) {
        this.$auth.setOriginalUri('/');
      }

      // Search for URL Parameters to see if a user is being routed to the application to recover password
      var searchParams = new URL(window.location).searchParams;
      this.widget.otp = searchParams.get('otp');
      this.widget.state = searchParams.get('state');

      this.widget.showSignInToGetTokens({
        el: '#okta-signin-container',
        scopes
      }).then(tokens => {
        this.$auth.handleLoginRedirect(tokens)
      }).catch(err => {
        throw err
      })

    })
  },
  unmounted () {
    // Remove the widget from the DOM on path change
    this.widget.remove()
  }
}
</script>
```
