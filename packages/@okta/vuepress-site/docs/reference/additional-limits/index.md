---
title: Additional rate limits
excerpt: >-
  Understand what other rate limit options there are at Okta and learn how to design for efficient use of
  resources
---

# Additional rate limits

blah blah

## Concurrent rate limits

To protect the service for all customers, Okta enforces concurrent rate limits, which is a limit on the number of simultaneous transactions. Concurrent rate limits are distinct from [the org-wide, per-minute API rate limits](/docs/reference/rate-limits/), which measure the total number of transactions per minute. Transactions are typically very short-lived. Even very large bulk loads rarely use more than 10 simultaneous transactions at a time.

For concurrent rate limits, traffic is measured in three different areas. Counts in one area aren't included in counts for the other two:

* For agent traffic, Okta has set the limit based on typical org use. This limit varies from agent to agent.
* For Office365 traffic, the limit is 75 concurrent transactions per org.
* For all other traffic, including API requests, the limit is described in the table below.

| Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity |
| ---------------- | ---------------- | ------- | ---------- | ------------------ |
| 15               | 35               | 35      | 75         | 75                 |

The first request to exceed the concurrent limit returns an HTTP 429 error, and the first error every 60 seconds is written to the log. Reporting concurrent rate limits once a minute keeps log volume manageable.

> **Note:** Under normal circumstances, customers don't exceed the concurrency limits. Exceeding them may be an indication of a problem that requires investigation.

These rate limits apply to all new Okta organizations. For orgs created before 2018-05-17, the [previous rate limits](/docs/reference/legacy-rl/) still apply.

> **Note:** For information on possible interaction between Inline Hooks and concurrent rate limits, see [Inline hooks and concurrent rate limits](/docs/concepts/inline-hooks/#inline-hooks-and-concurrent-rate-limits).

### Okta-generated email message rate limits

Limits are applied on a per-recipient basis and vary by email type. The limit for some email types is no more than 30 emails per-recipient, per-minute, while other email types are configured with higher limits. These limits protect your org against denial-of-service attacks and help ensure that adequate resources are available for all customers.

### Okta home page endpoints and per-minute limits

The following endpoints are used by the Okta home page for authentication and user sign in and have org-wide rate limits:

| Okta Home Page Endpoints                                                | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity |
| ----------------------------------------------------------------------- | ---------------- | ---------------- | ------- | ---------- | ------------------ |
| `/app/{app}/{key}/sso/saml`                                             | 100              | 300              | 300*    | 600*       | 750                |
| `/app/office365/{key}/sso/wsfed/active`                                 | N/A              | N/A              | N/A     | 2000       | 1000               |
| `/app/office365/{key}/sso/wsfed/passive`                                | N/A              | N/A              | N/A     | 250        | 250                |
| `/app/template_saml_2_0/{key}/sso/saml`                                 | 100              | 300              | 300*    | 600*       | 2500               |
| `/login/do-login`                                                       | 100              | 300              | 300     | 600        | 200                |
| `/login/login.htm`                                                      | 100              | 300              | 300     | 600        | 850                |
| `/login/sso_iwa_auth`                                                   | 100              | 300              | 300     | 600        | 500                |
| `/api/plugin/{protocolVersion}/form-cred/{appUserIds}/{formSiteOption}` | 100              | 300              | 300*    | 600*       | 650                |
| `/api/plugin/{protocolVersion}/sites`                                   | 20               | 50               | 50      | 100        | 150                |
| `/bc/image/fileStoreRecord`                                             | 100              | 300              | 300*    | 600*       | 500                |
| `/bc/globalFileStoreRecord`                                             | 100              | 300              | 300*    | 600*       | 500                |

These rate limits apply to all new Okta organizations. For orgs created before 2018-05-17, the [previous rate limits](/docs/reference/legacy-rl/) still apply.

The limits for these endpoints can be increased by purchasing the [High-Capacity add-on](/docs/reference/legacy-rl/#high-capacity-rate-limits).

### Okta API endpoints and per-user limits

API endpoints that take username and password credentials, including the [Authentication API](/docs/reference/api/authn/) and the [OAuth 2.0 resource owner password flow](/docs/guides/implement-password/), have a per-username rate limit to prevent brute force attacks with the user's password:

| Action and Okta API Endpoint                                      | Per User Limits (All Orgs) |
| ----------------------------------------------------------------- | -------------------------: |
| **Authenticate the same user:**<br>`/api/v1/authn`                | 4 per second               |
| **Generate or refresh an OAuth 2.0 token:**<br>`/oauth2/v1/token` | 4 per second               |

### End-user rate limits

Okta limits the number of requests from the Admin Console and End-User Dashboard to 40 requests per user per 10 seconds per endpoint. This rate limit protects users from each other and from other API requests in the system.

If a user exceeds this limit, they receive an HTTP 429 error response without affecting other users in your org. A message is written to the System Log that indicates that the end-user rate limit was encountered.
