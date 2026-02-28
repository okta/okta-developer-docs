---
title: Sign users up with a self-hosted sign-up form
excerpt: Sign users up for your app using a self-hosted sign-up form and an embedded Sign-In Widget
layout: Guides
---

Learn how to implement a self-hosted sign-up experience using the Okta Auth JS SDK and the Okta embedded Sign-In widget.

---

#### Learning outcome

* Understand how to set up a basic Vue project.
* Understand how to use the Okta Auth JS and Okta Sign-In Widget libraries in a JavaScript web app.
* Understand how Okta app integrations, access policies, and trusted origins work.

#### What you need

* Node JS LTS installed
* An IDE of your choice, like JetBrains or VSCode, installed
* Terminal app of your choice
* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Familiarity with the [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#introduction)
* The Interaction Code grant type [enabled](/docs/guides/implement-grant-type/interactioncode/main/#verify-that-the-interaction-code-grant-type-is-enabled) for your org.

---

??In this guide, we are going to be setting up a simple Vue application with basic layout capabilities and Okta authentication enabled.??

## Okta Setup

Before writing any code, you must configure your Okta org to recognize and manage your Vue app. This section walks you through three essential backend configurations:

* **Create an app integration**: Establishes your Vue app's identity within Okta. You define its redirect URIs and obtain a Client ID, which is crucial for connecting your front end to Okta.

* **Configure an access policy**: Grants your new app permission to request authentication tokens from an Okta authorization server. It acts as a security checkpoint for your API.

* **Enable Self-Service Registration (SSR)**: Sets up a policy that allows new users to create their own accounts directly from the Okta Sign-In Widget, a key feature for public-facing apps.

### Create the app integration for Vue

The Okta app integration represents your Vue app in your Okta org and lets you configure how it interacts with Okta services.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**, and then select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** as your app type, then click **Next**.
1. Give the app integration a name, for example, Vue app.
1. Make sure that **Authorization Code** is selected as the grant type.
1. Expand **Advanced** and select the **Interaction Code** checkbox in the **Other grants** section.
1. Add the local development URI of `http://localhost:5173/login/callback` for **Sign-in redirect URIs**.
1. Add `http://localhost:5173` for **Logout redirect URIs** in the **LOGOUT** section and for **Base URIs** in the **Trusted Origins** section.
1. In the **Assignments** section, select **Allow everyone in your organization to access** for controlled access.
1. Clear the **Enable immediate access with Federation Broker Mode** checkbox, and then click **Save**.
1. Make note of your app integration's Client ID. You need this later.

### Configure an access policy

Access policies control which client apps can request access tokens for specific APIs. They also define rules for those tokens, such as scopes, lifetimes, and grant types. Configure an access policy for your app:

1. Go to **Security** > **API**.
1. Click **default** for the Okta default custom authorization server.
1. Click the **Access Policies** tab, and then click **Add New Access Policy** or **Add Policy** if you haven't added any policies yet.
1. Give the policy a name, such as **Vue Policy** and add a simple description.
1. Select **The following clients** in the **Assign to** field, type the name of your app, and then select it from the list.
1. Click **Create Policy**.

#### Add a rule

Add a simple rule to your policy.

1. Select your policy on the left.
1. Click **Add rule**.
1. Enter a name for the rule.
1. Expand **Advanced** and select the **Interaction Code** checkbox in the **Other grants** section.
1. Leave the default settings for the rest, and click **Create rule**.

### Set up a user profile policy

Set up a user profile policy to allow your users to perform Self-Service Registration (SSR). This enables the user to sign up for your app using the Okta Sign-In Widget.

1. Go to **Security** > **User Profile Policies**.
1. Click **Add user profile policy** and enter a policy name, such as **Self-Service Registration***.
1. Click **Save**.
1. Click pencil icon next to your policy to make edits.
1. In the **Profile Enrollment** section of the **Enrollment** tab, click **Edit**.
1. Verify that **Self-service registration** is set to **Allowed**.
1. Clear the **Required before access is granted** checkbox for **Email verification**.

   > **Note**: In this example, you want to test with fake emails during development. After your app is live, turn this back on.

1. Click **Save**.
1. Select the **Apps** tab, and then click **Add an App to This Policy**.
1. Locate your app, click **Apply** next to it, and click **Close**.

**Note**: See [Enable and configure a sign-up form](/docs/guides/enable-configure-signupform/main/) for more detailed information on configuring SSR.

## Vue Set Up

Now, we create a Vue project and set up a basic layout, and our embedded sign up with okta AuthJS SDK. Let's start:
Create a new folder of your choosing.
Navigate to the folder in your terminal, then run `npm create vue@latest .` . This starts up the script to setup vue in our current folder. ‘npm create vue@latest’ creates the new project, the ‘.’ argument tells the script to create the project in the current directory.
Depending on your IDE, you might get a message like ‘Current directory is not empty. Remove existing files and continue’, select Yes.
Let’s call the package name ‘vue-app’.
Select Typescript and Router as the features to include in the project; don’t add any experimental features.
Lastly, select yes to ‘Skip all example code and start with a blank Vue project?’

Using the Auth JS SDK
Now we use the AuthJS SDK in our Vue app to implement the embedded Sign Up. We’re going to be using two libraries from the SDK, the Okta AuthJS and Okta Sign In Widget libraries. Let’s add them in. Run 
`npm install @okta/okta-auth-js  @okta/okta-signin-widget`. Now, navigate to the tsconfig.app.json file in the root directory and add this to the ‘compilerOptions’ property:

```json
{
  ...
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    ...
  }
}
```

With this done, run `npm run dev`. Your development server should start up at http://localhost:5173 (the same base URL we added in our Vue app configuration). Once you click on the URL, you should see a page similar to the one below:


Since we’re going to be using Sass, install it with `npm install -D sass-embedded`.

Before we delve into the Okta setup, let’s add example pages to our project (real applications hardly ever have just one page). To do that, navigate to the `src` folder, create a folder called ‘views’, and add the following files.

Home.vue
```vue
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
 name: "Home"
})
</script>


<template>
 <h1>This is the home page</h1>
</template>


<style scoped>


</style>
```
About.vue
```vue
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
 name: "About"
})
</script>


<template>
 <h1>This is the about page.</h1>
</template>


<style scoped>


</style>
```
Contact.vue
```vue
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
 name: "Contact"
})
</script>


<template>
 <h1>This is the contact page</h1>
</template>


<style scoped>


</style>

```
In a production application, these pages will be a lot more complicated. Now, let us import these components into the app router. Before we do this, we need to make sure our router loads before the components mount. That way, we don’t encounter any problems with using `$route` logic in our code. Navigate to `src/main.ts` and replace the 

```ts
app.mount('#app')
```
line with
```ts
router.isReady()
 .then(() => app.mount('#app'))
```

So the full file should look like this:
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)


app.use(router)


router.isReady()
 .then(() => app.mount('#app'))
```

Navigate to `src/router/index.ts` and edit it to look something like this:
```ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";


const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
 ],
})


