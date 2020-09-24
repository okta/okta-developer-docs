---
title: Okta API Products Release Notes
---

## 2018.32

| Change                                                                                                               | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------- |
| [Interstitial Page Settings are Generally Available (GA)](#interstitial-page-settings-are-generally-available)       | August 8, 2018           | September 2018                               |
| [New System Log Event Type for Denied Events](#new-system-log-event-type-for-denied-events)                          | August 8, 2018           | August 13, 2018                              |
| [Bugs Fixed in 2018.32](#bugs-fixed-in-2018-32)                                                                       | August 8, 2018           | August 13, 2018                              |
| [Previously Released Early Access Features 2018.32 Update](#previously-released-early-access-features-2018-32-update) | Available now            | Available now                                |


### Interstitial Page Settings are Generally Available

You can now disable the Okta loading animation that appears during a login redirect to your application. For more information, see [Manage the Okta interstitial page](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Settings_Customization).

### New System Log Event Type for Denied Events

The [System Log](/docs/reference/api/system-log/) now reports when requests are denied due to a blacklist rule (such as a IP network zone or location rule). These events are logged with the event type `security.request.blocked`. (OKTA-178982)

### Bugs Fixed in 2018.32

* Fixed a bug that affected delegated authentication users: in rare cases, the user appeared to be active when locked out, or vice versa. (OKTA-180932)
* The Apps API now [returns an error](/docs/reference/api/apps/#response-example-self-service-application-assignment-not-available) if changing the Application's self-service assignment settings could result in an insecure state. (OKTA-182497)

### Previously Released Early Access Features 2018.32 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Custom URL Domains](#custom-url-domains-are-in-early-access)|
| [Custom Okta-hosted Sign-In Page](#custom-okta-hosted-sign-in-page-is-in-early-access)|
| [Custom Error Page](#custom-error-page-is-in-early-access)|
| [Linked Objects API](#linked-objects-api-in-early-access-ea) |
| [Token Management API](#token-management-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
