---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.41
---

## 2016.43

### Enhanced Well-Known Endpoint for OpenID Connect

The [OpenID Connect discovery endpoint](/docs/api/resources/oidc#well-knownopenid-configuration) `.well-known` includes the introspection and revocation endpoints.

Request Example:

```bash
GET https://{yourOktaDomain}/.well-known/openid-configuration
```

Response Example:

```bash
{
    "issuer": "https://{yourOktaDomain}",
    "authorization_endpoint": "https://{yourOktaDomain}/oauth2/v1/authorize",
    "token_endpoint": "https://{yourOktaDomain}/oauth2/v1/token",
    "userinfo_endpoint": "https://{yourOktaDomain}/oauth2/v1/userinfo",
    "jwks_uri": "https://{yourOktaDomain}/oauth2/v1/keys",
    "response_types_supported": [
        "code",
        "code id_token",
        "code id_token token",
        "id_token",
        "id_token token",
        "token"
    ],
    ...
    "introspection_endpoint": "https://{yourOktaDomain}/oauth2/v1/introspect",
    "introspection_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "none"
    ],
    "revocation_endpoint": "https://{yourOktaDomain}/oauth2/v1/revoke",
    "revocation_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "none"
    ]
}
```

### New Function for Replacing Strings

Use the [Expression Language](/reference/okta_expression_language/) function `String.replaceFirst` to replace the first occurrence of a string.

Example:

`String.replaceFirst("This list includes chores", "is", "at") = "That list includes chores"`

In release 2016.41 we introduced the string replacement function `String.replace`, which replaces all instances of a specified string.

### Platform Bug Fixed

POST requests to `/api/v1/sessions` failed with an InvalidSessionException if the request specified a
`sessionToken` but no API token was included. (OKTA-104965)
