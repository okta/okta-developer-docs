---
<<<<<<< HEAD
title: Create an Okta Application
---
## Create an Okta Application

In Okta, applications are OpenID Connect (OIDC) clients that can use Okta Authorization Servers to authenticate users. Your Okta org already has a default Authorization Server, so you just need to create an OIDC client that uses it.

1. Sign in to the Okta Developer Console, click **Applications**, and then **Add Application**.
2. Select **Single-Page App (SPA)** as the platform, and then click **Next**.
3. Provide a name for your SPA application or leave the default value.
4. Enter the correct port in the **Base URIs** box, for example: `http://localhost:{port}`, and then enter the correct port in the **Login redirect URIs** box, for example: `http://localhost:{port}/implicit/callback`. 

If you are running this app locally and are using the defaults from the appropriate documentation, then your port is:

<StackSelector snippet="port"/>

5. Leave **Implicit** selected for **Grant Types Allowed**.
6. Click **Done**.
7. On the **General** tab of the app that you just created, click **Edit** and enter the correct URI in the **Logout redirect URIs** box. <!-- See [Sign Users Out]for more information. -->

### Things You Need
After you create the application, there are two values that you need:

* **Client ID** - Find it in the applications list or on the **General** tab of a specific application.
* **Org URL** - Find it on the Developer console dashboard in the upper-right corner. 

These values are used in your application to set up the OpenID Connect flow with Okta.
=======
title: Login Redirect / Callback
---

# Login Redirect / Callback

The login flow for a SPA app goes something like:

1. User loads your SPA app at some route 'X'
1. User clicks login button or attempts access to a secure resource
2. User's browser is redirected to Okta's site for authentication
3. User successfully authenticates with Okta
4. Okta redirects the browser back to a specific `Login Redirect URI` (which you have defined), along with an access token
5. Your SPA application is loaded at the route you have defined as the 'callback handler' which reads and stores the access token
6. The user is redirected back to the original route 'X'


# Login Redirect URI

In your SPA app, you should define a new 'route' where your app can handle the redirect callback.

On successful authentication, an access token will be present in the hash fragment of this URI for your app to consume.

Ultimately, your app is responsible to read this token from the URI and pass it to the `handleAuthorization()` method, which will store the access token in localStorage. After this, your app should complete the flow by redirecting to the original route. 

Luckily, we have provided components which implement this logic for you! See [Handling Callback](handling-callback)

## Background: Routing in SPA Application

Unlike traditional web applications where all HTML is rendered on a server and returned to the client, a Single Page Application (SPA) usually includes only a minimal amount of HTML returned from the server. The vast majority of HTML is rendered client-side and the DOM is updated dynamically using Javascript.

To create the illusion of multiple 'pages' while also maintaining support for browser reload on any 'page', most SPA applications define a set of 'routes' mapped from a path element or hash fragment of the URI.

On the server side, all paths which are handled by the SPA app are usually set in a wildcard fashion to return the same response: a static HTML document which loads the SPA application.

The path you choose for the `Login Redirect URI` should serve your SPA application even after a "hard" browser reload. Depending on your setup and the path you choose, this may require additional server configuration.




>>>>>>> bb923a3... further clarification on config


