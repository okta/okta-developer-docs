---
title: Additional rate limits
excerpt: >-
  Understand what other rate limit options there are at Okta and learn how to design for efficient use of resources
---

# Additional rate limits

This page provides Okta's additional limits on:

* [Concurrent requests](#concurrent-rate-limits)
* [End-user rate limit](#end-user-rate-limits)
* [Home page endpoints](#home-page-endpoints-and-per-minute-limits)
* [Okta-generated email messages](#okta-generated-email-message-rate-limits)
* [Per-user limits](#per-user-limits)
* [SMS and Call rate limits](#sms-and-call-rate-limits)
* [Workforce license rate limit multiplier](#workforce-license-rate-limit-multiplier)

These limits are part of the Okta [Rate limit](/docs/reference/rate-limits) policy.

> **Note:**
>
> * In addition to the rate limits listed on this page, Okta applies rate limits per API, divided into three categories. See the [Rate limit overview](/docs/reference/rate-limits).
> * To learn more about how to manage rate limits, see our [best practices](/docs/reference/rl-best-practices).
> * You can expand Okta rate limits upon request. To learn how, see [Request exceptions](/docs/reference/rl-best-practices/#request-exceptions) and [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/).
>

## Concurrent rate limits

To protect the service for all customers, Okta enforces concurrent rate limits, which is a limit on the number of simultaneous transactions. Concurrent rate limits are distinct from [the org-wide, per-minute API rate limits](/docs/reference/rate-limits/), which measure the total number of transactions per minute. Transactions are typically very short-lived. Even very large bulk loads rarely use more than 10 simultaneous transactions at a time.

For concurrent rate limits, traffic is measured in three different areas. Counts in one area aren't included in counts for the other two:

* For agent traffic, Okta has set the limit based on typical org use. This limit varies from agent to agent.
* For Office365 traffic, the limit is 75 concurrent transactions per org.
* For all other traffic, including API requests, the limit is described in the table below.

| Developer (free)  | Developer (paid)  | One App  | Enterprise  | Workforce Identity  |
| ----------------: | ----------------: | -------: | ----------: | ------------------: |
| 15                | 35                | 35       | 75          | 75                  |

The first request to exceed the concurrent limit returns an HTTP 429 error, and the first error every 60 seconds is written to the log. Reporting concurrent rate limits once a minute keeps log volume manageable.

> **Note:** Under normal circumstances, customers don't exceed the concurrency limits. Exceeding them may be an indication of a problem that requires investigation.

These rate limits apply to all new Okta organizations. For orgs created before 2018-05-17, the [previous rate limits](/docs/reference/rl-previous/) still apply.

> **Note:** For information on possible interaction between Inline Hooks and concurrent rate limits, see [Inline hooks and concurrent rate limits](/docs/concepts/inline-hooks/#inline-hooks-and-concurrent-rate-limits).

### End-user rate limits

Okta limits the number of requests:
* From the Admin Console and the End-User Dashboard, to 40 requests per user per 10 seconds per endpoint. This rate limit protects users from each other and from other API requests in the system.

* To the Identity Engine, to 20 requests per user per 5 seconds and 10 requests per state token per 5 seconds. <ApiLifecycle access="ie" />

If a user exceeds this limit, they receive an HTTP 429 error response without affecting other users in your org. A message is written to the System Log that indicates that the end-user rate limit was encountered.

### Home page endpoints and per-minute limits

The following endpoints are used by the Okta home page for authentication and user sign in and have org-wide rate limits:

| Okta home page endpoints                                                | Developer (free)  | Developer (paid)  | One App  | Enterprise  | Workforce Identity |
| ----------------------------------------------------------------------- | ----------------: | ----------------: | -------: | ----------: | ------------------:|
| `/app/{app}/{key}/sso/saml`                                             | 100               | 300               | *300     | *600        | 750                |
| `/app/office365/{key}/sso/wsfed/active`                                 | N/A               | N/A               | N/A      | 2000        | 1000               |
| `/app/office365/{key}/sso/wsfed/passive`                                | N/A               | N/A               | N/A      | 250         | 250                |
| `/app/template_saml_2_0/{key}/sso/saml`                                 | 100               | 300               | *300     | *600        | 2500               |
| `/login/do-login`                                                       | 100               | 300               | 300      | 600         | 200                |
| `/login/login.htm`                                                      | 100               | 300               | 300      | 600         | 850                |
| `/login/sso_iwa_auth`                                                   | 100               | 300               | 300      | 600         | 500                |
| `/api/plugin/{protocolVersion}/form-cred/{appUserIds}/{formSiteOption}` | 100               | 300               | *300     | *600        | 650                |
| `/api/plugin/{protocolVersion}/sites`                                   | 20                | 50                | 50       | 100         | 150                |
| `/bc/image/fileStoreRecord`                                             | 100               | 300               | *300     | *600        | 500                |
| `/bc/globalFileStoreRecord`                                             | 100               | 300               | *300     | *600        | 500                |

These rate limits apply to all new Okta organizations. For orgs created before 2018-05-17, the [previous rate limits](/docs/reference/rl-previous/) still apply.

The limits for these endpoints can be increased by purchasing the [High-capacity add-on](/docs/reference/rl-previous/#high-capacity-rate-limits).

### Okta-generated email message rate limits

Limits are applied on a per-recipient basis and vary by email type. The limit for some email types is no more than 30 emails per-recipient, per-minute, while other email types are configured with higher limits. These limits protect your org against denial-of-service attacks and help ensure that adequate resources are available for all customers.

### Per-user limits

API endpoints that take username and password credentials, including the [Authentication API](/docs/reference/api/authn/) and the [OAuth 2.0 resource owner password flow](/docs/guides/implement-password/), have a per-username rate limit to prevent brute force attacks with the user's password:

| Action and Okta API endpoint                                      | Per User limits (all orgs) |
| ----------------------------------------------------------------- | -------------------------: |
| **Authenticate the same user:**<br>`/api/v1/authn`                | 4 per second               |
| **Generate or refresh an OAuth 2.0 token:**<br>`/oauth2/v1/token` | 4 per second               |

### SMS and Call rate limits

* **Per user/per phone number rate limit:** The 30 second verification rate limit applies to a user's attempt to send an SMS or Call enrollment or verification message to the same phone number. The rate limit is one SMS or Call challenge per phone number every 30 seconds.

> **Note:** Okta round-robins between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

* **Enrollment rate limit:** This rate limit applies to a user's attempt to enroll an [SMS or a Call factor](/docs/reference/api/factors/) using any phone number. This rate limit applies to only the enrollment operation. See [System Log events for rate limits](/docs/reference/rl-system-log-events/#debugcontext-object-examples) for examples of System Log rate limit events where too many enrollment attempts for the SMS or Call factors were made.

  **Endpoints**
  * `/api/v1/authn/factors`
  * `/api/v1/users/{userId}/factors`

  **Identity Engine endpoints**<br>
  <ApiLifecycle access="ie" />
  * `/idp/idx/challenge`
  * `/idp/idx/credential/enroll`

### Workforce license rate limit multiplier

Workforce orgs that are created after January 7, 2021 have increased default rate limits. This increase is for [specific endpoints](#list-of-endpoints) and depends on a Workforce org's license count (Universal Directory or Single-Sign On).

| Workforce licenses | Rate limit multiplier      |
| ------------------ | -------------------------: |
| < 10K              | 1x the default rate limit  |
| 10K - 100K         | 5x the default rate limit  |
| > 100K             | 10x the default rate limit |

#### List of endpoints

[Authentication](/docs/reference/rl-global-enduser/)

* `/api/v1/authn`
* `/api/v1/authn/factors/{factorIdOrFactorType}/verify`
* `/api/v1/sessions`
* `/login/login.htm`
* `/login/sso_iwa_auth`
* `/login/sessionCookieRedirect`
* `/login/token/redirect`
* `/api/{apiVersion}/radius`

[Authorization](/docs/reference/rl-global-enduser/)

* `/oauth2/{authorizationServerId}/v1`
* `/oauth2/v1`
* `/app/{app}/{key}/sso/saml`
* `/app/office365{appType}/{key}/sso/wsfed/active`
* `/app/office365{appType}/{key}/sso/wsfed/passive`
* `/app/template_saml_2_0/{key}/sso/saml`
* `/idp/idx/introspect EXACT MATCH` <ApiLifecycle access="ie" />
* `/idp/idx/identify EXACT MATCH` <ApiLifecycle access="ie" />
* Identity Engine App Intent <ApiLifecycle access="ie" />

[Single User/Group/App operations (GET, UPDATE, and DELETE)](/docs/reference/rl-dynamic-scale/)

* `/api/v1/apps/{id}`
* `/api/v1/groups/{id}`
* `/api/v1/users/{id}`
* `/api/v1/users/{idOrLogin}`
