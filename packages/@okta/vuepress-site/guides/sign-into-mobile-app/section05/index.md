---
title: Open the Sign-In Page
---
# Open the Sign-In Page

To sign in users, open a web view and display the hosted sign-in page.

<StackSelector snippet="signin"/>

Okta returns an access token, which you can use to make authorized calls to your API. An ID token is also returned, which contains information about the user who just logged in. Okta sends these tokens back to your app using the callback scheme you defined earlier, for example, `com.oktaorg.name:/callback`.
