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
> * <span class="event-type-tag">oie-only</span>: This event type is only available in Okta Identity Engine enabled orgs
> * <span class="event-type-tag">event-hook-eligible</span>: This event type is eligible for use with an event hook
> * <span class="event-type-tag">changeDetails</span>: This event type may include the `changeDetails` object within an associated target

<EventTypes />

<style>

.event-type-tag::before {
  content: "";
  padding: 2px 4px;
  font-family: "fontawesome";
}

.event-type-tag {
  display: block;
  float: left;
  margin: 2px;
  padding: 1px 3px;
  border: 1px solid #DCDCDC;
  border-radius: 3px;
  background-color: #ffffff;
  font-size: 0.7em;
  font-family: "Menlo"
}

</style>
