---
title: Authorization Code Flow with PKCE
excerpt: How to implement the authorization code flow with PKCE with Okta
---

# Implementing the Authorization Code Flow with PKCE

If you are building a native application, then the authorization code flow with a Proof Key for Code Exchange (PKCE) is the recommended method for controlling the access between your application and a resource server.

The Authorization Code Flow with PKCE is the standard Code flow with an extra step at the beginning and an extra verification at the end. At a high-level, the flow has the following steps:

- Your application generates a code verifier followed by a code challenge.
- Your application directs the browser to the Okta Sign-In page, along with the generated code challenge, and the user authenticates.
- Okta redirects back to your native application with an authorization code.
- Your application sends this code, along with the code verifier, to Okta. Okta returns access and ID tokens, and optionally a refresh token.
- Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.

For more information on the authorization code with PKCE flow, including why to use it, see our [OAuth 2.0 Overview](/authentication-guide/auth-overview/#authorization-code-with-pkce-flow).

### 1. Setting up your Application

You set up your OpenID Connect application inside the Okta Developer Console:

1. From the Applications page, choose **Add Application**.
2. On the Create New Application page, select **Native**.
3. Fill-in the Application Settings, then click **Done**.

### 2. Using the Authorization Code Flow with PKCE

Just like with the regular authorization code flow, you start by making a request to your authorization server's `/authorize` endpoint. However, in this instance you will also have to pass along a code challenge.

Your first step is to generate a code verifier and challenge:

* Code verifier: Random URL-safe string with a minimum length of 43 characters.
* Code challenge: Base64 URL-encoded SHA-256 hash of the code verifier.

You'll need to add code in your native app to create the code verifier and code challenge. For examples of code that handles this, see [below](#examples).

The PKCE generator code will create output like this:

```
{
  "code_verifier":"M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag",
  "code_challenge":"qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es"
}
```

The `code_challenge` is a Base64-URL-encoded string of the SHA256 hash of the `code_verifier`. Your app will save the `code_verifier` for later, and send the `code_challenge` along with the authorization request to your authorization server's `/authorize` URL.

If you are using the default Okta authorization server, then your request URL would look something like this:

```
https://{yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabygpxgk9l
XaMgF0h7&response_type=code&scope=openid&redirect_uri=yourApp%3A%2Fcallback&st
ate=state-8600b31f-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_
challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created above. You can find it at the bottom of your application's General tab.
- `response_type` is `code`, indicating that we are using the authorization code grant type.
- `scope` is `openid`, which means that the `/token` endpoint will return an ID token. For more information about scopes, see [here](/docs/api/resources/oidc#scopes).
- `redirect_uri` is the callback location where the user-agent will be directed to along with the `code`. This must match one of the "Login redirect URIs" you specified when you were creating your Okta application in Step 1.
- `state` is an arbitrary alphanumeric string that the authorization server will reproduce when redirecting the user-agent back to the client. This is used to help prevent cross-site request forgery.
- `code_challenge_method` is the hash method used to generate the challenge, which will always be `S256`.
- `code_challenge` is the code challenge used for PKCE.

For more information on these parameters, see [the OAuth 2.0 API reference](/docs/api/resources/oidc#authorize).

If the user does not have an existing session, this will open the Okta Sign-in Page. If they have an existing session, or after they authenticate, they will arrive at the specified `redirect_uri` along with an authorization `code`:

```
yourApp:/callback?code=BdLDvZvO3ZfSwg-asLNk&state=state-8600b31f-52d1-4dca-
987c-386e3d8967e9
```

This code can only be used once, and will remain valid for 60 seconds, during which time it can be exchanged for tokens.

### 3. Exchanging the Code for Tokens

To exchange this code for access and ID tokens, you pass it to your authorization server's `/token` endpoint along with the `code_verifier` that was generated at the beginning:

```
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=0oabygpxgk9lXaMgF0h7&redirect
  _uri=yourApp%3A%2Fcallback&code=CKA9Utz2GkWlsrmnqehz&code_verifier=M25iVXpKU
  3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag'
```

> Important: Unlike the regular [Authorization Code Flow](auth-code), this call does not require the Authorization header with the client ID and secret. This is why this version of the Authorization Code flow is appropriate for native apps.

Note the parameters that are being passed:

- `grant_type` is `authorization_code`, indicating that we are using the authorization code grant type.
- `redirect_uri` must match the URI that was used to get the authorization code.
- `code` is the authorization code that you got from the `/authorize` endpoint.
- `code_verifier` is the PKCE code verifier that your app generated at the beginning of this flow.

For more information on these parameters, see the [OIDC & OAuth 2.0 API reference](/docs/api/resources/oidc#token).

If the code is still valid, and the code verifier matches, your application will receive back access and ID tokens:

```
{
    "access_token": "eyJhb[...]Hozw",
    "expires_in": 3600,
    "id_token": "eyJhb[...]jvCw",
    "scope": "openid",
    "token_type": "Bearer"
}
```

### 4. Next Steps

When your application passes a request with an `access_token`, the resource server will need to validate it. For more on this, see [Validating Access Tokens](/authentication-guide/tokens/validating-access-tokens).

### Examples

The following native application examples show the authorization code flow, as it would be implemented by a native application that needs to authenticate a user.  These are complete example applications that show the entire experience.

|                                      | Environment | Example Repository                                 |
|:------------------------------------:| ----------- | -------------------------------------------------- |
| <i class="icon code-android-32"></i> | Android     | <https://github.com/okta/okta-sdk-appauth-android> |
| <i class="icon code-ios-32"></i>     | iOS         | <https://github.com/okta/okta-sdk-appauth-ios>     |
