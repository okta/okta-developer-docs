---
title: Send response
---

The way to specify to Okta whether to accept the credentials as valid or not is by returning a `commands` object in the body of your HTTPS response. Within the object, you use a specified syntax to tell Okta that the credentials should either be denied or accepted.

If you return an empty HTTPS response with an HTTP 204 "No content success" status code,  Okta takes the default action, which is to reject the credentials.

Here, based on the results of the credential check, we return either a command telling Okta to accept the credentials, or an empty response, which results in Okta rejecting the credentials.

<StackSelector snippet="send-response"/>

>**Note**: Using an empty response to reject the credentials is based on the assumption that that is the default action that Okta is set to take. In the request from Okta, the property `data.action.credential` specifies the default. It is currently always set to `UNVERFIED`, meaning that the default is to reject.



<NextSectionLink/>

