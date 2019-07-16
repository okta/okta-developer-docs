---
title: Implement Your Service
---

Event Hooks take the form of HTTPS REST calls to a URL you specify, encapsulating information about the events in JSON objects in the request body. These calls from Okta are meant to be used as triggers for process flows within your own software systems.

To handle event hook calls from Okta, you need to implement a web service with an Internet-accessible endpoint. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the requests that it will send.

See [Requests Sent by Okta](/docs/concepts/event-hooks/#requests-sent-by-okta) for information on the HTTPS calls your web service needs to handle.

## Handling Ongoing Event Delivery

The main type of requests that Okta will send to your web service are HTTPS POST requests containing notification of events that occur, with information about each event encapsulated in the JSON payload of the request.

## Handling One-Time Verification Request

In adition to handling ongoing notification of events, you need to implement functionality in your web service to handle a one-time verification requestthat Okta will send. This request is sent as an HTTPS GET. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

<NextSectionLink/>

