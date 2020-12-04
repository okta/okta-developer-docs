---
title: Overview
---
This guide provides example code for an external service to respond to calls from an Okta Event Hook.

Event Hooks are outbound calls from Okta that can be used to notify your own software systems of events occurring in your Okta org. See [Event Hooks](/docs/concepts/event-hooks/) for an overview.

Setting up an Event Hook in your Okta org requires the following generic steps:

1. Implement your external web service to receive Event Hook calls from Okta.
2. Register the endpoint of your external service with Okta and configure Event Hook parameters.
3. Verify to Okta that you control the endpoint.
4. Begin receiving ongoing delivery of event notifications.

These steps are explained in the following Event Hook example, which uses the Okta event of a user deactivation. When this event occurs, the example external service code receives an Okta request. The external service responds with an acknowledgement to Okta that the request has been received and, in this example, simply displays the deactivated user’s name to the console.

This guide uses the website [Glitch.com](https://glitch.com) to act as an external service and to implement the Event Hook with an Okta org. See the following Glitch project to copy a working code example that implements the following scenario or build your own using the code snippets:

[Okta Event Hook Example](https://glitch.com/~okta-event-hook/)

> **Tip:** For another in-depth look at an Event Hook implementation, see the following Developer Experience blog example by Heather Wallander, [Build Easy User Sync Webhooks with Okta](https://developer.okta.com/blog/2020/07/20/easy-user-sync-hooks).

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>