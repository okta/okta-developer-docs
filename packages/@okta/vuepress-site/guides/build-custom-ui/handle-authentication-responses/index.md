---
title: Handle authentication responses
---
Every authentication transaction starts with primary authentication which validates a user's primary password credential. Password Policy, MFA Policy, and Sign-On Policy are evaluated during primary authentication to determine if the user's password is expired, a factor should be enrolled, or additional verification is required. The [transaction state](https://developer.okta.com/docs/api/resources/authn/#transaction-state) of the response depends on the user's status, group memberships and assigned policies.

<StackSelector snippet="handle-responses" />

<NextSectionLink/>
