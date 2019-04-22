---
title: Okta API Products Change Log
---

## 2019.03.0

> NOTE: Okta has changed our release model and version numbering. For more information, see: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                      | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Password Import Supports SHA-1 and MD5](#password-import-supports-sha-1-and-md5)                       | March 6, 2019  |
| [Enable Role Assignment to Every Member of a Group](#enable-role-assignment-to-every-member-of-a-group) | March 6, 2019  |
| [New Rate Limits for /users/me](#new-rate-limits-for-usersme)                                         | March 6, 2019  |
| [Generic OIDC IdP is now GA in Preview](#generic-oidc-idp-is-now-ga-in-preview)                         | March 6, 2019  |
| [User Search is now GA in Production](#user-search-is-now-ga-in-production)                             | March 6, 2019  |
| [The Import Inline Hook is in EA](#the-import-inline-hook-is-in-ea)                                     | March 6, 2019  |
| [Previously Released Early Access Features 2019.03.0 Update](#previously-released-early-access-features-2019-03-0-update) | Available Now   |

### Password Import Supports SHA-1 and MD5

The Create/Update User API now supports importing users with SHA-1 and MD5 credentials. For more information, see our [Users page](/docs/api/resources/users/#hashed-password-object). <!--OKTA-204369 and OKTA-201688-->

### Enable Role Assignment to Every Member of a Group

Super and Org Admins can now assign and unassign roles to every user in a group using the APIs. For more information, see our [Roles page](/docs/api/resources/roles/#assign-role-to-group). <!--OKTA-207759 and OKTA-207768-->

### New Rate Limits for /users/me

The rate limits for the `/users/me` endpoint have been updated. For more information, see our [Rate Limits page](/docs/api/getting_started/rate-limits#org-wide-rate-limits-legacy-orgs). <!--OKTA-205776-->

### Generic OIDC IdP is now GA in Preview

Generic OpenID Connect allows users to sign in to an Okta org using their credentials from their existing account at an OIDC Identity Provider. A generic OIDC IdP can be a third-party IdP that supports OIDC, such as Salesforce or Yahoo or your own custom IdP. You can also configure federation between Okta orgs using OIDC as a replacement for SAML. For more information, see [Generic OpenID Connect Identity Providers](/authentication-guide/generic-oidc/). <!--OKTA-202447-->

### User Search is now GA in Production

Extended search capabilities for the `/users` endpoint is now Generally Available. For more information, see our [Users page](/docs/api/resources/users/#list-users-with-search). <!--OKTA-210189-->

### The Import Inline Hook is in EA

The [Import Inline Hook](/use_cases/inline_hooks/import_hook/import_hook) enables you to add custom logic to the process of importing new users into Okta from an app. <!--OKTA-211788-->

### Previously Released Early Access Features 2019.03.0 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
