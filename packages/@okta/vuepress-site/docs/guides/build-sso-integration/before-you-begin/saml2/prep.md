### Prepare a SAML integration

In a SAML integration, Okta is the SAML Identity Provider (IdP), and your application is the SAML Service Provider (SP).

Before you create a new SAML integration in Okta:

1. If you need more background on the protocol or for SAML best practices for your application, review our [SAML concept](/docs/concepts/saml/) documentation.
1. Determine the default Assertion Consumer Service (ACS) URL for your app integration. This is often referred to as the SP login URL. This is the endpoint on the SP where the SAML responses are posted.
1. Find your Audience URI, this is sometimes referred to as the SP Entity ID or the Entity ID of your application.
1. Optionally, find the Default RelayState page where users will land after they successfully sign in to the SP using SAML. This must be a valid URL.
1. Gather any required SAML attributes. You can choose to share Okta user profile field values as SAML attributes with your app.

After you have this data, you can use the Okta Admin Console and the Application Integration Wizard to create your SAML integration inside the Okta org associated with your developer account.

If you get stuck or have questions at any point during the app creation process, review our [SAML FAQs](/docs/concepts/saml/faqs/), send an email to <developers@okta.com>, or post your questions on the [Okta developer forum](https://devforum.okta.com/search?q=saml) or on [Stack Overflow](https://stackoverflow.com/search?q=saml+okta).
