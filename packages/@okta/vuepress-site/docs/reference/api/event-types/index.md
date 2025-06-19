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

The following is a full list of event types used in the [System Log API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/) with associated descriptions and related metadata.

Download a CSV file with all event types: [Okta Event Types](/docs/okta-event-types.csv).

>**Note:** Certain tags on the event type indicate the specific behavior of the associated System Log events:<br>
>
> * <img src="/img/oie-only-tag.png" alt="An image of the oie-only tag that appears on the event type description." style="vertical-align: middle; padding-bottom: 0; height: 2em;" />: This event type is only available in Okta Identity Engine enabled orgs
> * <img src="/img/event-hook-eligible-tag.png" alt="An image of the event hook eligible tag that appears on the event type description." style="vertical-align: middle; padding-bottom: 0; height: 2em;" />: This event type is eligible for use with an event hook
> * <img src="/img/changeDetails tag.png" alt="An image of the changeDetails tag that appears on the event type description." style="vertical-align: middle; padding-bottom: 0; height: 2em;" />: This event type may include the `changeDetails` object within an associated target

<EventTypes />
