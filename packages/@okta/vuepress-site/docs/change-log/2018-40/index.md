---
title: Okta API Products Change Log
---

## 2018.40

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.40](#bugs-fixed-in-201840)                                                                       | October 3, 2018       | October 8, 2018                           |
| [Previously Released Early Access Features 2018.40 Update](#previously-released-early-access-features-201840-update) | Available Now            | Available Now                                |

### Bugs Fixed in 2018.40

* Responses from the `/zones` [endpoint](/docs/api/resources/zones#zones-api) included a duplicate of the `type` field. (OKTA-188605)
* The `/idps/credentials/keys` [endpoint](/docs/api/resources/idps#add-x509-certificate-public-key) was requiring requests to include extra parameters. (OKTA-189780)

### Previously Released Early Access Features 2018.40 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
