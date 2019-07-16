---
title: Register Your Endpoint
---

After implementing your external service, you need to register it with Okta. A REST API call is required to do that. You can use a tool like Postman to make that call.

The endpoint to call is `https://{yourOktaOrg}/api/v1/eventHooks`. You need to make a `POST` request and need to include a JSON payload in the body of the request containing an [eventHook](/docs/reference/api/event-hooks/#event-hook-object) object. You use the properties of the `eventHook` object to specify the properties of the Event Hook you are registering, including:

 - the URI of the your external service's endpoint
 - the list of specific event types you want to use the event hook to deliver
 - the secret value Okta should send in the authorization header of requests

The response you receive will confirm creation of the event hook and provide you with the ID of the created event hook.

<NextSectionLink/>

