---
title: Okta Sign-In Widget Guide
language: JavaScript
icon: code-javascript
excerpt: A drop-in widget with custom UI capabilities to power sign-in with Okta.
---

The Okta Sign-In Widget is a JavaScript library that gives you a fully-featured and customizable login experience which can be used to authenticate users on any website.

Okta uses the Widget as part of its normal sign-in page. If you would like to customize the Widget, then you will need to host it yourself. This guide will walk you through the [installation process](#installation) for the Widget, as well as [a few common use cases](#use-cases) for the Widget and how to implement them. The full Widget reference can be found [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget).

> A version of the Widget that you can edit in real time can be found here: <https://developer.okta.com/live-widget/>

<img src="/img/okta-signin.png" alt="Screenshot of basic Okta Sign-In Widget" width="400">

## Installation

The first step is to install the Widget. For this, you have two options: linking out to the Okta CDN, or local installation via npm instead.

### CDN

To use the CDN, include this in your HTML:

```html
<!-- Latest CDN production JavaScript and CSS -->
<script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

More info, including the latest published version, can be found in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

### npm

```
# Run this command in your project root folder.
npm install @okta/okta-signin-widget@-=OKTA_REPLACE_WITH_WIDGET_VERSION=-
```

More info, including the latest published version, can be found in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-npm-module).

#### Bundling the Widget

If you are bundling your assets, import them from `@okta/okta-signin-widget`. For example, using [webpack](https://webpack.js.org/):

```javascript
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
```

> Loading CSS requires the css-loader plugin. You can find more information about it [here](https://github.com/webpack-contrib/css-loader#usage).

### Enabling Cross-Origin Access

Because the Widget will be making cross-origin requests, you need to enable Cross Origin Access (CORS) by adding your application's URL to your Okta org's Trusted Origins (in **API** > **Trusted Origins**). More information about this can be found on the [Enable CORS](/docs/guides/enable-cors/) page.

> If you are using the Widget to sign users in to your own application, then you can skip this step. When you create an Application in Okta, you will need to specify a `redirectURI`, and the Okta Developer Console will automatically add it as a CORS URL.

## Usage

Once you have installed the Widget and enabled CORS, you can start using it.

### Initializing the Widget

The code that initializes the Widget looks like this:

```javascript
<div id="widget-container"></div>

<script>
  var signIn = new OktaSignIn({baseUrl: 'https://${yourOktaDomain}'});
  signIn.renderEl({
    el: '#widget-container'
  }, function success(res) {
    if (res.status === 'SUCCESS') {
      console.log('Do something with this sessionToken', res.session.token);
    } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  });
</script>
```

<DomainAdminWarning />

#### Mobile Consideration

To ensure that the Widget renders properly on mobile, include the `viewport` metatag in your `head`:

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
```

### Use Cases

The Widget can handle a number of different authentication scenarios. Here are a few common ones:

#### Sign In and Display User's Email

In this case, you would like to use the Widget to sign in to a simple web page and display the user's email. This requires an Okta developer account, and you have to create a new Single-Page App (SPA) for it to work.

Sign in to your Okta developer dashboard and navigate to **Applications** > **Add Application**. Choose **Single-Page App** and click **Next**. Set `http://localhost:8080` as a Login redirect URI and click **Done**. The next page will show a client ID that you'll need to use in the code below.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <title>Simple Web Page</title>
    <style>
      h1 {
        margin: 2em 0;
      }
    </style>
    <!-- widget stuff here -->
    <script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
    <link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
  </head>
  <body>
    <div class="container">
      <h1 class="text-center">Simple Web Page</h1>
      <div id="messageBox" class="jumbotron">
        You are not logged in. Get outta here! Shoo! >:S
      </div>
      <!-- where the sign-in form will be displayed -->
      <div id="okta-login-container"></div>
      <button id="logout" class="button" onclick="logout()" style="display: none">Logout</button>
    </div>
    <script type="text/javascript">
      var oktaSignIn = new OktaSignIn({
        baseUrl: "https://${yourOktaDomain}",
        clientId: "${yourClientId}",
        authParams: {
          issuer: "https://${yourOktaDomain}/oauth2/default",
          responseType: ['token', 'id_token'],
          display: 'page'
        }
      });

      if (oktaSignIn.hasTokensInUrl()) {
        oktaSignIn.authClient.token.parseFromUrl().then(
          // If we get here, the user just logged in.
          function success(res) {
            var accessToken = res.tokens.accessToken;
            var idToken = res.tokens.idToken;

            oktaSignIn.authClient.tokenManager.add('accessToken', accessToken);
            oktaSignIn.authClient.tokenManager.add('idToken', idToken);

            document.getElementById("messageBox").innerHTML = "Hello, " + idToken.claims.email + "! You just logged in! :)";
            document.getElementById("logout").style.display = 'block';
          },
          function error(err) {
            console.error(err);
          }
        );
      } else {
        oktaSignIn.authClient.token.getUserInfo().then(function(user) {
          document.getElementById("messageBox").innerHTML = "Hello, " + user.email + "! You are *still* logged in! :)";
          document.getElementById("logout").style.display = 'block';
        }, function(error) {
          oktaSignIn.renderEl(
            { el: '#okta-login-container' },
            function success(res) {},
            function error(err) {
              console.error(err);
            }
          );
        });
      }

      function logout() {
        oktaSignIn.authClient.signOut();
        location.reload();
      }
    </script>
  </body>
</html>
```

Copy the code above into an `index.html` file on your hard drive.

For this example to work, you'll need to host it on a web server that runs locally on port 8080. The simplest way to do this is to use Python. If you have Python 2 installed, use the command `python -m SimpleHTTPServer 8080`, otherwise, if you're using Python 3 you can run the command `python -m http.server 8080` from the same directory as your `index.html` file.

> **Note:** You can check the version of Python on your system by running the command `python -V`. If for some reason you don't have the `python` command available, you might need to run `python3 -m http.server 8080` as on some systems, Python is named `python3` instead of `python` -- confusing, right?

Once you get Python running an HTTP server, you'll be able to access your page at `http://localhost:8080`.

#### Sign In to Okta with the Default Dashboard

In this case, you would like to use the Widget to sign in to the default Okta dashboard. This requires taking the Widget initialization code, and modifying the success behavior so that it redirects to your org's dashboard.

```javascript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://${yourOktaDomain}/app/UserHome');
  }
}
```

##### Sign In to Okta and SSO Directly to an App

If you'd like to sign the user directly in to an application within Okta, you just redirect to the specific URL for that application. To find that URL, go to that application's page in your Okta org and find [the embed link](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-apps-page-show-application-embed-links).

#### Sign In to Okta with a Custom Dashboard

If you are still signing your users in to Okta, but you don't want to use the Okta dashboard, then you can change the redirect URL to point to your custom portal instead.

```javascript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://example.com/dashboard');
  }
}
```

#### Sign In to Your Application

If you'd like to use the Widget to sign in to your own application instead of Okta, you will have to [set-up a custom Authorization Server](/docs/guides/customize-authz-server/) in Okta. The Widget also needs to be configured to prompt the user to sign in, and then extract an ID token after a successful redirect:

```javascript

var signIn = new OktaSignIn({
  baseUrl: 'https://${yourOktaDomain}',
  el: '#widget-container',
  authParams: {
    issuer: 'https://${yourOktaDomain}/oauth2/default'
  }
});

signIn.showSignInToGetTokens({
  clientId: '${clientId}',

  // must be in the list of redirect URIs enabled for the OIDC app
  redirectUri: '${redirectUri}',

  // Return an access token from the authorization server
  getAccessToken: true,

  // By default, new applications are configured to use the Authorization Code Flow with Proof-of-Code-Key-Exchange (PKCE)
  // If your application uses the Implicit Flow instead, tell the widget not to use PKCE by uncommenting the below line
  // pkce: false,

  // Return an ID token from the authorization server
  getIdToken: true,
  scope: 'openid profile'
});

```

Here is an example of some front-end code that could use this token:

```javascript
function callMessagesApi() {
  var accessToken = signIn.tokenManager.get('access_token');

  if (!accessToken) {
    // This means that the user is not logged in
    return;
  }

  // Make a request using jQuery
  $.ajax({
    // Your API or resource server:
    url: 'http://localhost:8080/api/messages',
    headers: {
      Authorization: 'Bearer ' + accessToken.accessToken
    },
    success: function(response) {
      // Received messages!
      console.log('Messages', response);
    },
    error: function(response) {
      console.error(response);
    }
  });
}
```

### Handling Errors

The Widget render function either results in a success or error. The error function is called when the Widget has been initialized with invalid config options, or has entered a state it cannot recover from.

The Widget is designed to internally handle any user and API errors. This means that the custom error handler should primarily be used for debugging any configuration errors.

There are three kinds of errors that aren't handled by the Widget, and so can be handled by custom code:

- ConfigError
- UnsupportedBrowserError
- OAuthError

Here is an example of an error handler that adds an error message to the top of the page:

```javascript
function error(err) {
  var errorEl = document.createElement('div');
  errorEl.textContent = 'Error! ' + err.message;
  document.body.insertBefore(
    errorEl,
    document.body.firstChild
  );
}
```

## Using with Okta SDKs

Okta provides a number of SDKs that you might want to use the Sign-In Widget with, including Angular, React, and Vue.

Using the Sign-In Widget with our SDKs that target the web is fairly straightforward.

### Angular

The [Okta Sign-In Widget and Angular guide](/code/angular/okta_angular_sign-in_widget/) shows the code you'll need in order to embed the Sign-In Widget in an Angular app.

See the [Okta Angular + Custom Login Example](https://github.com/okta/samples-js-angular/tree/master/custom-login) for a working example.

### React

The [Okta Sign-In Widget and React guide](/code/react/okta_react_sign-in_widget/) shows the code you'll need in order to embed the Sign-In Widget in a React app.

See the [Okta React + Custom Login Example](https://github.com/okta/samples-js-react/tree/master/custom-login) for a working example.

### Vue

<!--
The [Okta Sign-In Widget and Vue guide](/code/vue/okta_vue_sign-in_widget/) shows the code you'll need in order to embed the Sign-In Widget in a Vue app.

^^ todo: <https://github.com/okta/okta-developer-docs/issues/1440>
-->

See the [Okta Vue + Custom Login Example](https://github.com/okta/samples-js-vue/tree/master/custom-login) for a working example.

### Mobile SDKs

We also have mobile SDKs for Android, React Native, iOS, and Xamarin.

For mobile apps, embedding the Sign-In Widget is not currently supported. A possible workaround is to redirect to Okta for authentication and [customize the hosted sign-in widget](/docs/guides/style-the-widget/style-okta-hosted/). Support is provided, however, for building your own UI in mobile apps.

See the following examples:

- Android:
    - [Sign in with your own UI](https://github.com/okta/okta-oidc-android#Sign-in-with-your-own-UI)
    - [Custom Sign In Example](https://github.com/okta/samples-android/tree/master/custom-sign-in)
- iOS:
    - [Authenticate a User](https://github.com/okta/okta-auth-swift#authenticate-a-user)
    - [Okta iOS Custom Sign In Example](https://github.com/okta/samples-ios/tree/master/custom-sign-in)

<!--
- React Native
    - todo: okta-react-native has no docs like Android does - <https://github.com/okta/okta-react-native/issues/7>
    - [Okta React Native Custom Sign In Example](https://github.com/okta/samples-js-react-native/tree/master/custom-sign-in)
- Xamarin
    - todo: link to code section of Xamarin SDK README that shows code for custom UI
    - todo: link to custom sign in example - <https://github.com/okta/okta-oidc-xamarin/issues/15>
-->

You can also develop your mobile app with frameworks like Ionic and Flutter. We currently don't have native SDKs for either, but they should work with an AppAuth library. We recommend [Ionic AppAuth](https://github.com/wi3land/ionic-appauth) and the [Flutter AppAuth Plugin](https://pub.dev/packages/flutter_appauth).

## Customizations

The Okta Sign-In Widget is fully customizable through CSS and JavaScript. See [Style the Widget](/docs/guides/style-the-widget/) for more information and multiple examples of customization options.
