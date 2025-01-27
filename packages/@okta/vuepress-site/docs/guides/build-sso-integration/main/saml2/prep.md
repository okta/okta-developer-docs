If you're unfamiliar with [SAML 2.0](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html), review the following Okta topics first:

* [SAML concept](/docs/concepts/saml/)
* [Okta SAML FAQs](/docs/concepts/saml/faqs/)

### Use SAML toolkits

To quickly build your SSO integration, use an open source or paid tool kit to implement SAML 2.0. Use these different language kits to create the Service Provider WebSSO profile:

* .NET framework 4.5 or later: [Sustainsys.Saml2](https://github.com/Sustainsys/Saml2) (Kentor authentication services)
* .NET framework 4.0 or earlier: [ComponentSpace SAML 2.0 for ASP.NET and ASP.NET Core](https://www.componentspace.com/) (paid software)
* Java: [OpenSAML](https://wiki.shibboleth.net/confluence/display/OS30/Home) (part of the [Shibboleth Development Project](https://www.shibboleth.net/))
* Java: [Spring Security SAML](/code/java/spring_security_saml)
* Python: [PySAML2](/code/python/pysaml2)
* Ruby: [Ruby-SAML](https://github.com/onelogin/ruby-saml)

>**Note:** Okta doesn't own or maintain these toolkits.

### Gather SAML attributes

Obtain SAML integration attributes before you create an app integration instance in Okta.

In a SAML integration, Okta is the Identity Provider (IdP), and your app is the Service Provider (SP).

1. Determine the default assertion consumer service (ACS) URL for your integration. This is often referred to as the SP sign-in URL. This is the endpoint on your app where the SAML responses are posted.
1. Find your audience URI. This is sometimes referred to as the SP entity ID or the entity ID of your app.
1. Set up a default relay state page, where users land after they successfully sign in to the SP using SAML. This must be a valid URL. (Optional)
1. Gather any required SAML attributes that are relevant to the target app. You can share Okta user profile values or group memberships as SAML attributes with your app.

>**Notes:** Okta doesn't impose a limit on the number of attributes that you can include in a SAML assertion. However, the target app or browser may have issues or even reject large SAML payloads. Okta recommends that you keep the number of attributes to a minimum and include only those necessary for the app.
>
>SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).
