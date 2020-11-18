---
title: Examine the Event Object
---
Depending on the Event Type that you select to trigger your Event Hook &ndash; see the [Event Types Reference](docs/reference/api/event-types/?q=event-hook-eligible) for all Event Hook eligible types &ndash; the properties in the Event Object may differ.

See the example Event Object payload below, which provides details on the deactivated user Event Type (`user.lifecycle.deactivate`).

The JSON body includes the properties accessed in this example, namely `target` and `displayName`. To see this or other Event Objects, call your Okta org with the [System Log API](docs/reference/api/system-log), using the specific event type as a [filter parameter](docs/reference/api/system-log/#filtering-results). For example:

```JavaScript
{url}/api/v1/logs?filter=eventType eq "user.lifecycle.deactivated"
```

<StackSelector snippet="event-object"/>

<NextSectionLink/>