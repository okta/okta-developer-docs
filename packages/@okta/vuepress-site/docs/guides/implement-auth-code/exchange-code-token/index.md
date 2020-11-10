---
title: Exchange the code for tokens
---

To exchange this code for access and ID tokens, you pass it to your [Authorization Server's](/docs/concepts/auth-servers/) `/token` endpoint. If you are using the default Custom Authorization Server, then your request would look something like this:

```
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A8080&code=P59yPm1_X1gxtdEOEZjn'
```

> **Important:** The call to the `/token` endpoint requires authentication. In this case, it is a Basic Auth digest of the Client ID and secret. You can find the Client ID and secret on your application's **General** tab. This requirement is why this call is only appropriate for applications that can guarantee the confidentiality of the client secret. See [Client Authentication Methods](/docs/reference/api/oidc/#client-authentication-methods).

Note the parameters that are being passed:

- `grant_type` is `authorization_code`, indicating that we are using the authorization code grant type.
- `redirect_uri` must match the URI that was used to get the authorization code.
- `code` is the authorization code that you got from the `/authorize` endpoint.

See the [OAuth 2.0 API reference](/docs/reference/api/oidc/#token) for more information on these parameters.

If the code is still valid, your application receives back access and ID tokens:

```json
{
    "access_token": "eyJhbG[...]9pDQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "openid",
    "id_token": "eyJhbG[...]RTM0A"
}
```

<NextSectionLink>Next steps</NextSectionLink>
