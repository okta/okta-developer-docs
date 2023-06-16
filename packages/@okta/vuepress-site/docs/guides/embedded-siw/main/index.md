---
title: Embedded Okta Sign-In Widget fundamentals
---

<ApiLifecycle access="ie" /><br>

> **Note:** This document is only for Okta Identity Engine. If you’re using Okta Classic Engine, see [Embedded Okta Sign-In Widget fundamentals](/docs/guides/archive-embedded-siw/main/). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide explains authentication fundamentals using JavaScript and the embedded Okta Sign-In Widget, and provides a simple one-page SPA application to demonstrate a sign-in use case.

---

**Learning outcomes**

* Understand how to implement basic sign-in using JavaScript and the embedded Okta Sign-In Widget.
* Understand basic installation and code configurations using JavaScript.
* Implement a simple SPA use case and sign a user in to the application.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* Basic knowledge of building front-end JavaScript applications

**Sample code**

* Sample code is provided in the following section: [Sign In and display user's email](#sign-in-and-display-user-s-email)

---

## About the embedded Okta Sign-In Widget

The Okta Sign-In Widget is a JavaScript library that gives you a fully-featured and customizable sign-in experience, which you can use to authenticate users on any website.

Okta uses the Widget as part of its normal sign-in page. If you would like to fully customize the Widget, then you need to host it yourself. This guide walks you through the [installation process](#installation) for the Widget, as well as [a few common use cases](#sign-in-widget-use-cases) for the Widget and how to implement them. The full Widget reference can be found in the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#okta-sign-in-widget) repository.

A simple working code example is also included to demonstrate a common sign-in use case. See [Sign In and display user's email](#sign-in-and-display-user-s-email).

<div class="half">

![Screenshot of basic Okta Sign-In Widget](/img/siw/okta-sign-in-javascript.png)

</div>

## Installation

The first step is to install the Widget. You have two options: linking out to the Okta CDN, or installing locally through `npm`.

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

#### Bundling the Widget

If you're bundling your assets, import them from `@okta/okta-signin-widget`. For example, using [webpack](https://webpack.js.org/):

```javascript
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
```

> Loading CSS requires the css-loader plugin. You can find more information about it at the [css-loader gitHub repository](https://github.com/webpack-contrib/css-loader#usage).

### Enabling cross-origin access

Because the Widget makes cross-origin requests, you need to enable Cross-Origin Resource Sharing (CORS) by adding your application's URL to your Okta org's Trusted Origins (in **Security** > **API** > **Trusted Origins**). See [Enable CORS](/docs/guides/enable-cors/) page.

## Add code to reference the Widget

The following sections display basic code snippets you use when embedding and accessing the Widget.

### Initialize the Widget

The code that initializes the Widget appears as follows:

```javascript
<script>
  const signIn = new OktaSignIn({baseUrl: 'https://${yourOktaDomain}'});

  signIn.showSignInToGetTokens({
    scopes: ['openid', 'profile'] // optional
  }).then(function(tokens) {
    // Store tokens
  }).catch(function(error) {
    // This function is invoked with errors the widget cannot recover from:
    // Known errors: CONFIG_ERROR, UNSUPPORTED_BROWSER_ERROR
  });
</script>
```

To reference the Sign-In Widget on your desired sign-in page, include the following `<div>` tag:

```HTML
<div id="widget-container"></div>
```

<DomainAdminWarning />

### Mobile Consideration

To ensure that the Widget renders properly on a mobile device, include the `viewport` metatag in your `head`:

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
```

## Sign-In Widget use cases

The Widget handles a number of different authentication scenarios. See the following sections for common applications. For a full-walk through of a simple JavaScript sample, follow the [Sign In and Display User's Email](#sign-in-and-display-user-s-email) use case.

### Sign in and display user's email

In this case, you use the Widget to sign in to a simple web page and display the user's email. Ensure that you have an Okta developer account, and use the following one page of code to create a new Single-Page App (SPA) and see it working with the Widget.

To create and run this sample use case:

* Create an app integration on your Okta org.
* Create a simple SPA locally.
* Run the sample application.

#### Create an app integration

Create an app integration in the Okta org that represents the application you want to add authentication to:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** for the **Application Type**, and then click **Next**.
1. On the **New Single-Page App Integration** page:

   * Enter an application name.
   * Select the **Interaction Code** checkbox.

      <VerifyICGrantType />

   * Select the **Refresh Token** checkbox.
   * Set **Sign-in redirect URIs** to `http://localhost:3000/`.
   * Set **Sign-out redirect URIs** to `http://localhost:3000/`.

1. In the **Assignments** section, select **Allow everyone in your organization to access**, and then click **Save**.
1. In the **General Settings** section on the **General** tab, click **Edit**.
1. Under **EMAIL VERIFICATION EXPERIENCE** set **Callback URI** to `http://localhost:3000`, and then click **Save**.

1. Select the **Sign On** tab and scroll down to the **User authentication** section. New apps are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup.
1. For this use case, we want to use only the password factor. Click **Edit** and select the **Password only** [preset policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) to assign it to your app.
1. Click **Save**.

   > **Note:** Be sure to also [update the password authenticator policy rule](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#update-the-password-authenticator-to-password-only) to not require any additional verification.

1. In the **Security** > **API** > **Authorization Servers** section, verify that the custom authorization server uses the Interaction Code grant type by selecting the **default** server, clicking **Access Policies**, and editing the **Default Policy Rule**. Review the **If Grant type is** section to ensure the **Interaction Code** checkbox is selected.

    <VerifyICGrantType />

1. In the **Security** > **API** > **Trusted Origins** page, ensure that there is an entry for your sign in redirect URI. See [Enable CORS](/docs/guides/enable-cors/).

> **Note:** From the **General** tab of your app integration, save the generated **Client ID** value, which is used in the next section.

#### Create a simple SPA

1. On your local machine, create a directory for your sample application. For example: `simple-spa`.
1. In the editor of your choice, add the following HTML and JavaScript into an `index.html` file located in your sample application folder:

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
          You are not logged in.
        </div>
        <!-- where the sign-in form appears -->
        <div id="okta-login-container"></div>
        <button id="logout" class="button" onclick="logout()" style="display: none">Logout</button>
      </div>
      <script type="text/javascript">
        var oktaConfig = {
          issuer: "https://${yourOktaDomain}/oauth2/default",
          redirectUri: '${https://${yourAppRedirectUri} configured in your Okta OIDC app integration}',
          clientId: "${yourClientId}"
        }
        // Search for URL Parameters to see if a user is being routed to the application to recover password
        var searchParams = new URL(window.location.href).searchParams;
        oktaConfig.otp = searchParams.get('otp');
        oktaConfig.state = searchParams.get('state');

       const oktaSignIn = new OktaSignIn(oktaConfig);

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

  > **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you are using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: true` in the `oktaConfig` settings shown above. If you are using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `useClassicEngine: true` in `oktaConfig`.

3. Configure the code in `index.html` with values for your Okta org application integration:

    * **issuer:** `"https://${yourOktaDomain}/oauth2/default"`. For example, `"https://example.okta.com/oauth2/default"`
    * **redirectUri:** `"https://${yourAppRedirectUri}"`. For example, `"http://localhost:3000"`
    * **clientId:** `"${yourClientId}"`. For example, `0oa2am3kk1CraJ8xO1d7`

4. (Optional) Update the version of the `okta-auth-js` dependency to make use of other authentication features. See [Related SDKs](https://github.com/okta/okta-signin-widget#related-sdks). The basic authentication feature doesn't require this update.

    ```bash
    npm install @okta/okta-auth-js
    ```

#### Run the sample application

1. In your sample `simple-spa` directory, you can run a static site web server using the following command:

    ```bash
    npx http-server . -p 3000
    ```

    >**Note:** If not installed previously, you are prompted to install the `npx` package.

1. Navigate to `http://localhost:3000`. The simple web page appears with a message that you're not signed in and displays the Sign-In Widget.

1. Sign in with a user from your org assigned to the app integration. The simple web page appears with the signed-in user's email address.

### SPA or Native application using PKCE

```javascript
var searchParams = new URL(window.location).searchParams;
var otp = searchParams.get('otp');
var state = searchParams.get('state');

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

// Search for URL Parameters to see if a user is being routed to the application to recover password
var searchParams = new URL(window.location.href).searchParams;
signIn.otp = searchParams.get('otp');
signIn.state = searchParams.get('state');

// SPA and Native apps using PKCE can receive tokens directly without any redirect
signIn.showSignInToGetTokens().then(function(tokens) {
  // store/use tokens
});

```

Here is an example of some front-end code that could use this token:

```javascript
function callMessagesApi() {
  const accessToken = signIn.authClient.getAccessToken();

  if (!accessToken) {
    // This means that the user isn't logged in
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

### Handling errors

The Widget render function either results in a success or an error. The error function is called when the Widget is initialized with invalid configuration options, or entered a state it can't recover from.

The Widget is designed to internally handle any user and API errors. This means that the custom error handler should primarily be used for debugging any configuration errors.

There are three kinds of errors that aren't handled by the Widget, and can be handled by custom code:

* ConfigError
* UnsupportedBrowserError
* OAuthError

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

### Angular

The [Okta Sign-In Widget and Angular guide](/docs/guides/sign-in-to-spa-embedded-widget/angular/main) shows the code you need to embed the Sign-In Widget in an Angular app.

See the [Okta Angular + Custom Login Example](https://github.com/okta/samples-js-angular/tree/master/custom-login) for a working example using the [okta-angular](https://github.com/okta/okta-angular) SDK.

### React

The [Okta Sign-In Widget and React guide](/docs/guides/sign-in-to-spa-embedded-widget/react/main) shows the code you need in order to embed the Sign-In Widget in a React app.

See the [Okta React + Custom Login Example](https://github.com/okta/samples-js-react/tree/master/custom-login) for a working example using the [okta-react](https://github.com/okta/okta-react) SDK.

### Vue

The [Okta Sign-In Widget and Vue guide](/docs/guides/sign-in-to-spa-embedded-widget/vue/main) shows the code you need in order to embed the Sign-In Widget in a Vue app.

See the [Okta Vue + Custom Login Example](https://github.com/okta/samples-js-vue/tree/master/custom-login) for a working example using the [okta-vue](https://github.com/okta/okta-vue) SDK.

### Mobile SDKs

Okta also has mobile SDKs for Android, React Native, iOS, and Xamarin.

For mobile apps, embedding the Sign-In Widget isn't currently supported. A possible workaround is to redirect to Okta for authentication and [customize the hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget). Support is provided for building your own UI in mobile apps.

See the following:

* Android:
* [Sign users in to your Android mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/android/main/)
* [Browser sign-in](https://github.com/okta/samples-android/tree/master/browser-sign-in)
* [Okta Mobile SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin)
* iOS:
* [Sign users in to your iOS mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/ios/main/)
* [Browser sign-in](https://github.com/okta/samples-ios/tree/master/browser-sign-in)
* [Okta Mobile SDK for Swift](https://github.com/okta/okta-mobile-swift)

You can also develop your mobile app with frameworks like Ionic and Flutter. We currently don't have native SDKs for either, but they should work with an AppAuth library. We recommend [Ionic AppAuth](https://github.com/wi3land/ionic-appauth) and the [Flutter AppAuth Plugin](https://pub.dev/packages/flutter_appauth).

## Customizations

The Okta Sign-In Widget is fully customizable through CSS and JavaScript. See [Style the Widget](/docs/guides/custom-widget/) for more information and multiple examples of customization options.
