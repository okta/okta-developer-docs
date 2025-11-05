---
title: Rate limits
excerpt: >-
  Understand rate limits at Okta and learn how to design for efficient use of resources
---

# Rate limits overview

Rate limits are essential for maintaining both service continuity and effective security control. By acting as guardrails, rate limiting ensures systems remain stable and protected against sudden traffic spikes or malicious attacks.

Fundamentally, rate limits define how many requests can be made to an API endpoint within a specific time window. They help protect the reliability and performance of the platform by preventing excessive traffic that could degrade service or introduce security risks, such as Distributed Denial of Service (DDoS) attacks. Rate limits also promote fairness by ensuring all users have equitable access to the service.

Okta implements rate limits using buckets. A rate limiting bucket is a collection of one or more API endpoints that share a defined quota of a specific number of calls per unit of time. This quota is consumed by a set of clients associated with the bucket---this association is known as the scope of the bucket. The most general scope for a bucket is the entire organization. This bucket is shared by every client in the organization that uses the associated APIs. Additional more specific buckets can be nested beneath a broader bucket and may be applicable to a subset of APIs for a subset of clients.

For example, there may be a bucket for `/api/v1/authorize` with a quota of 1200 requests per minute for the entire organization. Nested beneath it, there could be a bucket for `/api/v1/authorize` with a quota of 600 requests per minute assigned to a specific client application `APP_123`. When `APP_123` calls `/api/v1/authorize`, the remaining quota status will be 1,199 for that minute for the organization, and 599 remaining for `APP_123`.

<div >

![This image displays the rate limit by bucket for an organization.](/img/rate-limits/rate-limit-by-bucket.png)

</div>

There are two additional types of scopes that can apply to a bucket:

* Authenticated users: applies to users taking action on the Admin or End-User dashboard

* Non-authenticated users: applies to endpoints that take username and password

Buckets scoped to authenticated users are independent and not nested under any other bucket. That is, requests made by authenticated users to APIs covered by these buckets don't count under any other bucket. For example, there exists a bucket with org-wide scope for `/api/v1/users/*` with a quota of 1000 requests per minute and a separate bucket for `/api/v1/users/m`e scoped to authenticated users with a quota of 40 requests per 10 seconds. A request to `/api/v1/users/me` by an authenticated user would decrement the authenticated user bucket to 39 remaining calls, while leaving the `/api/v1/users/* bucket untouched`.

[Placeholder for a diagram or image here]

A bucket’s quota can vary based on several factors, including---but not limited to---the type of service subscription (For example, OWI versus OCI), the HTTP method used (for example, GET versus POST), the number of licenses purchased, and any applicable add-ons, such as DynamicScale. If the quota is exceeded within the defined time window, additional requests are rejected with an HTTP 429 Too Many Requests response until the quota resets. Okta notifies all Super Administrators through e-mail and other means when an org-wide rate limit is nearing its threshold and again when it has been exceeded.

You can monitor rate limit usage through the Rate Limit Dashboard, System Log, or by inspecting the rate limiting headers included in API responses.

## How rate limiting works

The logic behind the Okta implementation of rate limits can be summarized in the following steps:

1. Okta identifies the resource that the request is attempting to access
1. Okta determines the identity and appropriate scope of the request. Is it a user, application, or token making the request?
1. Determines what features are associated with the request (for example, does the requestor have DynamicScale or are they part of an Integrator free plan org?)
1. Matches the request against the configured rate limit bucket(s)
1. Updates the counters and notifies

[Place holder for an image, visual, or diagram]

### Matching requests

When a request is made, Okta’s algorithms attempt to match the HTTP method (GET, POST, and so on) request with a configured rate limit bucket. There are two commonly used matches:

* Exact match: the endpoint requested matches exactly to the configured rate limit bucket

* Longest match: the endpoint requested matches the prefix URL of multiple configured rate limit buckets. In this case, the longest match is used.

For example:

* `/oauth2/{authorizationServerId}/v1` for longest match type for all HTTP operations

* `/oauth2/{authorizationServerID}/v1/authorize` for exact match type for all HTTP operations

If a request is made, and it matches the second bucket, both buckets technically match the path but because there is an exact match for the second bucket, and it is also the longer match, this request counts against the second bucket.

After a request has been matched, the counters for the impacted buckets are updated. If the counter is nearing the quota for that bucket, a System Log event is generated and an e-mail notification is sent to Super Admins of that organization. Okta allows you to configure this warning threshold in **Admin Dashboard** > **Reports** > **Rate Limits** > **Settings** section. If the counter exceeds the quota for that bucket, then a violation event is written to the System Log and an e-mail notification is also sent. Additional requests are rejected with an HTTP 429 Too Many Requests response until the counter resets.

>**Note:** Okta only sends a warning notification once per day and per hour for violation events.

## Token and OAuth application rate limits

To protect your organization from a single rogue script or misbehaving integration, Okta provides a mechanism to set a specific rate limit capacity for individual API tokens and OAuth 2.0 applications. This ensures that one client can't consume the entire org-wide rate limit for a given endpoint, which prevents it from causing a widespread outage for your other critical integrations.

By default, every API token and OAuth 2.0 application you create is configured to use 50% of an API endpoint's total rate limit capacity. This can be changed in the Admin Console settings for the respective API token and OAuth2.0 application or through the [principal rate limits](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/PrincipalRateLimit/#tag/PrincipalRateLimit) API.

This means if your org-wide limit for the `/api/v1/logs` endpoint is 120 requests per minute, a single API token can only make 60 requests per minute to that endpoint before being rate-limited. This default behavior acts as a crucial safeguard in environments with multiple integrations.

### Understanding capacity allocation

The sum of the capacity percentages for all your tokens and applications does not need to equal 100%. This provides flexibility in how you manage your total rate limit pool.

* If the sum is over 100%: This creates a first-come, first-serve model for the shared portion of the rate limit. For example, if two tokens each have a 75% capacity for an endpoint with a 100 request per minute limit, the first token to make 75 requests succeeds. However, the second token will then only have access to the remaining 25 requests from the org-wide pool for that minute, even though its individual capacity is 75.

* If the sum is under 100%: This effectively creates a reserved buffer. For example, if two tokens each have a 40% capacity, the remaining 20% of the org-wide limit is held in reserve and can't be consumed by these specific clients. This can be a useful strategy for ensuring there is always capacity for unassigned tokens or unanticipated traffic.

### Monitoring and notifications

It's important to understand that alerts (email and dashboard notifications) are triggered based on the consumption of the overall quota assigned to an org-scoped bucket, not the allocated capacity of an individual API token or application.

These violation events are, however, recorded in the Okta System Log. You should monitor the System Log for events related to rate limit violations to identify if a specific token or application is frequently hitting its configured capacity.
