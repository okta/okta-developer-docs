---
title: Register Your Endpoint
---

After implementing your external service, you need to register it with Okta. At present, a REST API call is required to do that. You can use a tool like Postman to make the call.

The endpoint to call is `https://{yourOktaOrg}/api/v1/eventHooks`. Your call needs to be a `POST` request and needs to include a JSON payload containing an `eventHook` object. You use the properties of that object to specify information for the Event Hook you are registering, including:

 - the URI of your external service's endpoint.
 - the list of specific event types you want to use the event hook to deliver.
 - the secret value Okta should send in the authorization header of requests.

The response you receive will confirm creation of the event hook and provide you with the ID of the created event hook.


<NextSectionLink/>

