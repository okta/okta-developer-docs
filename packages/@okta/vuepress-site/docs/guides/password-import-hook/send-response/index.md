---
title: Send Response
---

The way to specify to Okta whether to accept the credentials as valid or not is to return a response to Okta, containing a `commands` object. An empty response results in Okta taking the default action, which is to reject the credentials. Here, based on the results of the credential check, we return either a command telling Okta to accept the credentials, or an empty response, which will result in Okta rejecting the credentials.

<StackSelector snippet="send-response"/>

<NextSectionLink/>

