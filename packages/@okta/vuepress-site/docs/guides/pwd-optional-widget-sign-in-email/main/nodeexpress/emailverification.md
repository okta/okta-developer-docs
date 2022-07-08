Okta's backend system sends a verification email to the user's primary email. When the user opens the email they can verify their identity with a One-Time Password (OTP) or a magic link. For more information on magic links and OTP including their supported user journeys, see the [Email Magic Links Overview](docs/guides/email-magic-links-overview/main/) guide.

For the magic link flow, you need to add support in your application for

* a browser check to ensure that the user uses the same browser to initiate the signin and click on the magic link
* a routing method to handle the callback request originating from the magic link.  Your app  The incoming request contains the `otp` and `state` query parameters that your app passes to the Sign-In Widget.
