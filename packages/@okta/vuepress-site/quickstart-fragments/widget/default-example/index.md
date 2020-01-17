---
libraryName: Sign-In Widget
---

## Okta Sign-In Widget Quickstart

The [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) is a JavaScript widget that allows you to customize the Okta Sign-In experience by hosting it on your own page. This guide will walk you through integrating the Sign-In Widget into your custom front-end application by performing these steps:

1. Add and configure an OpenID Connect Client in Okta
1. Add the Sign-In Widget assets to your project
1. Configure the Sign-In Widget
1. Use the Access Token to authenticate requests

At the end of this section can choose your server type to learn more about post-authentication workflows, such as using the access tokens (obtained by the Sign-in Widget) to authenticate requests to your server.

## Prerequisites

> **Note:** The rest of these instructions assume you are using the developer console. If you already have an Okta org, you can toggle to the developer console by using the drop-down menu in the upper-left of the Okta administrator UI.

## Add and Configure an OpenID Connect Client
* Log into the Okta Developer Dashboard, click **Applications** then **Add Application**.
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect application with the values that are correct for your application (such as the port where it is running).  If you  are running this app locally, your settings would look like this:

| Setting             | Value                          |
| ------------------- | ------------------------------ |
| Application Name    | My Web App                     |
| Base URIs           | http://localhost:{port}        |
| Login redirect URIs | http://localhost:{port}        |
| Grant Types Allowed | Authorization Code and/or Implicit |

> **Note:** if your login page is on a different URL, such as `/login`, you should change the settings to match.

After you have created the application there are two more values you will need to gather before continuing, these values will be used in your application to setup the OpenID Connect flow with Okta.

| Setting       | Where to Find                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------                                       |
| Client ID     | On the "General" tab of the application you just created, or the parent list of applications.                                       |
| Org URL       | <span class="is-signed-in">`https://${yourOktaDomain}` <br></span>On the home screen of the developer dashboard, in the upper right. |

## Add Sign-In Widget Assets To Your Project

The easiest way to get started with the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) is to load the JS and CSS files directly from the CDN.

To use our CDN, include the following links to your HTML:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>

<link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

> The `okta-sign-in.min.js` file will expose a global `OktaSignIn` object that can bootstrap the widget.

## Configure the Sign-In Widget

There are many ways to configure the Sign-In Widget, though in this case we will use a configuration that will achieve the following:

* Determine if the user has an Okta session, and sign them in if needed
* Perform sign-in by presenting the login form on your page, then redirecting the user to Okta where an SSO session is created before redirecting the user back to your application with an access token and ID Token in the URL fragment (this is the OIDC Implicit flow)
* Store that access token and ID Token that we can use later

The widget needs to be rendered to a known element on your page. To do this, add the following to your HTML:

```html
<body>
    <div id="okta-login-container"></div>
    ...
</body>
```

Then copy this widget configuration into your front-end application:

```html
<script type="text/javascript">
  var oktaSignIn = new OktaSignIn({
    baseUrl: "https://${yourOktaDomain}",
    clientId: "{clientId}",
    authParams: {
      issuer: "https://${yourOktaDomain}/oauth2/default",
      responseType: ['token', 'id_token'],
      display: 'page'
    }
  });
  if (oktaSignIn.token.hasTokensInUrl()) {
    oktaSignIn.token.parseTokensFromUrl(
      function success(tokens) {
        // Save the tokens for later use, e.g. if the page gets refreshed:
        // Add the token to tokenManager to automatically renew the token when needed
        tokens.forEach(token => {
          if (token.idToken) {

            signIn.tokenManager.add('idToken', token);
          }
          if (token.accessToken) {
            signIn.tokenManager.add('accessToken', token);
          }
        });

        // Say hello to the person who just signed in:
        var idToken = signIn.tokenManager.get('idToken');
        console.log('Hello, ' + idToken.claims.email);

        // Remove the tokens from the window location hash
        window.location.hash='';
      },
      function error(err) {
        // handle errors as needed
        console.error(err);
      }
    );
  } else {
    oktaSignIn.session.get(function (res) {
      // Session exists, show logged in state.
      if (res.status === 'ACTIVE') {
        console.log('Welcome back, ' + res.login);
        return;
      }
      // No session, show the login form
      oktaSignIn.renderEl(
        { el: '#okta-login-container' },
        function success(res) {
          // Nothing to do in this case, the widget will automatically redirect
          // the user to Okta for authentication, then back to this page if successful
        },
        function error(err) {
          // handle errors as needed
          console.error(err);
        }
      );
    });
  }
</script>
```

With the above code in your front-end application, you should see the Sign In Widget when you load your application.  At this point you should be able to login, and be redirected back to your application with an access token and ID Token.  You should have the JavaScript console open in your browser while doing this, it will allow you to see the success messages from the examples and any errors that may arise. Once this is working you can move on to the next section, where we will make use of the access token to make an authenticated request against your server.


### Use the Access Token to Authenticate Requests.

Your application now has an access token in local storage that was issued by your Okta Authorization server. You can use this token to authenticate requests for resources on your server or API. As a hypothetical example, let's say that you have an API that gives us messages for our user.  You could create a `callMessagesApi` function that gets the access token from local storage, and use it to make an authenticated request to your server.

Please continue down to the next section, Server Setup, to learn about access token validation on the server.  Here is what the front-end code could look like for this hypothetical example:

```javascript
function callMessagesApi() {
  var accessToken = oktaSignIn.tokenManager.get("accessToken");

  if (!accessToken) {
    return;
  }

  // Make the request using jQuery
  $.ajax({
    url: 'http://localhost:{serverPort}/api/messages',
    headers: {
      Authorization : 'Bearer ' + accessToken.accessToken
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
