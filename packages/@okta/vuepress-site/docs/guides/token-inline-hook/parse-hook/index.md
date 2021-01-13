---
title: Parse the Token Inline Hook request
---

The external service in this scenario requires code to handle the Token Inline Hook request from the Okta org. Use the Glitch example to either build or copy the code (re-mix on Glitch) that parses the Token Inline Hook call.

> **Note**: Make sure to have the required default code and packages in your project. See [Overview and Considerations](/docs/guides/overview-and-considerations).

From the Token Inline Hook request, the code retrieves the value of the user name from the `data.identity` object.

<StackSelector snippet="request"/>

<NextSectionLink/>