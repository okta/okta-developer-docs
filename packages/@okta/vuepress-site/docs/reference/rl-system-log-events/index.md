---
title: System Log event guidance for rate limiting
category: rate limits
---

# System Log event guidance for rate limiting

Okta offers standard System Log event types for rate limits. If you are implementing anything that can reject an operation within Okta because it has exceeded a [rate limit](/docs/reference/rate-limits/) (attempts per unit time), then use these event types. ??This also applies to auxiliary events that may represent actions that modify the conditions under which an operation would be rejected.??

The response code returned when rejected should be HTTP 429.

## System Log event types for rate limiting

* `system.operation.rate_limit.violation`

Emit this event type once per rate limiting period when rejecting a request for exceeding a rate limit.

For example, If a client exceeds their calls per minute quota, then you should emit one event within that window maximum.

* `system.operation.rate_limit.warning`

If you want to warn the caller that some significant portion of their rate limit has already been used within a period, you may also emit this event type once per rate limiting period.

For example, you warn the customer that 60% of their daily limit for event delivery has been reached.

* `system.operation.rate_limit.notification`

If you want to provide additional information about rate limiting decisions you may emit this event type.

For example, Elastic Rate Limiting (ERL) was activated for a customer within a rate limiting period, or a violation event would have been emitted if the customer had a different configuration.

## DebugContext object

For some types of rate limit events, the fields provided in other response objects aren't sufficient to adequately describe the operations that the event has performed. In such cases, the `debugContext` object provides a way to store additional information.



## DebugContect object properties

As part of the Debug Context of the event, all events must include the following information:

| Property                           | Type          | Description                                                                                                              |
| ---------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `operationRateLimitType`           |               | Example types: `web_request`, `authenticator_otp_verification`, `sms_factor_enroll`, `event_hook_delivery`, `elastic_rate_limit_activated`    |
| `operationRateLimitSubtype`        |               | Example subtypes: `email`, `phone`, `rsa_token` |
| `operationRateLimitScopeType`      |               | Example scope types: `org`, `user`, `application`                                                                    |
| `operationRateLimitThreshold`      |               | The relevant numerical limit that this event is associated with |
| `operationRateLimitTimeSpan`       |               | How often the limit resets                                                                   |
| `operationRateLimitTimeUnit`       |               | The reset interval in minutes, seconds, and so on.                                                                            |
| `operationRateLimitSecondsToReset` |               | The number of seconds until the limit resets. Some events, most likely the notification type, need to include additional information. |
| `requestId`| | |
| `requestUri` | | |
| `threatSuspected` | | |
| `url` | | |

### DebugContext object examples

The following is an example of an event where ??there were too many OTP verification attempts for the Email factor??:

```json
```

The following is an example of an event where there were too many OTP verification attempts for the Email factor:

```json
{
  "actor": {
    "id": "00u177cNaulNGQ8uT0g4",
    "type": "User",
    "alternateId": "dave@ad.oktatest.com",
    "displayName": "Dave Minion",
    "detailEntry": null
  },
  "client": {
    "userAgent": {
      "rawUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:83.0) Gecko/20100101 Firefox/83.0",
      "os": "Mac OS X",
      "browser": "FIREFOX"
    },
    "zone": "null",
    "device": "Computer",
    "id": null,
    "ipAddress": "127.0.0.1",
    "geographicalContext": {
      "city": null,
      "state": null,
      "country": null,
      "postalCode": null,
      "geolocation": {
        "lat": 37.62,
        "lon": -114.67
      }
    }
  },
  "authenticationContext": {
    "authenticationProvider": null,
    "credentialProvider": null,
    "credentialType": null,
    "issuer": null,
    "interface": null,
    "authenticationStep": 0,
    "externalSessionId": "trskkGZcEoXRb6cY4ZtJxfcAw"
  },
  "displayMessage": "Operation rate limit violation",
  "eventType": "system.operation.rate_limit.violation",
  "outcome": {
    "result": "DENY",
    "reason": "Too many OTP verification attempts for Email factor"
  },
  "published": "2020-12-09T19:13:41.976Z",
  "securityContext": {
    "asNumber": null,
    "asOrg": null,
    "isp": null,
    "domain": null,
    "isProxy": null
  },
  "severity": "WARN",
  "debugContext": {
    "debugData": {
      "operationRateLimitSubtype": "Email",
      "operationRateLimitTimeUnit": "MINUTES",
      "operationRateLimitScopeType": "User",
      "operationRateLimitSecondsToReset": "282",
      "requestId": "reqAp3j9gGSRYK-0QnLu-KCzg",
      "operationRateLimitThreshold": "5",
      "operationRateLimitTimeSpan": "5",
      "requestUri": "/idp/idx/challenge/answer",
      "threatSuspected": "false",
      "operationRateLimitType": "authenticator_otp_verification",
      "url": "/idp/idx/challenge/answer?"
    }
  },
  "legacyEventType": null,
  "transaction": {
    "type": "WEB",
    "id": "reqAp3j9gGSRYK-0QnLu-KCzg",
    "detail": {}
  },
  "uuid": "a67b4d9d-3a52-11eb-bf93-a70040ee6585",
  "version": "0",
  "request": {
    "ipChain": [
      {
        "ip": "127.0.0.1",
        "geographicalContext": null,
        "version": "V4",
        "source": null
      }
    ]
  },
  "target": [
    {
      "id": "eae177dD0xPmbH7DE0g4",
      "type": "Authenticator",
      "alternateId": null,
      "displayName": null,
      "detailEntry": null
    }
  ]
}
```