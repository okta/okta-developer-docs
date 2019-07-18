---
title: Verify Your Endpoint
---

After registering the event hook, you need to trigger a one-time verification process by making a POST request to `POST https://{yourOktaDomain}/api/v1/eventHooks/${id}/lifecycle/verify`. The `id` is the system-generated unique ID value for the Event Hook object, which Okta returned in the `eventHook` object when you regigstered the event hook.

When Okta receives this request, it, in turn, calls out to your external service, making a verification request to it. The purpose of this step is to prove that you control the endpoint. You need to have implemented functionality in your service to handle the expected request and response.

If verification is successful, Okta responds to your call to the the `/verify` endpoint with an Event Hook object that includes a property named `verificationStatus` set to `VERIFIED`.

<NextSectionLink/>

