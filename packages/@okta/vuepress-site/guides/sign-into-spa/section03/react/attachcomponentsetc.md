## Attach Components to the Secure Router

You need to provide these routes in your sample application so that we can sign the user in and handle the callback from Okta. We show you how to set these up below using [React Router DOM](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom):

- `/`: A default home page to handle basic control of the app.
- `/implicit/callback`: This is where auth is handled for you after redirection.

## Provide the Login and Logout Buttons

In the relevant location in your application, you want to provide `Login` and `Logout` buttons for the user. You can show/hide the correct button by using the `auth.isAuthenticated()` method. For example:

{code}

## Update Your App.js

Finally, pass in your configuration into `Security` and connect your application's paths:

{code}