---
# To update the data in this table, please see https://bit.ly/2xsgk47

weight: 2
title: Event Types
showToc: false
excerpt: Catalogs the Okta event type system for System Log API.
---

# Event Types

Event types are the primary method of categorization within the Okta eventing platform. They allow consumers to easily group notable system occurrences based on behavior. This resource contains the complete event type catalog of this platform.

## Catalog

The following is a full listing of event types used in the [System Log API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog) with associated description and related metadata.

Download a CSV file with all event types: [Okta Event Types](/docs/okta-event-types.csv).

>**Note:** Certain tags on the event type indicate the specific behavior of the associated System Log events:<br>
>
> * `oie-only`: This event type is only available in Okta Identity Engine enabled orgs
> * `event-hook-eligible`: This event type is eligible for use with an event hook
> * `changeDetails`: This event type may include the `changeDetails` object within an associated target

<EventTypes />
