You need to remix your own version of the Okta sample Glitch project and confirm that it is live.

1. Go to the [Okta Registration Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-registrationhook-oie).
1. Click **Remix your own**.
1. Click **Share**.
1. In the **Live site** field, click the copy icon. This is your external service URL. Make a note of it as you need it later.
1. Click **Logs**. If you see a "Your app is listening on port {XXXX}" message, the app is live and ready to receive Okta requests.

In the following code, the external service responds to Okta indicating whether to accept the end user's self-registration. The response returns a `commands` object in the body of the HTTPS response. This object contains specific syntax that indicates whether the user is allowed or denied to self-register or to update their profile with Okta.