---
title: Exchange the Code for Tokens
---

To exchange this code for access and ID tokens, you pass it to your [Authorization Server's](/docs/concepts/auth-servers/) `/token` endpoint along with the `code_verifier` that was generated at the beginning:

```
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=0oabygpxgk9lXaMgF0h7&redirect
  _uri=yourApp%3A%2Fcallback&code=CKA9Utz2GkWlsrmnqehz&code_verifier=M25iVXpKU
  3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag'
```

> **Important:** Unlike the regular [Authorization Code Flow](/docs/guides/implement-auth-code/), this call doesn't require the Authorization header with the client ID and secret. This is why this version of the Authorization Code flow is appropriate for native apps.

Note the parameters that are being passed:

- `grant_type` is `authorization_code`, indicating that we are using the authorization code grant type.
- `redirect_uri` must match the URI that was used to get the authorization code.
- `code` is the authorization code that you got from the `/authorize` endpoint.
- `code_verifier` is the PKCE code verifier that your app generated at the beginning of this flow.

For more information on these parameters, see the [OIDC & OAuth 2.0 API reference](/docs/reference/api/oidc/#token).

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

<NextSectionLink>Next Steps</NextSectionLink>