export default router
```
This is a simple router instance with all our pages in the `routes[]` array. Next up, we are going to create a simple helper file with Okta-related functionality for our embedded signup. In the src folder, create `lib/okta` folder [NB: In prod, you probably would not follow this folder naming convention; you’d probably do something along the lines of ‘providers/iam/okta’, to allow for the addition of new IAM providers. You’d probably also create a standardized IAMProvider class that any new provider can implement. However, for the sake of this tutorial, we’re keeping it very simple].
In the Okta folder, create a ‘config.ts’ file and an index.ts file. Your config.ts file should look like this:

```ts
export default {
 issuer: `https://${yourOktaDomain}/oauth2/default`, //For example, `"https://example.okta.com/oauth2/default"`
 baseUrl: `https://${yourOktaDomain}`, //For example, `"https://example.okta.com/oauth2/default"`
 clientId: `${yourClientID}`, // for example, `0oa2am3kk1CraJ8xO1d7`
 scopes: ['openid','email', 'profile'],
 storage: 'sessionStorage',
 redirectUri: 'http://localhost:5173',
 useInteractionCodeFlow: true,
 requireUserSession: 'true',
 authMethod: 'form',
 startService: false,
 useDynamicForm: false,
 uniq: Date.now() + Math.round(Math.random() * 1000), // to guarantee a unique state
};
```

Replace `${yourOktaDomain}` with your Okta domain, and ‘${yourClientID}’ with the application client ID we were given when we created our Okta app. Next up, edit your index.ts to look like this:
```ts
import type { AccessToken, IDToken, TokenManagerInterface, UserClaims } from "@okta/okta-auth-js";
import { OktaAuth } from "@okta/okta-auth-js";
import config from "@/lib/okta/config.ts";
import OktaSignIn from "@okta/okta-signin-widget";


