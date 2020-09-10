---
title: Okta API Products Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2017.26
---

## 2017.27

### Advance Notice: Data Retention Changes

Okta is changing system log data retention windows. System log data is available from `/api/v1/events` or
Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data older than six months will be removed.
* For orgs created on or after July 17th, data older than three months will be removed.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on or after July 17, 2017, will retain log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

### Platform Enhancements

* [Additional Scopes Available for Social Authentication](#additional-scopes-available-for-social-authentication)

* [New Versions of Sign-In Widget and Auth SDK for JS](#new-versions-of-sign-in-widget-and-auth-sdk-for-js)

#### Additional Scopes Available for Social Authentication

When using a Social Identity Provider, you can request information in stages. The initial request to `/oauth2/v1/authorize` can ask for a minimal set of scopes, and you can add scopes to collect additional user data in a subsequent request to the Social Identity Provider. This reduces friction during sign-in when users don't yet trust your app. For more information, see the descriptions of `idp_scope` in the [OAuth 2.0 API](/docs/reference/api/oidc/#request-parameters-1 ) and [OpenID Connect API](/docs/reference/api/oidc/#request-parameters-3) parameter tables.<!-- (OKTA-117521) -->

#### New Versions of Sign-In Widget and Auth SDK for JS

Version 1.11 of the [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-1.11.0) and version 1.8 of the [Okta Auth SDK for JavaScript](https://github.com/okta/okta-auth-js) are available. Check out the new features and bug fixes!<!-- (OKTA-131642) -->

### Platform Bugs Fixed

* If any sign-in policy using MFA existed for an application, the Open ID Connect reauthentication flow redirected to multi-factor authentication (MFA) by default.  (OKTA-129094)
* Clients with `token_endpoint_auth_method` set to `client_secret_post` did not have a selected radio button on the Client Credentials UI (**Applications > _application name_ > General**).  (OKTA-130764)
* If you created a SAML 2.0 Identity Provider but omitted some fields, Okta reported an error.  (OKTA-131294)
* Okta Sign-In Widget failed to run when installed with `npm`.  (OKTA-131608)
* Updates to clients sometimes received an error response if they contained values for `client_id_issued_at` or `client_secret_expires_at`.  (OKTA-131647)
* API Access Management customers can no longer self-validate the Okta Access Token.  (OKTA-131885)
