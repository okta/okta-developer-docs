## About JavaScript and the Okta Sign-In Widget

The Okta Sign-In Widget is a JavaScript library that gives you a fully-featured and customizable sign in experience, which can be used to authenticate users on any website.

Okta uses the Widget as part of its normal sign-in page. If you would like to customize the Widget, then you will need to host it yourself. This guide walks you through the [installation process](#installation) for the Widget, as well as [a few common use cases](#use-cases) for the Widget and how to implement them. The full Widget reference can be found [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget).

> A version of the Widget that you can edit in real time can be found here: <https://developer.okta.com/live-widget/>

<img src="/img/okta-sign-in-javascript.png" alt="Screenshot of basic Okta Sign-In Widget" width="400">

## Installation

The first step is to install the Widget. You have two options: linking out to the Okta CDN, or installing locally through `npm` instead.

### CDN

To use the CDN, include this in your HTML:

```html
<!-- Latest CDN production JavaScript and CSS -->
<script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

More info, including the latest published version, can be found in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

### npm

```bash
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

> Loading CSS requires the css-loader plugin. You can find more information about it at the [css-loader gitHub repository](https://github.com/webpack-contrib/css-loader#usage).

### Enabling Cross-Origin Access

Because the Widget will be making cross-origin requests, you need to enable Cross Origin Access (CORS) by adding your application's URL to your Okta org's Trusted Origins (in **Security** > **API** > **Trusted Origins**). More information about this can be found on the [Enable CORS](/docs/guides/enable-cors/) page.

## Add code to reference the widget

### Initializing the Widget

The code that initializes the Widget appears as follows:

```javascript
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

To reference the Sign-In Widget on your desired sign in page, include the following `<div>` tag:

```HTML
<div id="widget-container"></div>
```

<DomainAdminWarning />

### Mobile Consideration

To ensure that the Widget renders properly on mobile, include the `viewport` metatag in your `head`:

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
```

## Sign-In Widget Use Cases

The Widget handles a number of different authentication scenarios. See the following sections for common applications. For a full-walk through of a simple JavaScript sample, follow the [Sign In and Display User's Email](#sign-in-and-display-user's-email) use case.

### Sign In and Display User's Email

In this case, you use the Widget to sign in to a simple web page and display the user's email. Ensure you have an Okta developer account, and use the following one page of code to create a new Single-Page App (SPA) and see it working with the Widget.

To create and run this sample use case:

* Create an app integration on your Okta org.
* Create a simple SPA locally.
* Run the sample application.

#### Create an app integration

Create an app integration that represents the application you want to add authentication to using Okta:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** for the **Application Type**.
1. On the **New Single-Page App Integration** page:

   * Enter an application name.
   * Ensure that the **Interaction Code** check box is selected.
   * Select the **Refresh Token** check box.
   * Set **Sign-in redirect URIs** to `http://localhost:3000/`.

1. In the **Assignments** section, select **Allow everyone in your organization to access**.
1. Click **Save**.
1. Select the **Sign On** tab.
1. In the **Sign On Policy** section, verify that the **Available Authenticators** settings are appropriate for your app. For this use case, ensure that the **1 factor type** authenticator is **Password / IdP**.
1. In the **Security** > **API** > **Authorization Servers** section, verify that the custom authorization server uses the Interaction Code grant type by selecting the **default** server, clicking **Access Policies**, and editing the **Default Policy Rule**. Review the **If Grant type is** section to ensure the **Interaction Code** check box is selected.
1. In the **Security** > **API** > **Trusted Origins** page, ensure there is an entry for your sign in redirect URI. See [Enable CORS](/docs/guides/enable-cors/).

> **Note:** From the **General** tab of your app integration, save the generated **Client ID** value that is used in the next section.

#### Create a simple SPA

1. On your local machine, create a directory for your sample application. For example `simple-spa`.
1. In the editor of your choice, add the following HTML into an `index.html` file located in your sample application folder:

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
    <script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
    <link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
  </head>
  <body>
    <div class="container">
      <h1 class="text-center">Simple Web Page</h1>
      <div id="messageBox" class="jumbotron">
        You are not logged in.
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
        useInteractionCodeFlow: true,
        pkce: true,
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
        oktaSignIn.authClient.signOut({ clearTokensAfterRedirect: true});
        authClient.start();
        location.reload();
      }
    </script>
  </body>
</html>
```

1. Configure the code in `index.html` with values for your Okta org application integration:

    * **baseUrl:** `"https://${yourOktaDomain}"`. For example, `"http://example.okta.com"`
    * **redirectUri:** `"https://${yourAppRedirectUri}"`. For example, `"http://localhost:3000"`
    * **clientId:** `"${yourClientId}"`. For example, `0oa2am3kk1CraJ8xO1d7`
    * **issuer:** `"https://${yourOktaDomain}/oauth2/default"`. For example, `"https://example.com/oauth2/default"`

1. (Optional) Update the version of the `okta-auth-js` dependency to make use of other authentication features. See [Related SDKs](https://github.com/okta/okta-signin-widget#related-sdks). The basic authentication feature does not require this update.

    ```bash
    simple-spa % npm install @okta/okta-auth-js
    ```

    >**Note:** The SPA app logout function requires `okta-auth-js` 5.10 or greater.

#### Run the sample application

1. In your sample directory, you can run a static site web server using the following command:

    ```bash
    simple-spa % npx http-server . -p 3000
    ```

1. Sign in with a user from your org assigned to the app integration.

    The web page appears with the signed-in user's email address.

### Sign In to Okta with the Default Dashboard

In this case, you use the Widget to sign in to the default Okta dashboard. This requires taking the Widget initialization code, and modifying the success behavior to redirect to your org's dashboard.

```javascript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://${yourOktaDomain}/app/UserHome');
  }
}
```

### Sign In to Okta and SSO Directly to an App

If you want to sign the user directly in to an application within Okta, you redirect to the specific URL for that application. To find that URL, go to that application's page in your Okta org and find [the embed link](https://help.okta.com/okta_help.htm?id=ext-apps-page-show-application-embed-links).

### Sign In to Okta with a Custom Dashboard

If you are signing your users in to Okta, but you don't want to use the Okta dashboard, then you can change the redirect URL to point to your custom portal instead.

```javascript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://example.com/dashboard');
  }
}
```

### Sign In to Your Application

If want to use the Widget to sign in to your own application instead of Okta, you need to [set-up a custom Authorization Server](/docs/guides/customize-authz-server/) in Okta.

### Server-side Web Application using "authorization_code" flow

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

#### SPA or Native Application using PKCE

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

Here is an example of some front-end code that could use this token:

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

The Widget render function either results in a success or an error. The error function is called when the Widget has been initialized with invalid config options, or has entered a state it cannot recover from.

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

Using the Sign-In Widget with our SDKs that target the web is fairly straightforward.

### Angular

The [Okta Sign-In Widget and Angular guide](/code/angular/okta_angular_sign-in_widget/) shows the code you'll need in order to embed the Sign-In Widget in an Angular app. (Note: this code does not use the [okta-angular](https://github.com/okta/okta-angular) SDK)

See the [Okta Angular + Custom Login Example](https://github.com/okta/samples-js-angular/tree/master/custom-login) for a working example using the [okta-angular](https://github.com/okta/okta-angular) SDK.

### React

The [Okta Sign-In Widget and React guide](/code/react/okta_react_sign-in_widget/) shows the code you'll need in order to embed the Sign-In Widget in a React app.

See the [Okta React + Custom Login Example](https://github.com/okta/samples-js-react/tree/master/custom-login) for a working example using the [okta-react](https://github.com/okta/okta-react) SDK.

### Vue

The [Okta Sign-In Widget and Vue guide](/code/vue/okta_vue_sign-in_widget/) shows the code you'll need in order to embed the Sign-In Widget in a Vue app.

See the [Okta Vue + Custom Login Example](https://github.com/okta/samples-js-vue/tree/master/custom-login) for a working example using the [okta-vue](https://github.com/okta/okta-vue) SDK.

### Mobile SDKs

We also have mobile SDKs for Android, React Native, iOS, and Xamarin.

For mobile apps, embedding the Sign-In Widget is not currently supported. A possible workaround is to redirect to Okta for authentication and [customize the hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget). Support is provided for building your own UI in mobile apps.

See the following examples:

* Android:
    * [Sign in with your own UI](https://github.com/okta/okta-oidc-android#Sign-in-with-your-own-UI)
    * [Custom Sign In Example](https://github.com/okta/samples-android/tree/master/custom-sign-in)
* iOS:
    * [Authenticate a User](https://github.com/okta/okta-auth-swift#authenticate-a-user)
    * [Okta iOS Custom Sign In Example](https://github.com/okta/samples-ios/tree/master/custom-sign-in)

You can also develop your mobile app with frameworks like Ionic and Flutter. We currently don't have native SDKs for either, but they should work with an AppAuth library. We recommend [Ionic AppAuth](https://github.com/wi3land/ionic-appauth) and the [Flutter AppAuth Plugin](https://pub.dev/packages/flutter_appauth).

## Customizations

The Okta Sign-In Widget is fully customizable through CSS and JavaScript. See [Style the Widget](/docs/guides/custom-widget/) for more information and multiple examples of customization options.
