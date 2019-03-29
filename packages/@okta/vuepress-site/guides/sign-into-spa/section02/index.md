---
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






