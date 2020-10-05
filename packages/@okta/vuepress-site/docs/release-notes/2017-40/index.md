---
title: Okta API Products Release Notes
excerpt: Summary of changes to the Okta API since Release 2017.38
---

## 2017.40

### API Feature Enhancements

| Feature Enhancement                                                                   | Expected in Preview Orgs | Expected in Production Orgs |
|:--------------------------------------------------------------------------------------|:-------------------------|:----------------------------|
|[Concurrent Rate Limits](#concurrent-rate-limits)                                     | October 4, 2017          | October 9, 2017             |
|[OpenID Connect Scope Change](#openid-connect-scope-change)               | October 4, 2017          | October 9, 2017             |
|[Help Desk Administrator Role Generally Available](#help-desk-administrator-role-generally-available) | October 4, 2017          | October 9, 2017             |
|[Policy API](#policy-api)                                                             | September 7, 2017        | October 9, 2017             |
|[Password Policy API](#password-policy-api)                                           | September 7, 2017        | October 9, 2017             |


#### Concurrent Rate Limits
In order to protect the service for all customers, Okta enforces concurrent rate limits starting with this release.
Concurrent limits are distinct from [the org-wide, per-minute API rate limits](/docs/reference/rate-limits/#org-wide-rate-limits).

For concurrent rate limits, traffic is measured in three different areas. Counts in one area aren't included in counts for the other two:

* For agent traffic, Okta measured each org's traffic and set the limit above the highest usage in the last four weeks.
* For Office365 traffic, the limit is 75 concurrent transactions per org.
* For all other traffic including API requests, the limit is 75 concurrent transactions per org.

Okta has verified that these limits are sufficient based on current usage. As a result of verification, we increased the limit for some orgs to 150.

The first request to exceed the concurrent limit returns an HTTP 429 error, and the first error every sixty seconds is written to the log.
Reporting concurrent rate limits once a minute keeps log volume manageable.

##### Example Error Response Events

```json
{
    "eventId": "tevEVgTHo-aQjOhd1OZ7QS3uQ1506395956000",
    "sessionId": "102oMlafQxwTUGJMLL8FhVNZA",
    "requestId": "reqIUuPHG7ZSEuHGUXBZxUXEw",
    "published": "2017-09-26T03:19:16.000Z",
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

##### Example Error Response for System Log API (Beta)

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
        "published": "2017-09-26T20:21:32.783Z",
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

##### Example Rate Limit Header with Concurrent Rate Limit Error

This example shows the relevant portion of a rate limit header being returned with the error for a request that exceeded the concurrent rate limit.
```http

HTTP/1.1 429
Date: Tue, 26 Sep 2017 21:33:25 GMT
X-Rate-Limit-Limit: 0
X-Rate-Limit-Remaining: 0
X-Rate-Limit-Reset: 1506461721

```

Notice that instead of the typical counts for time-based rate limits, when a request exceeds the limit for concurrent requests,
`X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Reset` report the concurrent values instead.
When the number of unfinished requests is below the concurrent rate limit, request headers will switch back to reporting the time-based rate limits.

The `X-Rate-Limit-Reset` time for concurrent rate limits is only a suggestion. There's no guarantee that enough requests will complete to stop exceeding the concurrent rate limit at the time indicated.

For more information, see developer documentation about [rate limit headers](/docs/reference/rate-limits/). <!-- OKTA-140976, OKTA-142995 -->

#### OpenID Connect Scope Change

We've changed the behavior of OpenID Connect scopes:

* OpenID Connect scopes are returned from requests to `/api/v1/authorizationServers/${authServerId}/scopes`.
* You can edit scope descriptions in the Okta user interface or via the API. <!--OKTA-136527 -->

#### Help Desk Administrator Role Generally Available

The Help Desk Administrator Role (`HELP_DESK_ADMIN`) is generally available via the [Roles API](/docs/reference/api/roles/#role-properties).
For information about this role, see the [in-app help](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_The_Help_Desk_Admin_Role). <!-- OKTA-141867 -->

#### Policy API

The Policy API enables an Administrator to perform policy and policy rule operations. The policy framework is used by Okta to control rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, and what types of self-service operations are permitted under various circumstances. For more information, see Okta's [API Reference](/docs/reference/api/policy/).

#### Password Policy API

The Password Policy type controls settings that determine a user's password length and complexity, as well as the frequency with which a password can be changed. This policy also governs the recovery operations that may be performed by the user, including change password, reset (forgot) password and self-service password unlock. For more information, see Okta's [API Reference](/docs/reference/api/policy/#GroupPasswordPolicy).
