---
title: System Log events for rate limits
category: rate limits
---

# System Log events for rate limits

## System Log event types

### Web request rate limit (org level)

The following org-based System Log events record system events related to your organization to provide an audit trail that you can use to understand platform activity and to diagnose problems.

* [`system.org.rate_limit.warning`](/docs/reference/api/event-types/?q=system.org.rate_limit.warning)<br>
This event is sent when an endpoint is nearing its rate limit.

* [`system.org.rate_limit.violation`](/docs/reference/api/event-types/?q=system.org.rate_limit.violation)<br>
This event is sent when an endpoint is exceeding its rate limit.

* [`core.concurrency.org.limit.violation`](/docs/reference/api/event-types/?q=core.concurrency.org.limit.violation)<br>
This event is sent when a request is exceeding the org's allotted concurrent limit.

### Web request rate limit (client level)

The following client-based System Log events are fired when an individual client exceeds its assigned limit for the OAuth `/authorize` endpoint. The event that fires depends on the client-based rate limit mode that is set:

* [`system.client.rate_limit.violation`](/docs/reference/api/event-types/?q=system.client.rate_limit.violation)<br>
This event is fired when the framework is in **Enforce and log per client** mode and a specific client, IP address, or device identifier combination exceeds the total limit of 60 requests per minute. The System Log contains information about the client ID, IP address, device identifier, and the actual user if the user already has a valid session.

* [`system.client.concurrency_rate_limit.violation`](/docs/reference/api/event-types/?q=system.client.concurrency_rate_limit.violation)<br>
This event is fired when the framework is in **Enforce and log per client** mode and a specific client, IP address, or device identifier combination makes more than two concurrent requests. The System Log contains information about the client ID, IP address, device identifier, and the actual user if the user already has a valid session.

* [`system.client.rate_limit.notification`](/docs/reference/api/event-types/?q=system.client.rate_limit.notification)<br>
This event is fired when the framework is in **Log per client** mode and a specific client, IP address, or device identifier combination exceeds the total limit of 60 requests per minute. However, the end user won't see a rate limit violation. Okta fires only a `notification` System Log event. The System Log contains information about the client ID, IP address, device identifier, and the actual user if the user already has a valid session.

* [`system.client.concurrency_rate_limit.notification`](/docs/reference/api/event-types/?q=system.client.concurrency_rate_limit.notification)<br>
This event is fired when the framework is turned on in **Log per client** mode and a specific client, IP address, Device token combination makes more than two concurrent requests. However, the end user won't see a rate limit violation. Okta fires only a `notification` System Log event. The System Log contains information about the client ID, IP address, Device identifier, and the actual user if the user already has a valid session.

### Operation rate limits

Some rate limits are enforced on specific actions within Okta, regardless of which API is called to invoke the action. For example, though there are multiple ways to initiate an SMS to a user, there may be a limit on how many are sent out, regardless of which API requests has been made to initiate the messages. The following event types may appear in these varying cases:

* [`system.operation.rate_limit.violation`](/docs/reference/api/event-types/?q=system.operation.rate_limit.violation)<br>
This event type is sent once per rate limit period when a request or action is rejected for exceeding a rate limit. For example, if the rate limit that was exceeded has a reset period of one minute, then one event of this type is emitted during that period for the applicable scope.

* [`system.operation.rate_limit.warning`](/docs/reference/api/event-types/?q=system.operation.rate_limit.warning)<br>
This event type may be sent once per rate limit period as a warning that some significant portion of your rate limit has already been used within a period. For example, you might receive a warning that you have reached 60% of your rate limit for an endpoint within a rate limit period.

* `system.operation.rate_limit.notification`<br>
This event type can provide additional information about rate limit decisions. For example, this event might indicate that a violation event would have been emitted for a specific client rather than for a broader scope if you had chosen a different configuration.

#### DebugContext object for operation rate limits

For some event types, the fields provided in other response objects aren't sufficient to adequately describe the operations that the event has performed. In such cases, the [DebugContext](/docs/reference/api/system-log/#debugcontext-object) object provides a way to store additional information.

#### DebugContext object properties for operation rate limits

The following table describes the rate limit information that is returned in the DebugContext object.

> **Important:** The information contained in `debugContext.debugData` is intended to add context when troubleshooting customer platform issues. The key names and values in the following table are standard properties for rate limit events. However, other properties may be included in the DebugContext object, for example: `countryCallingCode`. These types of event-specific properties may change from release to release and aren't guaranteed to be stable. Therefore, they shouldn't be viewed as a data contract but as a debugging aid instead.

