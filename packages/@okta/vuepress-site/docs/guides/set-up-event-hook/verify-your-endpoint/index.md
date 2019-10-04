---
title: Verify Your Endpoint
---

After registering the event hook, you need to trigger a one-time verification process, by making a `POST` request to `https://${yourOktaDomain}/api/v1/eventHooks/${id}/lifecycle/verify`. The `id` value here belongs to the Event Hook object which Okta returned when when you registered the event hook.

When Okta receives your request, it, in turn, calls out to your external service, making a one-time verification request to it. You need to have implemented functionality in your service to handle the expected request and response. The purpose of this step is to prove that you control the endpoint. 

If verification is successful, Okta responds to your call to the `/verify` endpoint with an Event Hook object that includes a property named `verificationStatus` set to `VERIFIED`.

<NextSectionLink/>

