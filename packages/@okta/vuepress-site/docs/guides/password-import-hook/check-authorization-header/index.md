---
title: Check Authorization Header
---


The requests that Okta sends to your external service includes an authorization header containing a secret string. You set the value of this string when you register your external service, so that it can serve as an API access key for the service. Your code should always check for the presence of the authorization header and confirm its value. Processing should not proceed if the authorization header cannot be verified.

<StackSelector snippet="check-"/>

<NextSectionLink/>

