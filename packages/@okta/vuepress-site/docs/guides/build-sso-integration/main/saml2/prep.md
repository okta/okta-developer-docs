If you haven't built the SAML 2.0 service in your app yet, review the [SAML concept](/docs/concepts/saml/) first.

### Use SAML toolkits

The following open source and paid tool kits can help you implement SAML 2.0 for your existing app. These different language kits help you create the WebSSO Profile for Service Providers:

* .NET Framework 4.5 or later: [Sustainsys.Saml2](https://github.com/Sustainsys/Saml2) (formerly Kentor Authentication Services)
* .NET Framework 4.0 or earlier: [ComponentSpace SAML 2.0 for ASP.NET and ASP.NET Core](https://www.componentspace.com/) (paid software)
* Java: [OpenSAML](https://wiki.shibboleth.net/confluence/display/OS30/Home), which is part of the [Shibboleth Development Project](https://www.shibboleth.net/)
* Java: [Spring Security SAML](/code/java/spring_security_saml)
* Python: [PySAML2](/code/python/pysaml2)
* Ruby: [Ruby-SAML](https://github.com/onelogin/ruby-saml)

>**Note:** Okta doesn't own or maintain these toolkits, however, some documentation is provided to help you use them with Okta.

### Gather SAML attributes

You need to obtain SAML integration fields before you create an app integration instance in Okta.

In a SAML integration, Okta is the Identity Provider (IdP), and your app is the Service Provider (SP).

1. Determine the default Assertion Consumer Service (ACS) URL for your integration. This is often referred to as the SP sign-in URL. This is the endpoint on your application where the SAML responses are posted.
1. Find your Audience URI. This is sometimes referred to as the SP entity ID or the entity ID of your app.
1. (Optional) Set up a Default Relay State page, where users land after they successfully sign in to the SP using SAML. This must be a valid URL.
1. Gather any required SAML attributes. You can choose to share Okta user profile values as SAML attributes with your app.

**Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).
