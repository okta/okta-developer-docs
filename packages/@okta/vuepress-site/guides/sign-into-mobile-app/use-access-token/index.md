---
title: Use the Access Token
---
## Use the Access Token

After your user is authenticated, your application has an access token that was issued by your Okta authorization server. When your app needs to make calls to your backend API, you can attach the access token to outgoing requests and use it to authenticate requests for resources on your server or API. As a hypothetical example, let's say that you have an API that gives us messages for our user.

<StackSelector snippet="usetoken"/>

<NextSectionLink/>
