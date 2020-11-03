---
title: Use the Client Credentials Flow
---

Your Client Application needs to have its client ID and secret stored in a secure manner. You can find the client ID and secret on your application's **General** tab. These are then passed through Basic Auth in the request to your [Okta Authorization Server's](/docs/concepts/auth-servers/) `/token` endpoint:

```
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials&scope=customScope'
```

> **Note:** The Client ID and Secret aren't included in the POST body, but rather are placed in the HTTP Authorization header following the rules of HTTP Basic Auth.

Note the parameters that are being passed:

- `grant_type` is `client_credentials`, indicating that we are using the Client Credentials grant type.
- `scope` must be at least one custom scope that you have created. For more information about this, see the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).

If the credentials are valid, the application will receive back an access token:

```
{
    "access_token": "eyJhbG[...]1LQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "customScope"
}
```

<NextSectionLink>Next Steps</NextSectionLink>
