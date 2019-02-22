---
title: Okta API Products Change Log
---

## 2018.14

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Linked Objects API in Early Access (EA)](#linked-objects-api-in-early-access-ea) | April 4, 2018 | April 9, 2018 |
| [Client SDKs Version 1.0](#client-sdks-version-10) | Available Now | Available Now |
| [Bug Fixed for 2018.14](#bug-fixed-for-201814) | April 4, 2018 | April 9, 2018 |
| [Previously Released Early Access Features](#previously-released-early-access-features) | Available now | Available now |

### Linked Objects API in Early Access (EA)

Users have relationships to each other, like manager and subordinate or customer and sales representative. You can create users with relationships by using the [Linked Objects API](/docs/api/resources/linked-objects).

Okta allows you to create up to 200 linked object definitions. These definitions are one-to-many:

* A manager has many subordinates
* A sales representative has many customers
* A case worker has many clients

Of course, most organizations have more than one manager or sales representative. You can create the linked object definition once, then assign the `primary` relationship to as many users as you have people in that relationship.

You can assign the `associated` relationship for a single `primary` user to as many users as needed. The `associated` user can be related to only one `primary` per linked object definition. But a user can be assigned to more than one linked object definition.

For more details:

* [Relationships use case](/use_cases/relationships/)
* [Linked Objects API documentation](/docs/api/resources/linked-objects) <!-- OKTA-161674 -->

### Client SDKs Version 1.0

We published the 1.0 version of the following client SDKs:

* [React SDK](https://github.com/okta/okta-oidc-js/releases/tag/%40okta%2Fokta-react%401.0.0)
* [Angular SDK](https://github.com/okta/okta-oidc-js/releases/tag/%40okta%2Fokta-angular%401.0.0)
* [Vue SDK](https://github.com/okta/okta-oidc-js/releases/tag/%40okta%2Fokta-vue%401.0.0)
* [iOS SDK](https://github.com/okta/okta-sdk-appauth-ios/releases/tag/1.0.0)

Visit each SDK for a complete list of new features, enhancements, and bug fixes. <!-- OKTA-164979 -->

### Bug Fixed for 2018.14

* If someone was able to obtain a user's activation email or password reset email and attempt to log in before the real user completed logging in, that person could access the account at the same time as the real user. (OKTA-85691)

### Previously Released Early Access Features

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
