The Single Logout (SLO) feature allows a user to sign out of an SLO participating app on their device and end their Okta session. The user is then automatically signed out of all other SLO participating apps.

Okta supports service provider initiated (SP-initiated) SLO for third-party SAML 2.0 and OpenID Connect (OIDC) apps. When an end user clicks sign out in your app, the app directs the browser to Okta while making an inbound sign-out request. This indicates to Okta that the user wants to sign out of the app. In response, Okta ends the user’s Okta session.

The multiple device SLO feature supports outbound sign out requests (IdP-initiated SLO) after the SP app makes the SP-initiated inbound sign-out request to Okta. Okta sends outbound sign-out requests to any other apps participating in SLO that didn't initiate the sign-out flow. This applies only to the downstream apps where the user has previously established a session. Requests are communicated from Okta to apps using front-channel logout, which means that the browser does the communicating.

SLO is especially useful in scenarios where users share computers or use public kiosks. A user may sign in to a computer portal, and then open multiple apps. The user sign-in process for each app happens behind the scenes.

Ideally, when the user wants to sign out, they should sign out of every app to keep the next user from accessing their information. But, most users don’t do that. SLO signs the user out of everything at once.
