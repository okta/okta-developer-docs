---
title: Overview
---

If you would like to disable an access or refresh token, simply send a request to the `/revoke` endpoint for the appropriate Authorization Server.

This example makes a request to revoke an access token issued by the Org Authorization Server. The URL of the Authorization Server for your request might be different than this example. See [Authorization Servers](/docs/concepts/auth-servers/#available-authorization-server-types) for more information.

```bash
http --form POST https://${yourOktaDomain}/oauth2/v1/revoke \
  accept:application/json \
  authorization:'Basic ZmEz...' \
  cache-control:no-cache \
  content-type:application/x-www-form-urlencoded \
  token=eyJhbG... \
  token_type_hint=access_token
```

> **Note:** Revoking a token that is invalid, expired, or already revoked returns a `200 OK` status code to prevent any information leaks.

See [Revoke a token](/docs/reference/api/oidc/#revoke) in the Okta OpenID Connect & OAuth 2.0 API reference.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
