### Create the proof key for code exchange

Just like with the regular <GuideLink link="../../authcode/main/">authorization code flow</GuideLink>, your app starts by redirecting the user's browser to your [Authorization Server's](/docs/concepts/auth-servers/) `/authorize` endpoint. However, in this instance you also have to pass along a code challenge.

Your first step is to generate a code verifier and challenge:

* Code verifier: Random URL-safe string with a minimum length of 43 characters.
* Code challenge: Base64 URL-encoded SHA-256 hash of the code verifier.

You need to add code in your native app to create the code verifier and code challenge.

The PKCE generator code creates output like this:

```
{
  "code_verifier":"M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag",
  "code_challenge":"qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es"
}
```

The `code_challenge` is a Base64 URL-encoded SHA256 hash of the `code_verifier`. Your app saves the `code_verifier` for later, and sends the `code_challenge` along with the authorization request to your Authorization Server's `/authorize` URL.

### Request an authorization code

If you are using the default Custom Authorization Server, then your request URL would look something like this:

```
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabygpxgk9lXaMgF0h7&response_type=code&scope=openid&redirect_uri=yourApp%3A%2Fcallback&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created in the [Set up your app](#set-up-your-app) section.
- `response_type` is `code`, indicating that we are using the authorization code grant type.
- `scope` is `openid`, which means that the `/token` endpoint returns an ID token. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).
- `redirect_uri` is the callback location where the user agent is directed to along with the `code`. This must match one of the **Sign-in redirect URIs** that you specified when you were creating your Okta application in the [Set up your app](#set-up-your-app) section.
- `state` is an arbitrary alphanumeric string that the authorization server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.
- `code_challenge_method` is the hash method used to generate the challenge, which is always `S256`.
- `code_challenge` is the code challenge used for PKCE.

See [the OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize) for more information on these parameters.

If the user doesn't have an existing session, this request opens the Okta sign-in page. If they have an existing session, or after they authenticate, the user arrives at the specified `redirect_uri` along with an authorization `code`:

```
yourApp:/callback?code=BdLDvZvO3ZfSwg-asLNk&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9
```

This code can only be used once, and remains valid for 300 seconds, during which time it can be exchanged for tokens.

### Exchange the code for tokens

To exchange this code for access and ID tokens, you pass it to your [Authorization Server's](/docs/concepts/auth-servers/) `/token` endpoint along with the `code_verifier` that was generated at the beginning:

```
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=0oabygpxgk9lXaMgF0h7&redirect_uri=yourApp%3A%2Fcallback&code=CKA9Utz2GkWlsrmnqehz&code_verifier=M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag'
```

> **Important:** Unlike the regular <GuideLink link="../../authcode/main/">authorization code flow</GuideLink>, this call doesn't require the Authorization header with the Client ID and secret. That is why this version of the Authorization Code flow is appropriate for native apps.

Note the parameters that are being passed:

- `grant_type` is `authorization_code`, indicating that we are using the authorization code grant type.
- `redirect_uri` must match the URI that was used to get the authorization code.
- `code` is the authorization code that you got from the `/authorize` endpoint.
- `code_verifier` is the PKCE code verifier that your app generated at the beginning of this flow.
- `client_id` identifies your client and must match the value preregistered in Okta.    

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

### Validate access tokens

When your application passes a request with an access token, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
