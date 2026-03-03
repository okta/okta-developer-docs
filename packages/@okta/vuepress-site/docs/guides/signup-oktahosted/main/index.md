---
title: Sign users up with an Okta-hosted sign-up form
excerpt: Sign users up for your app by redirecting them to an Okta-hosted enrollment form
layout: Guides
---

Learn how to implement a Self-Service Registration (SSR) flow on a page using the Okta-hosted Sign-In Widget. Then, learn how to customize an out-of-the-box experience for your app using the Okta Auth JavaScript SDK.

---

#### Learning outcomes

* Understand how to set up a basic Svelte/SvelteKit app.
* Understand how to use Okta Auth JavaScript SDK in a JavaScript web app.
* Understand how Okta app integrations and access policies work.

#### What you need

* Node JS LTS installed
* An IDE of your choice, like JetBrains or VSCode, installed
* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Familiarity with the [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#introduction)

---

## Okta setup

Before writing any code, you must configure your Okta org to recognize and manage your Svelte app. This section walks you through three essential backend configurations:

* **Create an App Integration**: Establishes your Svelte app's identity within Okta. You define its redirect URIs and obtain a Client ID, which is crucial for connecting your front end to Okta.

* **Configure an Access Policy**: Grants your new app permission to request authentication tokens from an Okta authorization server. It acts as a security checkpoint for your API.

* **Enable Self-Service Registration (SSR)**: Sets up a policy that allows new users to create their own accounts directly from the Okta Sign-In Widget, a key feature for public-facing apps.

### Create the app integration for Svelte

The Okta app integration represents your Svelte app in your Okta org and lets you configure how it interacts with Okta services:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**, and then select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** as your app type, then click **Next**.
1. Give the app integration a name, for example, **Svelte**.
1. Make sure that **Authorization Code** is selected as the grant type.
1. Add the local development URI of `http://localhost:5000` for the following fields:
    * **Sign-in redirect URIs**
    * **Logout redirect URIs**
    * **Base URIs** in the **Trusted Origins** section
1. In the **Assignments** section, select **Allow everyone in your organization to access** for controlled access.
1. Clear the **Enable immediate access with Federation Broker Mode** checkbox, and then click **Save**.
1. Make note of your app integration's Client ID. You need this later.

> **Note**: For more detailed information on app integration options, see [Create OpenID Connect app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_App_Integration_Wizard-oidc).

### Configure an access policy

Configure an access policy for your app:

1. Go to **Security** > **API**.
1. Click **default** for the Okta default custom authorization server.
1. Click the **Access Policies** tab, and then click **Add New Access Policy** or **Add Policy** if you haven't added any policies yet.
1. Give the policy a name, such as **Svelte Policy** and add a simple description.
1. Select **The following clients** in the **Assign to** field, type the name of your app, and then select it from the list.
1. Click **Create Policy**.

#### Add a rule

Add a simple rule to your policy.

1. On the **default** authorization server page, select your policy on the left.
1. Click **Add rule**.
1. Enter a name for the rule, and leave the defaults.
1. Click **Create rule**.

### Set up a user profile policy

Set up a user profile policy to allow your users to perform Self-Service Registration (SSR). This enables the user to sign up for your app using the Okta-hosted Sign-In Widget.

1. Go to **Security** > **User Profile Policies**.
1. Click **Add user profile policy** and enter a policy name, such as **Self-Service Registration**.
1. Click **Save**.
1. Click pencil icon next to your policy to make edits.
1. In the **Profile Enrollment** section of the **Enrollment** tab, click **Edit**.
1. Verify that **Self-service registration** is set to **Allowed**.
1. Clear the **Required before access is granted** checkbox for **Email verification**.

   > **Note**: In this example, you want to test with fake emails during development. After your app is live, turn this back on.

1. Click **Save**.
1. Select the **Apps** tab, and then click **Add an App to This Policy**.
1. Locate your app, click **Apply** next to it, and click **Close**.

> **Note**: See [Enable and configure a sign-up form](/docs/guides/enable-configure-signupform/main/) for more detailed information on configuring SSR.

## Set up the Svelte project

To set up your Svelte app, you need to first set up the Svelte project:

1. Create a directory for your project and open it in your [IDE](#what-you-need).
1. In your IDE's integrated terminal, run the SvelteKit creation script: `npx sv create .`

   The `.` argument instructs the script to use the current directory.

   > **Note**: You may see a prompt that the directory isn't empty. This is expected if your IDE has created hidden configuration files. It's safe to continue.

   The setup script presents several choices. Use the following options to configure your project:

   * **Template**: `SvelteKit minimal`
   * **Type checking**: `Yes, using TypeScript syntax`
   * **Additional libraries**: `None` (for this example)
   * **Package manager**: `npm`

1. Finally, install the project dependencies: `npm install`

## Use Auth JS with Svelte

Enable a basic, self-registration flow with Okta in this section using Auth JS with a Svelte app.

### Set up the Okta Auth JavaScript SDK

1. In your IDE, go to your terminal and run: `npm install @okta/okta-auth-js`.
2. Go to `src/lib` and create an `okta` folder.

   > **Note**: In production, the folder naming convention would be different, for example, `providers/iam/okta`. This allows for the addition of new IAM providers. Also, you would create a standardized `IAMProvider` class that any new provider can implement.

3. In the `okta` folder, create a `config.ts` file and an `index.ts` file. Your `config.ts` file should look something like the following example:

#### Config.ts example

```ts
export default {
 issuer: `https://${yourOktaDomain}/oauth2/default`,
 baseUrl: `https://${yourOktaDomain}`,
 clientId: `${yourClientID}`,
 scopes: ['openid', 'email', 'profile'],
 storage: 'sessionStorage',
 redirectUri: 'http://localhost:5000',
 useInteractionCodeFlow: true,
 requireUserSession: 'true',
 authMethod: 'form',
 startService: false,
 useDynamicForm: false,
 uniq: Date.now() + Math.round(Math.random() * 1000), // to guarantee a unique state
};
```

> **Note**: The `redirectUri` property is the same as the sign-in redirect URI that you configured in the [Create the app integration for Svelte](#create-the-app-integration-for-svelte) section.

4. In the `index.ts`, add some helper functions to help with authentication:

#### Helper functions example

```ts
import config from "$lib/okta/config";
import OktaAuth from "@okta/okta-auth-js";
import type { AccessToken, IDToken, TokenManagerInterface, UserClaims } from "@okta/okta-auth-js";


const authClient = new OktaAuth({
 url: config.baseUrl,
 issuer: config.issuer,
 clientId: config.clientId,
 redirectUri: config.redirectUri,
 scopes: config.scopes,
} as Record<any, any>);


async function login() {
 return await authClient.token.getWithRedirect({ responseType: [ 'id_token' ] });
}

export async function user(): Promise<null | UserClaims> {
 if (authClient.isLoginRedirect()) {
  const { tokens } = await authClient.token.parseFromUrl();
  authClient.tokenManager.setTokens(tokens);
 }
 const tokenManager: TokenManagerInterface = authClient.tokenManager;
 const accessToken: AccessToken = await tokenManager.get('accessToken') as AccessToken;

 if (!accessToken) {
  return null;
 }
 const idToken: IDToken = await tokenManager.get('idToken') as IDToken;
 return await authClient.token.getUserInfo(accessToken, idToken);
}

export const logout = async () => await authClient.signOut();

export default {
 user, logout, login
}
```

* `login()`: Uses Auth JS to redirect the user to the Okta-hosted Sign-In Widget to begin the authentication flow
* `user()`: Handles the post-authentication redirect from Okta, processes the authentication tokens, and retrieves the authenticated user's profile information
* `logout()`: Clears the user's local session and signs them out of Okta

The final lines bundle these functions into a single, importable object to provide a reusable authentication service for your app.

5. In `routes/+layout.svelte`, create a basic navigation bar. Your script tag should look something like the following example:

#### Script tag example

```ts
import favicon from '$lib/assets/favicon.svg';
import provider from "$lib/okta";
import { onMount } from "svelte";

onMount(async () => {
 let response = await provider.user();
 if (response) user = response;
})

let user = $state(null);
let { children } = $props();
```

   The user function checks if the user is authenticated, gets the user information, and then saves it in state using the [`onMount()`](https://svelte.dev/docs/svelte/lifecycle-hooks#onMount) callback function. Saving in state enables you to only check for the user after the component is mounted.

6. In the HTML section, add the following navigation bar code just after the `</svlete:head>` tag:

#### Svelte component example

```html
<nav>
 <p class="logo">Svelte</p>
 <ul class="nav">
   <li><a href="/about">About</a></li>
   <li><a href="/something">Something</a></li>
   <li><a href="/something-else">Something Else</a></li>
 </ul>
 <div class="auth">
   {#if user}
     <div class="user">
       <p>Welcome {user.name}</p>
       <button onclick={provider.logout} class="logout-btn btn-2">Logout</button>
     </div>
   {:else}
     <button class="login-btn btn" onclick={provider.login}>Login</button>
   {/if}
 </div>
</nav>
```

   This is a simple navigation bar that displays the user's name after they sign in. The two buttons use the `logout` and `login` functions that you created earlier.

7. Finally, create a `<style>` tag and add some CSS:

#### CSS example

```css
* {
 font-family: 'Roboto', sans-serif;
}

nav {
 display: flex;
 justify-content: space-evenly;
 width: 100vw;
 border-bottom: 1px solid #c7b8b8;
}

nav ul {
 display: flex;
 list-style: none;
}

p.logo {
 margin: auto 5px;
 text-transform: uppercase;
 font-style: italic;
 font-size: 2rem;
 font-weight: bold;
 font-family: 'Montserrat', serif;
}

nav ul li {
 margin: 10px;
}

nav ul li a {
 text-decoration: none;
 color: #000;
 text-transform: uppercase;
}

nav ul li a:hover {
 text-decoration: underline;
}

button.btn-2 {
 cursor: pointer;
 outline: 0;
 display: inline-block;
 font-weight: 400;
 line-height: 1.5;
 text-align: center;
 background-color: transparent;
 border: 1px solid transparent;
 padding: 6px 12px;
 font-size: 1rem;
 border-radius: .25rem;
 transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
 color: #0d6efd;
 border-color: #0d6efd;
}

button.btn-2:hover {
 color: #fff;
 background-color: #0d6efd;
 border-color: #0d6efd;
}

button.btn {
 cursor: pointer;
 color: #fff;
 background-color: #0d6efd;
 border: 1px solid transparent;
 font-weight: 400;
 line-height: 1.5;
 text-align: center;
 padding: 6px 12px;
 font-size: 16px;
 border-radius: .25rem;
 transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

button.btn:hover {
 color: #fff;
 background-color: #0b5ed7;
 border-color: #0a58ca;
}

.login-btn {
 margin-top: 10px;
}

button.logout-btn {
 padding: 6px 12px;
 color: #d70b0b;
 border-color: #d70b0b;
 margin: auto 10px;
}

.user {
 display: flex;
 margin-top: 10px;
}
```

### Run and test the app

With all the components configured, you're ready to test the end-to-end authentication flow.

1. Start the Svelte development server by running this command in your terminal: `npm run dev -- --port 5000`

   The `--port 5000` flag is required because it matches the sign-in redirect URI that you configured in your [Okta app integration](#create-the-app-integration-for-svelte) and `src/lib/okta/config.ts` file.

   Your app launches on `localhost:5000` and displays the sign-in page.

<div class="three-quarter border">

![Image of Svelte app with Login button](/img/siw/svelteapp1.png)

</div>

1. Click **Login** to test the authentication flow. You’re redirected to the Okta-hosted Sign-In Widget.

1. Register for a new account. After you authenticate, Okta redirects you back to your app, which now displays the user's information.

<div class="three-quarter border">

![Image of Svelte app after redirect](/img/siw/svelteapp2.png)

</div>

### Display content dynamically

You can use the [div class="auth" section](#svelte-component-example) to conditionally display content based on the user's authentication state in a couple of ways:

* Pass [`props`](https://svelte.dev/docs/svelte/$props): The standard Svelte approach is to pass the user information as props (properties) from a parent component to a child component.

* Use `AuthStateManager`: The Okta Auth JavaScript SDK provides an `AuthStateManager` to access the state directly.

The `AuthStateManager` method subscribes to the state:

```ts
authClient = new OktaAuth(config);

// Subscribe to the authState change event.
authClient.authStateManager.subscribe(function(authState) {
 // Logic based on authState is done here.
 if (!authState.isAuthenticated) {
  // render unauthenticated view
  return;
 }

 // Render authenticated view
});
```

However, since you have a [Helper object](#helper-functions-example), move the `subscribe` method to the Helper object:

1. Go to `src/lib/okta/index.ts` and add the following file before the exports at the bottom:

```ts
import type { AuthState } from "@okta/okta-auth-js";

//...rest of the code
export const subscribe = (onAuthChange: (authState: AuthState) => void) => {
 authClient.start();
 authClient.authStateManager.subscribe(onAuthChange);
}
```

2. Add the function into your export. It should look something like the following example:

```ts
export default {
 user, logout, login, subscribe
}
```

3. Use the subscribe method in `src/routes/+layout.svelte` in the `onMount` callback:

```ts
let isAuthenticated = $state(false);
onMount(async () => {
 let response = await provider.user();
/* provider.user() has to run before provider.subscribe */
 provider.subscribe((auth) => isAuthenticated = auth.isAuthenticated);
 //...
})
```

You can now use the `isAuthenticated` variable in any layout component. This eliminates the need to pass `isAuthenticated` as a `prop`. Instead, call the subscribe method within a component's `onMount()` function to access the authentication state directly.

> **Note**: The `provider.user()` has to run before `provider.subscribe` because `provider.user` contains `authClient.token.isLoginRedirect()`. This method has to run before `authClient.authStateManager.subscribe()`.
## Related topics

You have now implemented a self-service registration flow with Svelte and the Okta-hosted Sign-In Widget.

To learn more, explore our resources on Self-Service Registration and the Sign-In Widget:

* [Enable and configure a sign-up form](/docs/guides/enable-configure-signupform/main/)
* [The Okta Sign-In Widget](/docs/concepts/sign-in-widget/)
<!-- * [Plan self-service registration flows](/docs/concepts/self-service-registration/)-->
<!-- * [Create a self-hosted sign-up form by embedding the Sign-In Widget]() -->
