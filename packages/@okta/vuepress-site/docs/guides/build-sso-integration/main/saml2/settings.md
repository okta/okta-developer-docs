### Specify SAML settings

* On the **General** tab, in the **Application** area, you can rename your integration and select visibility and launch options. You can also make any changes to the SAML settings if they changed from your original values.

* On the **Sign On** tab, you can download the Identity Provider metadata for your integration. This information is needed to configure the SAML connection settings inside your SAML SP application:
  1. In the **SIGN ON METHODS** section, locate the **Identity Provider metadata** link right above the **CREDENTIALS DETAILS** section.
  1. Right-click the **Identity Provider metadata** link and select **Copy Link Address**. The metadata contained at this link has the information required by your SAML SP application.

      We recommend copying the **Identity Provider metadata** link to dynamically configure the metadata. If your SP doesn't support dynamic configuration, you can click the **Identity Provider metadata** link instead, and a new browser tab launches with the information that you need:
       * Identity Provider Issuer
       * X.509 Certificate
       * Identity Provider Single Sign-On URL
  1. In your SAML SP application, you can paste the link or the metadata as required to configure the IdP metadata.

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
