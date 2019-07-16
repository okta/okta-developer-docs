---
title: Implement Your Service
---

You need to implement a web service with an Internet-accessible endpoint to receive event hook calls from Okta. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the calls that it will send.

## Handling One-Time Verification Request

In adition to receiving the ongoing calls that deliver information about events occurring in your org, you need to also implement functionality in your web service to handle a one-time verification request that Okta will send.

The one-time verification is triggered is when you perform the step [Verify Your Endpoint](/docs/guides/set-up-event-hook/verify-your-endpoint), covered later in this guide. Okta sends the one-time verification request to your endpoint, and your endpoint is expected to respond in a particular way.

The pattern for the request and response for this one-time verification request is different than the pattern for the ongoing calls that deliver information about events. It is covered in [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request). As you code and implement your web service, you need to make sure to include implementation of functionality to handle the one-time verification request.

<NextSectionLink/>

