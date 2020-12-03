---
title: Parse the Token Inline Hook request
---

The external service (implemented in this example by Glitch.com) to handle the Token Inline Hook request now requires code to parse the Okta request. (Or a review of the code if using the re-mixed sample application).

> **Note**: Make sure to have the required default code and packages in your project. See [Overview and Considerations](/docs/guides/overview-and-considerations).

From the Token Inline Hook request, the code retrieves the value of the user name from `data.identity`.

<StackSelector snippet="request"/>

<NextSectionLink/>