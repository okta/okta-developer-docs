Pass the `acr_value` in the `AuthnRequest` of the SAML request as an `AuthnContextClassRef` through the `/app/{app}/{key}/sso/saml` or `/app/{app}/saml` and `/app/{app}/sso/saml` endpoints.

**Request**

```xml
<saml2p:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
 xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
 ID="TheID"
 IssueInstant="2023-03-230T16:18:35Z"
 Version="2.0"
 AssertionConsumerServiceIndex="0"
 ForceAuthn="true"/>

  <saml2:Issuer>TheIssuer</saml2:Issuer>
  <saml2p:NameIDPolicyFormat="urn:oasis:names:tc:SAML:2.0:nameid-format:?"/>
  <saml2p:RequestedAuthnContext>
      <saml2:AuthnContextClassRef>urn:okta:loa:2fa:any</saml2:AuthnContextClassRef>
  </saml2p:RequestedAuthnContext>
</saml2p:AuthnRequest>
```

The SAML assertion response contains the `AuthnContext` and includes the following:

* The `acr` value from the request passed as `AuthnContextClassRef`
* The factors (Authentication Method Reference (AMR) claims) used to authenticate the user passed as a list of `AuthnContextDecl`
