---
title: Rate limits
excerpt: >-
  Understand rate limits at Okta and learn how to design for efficient use of resources
---

# Rate limits overview

To protect the service for all customers, Okta APIs are subject to rate limits. These limits mitigate denial-of-service attacks and abusive actions such as rapidly updating configurations, aggressive polling and concurrency, or excessive API calls.

The Okta API rate limits are divided into the following categories: authentication/end user and management. Each category has APIs with rate limits that are enforced individually. The rate limits vary by [service subscription](https://developer.okta.com/pricing/).

If any org-wide rate limit is exceeded, an HTTP 429 status code is returned. You can anticipate hitting the rate limit by checking the [Okta rate limiting headers](/docs/reference/rl-best-practices/#check-your-rate-limits-with-okta-s-rate-limit-headers). Also, you’re sent an email notification when your org approaches its rate limit.

> **Notes:**
>
> * In addition to the rate limit per API, Okta implements limits on concurrent requests, Okta-generated email messages, end user requests, and home page endpoints. These limits are described on the [Additional limits](/docs/reference/rl-additional-limits/) page.
> * [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/) apply to various endpoints across different APIs for customers that purchased this add-on. (The DynamicScale add-on service is only available to Customer Identity Solutions (CIS) customers.)
> * Rate limits may be changed to protect customers. Okta provides warning of changes when possible.
> * The type of cell your Okta org resides in (Preview or Production) doesn't affect the rate limit values. If you purchased dynamic scale or other rate limit increases for your org, these updates only apply to production orgs unless otherwise specified.
> * You can expand the Okta rate limits upon request. To learn how, see [Request exceptions](/docs/reference/rl-best-practices/#request-rate-limit-exceptions) and [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/).
> * Review the [Rate limit best practices](/docs/reference/rl-best-practices/) for further information on monitoring and managing your rate limits.
>

## API rate limits by token

Okta API tokens are, by default, configured to have 50% of an API endpoint's rate limit when created through the Admin Console. This configuration avoids one API token exceeding the endpoint's rate limit violation in an org with multiple API tokens.

To adjust the default API token capacity value from 50%, you can edit the percentage value in the Admin Console. See [Set token rate limits](https://help.okta.com/okta_help.htm?type=oie&id=ext_API). You can also use the [Principal Rate Limits API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/PrincipalRateLimit/#tag/PrincipalRateLimit). Reducing the capacity percentage prevents one API token from consuming the entire endpoint rate, assists with investigating rate-limit violations, and prevents future violations.

## API rate limits by OAuth 2.0 application

[xyz](#api-rate-limits-by-oauth-20-application) [xyzz](#api-rate-limits-by-token)

Okta OAuth 2.0 apps are, by default, configured to have 50% of the API endpoint's rate limit when created through the Admin Console. This configuration avoids one app exceeding the endpoint's rate limit violation.

To adjust the default app capacity value from 50%, you can edit the percentage value in the Admin Console. See [Set the app rate limits](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_App_Integration_Wizard-oidc). You can also use the [Principal Rate Limits API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/PrincipalRateLimit/#tag/PrincipalRateLimit). Reducing the capacity percentage prevents one app from consuming the entire endpoint rate, assists with investigating rate-limit violations, and prevents future violations.

## Rate limit monitoring widget

The Admin Console tracks any rate-limit warnings or violations directly in a rate limit monitoring widget. By default, only the last hour of warnings or violations appear. You can also check for events within the last 24 hours or the last seven days from the dropdown menu. Selecting **View** at the top of the widget takes you to the [Rate Limits dashboard](/docs/reference/rl-dashboard/) for further investigation. If individual rate-limit violations appear in the widget, you can access affected API usage in the rate limits Dashboard by clicking the API link in the widget.

<div class="half">

![The image displays the rate limit monitoring widget on the Admin Dashboard to show rate limit warnings, bursts, or violations.](/img/rate-limits/rl-monitoring-widget.png)

</div>

## Burst rate limits

Okta provides rate limits for orgs based on the traffic that they expect to have. If your org experiences higher traffic than what is expected, this unplanned use may potentially have an impact on end users. To help minimize impact, Okta doesn't suspend use that is above the rate limit (specifically for authentication and authorization flows). If there’s sustained use above the purchased rate limit, Okta requires that you purchase an applicable offering that is in line with your use. With burst rate limits, Okta provides peace of mind by ensuring that an unplanned spike doesn't detrimentally affect the end user's experience.

In a scenario where orgs exceed a default rate limit, they receive a System Log warning event, a burst event, and then a violation event. For example, an org has a rate limit of 600 requests per minute on the `/api/v1/authn` endpoint. That org would receive a warning at 360 requests per minute (60% of 600). That org would get a burst notification when the endpoint hits 600 requests per minute. And then the violation event when it hits 3000 requests all in the same minute.

Also, burst rate limits typically apply on top of any rate limit increase that an org may have, such as [DynamicScale](/docs/reference/rl-dynamic-scale/). For example, the default limit on `/api/v1/authn` is 600 requests per minute. If an org is expecting traffic to require 6000 requests per minute, the org would purchase DynamicScale 10x. The burst rate limit in this scenario provides 5x coverage on top of the 6000 and ensure peace of mind for any unplanned spike in use.

On the rate limit dashboard, the trendline can now exceed 100% of the org's default rate limit (up to 5x the default with the buffer zone) as shown in the following example.

<div class="three-quarter">

![This image displays the rate limits dashboard to show the trendline with burst rate limits.](/img/rate-limits/rl_usage_over_time.png)

</div>

When a burst rate limit event occurs, the `system.org.rate_limit.burst` System Log event is triggered and an email notification is generated.

<div class="half">

![Displays the email to notify the admin of a burst rate limit event.](/img/rate-limits/BRLemail.png)

</div>

The email is sent to the same admin who received the `system.org.warning` and `system.org.violation` event emails.

## Other applicable rate limit content

* [Rate limit dashboard](/docs/reference/rl-dashboard/): The rate limit dashboard helps you understand the rate limit and current use of an API. The dashboard provides you with the ability to track the API's use and to notify you with alerts when the API is about to hit or has hit the rate limit. You can also use the multiple views of data use on the dashboard to investigate high usage or rate limit violations.

* [Rate limit best practices](/docs/reference/rl-best-practices/) for further information on best practices to monitor and manage your rate limits.

* [Concurrent rate limits](/docs/reference/rl-additional-limits/#concurrent-rate-limits): To protect the service for all customers, Okta enforces concurrent rate limits, which is a limit on the number of simultaneous transactions. Concurrent rate limits are distinct from the org-wide, per-minute API rate limits, which measure the total number of transactions per minute. Transactions are typically short-lived. Even large bulk loads rarely use more than 10 simultaneous transactions at a time.

* [Client-based rate limits](/docs/reference/rl-clientbased/): To provide granular isolation, client-based rate limiting uses a combination of the client ID/IP address/device identifier for requests made to the OAuth 2.0 `/authorize` endpoint or the IP address/device identifier for requests made to the `/login/login.htm` endpoint. This framework isolates OAuth 2.0 clients that are generating unexpected traffic. It ensures that valid users and apps don't run into rate limit violations.

* [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/): If your needs exceed the default rate limits for the base product subscriptions (One App or Enterprise), the DynamicScale add-on service grants you higher limits for various endpoints across different APIs.

* [End user rate limits](/docs/reference/rl-additional-limits/#end-user-rate-limits): Okta limits the number of requests from the Admin Console and End-User Dashboard to 40 requests per user per 10 seconds per endpoint. This rate limit protects users from each other and from other API requests in the system.

* [Home page endpoints and per-minute limits](/docs/reference/rl-additional-limits/#okta-home-page-endpoints-and-per-minute-limits): These endpoints are used by the Okta home page for authentication and user sign-in and have org-wide rate limits.

* [Okta API endpoints and per-user limits](/docs/reference/rl-additional-limits/#okta-api-endpoints-and-per-user-limits): API endpoints that take username and password credentials, including the [Authentication API](/docs/reference/api/authn/) and the [OAuth 2.0 Resource Owner Password flow](/docs/guides/implement-grant-type/ropassword/main/), have a per-username rate limit to prevent brute force attacks with the user's password. [SMS and Call factor endpoints](/docs/reference/rl-additional-limits/#sms-and-call-rate-limits) also have a per-username rate limit.

* [Okta-generated email rate limits](/docs/reference/rl-additional-limits/#okta-generated-email-rate-limits): These rate limits vary by email type. Okta enforces rate limits on the number of Okta-generated email messages that are sent to customers and customer users. For example, if the number of emails sent to a given user exceeds the per-minute limit for a given email type, subsequent emails of that type are dropped for that user until that minute elapses.
