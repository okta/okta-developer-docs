---
title: Okta API Products Change Log
---

## 2018.18

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Authentication Object for Step-up Authentication Is in Early Access](#authentication-object-for-step-up-authentication-is-in-early-access) | May 2, 2018 | May 7, 2018 |
| [New Version of the Okta Sign-In Widget](#new-version-of-the-okta-sign-in-widget) | Available Now | Available Now |
| [Bug Fixed in 2018.18](#bug-fixed-in-201818) | May 2, 2018 | May 7, 2018 |
| [Previously Released Early Access Features 2018.18 Update](#previously-released-early-access-features-201818-update) | Available now | Available now |

### Authentication Object for Step-up Authentication Is in Early Access

During [SP-initiated](/docs/api/resources/authn#sp-initiated-step-up-authentication) or [IdP-initiated](/docs/api/resources/authn#idp-initiated-step-up-authentication) authentication, use the [Authentication Object](/docs/api/resources/authn#authentication-object) to represent details that the target resource is using.

The Authentication Object is an [Early Access feature](/docs/api/getting_started/releases-at-okta).

### New Version of the Okta Sign-In Widget

[Version 2.8.0 of the Okta Sign-In Widget](https://www.npmjs.com/package/@okta/okta-signin-widget) provides new features, notable changes, and bug fixes. For details, visit the [okta-signin-widget repository](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-2.8.0).


### Bug Fixed in 2018.18

If the configured default IdP was set to inactive, Okta still used the inactive IdP as the primary endpoint for user authentications, causing authentications to fail. (OKTA-137758)

### Previously Released Early Access Features 2018.18 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows Is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
