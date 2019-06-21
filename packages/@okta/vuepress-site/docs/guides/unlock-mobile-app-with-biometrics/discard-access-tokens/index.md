---
title: Discard access tokens
---
By discarding the current access token, the mobile app is prevented from making any API requests. To get a new access token, the refresh token must be unlocked using a biometric factor. You can discard an access token after a period of time (as configured in your Okta settings). You can also revoke and discard access tokens when the app closes, if you want the user to be prompted for a biometric challenge every time that they re-open the app.

<StackSelector snippet="discardaccesstoken" />

<NextSectionLink/>
