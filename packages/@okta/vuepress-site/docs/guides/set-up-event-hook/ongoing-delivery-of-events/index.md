---
title: Ongoing Delivery of Events
---

After your event hook is verified, delivery of events to your endpoint can begin. There can be a delay, however, of up to a minute between successful verification of an Event Hook and it becoming operational.

Every time an event of a type that the Event Hook is subscribed to occurs in your Okta org, the Event Hook fires and calls out to your external service, delivering information about the event in the JSON payload of the call. See [Ongoing Event Delivery](/docs/concepts/event-hooks/#ongoing-event-delivery) for full details.

## Next Steps

See the Event Hooks [Overview](/docs/concepts/event-hooks/) for more information on Event Hooks.
