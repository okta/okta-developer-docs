---
title: Event hooks concepts
meta:
  - name: description
    content: Event hooks are outbound calls from Okta, sent when specified events occur in your org. Get information on eligible events and setting up Event hooks in this guide.
---

# Event hooks

## What are Okta event hooks?

Event hooks are outbound calls from Okta, sent when specified events occur in your org. They take the form of HTTPS REST calls to a URL you specify, encapsulating information about the events in JSON objects in the request body. These calls from Okta are meant to be used as triggers for process flows within your own software systems.

To handle event hook calls from Okta, you need to implement a web service with an internet-accessible endpoint. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the requests that it sends.

Okta event hooks are an implementation of the industry concept of webhooks. Okta event hooks are related to, but different from, Okta [inline hooks](/docs/concepts/inline-hooks/): Event hooks are meant to deliver information about events that occurred, not to provide a way to affect the execution of the underlying Okta process flow. Event hooks are asynchronous calls, meaning that the process flow that triggered the event hook continues without stopping or waiting for any response from your external service.

Before the introduction of event hooks, polling the [System Log API](/docs/reference/api/system-log/) was the only method your external software systems could use to detect the occurrence of specific events in your Okta org. Event hooks provide an Okta-initiated push notification.

You can have a maximum of 10 active and verified event hooks set up in your org at any time. Each event hook can be configured to deliver multiple event types.

>Note: To deliver event information, event hooks use the data structure associated with the [System Log API](/docs/reference/api/system-log/), not the data structure associated with the older [Events API](/docs/reference/api/events/).

## Which events are eligible?

During the initial configuration procedure for an event hook, you specify which event types you want the event hook to deliver. The event types that can be specified are a subset of the event types that the Okta System Log captures.

