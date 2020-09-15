---
title: End-user access rate limits
excerpt: >-
  Understand end-user rate limits at Okta and learn how to design for efficient use of
  resources
---

# End-user access rate limits

Okta limits the number of requests from the administrator and end-user UI to 40 requests per user per 10 seconds per endpoint. This rate limit protects users from each other and from other API requests in the system.

If a user exceeds this limit, they receive an HTTP 429 response without affecting other users in your org. A message is written to the System Log that indicates that the end-user rate limit was encountered.

Endpoints related to end-user activity (you don't need  to login as an admin in Okta to use thoese endpoints).

| Action and Okta API Endpoint                                                                                                        | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity    |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------- | ------- | ---------- | --------------------- |
| **Authenticate different end users:**<br>`/api/v1/authn`                         | 100              | 300              | 300     | 600        | 500                   |
| **Verify a factor:**<br>`/api/v1/authn/factors/{factorIdOrFactorType}/verify` only                  | 100              | 300              | 300     | 600        | 500                   |
| **Get session information:**<br>`/api/v1/sessions`                                           | 100              | 300              | 300     | 600        | 750                   |
| **OAuth2 requests for Custom Authorization Servers:**<br>`/oauth2/{authorizationServerId}/v1` except public metadata endpoints (see Note below)| 300              | 600              | 600     | 1200       | 2000                  |
| **OAuth2 requests for the Org Authorization Server:**<br>`/oauth2/v1` except `/oauth2/v1/clients` and public metadata endpoints (see Note below)| 300              | 600              | 600     | 1200       | 2000                  |
| **All other OAuth2 requests:**<br>`/oauth2`                          | 100              | 300              | 300     | 600        | 600                   |
| **Most other API actions:**<br>`/api/v1` [KARTHICK]      | 100              | 300              | 300     | 600        | 1200                  |

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