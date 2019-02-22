---
title: Okta API Products Change Log
---

## 2018.29

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Bugs Fixed in 2018.29](#bugs-fixed-in-201829)                                                                       | July 18, 2018            | July 23, 2018                                |
| [Previously Released Early Access Features 2018.29 Update](#previously-released-early-access-features-201829-update) | Available now            | Available now                                


### Bugs Fixed in 2018.29

* Using the [Zones API](/docs/api/resources/zones) to modify an existing zone that is blacklisted removed the blacklisting and coverted it to a normal IP Zone. (OKTA-176610)
* Using the [Applications API](/docs/api/resources/apps) to create an OAuth client caused an error if the `credentials.oauthClient` property was not provided, even though it is not required. (OKTA-179275)
* The System Log CSV report did not contain a value for `AuthenticationContext.issuer` for the event type `user.authentication.authenticate`. (OKTA-147165)


### Previously Released Early Access Features 2018.29 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
