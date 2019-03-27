## Attach Components to Routes
You need to provide these routes in your sample application so that we can sign the user in and handle the callback from Okta. We show you how to set these up below using [Vue Router](https://router.vuejs.org/en/essentials/getting-started.html):

- `/`: A default home page to handle basic control of the app.
- `/implicit/callback`: Handle the response from Okta and store the returned tokens.

## Provide the Login and Logout Buttons

In the relevant location in your application, you want to provide `Login` and `Logout` buttons for the user. You can show/hide the correct button by using the `$auth.isAuthenticated()` method. For example:

Code example

## Create the Callback Handler

In order to handle the redirect back from Okta, you need to capture the token values from the URL. Use `/implicit/callback` as the callback URL and specify the default `Auth.handleCallback()` component included.

Code example