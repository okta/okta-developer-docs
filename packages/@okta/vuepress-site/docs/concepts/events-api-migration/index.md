---
title: Events API Migration
meta:
  - name: description
    content: Okta is deprecating the Events API in favor of the System Log API. Find out more about their key differences and how to migrate to the System Log API.
---
## Introduction

To enable customers to leverage a unified platform for enriched, auditable event data, Okta is concentrating its efforts on the new and improved [System Log API](/docs/reference/api/system-log/). Okta plans to eventually deprecate the legacy [Events API](/docs/reference/api/events/). We encourage customers to migrate to the new API as it contains a superset of functionality.

This guide aims to help organizations migrate from the Events API to its System Log API replacement. It highlights some of the key structural, semantic, and operational differences (and similarities) between the two APIs to aid in the migration process. We update this guide as the deprecation timeline becomes available.

> **Note:** This guide doesn't attempt to cover specific use cases, detailed patterns of interaction, or the intricacies of particular query parameters. For that, it's suggested to see the corresponding sections in the [System Log API](/docs/reference/api/system-log/) documentation. Please note that as of Jan 7, 2019 developers of new projects are unable to access the Events API and should use the System Log API.

## Migration

Applications and integrations using the Events API must migrate to the System Log API to continue to operate. You can export the data from the Events API at anytime before the end-of-life (EOL) date. For applications and integrations that need to continue to pull down data from Okta to operate, the following compares the APIs and events to help with the migration.

## Key Differences

This section explores the notable differences between the two APIs, the resources and representations they expose, and how they are organized. These differences reflect a complete reimplementation of the system log platform. As a result, one can expect both gross and subtle differences.

### Resources

Both of the RESTful APIs provide a single read-only resource:

| Events APIs            | System Log API         |
| ---------------------- | ---------------------- |
| `GET` `/api/v1/events` | `GET` `/api/v1/logs`   |

For brevity, the Events API is often referred to as `/events` and the System Log API as `/logs`.

### Data Structure

