---
title: Use the Authorization Code Flow with PKCE
---

Just like with the regular authorization code flow, your app starts by redirecting the user's browser to your [Authorization Server's](/docs/concepts/auth-servers/) `/authorize` endpoint. However, in this instance you also have to pass along a code challenge.

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
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabygpxgk9l
XaMgF0h7&response_type=code&scope=openid&redirect_uri=yourApp%3A%2Fcallback&st
ate=state-8600b31f-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_
challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created above. You can find it at the bottom of your application's General tab.
- `response_type` is `code`, indicating that we are using the authorization code grant type.
- `scope` is `openid`, which means that the `/token` endpoint will return an ID token. For more information about scopes, see [here](/docs/reference/api/oidc/#scopes).
- `redirect_uri` is the callback location where the user-agent will be directed to along with the `code`. This must match one of the "Login redirect URIs" you specified when you were creating your Okta application in Step 1.
- `state` is an arbitrary alphanumeric string that the authorization server will reproduce when redirecting the user-agent back to the client. This is used to help prevent cross-site request forgery.
- `code_challenge_method` is the hash method used to generate the challenge, which will always be `S256`.
- `code_challenge` is the code challenge used for PKCE.

For more information on these parameters, see [the OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize).

If the user does not have an existing session, this will open the Okta Sign-in Page. If they have an existing session, or after they authenticate, they will arrive at the specified `redirect_uri` along with an authorization `code`:

```
yourApp:/callback?code=BdLDvZvO3ZfSwg-asLNk&state=state-8600b31f-52d1-4dca-
987c-386e3d8967e9
```

This code can only be used once, and will remain valid for 60 seconds, during which time it can be exchanged for tokens.

<NextSectionLink/>
