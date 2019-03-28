## Attach Components to Routes

You need to provide these routes in your sample application so that we can sign the user in and handle the callback from Okta. We show you how to set these up below using [Angular Router](https://angular.io/guide/router):

- `/`: A default home page to handle basic control of the app.
- `/implicit/callback`: Handle the response from Okta and store the returned tokens.

## Provide the Login and Logout Buttons

In the relevant location in your application, you want to provide `Login` and `Logout` buttons for the user. You can show/hide the correct button by using the `oktaAuth.isAuthenticated()` method. For example:

Code example

## Create the Callback Handler

In order to handle the redirect back from Okta, you need to capture the token values from the URL. Use `/implicit/callback` as the callback URL and specify the default `OktaCallbackComponent` and declare it in your `NgModule`.

Code example

## Update Your NgModule

Finally, import the `OktaAuthModule` into your `NgModule` and instantiate it by passing in your configuration object:

Code example