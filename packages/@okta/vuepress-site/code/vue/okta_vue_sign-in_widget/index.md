---
title: Okta Sign-In Widget and Vue
language: Vue
icon: code-vue
excerpt: Integrate Okta with a Vue app using the Sign-In Widget.
---

This guide will walk you through integrating authentication into a Vue app with Okta by performing these steps:

1. [Add an OpenID Connect Client in Okta](#add-an-openid-connect-client-in-okta)
2. [Create a Vue App](#create-a-vue-app)
3. [Install Dependencies](#install-dependencies)
4. [Create a Widget Wrapper](#create-a-widget-wrapper)
5. [Create Routes](#create-routes)
6. [Connect the Routes](#connect-the-routes)
7. [Start Your App](#start-your-app)

## Prerequisites

If you do not already have a **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client in Okta

* Log into the Okta Developer Dashboard, and **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect app with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| App Name             | OpenId Connect App *(must be unique)*               |
| Login redirect URIs  | http://localhost:8080/login/callback             |
| Logout redirect URIs | http://localhost:8080                         |
| Allowed grant types  | Authorization Code                                  |

> **Note:** CORS is automatically enabled for the granted login redirect URIs.

## Create a Vue App

To quickly create a Vue app, we recommend the Vue CLI.

```bash
npm install -g @vue/cli
vue create okta-app
# Manually select features: choose defaults + Router
# Choose history mode for router
cd okta-app
```

If you need more information, see [the Vue CLI installation guide](https://cli.vuejs.org/guide/installation.html).

## Install Dependencies

A simple way to add authentication into a Vue app is using the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) library. You can install it via `npm`:

```bash
cd okta-app
npm install @okta/okta-signin-widget
```

You'll also need `@okta/okta-vue` for route protection:

```bash
npm install @okta/okta-vue
```

## Create a Widget Wrapper

To provide a fully featured and customizable login experience, the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) is available to handle User Lifecycle operations, MFA, and more. To render the Sign-In Widget in Vue, you must create a wrapper that allows us to treat it as a Vue component.

Create a `src/components/Login.vue` file:

```html
<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

export default {
  name: 'Login',
  mounted: function () {
    this.$nextTick(function () {
      this.widget = new OktaSignIn({
        baseUrl: 'https://{yourOktaDomain}',
        clientId: '{clientId}',
        redirectUri: 'http://localhost:8080/login/callback',
        authParams: {
          pkce: true,
          issuer: 'https://{yourOktaDomain}/oauth2/default',
          display: 'page',
          scopes: ['openid', 'profile', 'email']
        }
      })
      this.widget.renderEl(
        { el: '#okta-signin-container' },
        () => {
          /**
           * In this flow, the success handler will not be called because
           * there's a redirect to the Okta org for the authentication workflow.
           */
        },
        (err) => {
          throw err
        }
      )
    })
  },
  destroyed () {
    // Remove the widget from the DOM on path change
    this.widget.remove()
  }
}
</script>
```

## Create Routes

Some routes require authentication in order to render. Defining those routes is easy using Vue Router and `@okta/okta-vue`. Lets take a look at what routes are needed for this example:

* `/`: A default page to handle basic control of the app.
* `/profile`: A protected route to the current user's profile.
* `/login`: Show the login page.
* `/login/callback`: A route to parse tokens after a redirect.

### `/`

First, update `src/App.vue` to provide links to navigate your app:

```html
<template>
  <div id="app">
    <nav>
      <div>
        <router-link to="/">
          Okta-Vue Sample Project
        </router-link>
        <router-link to="/login" v-if="!authenticated">
          Login
        </router-link>
        <router-link to="/profile" v-if="authenticated" >
          Profile
        </router-link>
        <router-link to="/" v-if="authenticated" v-on:click.native="logout()">
          Logout
        </router-link>
      </div>
    </nav>
    <div id="content">
      <router-view/>
    </div>
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
    },
    async logout () {
      await this.$auth.logout()
      await this.isAuthenticated()
    }
  }
}
</script>

<style>
nav div a { margin-right: 10px }
</style>
```

Next, create `src/components/Home.vue` to welcome the user after they've signed in.

```html
<template>
  <div id="home">
    <h1>Custom Login Page with Sign In Widget</h1>
    <div v-if="!this.$parent.authenticated">
      <p>Hello, Vue.</p>
      <router-link role="button" to="/login">
        Login
      </router-link>
    </div>

    <div v-if="this.$parent.authenticated">
      <p>Welcome back, {{claims.name}}!</p>
      <p>
        You have successfully authenticated with Okta!
        Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
      claims: ''
    }
  },
  created () { this.setup() },
  methods: {
    async setup () {
      this.claims = await this.$auth.getUser()
    }
  }
}
</script>
```

### `/profile`

This route will only be visible to users with a valid `accessToken`.

Create a new `Profile` component at `src/components/Profile.vue`:

```html
<template>
  <div id="profile">
    <h1>My User Profile (ID Token Claims)</h1>
    <p>
      Below is the information from your ID token.
    </p>
    <table>
      <thead>
        <tr>
          <th>Claim</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(claim, index) in claims" :key="index">
          <td>{{claim.claim}}</td>
          <td :id="'claim-' + claim.claim">{{claim.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      claims: []
    }
  },
  async created () {
    this.claims = await Object.entries(await this.$auth.getUser()).map(entry => ({ claim: entry[0], value: entry[1] }))
  }
}
</script>
```

### `/login`

This route hosts the Sign-In Widget and redirects if the user is already logged in. If the user is coming from a protected page, they'll be redirected back to the page upon successful sign in.

You should have already created `src/components/Login.vue` at the beginning of this guide.

### `/login/callback`

The component for this route (LoginCallback) comes with `@okta/okta-vue`. It handles token parsing, token storage, and redirecting to a protected page if one triggered the login.

### Connect the Routes

This example is using Vue Router. Replace the code in `src/router/index.js` with the following:

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@okta/okta-vue'
import HomeComponent from '@/components/Home'
import LoginComponent from '@/components/Login'
import ProfileComponent from '@/components/Profile'

Vue.use(VueRouter)
Vue.use(Auth, {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{clientId}',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email']
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeComponent
    },
    {
      path: '/login',
      component: LoginComponent
    },
    {
      path: '/login/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/profile',
      component: ProfileComponent,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

const onAuthRequired = async (from, to, next) => {
  if (from.matched.some(record => record.meta.requiresAuth) && !(await Vue.prototype.$auth.isAuthenticated())) {
    // Navigate to custom login page
    next({ path: '/login' })
  } else {
    next()
  }
}

router.beforeEach(onAuthRequired)

export default router
```

Make sure to replace the `{...}` placeholders with values from your OIDC app on Okta.

## Start your app

Finally, start your app:

```bash
npm run serve
```

## Conclusion

You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

Want to learn how to use the user's `access_token`? Check out our <a href='/docs/guides/sign-into-spa/vue/before-you-begin/' data-proofer-ignore>Vue how to guide</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support

Have a question or see a bug? Post your question on [Okta Developer Forums](https://devforum.okta.com/).
