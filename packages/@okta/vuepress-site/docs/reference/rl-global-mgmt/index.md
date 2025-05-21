---
title: Management rate limits
excerpt: >-
  Understand management rate limits at Okta and learn how to design for efficient use of
  resources
---

# Management rate limits

This page provides the API rate limits for management activities, which is part of the Okta [rate limits](/docs/reference/rate-limits).

> **Note:**
>
> * To learn more about rate limits, visit our [overview](/docs/reference/rate-limits) and [best practices](/docs/reference/rl-best-practices) pages.
> * [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/) apply to various endpoints across different APIs for customers who purchased this add-on. (The DynamicScale add-on service is only available to Customer Identity Solutions (CIS) customers.)
> * In addition to the rate limit per API, Okta implements limits on concurrent requests, Okta-generated email messages, end user requests, and home page endpoints. These limits are described on the [Additional limits](/docs/reference/rl-additional-limits/) page.
> * You can expand Okta rate limits upon request. To learn how, see [Request exceptions](/docs/reference/rl-best-practices/#request-rate-limit-exceptions) and [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/).
>

See the following list of per-minute limits. If an endpoint isn't in this list, you can review it using the Admin Console, in the rate limit dashboard's APIs table. See [APIs table](/docs/reference/rl-dashboard/#apis-table).

| Action and Okta API endpoint                                                                                                       | Integrator Free Plan  | One App | Enterprise | Workforce identity    |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------:  | -------: | ----------: | ---------------------: |
| **Create, list, or other app actions:**<br> Calls to the `/api/v1/apps` endpoint and all other endpoints of the form `/api/v1/apps/*` including `/api/v1/apps/{id}/*`                                                     | 20                | 100     | 100        | 100                   |
| **Get, update, or delete an app by ID:**<br> Explicit calls to the app instance: `/api/v1/apps/{id}`                                                    | 100                | 600     | 600        | 500                   |
| **Create or list groups:**<br>`/api/v1/groups` except `/api/v1/groups/{id}`                                                       | 100              | 600     | 600        | 500                   |
| **Get, update, or delete a group by ID:**<br>`/api/v1/groups/{id}` only                                                           | 100               | 600     | 600        | 1,000                 |
| **Create or list users:**<br>Only `GET` or `POST` to `/api/v1/users`                                                               | 100               | 600     | 600        | 600                   |
| **Update or delete a user by ID:**<br>Only `POST`, `PUT`, or `DELETE` to `/api/v1/users/{id}`                                      | 100              | 600     | 600        | 600                   |
| **Get System Log data:**<br>`/api/v1/logs`                                                                                         | 20                | 50      | 50         | 120                   |
| **Get System Log data:**<br>`/api/v1/events`                                                                                       | 20                | 50      | 50         | 100                   |
| **OAuth2 client configuration requests:**<br>`/oauth2/v1/clients`                                                                  | 25                | 100     | 100        | 100                   |
| **Most other API actions:**<br>`/api/v1`                                                                                           | 100              | 600     | 600        | 1,200                 |
| **Create an email address bounces remove list:**<br>`/api/v1/org/email/bounces/remove-list`                                                                  | 10                | 30      | 60         | 60                    |
| **Get a user by ID or sign in**<br>Only `GET` to `/api/v1/users/{idOrLogin}`                                                      | 100               | 1,000   | 1,000      | 2,000                 |
| `/api/v1/certificateAuthorities`                                                                                                   | 100               | 150     | 150        | 100                   |
| `/api/v1/devices`                                                                                                                  | 100               | 150     | 150        | 100                   |
