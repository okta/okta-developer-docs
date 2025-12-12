---
title: Client-based rate limits
category: rate limits
---

# Client-based rate limits

Client-based rate limiting provides granular, targeted protection for browser-based unauthenticated endpoints used during an app's access flow. It helps isolate noisy neighbors&mdash;such as a misconfigured app, a runaway script, or a bad actor&mdash;preventing them from consuming your entire org-wide rate limit and impacting other users and apps.

This framework applies to:

* OAuth 2.0 apps, using a combination of client ID, IP address, and device identifier to enforce a limit. This applies to the `/authorize` endpoint for both the Okta org authorization server and any custom authorization servers.

* Non-OAuth 2.0 apps (for example, those using the `/login/login.htm` endpoint in Classic Engine), which use the IP address and device identifier for limiting.

* Okta Identity Engine, which uses this framework for multiple API entry points that implement the Interaction Code grant type.

>**Note:** The endpoints to which this feature applies all have browser-based interaction patterns.

## Benefits of client-based rate limits

This feature is helpful in a few key scenarios:

* Isolating runaway traffic: If you have multiple OAuth 2.0 apps managed by different teams, it ensures that one malfunctioning app can't cause rate limit violations for all the others.

* Enforcing best practices: It encourages development teams to implement proper error handling and avoid issues like redirect loops.

* Protecting production environments: It provides a crucial layer of defense against synthetic tests or batch jobs that can make an excessive number of requests in a short period.

## How it works: scenarios

The best way to understand the impact is through examples. By default, each unique client receives a quota of 60 requests per minute and a maximum of five concurrent requests.

### Scenario 1: Users on different networks

<div class="half">

![This image displays scenario 1 of users on different networks accessing the same portal](/img/rate-limits/scenario1-diff-networks.png)

</div>

Imagine Bob and Alice are working from home with distinct IP addresses. They both access the same company portal (`clientID`: `portal123`).

* Bob's limit: Based on (IP1 + portal123 + Device1 ID)
* Alice's limit: Based on (IP2 + portal123 + Device2 ID)

If the org-wide limit for the `/authorize` endpoint is 2,000 requests per minute and Bob runs a script that makes 2,000 requests, the following happens:

* Without client-based limits: Bob consumes the entire org-wide limit. Both he and Alice are blocked with HTTP 429 errors, and all clients seeking to access the app are disrupted.

* With client-based limits enabled: After Bob exceeds his individual 60-request limit, only requests from his specific client combination are blocked. Alice and any other clients can continue to access the app without any issues.

### Scenario 2: Users behind a corporate firewall (NAT)

<div class="half">

![This image displays scenario 2 of users on different networks accessing the same portal through a corporate fire wall](/img/rate-limits/scenario2-firewall.png)

</div>

Now imagine Alice, Bob, and Lisa are in the same office, sharing a single Network Address Translation (NAT) IP address. Because the device identifier is unique to each user's browser, Okta can still provide individual rate limit buckets.

* Alice: (NAT IP + portal123 + Device1 ID)
* Bob: (NAT IP + portal123 + Device2 ID)
* Lisa: (NAT IP + portal123 + Device3 ID)

This ensures that even when sharing an IP address, one user's activity won't impact the others.

>**Note:** The device identifier is derived from a cookie (`dt` cookie) that Okta sets in the browser. Client rate limiting only applies to APIs where the client is expected to be using a browser. If any non-browser client calls the feature client rate limits will still apply but the device identifier portion of the client’s profile will be blank.

### Handle proxies

If requests are made from behind a proxy, it's important to configure those IPs as [trusted proxies](https://support.okta.com/help/s/article/okta-security-knowledge-trusted-proxy-and-network-zones?language=en_US) in Okta. This allows the rate-limiting framework to correctly identify the true client IP address from the request headers.

### Configuration and monitoring

The client-based rate limit framework can operate in one of three configuration modes:

| Mode                        | Description                                                                                                                                         |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Enforce and log per client  | (Recommended) This is the default setting. The rate limit is based on client-specific values, and violation information is logged as System Log events. |
| Log per client              | The rate limit is based on the org-wide values, but client-specific violation information is still logged. This allows you to analyze the potential impact without actively blocking requests. |
| Do nothing                  | (Not recommended) Rate limits aren't enforced at the client-specific level; only org-wide limits apply. No client-specific events are logged.         |

This setting can be changed by going to the Admin Console:

1. Go to **Reports** > **Rate Limits**.
1. Select the **Settings** tab.
1. Under the **Client-based rate limiting** section, choose the desired mode.

### Monitor and take action

When enforcement is active, you monitor the System Log for the following events:

* `system.client.rate_limit.violation`

* `system.client.concurrency_rate_limit.violation`

If you see sporadic events from a few users, it may indicate scripted or automated activity that you can choose to investigate. If you see widespread events from many users, it could point to a broader app issue that needs to be addressed.

#### Check limits with API headers

When client-based rate limiting is in enforce mode, the API response headers reflect the client-specific limit, not the org-scoped bucket rate limit. However, the org-scoped bucket rate limit still applies. When the cumulative total request or maximum concurrent requests from every unique client exceeds the org-scoped bucket rate limit, your Okta org experiences org-wide rate limit violations.

* `X-Rate-Limit-Limit`: The 60 requests/minute ceiling for the specific client.

* `X-Rate-Limit-Remaining`: The amount of requests left for that specific client.

* `X-Rate-Limit-Reset`: The UTC epoch time when the client's limit resets.
