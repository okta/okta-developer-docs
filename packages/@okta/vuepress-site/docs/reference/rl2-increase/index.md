---
title: Increasing rate limits
category: rate limits
---

# Increasing rate limits

## For Okta Customer Identity: Purchase DynamicScale

If you are building high-volume, user-facing applications, DynamicScale is the ideal solution. It's designed to handle the massive scale of consumer authentication and authorization traffic.

* Who it's for: Okta Customer Identity (OCI) customers only.
* How it works: DynamicScale is a purchased add&mdash;on that applies a multiplier-from 5x to 1000x&mdash;to the default rate limits for specific organization(s).
* Applicable Endpoints: This service is targeted specifically at authentication and authorization endpoints to ensure a seamless experience for your end-users. DynamicScale does not increase the base rate limits for Management endpoints. For the complete list of eligible endpoints, visit Rate Limits.
* How to get it: DynamicScale can be purchased for a Production or Preview organization. Contact your Okta sales representative for more details.

## For Okta Workforce Identity: Workforce license multiplier

For our Workforce Identity customers, Okta provides an automatic rate limit increase for authentication and authorization endpoints based on the number of Universal Directory or Single Sign-On licenses your organization has purchased. This ensures that as your workforce grows, Okta scales with you.

* Who it's for: Okta Workforce Identity (OWI) customers only.
* How it works: The multiplier is applied automatically to your production organization based on your total count of Universal Directory or Single Sign-On licenses.

    | Licenses Purchased    | Rate Limit Multiplier |
    |----------------------|----------------------|
    | < 10,000             | 1x                   |
    | 10,000 - 100,000     | 5x                   |
    | > 100,000            | 10x                  |

* Applicable Endpoints: This multiplier applies to common authentication, authorization, and single-entity read endpoints (like getting a single user or app). For the complete list of eligible endpoints, visit Rate Limits.
* Need more? If this automatic multiplier is still insufficient for your needs, you can use the manual request process outlined above.

## For all customers: Request a manual rate limit increase

If you have a planned high-traffic event like an application launch, a large user migration, or a seasonal peak, you can request a temporary rate limit increase. If your organization's baseline traffic has permanently grown, you can also request a permanent increase.

* Who it's for: Any Okta customer with a justified need.
* How it works: You open a support case detailing the endpoints, the desired increase, the business justification, and the time period.
* Important Consideration: Our support and engineering teams conduct a thorough review to ensure the stability of the platform for all customers. Please submit your request at least 15 business days before the increase is needed. Requests for permanent increases or those greater than 5x the default limit may require a longer review period. Okta reserves the right to deny the request.

    To start this process, please follow the guide on [How to Request a Temporary Rate Limit Increase](https://support.okta.com/help/s/article/how-to-request-a-rate-limit-increase?language=en_US) and open a case with Okta Support.
