---
title: Use the Authorization Code flow with PKCE
---

Just like with the regular Authorization Code flow, your app starts by redirecting the user's browser to your [Authorization Server's](/docs/concepts/auth-servers/) `/authorize` endpoint. However, in this instance you also have to pass along a code challenge.

Your first step is to generate a code verifier and challenge:

* Code verifier: Random URL-safe string with a minimum length of 43 characters.
* Code challenge: Base64 URL-encoded SHA-256 hash of the code verifier.

You need to add code in your native app to create the code verifier and code challenge.

The PKCE generator code creates output like this:

```json
{
  "code_verifier":"M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag",
  "code_challenge":"qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es"
}
```

The `code_challenge` is a Base64 URL-encoded SHA256 hash of the `code_verifier`. Your app saves the `code_verifier` for later, and sends the `code_challenge` along with the authorization request to your Authorization Server's `/authorize` URL.

If you are using the default Custom Authorization Server, then your request URL would look something like this:

```
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabygpxgk9lXaMgF0h7&response_type=code&scope=openid&redirect_uri=yourApp%3A%2Fcallback&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created in the <GuideLink link="../setup-app">previous step</GuideLink>. You can find it at the bottom of your application's **General** tab.
- `response_type` is `code`, indicating that we are using the authorization code grant type.
- `scope` is `openid`, which means that the `/token` endpoint returns an ID token. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).
- `redirect_uri` is the callback location where the user agent is directed to along with the `code`. This must match one of the **Sign-in redirect URIs** that you specified when you were creating your Okta application in the <GuideLink link="../setup-app">previous step</GuideLink>.
- `state` is an arbitrary alphanumeric string that the authorization server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.
- `code_challenge_method` is the hash method used to generate the challenge, which is always `S256`.
- `code_challenge` is the code challenge used for PKCE.

See [the OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize) for more information on these parameters.

If the user doesn't have an existing session, this request opens the Okta sign-in page. If they have an existing session, or after they authenticate, the user arrives at the specified `redirect_uri` along with an authorization `code`:

```
yourApp:/callback?code=BdLDvZvO3ZfSwg-asLNk&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9
```

This code can only be used once, and remains valid for 300 seconds, during which time it can be exchanged for tokens.

<NextSectionLink/>
