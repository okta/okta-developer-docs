---
title: Client-based rate limits
excerpt: >-
  Understand what client-based rate limits at Okta and learn how to design for efficient use of resources
---

# Client-based rate limits

Client-based limiting uses either of these two endpoints:

* `/authorize`
* `/login/login.htm`

Client-based rate limiting for the `/authorize` endpoint uses a combination of the Client ID, user's IP address, and Okta device identifier to provide granular isolation for requests made to the `/authorize` endpoint. This framework isolates rogue OAuth clients and bad actors, thereby ensuring valid users and applications don't run into rate limit violations.

Client-based rate limiting for the `/login/login.htm endpoint uses a combination of the user's IP address and Okta device identifier to provide even more tranular, more targeted rate limits to a user, app, script, or server.

The `/authorize` [endpoint](/docs/reference/api/oidc/#authorize) is the starting point for OpenID Connect flows such as the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow) or the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow). A request to this endpoint authenticates the user and either returns an authorization code or tokens to the client application as part of the callback response. The `/login/login.htm` [endpoint](/docs/reference/api/oidc/#authorize) launches the Okta-hosted sign-in widget, where users can enter their username and password to authenticate.

Currently, the client-based rate limits apply to the `/login/login.htm` endpoint and OAuth `/authorize` endpoint on both the Okta Org Authorization Server and any Custom Authorization Server. All Custom Authorization Servers share a [rate limit](/docs/reference/rate-limits/). The Org Authorization Server has a separate rate limit.

Each valid request made by a user to this endpoint is counted as one request against the respective [authorization server](/docs/concepts/auth-servers/) rate limit bucket - for example, (`/oauth2/{authorizationServerId}/v1` (Custom Authorization Server) or `/oauth2/v1` (Okta Org Authorization Server)). The per minute rate limits on these endpoints apply across an Okta tenant.

For example, example.com has 10 OAuth applications running in a production environment. Bob's team is launching a new marketing portal that is a single page OAuth application. Unaware of the rate limits on the `/authorize` endpoint, Bob's team begins running some batch testing scripts against the newly created application that makes hundreds of `/authorize` requests in a single minute. Without the client-based rate limit framework, the new marketing portal application could potentially consume all of the per minute request limits assigned to example.okta.com and thereby cause rate limit violations for the rest of the users that access the other OAuth applications.

A client-based rate limit can be helpful in the following scenarios:

* (Applies only to the `/authorize` endpoint) You have several OAuth applications that are split across multiple teams. You need to ensure that one OAuth application doesn't consume all of the assigned per minute request limits.
* (Applies only to the `/authorize` endpoint) You want to isolate any rogue OAuth applications from other valid OAuth applications.
* You want to ensure that every application team adheres to best-coding practices, such as proper error handling to prevent redirect loops.
* You want protection against random synthetic tests or batch jobs in production that make numerous requests every minute.

### How it works

The best way to describe how client-based rate limiting works is to provide some example use cases.

#### Client-based isolation for a unique IP address

##### Example using the `/authorize` request

Bob and Alice are working from home and have distinct IP addresses. Both Bob and Alice try to sign in to their company's portal application (clientID: portal123) at the same time. When they make the authorize request to `https://company.okta.com/oauth2/v1/default/authorize?clientId=portal123`, the client-based rate limit framework creates a unique per minute request quota for both Bob and Alice using their IP address and the OAuth client ID that they are trying to access.

* Bob: (IP1 + portal123) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests
* Alice: (IP2 + portal123) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests

Let's assume the org-wide quota for the `/authorize` endpoint is a total of 2,000 requests per minute on Custom Authorization Servers. Bob decides to run a batch job that triggers about 2,000 `/authorize` requests per minute.

Without the client-based rate limit framework, Bob consumes all of the total allowed requests per minute (2,000 requests per minute). This results in HTTP 429 errors for both Bob and Alice, which makes the application inaccessible for everyone.

With the client-based rate limit framework enabled, after Bob exceeds his individual limit of 60 requests per minute, HTTP 429 errors are sent. Requests that originate from Bob's IP address, and the specific device from which the requests are made, start receiving the errors. Alice continues to access the application without any issues.

![Client-based isolation for a unique IP address](/img/clientbasedRL1.png "Displays Bob as portal123 IP1 and Alice as portal123 IP2, both making authorize requests")

