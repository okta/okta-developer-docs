---
title: Request user consent during authentication
---

<ApiLifecycle access="ea" />

need overview
need this guide assumes that section

## User consent in Okta

If you want users to acknowledge and accept that they are giving an app access to their data, you can configure an Okta-hosted user consent dialog box for OAuth 2.0 or OpenID Connect authentication flows. With the correct configuration, Okta displays a consent dialog box showing which app is asking for access. The dialog box displays the app logo that you specify and also provides details about what data os shared if the user consents.

You can optionally configure the consent dialog to link to your terms of service or privacy policy documents.

## User consent and Tokens

User consent represents a user's explicit permission to allow an application to access resources protected by scopes. Consent grants are different from tokens because a consent can outlast a token, and there can be multiple tokens with varying sets of scopes derived from a single consent.

When an application needs to get a new access token from an authorization server, it may not need to prompt the user for consent if they have already consented to the specified scopes. Consent grants remain valid until the user or admin manually revokes them, or until the user, application, authorization server, or scope is deactivated or deleted.

<NextSectionLink/>
