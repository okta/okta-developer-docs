---
title: Event Hooks
meta:
  - name: description
    content: Event Hooks are outbound calls from Okta, sent when specified events occur in your org. Get information on eligible events and setting up Event Hooks in this guide.
---

# Event Hooks

## What Are Okta Event Hooks?

Event Hooks are outbound calls from Okta, sent when specified events occur in your org. They take the form of HTTPS REST calls to a URL you specify, encapsulating information about the events in JSON objects in the request body. These calls from Okta are meant to be used as triggers for process flows within your own software systems.

To handle Event Hook calls from Okta, you need to implement a web service with an Internet-accessible endpoint. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the requests that it will send.

Event Hooks are Okta's implementation of the industry concept of webhooks. Okta's Event Hooks are related to, but different from, Okta [Inline Hooks](/docs/concepts/inline-hooks/): Event Hooks are meant to deliver information about events that occurred, not offer a way to affect execution of the underlying Okta process flow. Also, Event Hooks are asynchronous calls, meaning that the process flow that triggered the Event Hook continues without stopping or waiting for any response from your external service.

Before the introduction of Event Hooks, polling the [System Log API](/docs/reference/api/system-log/) was the only method your external software systems could use to detect the occurrence of specific events in your Okta org; Event Hooks provide an Okta-initiated push notification.

You can have a maximum of 10 active and verified Event Hooks set up in your org at any time, and each Event Hook can be configured to deliver multiple event types.

>Note: To deliver event information, Event Hooks use the data structure associated with the [System Log API](/docs/reference/api/system-log/), not the data structure associated with the older [Events API](/docs/reference/api/events/).

## Which Events are Eligible?

During the initial configuration procedure for an Event Hook, you specify which event types you want the Event Hook to deliver. The event types that can be specified are a subset of the event types that the Okta System Log captures.

To see the list of event types currently eligible for use in Event Hooks, query the Event Types catalog with the query parameter `event-hook-eligible`:

<https://developer.okta.com/docs/reference/api/event-types/?q=event-hook-eligible>

For general information on how Okta encapsulates events, see the [System Log API](/docs/reference/api/system-log/) documentation.

Examples of available types of events include user lifecycle changes, the completion by a user of a specific stage in an Okta process flow, and changes in Okta objects. You could configure an Event Hook, for example, to deliver notifications of user deactivation events. You could use this to trigger processes that you need to execute internally every time a user is deactivated, such as updating a record in an HR system, creating a ticket in a support system, or generating an email message.

## Requests Sent by Okta

