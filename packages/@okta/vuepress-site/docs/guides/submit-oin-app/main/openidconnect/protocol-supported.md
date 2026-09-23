### Protocols supported

This guide covers submissions that use the following protocols and integrations:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

* [Security Assertion Markup Language (SAML) 2.0](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

* [System for Cross-domain Identity Management (SCIM) 2.0 Provisioning](https://scim.cloud)

* [SCIM 2.0 Entitlement Management](https://datatracker.ietf.org/doc/html/rfc7644#section-3.3)

* [Universal Logout](/docs/guides/oin-universal-logout-overview/)

* [Cross App Access (XAA)](/docs/guides/submit-oin-app/scrossapp/main/)

See [Choose your SSO protocol](/docs/concepts/sso-overview/#choose-your-sso-protocol) for help choosing the right protocol for your app integration.

> **Notes:**
    > * Universal Logout integrations are only supported for the SAML 2.0 and OIDC protocols. If you want to submit a Universal Logout integration with SCIM provisioning, you must also submit an SSO integration with either SAML 2.0 or OIDC.
    > * Entitlement Management is supported for integrations that manage entitlements through a SCIM server.
    > * Cross App Access (XAA) requires and works alongside SSO. If you have an existing SSO integration, you don't need to create a new submission. Go to **Applications and Resources** > **Your OIN Integrations**, then click **Add more integrations** on your existing app. In **SSO (Single Sign-On)**, select **SAML 2.0** or **OpenID Connect** as your protocol. Select **Cross App Access** from the **Add integration capabilities** section, and reuse your existing SSO instance for testing.
    > * SWA app integrations are no longer accepted for publication in the OIN catalog. However, the OIN team still maintains existing SWA apps.
    > * There are protocol-specific limitations on integrations in the OIN. See [OIN limitations](/docs/guides/submit-app-prereq/main/#oin-limitations).