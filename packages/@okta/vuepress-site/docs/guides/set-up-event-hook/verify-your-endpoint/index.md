---
title: Verify Your Endpoint
---

After registering the event hook, you need to trigger a one-time verification process by making a POST request to the /api/v1/eventHooks/${eventHookId}/lifecycle/verify API. See Event Hooks Management API.

If verification is successful, the JSON payload of the response to your call to the /verify API will contain a property called verificationStatus set to VERIFIED.

<NextSectionLink/>