When events occur in your org that match an event type that you configured your Event Hook to deliver, the Event Hook is automatically triggered and sends a request to your external service. The JSON payload of the request provides information on the event. A sample JSON payload is provided in [Sample Event Delivery Payload](#sample-event-delivery-payload) below.

The requests sent from Okta to your external service are HTTPS requests. POST requests are used for the ongoing delivery of events, and a one-time GET request is used for verifying your endpoint.

### One-Time Verification Request

After registering an Event Hook, but before you can use it, you need to have Okta make a one-time GET verification request to your endpoint, passing your service a verification value that your service needs to send back. This serves as a test confirming that you control the endpoint.

This one-time verification request is the only GET request Okta will send to your external service, while the ongoing requests to notify your service of event occurrences will be HTTPS POST requests. Your web service can use the GET versus POST distinction to implement logic to handle this special one-time request.

The way your service needs to handle this one-time verification is as follows: The request from Okta will contain an HTTP header named `X-Okta-Verification-Challenge`. Your service needs to read the value of that header and return it in the response body, in a JSON object named `verification`, that is: `{ "verification" : "value_from_header" }`. Note that the value comes to you in an HTTP header, but you need to send it back in a JSON object.

See [Event Hooks](/docs/guides/event-hook-implementation) for a working example of an Event Hook setup, including code that completes the one-time verification step.

### Ongoing Event Delivery

After verification, for ongoing notification of events, Okta sends HTTPS POST requests to your service. The JSON payload of these requests is where Okta provides specific information about events that have occurred.

Information is encapsulated in the JSON payload in the `data.events` object. The `data.events` object is an array, in order to allow sending multiple events in a single POST request. Events that occur within a short time of each other will be amalgamated, with each element of the array providing information on one event.

The content of each array element is an object of the [LogEvent](/docs/reference/api/system-log/#example-logevent-object) type. This is the same object that the [System Log API](/docs/reference/api/system-log/) defines for System Log events. See the documentation there for information on the object and its sub-objects.

Delivery of events is best effort. Events are delivered at least once. Delivery may be delayed by network conditions. In some cases, multiple requests may arrive at the same time after a delay, or events may arrive out of order. To establish ordering, you can use the time stamp contained in the `data.events.published` property of each event. To detect duplicated delivery, you can compare the `data.events.uuid` value of incoming events against the values for events previously received.

No guarantee of maximum delay between event occurrence and delivery is currently specified.

### Timeout and Retry

When Okta calls your external service, it enforces a default timeout of 3 seconds. Okta will attempt at most one retry. Responses with a 4xx status code are not retried.

> **Note:** You need to make sure that your external service can send responses to requests from Okta within the 3 second timeout limit.

See [Your Service's Responses to Event Delivery Requests](#your-service-s-responses-to-event-delivery-requests) below for more information on the HTTP responses you need to send.

### HTTP Headers

The header of requests sent by Okta will look like this, provided you configure an authorization header, as recommended, and do not define additional custom headers:

```http
Accept: application/json
Content-Type: application/json
Authorization: ${key}
```

The value sent in the Authorization header is a secret string you provide to Okta when you register your Event Hook. This string serves as an API access key for your service, and Okta provides it in every request, allowing your code to check for its presence as a security measure. (This is not an Okta authorization token, it is simply a text string you decide on.)

### Security

To secure the communication channel between Okta and your external service, HTTPS is used for requests, and support is provided for header-based authentication. Okta recommends that you implement an authentication scheme using the authentication header, to be used to authenticate every request received by your external service.

### Your Service's Responses to Event Delivery Requests

Your external service's responses to Okta's ongoing event delivery POST requests should all be empty, and should have an HTTP status code of 200 (OK) or 204 (No Content).

As a best practice, you should return the HTTP response immediately, rather than waiting for any of your own internal process flows triggered by the event to complete.

> **Note:** If your service does not return the HTTP response within the timeout limit, Okta will log the delivery attempt as a failure.

### Rate Limits

Event Hooks are limited to sending 100,000 events per 24-hour period. 

### Debugging

The Okta [System Log](/docs/reference/api/system-log/) is the best resource for helping you debug your Event Hooks. Any events delivered by Event Hooks are, by definition, also System Log Events, so you can compare events delivered to your external service with events logged in the System Log. You can also check for Event Hook delivery failures that Okta has detected, which are themselves recorded in the System Log.

When looking at an event in the System Log, the `debugData` property includes the specific ID of any Event Hooks configured to deliver it. Note that the existence of an Event Hook ID in this property does not indicate that delivery was successful, only that it was configured to happen for the event.

Event Hook delivery attempts that have timed-out, or been detected as having failed for any other reason, are recorded in the System Log in the form of `event_hook.delivery` [events](/docs/reference/api/event-types/?q=event_hook.delivery).

## Event Hook Setup

The basic steps to register and verify a new Event Hook are as follows:

- Implement your external web service to receive Event Hook calls from Okta.
- Register the endpoint of your external service with Okta and configure Event Hook parameters.
- Verify to Okta that you control the endpoint.
- Preview the Event Hook in the Admin Console.

For a working example of an end-to-end Event Hook setup, see the [Event Hook guide](/docs/guides/event-hook-implementation).

### Implement your service

You need to implement a web service with an Internet-accessible endpoint to receive Event Hook calls from Okta. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the REST requests it sends to your service. See [Requests Sent by Okta](/docs/concepts/event-hooks/#requests-sent-by-okta) for information on the REST API contract.

### Register your endpoint

After implementing your external service, you need to register it with Okta. To do so, you use the Admin Console from the **Workflow > Event Hooks** page. For details on this procedure, see [Add Event Hooks](https://help.okta.com/en/prod/Content/Topics/automation-hooks/add-event-hooks.htm).

### Verify your endpoint

After registering the Event Hook, you need to trigger a one-time verification process by clicking the Verify button that is displayed in Admin Console. When you trigger verification, Okta calls out to your external service, making the one-time verification request to it. You need to have implemented functionality in your service to handle the expected request and response. The purpose of this step is to prove that you control the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request) for more information.

### Preview your hook

You can preview the the JSON payload for the Event Hook request from the Admin Console's **Preview** tab, which provides a review of the Event Hook request syntax for the specific Event Type. The request can be delivered to your external service to make sure it is successfully received. See [Event Hook Preview](https://help.okta.com/en/prod/Content/Topics/automation-hooks/event-hooks-preview.htm) for more information.

## Sample Event Delivery Payload

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
