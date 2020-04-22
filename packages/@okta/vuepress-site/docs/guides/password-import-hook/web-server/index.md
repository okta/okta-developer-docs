---
title: Implement an HTTPS server
---

Inline Hook requests sent by Okta are HTTPS requests. To listen for them, your external service needs to implement an HTTPS server provisioned with a certificate from a trusted Certificate Authority.

This guide doesn't cover the specifics of this part of implementing an external service. In the following example code, we just listen for HTTP requests and assume that our code is running behind a reverse proxy configured for HTTPS.

>**Note:** Okta will not call a non-HTTPS external service endpoint. You must implement HTTPS in order to use Inline Hooks. 

<StackSelector snippet="web-server"/>

<NextSectionLink/>

