---
title: Okta Auth SDK Guide
language: JavaScript
icon: code-javascript
excerpt: A JavaScript wrapper for Okta's Authentication APIs.
---

The Okta Auth SDK builds on top of our [Authentication API](/docs/reference/api/authn/) and [OpenID Connect API](/docs/reference/api/oidc/) to enable you to create a fully branded sign-in experience using JavaScript.

The Okta Auth SDK is used by Okta's [Sign-in Widget](/code/javascript/okta_sign-in_widget/) which powers the default Okta sign-in page. If you are building a JavaScript front end or Single Page App (SPA), the Auth SDK gives you added control and customization beyond what is possible with the Widget.

In this guide you will learn how to use the Auth SDK on a simple static page to:

- Retrieve and store an OpenID Connect (OIDC) token
- Get an Okta session

If you'd like to explore the entire Auth SDK, please see the [Okta AuthJS Source &amp; API Reference][authjs-reference].

## Prerequisites

You will need the following things for this guide:

- An Okta org - If you don't have an existing org, register for [Okta Developer Edition](https://developer.okta.com/signup/).
- An OpenID Connect Application. Instructions for creating one can be found on [this page](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard), under the "OpenID Connect Wizard" section.
- At least one User [assigned to the Application](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_Apps_Page.htm#Assigning).
- An entry in your Org's "Trusted Origins" for your application. To do this, follow the steps found under the "Trusted Origins tab" section in our [API Security help page](https://help.okta.com/en/prod/okta_help_CSH.htm#Security_API).

## Installation

Include the following script tag in your target web page:

``` html
<script src="https://ok1static.oktacdn.com/assets/js/sdk/okta-auth-js/2.0.1/okta-auth-js.min.js" type="text/javascript"></script>
```

## Part 1: Retrieve and Store an OpenID Connect Token

In this first section you will learn how to:

- Configure your Okta Auth SDK Client
- Retrieve an ID Token using a redirect to your Okta org's sign-in page
- Parse a token from the URL that results from the redirect
- Store the parsed token inside the SDK's Token Manager
- Retrieve the stored token from the Token Manager

If you'd like to see the complete code example, you can find it [below](#complete-openid-connect-token-example).

### Client Configuration

To initialize the SDK, create a new instance of the `OktaAuth` object:

``` js
var authClient = new OktaAuth({
  url: 'https://{yourOktaDomain}',
  clientId: '{clientId}',
  redirectUri: 'http://localhost:8080'
});
```

Replace each of these property values with ones from your Okta org and application. For more information about these properties, see the [Client Configuration section of the Auth SDK reference][authjs-reference-client-configuration].

### Retrieve ID Token from Okta

To retrieve an ID Token from Okta, you will use the `token.getWithRedirect` method, specifying that you want an `id_token` included in the response:

``` js
authClient.token.getWithRedirect({
  responseType: 'id_token'
});
```

[Read more about getWithRedirect in the Auth SDK Reference][authjs-reference-token-getwithredirect].

### Parse the Token

After the redirect, the URL will contain an ID Token in the form of a JWT. The `token.parseFromUrl` method can be used to parse that token from the URL:

``` js
authClient.token.parseFromUrl()
```

You can also display a specific part of the parsed token:

``` js
console.log(`hi ${idToken.claims.email}!`);
```

[Read more about parseFromUrl in the Auth SDK Reference][authjs-reference-token-parsefromurl].

### Store the Parsed Token

Once the token has been parsed out of the URL, you can add it to the Token Manager using the `tokenManager.add` method:

``` js
authClient.tokenManager.add('idToken', idToken);
```

[Read more about tokenManager.add in the Auth SDK Reference][authjs-reference-tokenmanager-add].

The full code to parse the token, display the email from it, and then add it to the SDK's Token Manager looks like this:

``` js
authClient.token.parseFromUrl()
  .then(idToken => {
    console.log(`hi ${idToken.claims.email}!`);
    authClient.tokenManager.add('idToken', idToken);
  })
```

### Retrieve the Stored Token

A token that is stored in the Token Manager can be retrieved using the `tokenManager.get` method:

``` js
authClient.tokenManager.get('idToken')
.then(function(token) {
  if (token) {
    // Token is valid
  } else {
    // Token has expired
  }
})
```

[Read more about tokenManager.get in the Auth SDK Reference][authjs-reference-tokenmanager-get].

### Complete OpenID Connect Token Example

Putting it all together, the final example looks like this:

``` js

import OktaAuth from '@okta/okta-auth-js';

// Bootstrap the AuthJS Client
const authClient = new OktaAuth({
  // Org URL
  url: 'https://{yourOktaDomain}',
  // OpenID Connect APP Client ID
  clientId: '{clientId}',
  // Trusted Origin Redirect URI
  redirectUri: 'http://localhost:8080'
});

if (authClient.token.isLoginRedirect()) {
  // Parse token from redirect url
  authClient.token.parseFromUrl()
    .then(data => {
      const { idToken } = data.tokens;
      console.log(`hi ${idToken.claims.email}!`);
      // Store parsed token in Token Manager
      authClient.tokenManager.add('idToken', idToken);
      console.log(idToken);
    });
} else {
  // Attempt to retrieve ID Token from Token Manager
  authClient.tokenManager.get('idToken')
    .then(idToken => {
      console.log(idToken);
      if (idToken) {
        console.log(`hi ${idToken.claims.email}!`);
      } else {
        // You're not logged in, you need a sessionToken
        authClient.token.getWithRedirect({
          responseType: 'id_token'
        });
      }
    })
}
```

## Part 2: Get an Okta Session Cookie

In the code example above, the ID Token is retrieved using a redirect to the Okta sign-in page. It is also possible to take a user-inputted `username` and `password` pair and pass them to the `signIn` method. This method then initiates an authentication process which returns an [Okta session cookie](/docs/guides/session-cookie/#retrieving-a-session-cookie-by-visiting-a-session-redirect-link). This Okta session cookie can then be used, along with the `getWithRedirect` method, to get back the ID Token. This means that there is no need to redirect the user to the Okta sign-in page.

[Read more about signIn in the Auth SDK Reference][authjs-reference-signin].

``` js
else {
  // You're not logged in, you need a sessionToken
  var username = prompt('What is your username?');
  var password = prompt('What is your password?');

  authClient.signIn({username, password})
    .then(res => {
      if (res.status === 'SUCCESS') {
        authClient.token.getWithRedirect({
          sessionToken: res.sessionToken,
          responseType: 'id_token'
        });
      }
    });
}
```

> This example, like everything else on this page, is for illustrative purposes only. The `prompt()` method is not considered a secure way of asking for user authentication credentials.

#### Complete Okta Session and OIDC Token Example

``` js
import OktaAuth from '@okta/okta-auth-js';

// Bootstrap the AuthJS Client
const authClient = new OktaAuth({
  // Org URL
  url: 'https://{yourOktaDomain}',
  // OpenID Connect APP Client ID
  clientId: '{clientId}',
  // Trusted Origin Redirect URI
  redirectUri: 'http://localhost:8080'
});

if (authClient.token.isLoginRedirect()) {
  // Parse token from redirect url
  authClient.token.parseFromUrl()
    .then(data => {
      const { idToken } = data.tokens;
      console.log(`hi ${idToken.claims.email}!`);
      // Store parsed token in Token Manager
      authClient.tokenManager.add('idToken', idToken);
      console.log(idToken);
    });
} else {
  // Attempt to retrieve ID Token from Token Manager
  authClient.tokenManager.get('idToken')
    .then(idToken => {
      console.log(idToken);
      if (idToken) {
        console.log(`hi ${idToken.claims.email}!`);
      } else {
        var username = prompt('What is your username?');
        var password = prompt('What is your password?');

        authClient.signIn({username, password})
          .then(res => {
            if (res.status === 'SUCCESS') {
              authClient.token.getWithRedirect({
                sessionToken: res.sessionToken,
                responseType: 'id_token'
              });
            }
          });
      }
    });
}
```

[authjs-reference]: https://github.com/okta/okta-auth-js
[authjs-reference-client-configuration]: https://github.com/okta/okta-auth-js#configuration-reference
[authjs-reference-token-getwithredirect]: https://github.com/okta/okta-auth-js#tokengetwithredirectoptions
[authjs-reference-token-parsefromurl]: https://github.com/okta/okta-auth-js#tokenparsefromurloptions
[authjs-reference-tokenmanager-add]: https://github.com/okta/okta-auth-js#tokenmanageraddkey-token
[authjs-reference-tokenmanager-get]: https://github.com/okta/okta-auth-js#tokenmanagergetkey
[authjs-reference-signin]: https://github.com/okta/okta-auth-js#signinoptions
