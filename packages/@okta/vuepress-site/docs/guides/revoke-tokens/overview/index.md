---
title: Overview
---

If you want to disable an access or refresh token, simply send a request to your `/revoke` endpoint:

```BASH
http --form POST https://${yourOktaDomain}/oauth2/v1/revoke \
  accept:application/json \
  authorization:'Basic ZmEz...' \
  cache-control:no-cache \
  content-type:application/x-www-form-urlencoded \
  token=eyJhbG... \
  token_type_hint=access_token
```

> **Note:** Revoking a token that is invalid, expired, or already revoked still returns a `200 OK` to not leak information.

See [Revoke a Token](/docs/reference/api/oidc/#revoke) in the Okta OpenID Connect & OAuth 2.0 reference.

<NextSectionLink/>
