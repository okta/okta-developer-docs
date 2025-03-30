When you use SAML 2.0 with claims sharing, the data that's shared between a third-party IdP and an Okta SP is included in the SAML response in a new reserved tag in the `Extension` section called `OktaAuth`. This content is communicated in JSON within the `Assertion` response and contains information about authentication performed at the third-party IdP. The entire assertion is securely encrypted with a published encryption key from the SP org.



Before you configure Okta to accept AMR claims, it's important to first configure the IdP to send the claims correctly. Every IdP is different. Okta expects the IdP to pass the AMR claims in a specific way, depending on the supported federation protocol.

At the third-party OpenID Connect IdP, verify that the client app used for authenticating and authorizing users sends an `amr` array with the AMR claims in the OpenID Connect ID token (`id_token`).