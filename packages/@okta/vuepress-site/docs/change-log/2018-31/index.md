---
title: Okta API Products Change Log
---

## 2018.31

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.31](#bugs-fixed-in-201831)                                                                       | August 1, 2018           | August 6, 2018                               |
| [Previously Released Early Access Features 2018.31 Update](#previously-released-early-access-features-201831-update) | Available now            | Available now                                |


### Bugs Fixed in 2018.31

* Fixed an issue in the OpenID Connect [logout endpoint](/docs/api/resources/oidc#logout) where performing logout with an expired session resulted in an error instead of following the `post_logout_redirect_uri`. (OKTA-180521)

* Removed System Logs entries for [granting refresh tokens](https://developer.okta.com/authentication-guide/tokens/refreshing-tokens#how-to-use-a-refresh-token) in token requests with the `refresh_token` grant type (since this grant type simply returns the original refresh token). This fix applies to both [custom Authorization Servers](https://developer.okta.com/docs/api/resources/oidc#composing-your-base-url) and the Okta Org Authorization Server. (OKTA-178335)

* Fixed issues with the [User-Consent Grant Management API](/docs/api/resources/users#user-consent-grant-operations): added missing value to `issuer`, removed `issuerId`, removed HAL links for issuer and revoke, and added hints for self GET and DELETE.  (OKTA-175296)

* Fixed a bug where SAML apps [created using the API](/docs/api/resources/apps#add-custom-saml-application) could not enable `honorForceAuthn`. (OKTA-166146)

* Fixed an issue where `login_hint` was ignored when using OAuth consent with a custom Authorization Server. (OKTA-164836)


### Previously Released Early Access Features 2018.31 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
