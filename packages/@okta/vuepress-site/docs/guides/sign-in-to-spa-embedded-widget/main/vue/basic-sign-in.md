Defining navigational routes are easy using the Vue Router and the Okta Vue.js library (`@okta/okta-vue`). Some routes require authentication in order to render and other don't. The following are some basic routes you need to configure for your app:

* A [default page](#default-page-route) to handle basic control of the app.
* A [protected route](#protected-route) for authenticated users. In this example, the current user's profile information is provided in this protected route.
* A [login route](#login-route) to show the Sign-In Widget.
* A [callback route](#callback-route) to parse tokens after a redirect.

#### Default page route

To create the default `/index` page, update the `src/App.vue` file to provide links to navigate your app:

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
        <a v-if="authenticated" v-on:click="logout()">
          Logout
        </a>
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
  async created () {
    await this.isAuthenticated()
    this.$auth.authStateManager.subscribe(this.isAuthenticated)
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    },
    async logout () {
      await this.$auth.signOut()
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
    <div v-if="!this.$root.authenticated">
      <p>Hello, Vue.</p>
      <router-link role="button" to="/login">
        Login
      </router-link>
    </div>

    <div v-if="this.$root.authenticated">
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
      if (this.$root.authenticated)
        this.claims = await this.$auth.getUser()
    }
  }
}
</script>
```

#### Protected route

Create a protected route that is only available to users with a valid `accessToken`. In this example, the user's profile data is displayed with a valid `accessToken`.

Create a new `Profile` component in the `src/components/Profile.vue` file:

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

#### Login route

This route hosts the Sign-In Widget and redirects if the user is already logged in. If the user is coming from a protected page, they'll be redirected back to the page upon successful sign in.

You should have already created `src/components/Login.vue` at the beginning of this guide.

#### Callback route

The component for this route (LoginCallback) comes with `@okta/okta-vue` (for example, `/login/callback/`). It handles token parsing, token storage, and redirecting to a protected page if one triggered the sign in.

### Connect the routes

This example is using Vue Router. Replace the code in `src/router/index.js` with the following:

```js
import { createRouter, createWebHistory } from 'vue-router'
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
import HomeComponent from '@/components/Home'
import LoginComponent from '@/components/Login'
import ProfileComponent from '@/components/Profile'

const router = createRouter({
  history: createWebHistory(),
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
      component: LoginCallback
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

router.beforeEach(navigationGuard)

export default router
```

Replace the code in `src/main.js` with the following:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import OktaVue from '@okta/okta-vue'
import { oktaAuth } from './okta';

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

### Start your app

To start your app, execute:

```bash
npm run serve
```

Open a browser and navigate to your app URL.

