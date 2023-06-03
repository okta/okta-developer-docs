### Prepare a SAML integration

In a SAML integration, Okta is the Identity Provider (IdP), and your application is the Service Provider (SP). Review the [SAML concept](/docs/concepts/saml/) for an overview, flow details, and best practices of the protocol.

Before you create a SAML integration in Okta:

1. Determine the default Assertion Consumer Service (ACS) URL for your integration. This is often referred to as the SP sign-in URL. This is the endpoint on your application where the SAML responses are posted.
1. Find your Audience URI. This is sometimes referred to as the SP entity ID or the entity ID of your application.
1. (Optional). Set up a Default Relay State page, where users land after they successfully sign in to the SP using SAML. This must be a valid URL.
1. Gather any required SAML attributes. You can choose to share Okta user profile field values as SAML attributes with your application.

**Note:** SAML integrations must use SHA256 encryption for security. If you are using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

### Use SAML toolkits

If you have an existing application where you want to add SAML SSO, the following open source and paid tool kits are another way to help you implement the SAML 2.0 specification for the WebSSO Profile for Service Providers using different programming languages:

* .NET Framework 4.5 or later: [Sustainsys.Saml2](https://github.com/Sustainsys/Saml2) (formerly Kentor Authentication Services)
* .NET Framework 4.0 or earlier: [ComponentSpace SAML 2.0 for ASP.NET and ASP.NET Core](https://www.componentspace.com/) - Paid software, single developer licenses start at $99
* Java: [OpenSAML](https://wiki.shibboleth.net/confluence/display/OS30/Home), which is part of the [Shibboleth Development Project](https://www.shibboleth.net/)
* Java: [Spring Security SAML](/code/java/spring_security_saml)
* PHP: [SimpleSAMLphp](/code/php/simplesamlphp)
* Python: [PySAML2](/code/python/pysaml2)
* Ruby: [Ruby-SAML](https://github.com/onelogin/ruby-saml)

>**Note:** Okta doesn't own or maintain these toolkits, though we do provide documentation to help you use them with Okta.