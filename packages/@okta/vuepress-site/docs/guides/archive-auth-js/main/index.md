---
title: Auth JS fundamentals
language: JavaScript
icon: code-javascript
excerpt: A JavaScript wrapper for Okta's Authentication APIs. Formerly titled "Okta Auth SDK Guide"
layout: Guides
---

> **Note:** This document is only for Okta Classic Engine. If you're using Okta Identity Engine, see [Auth JS fundamentals](/docs/guides/auth-js). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

The Okta Auth JavaScript SDK (auth.js) enables you to create a fully branded sign-in experience. It is built on top of our [Authentication API](/docs/reference/api/authn/) and [OpenID Connect API](/docs/reference/api/oidc/).

Auth.js is used by the [Sign-In Widget](/docs/guides/embedded-siw/) that powers the default Okta sign-in page. If you're building a JavaScript front end or a single-page app (SPA), auth.js gives you more control and customization than the Widget.

In this guide you learn how to use auth.js on a simple static page to:

* Retrieve and store an OpenID Connect (OIDC) token (id_token)
* Get an Okta session

> **Note:** `@okta/okta-auth-js` version 4.5.0 or above is required to run samples in this guide.
If you'd like to explore auth.js, see [API Reference](https://github.com/okta/okta-auth-js?tab=readme-ov-file#api-reference).

## Prerequisites

You need the following things for this guide:

* An Okta org. If you don't have an existing org, register for an [Okta Integrator Free Plan org](https://developer.okta.com/signup/).
* An OpenID Connect app integration. See the [instructions for creating an app integration](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc).
* One or more users [assigned to the app integration](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign).
* An entry in your Org's "Trusted Origins" for your application. To do this, follow the steps found under the "Trusted Origins tab" section in our [API security help page](https://help.okta.com/okta_help.htm?id=Security_API).

## Installation

Include the following script tag in your target web page:

```html
<script src="https://global.oktacdn.com/okta-auth-js/4.5.0/okta-auth-js.min.js" type="text/javascript"></script>
```

## Part 1: Retrieve and store an OpenID Connect token

In this first section you learn how to:

* Configure your auth.js client
* Retrieve an ID token using a redirect to your Okta org's sign-in page
* Parse a token from the URL that results from the redirect
* Store the parsed token inside the SDK's token manager
* Retrieve the stored token from the token manager

