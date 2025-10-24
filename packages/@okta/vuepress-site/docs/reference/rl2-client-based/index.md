---
title: Client-based rate limits
category: rate limits
---

# Client-based rate limits

Client-based rate limiting provides granular, targeted protection for the unauthenticated endpoints used during an application's access flow. It helps isolate noisy neighbors---such as a misconfigured app, a runaway script, or a bad actor---preventing them from consuming your entire org-wide rate limit and impacting other users and applications.

This framework applies to:

* OAuth 2.0 applications, using a combination of client ID, IP address, and device identifier to enforce a limit. This applies to the `/authorize` endpoint for both the Okta org authorization server and any custom authorization servers.

* Non-OAuth 2.0 applications (for example, those using the `/login/login.htm` endpoint in Classic Engine), which use the IP address and device identifier for limiting.

* Okta Identity Engine, which uses this framework for multiple API entry points that implement the Interaction Code grant type.

## Benefits of client-based rate limits

This feature is particularly helpful in a few key scenarios:

* Isolating rogue applications: If you have multiple OAuth 2.0 applications managed by different teams, it ensures that one malfunctioning app can't cause rate limit violations for all the others.

* Enforcing best practices: It encourages development teams to implement proper error handling and avoid issues like redirect loops.

* Protecting production environments: It provides a crucial layer of defense against synthetic tests or batch jobs that can make an excessive number of requests in a short period.

## How it works: scenarios

The best way to understand the impact is through examples. By default, each unique client receives a quota of 60 requests per minute and a maximum of five concurrent requests.

### Scenario 1: Users on different networks

Imagine Bob and Alice are working from home with distinct IP addresses. They both access the same company portal (`clientID`: `portal123`).

* Bob's Limit: Based on (IP1 + portal123 + DeviceID1)
* Alice's Limit: Based on (IP2 + portal123 + DeviceID2)

If the org-wide limit for the `/authorize` endpoint is 2,000 requests per minute and Bob runs a script that makes 2,000 requests, the following happens:

* Without client-based limits: Bob consumes the entire org-wide limit. Both he and Alice are blocked with HTTP 429 errors, and the application becomes inaccessible to everyone.

* With client-based limits enabled: After Bob exceeds his individual 60-request limit, only requests from his specific client combination are blocked. Alice can continue to access the application without any issues.

### Scenario 2: Users behind a corporate firewall (NAT)

Now imagine Alice, Bob, and Lisa are in the same office, sharing a single Network Address Translation (NAT) IP address. Because the device identifier is unique to each user's browser, Okta can still provide individual rate limit buckets.

* Alice: (NAT IP + portal123 + Device1 ID)
* Bob: (NAT IP + portal123 + Device2 ID)
* Lisa: (NAT IP + portal123 + Device3 ID)

This ensures that even when sharing an IP address, one user's activity won't impact the others.

>**Note:** The device identifier is derived from a cookie (`dt` cookie) that Okta sets in the browser. For non-browser clients where this cookie isn't present, requests from the same NAT IP and client ID will share a common quota where the device identifier is null (NAT IP + portal123 + null).

### Handling proxies

If requests are made from behind a proxy, it's important to configure those IPs as trusted proxies in Okta. This allows the rate-limiting framework to correctly identify the true client IP address from the request headers.

### Configuration and monitoring

The client-based rate limit framework can operate in one of three configuration modes:

| Mode                        | Description                                                                                                                                         |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Enforce and log per client  | (Recommended) This is the default setting. The rate limit is based on client-specific values, and violation information is logged as System Log events. |
| Log per client              | The rate limit is based on the org-wide values, but client-specific violation information is still logged. This allows you to analyze potential impact without actively blocking requests. |
| Do nothing                  | (Not Recommended) Rate limits aren't enforced at the client-specific level; only org-wide limits apply. No client-specific events are logged.         |

This setting can be changed by going to the Admin Console:

1. Go to **Reports** > **Rate Limits**.
1. Select the **Settings** tab.
1. Under the **Client-based rate limiting** section, choose the desired mode.

### Monitoring and taking action

When enforcement is active, you monitor the System Log for the following events:

* `system.client.rate_limit.violation`

* `system.client.concurrency_rate_limit.violation`

If you see sporadic events from a few users, it may indicate scripted or automated activity that you can choose to investigate. If you see widespread events from many users, it could point to a broader application issue that needs to be addressed.

#### Checking limits with API headers

When client-based rate limiting is in enforce mode, the API response headers reflect the client-specific limit, not the org-wide limit. However, the org-wide rate limit still applies. When the cumulative total request or maximum concurrent requests from every unique client exceeds the org-wide rate limits, your Okta org experiences org-wide rate limit errors.

* `X-Rate-Limit-Limit`: The 60 requests/minute ceiling for the specific client.

* `X-Rate-Limit-Remaining`: The number of requests left for that specific client.

* `X-Rate-Limit-Reset`: The UTC epoch time when the client's limit will reset.

