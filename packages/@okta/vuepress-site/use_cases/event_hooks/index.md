---
title: Event Hooks
excerpt: Use Okta events to drive custom process flows.
---

# Event Hooks

<ApiLifecycle access="ea" />

## What Are Okta Event Hooks?

Event hooks are outbound calls from Okta, sent when specified events occur in your org. They take the form of HTTPS REST calls to a URL you specify, encapsulating information about the events in JSON objects in the request body. These calls from Okta are meant to be used as triggers for process flows within your own software systems.

To handle event hook calls from Okta, you need to implement a web service with an Internet-accessible endpoint. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the requests that it will send.

Event hooks are related to, but different from, Okta [inline hooks](/use_cases/inline_hooks/). Event hooks are meant to provide information about events that occurred, not offer a way to affect the underlying Okta process flow. For that, you need to use inline hooks. Also, unlike inline hooks, event hooks are asynchronous calls, meaning that the process flow that triggered the event hook continues without stopping or waiting for any response from your external service.

## Which Events are Eligible?

During the initial configuration procedure for an event hook, you specify which event types you want the event hook to deliver. The event types that can be specified are a subset of the event types that the Okta System Log captures. To see the list of event types currently eligible for use in event hooks, query the Event Types catalog with the query parameter `event-hook-eligible`:

[https://developer.okta.com/docs/api/resources/event-types/?q=event-hook-eligible](/docs/api/resources/event-types/?q=event-hook-eligible)

## Requests Sent by Okta

The requests sent from Okta to your external service are HTTPS requests. POST requests are used for the ongoing delivery of events, and a one-time GET request is used for verifying your endpoint.

### One-Time Verification Request

After registering an event hook, but before you can use it, you need to have Okta make a one-time GET verification request to your endpoint, passing your service a verification value that it needs to send back. This serves as a test confirming that you control the endpoint.

This one-time verification request is the only GET request Okta will send to your external service, while the ongoing requests to notify your service of event occurrences will be HTTPS POST requests. Your web service can use the GET versus POST distinction to implement logic to handle this special one-time request.

The way your service needs to handle this one-time verification is as follows: The request from Okta will contain an HTTP header named `X-Okta-Verification-Challenge`. Your service needs to read the value of that header and return it in the response body, in a JSON object named `verification`, i.e.: `{ "verification" : "value_from_header" }`. Note that the value comes to you in an HTTP header, but you need to send it back in a JSON object.

### Ongoing Event Delivery

After verification, for ongoing notification of events, Okta sends HTTPS POST requests to your service. The JSON payload of these requests is where Okta provides specific information about events that have occurred.

Information is encapsulated in the JSON payload in the `data.events` object. The `data.events` object is an array, in order to allow sending multiple events in a single POST request. Events that occur within a short time of each other will be amalgamated, with each each element of the array providing information on one event.

 The content of each array element is an object of the [LogEvent](/docs/api/resources/system_log/#example-logevent-object) type. This is the same object that the [System Log API](/docs/api/resources/system_log/) defines for System Log events. See the documentation there for information on the object and its sub-objects.

 Delivery of events is best effort. Events are delivered at least once. Delivery may be delayed by network conditions. In some cases, multiple requests may arrive at the same time after a delay, or events may arrive out of order. To establish ordering, you can use the time stamp contained in the `data.events.published` property of each event.

### Timeout and Retry

When Okta calls your external service, it enforces a default timeout of 3 seconds. Okta will attempt at most one retry. Responses with a 4xx status code are not retried.

### HTTP Headers

The header of requests sent by Okta will look like this, provided you configure an authorization header, as recommended, and do not define additional custom headers:

```http
Accept: application/json
Content-Type: application/json
Authorization: ${key}
```

The value sent in the Authorization header is a secret string you provide to Okta when you register your event hook. This string serves as an API access key for your service, and Okta provides it in every request, allowing your code to check for its presence as a security measure. (This is not an Okta authorization token, it is simply a text string you decide on.)

### Security

To secure the communication channel between Okta and your external service, HTTPS is used for requests, and support is provided for header-based authentication. Okta recommends that you implement an authentication scheme using the authentication header, to be used to authenticate every request received by your external service.

### Your Service's Responses to Event Delivery Requests

Your external service's responses to Okta's ongoing event delivery POST requests should all be empty, and should have an HTTP status code of 200 (OK) or 204 (No Content).

## Event Hook Setup

### Registering an Event Hook

After implementing your external service, you need to tell Okta it exists and configure it, by making a POST request to the `/api/v1/eventHooks` API. You use the JSON payload of that request to provide information on the event hook you are registering, including:

- the URI of your external service's endpoint
- the list of specific event types you want to use the event hook for
- the secret value Okta should send in the authorization header of requests

The response you receive will confirm creation of the event hook and provide you with the unique ID value of the created event hook.

### Verifying an Event Hook

After registering the event hook, you need to trigger the one-time verification process by making a POST request to the `/api/v1/eventHooks/${eventHookId}/verify` API. Okta will then make the GET request to your endpoint. If verification is successful, the JSON payload of the response to your call to the `/verify` API will contain a property called `verfication` set to `VERIFIED`.

## Sample Event Delivery Payload

The following is an example of a JSON payload of a request from Okta to your external service:

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