For the full example, see [Complete OpenID Connect token example](#complete-openid-connect-token-example).

### Client configuration

To initialize the SDK, create an instance of the `OktaAuth` object:

``` js
var authClient = new OktaAuth({
  url: 'https://{yourOktaDomain}',
  clientId: '{clientId}',
  redirectUri: 'http://localhost:8080'
});
```

Replace each of these property values with ones from your Okta org and application. For more information about these properties, see the [Client Configuration section of the Auth SDK reference][authjs-reference-client-configuration].

### Retrieve an ID token

To retrieve an ID token from Okta, use the `token.getWithRedirect` method, specifying that you want an `id_token` included in the response:

``` js
authClient.token.getWithRedirect({
  responseType: 'id_token'
});
```

[Read more about getWithRedirect in the Auth SDK Reference][authjs-reference-token-getwithredirect].

### Parse the token

After the redirect, the URL will contain an ID token in the form of a JWT. The `token.parseFromUrl` method can be used to parse that token from the URL:

``` js
authClient.token.parseFromUrl()
  .then(res => {
    const { idToken } = res.tokens;
  })
```

You can also display a specific part of the parsed token:

``` js
console.log(`Hi ${idToken.claims.email}!`);
```

[Read more about parseFromUrl in the Auth SDK Reference][authjs-reference-token-parsefromurl].

### Store the parsed token

Once the token has been parsed out of the URL, you can add it to the token manager using the `tokenManager.add` method:

``` js
authClient.tokenManager.add('idToken', idToken);
```

[Read more about tokenManager.add in the Auth SDK Reference][authjs-reference-tokenmanager-add].

The full code to parse the token, display the email from it, and then add it to the SDK's token manager looks like this:

``` js
authClient.token.parseFromUrl()
  .then(res => {
    const { idToken } = res.tokens;
    console.log(`Hi ${idToken.claims.email}!`);
    authClient.tokenManager.add('idToken', idToken);
  })
```

### Retrieve the stored token

A token that is stored in the token manager can be retrieved using the `tokenManager.get` method:

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

### Complete OpenID Connect token example

Putting it all together, the final example looks like this:

``` js
// Bootstrap the AuthJS Client
const authClient = new OktaAuth({
  // Org URL
  url: 'https://{yourOktaDomain}',
  // OpenID Connect App Client ID
  clientId: '{clientId}',
  // Trusted Origin Redirect URI
  redirectUri: 'http://localhost:8080'
});
if (authClient.isLoginRedirect()) {
  // Parse token from redirect url
  authClient.token.parseFromUrl()
    .then(data => {
      const { idToken } = data.tokens;
      console.log(`Hi ${idToken.claims.email}!`);
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
        console.log(`Hi ${idToken.claims.email}!`);
      } else {
        // You're not logged in, you need a sessionToken
        authClient.token.getWithRedirect({
          responseType: 'id_token'
        });
      }
    })
}
```

## Part 2: Get an Okta session cookie

In the code example above, the ID token is retrieved using a redirect to the Okta sign-in page. It’s also possible to take a user-inputted `username` and `password` pair and pass them to the `signIn` method. This method then initiates an authentication process that returns an [Okta session cookie](/docs/guides/session-cookie/#retrieving-a-session-cookie-by-visiting-a-session-redirect-link). This Okta session cookie can then be used, along with the `getWithRedirect` method, to get back the ID token. This means that there’s no need to redirect the user to the Okta sign-in page.

[Read more about signIn in the Auth SDK Reference][authjs-reference-signin].

``` js
else {
  // You're not logged in, you need a sessionToken
  var username = prompt('What is your username?');
  var password = prompt('What is your password?');
  authClient.signInWithCredentials({username, password})
    .then(transaction => {
      if (transaction.status === 'SUCCESS') {
        authClient.token.getWithRedirect({
          sessionToken: transaction.sessionToken,
          responseType: 'id_token'
        });
      }
    });
}
```

> **Note:** This example, like everything else on this page, is for illustrative purposes only. The `prompt()` method isn't considered a secure way of asking for user authentication credentials.

### Complete Okta session and OIDC token example

``` js
// Bootstrap the AuthJS Client
const authClient = new OktaAuth({
  // Org URL
  url: 'https://{yourOktaDomain}',
  // OpenID Connect App Client ID
  clientId: '{clientId}',
  // Trusted Origin Redirect URI
  redirectUri: 'http://localhost:8080'
});
if (authClient.isLoginRedirect()) {
  // Parse token from redirect url
  authClient.token.parseFromUrl()
    .then(data => {
      const { idToken } = data.tokens;
      console.log(`Hi ${idToken.claims.email}!`);
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
        console.log(`Hi ${idToken.claims.email}!`);
      } else {
        var username = prompt('What is your username?');
        var password = prompt('What is your password?');
        authClient.signInWithCredentials({username, password})
          .then(transaction => {
            if (transaction.status === 'SUCCESS') {
              authClient.token.getWithRedirect({
                sessionToken: transaction.sessionToken,
                responseType: 'id_token'
              });
            }
          });
      }
    });
}
```

## See also 

[Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/)

[authjs-reference]: https://github.com/okta/okta-auth-js
[authjs-reference-client-configuration]: https://github.com/okta/okta-auth-js#configuration-reference
[authjs-reference-token-getwithredirect]: https://github.com/okta/okta-auth-js#tokengetwithredirectoptions
[authjs-reference-token-parsefromurl]: https://github.com/okta/okta-auth-js#tokenparsefromurloptions
[authjs-reference-tokenmanager-add]: https://github.com/okta/okta-auth-js#tokenmanageraddkey-token
[authjs-reference-tokenmanager-get]: https://github.com/okta/okta-auth-js#tokenmanagergetkey
[authjs-reference-signin]: https://github.com/okta/okta-auth-js#signinoptions