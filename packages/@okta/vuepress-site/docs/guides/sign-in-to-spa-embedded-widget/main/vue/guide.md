## Use the Sign-In Widget with your SPA app

If you want to deploy a Vue.js single-page app (SPA) by using the embedded authentication model, where your app retains authentication control without redirection to Okta, then you can use the Okta Sign-In Widget (SIW) to quickly add authentication. The Okta SIW is a JavaScript library that provides your app with full sign-in features with Okta so the amount of code you have to write is minimal.


## Add an app in Okta

Before building your Vue app, you need to obtain the OpenID Connect client ID from your Okta org by creating an app integration. You can create an app integration through the [Okta CLI](https://cli.okta.com/), the [Okta Apps API](/docs/reference/api/apps/), or the [Admin Console](/docs/guides/quickstart/website/main/#using-the-admin-console).

1. To create an Okta app integration to represent your Vue app, sign in to [your Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Create App Integration**.
3. In the dialog box that appears, select **OIDC - OpenID Connect** as the **Sign-on method**, **Single-Page Application** as the **Application type**, and then click **Next**.
4. Fill in the following new app integration settings, and then click **Save**:

| Setting                | Value/Description                                    |
| -------------------    | ---------------------------------------------------  |
| App integration name   | Specify a unique name for your app.                  |
| Grant types            | Select **Authorization Code**, **Interaction Code**, and  **Refresh Token**. |
| Sign-in redirect URIs  | `http://localhost:8080/login/callback`               |
| Sign-out redirect URIs | `http://localhost:8080`                              |
| Trusted Origins > Base URIs | Specify your app base URI. For example: `http://localhost:8080`|
| Assignments   | Assign users for your app.                                |

> **Note:** Cross-Origin Resource Sharing (CORS) is automatically enabled for the Trusted Origins base URI you've specified. Ensure that both **CORS** and **redirect** are selected in **Security** > **API** > **Trusted Origins** for your base URI.

## Build a Vue app

These instructions creates a new HelloWord Vue app. 
### Create a new Vue.js app

To quickly create a new Vue app, use the [Vue CLI](https://cli.vuejs.org/guide/installation.html).

```bash
npm install -g @vue/cli
vue create okta-app
# Manually select features: choose defaults + Router, Vue.js v3
# Choose history mode for router
cd okta-app
```

### Install Dependencies

A simple way to add authentication into a Vue app is using the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) library. You can install it via `npm`:

```bash
cd okta-app
npm install @okta/okta-signin-widget
```

You also need `@okta/okta-vue` for route protection and `@okta/okta-auth-js`:

```bash
npm install @okta/okta-vue
npm install @okta/okta-auth-js
```

### Create Okta instances

Create a `src/okta/index.js` file:

```js
import OktaSignIn from '@okta/okta-signin-widget'
import { OktaAuth } from '@okta/okta-auth-js'

const oktaSignIn = new OktaSignIn({
  baseUrl: 'https://${yourOktaDomain}',
  clientId: '${clientId}',
  redirectUri: 'http://localhost:8080/login/callback',
  authParams: {
    pkce: true,
    issuer: 'https://${yourOktaDomain}/oauth2/default',
    display: 'page',
    scopes: ['openid', 'profile', 'email']
  }
});

const oktaAuth = new OktaAuth({
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email']
})

export { oktaAuth, oktaSignIn };
```

Make sure to replace the `${...}` placeholders with values from your OIDC app on Okta.

### Create a Widget Wrapper

To provide a fully-featured and customizable sign-in experience, the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) is available to handle User Lifecycle operations, MFA, and more. To render the Sign-In Widget in Vue, you must create a wrapper that allows Okta to treat it as a Vue component.

Create a `src/components/Login.vue` file:

```html
<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import {oktaSignIn} from '../okta'

export default {
  name: 'Login',
  mounted: function () {
    this.$nextTick(function () {
      oktaSignIn.showSignInAndRedirect(
        { el: '#okta-signin-container' }
      )
    })
  },
  unmounted () {
    // Remove the widget from the DOM on path change
    oktaSignIn.remove()
  }
}
</script>
```

### Create Routes

Some routes require authentication in order to render. Defining those routes is easy using Vue Router and `@okta/okta-vue`. Let's take a look at what routes are needed for this example:

* `/`: A default page to handle basic control of the app.
* `/profile`: A protected route to the current user's profile.
* `/login`: Show the sign-in page.
* `/login/callback`: A route to parse tokens after a redirect.

### `/ - index page`

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

The component for this route (LoginCallback) comes with `@okta/okta-vue`. It handles token parsing, token storage, and redirecting to a protected page if one triggered the sign in.

### Connect the Routes

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

## Start your app

Finally, start your app:

```bash
npm run serve
```

## Conclusion

You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

Want to learn how to use the user's `access_token`? Check out our <a href='/docs/guides/sign-into-spa/vue/main' data-proofer-ignore>Vue how to guide</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Run the sample Vue app

You can run the [sample Vue app](https://github.com/okta/samples-js-vue/custom-login) to quickly review a simple working Vue app with the SIW.

1. Download sample app: `git clone https://github.com/okta/samples-js-vue.git`
2. Go to the `custom-login` directory: `cd samples-js-vue/custom-login`
3. Install the app and its dependencies: `npm install`
3. Set the environment variables with your Okta org app integration properties.

  ```bash
  export ISSUER=https://${yourOktaDomain}/oauth2/default
  export CLIENT_ID=${yourAppClientId}
  export USE_INTERACTION_CODE=true
  ```

4. Run the app: `npm start`

5. Open a browser window and navigate to the app's home page: http://localhost:8080.

## Support

Have a question or see a bug? Post your question on the [Okta Developer Forum](https://devforum.okta.com/).
