---
title: Okta Sign-In widget guide
language: JavaScript
icon: code-javascript
excerpt: A drop-in widget with custom UI capabilities to power sign-in with Okta.
---

The Okta Sign-In Widget is a JavaScript library that gives you a fully-featured and customizable sign-in experience that you can use to authenticate users on any website.

Okta uses the widget as part of its normal sign-in page. If you want to customize the widget, then you need to host it yourself. This guide walks you through the [installation process](#installation) for the widget, as well as [a few common use cases](#use-cases) for the widget and how to implement them. You can find the full widget reference [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget).

<img src="/img/okta-signin.png" alt="Screenshot of basic Okta Sign-In Widget" width="400">

## Installation

The first step is to install the widget. For this, you have two options: linking to the Okta CDN or local installation through npm.

### CDN

To use the CDN, include this in your HTML, replacing `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget:

```html
<!-- Latest CDN production JavaScript and CSS -->
<script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

### npm

To install the [latest version of the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases) locally through `npm`, run the following command in your project root folder:

```bash
npm install @okta/okta-signin-widget@latest
```

See also [Using the npm module](https://github.com/okta/okta-signin-widget#using-the-npm-module). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

#### Bundling the widget

If you are bundling your assets, import them from `@okta/okta-signin-widget`. For example, using [webpack](https://webpack.js.org/):

```javascript
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
```

> **Note:** Loading CSS requires the css-loader plugin. You can find more information about it [here](https://github.com/webpack-contrib/css-loader#usage).

### Enabling cross-origin access

Because the widget is making cross-origin requests, you need to enable Cross-Origin Resource Sharing (CORS) by adding your application's URL to your Okta org's Trusted Origins (in **API** > **Trusted Origins**). You can find more information about this in the [Enable CORS](/docs/guides/enable-cors/) guide.

## Usage

After you install the widget and enable CORS, you can start using it.

### Initialize the widget

The code that initializes the widget looks like this:

```javascript
<div id="widget-container"></div>

<script>
  const signIn = new OktaSignIn({baseUrl: 'https://${yourOktaDomain}'});
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

> **Note:** If you are working with an [Okta Identity Engine](/docs/concepts/oie-intro)-enabled org and want to use the Identity Engine features in your app, you need to set the `useInteractionCodeFlow` option to `true` in the configuration options passed in to the `new OktaSignIn()` call. See [Set up the Sign-In Widget and SDK for your own app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#set-up-the-sign-in-widget-and-sdk-for-your-own-app) for more details.

<DomainAdminWarning />

#### Mobile Consideration

To ensure that the widget renders properly on mobile, include the `viewport` metatag in your `head`:

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
```

### Use Cases

The widget can handle a number of different authentication scenarios. Here are a few common ones:

#### Sign in and display user's email

In this case, you want to use the widget to sign in to a simple web page and display the user's email. This requires an Okta developer account, and you have to create a new Single-Page App (SPA) for it to work.

1. Sign in to your Okta Admin Console. Go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** as the **Application Type**. Click **Next**.
1. Set `http://localhost:8080` as a **Sign-in redirect URIs** and click **Save**.
1. After the app integration is created, the **Client Credentials** section of the **General** tab contains a **Client ID** that you need to copy and use in the code below.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <title>Simple Web Page</title>
    <style>
      h1 {
        margin: 2em 0;
      }
    </style>
    <!-- widget stuff here -->
    <script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
    <link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
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
      const oktaSignIn = new OktaSignIn({
        baseUrl: "https://${yourOktaDomain}",
        redirectUri: '{{https://${yourAppRedirectUri} configured in your OIDC app}}',
        clientId: "${yourClientId}",
        authParams: {
          issuer: "https://${yourOktaDomain}/oauth2/default"
        }
      });

      oktaSignIn.authClient.token.getUserInfo().then(function(user) {
        document.getElementById("messageBox").innerHTML = "Hello, " + user.email + "! You are *still* logged in! :)";
        document.getElementById("logout").style.display = 'block';
      }, function(error) {
        oktaSignIn.showSignInToGetTokens({
          el: '#okta-login-container'
        }).then(function(tokens) {
          oktaSignIn.authClient.tokenManager.setTokens(tokens);
          oktaSignIn.remove();

          const idToken = tokens.idToken;
          document.getElementById("messageBox").innerHTML = "Hello, " + idToken.claims.email + "! You just logged in! :)";
          document.getElementById("logout").style.display = 'block';

        }).catch(function(err) {
          console.error(err);
        });
      });

      function logout() {
        oktaSignIn.authClient.signOut();
        location.reload();
      }
    </script>
  </body>
</html>
```

Copy the code above into an `index.html` file on your hard drive.

For this example to work, you need to host it on a web server that runs locally on port 8080. The simplest way to do this is to use Python. If you have Python 2 installed, use the command `python -m SimpleHTTPServer 8080`, otherwise, if you're using Python 3 you can run the command `python -m http.server 8080` from the same directory as your `index.html` file.

> **Note:** You can check the version of Python on your system by running the command `python -V`. If for some reason you don't have the `python` command available, you might need to run `python3 -m http.server 8080` as on some systems, Python is named `python3` instead of `python` -- confusing, right?

After you get Python running an HTTP server, you are able to access your page at `http://localhost:8080`.

#### Sign in to Okta with the default dashboard

In this case, you want to use the widget to sign in to the default Okta dashboard. This requires taking the widget initialization code and modifying the success behavior so that it redirects to your org's dashboard.

```javascript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://${yourOktaDomain}/app/UserHome');
  }
}
```

##### Sign in to Okta and SSO directly to an app

If you want to sign the user directly in to an application within Okta, you just redirect to the specific URL for that application. To find that URL, go to that application's page in your Okta org and find [the embed link](https://help.okta.com/okta_help.htm?id=ext-apps-page-show-application-embed-links).

#### Sign in to Okta with a custom dashboard

If you are signing your users in to Okta, but you don't want to use the Okta dashboard, then you can change the redirect URL to point to your custom portal instead.

```javascript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://example.com/dashboard');
  }
}
```

#### Sign in to your application

If you want to use the widget to sign in to your own application instead of Okta, you have to [set up a custom authorization server](/docs/guides/customize-authz-server/) in Okta.

#### Server-side Web Application using "authorization_code" flow

```javascript

const signIn = new OktaSignIn({
  baseUrl: 'https://${yourOktaDomain}',
  el: '#widget-container',
  clientId: '${clientId}',
  // must be in the list of redirect URIs enabled for the OIDC app
  redirectUri: '${redirectUri}',
  authParams: {
    issuer: 'https://${yourOktaDomain}/oauth2/default',
    pkce: false,
    responseType: ['code']
  }
});

// A query parameter named `code` will be passed to the login redirect URI
// This should be handled by server-side code. The code can be exchanged for tokens
signIn.showSignInAndRedirect();

```

#### SPA or Native application using PKCE

```javascript

const signIn = new OktaSignIn({
  baseUrl: 'https://${yourOktaDomain}',
  el: '#widget-container',
  clientId: '${clientId}',
  // must be in the list of redirect URIs enabled for the OIDC app
  redirectUri: '${redirectUri}',
  authParams: {
    issuer: 'https://${yourOktaDomain}/oauth2/default'
  }
});

// SPA and Native apps using PKCE can receive tokens directly without any redirect
signIn.showSignInToGetTokens().then(function(tokens) {
  // store/use tokens
});

```

Here is an example of some front-end code that can use this token:

```javascript
function callMessagesApi() {
  const accessToken = signIn.authClient.getAccessToken();

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

The widget render function either results in a success or error. The error function is called when the widget is initialized with invalid config options or has entered a state it can't recover from.

The widget is designed to internally handle any user and API errors. This means that the you should use the custom error handler primarily for debugging any configuration errors.

There are three kinds of errors that aren't handled by the widget, and so can be handled by custom code:

- ConfigError
- UnsupportedBrowserError
- OAuthError

Here is an example of an error handler that adds an error message to the top of the page:

```javascript
function error(err) {
  const errorEl = document.createElement('div');
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

The [Okta Sign-In Widget and Angular guide](/code/angular/okta_angular_sign-in_widget/) shows the code you need to embed the Sign-In Widget in an Angular app. **Note:** This code doesn't use the [okta-angular](https://github.com/okta/okta-angular) SDK.

See the [Okta Angular + custom login example](https://github.com/okta/samples-js-angular/tree/master/custom-login) for a working example using the [okta-angular](https://github.com/okta/okta-angular) SDK.

### React

The [Okta Sign-In Widget and React guide](/code/react/okta_react_sign-in_widget/) shows the code you need to embed the Sign-In Widget in a React app.

See the [Okta React + custom login example](https://github.com/okta/samples-js-react/tree/master/custom-login) for a working example using the [okta-react](https://github.com/okta/okta-react) SDK.

### Vue

The [Okta Sign-In Widget and Vue guide](/code/vue/okta_vue_sign-in_widget/) shows the code you need to embed the Sign-In Widget in a Vue app.

See the [Okta Vue + custom login example](https://github.com/okta/samples-js-vue/tree/master/custom-login) for a working example using the [okta-vue](https://github.com/okta/okta-vue) SDK.

### Mobile SDKs

We also have mobile SDKs for Android, React Native, iOS, and Xamarin.

For mobile apps, embedding the Sign-In Widget isn't currently supported. A possible workaround is to redirect to Okta for authentication and [customize the hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget). Support is provided for building your own UI in mobile apps.

See the following Okta Classic Engine examples:

- Android:
    - [Sign in with your own UI](https://github.com/okta/okta-oidc-android#Sign-in-with-your-own-UI)
    - [Custom sign-in example](https://github.com/okta/samples-android/tree/legacy-samples/custom-sign-in)
- iOS:
    - [Authenticate a user](https://github.com/okta/okta-auth-swift#authenticate-a-user)
    - [Okta iOS custom sign-in example](https://github.com/okta/samples-ios/tree/legacy-samples/custom-sign-in)

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

The Okta Sign-In Widget is fully customizable through CSS and JavaScript. See [Style the Widget](/docs/guides/custom-widget/) for more information and multiple examples of customization options.
