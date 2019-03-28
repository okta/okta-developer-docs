---
title: Use the Access Token
---
## Use the Access Token

After your user is authenticated, your application has an access token in local storage that was issued by your Okta authorization server. You can use this token to authenticate requests for resources on your server or API. As a hypothetical example, let's say that you have an API that provides messages for a user. You could create a `MessageList` component that gets the access token from local storage and uses it to make an authenticated request to your server.

Here is what the component could look like for this hypothetical example:

<StackSelector snippet="getaccesstoken"/>
