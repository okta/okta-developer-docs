---
title: Check Authorization header
---


The requests that Okta sends to your external service include an Authorization header containing a secret string.

You choose the value of the string that should be sent when you register your external service with Okta. This provides a mechanism to secure access to your endpoint.

Your code should therefore always check for the presence of the Authorization header in any requests that come in, and confirm that its value is correct. Processing should not proceed if the authorization header cannot be verified.

<StackSelector snippet="check-authorization-header"/>

<NextSectionLink/>