Each of the API resources has an associated data structure, also referred to as the resource "representation" or data model. The System Log API's representation is the [LogEvent object](/docs/reference/api/system-log/#logevent-object). It captures the occurrence of notable system events. The Events API's representation is the [Event object](/docs/reference/api/events/#event-model). LogEvent has more structure and a much richer set of data elements than Event. It is one of the principal improvements of the System Log API over the Events API.

One of the most important attributes of an event in the Okta system is its "event type" designation. In the Events API, the [`action.objectType` attribute](/docs/reference/api/events/#action-object) denotes the event type. In the System Log API, the [`eventType` attribute](/docs/reference/api/system-log/#event-types) represents the event type. The values in each of these fields are generally different, although there is some overlap for historical purposes. In the interest of easing the transition from the Events API to the System Log API, LogEvent's [`legacyEventType` attribute](/docs/reference/api/system-log/#attributes) identifies the equivalent Event `action.objectType` value. The [Event type Mapping](#event-type-mappings) section of this guide provides a static mapping of Events API event types to System Log API event types.

Another essential difference between the two systems is the manner in which detailed information is encoded. The Events API textually encodes the specifics of a particular event instance into the [`action.message` attribute](/docs/reference/api/events/#action-object). This encoding burdened consumers with having to correctly parse data themselves and led to brittleness in downstream systems when wording changed. The System Log API expands and enriches the data model to support storing these values as atomic, independent attributes. Context objects, such as the [AuthenticationContext object](/docs/reference/api/system-log/#authenticationcontext-object) and [GeographicalContext objects](/docs/reference/api/system-log/#geographicalcontext-object), provide attributes that are common across event types. The [DebugContext object](/docs/reference/api/system-log/#debugcontext-object) houses event-type-specific attributes.

#### Event/LogEvent comparison example

This section illustrates the differences between the Events and System Log data models using a single admin user sign-in event as an example.

##### Events API event

The following is an example of an Event API successful admin sign-in event instance with the event type `app.admin.sso.login.success`:

```json
{
   "eventId":"tev2FSkoWAARbKaFBBfPPXUWA1533221531000",
   "sessionId":"102PfloXybbT3q1IOdqDAQoeQ",
   "requestId":"W2Mam7t4pcvodL-w@kNCrQAABSM",
   "published":"2018-08-02T14:52:11.000Z",
   "action":{
      "message":"User logged in to the Admin app",
      "categories":[

      ],
      "objectType":"app.admin.sso.login.success",
      "requestUri":"/admin/sso/request"
   },
   "actors":[
      {
         "id":"00u1qmc3wcC6KIsgi0g7",
         "displayName":"Jane Doe",
         "login":"jdoe@example.com",
         "objectType":"User"
      },
      {
         "id":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)...",
         "displayName":"CHROME",
         "ipAddress":"99.225.99.159",
         "objectType":"Client"
      }
   ],
   "targets":[
      {
         "id":"00u1qmc3wcC6KIsgi0g7",
         "displayName":"Jane Doe",
         "login":"jdoe@example.com",
         "objectType":"User"
      },
      {
         "id":"0oa1qmc3w1qLYTPVn0g7",
         "displayName":"Okta Administration",
         "objectType":"AppInstance"
      }
   ]
}
```

The data structure is both narrow in its top-level attributes and shallow in object attribute nesting.

##### System Log API LogEvent

The following is the corresponding event of a successful user session accessing the admin app as captured in the System Log API with the event type `user.session.access_admin_app`:

```json
   {
      "actor":{
         "id":"00u1qmc3wcC6KIsgi0g7",
         "type":"User",
         "alternateId":"jdoe@example.com",
         "displayName":"Jane Doe",
         "detailEntry":null
      },
      "client":{
         "userAgent":{
            "rawUserAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)...",
            "os":"Mac OS X",
            "browser":"CHROME"
         },
         "zone":"null",
         "device":"Computer",
         "id":null,
         "ipAddress":"99.225.99.159",
         "geographicalContext":{
            "city":"Toronto",
            "state":"Ontario",
            "country":"Canada",
            "postalCode":"M6G",
            "geolocation":{
               "lat":43.6655,
               "lon":-79.4204
            }
         }
      },
      "authenticationContext":{
         "authenticationProvider":null,
         "credentialProvider":null,
         "credentialType":null,
         "issuer":null,
         "interface":null,
         "authenticationStep":0,
         "externalSessionId":"102PfloXybbT3q1IOdqDAQoeQ"
      },
      "displayMessage":"User accessing Okta admin app",
      "eventType":"user.session.access_admin_app",
      "outcome":{
         "result":"SUCCESS",
         "reason":null
      },
      "published":"2018-08-02T14:52:11.272Z",
      "securityContext":{
         "asNumber":null,
         "asOrg":null,
         "isp":null,
         "domain":null,
         "isProxy":null
      },
      "severity":"INFO",
      "debugContext":{
         "debugData":{
            "requestUri":"/admin/sso/request"
         }
      },
      "legacyEventType":"app.admin.sso.login.success",
      "transaction":{
         "type":"WEB",
         "id":"W2Mam7t4pcvodL-w@kNCrQAABSM",
         "detail":{

         }
      },
      "uuid":"b5ef15a1-e78f-4125-b425-cc10f04e24f3",
      "version":"0",
      "request":{
         "ipChain":[
            {
               "ip":"99.225.99.159",
               "geographicalContext":{
                  "city":"Toronto",
                  "state":"Ontario",
                  "country":"Canada",
                  "postalCode":"M6G",
                  "geolocation":{
                     "lat":43.6655,
                     "lon":-79.4204
                  }
               },
               "version":"V4",
               "source":null
            }
         ]
      },
      "target":[
         {
            "id":"0ua1qmc3wf2xDawpN0g7",
            "type":"AppUser",
            "alternateId":"unknown",
            "displayName":"Jane Doe",
            "detailEntry":null
         }
      ]
   }
```

Note the System Log API representation's improved structure and additional embedded information when compared with the Event API's event representation. For example, the System Log API's `client.geographicalContext` attribute captures the geolocation of the client accessing the system. This attribute is unavailable in the Events API.

##### Event/System Log API event attribute mapping

Given the above events from each API, the following compares each leaf-level attribute. [JSON Pointer](https://tools.ietf.org/html/rfc6901) notation is used to specify the compared attribute values.

| Event                     | LogEvent                                                 | Notes                                                                              |
| ------------------------- | -------------------------------------------------------- | --------------------------------------------                                       |
| `/action/categories`      |                                                          | Always empty                                                                       |
| `/actors/0/login`         | `/actor/alternateId`                                     | Generally same values                                                              |
| `/actors/0/displayName`   | `/actor/displayName`                                     | Generally same values                                                              |
| `/actors/0/id`            | `/actor/id`                                              | Generally same values                                                              |
| `/actors/0/objectType`    | `/actor/type`                                            | Generally same values                                                              |
|                           | `/authenticationContext/authenticationStep`              | New                                                                                |
| `/sessionId`              | `/authenticationContext/externalSessionId`               | New                                                                                |
| `/actors/1/objectType`    | `/client/device`                                         | Different values                                                                   |
|                           | `/client/geographicalContext/city`                       | New                                                                                |
|                           | `/client/geographicalContext/country`                    | New                                                                                |
|                           | `/client/geographicalContext/geolocation`                | New                                                                                |
|                           | `/client/geographicalContext/geolocation/lat`            | New                                                                                |
|                           | `/client/geographicalContext/geolocation/lon`            | New                                                                                |
|                           | `/client/geographicalContext/postalCode`                 | New                                                                                |
|                           | `/client/geographicalContext/state`                      | New                                                                                |
| `/actors/1/ipAddress`     | `/client/ipAddress`                                      | New                                                                                |
| `/actors/1/displayName`   | `/client/userAgent/browser`                              | New                                                                                |
|                           | `/client/userAgent/os`                                   | New                                                                                |
| `/actors/1/id`            | `/client/userAgent/rawUserAgent`                         | New                                                                                |
|                           | `/client/zone`                                           | New                                                                                |
| `/action/requestUri`      | `/debugContext/debugData/requestUri`                     | New                                                                                |
| `/action/message`         | `/displayMessage`                                        | Generally less content                                                             |
| `/action/objectType`      | `/eventType`                                             | Generally contains different IDs (see [Event type mappings](#event-type-mappings)) |
|                           | `/legacyEventType`                                       | Contains `/action/objectType` as its value                                         |
|                           | `/outcome/result`                                        | Contains a value that is encoded in `/action/objectType` suffix                      |
| `/published`              | `/published`                                             | Contains slightly different values                                                 |
|                           | `/request/ipChain/0/geographicalContext`                 | New                                                                                |
|                           | `/request/ipChain/0/geographicalContext/city`            | New                                                                                |
|                           | `/request/ipChain/0/geographicalContext/country`         | New                                                                                |
|                           | `/request/ipChain/0/geographicalContext/geolocation`     | New                                                                                |
|                           | `/request/ipChain/0/geographicalContext/geolocation/lat` | New                                                                                |
|                           | `/request/ipChain/0/geographicalContext/geolocation/lon` | New                                                                                |
|                           | `/request/ipChain/0/geographicalContext/postalCode`      | New                                                                                |
|                           | `/request/ipChain/0/geographicalContext/state`           | New                                                                                |
| `/actors/1/ipAddress`     | `/request/ipChain/0/ip`                                  | New                                                                                |
|                           | `/request/ipChain/0/version`                             | New                                                                                |
|                           | `/securityContext`                                       | New                                                                                |
|                           | `/severity`                                              | New                                                                                |
| `/targets/0/displayName`  | `/target/0/displayName`                                  | Generally same values                                                              |
| `/targets/0/id`           | `/target/0/id`                                           | Generally same values                                                              |
| `/targets/0/login`        | `/target/0/alternateId`                                  | Generally same values                                                              |
| `/targets/0/objectType`   | `/target/0/type`                                         | Generally same values                                                              |
|                           | `/transaction/detail`                                    | Generally same values                                                              |
| `/requestId`              | `/transaction/id`                                        | When `/transaction/type` is `WEB`                                                  |
|                           | `/transaction/type`                                      | New                                                                                |
| `/eventId`                | `/uuid`                                                  | Different values                                                                   |
|                           | `/version`                                               | New                                                                                |

Note that there is only one `actor` in the System Log API compared to potentially multiple values in Events API's `actors` attribute. Instead, the System Log API adds a `client` attribute to hold any secondary actor to make it easier for consumers to access.

### Identity

The identity of a particular event distinguishes it from all other events instances. The Events API encodes this information in the `eventId` as a 25 character alpha-numeric value with the `tev` prefix (for example: `tev2FSkoWAARbKaFBBfPPXUWA1533221531000 `). On the other hand, the System Log API represents identity using a completely different scheme in the `uuid` attribute. As the field name suggests, these are UUIDs (for example: `b5ef15a1-e78f-4125-b425-cc10f04e24f3`) that are randomly-generated and unique. There is no identity value mapping between corresponding events of the two APIs. As a consequence, you can't infer one from the other.

All other system identifiers are unchanged (for example: user identifiers and application identifiers).

### Event types

[Event types]() are the primary method of organization within the Okta event system. They broadly categorize classes of events by an event type identifier. The System Log API has half the number of event types of the Events API. This helps event stream consumers identify and filter events more easily.

#### Outcome agnostic event types

To the extent possible, event types have removed the logical outcome of the occurrence from the event type ID. For example, the `user.session.start` event type replaces the following `/events` equivalents:

-  `core.user_auth.login_success`
-  `core.user_auth.login_denied`
-  `core.user_auth.login_failed`
-  `core.user_auth.login_failed.policy_denied`
-  `core.user_auth.invalid_certificate`

Instead, this information has been moved to the body of the event and is encoded in the [Outcome object](/docs/reference/api/system-log/#outcome-object):

```json
{
  "outcome": {
    "result": "FAILURE",
    "reason": "INVALID_LOGIN"
  }
}
```

This general pattern results in a reduced number of event types making them easier to comprehend and navigate.

#### Vendor agnostic event types

In `/events`, there are a multitude of events that include partner specific context information into the message. For example:

- `app.boxnet.api.error.personal_folder_sync_state`
- `app.concur.api.error.check_user_exists`
- `app.confluence.api.error.get.user`

These were primarily used to log errors and create debug context. With `/logs`, we've used a more generic event (for example, `application.call_api`) to log a severity "Debug" type message to capture this type of information. If the event is related to an app, that is included in the "target" and can be easily queried and accessed.

### Querying

#### Filtering

Syntactically, filtering between the two APIs is largely unchanged. For example, the `filter` parameter continues to use the [SCIM filter expressions](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) for expressing which events to return by constraining attribute values by various operators. However, the allowable attribute that can be searched is now almost unrestricted. Outside of `published`, any model attribute that exists can be queried. The following filter illustrates an expression that constrains the value of a sub-attribute:

```groovy
filter=debugContext.debugData.requestUri eq "/login/do-login"
```

This opens up many possibilities for selectively retrieving only the data of interest. However, as indicated above, `published` isn't supported in the `filter` parameter. To perform temporal filtering, `since` and `until` parameters must be used. See [Time Range](#time-range) for details.

Furthermore, the new API now supports the `co` "contains" operator where the specified value must be a substring of the attribute value.

A new "keyword filtering" feature has been introduced through the [`q` parameter](/docs/reference/api/system-log/#keyword-filter).

#### Time range

In the Events API, there is only one formal query parameter that supports defining the temporal scope of the events returned: `startDate`. In the System Log API, there is now `since` (the equivalent of `startDate`) and a new [`until` parameter](/docs/reference/api/system-log/#request-parameters) that defines the end time bound of the query interval. Both of these operate against the [`published ` attribute](/docs/reference/api/system-log/#attributes).

A subtle difference between `startDate` and `since`/`until` is that the former was very liberal in the format that was accepted. In the System Log API, `since`/`until` values are required to conform to [Internet Date/Time Format profile of ISO 8601](https://tools.ietf.org/html/rfc3339#page-8). The intention of this requirement is to reduce the risk of format ambiguity (for example: timezone offsets) causing accidental misuse by consumers.

#### Sorting

Sort ordering by `published` is now possible through the System Log API [`sortOrder` parameter](/docs/reference/api/system-log/#request-parameters). When combined with the `after` parameter, this enables queries to paginate through events in reverse chronological order in a lossless fashion. Paginating in chronological order is possible in both systems.

Note that sort order for polling requests is only approximate. Sort order for non-polling requests is exact. See [Polling Requests](/docs/reference/api/system-log/#polling-requests) for details.

> **Note:** The Events API doesn't support custom sorting.

### Limits

Both APIs support a `limit` query parameter that governs the number of events per request to return. In the Events API, the maximum and default value is 1,000 events. The System Log API shares the same maximum value. However, the default value is 100 events. See the [`limit` parameter](/docs/reference/api/system-log/#request-parameters) for details.

### Polling

Polling is the process used to reliably ingest data from Okta into an external system. Both APIs use the `after` parameter in conjunction with `Link` response headers to safely pull the event stream.

When you first make an API call and get a cursor-paged list of objects, the end of the list is the point at which you don't receive another `next` link value with the response. This holds true for all but two cases:

1. [Events API](/docs/reference/api/events): The `next` link always exists, since the [Events API](/docs/reference/api/events/) is like a stream of data with a cursor.
2. [System Log API](/docs/reference/api/system-log/): The `next` link always exists in polling queries in the [System Log API](/docs/reference/api/system-log/). A polling query is defined as an `ASCENDING` query with an empty or absent `until` parameter. Like in the [Events API](/docs/reference/api/events/), the polling query is a stream of data.

See [Transferring Data to a Separate System](/docs/reference/api/system-log/#transferring-data-to-a-separate-system) and the general information on [Link Headers](/docs/reference/api-overview/#link-header) for additional details.

## Event type mappings

The listing in the [Event type catalog](/docs/reference/api/event-types/#catalog) describes the complete relationship between the Events API and System Log API Event type systems. It describes how event types of one system map to the other, making it an invaluable resource for the migration process.

> **Important:** Going forward, the Events API isn't tracking new event types added to the System Log API. For this reason, we highly recommend upgrading to the System Log API.

## Resources

This section contains a collection of useful resources that may help in making the switch from `/events` to `/logs`.

### [developer.okta.com](http://developer.okta.com)

The following are the formal developer documentation pages of each API:

- [Events API](/docs/reference/api/events/)
- [System Log API](/docs/reference/api/system-log/)

### [help.okta.com](http://help.okta.com)

The following topic provides a list of possible System Log error events that can occur related to provisioning integrations:

- [Provisioning Integration Error Events](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_ref_apps_events)

### [support.okta.com](http://support.okta.com)

The following are a collection of informational articles that dive into specifics of the System Log and its API:

- [About the System Log](https://support.okta.com/help/Documentation/Knowledge_Article/About-the-System-Log-651903282)
- [Exporting Okta Log Data](https://support.okta.com/help/Documentation/Knowledge_Article/Exporting-Okta-Log-Data)
- [Using Session and Request ID Fields in the System Log](https://support.okta.com/help/Documentation/Knowledge_Article/65532538-Using-Session-and-Request-ID-Fields-in-the-System-Log)
- [Useful System Log Queries](https://support.okta.com/help/Documentation/Knowledge_Article/Useful-System-Log-Queries)

### [www.okta.com](http://www.okta.com)

The following covers what the System Log is and where to find it, how to translate logs to actual user activity, and how you can leverage the System Log during a security incident. It also reviews some of the actions you can take to respond to an incident identified within the System Log:

- [Okta Incident Response Guide](https://www.okta.com/incident-response-guide/)

### [github.com/OktaSecurityLabs](https://github.com/OktaSecurityLabs)

The following is a listing of Okta System Log event types of interest for security teams:

- [Security Events](https://github.com/OktaSecurityLabs/CheatSheets/blob/master/SecurityEvents.md)
