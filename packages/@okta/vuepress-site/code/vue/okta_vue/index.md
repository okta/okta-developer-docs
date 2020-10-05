---
title: Okta Auth JS and Vue
language: Vue
icon: code-vue
excerpt: Integrate Okta with a Vue app using Auth JS.
---

This guide will walk you through integrating authentication into a Vue app with Okta by performing these steps:
1. [Add an OpenID Connect Client in Okta](#add-an-openid-connect-client-in-okta)
2. [Create a Vue App](#create-a-vue-app)
3. [Install Dependencies](#install-dependencies)
4. [Create a Custom Sign-In Form](#create-a-custom-sign-in-form)
5. [Create Routes](#create-routes)
6. [Connect the Routes](#connect-the-routes)
7. [Start Your App](#start-your-app)

## Prerequisites
If you do not already have a **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client in Okta
* Sign in to the Okta Developer Dashboard, and select **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect app with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| App Name             | OpenID Connect App *(must be unique)*               |
| Login redirect URIs  | http://localhost:8080/login/callback             |
| Logout redirect URIs | http://localhost:8080/                         |
| Allowed grant types  | Authorization Code                                  |

> **Note:** CORS is automatically enabled for the granted login redirect URIs.

## Create a Vue App
To quickly create a Vue app, we recommend the Vue CLI. Follow their guide [here](https://cli.vuejs.org/guide/installation.html) or use the steps below.

```
npm install -g @vue/cli
vue create okta-vue-auth-example
# Manually select features: choose defaults + Router
# Choose history mode for router
cd okta-vue-auth-example
```

## Install Dependencies
A simple way to add authentication to a Vue app is using the [Okta Auth JS](/code/javascript/okta_auth_sdk/) library. We can install it via `npm`:
```bash
npm install @okta/okta-auth-js
```

## Create a Custom Sign-In Form
If the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) does not fit your needs, [AuthJS](/code/javascript/okta_auth_sdk/) provides lower-level access to User Lifecycle operations, MFA, and more. For this example, you'll create a simple username and password form without MFA.

Create `src/components/About.vue` with the following HTML:

```html
<template>
  <div>
    <h2>About</h2>
  </div>
</template>
```

Create `src/components/Dashboard.vue`. This page will only be viewable to authenticated folks.

```html
<template>
  <div>
    <h2>Dashboard</h2>
    <p>Yay you made it!</p>
  </div>
</template>
```

Create a `src/auth.js` file:

```js
/* globals localStorage */
const OktaAuth = require('@okta/okta-auth-js').OktaAuth
const authClient = new OktaAuth({issuer: 'https://{yourOktaDomain}'})

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    return authClient.signIn({
      username: email,
      password: pass
    }).then(transaction => {
      if (transaction.status === 'SUCCESS') {
        return authClient.token.getWithoutPrompt({
          clientId: '{clientId}',
          responseType: ['id_token', 'token'],
          scopes: ['openid', 'email', 'profile'],
          sessionToken: transaction.sessionToken,
          redirectUri: window.location.origin + '/login/callback'
        }).then(response => {
          localStorage.token = response.tokens.accessToken
          localStorage.idToken = response.tokens.idToken
          if (cb) cb(true)
          this.onChange(true)
        })
      }
    }).catch(err => {
      console.error(err.message)
      if (cb) cb(false)
      this.onChange(false)
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    delete localStorage.idToken
    if (cb) cb()
    this.onChange(false)
    return authClient.signOut()
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {
  }
}
```

You’ll need to replace `{yourOktaDomain}` with your Okta domain in the code above. Replace `{clientId}` with the client ID from the app you created in the beginning.

Change `src/App.vue` to have the following code:

```html
<template>
  <div id="app">
    <h1>Okta Auth JS Example</h1>
    <ul>
      <li>
        <router-link v-if="loggedIn" to="/logout">Log out</router-link>
        <router-link v-if="!loggedIn" to="/login">Log in</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/dashboard">Dashboard</router-link>
        (authenticated)
      </li>
    </ul>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
    <template v-else>
      <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
    </template>
  </div>
</template>

<script>
import auth from './auth'
export default {
  data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  }
}
</script>

<style>
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #2c3e50;
  }

  #app {
    padding: 0 20px;
  }

  ul {
    line-height: 1.5em;
    padding-left: 1.5em;
  }

  a {
    color: #7f8c8d;
    text-decoration: none;
  }

  a:hover {
    color: #4fc08d;
  }
</style>
```

Add a `src/components/Login.vue` to render your sign-in form:

```html
<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="login" autocomplete="off">
      <label><input v-model="email" placeholder="email" v-focus></label>
      <label><input v-model="pass" placeholder="password" type="password"></label><br>
      <button type="submit">login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </div>
</template>

<script>
  import auth from '../auth'
  export default {
    data () {
      return {
        email: '',
        pass: '',
        error: false
      }
    },
    methods: {
      login () {
        auth.login(this.email, this.pass, loggedIn => {
          if (!loggedIn) {
            this.error = true
          } else {
            this.$router.replace(this.$route.query.redirect || '/')
          }
        })
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }
</style>
```

To make the `v-focus` directive on the email field work, add the following to `src/main.js` (before `new Vue({...})`).

```js
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})
```

## Create Routes

Some routes require authentication in order to render. Lets take a look at what routes are needed for this example:

- `/`: The default landing page.
- `/about`: A simple about page.
- `/dashboard`: A route that's protected.
- `/login`: The login form.
- `/logout`: A route to logout and redirect back to the default page.

Create `src/router/index.js` with the following code.

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/auth'
import About from '@/components/About.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/about', component: About },
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
```

## Start your app
Finally, start your app:

```bash
npm run serve
```

## Source Code
The source code for this guide can be found at [in the Vue Samples](https://github.com/okta/samples-js-vue/tree/master/okta-auth-js) on GitHub.

## Conclusion
You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

Want to learn how to use the user's `access_token`? Check out our <a href='/docs/guides/sign-into-spa/vue/before-you-begin/' data-proofer-ignore>Vue How To Guide</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support
Have a question or see a bug? Post your question on [Okta Developer Forums](https://devforum.okta.com/).
