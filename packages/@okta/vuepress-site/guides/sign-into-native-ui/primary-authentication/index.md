---
title: Build the primary authentication form
---
Okta's Authentication SDK is built around a [state machine](https://developer.okta.com/docs/api/resources/authn#transaction-state). In order to use this library you will need to be familiar with the available states.

You can implement authentication flow in one screen or use multiple screens.
With multiple screen approach you can spilt responsibilties accross screens and inject related data as a dependency. Screens could be the following:
- Screen that handles login/password input
- Screen that handles multiple factors enrollment
- Screen that handles factor selection
- Screen that handles multiple factors verification
- and etc.

<NextSectionLink/>