> **Note:** The `profile_reload` type is only available for Okta Identity Engine.

| Property                           | Type   | Description                                                                                                       |
| ---------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| `operationRateLimitScopeType`      | String | The type of rate limit scope affected. Example scopes: `org` or `user`                                            |
| `operationRateLimitSecondsToReset` | String | The number of seconds that remain until the current rate limit period ends                                     |
| `operationRateLimitSubtype`        | String | The [Subtype](#operation-rate-limit-subtypes) of the rate limit event affected. Example Subtypes: `Email`, `SMS`, `Voice call`|
| `operationRateLimitThreshold`      | String | The relevant numerical limit that this event is associated with                                                   |
| `operationRateLimitTimeSpan`       | String | The amount of time before the rate limit resets                                                                   |
| `operationRateLimitTimeUnit`       | String | Indicates the reset interval for `operationRateLmitTimeSpan` in minutes or seconds                                |
| `operationRateLimitType`           | String | The type of rate limit event affected. Example types: `web_request`, `authenticator_otp_verification`, `sms_factor_enroll`, `event_hook_delivery`, `elastic_rate_limit_activated`, `phone_enrollment`, `profile_reload`, and so on|

> **Note:** Additional information for some events may be included in the DebugContext object, such as for the Notification or Warning event types. For example:<br>
> **For Notification event types**<br>
> A preview-type event might contain a link to where you can toggle some behavior
>
> **For Warning event types**<br>
> The event might include the threshold % that is being used to trigger the warning<br>
>

#### DebugContext object examples for operation rate limits

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

The following is an example of a System Log rate limit event for too many profile reload attempts through Active Directory or LDAP agent.

> **Note:** This event is valid for Okta Identity Engine only.

```json
{
        "actor": {
            "id": "00u1ngpFSRLFie7vT0g4",
            "type": "User",
            "alternateId": "john.smith@example.com",
            "displayName": "John Smith",            
            "detailEntry": null
        },
        "client": {
            "userAgent": {
                "rawUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51",
                "os": "Mac OS X",
                "browser": "CHROMIUM_EDGE"
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
                    "lat": 36.62,
                    "lon": -113.17
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
            "externalSessionId": "idx3GDqJrIfQhCRJTEuNC-l9A"
        },
        "displayMessage": "Operation rate limit violation",
        "eventType": "system.operation.rate_limit.violation",
        "outcome": {
            "result": "DENY",
            "reason": "Profile reload for john.smith@example.com skipped due to rate limiting"
        },
        "published": "2021-05-14T20:42:21.480Z",
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
                "operationRateLimitTimeUnit": "MINUTES",
                "operationRateLimitScopeType": "user",
                "deviceFingerprint": "3857b18395b101c0703feec226def544",
                "operationRateLimitSecondsToReset": "96",
                "requestId": "reqmXZkOgXpQdms4-3a8eD9mg",
                "operationRateLimitThreshold": "1",
                "operationRateLimitTimeSpan": "5",
                "requestUri": "/idp/idx/identify",
                "operationRateLimitType": "profile_reload",
                "operationRateLimitSubtype": "AD agent",
                "url": "/idp/idx/identify?"
            }
        },
        "legacyEventType": null,
        "transaction": {
            "type": "WEB",
            "id": "reqmXZkOgXpQdms4-3a8eD9mg",
            "detail": {}
        },
        "uuid": "e19832a2-b4f4-11eb-9f1e-bba1874b8f01",
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
                "id": "00u1ngpFSRLFie7vT0g4",
                "type": "User",
                "alternateId": "john.smith@example.com",
                "displayName": "John Smith",
                "detailEntry": null
            }
        ]
    }
```

#### Operation rate limit subtypes

The following table includes the available `Subtypes` for operation rate limits.

> **Note:** The `AD agent` and `LDAP agent` subtypes are only available for Okta Identity Engine.

| Subtype           | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `Email`           | The user exceeded their limit for sending email messages            |
| `SMS`             | The user exceeded their limit for sending SMS                       |
| `Voice call`      | The user exceeded their limit for sending voice-call messages       |
| `AD agent`        | The user exceeded their limit for profile reload via AD agent       |
| `LDAP agent`      | The user exceeded their limit for profile reload via LDAP agent     |
