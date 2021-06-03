---
title: Authentication/End-user rate limits
excerpt: >-
  Understand authentication/end-user rate limits at Okta and learn how to design for efficient use of
  resources
---

# Authentication/End-user rate limits

This page provides the API rate limits for authentication and end-user activities, which is part of Okta [rate limits](/docs/reference/rate-limits).

> **Note:**
>
> * To learn more about rate limits, visit our [overview](/docs/reference/rate-limits) and [best practices](/docs/reference/rl-best-practices) pages.
> * In addition to the rate limit per API, Okta implements limits on concurrent requests, Okta-generated email messages, end user requests, and home page endpoints. These limits are described on the [Additional limits](/docs/reference/rl-additional-limits/) page.
> * You can expand Okta rate limits upon request. To learn how, see [Request exceptions](/docs/reference/rl-best-practices/#request-exceptions) and [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/).
>

> We enforce limits at the individual API endpoint level **as requests per minute**.

| Action and Okta API Endpoint                                                                                           | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity    |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------: | ----------------: | -------: | ----------: | ---------------------: |
| **Cumulative rate limit**                                                                                              | **1,700**        | **9,000**        | **9,000**| **11,200**| **13,900**            |
| **Authenticate different end users:**<br>`/api/v1/authn`                                                               | 100              | 600              | 600     | 600        | 500                   |
| **Verify a factor:**<br>`/api/v1/authn/factors/{factorIdOrFactorType}/verify` only                                     | 100              | 600              | 600     | 600        | 500                   |
| **Get session information:**<br>`/api/v1/sessions`                                                                     | 100              | 600              | 600     | 600        | 750                   |
| **OAuth2 requests for Custom Authorization Servers:**<br>`/oauth2/{authorizationServerId}/v1` except public metadata endpoints (see Note below)  | 300 | 1,200 | 1,200     | 1,200       | 2,000                  |
| **OAuth2 requests for the Org Authorization Server:**<br>`/oauth2/v1` except `/oauth2/v1/clients` and public metadata endpoints (see Note below) | 300 | 1,200 | 1,200     | 1,200       | 2,000                  |
| **All other OAuth2 requests:**<br>`/oauth2`                                                                            | 100              | 600              | 600     | 600        | 600                   |
| `/app/{app}/{key}/sso/saml`                                                                                            | 100              | 600              | 600     | 600        | 750                   |
| `/app/office365{appType}/{key}/sso/wsfed/active`                                                                       | N/A              | N/A              | N/A     | 2,000       | 1,000                  |
| `/app/office365{appType}/{key}/sso/wsfed/passive`                                                                      | N/A              | N/A              | N/A     | 250        | 250                   |
| `/app/template_saml_2_0/{key}/sso/saml`                                                                                | 100              | 600              | 600     | 600        | 2,500                  |
| `/login/login.htm`                                                                                                     | 100              | 600              | 600     | 600        | 850                   |
| `/login/sso_iwa_auth`                                                                                                  | 100              | 600              | 600     | 600        | 500                   |
| `/api/{apiVersion}/radius`                                                                                             | 100              | 600              | 600     | 600        | 600                   |
| `/idp/idx`                                                                                                             | 100              | 600              | 600     | 600        | 500                   |
| `/login/token/redirect`                                                                                                             | 100              | 600              | 600     | 600        | 600                   |
| <ApiLifecycle access="ie" /> **Identity Engine APIs:**                                                                            |               |               |      |         |                    |
| `/idp/idx`                                                                                                     | 100              | 600              | 600     | 600        | 1,200                   |
| `/idp/idx/identify`                                                                                                     | 100              | 600              | 600     | 600        | 600                   |
| `/idp/idx/introspect`                                                                                                     | 150              | 900              | 900     | 900        | 900                   |
| `/idp/idx/challenge/poll`                                                                                                     | 100              | 600              | 600     | 600        | 600                   |
| `/idp/idx/authenticators/poll`                                                                                                     | 100              | 600              | 600     | 600        | 600                   |
| `/idp/idx/poll`                                                                                                     | 100              | 600              | 600     | 600        | 600                   |
| Identity Engine App Intent                                                                                                     | 150              | 900              | 900     | 900        | 900                   |


> **Note:** The following public metadata endpoints aren't subjected to rate limiting.
>
> Public metadata endpoints for the Org Authorization Server are:
> * `/oauth2/v1/keys`
> * `/.well-known/openid-configuration`
> * `/.well-known/oauth-authorization-server`
>
> Public metadata endpoints for the Custom Authorization Servers are:
> * `/oauth2/{authorizationServerId}/v1/keys`
> * `/oauth2/{authorizationServerId}/.well-known/openid-configuration`
> * `/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`
>
