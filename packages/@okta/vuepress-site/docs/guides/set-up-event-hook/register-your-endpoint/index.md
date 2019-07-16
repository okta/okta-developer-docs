---
title: Register Your Endpoint
---

After implementing your external service, you need to register it with Okta.

by making a POST request to the /api/v1/eventHooks API. You use the JSON payload of that request to provide information on the event hook you are registering, including:

 - the URI of your external service's endpoint
 - the list of specific event types you want to use the event hook to deliver
 - the secret value Okta should send in the authorization header of requests


The response you receive will confirm creation of the event hook and provide you with the unique ID value of the created event hook.


<NextSectionLink/>

