---
title: Auth JS redirect guide
---

The [Okta JavaScript Auth SDK](https://github.com/okta/okta-auth-js),(Auth JS), provides functionality to help implement a wide variety of web authentication solutions for both the [redirect and embedded model](/docs/concepts/redirect-vs-embedded/). This guide shows you how to create a very simple redirect authentication solution using Auth JS, which can be dropped into just about any front-end or server-side web application.

---

**Learning outcomes**

* Understand how to implement a simple redirect sign-in using Auth JS.
* Understand basic installation and code configurations using AuthJS.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)

**Sample code**

* [redirect-authjs-sample-tbd](https://github.com/okta/okta-auth-js/tree/master/samples/generated/static-spa)

---

## About the Okta Auth JavaScript SDK

The Okta Auth JS SDK builds on top of the [Authentication API](/docs/reference/api/authn/) and [OpenID Connect API](/docs/reference/api/oidc/), as well as the Identity Engine [interaction code](/docs/concepts/interaction-code/) flow, to enable you to create a variety of sign-in experiences.

This experience includes fully branded embedded authentication, as you’ll see with with [Auth JS fundamentals](/docs/guides/auth-js/), and it also includes redirect authentication. Auth JS is used by Okta's [Sign-in Widget](https://github.com/okta/okta-signin-widget), which powers the default Okta sign-in page, and it also powers our other redirect SDKs that provide simple authentication for server-side web apps and single-page JavaScript apps (see the [quickstart guides](/docs/guides/quickstart/))

In this guide we are going to show you that you don’t need to use a specific server-side or front-end framework that Okta officially supports to get access to redirect authentication. It is possible to use Auth JS to create a drop-in solution that can work with just about any web app, whether you are adding centralized sign-in to a new app, or retrofitting it to an existing app.

If you'd like to explore the entire Auth JS SDK, see [Okta Auth JS JavaScript SDK](https://github.com/okta/okta-auth-js/#readme).

### Create an Okta app integration

An Okta app integration represents your app in your Okta org. The integration configures how your app integrates with the Okta services including which users and groups have access, authentication policies, token refresh requirements, redirect URLs, and more. The integration includes configuration information required by the app to access Okta.

1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
1. Click the **Admin** button on the top right of the page.
1. Open the Applications configuration pane by selecting **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select a **Sign-in method** of **OIDC - OpenID Connect**, then click **Next**.
1. Select an **Application type** of **Web Application**, then click **Next**.
   > **Note:** If you choose an inappropriate application type, it can break the sign-in or sign-out flows by requiring the verification of a client secret, which is something that public clients don't have.
1. Enter an **App integration name**.
1. Enter the **Sign-in redirect URIs** for local development, such as `http://localhost:xxxx/authorization-code/callback`.
1. Enter the **Sign-out redirect URIs** for both local development, such as `http://localhost:xxxx/signout/callback`. For more information on callback URIs, see [Define  callback route](#define-a-callback-route).
1. In the **Assignments** section, define the type of **Controlled access** for your app. Select the **Everyone** group for now. For more information, see the [Assign app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-user-app-assign) topic in the Okta product documentation.
1. Click **Save** to create the app integration. The configuration pane for the integration opens after it's saved. Keep this pane open as you copy some values when configuring your app.

### Create a basic app

To make this example as versatile as possible, we are going to provide a very simple starter app that redirects to Okta to sign in as soon as you load it into the browser. In your own apps, you might want to initiate the redirect through the press of a Sign In button, or when visiting a certain route that requires authentication (such as an admin page). The key is that you initiate the sign in through the redirect.

#### Create a simple HTML UI

In your app directory, create a new HTML file called `index.html`. Add the following markup to this file:

```HTML
<html>
<head>
<script src=”main.js” defer></script>
<meta charset="utf-8" />
<title>Simple Auth JS Redirect Application</title>
</head>
<body>
<h1>Auth JS Redirect Application</h1>
<p>Welcome! You are currently logged out.</p>
<p>Click the following sign-in button:</p><br><br>
<button type="button" value="Submit">Sign in</button>
</body>
</html>
```

#### Install the Auth JS SDK

Include this script in your target HTML page (`index.html`) by including the following above your previous `<script>` element:

```html
<!-- Latest CDN production Auth JS SDK-->
<script src="https://global.oktacdn.com/okta-auth-js/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/okta-auth-js.polyfill.js" type="text/javascript"></script>
```

Note: If you are using a package manager, you can also install it via the appropriate command, for example `yarn add @okta/okta-auth-js` or `npm install @okta/okta-auth-js`.

#### Create a JavaScript file

In the same directory as you `index.html` file, create a new file called `main.js`. This JavaScript file is referenced in the `index.html` file.

#### Initialize the SDK

The first action to take is to initialize the SDK by creating a new instance of the OktaAuth() object. This object stores all the necessary config information for your auth session, and is used to control subsequent steps of the process.

Add the following code to your `main.js` file:

```JavaScript
try {
  authClient = new OktaAuth({
    issuer: config.issuer,
    clientId: config.clientId,
    redirectUri: config.redirectUri,
    scopes: config.scopes,
    useInteractionCodeFlow: true,
    tokenManager: {
        storage: config.storage
    },
    transformAuthState
  });

  if (config.startService) {
    authClient.start();
  }
} catch (error) {
  return showError(error);
}
```

Fill in the values for the following properties:

* issuer:
* clientId:
* redirectUrl:
* scopes:
* useInteractionCodeFlow:
* storage:
* transformAuthState:

### Sign-in user by redirecting

Just a couple of buttons and a UL to display user data in?
When it’s time to ensure the user is authenticated (and authorized)…redirect by (instead function here)

### Handle the return from redirect

When the log-in button is clicked, etc., what do you do to handle the sign in process?

Validate token

### Get info about the user

Like in the other QSes
(Currently: by default this SDK will return the JWT with the user information)
(Future: time TBD… it will have ability to return the Auth Code)

### Test your app

Test your app, like in the QSes. Use localhost.

Sample app will start redirect flow as soon as page opens.

### Use Cases

Retrofitting
Centralized Login
Utility Application

### Next steps

Explain what we don’t cover, e.g. handling routes, authentication per route, etc. We didn’t want to build our own SPA framework to show you how to do all this. Just basic sign-in. But point them to the other QSes for plenty of examples of handling this.

Sign-out - App VS Okta Global session
Sign-in Policy
Recovery
Sign-up

Talk about session management, and what happens when page is refreshed…(decision: app manages session or use the “built-in token manager”)

### See also

Links to other useful info

Note: LINK TO OTHER ARTICLES SHOWING AUTH JS INFO AND REDIRECT QSES
