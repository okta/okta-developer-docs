---
title: Overview
---

Once you have completed the SAML configuration, you can test your implementation using SAML tracer.
SAML tracer is an add-on in Firefox and very useful when troubleshooting SAML for service provider-initiated flows (SP-initiated)
or identity provider-initiated flows (IdP-initiated).
When you start an IdP-initiated flow or SP-initiated flow while SAML tracer is enabled, it captures the SAML request and response.

## Install SAML tracer or Similar Browser Tool

To install SAML tracer, visit [https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/) and follow the instructions.

Once you install SAML tracer, open it from the browser menu bar: **Tools** > **SAML tracer**.

>Similar tools exist for other browsers, such as [SAML DevTools](https://chrome.google.com/webstore/detail/saml-devtools-extension/jndllhgbinhiiddokbeoeepbppdnhhio)
and [SAML Chrome Panel](https://chrome.google.com/webstore/detail/saml-devtools-extension/jndllhgbinhiiddokbeoeepbppdnhhio) for Chrome.
We use SAML Tracer in the following examples.

## SP-Initiated Flow

To create a SAML request for an SP-initiated flow and inspect the request and response in SAML tracer:

1. Open SAML tracer and then access your application, which takes you to the Okta login page if you aren't already logged in.
2. Look at the SAML tracer window and see the SAML request sent from your application to Okta.
3. Okta returns a SAML Response.

![SAML Request SP Flow](/img/saml-request-sp-flow.png "SAML Request SP Flow")
Figure 1: SP-Initiated Request in SAML tracer

![SAML Response SP Flow](/img/saml-response-sp-flow.png "SAML Response SP Flow")
Figure 2: SP-Initiated Response in SAML tracer

## IDP Initiated Flow

To create a SAML request for an IdP-initiated flow and inspect it in SAML tracer:

1. Assign the SAML app to a user.
2. Navigate to dashboard of that user and click on the app icon.
3. The application opens in new browser and if successful, sends a SAML response.

You can also start an IdP flow by selecting the App Embed link in a browser (**SAML App** > **General** > **App Embed Link**).

![SAML Response IdP](/img/idp-flow-saml-trace.png "SAML Response IdP")
Figure 3: IdP-Initiated Response in SAML tracer

When you receive a SAML request and response successfully from Okta, it indicates that your configuration is successfully working with Okta.

As you can see from the SimpleSAMLPhp, Spring Security SAML and PySAML examples,
the application can read attributes passed from Okta after a user logs in.

## Example SAML Request

```xml
<samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
                    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
                    ID="_2b16caecb21804d0271c7b45734978a31b122c0b9a"
                    Version="2.0"
                    IssueInstant="2017-02-02T03:12:56Z"
                    Destination="https://orgname.okta.com/app/app_name/exk4x6wko7PcvdVq80x6/sso/saml"
                    AssertionConsumerServiceURL="http://localhost:8888/simplesamlphp/www/module.php/saml/sp/saml2-acs.php/example-okta-com"
                    ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
                    >
    <saml:Issuer>http://localhost:8888/simplesamlphp/www/module.php/saml/sp/metadata.php/example-okta-com</saml:Issuer>
    <samlp:NameIDPolicy Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient"
                        AllowCreate="true"
                        />
</samlp:AuthnRequest>
```

## Example SAML Response

SAML responses are signed. This example contains profile attributes of the person who requested access to the app, as set in the General tab of the administrator UI.

```xml
<saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol"
                 Destination="http://localhost:8888/simplesamlphp/www/module.php/saml/sp/saml2-acs.php/example-okta-com"
                 ID="id304067580046365441472203853"
                 InResponseTo="_2b16caecb21804d0271c7b45734978a31b122c0b9a"
                 IssueInstant="2017-02-02T03:13:05.114Z"
                 Version="2.0"
                 xmlns:xs="http://www.w3.org/2001/XMLSchema"
                 >
    <saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"
                  Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity"
                  >http://www.orgname.okta.com</saml2:Issuer>
    <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
        <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
            <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" />
            <ds:Reference URI="#id304067580045365441472303853">
                <ds:Transforms>
                    <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                    <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                        <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#"
                                                PrefixList="xs"
                                                />
                    </ds:Transform>
                </ds:Transforms>
                <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
                <ds:DigestValue>hF6r9lkeTRvgbJA/0bc8ykvCqES8rUzuW9YYShmlQvo=</ds:DigestValue>
            </ds:Reference>
        </ds:SignedInfo>
        <ds:SignatureValue>I82goYxTr5q2D+eWvj6O+DnqOG/xtAStirrgTY1dpBQ2plrI6e4t1g6stXZ47+y3qX81xSPv2pcVXp6NlhxU2twBK+1xL2tduymVrwWWI4VATdx5SjmcYaH5FKaDn1ee6Vs7YtYDZJzJDqGe/+5SaemnstrVmXbjmKwDinO5ttvNsW8R1LBF+Zxr8ti+2Jkggn9PRoYp+J/MZ5+sMZgky2HB70u0vrwiL+4ELD/avj8FeeHBMJwqllWQ1qCZ5ELtRLXANCNge3Ur392HkGy4HB2t1EVcMAO8wZpAzHMnp6IozQM8+/2aPdDTapnv4kOj8scxsoZlbMHAZCgfl3lj7w==</ds:SignatureValue>
        <ds:KeyInfo>
            <ds:X509Data>
                <ds:X509Certificate>MIIDpDCCAoygAwIBAgIGAVVfq86GMA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG
A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
MBIGA1UECwwLU1NPUHJvdmlkZXIxEzARBgNVBAMMCmRldnN1cHBvcnQxHDAaBgkqhkiG9w0BCQEW
DWluZm9Ab2t0YS5jb20wHhcNMTYwNjE3MTg0MTIyWhcNMjYwNjE3MTg0MjIyWjCBkjELMAkGA1UE
BhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNV
BAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRMwEQYDVQQDDApkZXZzdXBwb3J0MRwwGgYJ
KoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
qp10VJvKjqIEk30bv0WPw6XhZtTm19XfLrwyHRG1aYQshkcIolS9Vvp5SdL6dDEctdf5dznrQTlr
8Q+LUIC6JGnVzA/qgC1UpsXYdfaod0c35GM8HDsHni0MNUnHt/2MqDW6PkYoIdjniDp21wOCiORE
FGuC1kUQQJY2yQ8bQJVEKCEyIUPGXLMcQlbB0vAkbGeqz4HCZBX/n7wr/50MMQz8YOLSkx/0Ojls
sGEA6KAbdFutrvSUKIUeZc4XFfySm9KJ1Vi83PpacOfWuKyktjPR0mC6wK87PuN32boa4nQ2+BMf
v/qgx4e5RDnTYk2+iPcwN6nKxJfS66kKhpfMdwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQA8R607
iL9Sx9QKo31zG2xG24drYxaWta6G5XKcROkFk2ZVfRAhS9rx1WFXuCV5e/ys0z7jILWKisTkjegY
uubqy6awBbjDRxnUct0OdZU4siHWYjvL+SYOT2Pk8IwlD4HGNsee6WmURvfpL2Yib9Xc85qVp1W9
t7GU2GZVnOyU7a/JfAgDw79z5dH1BQsCW+nvgeO5VgFXVOSf7dBOB2PlwG5DlH5MgNa67eH3Wr9B
RKvwyyTfqfq9pgSmB9xNVJIeVZbbZGTlNGqJti24E0AiIPggtxg5NJ+HHnEQ5RxdSsR4fbMz9i0K
/bXt6hPgGu7xYRSv1RfvKcR1NjYk3nnD</ds:X509Certificate>
            </ds:X509Data>
        </ds:KeyInfo>
    </ds:Signature>
    <saml2p:Status xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol">
        <saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" />
    </saml2p:Status>
    <saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"
                     ID="id304067580046759701759203951"
                     IssueInstant="2017-02-02T03:13:05.114Z"
                     Version="2.0"
                     xmlns:xs="http://www.w3.org/2001/XMLSchema"
                     >
        <saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity"
                      xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"
                      >http://www.orgname.okta.com</saml2:Issuer>
        <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:SignedInfo>
                <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" />
                <ds:Reference URI="#id304067580046759701759203951">
                    <ds:Transforms>
                        <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                        <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                            <ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#"
                                                    PrefixList="xs"
                                                    />
                        </ds:Transform>
                    </ds:Transforms>
                    <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
                    <ds:DigestValue>S8mNiYKRl/EwtRMUnwqL8oLfaBNHpgf1Kl1fVmHboX4=</ds:DigestValue>
                </ds:Reference>
            </ds:SignedInfo>
            <ds:SignatureValue>ipdSi9HVuHisncXx5xOxTTdyV0i1yMRecpTWVq5HF8Tunc6GImyAd7c7bLGIxRVrqWaL49+eKzs/G906ekWd3/2O7MMXvXb3p9SnQF74mV90p+l+Pb3CnuPuithbF2dBgzUe+AadZs8ZrgfTnC+s7zx/ZKsjfK4JbUNC7zajXl0+PcoJUic3NVe5Gkda/+caKAVkIc7JvT6pkp3gEQhMowfb5YtsgO41HNYu92RmJCikPEGawgsc4PKzvrMUSZZa52XYrTTRgpt6RvYA2PRBuocExRS3M1oLpEgKrmJ9oCzESaMHuqulQbY8lRfZnehjl+tzg92W8YNkrR4qPaLlYA==</ds:SignatureValue>
            <ds:KeyInfo>
                <ds:X509Data>
                    <ds:X509Certificate>MIIDpDCCAoygAwIBAgIGAVVfq86GMA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG
A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
MBIGA1UECwwLU1NPUHJvdmlkZXIxEzARBgNVBAMMCmRldnN1cHBvcnQxHDAaBgkqhkiG9w0BCQEW
DWluZm9Ab2t0YS5jb20wHhcNMTYwNjE3MTg0MTIyWhcNMjYwNjE3MTg0MjIyWjCBkjELMAkGA1UE
BhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNV
BAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRMwEQYDVQQDDApkZXZzdXBwb3J0MRwwGgYJ
KoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
qp10VJvKjqIEk30bv0WPw6XhZtTm19XfLrwyHRG1aYQshkcIolS9Vvp5SdL6dDEctdf5dznrQTlr
8Q+LUIC6JGnVzA/qgC1UpsXYdfaod0c35GM8HDsHni0MNUnHt/2MqDW6PkYoIdjniDp21wOCiORE
FGuC1kUQQJY2yQ8bQJVEKCEyIUPGXLMcQlbB0vAkbGeqz4HCZBX/n7wr/50MMQz8YOLSkx/0Ojls
sGEA6KAbdFutrvSUKIUeZc4XFfySm9KJ1Vi83PpacOfWuKyktjPR0mC6wK87PuN32boa4nQ2+BMf
v/qgx4e5RDnTYk2+iPcwN6nKxJfS66kKhpfMdwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQA8R607
iL9Sx9QKo31zG2xG24drYxaWta6G5XKcROkFk2ZVfRAhS9rx1WFXuCV5e/ys0z7jILWKisTkjegY
uubqy6awBbjDRxnUct0OdZU4siHWYjvL+SYOT2Pk8IwlD4HGNsee6WmURvfpL2Yib9Xc85qVp1W9
t7GU2GZVnOyU7a/JfAgDw79z5dH1BQsCW+nvgeO5VgFXVOSf7dBOB2PlwG5DlH5MgNa67eH3Wr9B
RKvwyyTfqfq9pgSmB9xNVJIeVZbbZGTlNGqJti24E0AiIPggtxg5NJ+HHnEQ5RxdSsR4fbMz9i0K
/bXt6hPgGu7xYRSv1RfvKcR1NjYk3nnD</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </ds:Signature>
        <saml2:Subject xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
            <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">userName</saml2:NameID>
            <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                <saml2:SubjectConfirmationData InResponseTo="_2b16caecb21804d0271c7b45734978a31b122c0b9a"
                                               NotOnOrAfter="2017-02-02T03:18:05.114Z"
                                               Recipient="http://localhost:8888/simplesamlphp/www/module.php/saml/sp/saml2-acs.php/example-okta-com"
                                               />
            </saml2:SubjectConfirmation>
        </saml2:Subject>
        <saml2:Conditions NotBefore="2017-02-02T03:08:05.114Z"
                          NotOnOrAfter="2017-02-02T03:18:05.114Z"
                          xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"
                          >
            <saml2:AudienceRestriction>
                <saml2:Audience>http://localhost:8888/simplesamlphp/www/module.php/saml/sp/metadata.php/example-okta-com</saml2:Audience>
            </saml2:AudienceRestriction>
        </saml2:Conditions>
        <saml2:AuthnStatement AuthnInstant="2017-02-02T03:13:05.114Z"
                              SessionIndex="_2b16caecb21804d0271c7b45734978a31b122c0b9a"
                              xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"
                              >
            <saml2:AuthnContext>
                <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml2:AuthnContextClassRef>
            </saml2:AuthnContext>
        </saml2:AuthnStatement>
        <saml2:AttributeStatement xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
            <saml2:Attribute Name="FirstName"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                             >
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xs:string"
                                      >FirstName</saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="LastName"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                             >
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xs:string"
                                      >LastName</saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="Email"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                             >
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xs:string"
                                      >firstname.lastname@example.com</saml2:AttributeValue>
            </saml2:Attribute>
        </saml2:AttributeStatement>
    </saml2:Assertion>
</saml2p:Response>
```

SAML responses are signed, and contain the profile attributes of the person who requested access to the app, as set in the General tab of the administrator UI.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).
