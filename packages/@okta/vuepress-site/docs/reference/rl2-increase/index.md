---
title: Increasing rate limits
category: rate limits
---

# Increase your rate limits

## For Okta Customer Identity: Purchase DynamicScale

If you’re building high-volume, user-facing apps, DynamicScale is the ideal solution. It's designed to handle the massive scale of consumer authentication and authorization traffic:

* Who it's for: Customer Identity customers only.
* How it works: DynamicScale is a purchased add-on that applies a multiplier-from 5x to 1000 to the default rate limits for an individual tenant.
* Applicable endpoints: This service is targeted specifically at authentication and authorization endpoints to ensure a seamless experience for your end users. DynamicScale doesn’t increase the base rate limits for management endpoints. For the complete list of eligible endpoints, visit the Rate Limit Buckets table on the [Rate limit dashboard](/docs/reference/rl2-monitor/#dashboard-overview-tab) and filter by **Eligible or applied**.
* How to get it: DynamicScale can be purchased for a production or preview org. Contact your Okta sales representative for more details.

## For Okta Workforce Identity: Workforce license multiplier

Okta Workforce Identity customers get automatic rate limit increases for authentication and authorization endpoints based on the number of universal directories or SSO licenses purchased. This ensures that as your workforce grows, Okta scales with you:

* Who it's for: Workforce customers only.
* How it works: The multiplier is applied automatically to your primary production org.

    | Licenses purchased    | Rate limit multiplier |
    |----------------------|----------------------|
    | < 10,000             | 1x                   |
    | 10,000–100,000     | 5x                   |
    | > 100,000            | 10x                  |

* Applicable endpoints: This multiplier applies to common authentication, authorization, and single-entity read endpoints (like getting a single user or app). For the complete list of eligible endpoints, visit the Rate Limit Buckets table on the [Rate limit dashboard](/docs/reference/rl2-monitor/#dashboard-overview-tab) and filter by **Eligible or applied**.
* Need more? If this automatic multiplier is still insufficient for your needs, you can use the following manual request process.

## For all customers: Request a manual rate limit increase

If you expect a high-traffic event or your org’s baseline traffic has grown, you can request a rate limit increase:

* Temporary increases are available for events like app launches, large user migrations, or seasonal peaks.
* Permanent increases can be requested if your baseline traffic has permanently grown.

Manual rate limit increases details:

* How it works: You open a support case detailing the endpoints, the desired increase, the business justification, and the time period.
* Important consideration: Our support and engineering teams conduct a thorough review to ensure the stability of the platform for all customers. Submit your request at least 15 business days before the increase is needed. Requests for permanent increases or those greater than 5x the default limit may require a longer review period. Okta reserves the right to deny the request.
* To start this process, follow the guide on [How to Request a Temporary Rate Limit Increase](https://support.okta.com/help/s/article/how-to-request-a-rate-limit-increase?language=en_US) and open a case with Okta Support.