##### Example using the `/login/login.htm` request

oWhen Bob and Alice try to navigate to their application and land on the sign-in page, a request is made to the /login/login.htm endpoint. Both Alice and Bob get their own per minute request quota of 60 for landing on that page, which is determined by (IP + device ID).

If the request quota isn't set, Bob or Alice would have the ability to make the request enough times that the entire org bucket would hit rate limits that would affect the entire org.

#### Client-based isolation for users accessing `/authorize` from a NAT IP

Alice, Bob, and Lisa all work from the same office. Since they access Okta through a Network Address Translation (NAT) IP from their office network, everyone shares the same IP address. When they make the authorize request to `https://company.okta.com/oauth2/v1/default/authorize?clientId=portal123`, the client-based rate limit framework creates a unique per minute request quota from the combination of every user's IP address, OAuth client ID of the application, and the device identifier set by Okta in each user's browser.

![Client-based isolation for users accessing the authorize endpoint from a NAT IP](/img/clientbasedRL2.png "Displays Alice as portal123 Device1, Bob as portal123 Device2, Lisa as portal123 Device3, all making authorize requests that are a combination of the shared IP address")

* Alice: (NAT IP + portal123 + Device1 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests
* Bob: (NAT IP + portal123 + Device2 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests
* Lisa: (NAT IP + portal123 + Device3 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests

> **Note:** The device identifier is derived from a cookie (`dt` cookie) that Okta sets in the browser when the first request is made to Okta. When the requests are made using a non-browser client, the device cookie isn't present. In that case, such requests fall under a common quota with the device identifier being null (NAT IP + portal123 + null).

#### Client-based isolation for users accessing `/login/login.htm` from a NAT IP

Alice, Bob, and Lisa all work from the same office. Since they access Okta through a Network Address Translation (NAT) IP from their office network, everyone shares the same IP address. When they navigate to an application and the application sends them to the Okta-hosted login page, a request is made to `https://okta.okta.com/login/login.htm`.

![Client-based isolation for users accessing the /login/login.htm endpoint from a NAT IP](/img/clientbasedRL3.png "Displays Alice as Device1, Bob as Device2, Lisa as Device3, all making authorize requests that are a combination of the shared IP address")

* Alice: (NAT IP + Device1 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests
* Bob: (NAT IP + Device2 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests
* Lisa: (NAT IP + Device3 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests

> **Note:** The device identifier is derived from a cookie (`dt` cookie) that Okta sets in the browser when the first request is made to Okta. When the requests are made using a non-browser client, the device cookie isn't present. In that case, such requests fall under a common quota with the device identifier being null (NAT IP + null).

#### Client-based isolation for users accessing the endpoint through a proxy

When `/authorize` or `/login/login.htm` requests are made from behind a proxy IP address, make sure to [configure the respective IPs as proxies](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Network). This allows the client-based rate limit framework to look for the IP address before the proxy to find the true client IP address.

### Client-based rate limit modes

The client-based rate limit framework can operate in one of three modes:

| Mode                                     | Description                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Enforce and log per client (recommended)** | The rate limit is based on the client-based rate limit values. The client-specific rate limit violation information is logged as [System Log](/docs/reference/rl-system-log-events/#client-based-system-log-event-types) events. |
| **Log per client**                          | The rate limit is based on the [org-wide rate limit](/docs/reference/rate-limits/) values, but the client-specific rate limit violation information is logged as System Log events. |
| **No action**                                | Rate limits aren't enforced at the client-specific level. The rate limit is based on the [org-wide rate limit](/docs/reference/rate-limits/) values. No new or additional System Log events are produced from this feature in this mode. |

### Check your rate limits with Okta Rate Limit headers

The Rate Limit headers that are returned when the client-based rate limit is enabled are very similar to the headers that are returned through the [org-wide rate limits](/docs/reference/rl-best-practices/). The difference is that the header value is specific to a given client/IP/device identifier combination (for the `/authorize` endpoint) or IP/device identifier combination (for the `/login/login.htm` endpoint) rather than the org-wide rate limit values. Okta provides three headers in each response to report client-specific rate limits.

> **Note:** If a client-based rate limit is in **Log per client** or **No action** mode, headers that are returned still reflect the org-wide rate limits.

For client-specific rate limits, three headers show the limit that is being enforced, when it resets, and how close you are to hitting the limit:

* `X-Rate-Limit-Limit` - The rate limit ceiling that is applicable for the current request to the specific client/IP/device identifier combination (for the `/authorize` endpoint) or the IP/device identifier combination (for the `/login/login.htm` endpoint)
* `X-Rate-Limit-Remaining` - The number of requests left until the limit is hit for the specific client/IP/device identifier combination (for the `/authorize` endpoint) or the IP/device identifier combination (for the `/login/login.htm` endpoint) during the current rate limit window
* `X-Rate-Limit-Reset` - The time when the rate limit resets, specified in [UTC epoch time](https://www.epochconverter.com/) for the specific client/IP/device identifier combination (for the `/authorize` endpoint) or the IP/device identifier combination (for the `/login/login.htm` endpoint)

For example:

```
HTTP/1.1 200 OK
X-Rate-Limit-Limit: 60
X-Rate-Limit-Remaining: 35
X-Rate-Limit-Reset: 1516307596
```

When a specific client/IP/device identifier combination or IP/device identifier combination exceeds either the 60 requests per minute request limit or the concurrent limit (two concurrent requests), then the respective `/authorize` or `/login/login.htm`  request returns an HTTP 429 error.

### How to enable this feature

> **Note:** For all orgs created after September 2020, this feature is automatically set to the **Enforce and log per client (recommended)** mode.

To configure the client-based rate limit for existing orgs:

1. From the Admin Console select **Settings** > **Account**, and then scroll down to the **Client-based rate limiting** section.

2. Select the type of **Rate limit per client** that you want to implement:

    * Select **Enforce and log per client (recommended)** to enable client-based rate limit.

    * Select **Log per client** to enable the client-based rate limit in preview mode. In **Log per client** mode, the rate limit is based on the org-wide rate limit values, but client-specific rate limit error information is logged as System Log events. By analyzing these System Log events, you can determine if the client-based rate limit is effective for you.

    * Select **No action** to disable the client-based rate limit.

### Frequently asked questions

**Q: Which endpoints are covered under the client-based rate limit?**

Currently, a client-based rate limit only applies to an authorization server's `/authorize` or `/login/login.htm` endpoint.

**Q: How is the client-specific rate limit determined?**

For the `/authorize` endpoint, the client rate limit framework calculates the per client rate limit based on the OAuth client ID, the user's IP address, and the Okta device identifier (the Okta device identifier that Okta sets in the browser).

For the `/login/login.htm` endpoint, the client rate limit framework calculates the per client rate limit based on the user's IP address and the Okta device identifier (the Okta device identifier that Okta sets in the browser).

**Q: What happens if my network contains a proxy server through which the requests are proxied?**

Requests would appear to come from the same IP Address. When `/authorize` or `/login/login.htm` requests are made from behind a proxy IP address, make sure to [configure the respective IPs as proxies](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Network). This allows the client-based rate limit framework to look for the IP address before the proxy to find the true client IP address.

**Q: Can I update the per client rate limit today?**

No. Today every client ID/IP/device identifier combination (for the `/authorize` endpoint) or IP/device identifier combination (for the `/login/login.htm` endpoint) gets 60 total requests per minute and a maximum of two concurrent requests.

**Q: Does the org-wide rate limit still apply when I enable the client-based rate limit?**

Yes. When the cumulative total request or maximum concurrent requests from every unique client exceeds the org-wide rate limits, your Okta org experiences org-wide rate limit errors.

**Q: Would the rate limit headers returned by Okta on the `/authorize` or `/login/login.htm` endpoint reflect client-specific rate limits?**

Yes. The header value is specific to a given client/IP/device combination (for the `/authorize` endpoint) or IP/device identifier combination (for the `/login/login.htm` endpoint) rather than the org-wide rate limit values.

**Q: How can I find out if the client-based rate limit would be effective for my Okta tenant?**

You can set the client-based rate limit framework to **Log per client** mode. In **Log per client** mode, the rate limit is based on the org-wide rate limit values, but the client-specific rate limit error information is logged as System Log events. By analyzing these System Log events, you can determine if the client-based rate limit is effective for you.

**Q: Where does Okta get the device identifier from?**

The device is identified using the `dt` cookie that Okta sets in the browser when the first request is made to Okta from the browser.
