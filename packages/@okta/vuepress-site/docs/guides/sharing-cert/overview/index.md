---
title: Overview
---

[Application Key Credential objects](/docs/reference/api/apps/#application-key-credential-model)
contain an opaque key ID (`kid`) and corresponding certificate. To use the [API](/docs/reference/api/apps/#clone-application-key-credential) to share application key credentials between apps, you need to create and use a new credential in one app, and then share and update the credential in another app.

### Why should I do this?

When configuring multiple apps, you might need them to accept the same identity provider (IdP). In that case, the assertions from the two apps must be signed by the same key. Sharing certificates is useful for Okta orgs that have apps with [sign-on modes](/docs/reference/api/apps/#sign-on-modes) such as `SAML_2_0`, SAML 1.1, or `WS_FEDERATION`.

### How to share the certificate

For this example, we assume that you want to share a certificate between two instances of an app:

* `app1` is the source app, the app from which you want to share a certificate.
* `app2` is the target app, the app that receives the source app's certificate.

This example also works if the apps are two instances of the same app or two different apps.

<NextSectionLink/>
