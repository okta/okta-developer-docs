---
title: Register Your Endpoint
---

After implementing your external service, you need to register it with Okta. To do so, you use the Admin Console.

### Getting there

In Admin Console, go to **Workflow > Event Hooks**. Click **Create Event Hook**. The screen that is displayed lets you specify the following items:

 - the URI of your external service's endpoint
 - the list of specific event types this Event Hook should deliver
 - the secret value Okta should send in the authorization header of requests, to authenticate to your service

See [Event Hook Object](/docs/reference/api/event-hooks/#event-hook-object) for a description of the underlying objects.

**Note:** The **Authentication field** box lets you specify the header name for the authorization header. This is separate from the **Authentication secret**, which is where you specify the actual secret to send as the value of the authentication header. Typically, you would simply set the name of the header to "Authentication".

<NextSectionLink/>

