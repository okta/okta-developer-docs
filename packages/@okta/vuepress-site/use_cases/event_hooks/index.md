---
title: Event Hooks
excerpt: Use Okta events to drive custom process flows.
---

# Event Hooks

<ApiLifecycle access="ea" />

## What Are Okta Event Hooks?

Event hooks are outbound calls from Okta that are sent when specified events occur in your org. They take the form of HTTPS REST calls to a URL you specify, and encapsulate information about the events in JSON objects in the request body. You can use these calls from Okta as triggers for process flows within your own software systems.

To handle the calls, you need to implement a web service with an Internet-accessible endpoint. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the requests that it will send.

Event hooks are related to, but different from, Okta [inline hooks](/use_cases/inline_hooks/). Event hooks are meant only to provide information about events that occurred, not to let you affect the course of the internal Okta process flow that is being executed. Event hooks are asynchronous calls, meaning that the process flow that triggered the event hook continues without stopping or waiting for any response from your external service.

## Which Events are Eligible?

During the initial configuration procedure for an event hook, you specify the event types that you want the event hook to deliver, choosing from a subset of the event types that the Okta System Log captures. To see the list of event types that are currently eligible for use in event hooks, query the Event Types catalog with the query parameter `webhook-eligible`:

[https://developer.okta.com/docs/api/resources/event-types/?q=webhook-eligible](/docs/api/resources/event-types/?q=webhook-eligible)

## Requests Sent by Okta

### HTTP Header

The header of the request sent by Okta includes the following fields:

```http
Accept: application/json
Content-Type: application/json
Authorization: ${key}
```

### Authorization Header

The Authorization header is a secret string you provide to Okta when you register your event hook. This string serves as an API access key for your service, and Okta provides it in every request, allowing your code to check for its presence as a security measure. (This is not an Okta authorization token, it is simply a text string you decide on.)

## One-Time Verification Request

After registering an event hook, but before you can use it, you need to have Okta perform a one-time GET verification request to your endpoint, which serves as a test proving that you control the endpoint. Your web service therefore needs to implement logic to handle this. this one-time verification request is the only GET request Okta will send to your external service; the ongoing requests to notify your service of event occurrences will be HTTPS POST requests. 

The way you need to handle this one-time verification is as follows: The request from Okta will contain a header named `X-Okta-Verification-Token`. Your service needs to read the value of that header and return it in the response body, in a JSON object named `verification`, i.e.: `{ "verificationToken" : "value_from_header" }`.

## Ongoing Event Delivery Requests

For ongoing notification of events, Okta uses an HTTPS POST request to call your service. The JSON payload is where Okta provides specific information about events that have occurred. Information is encapsulated in the `data.events` object, which is an array in order to support multiple events. Each element of the array provides information on one event, using the format of the [LogEvent](/docs/api/resources/system_log/#example-logevent-object) that the [System Log API](/docs/api/resources/system_log/) defines.

## Timeout and Retry

When Okta calls your external service, it enforces a default timeout of 3 seconds. Okta will attempt at most one retry.

### Security

To secure the communication channel between Okta and your external service, HTTPS is used for requests, and support is provided for header-based authentication. Okta recommends that you implement an authentication scheme using the authentication header, to be used to authenticate every request received by your external service.

## Response

Your external service's response to Okta's POST should be empty and should have an HTTP status code of 200 (OK) or 204 (No Content).

## Event Hook Setup

### Registering an Event Hook

After creating your external service, you need to tell Okta it exists and configure it, by making a `POST` request to `/api/v1/eventHooks`. You use the JSON payload of the request to provide information on the event hook you are registering, including:

- the URI of your external service's endpoint
- the list of specific event types you want to use the event hook for
- the secret value Okta should send in the authorization header of requests

The response from Okta will confirm creation of the event hook and provide the unique ID value of the created event hook.

### Verifying an Event Hook

After registering the event hook, you need to trigger the one-time verification process, by making a `POST` request to `/api/v1/eventHooks/${eventHookId}/verify`. If successful, the JSON payload of the response from Okta will contain a property called `verfication` set to `VERIFIED`.

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
