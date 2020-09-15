---
title: Rate Limit best practices
excerpt: >-
  Understand rate limit best practices at Okta and learn how to design for efficient use of
  resources
---

## Rate Limit Best Practices

In this section, you learn how to check your rate limits and request exceptions.

### Check Your Rate Limits with Okta's Rate Limit Headers

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

#### Example Rate Limit Header with Org-Wide Rate Limit

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

#### Example Rate Limit Header with Concurrent Rate Limit

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


#### Example Error Response Events for Concurrent Rate Limit

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

#### Example Error Response in System Log API (Beta) for Concurrent Rate Limit

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

### Request Exceptions

You can request a temporary rate limit increase. For example, if you are importing a large number of users and groups you may need a temporary rate limit increase.

To request an exception, contact [Support](https://support.okta.com/help/open_case) 10 days before you need the increase, and provide the following details:

* Your Org Name: the entire URL, for example `https://cloudcompany.okta.com` or `https://unicorn.oktapreview.com`
* Endpoints and rates: the URI that need to have their limits increased and how much of an increase is required
* Start date and time
* End date and time
* Business justification: why you need the temporary increase

If you have an application that requires sustained rate limits higher than the posted limits, please consult an Okta Sales Representative for more options.