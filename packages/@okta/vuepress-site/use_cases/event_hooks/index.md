---
title: Event Hooks
excerpt: Use Okta events to drive custom process flows.
---

# Event Hooks

<ApiLifecycle access="ea" />

## What Are Okta Event Hooks?

Event hooks are outbound calls from Okta to your own custom code, sent by Okta when specified events occur in your org. They take the form of REST calls to a URL you specify, with information about the event that occurred encapsulated in JSON objects in the request body. You can use these calls from Okta as triggers for process flows within your own software systems.

To handle the calls from Okta, you need to implement a web service with an Internet-accessible endpoint. It's your responsibility to arrange the hosting of your web service on a system external to Okta. Okta defines the REST API contract for the HTTPS requests it sends to your external service.

Okta event hooks are related to, but different from, Okta [inline hooks](/use_cases/inline_hooks/). Event hooks do not let you affect Okta's internal execution of process flows.

Event hooks are asynchronous calls, which means that the process flow that triggered the event hook continues without stopping.

## Which Events are Eligible?

When configuring an event hook, you specify the event types that you want the event hook to send you information about. The event types you can choose from are a subset of the catalog of event types used within the Okta System Log. You can see the list of event types currently-eligible for use with event hooks by querying the Event Types catalog with the query parameter `webhook-eligible`:

[https://developer.okta.com/docs/api/resources/event-types/?q=webhook-eligible](/docs/api/resources/event-types/?q=webhook-eligible)

## Event Hook Process Flow

### Request Overview

Okta's request to your external service consists of an HTTPS POST request with a JSON payload. The objects included in the JSON payload provide data relevant to the event type. The set of objects varies depending on the type of event.

## One-Time Verification Request


## Ongoing Event Delivery Requests

### HTTP Method

Okta uses an HTTPS POST request to call your service.

### HTTP Header

The header of the request sent by Okta includes the following fields:

```http
Accept: application/json
Content-Type: application/json
Authorization: ${key}
```

#### Authorization Header

The Authorization header is a secret string you provide to Okta when you register your external service. This string serves as an API access key for your service, and Okta provides it in every request, allowing your code to check for its presence as a security measure. (This is not an Okta authorization token, it is simply a text string you decide on.)

### JSON Payload Objects

The JSON payload is where Okta provides specific information about the process flow that's being executed, so that your external service can evaluate the specific situation. Information is encapsulated in JSON objects. The set of objects sent depends on the type of inline hook you're using. Objects are defined in the specific documentation for each type of inline hook.

The objects providing this information are nested within a larger object called `data`.

Always included is `data.context`, providing context information. In general, `data.context` encapsulates Okta objects that your external service cannot affect, while objects in `data` that are outside of `data.context` encapsulate objects that your external service does have the ability to affect, by means of the commands it sends in its response.

### Timeout and Retry

When Okta calls your external service, it enforces a default timeout of 3 seconds. Okta will attempt at most one retry. If the external service endpoint responds with a redirect, it is not followed.

### Security

To secure the communication channel between Okta and your external service, HTTPS is used for requests, and support is provided for header-based authentication. Okta recommends that you implement an authentication scheme using the authentication header, to be used to authenticate every request received by your external service.

## Response

Your external service's response to Okta's POST should be empty.

### HTTP Status Code

Your service should return an HTTP status code of 200 (OK) or 204 (No Content).

## Event Hook Setup

### Registering an Event Hook

After creating your external service, you need to tell Okta it exists, and enable it for a particular process flow. The steps are:

1. Create an external service.

1. Register your service's endpoint with Okta by making a `POST` request to `/api/v1/inlineHooks`. See [Inline Hooks Management API](/docs/api/resources/inline-hooks).

1. Associate the endpoint with a particular Okta process flow. How to do this varies by inline hook type.

For more information on implementing inline hooks, see the documentation for specific inline hook types linked to in [Currently-Supported Types](#currently-supported-types).

### Verifying an Event Hook



## Sample Event Delivery Payload

The following is an example of what the JSON payload of a request from Okta to your external service looks like:

```json
{
  "eventType": "com.okta.event_hook",
  "eventTypeVersion": "1.0",
  "cloudEventsVersion": "0.1",
  "eventID": "b5a188b9-5ece-4636-b041-482ffda96311",
  "eventTime": "2019-03-27T16:59:53.032Z",
  "source": "https://{yourOktaDomain}/api/v1/eventHooks/whoql0HfiLGPWc8Jx0g3",
  "data": {
    "events": [
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
          "id": "00u1qw6mqitPHM8AJ0g7",
          "type": "User",
          "alternateId": "admin@example.com",
          "displayName": "Example Admin"
        },
        "outcome": {
          "result": "SUCCESS"
        },
        "uuid": "f790999f-fe87-467a-9880-6982a583986c",
        "published": "2018-03-28T22:23:07.777Z",
        "eventType": "user.session.start",
        "displayMessage": "User login to Okta",
        "transaction": {
          "type": "WEB",
          "id": "V04Oy4ubUOc5UuG6s9DyNQAABtc"
        },
        "legacyEventType": "core.user_auth.login_success",
        "authenticationContext": {
          "authenticationStep": 0,
          "externalSessionId": "1013FfF-DKQSvCI4RVXChzX-w"
        }
      }
    ]
  }
}
```