const oktaConfig = {
 url: config.baseUrl,
 issuer: config.issuer,
 clientId: config.clientId,
 redirectUri: config.redirectUri,
 scopes: config.scopes,
} as Record<any, any>;


const authClient = new OktaAuth(oktaConfig);
const oktaSignIn = new OktaSignIn({
 ...oktaConfig,
 redirectUri: `${config.redirectUri}/login/callback`,
 flow: 'signup',
});




const handleCallback = async () => {
 if (!authClient.isLoginRedirect()) return;
 const { tokens } = await authClient.token.parseFromUrl();
 authClient.tokenManager.setTokens(tokens);
}


async function user(): Promise<null | UserClaims> {
 const tokenManager: TokenManagerInterface = authClient.tokenManager;
 const accessToken: AccessToken = await tokenManager.get('accessToken') as AccessToken;


 if (!accessToken) {
  return null;
 }


 try {
  const idToken: IDToken = await tokenManager.get('idToken') as IDToken;
  return await authClient.token.getUserInfo(accessToken, idToken);
 } catch (e) {
  return null;
 }
}


const logout = async () => await authClient.signOut();


const register = async (el: string) => {
 oktaSignIn.remove();
 await oktaSignIn.showSignInAndRedirect({ el });
}


export default {
 user, logout, register, handleCallback
}
```
In index.ts, we: 
Create the OktaAuth object and the OktaSignIn Object (authClient and oktaSignIn, respectively)
We create four functions to help us with our embedded registration.
`handleCallback()`: We use this on our sign-in redirect page to save the token given to us by Okta in the OktaAuth Token Manager.
`user()`: this gets the Okta User information using the saved token. If no token is found or there's an error retrieving the user, we return null.
`logout()`: this uses the authClient object to sign out the user.
`register(el: string)`: this embeds the registration form in whichever valid and empty DOM element selector is passed in as `el`, and, using `OktaSignIn.showSignInAndRedirect()` redirects the application to the redirectURI in our `OktaSignIn` config. The `oktaSignIn.remove()` at the top of the function is necessary in case the component has previously been mounted and a sign-in widget exists in memory.
These functions are exported by a default object, which we’d use as we go.

Making the Layout
Now we create a basic navigation bar to be used in the entirety of our app. Navigate to `src/App.vue` and make the template section look something like this:
```vue
<template>
 <nav v-if="showNav">
   <RouterLink to="/" class="logo">Vue APP</RouterLink>
   <ul class="nav">
     <li>
       <RouterLink to="/about">About Me</RouterLink>
     </li>
     <li>
       <RouterLink to="/contact">Contact Me</RouterLink>
     </li>
   </ul>
   <div class="auth">
     <div v-if="auth.user" class="user">
       <p>Welcome {{ auth.user.name }}</p>
       <button @click="auth.provider.logout" class="btn btn-danger btn-plain">Logout</button>
     </div>
     <RouterLink v-else to="/register" class="login-btn btn">Register</RouterLink>
   </div>
 </nav>
 <RouterView/>
</template>
```
As you can see, we are going to create a `showNav` variable to let us know when to show navigation, and an `auth` object - containing information on our auth provider and the current user. We also use the `logout()` function we created in the Okta helper file as `auth.provider.logout`.
The rest of the code is basic Vue code, a conditional div that shows the user name if the user is registered, else it shows a link to navigate to the registration page.
Next, edit the script to look like this:
```vue
<script lang="ts">
import { defineComponent } from 'vue'
import provider from "@/lib/okta";
import type { UserClaims } from "@okta/okta-auth-js";


const excludedFromNav = [ '/register', '/login/callback' ];
export default defineComponent({
 name: "App",
 data: () => ({
   auth: {
     user: null as UserClaims | null,
     provider: provider
   },
 }),
 computed: {
   showNav() {
     return !excludedFromNav.includes(this.$route.path)
   }
 },
 async mounted() {
   this.auth.user = await provider.user();
 },
})
</script>


