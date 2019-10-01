---
title: Build the primary authentication form
---
Okta's Authentication SDK is built around a [state machine](/docs/reference/api/authn/#transaction-state). To use this library, you should be familiar with the available states.

You can implement an authentication flow using one screen or using multiple screens. When you use multiple screens, you can spilt responsibilties across screens and then inject related data as a dependency.

For example, multiple screens could handle:

* login/password input
* multi-factor enrollment
* factor selection
* multi-factor verification


<StackSelector snippet="primaryauth" />

<NextSectionLink/>
