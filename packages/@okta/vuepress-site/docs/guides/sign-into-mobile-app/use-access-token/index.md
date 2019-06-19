---
title: Use the access token
---
Mobile apps need to send requests to one or more APIs to perform actions and retrieve information. The token issued by Okta helps you call your API securely. By attaching this token to outgoing requests, your API can authenticate them (ensure that the user is signed in to perform an action) and authorize them (ensure that the user is allowed to do an action).

In your mobile app, make sure that you place the access token in the HTTP `Authorization` header of outgoing requests using this format:

```
Authorization: Bearer {token}
```

Your API must check for valid tokens in incoming requests. To learn how to protect your API endpoints and require token authentication, see [Protect your API endpoints](/docs/guides/protect-your-api/).

<StackSelector snippet="usetoken"/>

<NextSectionLink>Next steps</NextSectionLink>
