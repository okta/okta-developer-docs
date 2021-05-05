---
title: Handle authentication responses
---
Every authentication transaction starts with primary authentication, which validates a user's password. Password Policy, MFA Policy, and Sign-On Policy are evaluated during primary authentication to determine if the user's password is expired, a factor should be enrolled, or additional verification is required. The [transaction state](https://developer.okta.com/docs/api/resources/authn/#transaction-state) of the response depends on the user's status, group memberships, and assigned policies.

> **Note:** Custom sign-in works **only** with [Org MFA](/docs/guides/mfa/sms/set-up-org/). Therefore, before you exchange the session token for an access token, make sure the application has disabled [App-Level MFA](https://help.okta.com/en/prod/Content/Topics/Security/MFA_App_Level.htm). 

<StackSelector snippet="handle-responses" />

<NextSectionLink>Next steps</NextSectionLink>
