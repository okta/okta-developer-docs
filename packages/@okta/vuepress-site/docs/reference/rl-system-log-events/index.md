---
title: System Log events for rate limits
category: rate limits
---

# System Log events for rate limits

Okta offers three standard System Log event types that you may encounter when Okta is enforcing [rate limits](/docs/reference/rate-limits/) on specific operations.

* `system.operation.rate_limit.violation`<br>
This event type is sent once per rate limiting period when a request is rejected for exceeding a rate limit. For example, if the rate limit that was exceeded has a reset period of one minute, then one event of this type is emitted during that period for the applicable scope.

* `system.operation.rate_limit.warning`<br>
This event type may be sent once per rate limiting period as a warning that some significant portion of your rate limit has already been used within a period. For example, you might receive a warning that you have reached 60% of your rate limit for an endpoint within a rate limiting period.

* `system.operation.rate_limit.notification`<br>
This event type can provide additional information about rate limiting decisions. For example, this event might indicate that a violation event would have been emitted for a specific client rather than for a broader scope if you had chosen a different configuration.

Additionally, there are specific [org-based System Log events](/docs/reference/api/system-log/#system-events) and [client-based System Log events](/docs/reference/rl-clientbased/#system-log-events). The org-based System Log events record system events related to your organization to provide an audit trail that you can use to understand platform activity and to diagnose problems. Client-based System Log events are fired when an individual client exceeds its assigned limit for the OAuth `/authorize` endpoint. Which event fired depends on the client-based rate-limiting mode that is set.

## DebugContext object

For some event types, the fields provided in other response objects aren't sufficient to adequately describe the operations that the event has performed. In such cases, the [DebugContext](/docs/reference/api/system-log/#debugcontext-object) object provides a way to store additional information.

## DebugContext object properties for rate limiting

The following table describes the rate limit information that is returned in the DebugContext object.

> **Important:** The information contained in `debugContext.debugData` is intended to add context when troubleshooting customer platform issues. The key names and values in the following table are standard properties for rate limit events. However, other properties may be included in the DebugContext object, for example: `countryCallingCode`. These types of event-specific properties may change from release to release and aren't guaranteed to be stable. Therefore, they shouldn't be viewed as a data contract but as a debugging aid instead.

| Property                           | Type   | Description                                                                                                       |
| ---------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| `operationRateLimitScopeType`      | String | The type of rate limit scope affected. Example scopes: `org` or `user`                                            |
| `operationRateLimitSecondsToReset` | String | The number of seconds that remain until the current rate limiting period ends                                     |
| `operationRateLimitSubtype`        | String | The subtype of the rate limit event affected. Example subtypes: `email`, `phone`, `rsa_token`                     |
| `operationRateLimitThreshold`      | String | The relevant numerical limit that this event is associated with                                                   |
| `operationRateLimitTimeSpan`       | String | The amount of time before the rate limit resets                                                                   |
| `operationRateLimitTimeUnit`       | String | Indicates the reset interval for `operationRateLmitTimeSpan` in minutes or seconds                                |
| `operationRateLimitType`           | String | The type of rate limit event affected. Example types: `web_request`, `authenticator_otp_verification`, `sms_factor_enroll`, `event_hook_delivery`, `elastic_rate_limit_activated`, `phone_enrollment`, and so on|

> **Note:** Additional information for some events may be included in the DebugContext object, such as for the Notification or Warning event types. For example:<br>
> **For Notification event types**<br>
> A preview-type event might contain a link to where you can toggle some behavior
>
> **For Warning event types**<br>
> The event might include the threshold % that is being used to trigger the warning<br>
>

## DebugContext object examples

The following is an example System Log rate limit event where too many enrollment attempts for the SMS factor were made.

```json
{
  "actor": {
    "id": "00uw8nGF9OiREtZyr0g3",
    "type": "User",
    "alternateId": "john.smith@example.com",
    "displayName": "John Smith",
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
      "phoneNumber": "+1555555555",
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

> **Note:** This event is valid with Identity Experience flows only.

```json
{
  "actor": {
    "id": "00u177cNaulNGQ8uT0g4",
    "type": "User",
    "alternateId": "john.smith@example.com",
    "displayName": "John Smith",
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
