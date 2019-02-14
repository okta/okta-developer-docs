---
title: Okta API Products Change Log
---

## 2018.25

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Better /userinfo Errors](#better-userinfo-errors)                                                                  | June 20, 2018            | June 25, 2018                                |
| [Bugs Fixed in 2018.25](#bugs-fixed-in-201825)                                                                       | June 20, 2018            | June 25, 2018                                |
| [Previously Released Early Access Features 2018.25 Update](#previously-released-early-access-features-201825-update) | Available now            | Available now                                |

### Better /userinfo Errors

The following information has been added to the `userinfo` endpoint's error response:

* `authorization_uri`
* `realm`
* `resource`
* a list of required scopes in the `scope` parameter <!-- OKTA-170686 -->

### Bugs Fixed in 2018.25

* In certain situations, if a call was made to the OAuth 2.0/OIDC [/authorize endpoint](/docs/api/resources/oidc#authorize) with `response_mode` set to  `okta_post_message`, an `HTTP 500` error would return. (OKTA-175326)
* Removing all permissions on a schema attribute would return a `READ_ONLY` permission. The response now correctly contains a `READ_WRITE` permission. (OKTA-173030)
* If an [Authorization Server's](/docs/api/resources/authorization-servers) `redirect_uri` was too long, an `HTTP 500` error would return. (OKTA-171950)
* The `phoneExtension` property would not be returned in `GET` requests to the Factors API's `catalog` endpoint. (OKTA-108859)

### Previously Released Early Access Features 2018.25 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [System Log API](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
