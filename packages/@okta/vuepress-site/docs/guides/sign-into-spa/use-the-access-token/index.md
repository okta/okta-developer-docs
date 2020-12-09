---
title: Use the access token
---

SPAs need to send requests to one or more APIs to perform actions and retrieve information.

After a user signs in, your application stores an access token issued by Okta. By attaching this token to outgoing requests, your APIs can authenticate them (ensure that the user is signed in to perform an action) and authorize them (ensure that the user is allowed to do an action).

On your front-end (this SPA), make sure that you place the access token in the HTTP `Authorization` header of outgoing requests using this format:

```
Authorization: Bearer {token}
```

On your back-end (the API), make sure that you check for valid tokens in incoming requests. See [Protect your API endpoints](/docs/guides/protect-your-api/).

<StackSelector snippet="getaccesstoken"/>

<NextSectionLink>Next steps</NextSectionLink>
