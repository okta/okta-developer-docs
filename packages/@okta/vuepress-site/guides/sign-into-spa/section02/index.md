---
title: Define the Login Redirect/Callback
---
## Define the Login Redirect/Callback

The login flow for a single-page application (SPA) is similar to the following:

1. The user loads your SPA app at some route, such as **X**.
1. The user clicks **Login** or attempts access to a secure resource.
2. The user's browser is redirected to Okta's site for authentication.
3. The user successfully authenticates with Okta.
4. Okta redirects the browser back to a specific `Login Redirect URI` that you have defined, along with an access token.
5. Your SPA application is loaded at the route you defined as the `callback handler` that reads and stores the access token.
6. The user is redirected back to the original route **X**.

### Login Redirect URI

In your SPA app, you should define a new route where your app can handle the redirect callback.

On successful authentication, an access token is present in the hash fragment of this URI for your app to consume.

Ultimately, your app is responsible to read this token from the URI and pass it to the `handleAuthorization()` method, which  stores the access token in `localStorage`. After this, your app should complete the flow by redirecting to the original route. 

Luckily, we have provided components that implement this logic for you. See [Handle the Callback from Okta](handle-the-callback-from-Okta).

#### Background: Routing in a SPA

Unlike traditional web applications where all HTML is rendered on a server and returned to the client, a SPA usually includes only a minimal amount of HTML returned from the server. The vast majority of HTML is rendered client-side and the DOM is updated dynamically using Javascript.

To create the illusion of multiple 'pages' while also maintaining support for browser reload on any 'page', most SPAs define a set of 'routes' mapped from a path element or hash fragment of the URI.

On the server side, all paths that are handled by the SPA are usually set in a wildcard fashion to return the same response: a static HTML document that loads the SPA.

The path you choose for the `Login Redirect URI` should serve your SPA even after a 'hard' browser reload. Depending on your setup and the path you choose, this may require additional server configuration.






