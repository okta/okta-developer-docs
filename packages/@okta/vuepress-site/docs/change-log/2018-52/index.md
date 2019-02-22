---
title: Okta API Products Change Log
---

## 2018.12.2

> NOTE: Okta has changed our release model and version numbering. Under the old system, this would have been release 2018.52. For more information, see here: <https://support.okta.com/help/s/article/New-Okta-Release-Model>

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.12.2](#bugs-fixed-in-2018122)                                                                       | December 27, 2018         | January 7, 2019                             |
| [Previously Released Early Access Features 2018.12.2 Update](#previously-released-early-access-features-2018122-update) | Available Now            | Available Now                                |

### Bugs Fixed in 2018.12.2

* An error would be returned if the `/apps/${applicationId}` [endpoint](/docs/api/resources/apps#update-application) was called to update an app that did not not have a configurable `signOnMode` property. <!--OKTA-201187-->

* The [Identity Providers API](/docs/api/resources/idps) endpoints `GET /idps/${idpId}/users`, `GET /idps/${idpId}/users/{userId}`, and `DELETE /idps/${idpId}/users/${userId}` previously required the social authentication feature, even for users related to a non-social IdP. Additionally, non-Social IdPs were not included in the results returned by `GET /users/${userId}/idps`. <!--OKTA-199631-->

* Instead of providing specific reasons for failure, [Identity Providers](/docs/api/resources/idps) operations failed with generic `error_description` values when the Social Auth provider required user attributes in the user's profile but the attributes were missing or invalid. <!--OKTA-120115-->

* The `/users/${userId}/factors/catalog` [endpoint](/docs/api/resources/factors#list-factors-to-enroll) returned `email` as a supported factor type even when Email Authentication was not enabled for the org in MFA settings. <!--OKTA-201633-->

### Previously Released Early Access Features 2018.12.2 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
