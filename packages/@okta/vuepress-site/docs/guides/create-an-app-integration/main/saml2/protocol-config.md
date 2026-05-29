In a SAML integration, Okta is the Identity Provider (IdP), and your app is the Service Provider (SP). Gather the following SAML integration attributes before you create the app integration in Okta:

* App name
* SSO URL or ACS URL: the default assertion consumer service URL, sometimes referred to as the SP sign-in URL. This is the endpoint on your app where the SAML responses are posted.
* Audience URI (SP Entity ID): sometimes referred to as the entity ID of your app.
* Default relay state page (optional): where users land after they successfully sign in to the SP using SAML. This must be a valid URL.
* Name ID format and attribute statement
* Signed SAML assertions
* Any required SAML attributes that are relevant to the target app. You can share Okta user profile values or group memberships as SAML attributes with your app.

To quickly build your SSO integration, use an open source or paid toolkit to implement SAML 2.0. Use these different language kits to create the Service Provider WebSSO profile:

* .NET framework 4.5 or later: [Sustainsys.Saml2](https://github.com/Sustainsys/Saml2) (Kentor authentication services)
* .NET framework 4.0 or earlier: [ComponentSpace SAML 2.0 for ASP.NET and ASP.NET Core](https://www.componentspace.com/) (paid software)
* Java: [OpenSAML](https://wiki.shibboleth.net/confluence/display/OS30/Home) (part of the [Shibboleth Development Project](https://www.shibboleth.net/))
* Java: [Spring Security SAML](/code/java/spring_security_saml)
* Python: [PySAML2](/code/python/pysaml2)
* Ruby: [Ruby-SAML](https://github.com/onelogin/ruby-saml)

>**Notes:**
>* Okta doesn't own or maintain these toolkits.
>* Okta doesn't impose a limit on the number of attributes that you can include in a SAML assertion. However, the target app or browser may have issues or even reject large SAML payloads. Okta recommends that you keep the number of attributes to a minimum and include only those necessary for the app.
>* SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

See [Application Integration Wizard SAML field reference](https://help.okta.com/okta_help.htm?type=oie&id=csh-attribute-statements-saml) for details.

