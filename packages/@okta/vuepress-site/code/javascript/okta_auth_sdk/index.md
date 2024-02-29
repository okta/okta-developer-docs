---
title: Okta Auth SDK guide
language: JavaScript
icon: code-javascript
excerpt: A JavaScript wrapper for Okta's Authentication APIs.
---

The Okta Auth SDK builds on top of our [Authentication API](/docs/reference/api/authn/) and [OpenID Connect API](/docs/reference/api/oidc/) to enable you to create a fully branded sign-in experience using JavaScript.

The Okta Auth SDK is used by Okta's [Sign-In Widget](/code/javascript/okta_sign-in_widget/) that powers the default Okta sign-in page. If you're building a JavaScript front end or Single-Page App (SPA), the Auth SDK gives you added control and customization beyond what is possible with the widget.

In this guide you learn how to use the Auth SDK on a simple static page to:

- Retrieve and store an OpenID Connect (OIDC) token (id_token)
- Get an Okta session

> **Note:** `@okta/okta-auth-js` version 4.5.0 or above is required to run samples in this guide.

If you'd like to explore the entire Auth SDK, see the [Okta AuthJS Source &amp; API Reference][authjs-reference].

## Prerequisites

You need the following things for this guide:

- An Okta org: If you don't have an existing org, register for an [Okta Developer Edition](https://developer.okta.com/signup/).
- An OpenID Connect application integration. See the [instructions for creating an application integration](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc).
- At least one user [assigned to the application integration](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign).
- An entry in your Org's Trusted Origins for your application. To do this, follow the steps found under the **Trusted Origins** tab section in our [API Security help page](https://help.okta.com/okta_help.htm?id=Security_API).

## Installation

Include the following script tag in your target web page:

```html
<script src="https://global.oktacdn.com/okta-auth-js/4.5.0/okta-auth-js.min.js" type="text/javascript"></script>
```

## Part 1: Retrieve and store an OpenID Connect token

In this first section you learn how to:

- Configure your Okta Auth SDK Client.
- Retrieve an ID token using a redirect to your Okta org's sign-in page.
- Parse a token from the URL that results from the redirect.
- Store the parsed token inside the SDK's Token Manager.
- Retrieve the stored token from the Token Manager.

If you want to see the complete code example, you can find it [below](#complete-openid-connect-token-example).

### Client configuration

To initialize the SDK, create a new instance of the `OktaAuth` object:

``` js
var authClient = new OktaAuth({
  url: 'https://${yourOktaDomain}',
  clientId: '${clientId}',
  redirectUri: 'http://localhost:8080'
});
```

Replace each of these property values with ones from your Okta org and application. For more information about these properties, see the [Client Configuration section of the Auth SDK reference][authjs-reference-client-configuration].

### Retrieve ID token from Okta

To retrieve an ID token from Okta, use the `token.getWithRedirect` method and specify that you want an `id_token` included in the response:

``` js
authClient.token.getWithRedirect({
  responseType: 'id_token'
});
```

[Read more about getWithRedirect in the Auth SDK Reference][authjs-reference-token-getwithredirect].

### Parse the token

After the redirect, the URL contains an ID token in the form of a JWT. You can use the `token.parseFromUrl` method to parse that token from the URL:

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

After the token is parsed out of the URL, you can add it to the Token Manager using the `tokenManager.add` method:

``` js
authClient.tokenManager.add('idToken', idToken);
```

[Read more about tokenManager.add in the Auth SDK Reference][authjs-reference-tokenmanager-add].

The full code to parse the token, display the email from it, and then add it to the SDK's Token Manager looks like this:

``` js
authClient.token.parseFromUrl()
  .then(res => {
    const { idToken } = res.tokens;
    console.log(`Hi ${idToken.claims.email}!`);
    authClient.tokenManager.add('idToken', idToken);
  })
```

### Retrieve the stored token

You can retrieve a token that is stored in the Token Manager using the `tokenManager.get` method:

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
  url: 'https://${yourOktaDomain}',
  // OpenID Connect App Client ID
  clientId: '${clientId}',
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

In the code example above, the ID token is retrieved using a redirect to the Okta sign-in page. It's also possible to take a `username` and `password` pair input by the user and pass them to the `signIn` method. This method then initiates an authentication process that returns an [Okta session cookie](/docs/guides/session-cookie/#retrieving-a-session-cookie-by-visiting-a-session-redirect-link). You can then use this Okta session cookie, along with the `getWithRedirect` method, to get back the ID Token. This means that there is no need to redirect the user to the Okta sign-in page.

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

#### Complete Okta Session and OIDC token example

``` js
// Bootstrap the AuthJS Client
const authClient = new OktaAuth({
  // Org URL
  url: 'https://${yourOktaDomain}',
  // OpenID Connect App Client ID
  clientId: '${clientId}',
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

[authjs-reference](https://github.com/okta/okta-auth-js)
[authjs-reference-client-configuration](https://github.com/okta/okta-auth-js#configuration-reference)
[authjs-reference-token-getwithredirect](https://github.com/okta/okta-auth-js#tokengetwithredirectoptions)
[authjs-reference-token-parsefromurl](https://github.com/okta/okta-auth-js#tokenparsefromurloptions)
[authjs-reference-tokenmanager-add](https://github.com/okta/okta-auth-js#tokenmanageraddkey-token)
[authjs-reference-tokenmanager-get](https://github.com/okta/okta-auth-js#tokenmanagergetkey)
[authjs-reference-signin](https://github.com/okta/okta-auth-js#signinoptions)
