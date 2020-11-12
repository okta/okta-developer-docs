---
title: Check Authorization header
---


The requests that Okta sends to your external service include an Authorization header containing a secret string.

At the time you register your external service with Okta, you specify the value of the secret string that should be sent. This provides a mechanism to secure access to your endpoint.

An important piece, therefore, to include in any external service implementation, is a check for the presence of an Authorization header that contains the correct value in all incoming requests. If the Authorization header in an incoming request can't be verified, the request needs to be denied.

<StackSelector snippet="check-authorization-header"/>

<NextSectionLink/>

