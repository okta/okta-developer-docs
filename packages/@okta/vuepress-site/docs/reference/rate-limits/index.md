---
title: Rate Limits
excerpt: >-
  Understand rate limits at Okta and learn how to design for efficient use of
  resources
---

# Rate Limits

The number of API requests for an organization is limited for all APIs in order to protect the service for all users. The number of Okta-generated emails that can be sent also has rate limits.

Okta has two types of API rate limits:

* [Org-wide rate limits](#org-wide-rate-limits) that vary by API endpoint. These limits are applied on a per-minute or per-second basis, and some are also applied on a per-user basis. For example, if your org sends a request to list applications more than one hundred times in a minute, the org-wide rate limit is exceeded. These limits protect against denial-of-service attacks, and help ensure that adequate resources are available for all customers.
* [Concurrent rate limits](#concurrent-rate-limits) on the number of simultaneous transactions. For example, if you sent 77 very long-lasting requests to any API endpoint simultaneously, you might exceed the concurrent rate limit.

Okta has one type of email rate limit:

* [Okta-Generated Email Message Rate Limits](#okta-generated-email-message-rate-limits) that vary by email type. Okta enforces rate limits on the number of Okta-generated email messages that are sent to customers and customer users. For example, if the number of emails sent to a given user exceeds the per-minute limit for a given email type, subsequent emails of that type are dropped for that user until that minute elapses.

Rate limits may be changed to protect customers. We provide advance warning of changes when possible.

## Org-Wide Rate Limits

API rate limits apply per minute or per second to the endpoints in an org.

If an org-wide rate limit is exceeded, an HTTP 429 status code is returned.
You can anticipate hitting the rate limit by checking [Okta's rate limiting headers](#check-your-rate-limits-with-okta-s-rate-limit-headers).

Rate limits differ depending on the level of service you have purchased from Okta. See the [pricing page](https://developer.okta.com/pricing/) for more details.

DynamicScale rate limits apply to a variety of endpoints across different APIs for customers that purchased this add-on. These rate limits can be found [below](#dynamicscale-rate-limits).

> If you have a One App or Enterprise organization, the admin console will display a banner and you will receive an email notification when your org approaches its rate limit.

### Okta API Endpoints and Per Minute Limits

Note that limits for more specific endpoints override the limits for less specific endpoints. For example, the limit for getting an application by ID is higher than the more general limit for the `/api/v1/apps` endpoint.

| Action and Okta API Endpoint                                                                                                                                              | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------- | ------- | ---------- | --------------------- |
| **Authenticate different end users:**<br>`/api/v1/authn`                                                                                                                  | 100              | 300              | 300     | 600        | 500                   |
| **Verify a factor:**<br>`/api/v1/authn/factors/{factorIdOrFactorType}/verify` only                                                                                        | 100              | 300              | 300     | 600        | 500                   |
| **Create or list applications:**<br>`/api/v1/apps` except `/api/v1/apps/{id}`                                                                                             | 20               | 25               | 25      | 100        | 100                   |
| **Get, update, or delete an application by ID:**<br>`/api/v1/apps/{id}` only                                                                                              | 100              | 300              | 300     | 600        | 500                   |
| **Create or list groups:**<br>`/api/v1/groups` except `/api/v1/groups/{id}`                                                                                               | 100              | 300              | 300     | 600        | 500                   |
| **Get, update, or delete a group by ID:**<br>`/api/v1/groups/{id}` only                                                                                                   | 100              | 300              | 300     | 600        | 1000                  |
| **Create or list users:**<br>Only `GET` or `POST` to `/api/v1/users`                                                                                                      | 100              | 300              | 300     | 600        | 600                   |
| **Get a user by ID or login:**<br>Only `GET` to `/api/v1/users/{idOrLogin}`                                                                                               | 100              | 300              | 300     | 1000       | 2000                  |
| **Update or delete a user by ID:**<br>Only `POST`, `PUT` or `DELETE` to `/api/v1/users/{id}`                                                                              | 100              | 300              | 300     | 600        | 600                   |
| **Get System Log data:**<br>`/api/v1/logs`                                                                                                                                | 20               | 25               | 25      | 50         | 120                   |
| **Get System Log data:**<br>`/api/v1/events`                                                                                                                              | 20               | 25               | 25      | 50         | 100 					 |
| **Get session information:**<br>`/api/v1/sessions`                                                                                                                        | 100              | 300              | 300     | 600        | 750                   |
| **Create an organization:**<br>`/api/v1/orgs`                                                                                                                             | N/A              | N/A              | N/A     | 50         | 50                    |
| **OAuth2 requests for Custom Authorization Servers:**<br>`/oauth2/{authorizationServerId}/v1` except public metadata endpoints (see Note below)                           | 300              | 600              | 600     | 1200       | 2000                  |
| **OAuth2 requests for the Org Authorization Server:**<br>`/oauth2/v1` except `/oauth2/v1/clients` and public metadata endpoints (see Note below)                          | 300              | 600              | 600     | 1200       | 2000                  |
| **OAuth2 client configuration requests:**<br>`/oauth2/v1/clients`                                                                                                         | 25               | 50               | 50      | 100        | 100                   |
| **All other OAuth2 requests:**<br>`/oauth2`                                                                                                                               | 100              | 300              | 300     | 600        | 600                   |
| **Most other API actions:**<br>`/api/v1`                                                                                                                                  | 100              | 300              | 300     | 600        | 1200                  |

These rate limits apply to all new Okta organizations. For orgs created before 2018-05-17, the [previous rate limits](#previous-rate-limits) still apply.

> **Note:** The following public metadata endpoints are not subjected to rate limiting. </br> Public metadata endpoints for Org Authorization Server are: <br/> - `/oauth2/v1/keys` <br/> - `/.well-known/openid-configuration` <br/> - `/.well-known/oauth-authorization-server` <br/> Public metadata endpoints for Custom Authorization Servers are: <br/> - `/oauth2/{authorizationServerId}/v1/keys` <br/> - `/oauth2/{authorizationServerId}/.well-known/openid-configuration` <br/> - `/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`.

### DynamicScale Rate Limits

If your needs exceed Okta's default rate limits for the base product subscriptions (One App or Enterprise) you've already purchased, you can purchase a "DynamicScale" add-on service which will grant you higher rate limits for the endpoints listed below. DynamicScale will increase your default rate limits by 5x to 1000x, depending on the tier multiplier you purchase. Customers can purchase this add-on annually for a Production tenant or temporarily for testing in a Sandbox tenant.  The following list of endpoints are included in the DynamicScale add-on service:

**Authentication endpoints:**

* `/api/v1/authn`
* `/api/v1/authn/factors/{factorIdOrFactorType}/verify`
* `/api/v1/sessions`

**OAuth2 endpoints:**

* `/oauth2/{authorizationServerId}/v1`
* `/oauth2/v1` except `/oauth2/v1/clients`

**SAML endpoints:**

* `/app/template_saml_2_0/{key}/sso/saml`
* `/app/{app}/{key}/sso/saml`

**Single User/Group/App operations (Get, Update and Delete):**

* `/api/v1/apps/{id}` &nbsp;
* `/api/v1/groups/{id}` &nbsp;
* `/api/v1/users/{idOrLogin}` &nbsp;

**Notes:**

1. If Okta makes any change to the DynamicScale add-on's rate limits, such change will be communicated to customers via an updated version of this product documentation.
2. DynamicScale add-on is not available for customers that are using Delegated Authentication.
3. Customers purchasing the DynamicScale add-on service will get best-effort additional protection beyond the multiplier they've purchased to handle any additional unforeseen spikes in Production:
    1. This protection is not always guaranteed and should not be counted towards available rate limits
    2. Additional protection availability is subject to infrastructure capacity available to your Org

If your usage pattern exceeds the rate limits offered by DynamicScale add-on or the endpoint you're consuming isn't listed as part of the DynamicScale add-on then please contact your Okta Sales Representative regarding other options.

For orgs that purchased the "High Capacity Rate Limit" SKU before 2019-10-24, the [previous rate limits](#high-capacity-rate-limits) still apply.

### Okta API Endpoints and Per-User Limits

API endpoints that take username and password credentials, including the [Authentication API](/docs/reference/api/authn/) and the [OAuth 2.0 resource owner password flow](/docs/guides/implement-password/), have a per-username rate limit to prevent brute force attacks with the user's password:

| Action and Okta API Endpoint                                      | Per User Limits (All Orgs) |
| ----------------------------------------------------------------- | -------------------------: |
| **Authenticate the same user:**<br>`/api/v1/authn`                | 4 per second               |
| **Generate or refresh an OAuth 2.0 token:**<br>`/oauth2/v1/token` | 4 per second               |

### Okta Rate Limits for Most Other Endpoints

Finally, for most endpoints not listed in the tables above, the API rate limit is a combined rate limit:

| Developer (free) | Developer (paid) | One App    | Enterprise | Workforce Identity |
| ---------------- | ---------------- | ---------- | ---------- | ------------------ |
| 1000             | 3000             | 3000       | 6000       | 10000              |

For organizations created before 2018-05-17, the limit is 10,000 requests per minute.

### Okta Home Page Endpoints and Per-Minute Limits

The following endpoints are used by the Okta home page for authentication and sign on, and have org-wide rate limits:

| Okta Home Page Endpoints                                                | Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity |
| ----------------------------------------------------------------------- | ---------------- | ---------------- | ------- | ---------- | ------------------ |
| `/app/{app}/{key}/sso/saml`                                             | 100              | 300              | 300*    | 600*       | 750                |
| `/app/office365/{key}/sso/wsfed/active`                                 | N/A              | N/A              | N/A     | 2000       | 1000               |
| `/app/office365/{key}/sso/wsfed/passive`                                | N/A              | N/A              | N/A     | 250        | 250                |
| `/app/template_saml_2_0/{key}/sso/saml`                                 | 100              | 300              | 300*    | 600*       | 2500               |
| `/login/do-login`                                                       | 100              | 300              | 300     | 600        | 200                |
| `/login/login.htm`                                                      | 100              | 300              | 300     | 600        | 850                |
| `/login/sso_iwa_auth`                                                   | 100              | 300              | 300     | 600        | 500                |
| `/api/plugin/{protocolVersion}/form-cred/{appUserIds}/{formSiteOption}` | 100              | 300              | 300*    | 600*       | 650                |
| `/api/plugin/{protocolVersion}/sites`                                   | 20               | 50               | 50      | 100        | 150                |
| `/bc/image/fileStoreRecord`                                             | 100              | 300              | 300*    | 600*       | 500                |
| `/bc/globalFileStoreRecord`                                             | 100              | 300              | 300*    | 600*       | 500                |

These rate limits apply to all new Okta organizations. For orgs created before 2018-05-17, the [previous rate limits](#previous-rate-limits) still apply.

*The limits for these endpoints can be increased by purchasing the [High-Capacity add-on](#high-capacity-rate-limits).

### End-User Rate Limit

Okta limits the number of requests from the administrator and end-user UI to 40 requests per user per 10 seconds per endpoint. This rate limit protects users from each other, and from other API requests in the system.

If a user exceeds this limit, they receive an HTTP 429 response without affecting other users in your org.
A message is written to the System Log indicating that the end-user rate limit was encountered.

## Concurrent Rate Limits

In order to protect the service for all customers, Okta enforces concurrent rate limits, a limit on the number of simultaneous transactions. Concurrent rate limits are distinct from [the org-wide, per-minute API rate limits](#org-wide-rate-limits), which measure the total number of transactions per minute. Transactions are typically very short-lived. Even very large bulk loads rarely use more than 10 simultaneous transactions at a time.

For concurrent rate limits, traffic is measured in three different areas. Counts in one area aren't included in counts for the other two:

* For agent traffic, Okta has set the limit based on typical org usage. This limit varies from agent to agent.
* For Office365 traffic, the limit is 75 concurrent transactions per org.
* For all other traffic, including API requests, the limit is described in the table below.

| Developer (free) | Developer (paid) | One App | Enterprise | Workforce Identity |
| ---------------- | ---------------- | ------- | ---------- | ------------------ |
| 15               | 35               | 35      | 75         | 75                 |

The first request to exceed the concurrent limit returns an HTTP 429 error, and the first error every sixty seconds is written to the log. Reporting concurrent rate limits once a minute keeps log volume manageable.

> Under normal circumstances, customers don't exceed the concurrency limits. Exceeding them may be an indication of a problem which requires investigation.

These rate limits apply to all new Okta organizations. For orgs created before 2018-05-17, the [previous rate limits](#previous-rate-limits) still apply.

> For information on possible interaction between Inline Hooks and concurrent rate limits, see [Inline Hooks and Concurrent Rate Limits](/docs/concepts/inline-hooks/#inline-hooks-and-concurrent-rate-limits).

## Client-based Rate Limits

Client-based rate limiting for the `/authorize` endpoint provides granular isolation between requests made to the `/authorize` endpoint using a combination of the Client ID, user's IP address, and Okta device identifier. This framework isolates rogue OAuth clients and bad actors, thereby ensuring valid users and applications don't run into rate limit violations.

The [`/authorize` endpoint](/docs/reference/api/oidc/#authorize) is the starting point for browser-based OpenID Connect flows such as the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow) or the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow). A request to this endpiont authenticates the user and either returns an authorization grant or tokens to the client application as part of the callback response.

Currently, client-based rate limits apply to the OAuth `/authorize` endpoint on both the Okta Org Authorization server and any of the Custom Authorization Servers. All Custom Authorization Servers share a rate limit. The Org Authorization Server has a separate rate limit.

Each valid request made by a user to this endpoint is counted as one request against the respective [authorization server](/docs/concepts/auth-servers/0) rate limit bucket (`/oauth2/{authorizationServerId}/v1` or `/oauth2/v1`). The per-minute rate limits on these endpoints apply across an Okta tenant.

For example, company Example.com has 10 OAuth applications running in a production environment. Bob's team is launching a new marketing portal that is a single page OAuth application. Unaware of the rate limits on the `/authorize` endpoint, Bob's team begins running some batch testing scripts against the newly created application that makes hundreds of `/authorize` requests in a single minute. Without the client-based rate limiting framework, the new marketing portal application could potentially consume all of the per-minute request limits assigned to Example.okta.com and thereby cause rate-limit violations for the rest of the users that access the other OAuth applications.

Client-based rate limiting can be helpful in the following scenarios:

* You have several OAuth applications that are split across multiple teams. You need to ensure that one OAuth application doesn't consume all of the assigned per-minute request limits.
* You want the ability to isolate any rogue OAuth applications from other valid OAuth applications.
* You want to ensure that every application team adheres to best-coding practices such as proper error handling without resulting in redirect loops.
* You want protection against random synthetic tests or batch jobs that make numerous requests every minute in production.

### How it works

The best way to describe how client-based rate limiting works is to provide some example use case scenarios.

#### Client-based isolation for a unique IP address

Bob and Alice are working from home and have distinct IP addresses. Both Bob and Alice try to sign in to their company's portal application (clientID: portal123) at the same time. When they make the authorize request to `https://company.okta.com/oauth2/v1/default/authorize?clientId=portal123`, the client-based rate-limiting framework creates a unique per minute request quota for both Bob and Alice using their IP address and the OAuth client ID that they are trying to access.

Bob: (IP1 + portal123) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests
Alice: (IP2 + portal123) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests

Let's assume the org-wide quota for the `/authorize` endpoint is a total of 2,000 requests per minute on custom authorization servers. For some reason, Bob decides to run a batch job that triggers about 2,100 `/authorize` requests per minute. Without the client-based rate-limiting framework, Bob would consume the entirety of the total allowed requests per minute (2,000 requests per minute). This would result in ??429 errors?? for both Bob and Alice, which makes the application inaccessible for everyone.

With client-based rate-limiting framework enabled, after Bob exceeds his individual limit of 60 requests per minute, requests that originate from Bob's IP address would start receiving 429 violations whereas Alice could continue to access the application without any issues.

![Client-based isolation for a unique IP address](/img/diagram1.png "Displays Bob as portal123 IP1 and Alice as portal123 IP2, both making authorize requests")

#### Client-based isolation for users accessing `/authorize` from a NAT IP

Alice, Bob, and Lisa all work from the same office. Since they access Okta through a Network Address Translation (NAT) IP from their office network, everyone shares the same IP address. When they make the authorize request to `https://company.okta.com/oauth2/v1/default/authorize?clientId=portal123`, the client-based rate-limiting framework creates a unique per-minute request quota for the combination of every user's IP address, OAuth client ID of the application, and the device identifier set by Okta in each user's browser.

![Client-based isolation for users accessing the authorize endpoint from a NAT IP](/img/diagram2.png "Displays Alice as portal123 Device1, Bob as portal123 Device2, Lisa as portal123 Device3, all making authorize requests that are a combination of the shared IP address")

Alice: (NAT IP + portal123 + Device1 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests
Bob: (NAT IP + portal123 + Device2 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests
Lisa: (NAT IP + portal123 + Device3 ID) Gets a quota of 60 total requests per minute and a maximum of two concurrent requests

> **Note:** When the requests are made using a non-browser client, the device cookie isn't present. In that case, such requests fall under a common quota with the device cookie being null (NAT IP + portal123 + null).

#### Client-based isolation for users accessing `/authorize` through a proxy

When `/authorize` requests are made from behind a proxy IP address, make sure to [configure the respective IPs as proxies](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Network). ??This allows the client-based rate-limiting framework to look for the IP address before the proxy in the chain to find the true client IP address.??

### Client-based rate-limiting modes

The client-based rate-limiting framework can exist in one of three modes:

| Mode               | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| Disable            | Rate limits aren't enforced at the client-specific level. Rate limiting is based on the org-wide rate limit values. |
| Preview            | Rate limiting is still based on the org-wide rate limit values, but client-specific rate limiting violation information is logged by firing System Log events. |
| Enable (recommended)|Rate Limiting is based on client-based rate limiting values. Client-specific rate limiting violation information is logged by firing System Log events. |

### System Log events

When an individual user violates the per-minute requests limit assigned to them, the following System Log event is fired:

* `system.client.rate_limit.violation`: This event is fired when the framework is in Enable mode. This event is fired when a specific client, IP address, or device identifier combination exceeds the total limit of 60 requests per minute. The System Log contains information about the client ID, IP address, device identifier, and the actual user if the user already has a valid session.

* `system.client.concurrency_rate_limit.violation`: This event is fired when the framework is in Enable mode. This event is fired when a specific client, IP address, or device identifier combination makes more than two concurrent requests. The System Log contains information about the client ID, IP address, device identifier, and the actual user if the user already has a valid session.

* `system.client.rate_limit.violation.preview `: This event is fired when the framework is in Preview mode. This event is fired when a specific client, IP address, or device identifier combination exceeds the total limit of 60 requests per minute. However, the end user wouldn't see a rate limit violation. The System Log contains information about the client ID, IP address, device identifier, and the actual user if the user already has a valid session.

* `system.client.concurrency_rate_limit.violation.preview`: This event is fired when the framework is turned on in log only mode. This event would be fired when a specific client, IP address, Device token combination makes more than 2 concurrent requests. However, the end user would not see a rate limit violation. The Syslog contains information about the client ID, IP address, Device identifier, and the actual user if the user already has a valid session.

Check your Rate Limits with Okta Rate Limit headers
The rate limit headers returned when client based rate limiting is enabled are very similar to the headers returned today via the Org wide rate Limits. The difference is that the header value is specific to a given client / IP/ Device combination instead of the Org wide rate limit values. Okta provides three headers in each response to report client specific rate limits.

Note: If the Client based rate limiting is in preview mode, headers returned would still reflect the Org wide rate Limits

For Client specific rate limits, three headers show the limit that is being enforced, when it resets and how close you are to hitting the limit:

`X-Rate-Limit-Limit` - the rate limit ceiling that is applicable for the current request to the specific Client / IP/ Device identifier combination 
`X-Rate-Limit-Remaining` - the number of requests left for the specific Client / IP/ Device identifier combination during the current rate-limit window.
`X-Rate-Limit-Reset` - the time at which the rate limit will reset, specified in UTC epoch time for the specific Client / IP/ Device identifier combination 

For example:

HTTP/1.1 200 OK
X-Rate-Limit-Limit: 60
X-Rate-Limit-Remaining: 35
X-Rate-Limit-Reset: 1516307596

When a specific client/IP/device identifier combination exceeds either the per minute request limit (60 request per min) or concurrent limit (2 concurrent request), the `/authorize` request would return a 429 violation
How to enable this feature?
For all orgs created after [Date 2020], this feature would be automatically enabled.
For existing Orgs, go to enable go to reports>rate limits->set in enable mode.
To set the client based rate limiting in preview mode,  go to reports>rate limits->set in preview mode
How to disable this feature?
To enable go to settings->disable flag (TBD)

FAQ
Q: What endpoints are covered under client based rate limiting ?
Ans: Today, Client based rate limiting only applies to Authorization server’s `/authorize` endpoints.

Q: How is the client specific rate limit determined ?
Ans: The Client framework rate limiting calculates the per client rate limit based on the OAuth client ID, user’s IP address and Okta device Identifier i.e the DT cookie that Okta sets in the browser.

Q: What happens if my network contains a proxy server through which the requests are proxied?
Ans: In that case, requests would seem to come from the same IP Address. When `/authorize` requests are made from behind a proxy IP address, make sure to configure the respective IPs as proxies using the following doc. This allows the client based rate limiting framework to look for the IP address before the proxy in the chain to find the true client IP address.

Q: Can I update the per client rate limit today?
Ans: No. Today every client ID / IP address/ Device identifier combination gets 60 total requests per minute and a maximum of 2 concurrent requests

Q: Does the Org wide rate limit still apply when I enable client based rate limiting?
Ans: Yes. The underlying Org wide rate limiting still applies to your Okta tenant. When the cumulative total request or maximum concurrent requests from every unique client exceed the Org wide rate Limits you Okta tenant would experience Org wide rate limit violations.

Q: Would the rate limit headers returned by Okta on `/authorize` endpoint reflect client specific rate limits?
Ans: Yes. The header value is specific to a given client / IP/ Device combination instead of the Org wide rate limit values.

Q: How can I find out if the client based rate limiting would be effective for my Okta tenant?
Ans: You can set the Client based rate limiting framework in Preview mode. In preview mode, Rate Limiting is still based on the Org wide rate limit values, but client specific rate limiting violation information is logged by firing syslog events. By analyzing the preview syslog events you can determine if Client based rate limiting would be effective for you.

## Check Your Rate Limits with Okta's Rate Limit Headers

Okta provides three headers in each response to report on both concurrent and org-wide rate limits.

For org-wide rate limits, the three headers show the limit that is being enforced, when it resets, and how close you are to hitting the limit:
* `X-Rate-Limit-Limit` - the rate limit ceiling that is applicable for the current request.
* `X-Rate-Limit-Remaining` - the number of requests left for the current rate-limit window.
* `X-Rate-Limit-Reset` - the time at which the rate limit will reset, specified in UTC epoch time.

For example:

``` http
HTTP/1.1 200 OK
X-Rate-Limit-Limit: 10000
X-Rate-Limit-Remaining: 9999
X-Rate-Limit-Reset: 1516307596
```

The best way to be sure about org-wide rate limits is to check the relevant headers in the response. The System Log doesn't report every
API request. Rather, it typically reports completed or attempted real-world events such as configuration changes, user logins, or user lockouts.
The System Log doesn't report the rate at which you've been calling the API.

Instead of the accumulated counts for time-based rate limits, when a request exceeds the limit for concurrent requests,
`X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Reset` report the concurrent values.

The three headers behave a little differently for concurrent rate limits: when the number of unfinished requests is below the concurrent rate limit, request headers only report org-wide rate limits.
When you exceed a concurrent rate limit threshold, the headers report that the limit has been exceeded. When you drop back down below the concurrent rate limit, the headers  switch back to reporting the time-based rate limits.
Additionally, the `X-Rate-Limit-Reset` time for concurrent rate limits is only a suggestion. There's no guarantee that enough requests will complete to stop exceeding the concurrent rate limit at the time indicated.

### Example Rate Limit Header with Org-Wide Rate Limit

This example shows the relevant portion of a rate limit header being returned with  for a request that hasn't exceeded the org-wide rate limit for the `/api/v1/users` endpoint:

```http
HTTP/1.1 200
Date: Tue, 27 Jan 2018 21:33:25 GMT
X-Rate-Limit-Limit: 600
X-Rate-Limit-Remaining: 598
X-Rate-Limit-Reset: 1516308901
```

The following example show a rate limit header being returned for a request that has exceeded the rate limit for the `/api/v1/users` endpoint:

```http
HTTP/1.1 429
Date: Tue, 27 Jan 2018 21:33:25 GMT
X-Rate-Limit-Limit: 600
X-Rate-Limit-Remaining: 0
X-Rate-Limit-Reset: 1516308966
```

### Example Rate Limit Header with Concurrent Rate Limit

This example shows the relevant portion of a rate limit header being returned with the error for a request that exceeded the concurrent rate limit. If the rate limit wasn't being exceeded, the headers would contain information about the org-wide rate limit. You won't ever see non-error concurrent rate limits in the headers.

```http
HTTP/1.1 429
Date: Tue, 26 Jan 2018 21:33:25 GMT
X-Rate-Limit-Limit: 0
X-Rate-Limit-Remaining: 0
X-Rate-Limit-Reset: 1506461721
```

The first two header values are always `0` for concurrent rate limit errors.
The third header reports an estimated time interval when the concurrent rate limit may be resolved. It is not a guarantee.

The error condition resolves itself as soon as there is another concurrent thread available. Normally, no intervention is required. However, if you notice frequent bursts of 429 errors, or if the concurrent rate limit isn't quickly resolved, you may be exceeding the concurrent rate limit. If you can't identify what is causing you to exceed the limit by examining activity in the log before the burst of 429 errors are logged, contact [Support](https://support.okta.com/help/open_case).


### Example Error Response Events for Concurrent Rate Limit

```json
{
    "eventId": "tevEVgTHo-aQjOhd1OZ7QS3uQ1506395956000",
    "sessionId": "102oMlafQxwTUGJMLL8FhVNZA",
    "requestId": "reqIUuPHG7ZSEuHGUXBZxUXEw",
    "published": "2018-01-26T03:19:16.000Z",
    "action": {
      "message": "Too many concurrent requests in flight",
      "categories": [],
      "objectType": "core.concurrency.org.limit.violation",
      "requestUri": "/report/system_log"
    },
    "actors": [
      {
        "id": "00uo7fD8dXTeWU3g70g3",
        "displayName": "Test User",
        "login": "test-user@test.net",
        "objectType": "User"
      },
      {
        "id": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
        "displayName": "CHROME",
        "ipAddress": "127.0.0.1",
        "objectType": "Client"
      }
    ],
    "targets": []
  }
```

### Example Error Response in System Log API (Beta) for Concurrent Rate Limit

```json
{
    "actor": {
        "alternateId": "test.user@test.com",
        "detailEntry": null,
        "displayName": "Test User",
        "id": "00u1qqxig80SMWArY0g7",
        "type": "User"
    },
    "authenticationContext": {
        "authenticationProvider": null,
        "authenticationStep": 0,
        "credentialProvider": null,
        "credentialType": null,
        "externalSessionId": "trs2TSSLkgWR5iDuebwuH9Vsw",
        "interface": null,
        "issuer": null
    },
    "client": {
        "device": "Unknown",
        "geographicalContext": null,
        "id": null,
        "ipAddress": "4.15.16.10",
        "userAgent": {
            "browser": "UNKNOWN",
            "os": "Unknown",
            "rawUserAgent": "Apache-HttpClient/4.5.2 (Java/1.7.0_76)"
        },
        "zone": "null"
    },
    "debugContext": {
        "debugData": {
            "requestUri": "/api/v1/users"
        }
    },
    "displayMessage": "Too many requests in flight",
    "eventType": "core.concurrency.org.limit.violation",
    "legacyEventType": "core.concurrency.org.limit.violation",
    "outcome": null,
    "published": "2018-01-26T20:21:32.783Z",
    "request": {
        "ipChain": [
            {
                "geographicalContext": null,
                "ip": "4.15.16.10",
                "source": null,
                "version": "V4"
            },
            {
                "geographicalContext": null,
                "ip": "52.22.142.162",
                "source": null,
                "version": "V4"
            }
        ]
    },
    "securityContext": {
        "asNumber": null,
        "asOrg": null,
        "domain": null,
        "isProxy": null,
        "isp": null
    },
    "severity": "INFO",
    "target": null,
    "transaction": {
        "detail": {},
        "id": "Wcq2zDtj7xjvEu-gRMigPwAACYM",
        "type": "WEB"
    },
    "uuid": "dc7e2385-74ba-4b77-827f-fb84b37a4b3b",
    "version": "0"
}
```

## Requesting Exceptions

You can request a temporary rate limit increase. For example, if you are importing a large number of users and groups you may need a temporary rate limit increase.

To request an exception, contact [Support](https://support.okta.com/help/open_case) 10 days before you need the increase, and provide the following details:

* Your Org Name: the entire URL, for example `https://cloudcompany.okta.com` or `https://unicorn.oktapreview.com`
* Endpoints and rates: the URI that need to have their limits increased and how much of an increase is required
* Start date and time
* End date and time
* Business justification: why you need the temporary increase

If you have an application that requires sustained rate limits higher than the posted limits, please consult an Okta Sales Representative for more options.

## Previous Rate Limits

These are the rate limits for orgs created before 2018-05-17.

### High Capacity Rate Limits

If your needs exceed Okta's rate limits, you can purchase the "High Capacity Rate Limit" add-on. Customers who purchase the "High Capacity Rate Limit" add-on service may not use the service in excess of the "static" rate limit, as set forth in the table below.  If Okta makes any change to the rate limit, such change will be communicated to customers via an updated version of this product documentation.

The following are the high capacity rate limits per minute that apply across the Okta API for these endpoints:

| Endpoint                                                                   | One App   | Enterprise   |
| -------------------------------------------------------------------------- | --------- | ------------ |
| `/oauth2/{authorizationServerId}/v1`                                       | 3000      | 6000         |
| `/oauth2/v1` except `/oauth2/v1/clients`                                   | 3000      | 6000         |
| `/api/v1`                                                                  | 1500      | 3000         |
| `/api/v1/sessions`                                                         | 1500      | 3000         |
| `/app/template_saml_2_0/{key}/sso/saml`                                    | 1500      | 3000         |
| `/app/{app}/{key}/sso/saml`                                                | 1500      | 3000         |
| `/api/v1/groups/{id}`                                                      | 1500      | 3000         |
| `/api/v1/users/{id}`                                                       | 1500      | 3000         |
| `/api/v1/users/{idOrLogin}` (only `GET`)                                   | 1500      | 5000         |
| `/api/v1/authn`                                                            | 1500      | 3000         |
| `/api/plugin/{protocolVersion}/form-creds/{appUserIds}/{formSiteOption}`   | 1500      | 3000         |
| `/api/v1/authn/factors/{factorIdOrFactorType}/verify`                      | 1500      | 3000         |
| `/api/v1/apps/{id}`                                                        | 1500      | 3000         |
| `/bc/image/fileStoreRecord`                                                | 1500      | 3000         |
| `/bc/globalFileStoreRecord`                                                | 1500      | 3000         |

If your usage needs exceed the rate limits applicable to the "High Capacity Rate Limit" add-on service, please contact your Okta Sales Representative regarding other options.

### Org-Wide Rate Limits (Legacy Orgs)

Extensions to the base URLs listed below are included in the specified limit, unless the URL is followed by "only." For example, `/api/v1/apps/{id}` has a per-minute rate limit of `500` as listed in the second line in the table. However, `/api/v1/apps/{id}/users` falls under the more general first line of the table. This pattern applies to all the URLs.

| Action                                    | Okta API Endpoint                                                       | Per Minute Limit (Older Orgs) |
| :---------                                | :--------------------------------------------------------------         | -----------------------:      |
| Create or list applications               | `/api/v1/apps`   except `/api/v1/apps/{id}`                             | 100                           |
| Get, update, or delete an application     | `/api/v1/apps/{id}` only                                                | 500                           |
| Authenticate different end users          | `/api/v1/authn`                                                         | 500                           |
| Creating or listing groups                | `/api/v1/groups` except  `/api/v1/groups/{id}`                          | 500                           |
| Get, update, or delete a group            | `/api/v1/groups/{id}` only                                              | 1000                          |
| Get System Log data                       | `/api/v1/logs`                                                          | 120                           |
| Get session information                   | `/api/v1/sessions`                                                      | 750                           |
| Create or list users                      | `/api/v1/users` except `/api/v1/users/{id}` and `/api/v1/users/{login}` | 600                           |
| Get a user by user ID or login (combined) | `/api/v1/users/{id}` or `/api/v1/users/{login}`  only                   | 2000                          |
| Get my user                               | `/api/v1/users/me`                                                      | 1000                          |
| Update or delete a user by ID             | `/api/v1/users/{id}` only                                               | 600                           |
| Create an org (ISVs only)                 | `/api/v1/orgs`                                                          | 50                            |
| All other actions                         | `/api/v1/`                                                              | 1000                          |

### Concurrent Rate Limits (Legacy Orgs)

For legacy orgs, the limit is 75 concurrent transactions.

### Home Page Endpoint Limits (Legacy Orgs)

The following endpoints are used by the Okta home page for authentication and sign on, and have org-wide rate limits:

| Okta Home Page Endpoints                                                | Per-Minute Limit |
| :-----------------------------------------                              | ------:          |
| `/app/{app}/{key}/sso/saml`                                             | 750              |
| `/app/office365/{key}/sso/wsfed/active`                                 | 1000             |
| `/app/office365/{key}/sso/wsfed/passive`                                | 250              |
| `/app/template_saml_2_0/{key}/sso/saml`                                 | 2500             |
| `/login/do-login`                                                       | 200              |
| `/login/login.htm`                                                      | 850              |
| `/login/sso_iwa_auth`                                                   | 500              |
| `/api/plugin/{protocolVersion}/form-cred/{appUserIds}/{formSiteOption}` | 650              |
| `/api/plugin/{protocolVersion}/sites`                                   | 150              |
| `/bc/fileStoreRecord`                                                   | 500              |
| `/bc/globalFileStoreRecord`                                             | 500              |


## Okta-Generated Email Message Rate Limits

Limits are applied on a per-recipient basis and vary by email-type. The limit for some email types is no more than 30 emails per-recipient, per-minute, while other email types are configured with higher limits. These limits protect your org against denial-of-service attacks and help ensure that adequate resources are available for all customers.
