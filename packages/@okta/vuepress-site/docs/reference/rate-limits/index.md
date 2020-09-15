---
title: Rate limits overview
excerpt: >-
  Understand rate limits at Okta and learn how to design for efficient use of
  resources
---

# Rate limits overview

To protect the service for all customers, Okta APIs are subject to rate limiting. These limits mitigate denial-of-service attacks and abusive actions such as rapidly updating configurations, aggressive polling and concurrency, or excessive API calls.

The Okta API rate limits are divided into three categories: end-user access, management, and other endpoints. Each category has a combined rate limit that varies by [service subscription](https://developer.okta.com/pricing/) and a documentation with individual limits per API endpoint:

**API rate limit categories and combined rate limits (requests per minute)**

To access the individual API limits, visit a category page by clicking the appropriate category link in the table.

| Category                                                          | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity    |
| ----------------------------------------------------------------- | ---------------- | ---------------- | ------- | ---------- | --------------------- |
| [End-user access](/docs/reference/rl-global-enduser/)             | ??,???           | ??,???           | ??,???  | ??,???     | 10,050                |
| [Management](/docs/reference/rl-global-mgmt/)                     | ?,???            | ?,???            | ?,???   | ?,???      | 4,600                 |
| [Other endpoints](/docs/reference/rl-global-other-endpoints/)     | 1,000            | 3,000            | 3,000   | 6,000      | 10,000                |

<!-- | Client-based endpoints  | 10,000           | 30,000           | 30,000  | 60,000     | 50,000            |-->

If an org-wide rate limit is exceeded, an HTTP 429 status code is returned. You can anticipate hitting the rate limit by checking [Okta's rate limiting headers](/docs/reference/rl-best-practices/#check-your-rate-limits-with-okta-s-rate-limit-headers). Additionally, if you have a One App or Enterprise organization, the Admin Console displays a banner, and you are sent an email notification when your org approaches its rate limit.

> **Notes:**
>
> * In addition to the rate limit per API, Okta implements limits on concurrent requests, Okta-generated email messages, end user requests, and home page endpoints. These limits are described on the [Additional limits](/docs/reference/additional-limits/) page.
> * [DynamicScale rate limits](/docs/reference/dynamic-scale-rl/) apply to a variety of endpoints across different APIs for customers that purchased this add-on.
> * Rate limits may be changed to protect customers. We provide advance warning of changes when possible.
> * You can expand the Okta rate limits upon request. To learn how, see [Rate increase requests](/docs/reference/additional-limits/#concurrent-rate-limits) and [DynamicScale rate limits](/docs/reference/dynamic-scale-rl/).
>

## Other applicable rate limit content

* [Concurrent rate limits](/docs/reference/additional-limits/#concurrent-rate-limits): To protect the service for all customers, Okta enforces concurrent rate limits, which is a limit on the number of simultaneous transactions. Concurrent rate limits are distinct from the org-wide, per-minute API rate limits, which measure the total number of transactions per minute. Transactions are typically very short-lived. Even very large bulk loads rarely use more than 10 simultaneous transactions at a time.

* [Okta-generated email message rate limits](/docs/reference/additional-limits/#okta-generated-email-message-rate-limits): These rate limits vary by email type. Okta enforces rate limits on the number of Okta-generated email messages that are sent to customers and customer users. For example, if the number of emails sent to a given user exceeds the per-minute limit for a given email type, subsequent emails of that type are dropped for that user until that minute elapses.

* [Okta home page endpoints and per-minute limits](/docs/reference/additional-limits/#okta-home-page-endpoints-and-per-minute-limits): These endpoints are used by the Okta home page for authentication and user sign in and have org-wide rate limits.

* [Okta API endpoints and per-user limits](/docs/reference/additional-limits/#okta-api-endpoints-and-per-user-limits): API endpoints that take username and password credentials, including the [Authentication API](/docs/reference/api/authn/) and the [OAuth 2.0 resource owner password flow](/docs/guides/implement-password/), have a per-username rate limit to prevent brute force attacks with the user's password.

* [End-user rate limits](/docs/reference/additional-limits/#end-user-rate-limits): Okta limits the number of requests from the Admin Console and End-User Dashboard to 40 requests per user per 10 seconds per endpoint. This rate limit protects users from each other and from other API requests in the system.

* [DynamicScale rate limits](/docs/reference/dynamic-scale-rl/): If your needs exceed Okta's default rate limits for the base product subscriptions (One App or Enterprise) that you've already purchased, the  DynamicScale add-on service grants you higher limits for a variety of endpoints across different APIs.

* [Legacy endpoints](/docs/reference/legacy-rl/): This content covers the rate limits for orgs that were created before 2018-05-17.
