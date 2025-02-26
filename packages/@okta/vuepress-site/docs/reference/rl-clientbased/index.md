---
title: Client-based rate limits reference
excerpt: >-
  Understand what client-based rate limits at Okta and learn how to design for efficient use of resources
---

# Client-based rate limits

 Client-based rate limiting applies to unauthenticated endpoints within Okta that are used during the access process for client applications. This applies to two types of client access:

* A client accessing an OAuth 2.0 application, which uses a combination of client ID, IP address, and device identifier for rate-limiting

* A client accessing a non-OAuth 2.0 application, which uses the IP address and device identifier for rate-limiting. This is the case for an Okta Classic Engine org `/login/login.htm` endpoint.

The client access process can include requests to multiple API endpoints that differ based on your type of org: Okta Identity Engine or Classic Engine. The Identity Engine endpoints include [Identity Engine App intent links](/docs/concepts/oie-intro/#app-intent-links).

The Classic Engine and the Identity Engine both include client-based rate-limiting for the OAuth 2.0 API endpoint `/authorize`. This endpoint provides granular isolation for requests made to the OAuth 2.0 `/authorize` endpoint, and this framework isolates rogue OAuth 2.0 clients and bad actors, ensuring that valid users and applications don't run into rate limit violations.

The Identity Engine includes client-based rate limiting for multiple API entry points that implement the [Interaction Code grant type](/docs/concepts/interaction-code/), which performs a series of interactions and API calls between the user and authorization server.

The Classic Engine also includes client-based rate limiting for the `/login/login.htm` endpoint, and provides granular, targeted rate limits to a user, app, script, or server.

The client-based rate limits for the OAuth 2.0 `/authorize` endpoint apply to both the Okta org authorization server and any custom authorization server. All custom authorization servers on an org share the [rate limit](/docs/reference/rate-limits/) bucket. The org authorization server has a separate rate limit.

Each valid request made by a user to this endpoint is counted as one request against the respective [authorization server](/docs/concepts/auth-servers/) rate limit bucket, for example, `/oauth2/{authorizationServerId}/v1` (custom authorization server) or `/oauth2/v1` (Okta org authorization server). The per-minute rate limits on these endpoints apply across an Okta tenant.

For example, example.com has 10 OAuth 2.0 applications running in a production environment. Bob's team is launching a new marketing portal that is a single-page OAuth 2.0 application. Unaware of the rate limits on the OAuth 2.0 `/authorize` endpoint, Bob's team begins running some batch testing scripts against the newly created application that makes hundreds of OAuth 2.0 `/authorize` requests in a single minute. Without the client-based rate limit framework, the new marketing portal application could potentially consume all the per-minute request limits assigned to example.okta.com and cause rate limit violations for the rest of the users that access the other OAuth 2.0 applications.

A client-based rate limit can be helpful in the following scenarios:

* (Applies only to the OAuth 2.0 `/authorize` endpoint) You have several OAuth 2.0 applications split across multiple teams. Ensure that one OAuth 2.0 application doesn't consume all the assigned per-minute request limits.
* (Applies only to the OAuth 2.0 `/authorize` endpoint) You want to isolate any rogue OAuth 2.0 applications from other valid OAuth 2.0 applications.
* You want to ensure that every application team adheres to best-coding practices, such as proper error handling to prevent redirect loops.
* You want protection against random synthetic tests or batch jobs in production that make numerous requests every minute.

### How it works

The best way to describe how client-based rate limiting works is to provide some example use cases.

#### Client-based isolation for a unique IP address

##### Example of using the OAuth 2.0 /authorize request

Bob and Alice are working from home and have distinct IP addresses. Both Bob and Alice try to sign in to their company's portal application (clientID: portal123) at the same time. When they make the authorize request to `https://company.okta.com/oauth2/v1/default/authorize?clientId=portal123`, the client-based rate limit framework creates a unique per minute request quota for both Bob and Alice using their IP address and the OAuth 2.0 client ID that they're trying to access.

* Bob: (IP1 + portal123) Gets a quota of 60 total requests per minute and a maximum of five concurrent requests
* Alice: (IP2 + portal123) Gets a quota of 60 total requests per minute and a maximum of five concurrent requests

Let's assume the org-wide quota for the OAuth 2.0 `/authorize` endpoint is a total of 2,000 requests per minute on custom authorization servers. Bob decides to run a batch job that triggers about 2,000 OAuth 2.0 `/authorize` requests per minute.

Without the client-based rate limit framework, Bob consumes the total allowed requests per minute (2,000 requests per minute). This results in HTTP 429 errors for both Bob and Alice, which makes the application inaccessible for everyone.

With the client-based rate limit framework enabled, after Bob exceeds his individual limit of 60 requests per minute, HTTP 429 errors are sent. Requests that originate from Bob's IP address, and the specific device from which the requests are made, start receiving the errors. Alice continues to access the application without any issues.

<div class="three-quarter border">

![Client-based isolation for a unique IP address](/img/rate-limits/clientbasedRL1.png)

</div>

##### Example use of the /login/login.htm request

When Bob and Alice try to go to their application and land on the sign-in page, a request is made to the `/login/login.htm` endpoint. Both Alice and Bob get their own per minute request quota of 60 for landing on that page, which is determined by (IP + device ID).

If the request quota isn't set, Bob or Alice would have to make the request enough times that the entire org bucket would hit rate limits. Those requests would affect the entire org.

#### Client-based isolation for users accessing OAuth 2.0 /authorize from a NAT IP

Alice, Bob, and Lisa all work from the same office. Since they access Okta through a Network Address Translation (NAT) IP from their office network, everyone shares an IP address. When they make the authorize request to `https://company.okta.com/oauth2/v1/default/authorize?clientId=portal123`, the client-based rate limit framework creates a unique per minute request quota from the combination of every user's IP address, the OAuth 2.0 client ID of the application, and the device identifier set by Okta in each user's browser.

<div class="three-quarter border">

![Client-based isolation for users accessing the authorize endpoint from a NAT IP](/img/rate-limits/clientbasedRL2.png)

</div>

* Alice: (NAT IP + portal123 + Device1 ID) Gets a quota of 60 total requests per minute and a maximum of five concurrent requests
* Bob: (NAT IP + portal123 + Device2 ID) Gets a quota of 60 total requests per minute and a maximum of five concurrent requests
* Lisa: (NAT IP + portal123 + Device3 ID) Gets a quota of 60 total requests per minute and a maximum of five concurrent requests

> **Note:** The device identifier is derived from a cookie (`dt` cookie) that Okta sets in the browser when the first request is made to Okta. When the requests are made using a non-browser client, the device cookie isn't present. In that case, such requests fall under a common quota with the device identifier being null (NAT IP + portal123 + null).

#### Client-based isolation for users accessing /login/login.htm from a NAT IP

Alice, Bob, and Lisa all work from the same office. Since they access Okta through a Network Address Translation (NAT) IP from their office network, everyone shares an IP address. When they go to an application and the application sends them to the Okta-hosted login page, a request is made to `https://okta.okta.com/login/login.htm`.

<div class="three-quarter border">

![Client-based isolation for users accessing the /login/login.htm endpoint from a NAT IP](/img/rate-limits/clientbasedRL3.png)

</div>

* Alice: (NAT IP + Device1 ID) Gets a quota of 60 total requests per minute and a maximum of five concurrent requests
* Bob: (NAT IP + Device2 ID) Gets a quota of 60 total requests per minute and a maximum of five concurrent requests
* Lisa: (NAT IP + Device3 ID) Gets a quota of 60 total requests per minute and a maximum of five concurrent requests

> **Note:** The device identifier is derived from a cookie (`dt` cookie) that Okta sets in the browser when the first request is made to Okta. When the requests are made using a non-browser client, the device cookie isn't present. In that case, such requests fall under a common quota with the device identifier being null (NAT IP + null).

#### Client-based isolation for users accessing the endpoint through a proxy

When OAuth 2.0 `/authorize` or `/login/login.htm` requests are made from behind a proxy IP address, ensure to [configure the respective IPs as proxies](https://help.okta.com/okta_help.htm?id=ext_Security_Network). This allows the client-based rate limit framework to look for the IP address before the proxy to find the true client IP address.

### Client-based rate limit modes

The client-based rate limit framework can operate in one of three modes:

| Mode                                     | Description                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Enforce and log per client (recommended)** | The default setting for all orgs, including those orgs created before 2018. The rate limit is based on the client-based rate limit values. The client-specific rate limit violation information is logged as [System Log](/docs/reference/rl-system-log-events/#client-based-system-log-event-types) events. |
| **Log per client**                          | The rate limit is based on the [org-wide rate limit](/docs/reference/rate-limits/) values, but the client-specific rate limit violation information is logged as System Log events.  |
| **Do nothing (not recommended)**                                | Rate limits aren't enforced at the client-specific level. The rate limit is based on the [org-wide rate limit](/docs/reference/rate-limits/) values. No new or extra System Log events are produced from this feature in this mode. |

#### Default client-based rate limit mode change

In March 2022, the default client-based rate limit is set to **Enforce limit and log per client (recommended)** mode for the OAuth 2.0 `/authorize` and `/login/login.htm` endpoints. This means that if an org's client-based rate limit was previously set to **Do nothing** or **Log per client**, the setting is going to change to **Enforce limit and log per client (recommended)** mode.

If your org is upgrading to the Identity Engine, the existing Classic Engine client-based rate-limit settings require no updates during the upgrade. The `/login/login.htm` setting maps to the Identity Engine client application access setting, and the OAuth 2.0 `/authorize` setting maps to the same OAuth 2.0 /`authorize` setting on Identity Engine. The mode selection remains the same after the upgrade.

#### What to monitor and the action to take

If an org's client-based limit was previously set to **Enforce limit and log per client (recommended)** mode, the setting remains as is. For this mode setting, admins need to monitor System Log events for [`system.client.rate_limit.violation`](/docs/reference/rl-system-log-events/#web-request-rate-limits-client-level) and [`system.client.concurrency_rate_limit.violation`](/docs/reference/rl-system-log-events/#web-request-rate-limits-client-level). If admins don't see any of those events in the System Log, then no action is needed. If admins see these events sporadically from just a few different users, then those users may be doing something scripted or automated. In such cases, admins can choose to either investigate the issue or take no action. However, if admins see widespread events from many users, then it's likely that the application may have an issue, in which case admins need to troubleshoot and change the application where needed.

### Check your rate limits with Okta rate limit headers

The rate limit headers that are returned when the client-based rate limit is enabled are similar to the headers that are returned through the [org-wide rate limits](/docs/reference/rl-best-practices/). The difference is that the header values are specific to a given client rather than the org-wide rate-limit values. Okta provides three headers in each response to report client-specific rate limits.

> **Note:** If a client-based rate limit is in **Log per client** or **Do nothing** mode, the headers that are returned still reflect the org-wide rate limits.

For client-specific rate limits, the three headers show the limit that is being enforced, when it resets, and how close you're to hitting the limit:

* `X-Rate-Limit-Limit`: The rate limit ceiling that is applicable for the current request to the specific client.
* `X-Rate-Limit-Remaining`: The amount of requests left until the limit is hit for the specific client during the current rate limit window
* `X-Rate-Limit-Reset`: The time when the rate limit resets, specified in [UTC epoch time](https://www.epochconverter.com/) for the specific client.

For example:

```
HTTP/1.1 200 OK
X-Rate-Limit-Limit: 60
X-Rate-Limit-Remaining: 35
X-Rate-Limit-Reset: 1516307596
```

When a specific client exceeds either the 60 requests per minute limit or the concurrent limit (five concurrent requests), then the respective requests return an HTTP 429 error.

### How to enable this feature

To configure the client-based rate limit for existing orgs:

1. From the Admin Console select **Settings** > **Account**, and then scroll down to the **Client-based rate limiting** section.

2. Select the type of **Rate limit per client** that you want to implement:

    * Select **Enforce and log per client (recommended)** to enable client-based rate limit.

    * Select **Log per client** to enable the client-based rate limit in preview mode. In **Log per client** mode, the rate limit is based on the org-wide rate limit values, but client-specific rate limit error information is logged as System Log events. By analyzing these System Log events, you can determine if the client-based rate limit is effective for you.

    * Select **Do nothing** to disable the client-based rate limit.

### Frequently asked questions

**Q: Which endpoints are covered under the client-based rate limit?**

Currently, a client-based rate limit applies to an authorization server's OAuth 2.0 `/authorize` endpoint for Identity Engine and Classic Engine orgs. Client-based rate limits also apply to the Interaction Code flow endpoints for Identity Engine orgs, and the `/login/login.htm` endpoint for Classic Engine orgs.

**Q: What happens if my network contains a proxy server through which the requests are proxied?**

Requests would appear to come from the same IP Address. When OAuth 2.0 `/authorize` or `/login/login.htm` requests are made from behind a proxy IP address, make sure to [configure the respective IPs as proxies](https://help.okta.com/okta_help.htm?id=ext_Security_Network). This allows the client-based rate limit framework to look for the IP address before the proxy to find the true client IP address.

**Q: Can I update the per client rate limit today?**

No. Today every client is allowed 60 total requests per minute and a maximum of five concurrent requests.

**Q: Does the org-wide rate limit still apply when I enable the client-based rate limit?**

Yes. When the cumulative total request or maximum concurrent requests from every unique client exceeds the org-wide rate limits, your Okta org experiences org-wide rate limit errors.

**Q: Would the rate limit headers returned by Okta on the OAuth 2.0 /authorize or /login/login.htm endpoint reflect client-specific rate limits?**

Yes. The header values are specific to a given client rather than the org-wide rate limit values.

**Q: How can I find out if the client-based rate limit would be effective for my Okta tenant?**

You can set the client-based rate limit framework to **Log per client** mode. In **Log per client** mode, the rate limit is based on the org-wide rate-limit values, but the client-specific rate limit error information is logged as System Log events. By analyzing these System Log events, you can determine if the client-based rate limit is effective for you.

**Q: Where does Okta get the device identifier from?**

The device is identified using the `dt` cookie that Okta sets in the browser when the first request is made to Okta from the browser.
