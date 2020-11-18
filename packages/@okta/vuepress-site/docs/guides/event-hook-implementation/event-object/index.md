---
title: Examine the Event Object
---
Depending on the Event Type that you select to trigger your Event Hook - see the (Event Types Reference)[docs/reference/api/event-types/?q=event-hook-eligible]for all Event Hook eligible types - the properties in the Event Object may differ.

See the example Event Object payload below, which provides details on the deactivated user Event Type (`user.lifecycle.deactivate`).

The JSON content below is only a portion of the object but includes the properties accessed in this example, namely `target` and `displayName`. To see the full Event Object, call your Okta org with the System Log API, using the specific event type as a parameter:

get {{url}}api/v1/logs?filter=eventType eq "user.lifecycle.deactivated"

<ApiOperation method="get" url="/api/v1/logs"?filter=eventType eq "user.lifecycle.deactivated"/>

<StackSelector snippet="event-object"/>

<NextSectionLink/>