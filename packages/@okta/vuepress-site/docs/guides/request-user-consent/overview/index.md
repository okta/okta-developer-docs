---
title: Request user consent during authentication
---

<ApiLifecycle access="ea" />

If you want users to acknowledge and accept that they are giving an app access to their data, you can configure an Okta-hosted user consent dialog box for OAuth 2.0 or OpenID Connect authentication flows. With the correct configuration, Okta displays a consent dialog box that shows which app is asking for access. The dialog box displays the app logo that you specify and also provides details about what data is shared if the user consents.

This guide assumes that you:

* Have an Okta Developer Edition org. [Create an org for free](https://developer.okta.com/signup).
* Have an [OpenID Connect client application](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-assign-apps).

## User consent and tokens

User consent represents a user's explicit permission to allow an application to access resources protected by scopes. Consent grants are different from tokens because a consent can outlast a token, and there can be multiple tokens with varying sets of scopes derived from a single consent.

When an application needs to get a new access token from an authorization server, the user isn't prompted for consent if they have already consented to the specified scopes. Consent grants remain valid until the user or admin manually revokes them, or until the user, application, authorization server, or scope is deactivated or deleted.

> **Note:** The user only has to grant consent once for an attribute per authorization server.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
