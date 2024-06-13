The following sections outline the main components required to implement the Authorization Code with PKCE flow using direct calls to the [OIDC & OAuth 2.0 API](/docs/reference/api/oidc/). Typically, you don't need to make direct calls if you're using one of the Okta SDKs.

### Create the Proof Key for Code Exchange

Similar to the standard [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/), your app starts by redirecting the user's browser to your [authorization server's](/docs/concepts/auth-servers/) `/authorize` endpoint. However, in this instance you also have to pass along a code challenge.

Your first step is to add code to your app that generates a code verifier and challenge:

* Code verifier: A random URL-safe string with a minimum length of 43 characters
* Code challenge: A Base64URL-encoded SHA-256 hash of the code verifier

The PKCE generator code returns both values as JSON:

```json
{
  "code_verifier":"M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag",
  "code_challenge":"qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es"
}
```

The `code_challenge` is a Base64URL-encoded SHA256 hash of the `code_verifier`. Your app saves the `code_verifier` for later, and sends the `code_challenge` along with the authorization request to your authorization server's `/authorize` URL.

### Request an authorization code

If you're using the org authorization server, then your request URL would look something like this:

```bash
https://{yourOktaDomain}/oauth2/v1/authorize?
   client_id=0oabygpxgk9lXaMgF0h7&
   response_type=code&scope=openid&
   redirect_uri=yourApp%3A%2Fcallback&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9&
   code_challenge_method=S256&
   code_challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

Note the parameters that are being passed:

* `client_id` is the client ID of the app integration that you created earlier. Find it in the Admin Console on your app integration's **General** tab.
* `response_type` is `code`, indicating that you're using the Authorization Code grant type.
* `scope` is `openid`, which means that the `/token` endpoint returns an ID token. For custom scopes, see the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
* `redirect_uri` is the callback location where the user agent is directed to along with the `code`. This URI must match one of the **Sign-in redirect URIs** that you specified when you created your app integration earlier.
* `state` is an arbitrary alphanumeric string that the authorization server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.
* `code_challenge_method` is the hash method used to generate the challenge, which is always `S256`.
* `code_challenge` is the code challenge used for PKCE.

See [the OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize) for more information on these parameters.

If the user doesn't have an existing session, this request opens the Okta sign-in page. If they have an existing session, or after they authenticate, the user arrives at the specified `redirect_uri` along with an authorization `code`:

```bash
yourApp:/callback?code=BdLDvZvO3ZfSwg-asLNk&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9
```

This code can only be used once, and remains valid for 300 seconds, during which time it can be exchanged for tokens.

### Exchange the code for tokens

To exchange the authorization code for access and ID tokens, you pass it to your [authorization server's](/docs/concepts/auth-servers/) `/token` endpoint along with the `code_verifier` that was generated at the beginning:

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=0oabygpxgk9lXaMgF0h7&redirect_uri=yourApp%3A%2Fcallback&code=CKA9Utz2GkWlsrmnqehz&code_verifier=M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag'
```

> **Important:** Unlike the regular [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/), this call doesn't require the HTTP Authorization header with the client ID and secret. That is why this version of the Authorization Code flow is appropriate for mobile apps.

Note the parameters that are being passed:

* `grant_type` is `authorization_code`, indicating that you're using the Authorization Code grant type.
* `redirect_uri` is the URI that was used to get the authorization code.
* `code` is the authorization code that you got from the `/authorize` endpoint.
* `code_verifier` is the PKCE code verifier that your app generated at the beginning of this flow.
* `client_id` is the client ID of the app integration that you created earlier.

See the [OIDC & OAuth 2.0 API reference](/docs/reference/api/oidc/#token) for more information on these parameters.

If the code is still valid, and the code verifier matches, your application receives back access and ID tokens:

```json
{
    "access_token": "eyJhb[...]Hozw",
    "expires_in": 3600,
    "id_token": "eyJhb[...]jvCw",
    "scope": "openid",
    "token_type": "Bearer"
}
```

### Validate access token

When your application passes a request with an access token, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
