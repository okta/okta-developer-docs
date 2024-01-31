The Sign-In Widget uses the [Interaction Code flow](/docs/concepts/interaction-code/) to interact with the Okta Identity Engine.

Ensure that the Interaction Code flow is enabled:

* [In your org](/docs/guides/implement-grant-type/interactioncode/main/#enable-interaction-code-grant-for-your-org)
* [In your authorization server](/docs/guides/oie-embedded-common-org-setup/java/main/#update-the-default-custom-authorization-server)
* [In your app integration](/docs/guides/oie-embedded-common-org-setup/java/main/#create-an-application)

To configure your app so it requires only a password, see [Set up your Okta org for a password factor-only use case](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

Ensure that the **Sign-In Redirect URI** that you set in your app integration and your app's config file are the same. If you're using the sample app, this should be `https://localhost:8080`. Where you see `${yourSignInRedirectUri}` in this guide, replace it with your sign-in redirect URI.
