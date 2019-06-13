---
title: Overview
---

[Application key credential objects](/docs/reference/api/apps/#application-key-credential-model)
contain an opaque key ID (`kid`) and corresponding certificate.
To use the [API](/docs/reference/api/apps/#clone-application-key-credential)
to share application key credentials between apps, you need to create and use a new credential in one app,
then share and update the credential in another app.

Sharing certificates is useful for Okta orgs that have apps with [sign-on modes](/docs/reference/api/apps/#signon-modes) `SAML_2_0`, SAML 1.1, or `WS_FEDERATION`.

### Why Should I Do This?

When configuring multiple apps, you might need them to accept the same identity provider (IdP).
In that case, the assertions from the two apps must be signed by the same key.

### How to Share the Certificate

For this example, assume that you want to share a certificate between two instances of an app: `app1` is the source app, the app from
which you wish to share a certificate, and `app2` is the target app, the app that receives the source app's certificate.

This example also works if the apps are two instances of the same app, or two different apps.


<NextSectionLink/>
