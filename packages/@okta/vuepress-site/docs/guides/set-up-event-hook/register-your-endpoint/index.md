---
title: Register Your Endpoint
---

After implementing your external service, you need to register it with Okta. A REST API call is required to do that, which you can use a tool like Postman to make.

The endpoint to call to register your external servivce is `https://{yourOktaOrg}/api/v1/eventHooks`. This needs to be a `POST` request and needs to include a JSON payload in the body containing an `eventHook` object. You use the properties of the `eventHook` object to specify the characteristics of the Event Hook you are registering, including:

 - the URI of your external service's endpoint.
 - the list of specific event types you want to use the event hook to deliver.
 - the secret value Okta should send in the authorization header of requests.

The response you receive will confirm creation of the event hook and provide you with the ID of the created event hook.

<NextSectionLink/>

