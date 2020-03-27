---
title: Implement an HTTPS Server
---

To listen for the requests from Okta, you need to implement an HTTPS server provisioned with a certificate from a trusted Certificate Authority. Because network and server setups differ, this guide does not cover the specifics of that. In the following example code, we just listen for HTTP requests and assume that our code is running behind an HTTPS proxy. 

<StackSelector snippet="web-server"/>

<NextSectionLink/>

