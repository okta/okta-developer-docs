---
title: Implement Your Service
---

You need to implement a web service with an Internet-accessible endpoint to receive event hook calls from Okta. It's your responsibility to develop the code and to arrange its hosting on a system external to Okta. Okta defines the REST API contract for the REST requests it will send. See [Requests Sent by Okta](/docs/concepts/event-hooks/#requests-sent-by-okta) for information. 

## Implement Handling for One-Time Verification Request

In addition to processing incoming event notifications from Okta, your service also needs to implement functionality to handle a one-time verification request that Okta sends to it.

This verification request is triggered when you perform the step [Verify Your Endpoint](/docs/guides/set-up-event-hook/verify-your-endpoint), covered later in this guide.

The REST API contract for this one-time verification request is different than the contract for the ongoing calls that deliver event notifications. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request) for a description.

<NextSectionLink/>

