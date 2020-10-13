---
title: Prepare your External Service
---
The external service is customer-provided software that Okta calls when the Registration Inline Hook fires. In this example, the external service is hosted on a browser-based web application service called [Glitch.me](https://glitch.me), which can be configured quickly to host the code that interacts with the Okta API calls.  //BD - Maybe include a link to the code for user to remix, i.e., copy to their account for testing.

You can remix or copy the code at the following Glitch.me project: tbd

The following Node.js content is required:

- Node.js dependencies. For further information, see [Dependencies](/docs/guide/password-import-hook/nodejs/dependencies)
- An HTTPS server. For further information, see [Implement an HTTPS server](/docs/guide/password-import-hook/nodejs/web-server)
- Authorization. For further information, see [Check Authorization header](/docs/guide/password-import-hook/nodejs/check-authorization-header)

<StackSelector snippet="prepare"/>

<NextSectionLink/>
