---
exampleDescription: Vue PKCE
---

## Okta Vue.js Quickstart

This guide will walk you through integrating authentication into a Vue app with Okta by performing these steps:

1. Add an OpenID Connect Client in Okta
2. Install the Okta Vue.js SDK
3. Attach Components to Routes
4. Use the Access Token

At the end of the Vue instructions you can choose your server type to learn more about post-authentication workflows, such as verifying tokens that your Vue application can send to your server.

> If you would prefer to download a complete sample application instead, please visit [Vue Sample Applications for Okta][] and follow those instructions.

## Prerequisites

* If you don't have a Vue app, or are new to Vue, please start with the [Vue CLI](https://github.com/vuejs/vue-cli) guide. It will walk you through the creation of a Vue app, creating [routers](https://router.vuejs.org/en/essentials/getting-started.html), and other Vue.js development essentials.

## Add an OpenID Connect Client in Okta

In Okta, applications are OpenID Connect clients that can use Okta Authorization servers to authenticate users.  Your Okta org already has a default authorization server, so you just need to create an OIDC client that will use it.

* Log into the Okta Developer Dashboard, click **Applications** then **Add Application**.
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect application with values suitable for your app. If you are running this locally and using the defaults from the [Vue CLI](https://github.com/vuejs/vue-cli), your `port` will be `8080`:

| Setting             | Value                                          |
| ------------------- | ---------------------------------------------- |
| App Name            | My SPA App                                     |
| Base URIs           | http://localhost:{port}                        |
| Login redirect URIs | http://localhost:{port}/implicit/callback      |
| Grant Types Allowed | Authorization Code                             |

After you have created the application there are two more values you will need to gather:

| Setting       | Where to Find                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------                                                      |
| Client ID     | In the applications list, or on the "General" tab of a specific application.                                                        |
| Org URL       | <span class="is-signed-in">`https://${yourOktaDomain}` <br></span>On the home screen of the developer dashboard, in the upper right. |

These values will be used in your Vue application to setup the OpenID Connect flow with Okta.

## Install the Okta Vue SDK

You will need to use the [Okta Vue SDK](https://github.com/okta/okta-vue) library to sign in the user by redirecting to the authorization endpoint on your Okta org. You can install it via npm:

```bash
npm install @okta/okta-vue
```

### Configuration

You will need the values from the OIDC client that you created in the previous step to instantiate the middleware. You will also need to know your Okta org URL, which you can see on the home page of the Okta Developer console.

In your application's [vue-router](https://router.vuejs.org/en/essentials/getting-started.html) configuration, import the `@okta/okta-vue` plugin and pass it your OpenID Connect client information:
<DomainAdminWarning />

```typescript
// router/index.js

import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '{client_id}',
  redirectUri: 'http://localhost:{port}/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
})
```

## Attach Components to Routes

You'll need to provide these routes in your sample application, so that we can sign the user in and handle the callback from Okta. We will show you how to set these up below using [Vue Router](https://router.vuejs.org/en/essentials/getting-started.html):

* `/`: A default home page to handle basic control of the app.
* `/implicit/callback`: Handle the response from Okta and store the returned tokens.

### Provide the Login and Logout Buttons

In the relevant location in your application, you will want to provide `Login` and `Logout` buttons for the user. You can show/hide the correct button by using the `$auth.isAuthenticated()` method. For example:

```typescript
// src/App.vue

<template>
  <div id="app">
    <router-link to="/" tag="button" id='home-button'> Home </router-link>
    <button v-if='authenticated' v-on:click='logout' id='logout-button'> Logout </button>
    <button v-else v-on:click='login' id='login-button'> Login </button>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: function () {
    return {
      authenticated: false
    }
  },
  created () {
    this.isAuthenticated()
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    },
    login () {
      this.$auth.loginRedirect('/')
    },
    async logout () {
      await this.$auth.logout()
      await this.isAuthenticated()

      // Navigate back to home
      this.$router.push({ path: '/' })
    }
  }
}
</script>
```

### Create the Callback Handler

In order to handle the redirect back from Okta, you need to capture the token values from the URL. You'll use `/implicit/callback` as the callback URL, and use the default `Auth.handleCallback()` component included.

```typescript
// router/index.js

const router = new Router({
  ...
  mode: 'history',
  routes: [
    { path: '/implicit/callback', component: Auth.handleCallback() },
    ...
  ]
})
```

## Use the Access Token

When your users are authenticated, your Vue application has an access token that was issued by your Okta Authorization server. You can use this token to authenticate requests for resources on your server or API. As a hypothetical example, let's say you have an API that provides messages for a user. You could create a `MessageList` component that gets the access token and uses it to make an authenticated request to your server.

Here is what the Vue component could look like for this hypothetical example using [axios](https://github.com/axios/axios):


```typescript
// src/components/MessageList.vue

<template>
  <ul v-if="posts && posts.length">
    <li v-for="post in posts" :key='post.title'>
      <p><strong>{{post.title}}</strong></p>
      <p>{{post.body}}</p>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      posts: []
    }
  },
  async created () {
    axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
    try {
      const response = await axios.get(`http://localhost:{serverPort}/api/messages`)
      this.posts = response.data
    } catch (e) {
      console.error(`Errors! ${e}`)
    }
  }
}
</script>
```


In the next section you can select your server technology to see how your server can read this incoming token and validate it.

[Vue Sample Applications for Okta]: https://github.com/okta/samples-js-vue
