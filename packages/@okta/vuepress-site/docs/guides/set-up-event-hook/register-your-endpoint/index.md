---
title: Register Your Endpoint
---

After implementing your external service, you need to register it with Okta. Currently, to do this, you need to make a REST API call to the [Event Hooks Management API](/docs/reference/api/event-hooks/). You can use a tool like Postman to make the call, and Okta provides an Event Hooks Management API [Postman collection](/docs/reference/api/event-hooks/#getting-started) to facilitate this.

You call `POST https://{yourOktaDomain}/api/v1/eventHooks` to register your endpoint. You include a JSON payload in the body of the request containing an [eventHook](/docs/reference/api/event-hooks/#event-hook-object) object, which specifies the properties of the Event Hook you are registering, including:

 - the URI of the your external service's endpoint
 - the list of specific event types this event hook should deliver
 - the secret value Okta should send in the authorization header of requests, to authenticate to your service

If the operation is successful, Okta sends back a `200 OK` response containing an `eventHook` object too, confirming the properties of the created Event Hook. The object you get back also includes a system-generated `id` property, which is a unique identifier for the newly-created event hook. You need to provide this `id` later when using the Event Hooks Management API to perform additional operations on this Event Hook.

<NextSectionLink/>

