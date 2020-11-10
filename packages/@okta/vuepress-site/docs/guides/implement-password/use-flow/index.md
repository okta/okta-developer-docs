---
title: Use the Resource Owner Password Flow
---

Before you can begin this flow, collect the user's password in a manner of your choosing. After you have collected the credentials, all that is required is a single API call to the [Authorization Server's](/docs/concepts/auth-servers/#custom-authorization-server) `/token` endpoint. If you are using the default Custom Authorization Server, then your request would look something like this:

```
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hYn...' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=password&username=testuser1%40example.com&password=%7CmCov
  rlnU9oZU4qWGrhQSM%3Dyd&scope=openid'
```

> **Important:** The call to your [Authorization Server's](/docs/concepts/auth-servers/) `/token` endpoint requires authentication. In this case, it is a Basic Auth digest of the Client ID and secret. You can find the client ID and secret on your application's **General** tab. See [Client Authentication Methods](/docs/reference/api/oidc/#client-authentication-methods).

Note the parameters that are being passed:

- `grant_type` is `password`, indicating that we are using the Resource Owner Password grant type.
- `username` is the username of a user registered with Okta.
- `password` is the password of a user registered with Okta.
- `scope` must be at least `openid`. For more information about this, see the [Custom Authorization Server chapter](/docs/guides/customize-authz-server/create-scopes/).

For more information on these parameters, see the [OAuth 2.0 API reference](/docs/reference/api/oidc/#token).

If the credentials are valid, your application will receive back access and ID tokens:

```
{
    "access_token": "eyJhb[...]56Rg",
    "expires_in": 3600,
    "id_token": "eyJhb[...]yosFQ",
    "scope": "openid",
    "token_type": "Bearer"
}
```

<NextSectionLink>Next Steps</NextSectionLink>
