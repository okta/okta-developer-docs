---
title: Implement Your Service
---

To handle event hook calls from Okta, you need to implement a web service with an Internet-accessible endpoint. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the requests that it will send.

## Handling One-Time Verification Request

In adition to handling the ongoing calls that deliver information about events , you need to implement functionality in your web service to handle a one-time verification request Okta sends.

The point at which this one-time verification request is triggered is when you perform the step [Verify Your Endpoint](/docs/guides/set-up-event-hook/verify-your-endpoint), covered later in this guide. In that step, you make a manual request to Okta to verify your endpoint. Okta then sends the one-time verification request to your endpoint, and your endpoint is expected to respond in a particular way.

The pattern for the request and response for this one-time verification request is different than for the ongoing calls that deliver information about events. It is covered in [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request), and you need to implement functionality in your web service to handle it correctly.

<NextSectionLink/>

