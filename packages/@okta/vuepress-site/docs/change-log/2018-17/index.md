---
title: Okta API Products Change Log
---

## 2018.17

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Bugs Fixed in 2018.17](#bugs-fixed-in-201817) | April 24, 2018 | May 1, 2018 |
| [Previously Released Early Access Features 2018.17 Update](#previously-released-early-access-features-201817-update) | Available now | Available now |

### Bugs Fixed in 2018.17

* If an incorrect `appInstanceId` was supplied as the IdP parameter in a request to the `/authorize` [endpoint](/docs/api/resources/oidc#authorize), an `HTTP 500` error was thrown. (OKTA-166417)

* When Okta parsed login names it failed to support addresses enclosed in double quotes as described in [RFC 3696](https://tools.ietf.org/html/rfc3696). (OKTA-164092)

### Previously Released Early Access Features 2018.17 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
