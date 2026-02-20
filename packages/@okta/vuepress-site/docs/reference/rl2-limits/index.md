---
title: Additional Rate limits
category: rate limits
---

# Additional Rate limits

This page details the rate limits that apply to various buckets, primarily scoped to orgs unless otherwise specified.

## Authentication and management rate limits

Refer to the Rate Limit Buckets table, part of the [Rate Limit Dashboard](/docs/reference/rl2-monitor/#rate-limit-dashboard), for a view of the rate limits available for a given bucket.

## Authenticated and non-authenticated users

#### Authenticated users

Okta limits the number of requests:

* From the Admin Console and the End-User Dashboard, to 40 requests per user per 10 seconds per endpoint. This rate limit protects users from each other and from other API requests in the system.
* To the Identity Engine, to 20 requests per user per 5 seconds and 10 requests per state token per 5 seconds.

An HTTP 429 error response is returned to users that exceed this limit. No other users in your org are affected. A message appears in the System Log for the user that exceeded this limit.

#### Non-authenticated users

API Endpoints that take username and password credentials, including the [Authentication API](/docs/reference/api/authn/) and the [OAuth 2.0 Resource Owner Password flow](/docs/guides/implement-grant-type/ropassword/main/), have a per-username rate limit. These limits prevent brute force attacks with the user's password:

| Action and Okta API Endpoint                  | Per-user limits (all orgs) |
|-----------------------------------------------|----------------------------|
| Authenticate the same user:<br>`/api/v1/authn`  | 4 per second               |
| Generate or refresh an OAuth 2.0 token:<br>`/oauth2/v1/token` | 4 per second               |

Per-username rate limit violations appear in the System Log as a `user_rate_limited` failure message.

## Okta Aerial rate limits

Each Okta Aerial account has a rate limit of 10 concurrent requests. See [Introduction to the Okta Aerial API](https://developer.okta.com/docs/api/openapi/aerial/guides/overview/).

## Email, SMS, and call rate limits

Email limits are applied on a per-recipient basis and vary by email type. The limit for some email types is no more than 30 emails per recipient, per minute, while other email types are configured with higher limits. These limits protect your org against denial-of-service attacks and help ensure that adequate resources are available for all customers.
