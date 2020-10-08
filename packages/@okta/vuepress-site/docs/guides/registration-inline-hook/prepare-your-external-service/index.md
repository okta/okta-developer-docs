---
title: Prepare your External Service
---
The external service is customer-provided software that Okta calls when the Registration Inline hook fires. The following code provides the basics required to handle the routine tasks of REST request processing needed for the example implementation of the registration inline hook. It includes:

- Node.js dependencies. For further information, see [Dependencies](/docs/guide/password-import-hook/nodejs/dependencies)
- An HTTPS server. For further information, see [Implement an HTTPS server](/docs/guide/password-import-hook/nodejs/web-server)
- Authorization. For further information, see [Check Authorization header](/docs/guide/password-import-hook/nodejs/check-authorization-header)

<StackSelector snippet="prepare"/>

<NextSectionLink/>