To see the list of event types currently eligible for use in event hooks, use the [Event types catalog](/docs/reference/api/event-types/#catalog) and search with the parameter `event-hook-eligible`.

For general information on how Okta encapsulates events, see the [System Log API](/docs/reference/api/system-log/) documentation.

Event types include user lifecycle changes, the completion by a user of a specific stage in an Okta process flow, and changes in Okta objects. You can configure an event hook, for example, to deliver notifications of user deactivation events. You can use hooks to trigger processes that you need to execute internally every time a user is deactivated. For example, updating a record in an HR system, creating a ticket in a support system, or generating an email message.

## Requests sent by Okta

When events occur in your org that match an event type monitored by your event hook, the event hook is automatically triggered and sends a request to your external service. The JSON payload of the request provides information on the event. A sample JSON payload is provided in [Sample event delivery payload](#sample-event-delivery-payload).

The requests sent from Okta to your external service are HTTPS requests. POST requests are used for the ongoing delivery of events, and a one-time GET request is used for verifying your endpoint.

### One-time verification request

After registering an event hook, you need to have Okta make a one-time GET verification request to your endpoint, passing your service a verification value that your service needs to send back. This verification serves as a test to confirm that you control the endpoint.

This one-time verification request is the only GET request Okta sends to your external service. Ongoing requests to notify your service of event occurrences are HTTPS POST requests. Your web service can use the GET versus POST distinction to implement logic to handle this special one-time request.

The way your service needs to handle this one-time verification is as follows: The request from Okta contains an HTTP header named `x-okta-verification-challenge`. Your service needs to read the value of that header and return it in the response body, in a JSON object named `verification`: that is: `{ "verification" : "value_from_header" }`. The `value_from_header` is found in the request HTTP header, but you need to send it back in a JSON object.

See [Event hooks](/docs/guides/event-hook-implementation) for a working example of an event hook setup, including code that completes the one-time verification step.

### Ongoing event delivery

After verification, for ongoing notification of events, Okta sends HTTPS POST requests to your service. The JSON payload of these requests is where Okta provides specific information about events that have occurred.

Information is encapsulated in the JSON payload in the `data.events` object. The `data.events` object is an array that contains multiple events in a single POST request. Events that occur within a short time of each other are amalgamated in the array, and each array element contains information on one event.

The content of each array element is an object of the [LogEvent](/docs/reference/api/system-log/#example-logevent-object) type. This is the same object that the System Log API defines for system log events. See [System Log API](/docs/reference/api/system-log/) for information on the object and its sub-objects.

Okta delivers events on a best-effort basis. Events are delivered at least once. Delivery can be delayed by network conditions. Sometimes, multiple requests may arrive at the same time after a delay, or events may arrive out of order. To establish ordering, you can use the time stamp contained in the `data.events.published` property of each event. To detect duplicated delivery, you can compare the `eventId` value of incoming events against the values for events previously received.

There is no guarantee of maximum delay between event occurrence and delivery.

### Timeout and retry

When Okta calls your external service, it enforces a default timeout of 3 seconds. Okta attempts at most one retry. Responses with a 4xx status code aren't retried.

> **Note:** Ensure that your external service can send responses to requests from Okta within the 3-second timeout limit.

See [Your Service's responses to event delivery requests](#your-service-s-responses-to-event-delivery-requests) for more information on the HTTP responses that you need to send.

### HTTP headers

The header of requests sent by Okta appears as follows, provided that you configure the recommended authorization header and don't define additional custom headers:

```http
Accept: application/json
Content-Type: application/json
Authorization: ${key}
```

The value sent in the Authorization header is a secret string that you provide to Okta when you register your event hook. This string serves as an API access key for your service, and Okta provides it in every request, allowing your code to check for its presence as a security measure. (This isn't an Okta authorization token, it's simply a text string you decide on.)

### Security

To secure the communication channel between Okta and your external service, use HTTPS for requests, and support is provided for header-based authentication. Okta recommends that you implement an authentication scheme using the authentication header, to be used to authenticate every request received by your external service.

### Your service's responses to event delivery requests

Your external service's responses to ongoing POST requests should be empty and have an HTTP status code of 200 (OK) or 204 (No Content).

As a best practice, you should return the HTTP response immediately, rather than waiting for any of your own internal process flows triggered by the event to complete.

> **Note:** If your service doesn't return the HTTP response within the timeout limit, Okta logs the delivery attempt as a failure.

### Rate limits

Event hooks aren't triggered after reaching a limit of 400,000 applicable events, per org, per day.

### Debugging

The Okta [System Log](/docs/reference/api/system-log/) is the best resource for helping you debug your event hooks. Events delivered by event hooks are, by definition, also system log events. You can compare events delivered to your external service with events logged in the system log. You can also check for event hook delivery failures that Okta detected, which are themselves recorded in the system log.

When looking at an event in the system log, the `debugData` property includes the specific ID of any event hooks configured to deliver it. The existence of an event hook ID in this property doesn't indicate that delivery was successful, but that it was only configured to happen for the event.

Event hook delivery attempts that have timed-out, or been detected as having failed for any other reason, are recorded in the System Log in the form of `event_hook.delivery` [events](/docs/reference/api/event-types/?q=event_hook.delivery).

## Event hook setup

The basic steps to register and verify a new event hook are as follows:

- Implement your external web service to receive event hook calls from Okta.
- Register the endpoint of your external service with Okta and configure event hook parameters.
- Verify to Okta that you control the endpoint.
- Preview the event hook in the Admin Console.

For a working example of an end-to-end event hook setup, see the [Event hook guide](/docs/guides/event-hook-implementation).

### Implement your service

Implement a web service with an internet-accessible endpoint to receive event hook calls from Okta. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the REST requests it sends to your service. See [Requests sent by Okta](/docs/concepts/event-hooks/#requests-sent-by-okta) for information on the REST API contract.

### Register your endpoint

After implementing your external service, you need to register it with Okta. To do so, you use the Admin Console from the **Workflow > Event Hooks** page. For details on this procedure, see [Add event hooks](https://help.okta.com/okta_help.htm?id=ext-add-event-hooks).

### Verify your endpoint

After registering the event hook, you need to trigger a one-time verification process by clicking the **Verify** button in the Admin Console. When you trigger a verification, Okta calls out to your external service, making the one-time verification request to it. You need to have implemented functionality in your service to handle the expected request and response. The purpose of this step is to prove that you control the endpoint. See [One-time verification request](/docs/concepts/event-hooks/#one-time-verification-request).

### Preview your hook

You can preview the JSON payload for the event hook request from the Admin Console's **Preview** tab. This preview provides a review of the request syntax for the specific event type. The request can be delivered to your external service to make sure it's successfully received. See [Event hook preview](https://help.okta.com/okta_help.htm?id=ext-event-hooks-preview).

## Sample event delivery payload

The following is an example of a JSON payload of a request from Okta to your external service:

```json
{
  "eventType": "com.okta.event_hook",
  "eventTypeVersion": "1.0",
  "cloudEventsVersion": "0.1",
  "contentType": "application/json",
  "eventId": "b5a188b9-5ece-4636-b041-482ffda96311",
  "eventTime": "2019-03-27T16:59:53.032Z",
  "source": "https://${yourOktaDomain}/api/v1/eventHooks/whoql0HfiLGPWc8Jx0g3",
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
