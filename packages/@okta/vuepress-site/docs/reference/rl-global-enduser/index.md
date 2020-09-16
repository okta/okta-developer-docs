---
title: End-user access rate limits
excerpt: >-
  Understand end-user rate limits at Okta and learn how to design for efficient use of
  resources
---

# End-user access rate limits

This page provides the API rate limits for end-user and authentication activities, which is part of the Okta [rate limits](/docs/reference/rate-limits).

> **Note:**
>
> * To learn more about rate limits, visit our [overview](/docs/reference/rate-limits) and [best practices](/docs/reference/rl-best-practices) pages.
> * In addition to the rate limit per API, Okta implements limits on concurrent requests, Okta-generated email messages, end user requests, and home page endpoints. These limits are described on the [Additional limits](/docs/reference/rl-additional-limits/) page.
> * You can expand Okta rate limits upon request. To learn how, see [Request exceptions](/docs/reference/rl-best-practices/#request-exceptions) and [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/).
>

| Action and Okta API Endpoint                                                                                                        | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity    |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------- | ------- | ---------- | --------------------- |
| **Authenticate different end users:**<br>`/api/v1/authn`                         | 100              | 300              | 300     | 600        | 500                   |
| **Verify a factor:**<br>`/api/v1/authn/factors/{factorIdOrFactorType}/verify` only                  | 100              | 300              | 300     | 600        | 500                   |
| **Get session information:**<br>`/api/v1/sessions`                                           | 100              | 300              | 300     | 600        | 750                   |
| **OAuth2 requests for Custom Authorization Servers:**<br>`/oauth2/{authorizationServerId}/v1` except public metadata endpoints (see Note below)| 300              | 600              | 600     | 1200       | 2000                  |
| **OAuth2 requests for the Org Authorization Server:**<br>`/oauth2/v1` except `/oauth2/v1/clients` and public metadata endpoints (see Note below)| 300              | 600              | 600     | 1200       | 2000                  |
| **All other OAuth2 requests:**<br>`/oauth2`                          | 100              | 300              | 300     | 600        | 600                   |
| **Most other API actions:**<br>`/api/v1`     | 100              | 300              | 300     | 600        | 1200                  |

> **Note:** The following public metadata endpoints aren't subjected to rate limiting.
>
> Public metadata endpoints for Org Authorization Server are:
> * `/oauth2/v1/keys`
> * `/.well-known/openid-configuration`
> * `/.well-known/oauth-authorization-server`
>
> Public metadata endpoints for Custom Authorization Servers are:
> * `/oauth2/{authorizationServerId}/v1/keys`
> * `/oauth2/{authorizationServerId}/.well-known/openid-configuration`
> * `/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`
>
