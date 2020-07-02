### Prepare a SAML integration

In a SAML integration, Okta is the Identity Provider (IdP), and your application is the Service Provider (SP). If you need more background on the protocol or for SAML best practices for your application, review our [SAML concept](/docs/concepts/saml/) documentation.

Before you create a new SAML integration in Okta:

1. Determine the default Assertion Consumer Service (ACS) URL for your integration. This is often referred to as the SP sign-in URL. This is the endpoint on your application where the SAML responses are posted.
1. Find your Audience URI. This is sometimes referred to as the SP Entity ID or the Entity ID of your application.
1. (Optional). Set up a Default Relay State page, where users land after they successfully sign in to the SP using SAML. This must be a valid URL.
1. Gather any required SAML attributes. You can choose to share Okta user profile field values as SAML attributes with your application.

**Note:** SAML integrations must use SHA256 encryption for security. If you are using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/overview/).
