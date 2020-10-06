---
title: Management rate limits
excerpt: >-
  Understand management rate limits at Okta and learn how to design for efficient use of
  resources
---

# Management rate limits

This page provides the API rate limits for management activities, which is part of Okta [rate limits](/docs/reference/rate-limits).

> **Note:**
>
> * To learn more about rate limits, visit our [overview](/docs/reference/rate-limits) and [best practices](/docs/reference/rl-best-practices) pages.
> * In addition to the rate limit per API, Okta implements limits on concurrent requests, Okta-generated email messages, end user requests, and home page endpoints. These limits are described on the [Additional limits](/docs/reference/rl-additional-limits/) page.
> * You can expand Okta rate limits upon request. To learn how, see [Request exceptions](/docs/reference/rl-best-practices/#request-exceptions) and [DynamicScale rate limits](/docs/reference/rl-dynamic-scale/).
>

> We enforce limits at the individual API endpoint level **as requests per minute**.

| Action and Okta API Endpoint                                                                                                       | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity    |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------: | ----------------: | -------: | ----------: | ---------------------: |
| **Cumulative rate limit**                                                                                                         | **980**          | **2,400**        | **2,400**| **5,200** | **7,000**             |
| **Create or list applications:**<br>`/api/v1/apps` except `/api/v1/apps/{id}`                                                      | 20               | 25               | 25      | 100        | 100                   |
| **Get, update, or delete an application by ID:**<br>`/api/v1/apps/{id}` only                                                       | 100              | 300              | 300     | 600        | 500                   |
| **Create or list groups:**<br>`/api/v1/groups` except `/api/v1/groups/{id}`                                                        | 100              | 300              | 300     | 600        | 500                   |
| **Get, update, or delete a group by ID:**<br>`/api/v1/groups/{id}` only                                                            | 100              | 300              | 300     | 600        | 1,000                 |
| **Create or list users:**<br>Only `GET` or `POST` to `/api/v1/users`                                                               | 100              | 300              | 300     | 600        | 600                   |
| **Update or delete a user by ID:**<br>Only `POST`, `PUT` or `DELETE` to `/api/v1/users/{id}`                                       | 100              | 300              | 300     | 600        | 600                   |
| **Get System Log data:**<br>`/api/v1/logs`                                                                                         | 20               | 25               | 25      | 50         | 120                   |
| **Get System Log data:**<br>`/api/v1/events`                                                                                       | 20               | 25               | 25      | 50         | 100                   |
| **OAuth2 client configuration requests:**<br>`/oauth2/v1/clients`                                                                  | 25               | 50               | 50      | 100        | 100                   |
| **Most other API actions:**<br>`/api/v1`                                                                                           | 100              | 300              | 300     | 600        | 1,200                 |
| **Get a user by ID or sign in**<br>Only `GET` to `/api/v1/users/{idOrLogin}`                                                       | 100              | 300              | 300     | 1,000      | 2,000                 |
| `/api/v1/certificateAuthorities`                                                                                                   | 100              | 100              | 100     | 150        | 100                   |
| `/api/v1/devices`                                                                                                                  | 100              | 100              | 100     | 150        | 100                   |