---
title: Use the Client Credentials flow
---

The Client Credentials flow is intended for server-side (AKA confidential) client applications with no end user, which normally describes machine-to-machine communication. Your client application needs to have its Client ID and secret stored in a secure manner. You can find the Client ID and secret on your application's **General** tab. These are then passed through Basic Auth in the request to your [Custom Authorization Server's](/docs/concepts/auth-servers/#custom-authorization-server) `/token` endpoint:

```
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials&scope=customScope'
```

> **Note:** The Client ID and secret aren't included in the POST body, but rather are placed in the HTTP Authorization header following the rules of HTTP Basic Auth.

Note the parameters that are being passed:

- `grant_type` is `client_credentials`, indicating that we are using the Client Credentials grant type.
- `scope` must be at least one custom scope that you have created. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).

If the credentials are valid, the application receives back an access token:

```
{
    "access_token": "eyJhbG[...]1LQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "customScope"
}
```

<NextSectionLink>Next steps</NextSectionLink>
