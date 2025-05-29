Single Logout for Identity Providers (SLO for IdPs) allows sOkta to send sign-out requests to the IdP when a user signs out of your app.

> **Note**: You must have the [Single Logout feature](/docs/guides/single-logout/openidconnect/main/) enabled to then enable and use the Single Logout for IdPs feature.

The Single Logout feature allows a user to sign out of an SLO participating app on their device and end their Okta session. The user is then automatically signed out of all other SLO participating apps on other devices.

### Single Logout for IdPs

There are also SLO use cases where Okta is the service provider for an external IdP. To terminate the session with the IdP, Okta must also send a logout request to the IdP.

The SLO for IdPs feature supports this single logout use case. Okta acts as an app for the IdP and sends the sign-out request to the external IdP to end the session. This applies only to the IdP where the user has previously established a session. Requests are communicated from Okta to the IdP using front-channel logout, which means that the browser does the communicating.

### Safety considerations

SLO for IdPs is especially useful in scenarios where users share computers or use public kiosks. A user may sign in to a computer portal, and then authenticate into multiple apps using an identity provider.

Ideally, when the user wants to sign out, they sign out of every app and the IdP session ends. This keeps the next user from accessing their information. But, most users don’t sign out of their apps, thus the IdP session is still active. SLO for IdPs signs the user out of all apps and ends the IdP session.
