
In your application code, build a config object. This is used to initialize the Okta services with the values specific to your application:

```javascript
const config = {
  clientId: '{clientId}',
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  redirectUri: 'http://localhost:8080/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
```

You can also build it from dynamic values like environment variables:

```javascript
const OKTA_DOMAIN = process.env.DOMAIN;
const CLIENT_ID = process.env.CLIENT_ID;
const CALLBACK_PATH = '/login/callback';

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = 'openid profile email';

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES.split(/\s+/)
};
```

> **Note:**
>
> `openid`, `profile`, and `email` are reserved scopes in OpenID Connect that allow you to get access to user's data. You can read more about scopes [here](/docs/reference/api/oidc/#scopes).
>
> The `issuer` in the configuration above points to the default [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server),
which is created by default with the [Okta Developer Edition](https://developer.okta.com/signup/) account.
See [Which Authorization Server should you use](/docs/concepts/auth-servers/#which-authorization-server-should-you-use) for more information on the types of Authorization Servers available to you and what you can use them for.

With the configuration ready, initialize the SDK:

First, pass the configuration to the Auth handler from the `okta-vue` package.  Use the `router.beforeEach()` call to instruct Vue to check the authorization permissions before rendering a route.

```javascript
// router/index.js

import Vue from 'vue'
import Auth from '@okta/okta-vue'
import Router from 'vue-router'

const config = { 
  // Configuration here
}

Vue.use(Auth, {...config})

// router configuration from previous section here

router.beforeEach(Vue.prototype.$auth.authRedirectGuard()) // Add this

Vue.use(Router)

export default router
```

Then, create your top-level component and have it render the components of the current route.  Set an 'authenticated' property on this top-level component that lower components can read.

```vue
// App.vue

<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return { authenticated: false }
  },
  created () { this.isAuthenticated() },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    }
  }
}
</script>

export default App;
```
