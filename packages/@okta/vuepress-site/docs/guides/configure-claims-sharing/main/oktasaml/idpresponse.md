> **Note:** The `OktaAuth` JSON payload is redacted and the response is truncated for brevity.

```JSON
.....
<saml2:AuthnStatement AuthnInstant="2024-08-21T21:22:21.250Z" SessionIndex="id29513242525044581346797160">
    <saml2:AuthnContext>
        <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:X509</saml2:AuthnContextClassRef>
        <saml2:AuthnContextDecl>
            <AuthenticationContextDeclaration xmlns="urn:okta:saml:2.0:OktaAuth">
                <Extension>
                    <OktaAuth xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">
                        ...JSON payload...
                    </OktaAuth>
                </Extension>
            </AuthenticationContextDeclaration>
        </saml2:AuthnContextDecl>
    </saml2:AuthnContext>
</saml2:AuthnStatement>
.....
```
