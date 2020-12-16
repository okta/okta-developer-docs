---
title: Initial verification
---
Okta Event Hooks require an initial verification of the external service endpoint prior to ongoing triggering of the Hook. For more information on this request, see [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

Add the following code to your external service to address this request.

> **Note:** Also, make sure to have the required default code and packages in your project. See [Overview and considerations](/docs/guides/overview-and-considerations/overview) for further information.

<StackSelector snippet="verification"/>

<NextSectionLink/>