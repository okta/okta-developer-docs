---
title: Additional rate limits for Okta orgs
excerpt: >-
  Understand what other rate limit options there are at Okta and learn how to design for efficient use of resources
---

# Additional rate limits

This page provides limits on:

* [Concurrent requests](#concurrent-rate-limits)
* [End user rate limit](#end-user-rate-limits)
* [Home page endpoints](#home-page-endpoints-and-per-minute-limits)
* [Okta-generated emails](#okta-generated-email-rate-limits)
* [Per-user limits](#per-user-limits)
* [SMS and Call rate limits](#sms-and-call-rate-limits)
* [Org creation rate limits](#org-creation-rate-limits)
* [Workforce license rate limit multiplier](#workforce-license-rate-limit-multiplier)

These limits are part of the Okta [Rate limit](/docs/reference/rate-limits) policy.

> **Notes:**
>
> * Okta applies rate limits per API, divided into three categories, in addition to the rate limits listed on this page. See the [Rate limit overview](/docs/reference/rate-limits).
> * [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/) apply to various endpoints across different APIs for customers that purchased this add-on. (The DynamicScale add-on service is only available to Customer Identity Solutions (CIS) customers.)
> * Best practices are available to manage range limits. See [best practices](/docs/reference/rl-best-practices).
> * You can expand Okta rate limits upon request. To learn how, see [Request exceptions](/docs/reference/rl-best-practices/#request-rate-limit-exceptions) and [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/).
>

## Concurrent rate limits

To protect the service for all customers, Okta enforces concurrent rate limits, which is a limit on the number of simultaneous transactions. Concurrent rate limits are distinct from [the org-wide, per-minute API rate limits](/docs/reference/rate-limits/), which measure the total number of transactions per minute. Transactions are typically short-lived. Even large bulk loads rarely require more than 10 simultaneous transactions.

For concurrent rate limits, traffic is measured in three different areas. Counts in one area aren't included in counts for the other two:

* For agent traffic, Okta has set the limit based on typical org use. This limit varies from agent to agent.
* For Microsoft Office 365 traffic, the limit is 75 concurrent transactions per org.
* For all other traffic, including API requests, the limit is described in the following table.

| Developer (free)  | Developer (paid)  | One App  | Enterprise  | Workforce identity  |
| ----------------: | ----------------: | -------: | ----------: | ------------------: |
| 15                | 35                | 35       | 75          | 75                  |

The first request to exceed the concurrent limit returns an HTTP 429 error, and the first error every 60 seconds is written to the log. Reporting concurrent rate limits once a minute keeps log volume manageable.

> **Note:**
>
> * Under normal circumstances, customers don't exceed the concurrency limits. Exceeding them may be an indication of a problem that requires investigation.
> * For information on the possible interaction between inline hooks and concurrent rate limits, see [inline hooks and concurrent rate limits](/docs/concepts/inline-hooks/#inline-hooks-and-concurrent-rate-limits).
> * [Burst rate limits](/docs/reference/rate-limits/#burst-rate-limits) don't apply if the concurrency rate limit threshold is reached.

## End user rate limits

Okta limits the number of requests:

* From the Admin Console and the End-User Dashboard, to 40 requests per user per 10 seconds per endpoint. This rate limit protects users from each other and from other API requests in the system.

* To the Identity Engine, to 20 requests per user per 5 seconds and 10 requests per state token per 5 seconds. <ApiLifecycle access="ie" />

An HTTP 429 error response is returned to users that exceed this limit. No other users in your org are affected. A message appears in the System Log for the user that exceeded this limit.

## Home page endpoints and per-minute limits

The following endpoints are used by the Okta home page for authentication and user sign-in and have org-wide rate limits:

| Home page endpoints                                                | Developer (free)  | Developer (paid)  | One App  | Enterprise  | Workforce identity |
| ----------------------------------------------------------------------- | ----------------: | ----------------: | -------: | ----------: | ------------------:|
| `/app/{app}/{key}/sso/saml`                                             | 100               | 600               | *600     | *600        | 750                |
| `/app/office365/{key}/sso/wsfed/active`                                 | N/A               | N/A               | N/A      | 2000        | 1000               |
| `/app/office365/{key}/sso/wsfed/passive`                                | N/A               | N/A               | N/A      | 250         | 250                |
| `/app/template_saml_2_0/{key}/sso/saml`                                 | 100               | 600               | *600     | *600        | 2500               |
| `/login/do-login`                                                       | 100               | 600               | 600      | 600         | 200                |
| `/login/login.htm`                                                      | 100               | 600               | 600      | 600         | 850                |
| `/login/sso_iwa_auth`                                                   | 100               | 600               | 600      | 600         | 500                |
| `/bc/image/fileStoreRecord`                                             | 100               | 600               | *600     | *600        | 500                |
| `/bc/globalFileStoreRecord`                                             | 100               | 600               | *600     | *600        | 500                |

## Okta-generated email rate limits

Email limits are applied on a per-recipient basis and vary by email type. The limit for some email types is no more than 30 emails per recipient, per minute, while other email types are configured with higher limits. These limits protect your org against denial-of-service attacks and help ensure that adequate resources are available for all customers.

## Per-user limits

API endpoints that take username and password credentials, including the [Authentication API](/docs/reference/api/authn/) and the [OAuth 2.0 Resource Owner Password flow](/docs/guides/implement-grant-type/ropassword/main/), have a per-username rate limit. These limits prevent brute force attacks with the user's password:

| Action and Okta API endpoint                                      | Per user limits (all orgs) |
| ----------------------------------------------------------------- | -------------------------: |
| **Authenticate the same user:**<br>`/api/v1/authn`                | 4 per second               |
| **Generate or refresh an OAuth 2.0 token:**<br>`/oauth2/v1/token` | 4 per second               |

## SMS and Call rate limits

* **Per user/per phone rate limit:** The 30-second verification rate limit applies to an SMS or call enrollment or verification message to the same phone number. The rate limit is one challenge per phone number every 30 seconds.

> **Note:** Okta round-robins between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

* **Enrollment and verification rate limits:** This rate limit applies to a user's attempt to enroll or verify an [SMS or a Call factor](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/) using any phone number. This rate limit applies to only the enrollment or verification operation. See [System Log events for rate limits](/docs/reference/rl-system-log-events/#debugcontext-object-examples-for-operation-rate-limits) for examples.

## Org creation rate limits

API calls to the Org creator endpoint (POST `/api/v1/orgs`) have a limit of 10 orgs per minute.

> **Note:** Existing Org creator API users may have a different existing rate limit.

## Workforce license rate limit multiplier

Workforce orgs that are created after January 7, 2021 have increased default rate limits. This increase is for [specific endpoints](#list-of-endpoints) and depends on a Workforce org's license count (Universal Directory or Single-Sign-On).

| Workforce licenses | Rate limit multiplier      |
| ------------------ | -------------------------: |
| < 10,000              | The default rate limit  |
| 10,000–100,000        | Five times the default rate limit  |
| > 100,000             | 10 times the default rate limit |

### List of endpoints

[Authentication](/docs/reference/rl-global-enduser/)

* `/api/{apiVersion}/radius`
* `/api/v1/authn`
* `/api/v1/authn/factors/{factorIdOrFactorType}/verify`
* `/api/v1/sessions`
* `/login/agentlessDsso`
* `/login/agentlessDsso/auth`
* `/login/default`
* `/login/login.htm`
* `/login/sessionCookieRedirect`
* `/login/sso_iwa_auth`
* `/login/step-up/redirect`
* `/login/token/redirect`
* `/.well-known/webfinger`

[Authorization](/docs/reference/rl-global-enduser/)

* `/app/{app}/{key}/sso/saml`
* `/app/office365{appType}/{key}/sso/wsfed/active`
* `/app/office365{appType}/{key}/sso/wsfed/passive`
* `/app/template_saml_2_0/{key}/sso/saml`
* `/idp/idx/introspect` <ApiLifecycle access="ie" />
* `/idp/idx/identify` <ApiLifecycle access="ie" />
* Identity Engine App intent <ApiLifecycle access="ie" />
* `/oauth2/v1`
* `/oauth2/v1/authorize`
* `/oauth2/v1/token`
* `/oauth2/{authorizationServerId}/v1`
* `/oauth2/{authorizationServerId}/v1/authorize`
* `/oauth2/{authorizationServerId}/v1/token`

[Single User/Group/App read (GET only)](/docs/reference/rl-dynamic-scale/)

* `/api/v1/apps/{id}`
* `/api/v1/groups/{id}`
* `/api/v1/users/{id}`
* `/api/v1/users/{idOrLogin}`
