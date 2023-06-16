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

The following is a full listing of event types used in the [System Log API](/docs/reference/api/system-log/) with associated description and related metadata. For migration purposes it also includes a mapping to the equivalent event type in the legacy [Events API](/docs/reference/api/events/).
The relationship between System Log API and Events API event types is generally one-to-many. Note that there are currently some System Log API event types which do not have an Events API equivalent.

> **Important:** As of April 20th, 2020, the Events API does not track new event types added to the System Log API. For this reason we highly recommend migrating to the System Log API. For more information, see our [Events API End of Life FAQ](https://support.okta.com/help/s/article/FAQ-Events-API-End-of-Life).
<br>

<EventTypes />
