---
title: Parse the Token Inline Hook request
---

The external service in this scenario requires code to handle the Token Inline Hook request from the Okta org. Use the Glitch example to either build or copy the code (re-mix on Glitch) that parses the Token Inline Hook call.

> **Note**: Make sure to have the required default code and packages in your project. See [Common Hook Set-up Steps](/docs/guides/common-hook-set-up-steps/nodejs/overview/).

From the Token Inline Hook request, the following code retrieves the value of the user name from the `data.identity` object.

<StackSelector snippet="request"/>

<NextSectionLink/>