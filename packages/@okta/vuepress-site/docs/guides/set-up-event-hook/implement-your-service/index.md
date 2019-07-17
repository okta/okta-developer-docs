---
title: Implement Your Service
---

You need to implement a web service with an Internet-accessible endpoint to receive event hook calls from Okta. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the REST requests it will send: see [Requests Sent by Okta](/docs/concepts/event-hooks/#requests-sent-by-okta). 

## Implement Handling for One-Time Verification Request

You need to also implement functionality in your web service to handle a one-time verification request Okta sends.

This verification request is triggered by you when you perform the step [Verify Your Endpoint](/docs/guides/set-up-event-hook/verify-your-endpoint), covered later in this guide. At that time, Okta sends a verification request to your endpoint, and your endpoint is expected to respond in a particular way.

The REST API contract for the request and response for this one-time verification request is different than the contract for the ongoing calls that deliver information about events. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request) for a description.

<NextSectionLink/>