```
Using the `mounted()` we call the `user()` that we defined earlier in `src/lib/okta/index.ts` (remember? It uses the saved token to get user info and returns null if the user doesn’t exist or there’s no token).
We also defined an `auth` object that houses the Okta helper object (exported from `src/lib/okta/index.ts`, this is how we call `auth.provider.logout`in the template). The data `auth` object also contains the user object in its initial state, i.e., null.
Then we have the `showNav` computed property, which returns true unless the current page is one of the ones in the `excludedFromNav[]` array. Finally, let’s add in the styling to give the page a good look.

```vue
<style lang="scss">
* {
 font-family: 'Roboto', sans-serif;
}


.logo {
 margin: auto 5px;
 text-transform: uppercase;
 text-decoration: none;
 font-style: italic;
 font-size: 2rem;
 font-weight: bold;
 font-family: 'Montserrat', serif;
}


nav {
 display: flex;
 justify-content: space-evenly;
 width: 100vw;
 border-bottom: 1px solid #c7b8b8;


 ul {
   display: flex;
   list-style: none;


   li {
     margin: 10px;


     a {
       text-decoration: none;
       color: #000;
       text-transform: uppercase;


       &:hover {
         text-decoration: underline;
       }
     }
   }
 }
}


.btn {
 cursor: pointer;
 color: #fff;
 background: #0d6efd;
 border: 1px solid transparent;
 text-decoration: none;
 font-weight: 400;
 line-height: 1.5;
 text-align: center;
 padding: 6px 12px;
 font-size: 16px;
 border-radius: .25rem;
 transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;


 &:hover {
   background-color: #0b5ed7;
   border-color: #0a58ca;
 }


 &-plain {
   color: #0d6efd;
   background: transparent;
   border: 1px solid #0d6efd;


   &:hover {
     color: #fff;
     background: #0d6efd;
   }
 }


 &-danger {
   padding: 6px 12px;
   color: #d70b0b;
   border-color: #d70b0b;
   margin: auto 10px;
 }
}


.login-btn {
 display: block;
 margin-top: 10px;
}


.user {
 display: flex;
 margin-top: 10px;
}
</style>
```
Now, if we navigate to our page, we should get this:





However, if we click the register button, we get a 401 (a vue blank page), because we haven’t created that page yet.

Creating the Registration Components
In the `views` folder, create a Register.vue file and add this code:
```vue
<script lang="ts">
import '@okta/okta-signin-widget/css/okta-sign-in.min.css';
import { defineComponent } from 'vue'
import  provider from "@/lib/okta";


export default defineComponent({
 name: "Register",
 async mounted() {
   provider.register('#osw-container');
 }
})
</script>


<template>
 <div id="osw-container"></div>
</template>


<style scoped>


</style>
```
At the top of the script tag, we import the Okta sign-in widget CSS. This is very important so we don’t end up with a wonky-looking registration page.
In the `mounted()`, we call in the `register()` function we defined in the Okta helper file earlier and pass in the empty div we created with ID `osw-container`. Next, we create the login callback view.

Navigate to `src/views` and create a `LoginCallback.vue` file with this code:
```vue
<script lang="ts">
import { defineComponent } from 'vue';
import provider from "@/lib/okta";


export default defineComponent({
 name: "LoginCallback",
 async mounted() {
   await provider.handleCallback();
   window.location.href = '/';
 },
})
</script>
<template></template>
```
This component, when mounted, calls the `handleCallback()` in the helper file to check if the page is an Okta login redirect page. If it is, it sets the tokens and then redirects to the home page. However, if you wanted to redirect to some other page after registration, you could replace the line that has `window.location.href=’/’` with your custom logic, maybe using route params or route query.
Lastly, let’s add these routes to our router; the new `src/router/index.ts` should look like this:
```ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import LoginCallback from "@/views/LoginCallback.vue";
import Register from "@/views/Register.vue";


const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/login/callback", component: LoginCallback },
  { path: "/register", component: Register },
 ],
})


export default router
```
As you can see, the two new views have been added.

Now, if you go to your Vue app home(http://localhost:5173) and click the register button, you should get a page similar to this:

You can customize this page with your logos, loaders, backgrounds e.t.c. using the sign-in widget customization configuration, and in Vue.

Once you register, you should be redirected to a page similar to this:

And with that, we’re done!
