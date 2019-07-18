---
title: Register Your Endpoint
---

After implementing your external service, you need to register it with Okta. Currently, you need to use make a REST call to the [Event Hooks Management API](/docs/reference/api/event-hooks/) is required in order to do that. You can use a tool like Postman to make the call, and Okta provides an [Event Hooks Management API Postman collection](/docs/reference/api/event-hooks/#getting-started) for you to use.

The endpoint to call to register a new Event Hook is `POST https://{yourOktaDomain}/api/v1/eventHooks`. You include a JSON payload in the body of the request containing an [eventHook](/docs/reference/api/event-hooks/#event-hook-object) object, which specifies the properties of the Event Hook you are registering, including:

 - the URI of the your external service's endpoint
 - the list of specific event types this event hook should deliver
 - the secret value Okta should send in the authorization header of requests, to authenticate to your service

If creation of the new Event Hook is successful, Okta returns an `eventHook` object, confirming that the Event Hook object was created. The bject you get back also includes an `id` property, which is a unique value for the created event hook. You need that ID to perform updates late to this Event Hook object.

<NextSectionLink/>

