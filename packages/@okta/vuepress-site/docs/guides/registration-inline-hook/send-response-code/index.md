---
title: Send response
---

The external service responds to Okta indicating whether to accept the user self-registration, or not, by returning a `commands` object in the body of the HTTPS response, using a specified syntax within the object to indicate to Okta that the user should either be denied or allowed to self-register.

<StackSelector snippet="send-response"/>

<NextSectionLink/>