---
title: System Log Event Guidance for Rate Limiting
category: rate limits
---

Okta supports a few standard System Log events for your use with rate limiting. If you are implementing anything that can reject an operation within Okta because it has exceeded a [rate limit](/docs/reference/rate-limits/) (attempts per unit time), then use these standard System Log event types. This also applies to auxiliary events that may represent actions that modify the conditions under which an operation would be rejected.

The HTML response code returned when rejected should be HTTP 429.

## System Log event types for rate limits

The following rate limit System Log events are supported:

* `system.operation.rate_limit.violation`<br>
Emit this event type once per rate limiting period when rejecting a request for exceeding a rate limit. For example, if a client exceeds their calls per minute quota, then you should emit one event within that window maximum.

* `system.operation.rate_limit.warning`<br>
If you want to warn the caller that some significant portion of their rate limit has already been used within a period, you may also emit this event type once per rate limiting period. For example, you warn the customer that 60% of their daily limit for event delivery has been reached.

* `system.operation.rate_limit.notification`<br>
If you want to provide additional information about rate limiting decisions you may emit this event type. For example, Elastic Rate Limiting (ERL) was activated for a customer within a rate limiting period, or a violation event would have been emitted if the customer had a different configuration.

## DebugContext object

For some types of events, the fields provided in other response objects aren't sufficient to adequately describe the operations that the event has performed. In such cases, the [DebugContext](/docs/reference/api/system-log/#debugcontext-object) object provides a way to store additional information.

## Rate limit DebugContext object properties

The following table describes the rate limit information that is returned in the DebugContext object.

> **Important:** The information contained in `debugContext.debugData` is intended to add context when troubleshooting customer platform issues. Note that both key names and values may change from release to release and aren't guaranteed to be stable. Therefore, they shouldn't be viewed as a data contract but as a debugging aid instead.

| Property                           | Type        | Description                                                                                                       |
| ---------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `operationRateLimitScopeType`      |             | The type of rate limit scope effected. Example scopes: `org`, `user`, `application`                                                                       |
| `operationRateLimitSecondsToReset` |             | The number of seconds until the rate limit resets.  |
| `operationRateLimitSubtype`        |             | The subtype of the rate limit event effected. Example subtypes: `email`, `phone`, `rsa_token`                      |
| `operationRateLimitThreshold`      |             | The relevant numerical limit that this event is associated with |
| `operationRateLimitTimeSpan`       |             | The amount of time before the rate limit resets ??Is this in minute or seconds?? |
| `operationRateLimitTimeUnit`       |             | The reset interval in minutes, seconds, and so on |                                                                   |
| `operationRateLimitType`           |             | The type of rate limit event effected. Example types: `web_request`, `authenticator_otp_verification`, `sms_factor_enroll`, `event_hook_delivery`, `elastic_rate_limit_activated`, `phone_enrollment` |

> **Note:** You may need to include additional information for some events, such as the Notification event type. For example:
> For Notification:
>
> * ERL activation might show which multiplier is being applied
> * A preview-type event might contain a link to where the admin can toggle some behavior
>
> For Warning:
> The event should include the threshold % that is being used to trigger the warning
>

## DebugContext object examples

The following is an example System Log rate limit event where too many enrollment attempts for the SMS factor were made.

```json
{
  "actor": {
    "id": "00uw8nGF9OiREtZyr0g3",
    "type": "User",
    "alternateId": "oie-u1@oie.okta1.com",
    "displayName": "oie1 oie1",
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
        "lat": 37.74,
        "lon": -122.39999999999999
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
    "externalSessionId": "1025poeucCTQVK22GxJEK1Y-g"
  },
  "displayMessage": "Operation rate limit violation",
  "eventType": "system.operation.rate_limit.violation",
  "outcome": {
    "result": "DENY",
    "reason": "Too many enrollment attempts for SMS factor"
  },
  "published": "2020-12-10T04:46:12.033Z",
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
      "operationRateLimitSubtype": "SMS",
      "operationRateLimitTimeUnit": "MINUTES",
      "operationRateLimitScopeType": "user",
      "operationRateLimitSecondsToReset": "99",
      "operationRateLimitThreshold": "15",
      "operationRateLimitTimeSpan": "5",
      "requestUri": "/api/v1/authn/factors",
      "url": "/api/v1/authn/factors?updatePhone=true",
      "phoneNumber": "+14037894561",
      "authnRequestId": "reqWXOTNi2FQV6sUFQxWGCf8A",
      "countryCallingCode": "1",
      "requestId": "reqS9xgtpvOTcukX8Yu-SLRDQ",
      "threatSuspected": "false",
      "operationRateLimitType": "phone_enrollment"
    }
  },
  "legacyEventType": null,
  "transaction": {
    "type": "WEB",
    "id": "reqS9xgtpvOTcukX8Yu-SLRDQ",
    "detail": {}
  },
  "uuid": "a0b60b8a-3aa2-11eb-8d69-abfc0c06b0f7",
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
      "id": "SMS",
      "type": "Factor Type",
      "alternateId": null,
      "displayName": null,
      "detailEntry": null
    },
    {
      "id": "/api/v1/authn/factors",
      "type": "URL Pattern",
      "alternateId": null,
      "displayName": null,
      "detailEntry": null
    }
  ]
}
```

The following is an example System Log rate limit event where too many OTP verification attempts were made for the Email factor.

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
