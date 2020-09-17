---
title: System Log
category: management
---

# System Log API

The Okta System Log records system events related to your organization in order to provide an audit trail that can be used to understand platform activity and to diagnose problems.

The Okta System Log API provides near real-time read-only access to your organization's system log and is the programmatic counterpart of the [System Log UI](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Reports_SysLog).

Often the terms "event" and "log event" are used interchangeably. In the context of this API, an "event" is an occurrence of interest within the system and "log" or "log event" is the recorded fact.

Notes on the System Log API:

* It contains much more [structured data](#logevent-object) than the [Events API](/docs/reference/api/events/#event-object).
* It supports additional [SCIM filters](#request-parameters) and the `q` query parameter, because of the presence of more structured data than the [Events API](/docs/reference/api/events/#request-parameters).
* Its primary supported use cases are:
  * Event data export into a security information and event management system (SIEM).
  * System monitoring.
  * Development debugging.
  * Event introspection and audit.
* It is not intended to be used as a Database as a Service (DBaaS), or otherwise directly serve data to downstream consumers without an intermediate data store.

For information on migrating from the Events API to the System Log API please see [Events API Migration](/docs/concepts/events-api-migration/).

## Getting Started

The System Log API has one endpoint:

<ApiOperation method="get" url="/api/v1/logs" />

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/54def5ab52f04b7e4011)

This collection resource is backed by a [LogEvent object](#logevent-object) and associated [event types](#event-types).

See [Examples](#examples) for ways you can use the System Log API. For common use cases see [Useful System Log Queries](https://support.okta.com/help/Documentation/Knowledge_Article/Useful-System-Log-Queries).

## LogEvent object

Each LogEvent object describes a single logged action or "event" performed by a set of actors for a set of targets.

### Example LogEvent object
```json
{
  "version": "0",
  "severity": "INFO",
  "client": {
    "zone": "OFF_NETWORK",
    "device": "Unknown",
    "userAgent": {
      "os": "Unknown",
      "browser": "UNKNOWN",
      "rawUserAgent": "UNKNOWN-DOWNLOAD"
    },
    "ipAddress": "12.97.85.90"
  },
  "actor": {
    "id": "00u1qw1mqitPHM8AJ0g7",
    "type": "User",
    "alternateId": "admin@tc1-trexcloud.com",
    "displayName": "John Fung"
  },
  "outcome": {
    "result": "SUCCESS"
  },
  "uuid": "f790999f-fe87-467a-9880-6982a583986c",
  "published": "2017-09-31T22:23:07.777Z",
  "eventType": "user.session.start",
  "displayMessage": "User login to Okta",
  "transaction": {
    "type": "WEB",
    "id": "V04Oy4ubUOc5UuG6s9DyNQAABtc"
  },
  "debugContext": {
    "debugData": {
      "requestUri": "/login/do-login"
    }
  },
  "legacyEventType": "core.user_auth.login_success",
  "authenticationContext": {
    "authenticationStep": 0,
    "externalSessionId": "1013FfF-DKQSvCI4RVXChzX-w"
  }
}
```

### LogEvent object Annotated Example

```html
{
"uuid": Randomly generated String, Required
"published": ISO8601 string for timestamp, Required
"eventType": String, Required
"version": String, Required
"severity": String, one of DEBUG, INFO, WARN, ERROR, Required
"legacyEventType": String, Optional
"displayMessage": String, Optional
"actor": { Object, Required
     "id": String, Required
     "type": String, Required
     "alternateId": String, Optional
     "displayName": String, Optional
     "detailEntry" = {
     String -> String/Resource Map
     }
},
"client": { Object, Optional
     "userAgent": { Object, Optional
          "rawUserAgent": String, Optional
          "os": String, Optional
          "browser": String, Optional
     },
     "geographicalContext": { Object, Optional
          "geolocation": { Object, Optional
               "lat":Double, Optional
               "lon": Double, Optional
          }
          "city": String, Optional
          "state": String, Optional
          "country": String, Optional
          "postalCode": String, Optional
     },
     "zone": String, Optional
     "ipAddress": String, Optional
     "device": String, Optional
     "id": String, Optional
},
"outcome": { Object, Optional
     "result": String, one of: SUCCESS, FAILURE, SKIPPED, ALLOW, DENY, CHALLENGE, UNKNOWN, Required
     "reason": String, Optional
},
"target": [ List of Objects of the form:
          {
               "id": String, Required
               "type": String, Required
               "alternateId": String, Optional
               "displayName": String, Optional
               "detailEntry" = {
                    String -> String/Resource Map
               }
     }
],
"transaction": { Object, Optional
     "id": String, Optional
     "type": String one of "WEB", "JOB", Optional
     "detail" = {
          String -> String/Resource Map
     }
},
"debugContext": { Object, Optional
     "debugData": {
          String -> String/Resource Map
          "requestUri": "/api/1/devtools/global/test/orgs/specific"
          "originalPrincipal": {
               "id": "00ujchcbjpltartYI0g3",
               "type": "User",
               "alternateId": "admin@saasure.com",
               "displayName": "Piras Add-min"
          },
     }
},
"authenticationContext": { Object, Optional
     "authenticationProvider": String one of OKTA_AUTHENTICATION_PROVIDER, ACTIVE_DIRECTORY, LDAP, FEDERATION,
            SOCIAL, FACTOR_PROVIDER, Optional
          "credentialProvider": String one of OKTA_CREDENTIAL_PROVIDER, RSA, SYMANTEC, GOOGLE, DUO, YUBIKEY, Optional
          "credentialType": String one of OTP, SMS, PASSWORD, ASSERTION, IWA, EMAIL, OAUTH2, JWT, CERTIFICATE, PRE_SHARED_SYMMETRIC_KEY, OKTA_CLIENT_SESSION, DEVICE_UDID, Optional
          "issuer": Object, Optional {
               "id": String, Optional
               "type": String Optional
          }
          "externalSessionId": String, Optional
          "interface": String, Optional i.e. Outlook, Office365, wsTrust
},
"securityContext": { Object, Optional
          "asNumber": Integer, Optional
          "asOrg": String, Optional
          "isp": String, Optional
          "domain": String, Optional
          "isProxy": Boolean, Optional
},
"request": { Object, Optional
          "ipChain": List of objects of the form [
              "ip": String, Optional
              "geographicalContext": { Object, Optional
                        "geolocation": { Object, Optional
                             "lat":Double, Optional
                             "lon": Double, Optional
                        }
                        "city": String, Optional
                        "state": String, Optional
                        "country": String, Optional
                        "postalCode": String, Optional
                   },
              "version": String, one of V4, V6 Optional
              "source": String, Optional
          ], Optional
}
```

### Attributes

LogEvent objects are read-only. The following properties are available:

| Property              | Description                                                                            | DataType                                                        | Nullable | Unique | Readonly | MinLength | MaxLength |
| -------               | ---------------------------------------------------------------------                  | --------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- |
| uuid                  | Unique identifier for an individual event                                              | String                                                          | FALSE    | TRUE   | TRUE     |           |           |
| published             | Timestamp when event was published                                                     | Date                                                            | FALSE    | FALSE  | TRUE     | 1         | 255       |
| eventType             | Type of event that was published                                                       | String                                                          | FALSE    | FALSE  | TRUE     | 1         | 255       |
| version               | Versioning indicator                                                                   | String                                                          | FALSE    | FALSE  | TRUE     | 1         | 255       |
| severity              | Indicates how severe the event is: `DEBUG`, `INFO`, `WARN`, `ERROR`                    | String                                                          | FALSE    | FALSE  | TRUE     | 1         | 255       |
| legacyEventType       | Associated Events API [Action `objectType`](/docs/reference/api/events/#action-objecttypes) attribute value | String                                     | TRUE     | FALSE  | TRUE     | 1         | 255       |
| displayMessage        | The display message for an event                                                       | String                                                          | TRUE     | FALSE  | TRUE     | 1         | 255       |
| actor                 | Describes the entity that performed an action                                          | [Actor object](#actor-object)                                   | TRUE     | FALSE  | TRUE     |           |           |
| client                | The client that requested an action                                                    | [Client object](#client-object)                                 | TRUE     | FALSE  | TRUE     |           |           |
| request               | The request that initiated an action                                                   | [Request object](#request-object)                               | TRUE     | FALSE  | TRUE     |           |           |
| outcome               | The outcome of an action                                                               | [Outcome object](#outcome-object)                               | TRUE     | FALSE  | TRUE     |           |           |
| target                | Zero or more targets of an action                                                      | Array of [Target object](#target-object)                        | TRUE     | FALSE  | TRUE     |           |           |
| transaction           | The transaction details of an action                                                   | [Transaction object](#transaction-object)                       | TRUE     | FALSE  | TRUE     |           |           |
| debugContext          | The debug request data of an action                                                    | [DebugContext object](#debugcontext-object)                     | TRUE     | FALSE  | TRUE     |           |           |
| authenticationContext | The authentication data of an action                                                   | [AuthenticationContext object](#authenticationcontext-object)   | TRUE     | FALSE  | TRUE     |           |           |
| securityContext       | The security data of an action                                                         | [SecurityContext object](#securitycontext-object)               | TRUE     | FALSE  | TRUE     |           |           |

> The actor and/or target of an event is dependent on the action performed. All events have actors but not all have targets.

> See [Event Correlation](#event-correlation) for more on `authenticationContext.externalSessionId` and `transaction.id`.

### Actor object

Describes the user, app, client, or other entity (actor) who performed an action on a target

| Property    | Description                                    | DataType            | Nullable |
| ----------- | ---------------------------------------------- | -----------------   | -------- |
| id          | ID of actor                                    | String              | FALSE    |
| type        | Type of actor                                  | String              | FALSE    |
| alternateId | Alternative ID of actor                        | String              | TRUE     |
| displayName | Display name of actor                          | String              | TRUE     |
| detail      | Details about actor                            | Map[String->Object] | TRUE     |

### Target object

The entity upon which an actor performs an action. Targets may be anything: an app user, a login token or anything else.

| Property    | Description                                                  | DataType            | Nullable |
| ----------- | ------------------------------------------------------------ | ---------------     | -------- |
| id          | ID of a target                                               | String              | FALSE    |
| type        | Type of a target                                             | String              | FALSE    |
| alternateId | Alternative id of a target                                   | String              | TRUE     |
| displayName | Display name of a target                                     | String              | TRUE     |
| detail      | Details about target                                         | Map[String->Object] | TRUE     |

```json
{
    "id": "00u3gjksoiRGRAZHLSYV",
    "displayName": "Jon Stewart",
    "alternateId": "00uKrs9rsRSAXN",
    "login": "jon@example.com",
    "type": "User"
}
```

### Client object

When an event is triggered by an HTTP request, the `client` object describes the [client](https://en.wikipedia.org/wiki/Category:Hypertext_Transfer_Protocol_clients) that issues that HTTP request. For instance, the web browser is the client when a user accesses Okta. When this request is received and processed, a login event is fired. When the event is not sourced to an HTTP request, such as in the case of an automatic update, the Client Object field is blank.

| Property            | Description                                                                                                                                                                                           | DataType                                                  | Nullable |
| ----------          | ------------------------------------------------------------------------------------------------------------------                                                                                    | ---------------                                           | -------- |
| id                  | For OAuth requests this is the id of the OAuth [client](https://tools.ietf.org/html/rfc6749#section-1.1) making the request. For SSWS token requests, this is the id of the agent making the request. | String                                                    | TRUE     |
| userAgent           | The [user agent](https://en.wikipedia.org/wiki/User_agent) used by an actor to perform an action                                                                                                      | [UserAgent object](#useragent-object)                     | TRUE     |
| geographicalContext | The physical location where the client made its request from                                                                                                                                          | [GeographicalContext object](#geographicalcontext-object) | TRUE     |
| zone                | The `name` of the [Zone](/docs/reference/api/zones/#ZoneModel) that the client's location is mapped to                                                                                                | String                                                    | TRUE     |
| ipAddress           | Ip address that the client made its request from                                                                                                                                                      | String                                                    | TRUE     |
| device              | Type of device that the client operated from (e.g. Computer)                                                                                                                                          | String                                                    | TRUE     |

### UserAgent object

"A user agent is software (a software agent) that is acting on behalf of a user." ([Wikipedia](https://en.wikipedia.org/wiki/User_agent))

In the Okta event data object, the UserAgent object provides specifications about the client software that makes event-triggering HTTP requests. User agent identification is often useful for identifying interoperability problems between servers and clients, and also for browser and operating system usage analytics.

| Property     | Description                                                                                                                                                                                                                                        | DataType       | Nullable |
| ------------ | -------------------------------------------------------------------------------------------------                                                                                                                                                  | -------------- | -------- |
| Browser      | If the client is a web browser, this field identifies the type of web browser (e.g. CHROME, FIREFOX)                                                                                                                                               | String         | TRUE     |
| OS           | The [Operating System](https://en.wikipedia.org/wiki/Operating_system) the client runs on (e.g. Windows 10)                                                                                                                                        | String         | TRUE     |
| RawUserAgent | A raw string representation of the user agent, formatted according to [section 5.5.3 of HTTP/1.1 Semantics and Content](https://tools.ietf.org/html/rfc7231#section-5.5.3). Both the `browser` and the `OS` fields can be derived from this field. | String         | TRUE     |

### Request object

The request object describes details related to the HTTP request that triggers this event, if available. When the event is not sourced to an http request, such as in the case of an automatic update on the Okta servers, the Request object will still exist, but the `ipChain` field will be empty.

| Property       | Description                                                                                                                                                                                                      | DataType                                | Nullable   |
| ------------   | -------------------------------------------------------------------------------------------------                                                                                                                | --------------                          | --------   |
| ipChain        | If the incoming request passes through any proxies, the IP addresses of those proxies will be stored here in the format (clientIp, proxy1, proxy2, ...). This field is useful when working with trusted proxies. | Array of [IpAddress](#ipaddress-object) | TRUE       |

### GeographicalContext object

Geographical Context describes a set of geographic coordinates. In addition to containing latitude and longitude data, this object also contains address data of postal code-level granularity. Within the [Client](#client-object) object, the geographical context refers to the physical location of the client when it sends the request that triggers this event. All [Transaction](#transaction-object) events with `type` equal to `WEB` will have a geographical context set. [Transaction](#transaction-object) events with `type` equal to `JOB` will have no geographical context set. The geographical context data could be missing if the geographical data for a request could not be resolved.

| Property    | Description                                                                                                          | DataType                                  | Nullable |
| ----------- | ----------------------------------------------------------------------------------                                   | -------------------------------------     | -------- |
| geolocation | Contains the geolocation coordinates (latitude, longitude)                                                           | [Geolocation object](#geolocation-object) | TRUE     |
| city        | The city encompassing the area containing the geolocation coordinates, if available (e.g. Seattle, San Francisco)    | String                                    | TRUE     |
| state       | Full name of the state/province encompassing the area containing the geolocation coordinates (e.g. Montana, Incheon) | String                                    | TRUE     |
| country     | Full name of the country encompassing the area containing the geolocation coordinates (e.g. France, Uganda)          | String                                    | TRUE     |
| postalCode  | Postal code of the area encompassing the geolocation coordinates                                                     | String                                    | TRUE     |

### Geolocation object

Latitude and longitude of the geolocation where an action was performed, formatted according to the [ISO-6709](https://en.wikipedia.org/wiki/ISO_6709) standard.

| Property   | Description                                                                                       | DataType        | Nullable |
| ---------- | ------------------------------------------------------------------------------------------------- | --------------- | -------- |
| lat        | Latitude. Uses 2 digits for the [integer part](https://en.wikipedia.org/wiki/ISO_6709#Latitude)   | Double          | FALSE    |
| lon        | Longitude. Uses 3 digits for the [integer part](https://en.wikipedia.org/wiki/ISO_6709#Longitude) | Double          | FALSE    |

### Outcome object

Describes the result of an action and the reason for that result.

| Property   | Description                                                            | DataType        | Nullable | Default | MinLength | MaxLength |
| ---------- | ---------------------------------------------------------------------- | --------------- | -------- | ------- | --------- | --------- |
| result     | Result of the action: `SUCCESS`, `FAILURE`, `SKIPPED`, `ALLOW`, `DENY`, `CHALLENGE`, `UNKNOWN`       | String          | FALSE    |         |           |           |
| reason     | Reason for the result, for example `INVALID_CREDENTIALS`               | String          | TRUE     |         | 1         | 255       |

### Transaction object

The `transaction` field contains a Transaction object.

A Transaction object comprises contextual information associated with its respective event. This information is useful for understanding sequences of correlated events (see [Event Correlation](#event-correlation) for more on this).

For example, a Transaction object such as:
```json
{
    "id": "Wn4f-0RQ8D8lTSLkAmkKdQAADqo",
    "type": "WEB",
    "detail": null
}
```

indicates that a `WEB` request with `id` `Wn4f-0RQ8D8lTSLkAmkKdQAADqo` created this event.

| Property   | Description                                                                                             | DataType             | Nullable |
| ---------- | ------------------------------------------------------------------------------------------------------- | -------------------- | -------- |
| id         | Unique identifier for this transaction.                                                                 | String               | TRUE     |
| type       | Describes the kind of transaction. `WEB` indicates a web request. `JOB` indicates an asynchronous task. | String               | TRUE     |
| detail     | Details for this transaction.                                                                           | Map[String → Object] | TRUE     |

### DebugContext object

For some kinds of events (e.g. OMM provisioning, login, second factor SMS, etc.), the fields provided in other response objects will not be sufficient to adequately describe the operations the event has performed. In such cases, the `debugContext` object provides a way to store additional information.

For example, an event where a second factor SMS token is sent to a user might have a `debugContext` that looks like:

```json
{
    "debugData": {
        "requestUri": "/api/v1/users/00u3gjksoiRGRAZHLSYV/factors/smsf8luacpZJAva10x45/verify",
        "smsProvider": "TELESIGN",
        "transactionId": "268632458E3C100F5F5F594C6DC689D4"
    }
}

```

By inspection of the `debugData` field, one can find the URI used to trigger the second factor SMS (`/api/v1/users/00u3gjksoiRGRAZHLSYV/factors/smsf8luacpZJAva10x45/verify`), the SMS provider (`TELESIGN`) and the ID used by Telesign to identify this transaction (`268632458E3C100F5F5F594C6DC689D4`).

If for some reason the information needed to implement a feature is not provided in other response objects, it is advised to scan the `debugContext.debugData` field for potentially useful fields.

> Important: The information contained in `debugContext.debugData` is intended to add context when troubleshooting customer platform issues. Note that both key names and values may change from release to release and are not guaranteed to be stable. Therefore, they should not be viewed as a data contract but as a debugging aid instead.

| Property   | Description                                                                     | DataType            | Nullable |
| ---------- | ------------------------------------------------------------------------------- | ---------------     | -------- |
| debugData  | Dynamic field containing miscellaneous information dependent on the event type. | Map[String->Object] | TRUE     |

### AuthenticationContext object

All authentication relies on validating one or more credentials that proves the authenticity of the actor's identity. Credentials are sometimes provided by the actor, as is the case with passwords, and at other times provided by a third party, and validated by the authentication provider.

The `authenticationContext` contains metadata about how the actor is authenticated. For example, an `authenticationContext` for an event in which a user authenticates with IWA will look something like:

```json
{
    "authenticationProvider": "ACTIVE_DIRECTORY",
    "authenticationStep": 0,
    "credentialProvider": null,
    "credentialType": "IWA",
    "externalSessionId": "102N1EKyPFERROGvK9wizMAPQ",
    "interface": null,
    "issuer": null
}
```
In such a case, one can recognize that the user used an IWA credential to authenticate against an Active Directory instance. All of the user's future generated events in this login session will share the same `externalSessionId`.

Among other operations, this response object can be used to scan for suspicious login activity or perform analytics on user authentication habits (e.g. how often authentication scheme X is used versus authentication scheme Y).

| Property               | Description                                                                                                                                                                                                                         | DataType                        | Nullable | MinLength | MaxLength |
| ----------             | --------------------------------------------------------------                                                                                                                                                                      | ---------------                 | -------- | --------- | --------- |
| authenticationProvider | The system that proves the identity of an actor using the credentials provided to it                                                                                                                                                | String                          | TRUE     |           |           |
| authenticationStep     | The zero-based step number in the authentication pipeline. Currently unused and always set to `0`.                                                                                                                                  | Integer                         | TRUE     |           |           |
| credentialProvider     | A credential provider is a software service that manages identities and their associated credentials. When authentication occurs via credentials provided by a credential provider, that credential provider will be recorded here. | String                          | TRUE     |           |           |
| credentialType         | The underlying technology/scheme used in the credential                                                                                                                                                                             | String                          | TRUE     |           |           |
| issuer                 | The specific software entity that created and issued the credential.                                                                                                                                                                | [Issuer object](#issuer-object) | TRUE     |           |           |
| externalSessionId      | A proxy for the actor's [session ID](https://www.owasp.org/index.php/Session_Management_Cheat_Sheet)                                                                                                                                | String                          | TRUE     | 1         | 255       |
| interface              | The third party user interface that the actor authenticates through, if any.                                                                                                                                                        | String                          | TRUE     | 1         | 255       |

###### Possible Values

Some of the fields listed above have a finite set of possible values.

| Property               | Possible Values                                                                                                                                         |
| ---------------------- | -----------------------------------------------------------------------------------------------------                                                   |
| authenticationProvider | `OKTA_AUTHENTICATION_PROVIDER`, `ACTIVE_DIRECTORY`, `LDAP`, `FEDERATION`, `SOCIAL`, `FACTOR_PROVIDER`                                                   |
| credentialProvider     | `OKTA_CREDENTIAL_PROVIDER`, `RSA`, `SYMANTEC`, `GOOGLE`, `DUO`, `YUBIKEY`                                                                               |
| credentialType         | `OTP`, `SMS`, `PASSWORD`, `ASSERTION`, `IWA`, `EMAIL`, `OAUTH2`, `JWT`, `CERTIFICATE`, `PRE_SHARED_SYMMETRIC_KEY`, `OKTA_CLIENT_SESSION`, `DEVICE_UDID` |

### Issuer object

Describes the `issuer` of the authorization server when the authentication is performed via OAuth. This is the location where well-known resources regarding details of the authorization servers are published.

| Property   | Description                                                                                                                                                                 | DataType        | Nullable |
| ---------- | --------------------------------------------------------------                                                                                                              | --------------- | -------- |
| id         | Varies depending on the type of authentication. If authentication is SAML 2.0, `id` is the issuer in the SAML assertion. For social login, `id` is the issuer of the token. | String          | TRUE     |
| type       | Information regarding `issuer` and source of the SAML assertion or token.                                                                                                   | String          | TRUE     |

### SecurityContext object

The `securityContext` object provides security information directly related to the evaluation of the event's IP reputation. IP reputation is a trustworthiness rating that evaluates how likely a sender is to be malicious based on the sender's IP address. As the name implies, the `securityContext` object is useful for security applications-flagging and inspecting suspicious events.

| Property | Description                                                                                                                                                        | DataType | Nullable |
| -------- | -----------------------------------------------------------------------------------------------                                                                    | -------- | -------- |
| asNumber | [Autonomous system](https://en.wikipedia.org/wiki/Autonomous_system_(Internet)) number associated with the autonomous system that the event request was sourced to | Integer  | TRUE     |
| asOrg    | Organization associated with the autonomous system that the event request was sourced to                                                                           | String   | TRUE     |
| isp      | [Internet service provider](https://en.wikipedia.org/wiki/Internet_service_provider) used to sent the event's request                                              | String   | TRUE     |
| domain   | The [domain name](https://en.wikipedia.org/wiki/Domain_name) associated with the IP address of the inbound event request                                           | String   | TRUE     |
| isProxy  | Specifies whether an event's request is from a known proxy                                                                                                         | Bool     | TRUE     |

### IpAddress object

Describes an IP address used in a request.

| Property                                                                                                     | Description                              | DataType                                                      | Nullable |
| :----------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------ | :------- |
| ip                                                                                                           | IP address                               | String                                                        | TRUE     |
| geographicalContext                                                                                          | Geographical context of the IP address   | [GeographicalContext object](#geographicalcontext-object)     | TRUE     |
| version                                                                                                      | IP address version                       | V4 or V6                                                      | TRUE     |
| source                                                                                                       | Details regarding the source             | String                                                        | TRUE     |

## Event Types

Event types categorize event instances by action and recorded in a LogEvent's [`eventType`](#attributes) attribute. They are key to navigating the system log via [Expression Filters](#expression-filter).

The following sections outline the key event types captured by the system log. For a complete listing see the [Event Types catalog](/docs/reference/api/event-types/#catalog).


### Application Event

| Event                                          | Description                                                |
| :--------------------------------------------- | :--------------------------------------------------------- |
| application.lifecycle.activate                 | An application was activated.                              |
| application.lifecycle.create                   | An application was created.                                |
| application.lifecycle.deactivate               | An application was deactivated.                            |
| application.lifecycle.delete                   | An application was deleted.                                |
| application.lifecycle.update                   | An application was updated.                                |
| application.user_membership.add                | A user was assigned to an application.                     |
| application.user_membership.change_username    | The name of a user assigned to an application was changed. |
| application.user_membership.remove             | A user was removed from an application.                    |

### Group Event

| Event                          | Description                      |
| :----------------------------- | :------------------------------- |
| group.user_membership.add      | A user was added to a group.     |
| group.user_membership.remove   | A user was removed from a group. |

### Policy Events

| Event                         | Description                         |
| :---------------------------- | :---------------------------------- |
| policy.lifecycle.activate     | A rule in a policy was activated.   |
| policy.lifecycle.create       | A rule in a policy was created.     |
| policy.lifecycle.deactivate   | A rule in a policy was deactivated. |
| policy.lifecycle.delete       | A rule in a policy was deleted.     |
| policy.lifecycle.update       | A rule in a policy was updated.     |
| policy.rule.activate          | A rule in a policy was activated.   |
| policy.rule.add               | A rule was added to a policy.       |
| policy.rule.deactivate        | A rule in a policy was deactivated. |
| policy.rule.delete            | A rule was deleted from a policy.   |
| policy.rule.update            | A rule in a policy was updated.     |

#### Policy Event Details

* `policy.evaluate_sign_on` provides context on the values used and evaluated in the context of the Okta sign on policy. For example, you can determine which network zones were matched for this event.
* For `policy.lifecycle` and `policy.rule` events, the corresponding policy is listed in the target object.

### System Events

| Event                                | Description                                                                                                                  |
| :-------------------                 | :----------------------------------                                                                                          |
| system.org.rate_limit.warning        | An endpoint is near its [rate limit](/docs/reference/rate-limits/).                                                 |
| system.org.rate_limit.violation      | An endpoint has exceeded its [rate limit](/docs/reference/rate-limits/).                                            |
| core.concurrency.org.limit.violation | A request has exceeded the org's allotted [concurrency limit](/docs/reference/rate-limits/#concurrent-rate-limits). |

Rate limit warnings are sent at different times, depending on the org type. For One App and Enterprise orgs, the warning is sent when the org is at 60% of its limit.

> **Note:** For orgs created before 2018-05-17, the warning is sent at 90%.

Rate limit violations are sent when a rate limit is exceeded.

### Security Events

| Event                    | Description                                                                                  |
| :-------------------     | :----------------------------------                                                          |
| security.request.blocked | A request was blocked due to a blacklist rule (such as an IP network zone or location rule). |

### User Events

| Event                       | Description                                               |
| :-------------------------- | :-------------------------------------------------------- |
| user.authentication.sso     | A user attempted to SSO to an application managed in Okta |
| user.lifecycle.activate     | A user account was activated.                             |
| user.lifecycle.create       | A user account was created.                               |
| user.lifecycle.deactivate   | A user account was deactivated.                           |
| user.lifecycle.suspend      | A user account was suspended.                             |
| user.lifecycle.unsuspend    | A user account was moved from suspended status.           |
| user.session.start          | Okta issued a session to a user who is authenticating     |

#### User Event Details

* `user.authentication.sso` doesn't capture whether the SSO attempt was successful or failed because Okta can't collect the subsequent authentication attempt status from the third-party service.


## Event Correlation

When looking through the System Log, it is often useful to be able to correlate events to understand the thread of events that happened at a particular time.

The `LogResponse` object offers two identifiers in this respect:
  - `authenticationContext.externalSessionId`: identifies events that occurred in the same user session.
  - `transaction.id`: identifies events that occurred together as part of an operation (for example, a request to Okta's servers).

### Event Correlation Example

The table below shows 18 events produced from 13 transactions over 6 different sessions, all performed by one user. Note that `authenticationContext.externalSessionId` is abbreviated to `sessionId` in this table.

| sessionId                   | transaction.id                | uuid                                   | eventType                                     | displayMessage                        |
| :-------------------------- | :---------------------------- | :------------------------------------- | :-------------------------------------------- | :--------------------------------     |
| trs5JnlvlaIQTOqOj9imLy7lA   | WcKPxq1f8QLfFvv3UPHhhgAACGM   | f24790d0-d324-47f8-aac5-c27a31ab928d   | user.session.access_admin_app                 | User accessing Okta administrator app |
|                             | WcKPxq1f8QLfFvv3UPHhhgAACGM   | ed317758-8776-4240-a540-277c44dcb408   | application.lifecycle.update                  | Update application                    |
|                             |                               | 421c1551-71b2-4ebe-a70d-b5f7d3698429   | application.lifecycle.update                  | Update application                    |
|                             |                               | 06a50bbe-44fd-40de-83e6-2e4cc2a17d16   | application.lifecycle.update                  | Update application                    |
| trsUz2TG3wKS6ar1lvWzHo71w   | Wij-6q4YuniRd9yTmWHpfwAAADc   | 3e240ff4-6af7-47f2-b107-a2ef661ffc01   | application.user_membership.change_username   | Change users application username     |
|                             |                               | 572b05e9-b6be-4dfe-8bc3-01bb3a5a1af5   | application.user_membership.add               | Add user to application membership    |
|                             |                               | 30f29bbf-3218-429b-827a-0a93809591db   | application.user_membership.remove            | Remove users application membership   |
|                             | Wij-964YuniRd9yTmWHu1AAAAEA   | 5f98d062-05a9-4ede-89a0-8a2ce27efdd4   | user.session.access_admin_app                 | User accessing Okta administrator app |
|                             | Wij-95eCbHF7In2MKNavlgAAD9I   | 45f71ac2-e8b2-4c19-b4cc-d2560108c889   | application.lifecycle.update                  | Update application                    |
|                             |                               | 46b85d65-01c6-44d2-86d2-25704804b1c5   | application.lifecycle.update                  | Update application                    |
| 102GALFw8CzRT2KXoqnca8Jdg   | Wij-AJeCbHF7In2MKNaOpAAAEC4   | b9ab9263-a4ae-4780-9981-377ec8f2da86   | user.session.start                            | User login to Okta                    |
|                             | Wij-7q4YuniRd9yTmWHrBQAAAKQ   | ff325685-0220-484c-82cf-5f8dc596acbe   | user.authentication.sso                       | User single sign on to app            |
| trsf8nlpDJZTZeFlcc8nszbjw   | Wij-7a4YuniRd9yTmWHqqAAAAKY   | 5526a4c4-7f68-4b2a-bab7-2d10ebaeeb1c   | mim.checkOSXAccessEligibility.true            | *blank*                               |
|                             | Wij-764YuniRd9yTmWHrkAAAAGw   | 232774ba-8feb-4b00-a732-e0ec99a24434   | user.session.start                            | User login to Okta                    |
| trswPONv4wIRaKDNWVVcmtceg   | Wij-6K4YuniRd9yTmWHo9wAAAAY   | d31d819a-1427-45b0-a8b4-8a8fb40c72f1   | user.session.start                            | User login to Okta                    |
|                             | Wij-564YuniRd9yTmWHoaQAAAII   | 0cc6f4c8-9b91-4a70-b5c4-09d6ad159d32   | mim.checkOSXAccessEligibility.true            | *blank*                               |
|                             | Wij-2q4YuniRd9yTmWHjRAAAADA   | 92606da8-7eeb-4ad7-8ffb-502dd0ec64cc   | user.authentication.sso                       | User single sign on to app            |
| *null*                      | Wm@-R2s5lEMbNIB03krtvAAACyo   | 566671be-ec0b-400d-ad2e-6fc73ed12fb1   | user.session.start                            | User login to Okta                    |
{.table-word-break}

As evidenced by the `null` `authenticationContext.externalSessionId` field in the last row, neither `transaction.id` nor `uuid` maintain a many-to-one relationship with `authenticationContext.externalSessionId`. In this particular case, the `null` `authenticationContext.externalSessionId` field can be explained by a failed user login. There was no session granted to the user's client since the login failed.


## Operations

### List Events


<ApiOperation method="get" url="/api/v1/logs" />

Fetch a list of ordered log events from your Okta organization's system log.

#### Request Parameters


The table below summarizes the supported query parameters:

| Parameter   | Description                                                                                                                             | Format                                                                                                                                                                                    | Default                 |
| ----------- | -----------------------------------------------------------------------------------------------------                                   | --------------------------------------------------------                                                                                                                                  | ----------------------- |
| `since`     | Filters the lower time bound of the log events `published` property for bounded queries or persistence time for polling queries                                                          | The [Internet Date/Time Format profile of ISO 8601](https://tools.ietf.org/html/rfc3339#page-8). An example: `2017-05-03T16:22:18Z`                                                       | 7 days prior to `until` |
| `until`     | Filters the upper time bound of the log events `published` property for bounded queries or persistence time for polling queries                                                          | The [Internet Date/Time Format profile of ISO 8601](https://tools.ietf.org/html/rfc3339#page-8). An example: `2017-05-03T16:22:18Z`                                                       | Current time            |
| `after`     | Used to retrieve the next page of results. Okta returns a link in the HTTP Header (`rel=next`) that includes the after query parameter | Opaque token                                                                                                                                                                              |                         |
| `filter`    | [Filter Expression](#expression-filter) that filters the results                                                                        | [SCIM Filter expression](/docs/reference/api-overview/#filtering). All [operators](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) except `ew`, `ne`, `not`, and `[ ]`  are supported |                         |
| `q`         | Filters the log events results by one or more exact [keywords](#keyword-filter)                                                         | URL encoded string. Max length is 40 characters per keyword, with a maximum of 10 keyword filters per query (before encoding)                                                             |                         |
| `sortOrder` | The order of the returned events sorted by `published`                                                                                  | `ASCENDING` or `DESCENDING`                                                                                                                                                               | `ASCENDING`             |
| `limit`     | Sets the number of results returned in the response                                                                                     | Integer between 0 and 1000                                                                                                                                                                | 100                     |

##### Request Types

All requests to the `/api/v1/logs` endpoint fall into one of these two categories:
  - [Polling Requests](#polling-requests)
  - [Bounded Requests](#bounded-requests)

###### Polling Requests
Polling requests are for situations when you want to consume an ongoing stream of events from Okta.

Example use cases include:
  - [Ingesting System Log data into an external SIEM system](#transferring-data-to-a-separate-system).
  - Utilizing System Log data for real-time monitoring.

For a request to be a _polling_ request it must meet the following request parameter criteria:
  - `until` must be unspecified.
  - `sortOrder` must be `ASCENDING`.

Polling requests to the `/api/v1/logs` API have the following semantics:
  - They return every event that occurs in your organization.
  - The returned events are time filtered by their internal "persistence time" to avoid skipping records due to system delays (unlike [Bounded Requests](#bounded-requests)).
  - They may return events out of order according to the `published` field.
  - They have an infinite number of pages. That is, a [`next` `Link` relation header](#next-link-response-header) is always present, even if there are no new events (the event list may be empty).

###### Bounded Requests
Bounded requests are for situations when you know the definite time period of logs you want to retrieve.

Example use cases include:
  - [Debugging or troubleshooting system behavior](#debugging).
  - Auditing events that happened at a particular time.

For a request to be a _bounded_ request it must meet the following request parameter criteria:
  - `since` must be specified.
  - `until` must be specified.

Bounded requests to the `/api/v1/logs` API have the following semantics:
  - The returned events are time filtered by their associated `published` field (unlike [Polling Requests](#polling-requests)).
  - The returned events are guaranteed to be in order according to the `published` field.
  - They have a finite number of pages. That is, the last page does not contain a [`next` `Link` relation header](#next-link-response-header).
  - Not all events for the specified time range may be present— events may be delayed. Such delays are rare but possible.


##### Filtering Results

###### Expression Filter

An expression filter is useful for performing structured queries where constraints on LogEvent attribute values can be explicitly targeted.

The following expressions are supported for events with the `filter` query parameter:

| Filter                                       | Description                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| `eventType eq ":eventType"`                  | Events that have a specific action [eventType](#attributes)                    |
| `target.id eq ":id"`                         | Events published with a specific target id                                     |
| `actor.id eq ":id"`                          | Events published with a specific actor id                                      |

> Note that SCIM filter expressions cannot use the `published` attribute since it may conflict with the logic of the `since`, `after`, and `until` query params.

See [Filtering](/docs/reference/api-overview/#filtering) for more information about expressions.

The following are some examples of common filter expressions.

Events published for a target user:
```javascript
filter=target.id eq "00uxc78lMKUMVIHLTAXY"
```

Failed login events:
```javascript
filter=eventType eq "user.session.start" and outcome.result eq "FAILURE"
```

Events published for a target user and application:
```javascript
filter=target.id eq "00uxc78lMKUMVIHLTAXY" and target.id eq "0oabe82gnXOFVCDUMVAK"
```

App SSO events for a target user and application:
```javascript
filter=eventType eq "app.auth.sso" and target.id eq "00uxc78lMKUMVIHLTAXY" and target.id eq "0oabe82gnXOFVCDUMVAK"
```

Events published for a given ip address:
```javascript
filter=client.ipAddress eq "184.73.186.14"
```

###### Keyword Filter

The query parameter `q` can be used to perform keyword matching against a LogEvents object's attribute values. In order to satisfy the constraint, all supplied keywords must be matched exactly.
Note that matching is case-insensitive.

The following are some examples of common keyword filtering:

* Events that mention a specific city: `q=San Francisco`
* Events that mention a specific url: `q=interestingURI.com`
* Events that mention a specific person: `q=firstName lastName`

> **Note:** When hyphens are present in an event instance's attribute value they are split and added to the list of matching candidates, in addition to the full hyphenated value. Thus a `q` value of `XOxBw-2JIRnCFd0gG0GjHAAABjY` would match events containing the text `XOxBw`, `2JIRnCFd0gG0GjHAAABjY`, or `XOxBw-2JIRnCFd0gG0GjHAAABjY`.

###### Datetime Filter

LogEvent objects can be filtered by [`published`](#attributes) attribute value with the following combination of parameters:

* `since`
* `until`
* `since` and `until`
* `after`

Note that `since` and `after` are mutually exclusive and cannot be specified simultaneously.

The `after` parameter is system generated for use in ["next" links](#next-link-response-header). Users should not attempt to craft requests using this value and rely on the system generated links instead.

##### Response


The response contains a JSON array of [LogEvent objects](#logevent-object).

###### Self Link Response Header
The response always includes a `self` `Link` header, which is a link to the current query that was executed.

This header is of the form:
```
Link: <url>; rel="self"
```

For example:
```
Link: <https://${yourOktaDomain}/api/v1/logs?q=&sortOrder=DESCENDING&limit=20&until=2017-09-17T23%3A59%3A59%2B00%3A00&since=2017-06-10T00%3A00%3A00%2B00%3A00>; rel="self"
```

###### Next Link Response Header
The response may include a `next` `Link` header, which is a link to the next page of results, if there is one. Note that while the `self` `Link` will always exist, the `next` `Link` may not exist.

This header is of the form:
```
Link: <url>; rel="next"
```

For example:
```
Link: <https://${yourOktaDomain}/api/v1/logs?q=&sortOrder=DESCENDING&limit=20&until=2017-09-17T15%3A41%3A12.994Z&after=349996bd-5091-45dc-a39f-d357867a30d7&since=2017-06-10T00%3A00%3A00%2B00%3A00>; rel="next"
```

#### Timeouts
Individual queries have a timeout of 30 seconds.

### Errors
```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: 'until': The date format in your query is not recognized. Please enter dates using ISO8601 string format.. 'until': must be a valid date-time or empty.",
  "errorId": "dd4998a1-2267-499b-9e4d-ec821fcc5ca9",
  "errorCauses": [
    {
      "errorSummary": "until: The date format in your query is not recognized. Please enter dates using ISO8601 string format."
    },
    {
      "errorSummary": "until: must be a valid date-time or empty."
    }
  ]
}
```

An invalid SCIM filter returns a 400 with a description of the issue with the SCIM filter. For example:
```json
{
  "errorCode": "E0000053",
  "errorSummary": "Invalid filter 'display_message eqq \"Create okta user\"': Unrecognized attribute operator 'eqq' at position 16. Expected: eq,co,sw,pr,gt,ge,lt,le",
  "errorId": "eb83dfe1-6d76-458c-8c0c-f8df8fb7a24b"
}
```

An Invalid field returns a 400 with a message indicating which field is invalid. For example:
```json
{
  "errorCode": "E0000053",
  "errorSummary": "field is not valid: some_invalid_field",
  "errorId": "ec93dhe2-6d76-458c-8c0c-f8df8fb7a24b"
}
```

Another example, where the parameters are invalid:
```json
{
  "errorCode": "E0000053",
  "errorSummary": "Invalid parameter: The since parameter is over 180 days prior to the current day.",
  "errorId": "55166534-b7d8-45a5-a4f6-3b38a5507046"
}
```

An internal service error returns a 500 with the message:
```json
{
  "errorCode": "E0000053",
  "errorSummary": "Sorry, there's been an error. We aren't sure what caused it, but we've logged this and will work to address it. Please try your request again.",
  "errorId": "55166534-b7d8-45a5-a4f6-3b38a5507046"
}
```

A timeout returns a 500 with the message:
```json
{
  "errorCode": "E0000009",
  "errorSummary": "Your last request took too long to complete. This is likely due to a load issue on our side. We've logged this and will work to address it. Please either simplify your query or wait a few minutes and try again."
}
```

A free form query that is too long:
```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: 'q': Freeform search cannot contain items longer than 40 characters. Please shorten the items in your search or use an advanced filter to query by specific fields."
}
```

Exceeding the rate limit results in:
```json
{
  "errorCode": "E0000047",
  "errorSummary": "API call exceeded rate limit due to too many requests."
}
```

### Rate Limits

See the tables entries for `/api/v1/logs` in [Rate Limits](/docs/reference/rate-limits/) for details.

## Data Retention

Log data older than 90 days is not returned, in accordance with Okta's [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy). Queries that exceed the retention period will succeed but only results that have a `published` timestamp within the window will be returned.

## Examples

### Debugging
The System Log API can be used to troubleshoot user problems. For example, you
can use the following `curl` command to see events from user "Jane Doe":

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?q=Jane+Doe"
```

You can also use this API to search for particular types of events:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?filter=event_type+eq+%22user.session.start%22"
```

### Transferring Data to a Separate System
You can export your log events to a separate system for analysis or compliance. To obtain the entire dataset, query from the appropriate point of time in the past.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?since=2017-10-01T00:00:00.000Z"
```

and retrieve the next page of events through the [`Link` response header](/docs/reference/api-overview/#link-header) value with the `next` link relation. Continue this process until no events are returned.

> Do not attempt to transfer data by manually paginating using `since` and `until` as this may lead to skipped or duplicated events. Instead, always follow the `next` links.
