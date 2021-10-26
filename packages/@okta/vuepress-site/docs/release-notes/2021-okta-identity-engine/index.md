---
title: Okta Identity Engine API Products Release Notes 2021
---
<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

## October

### Weekly Release 2021.10.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2021.10.2](#bug-fixed-in-2021-10-1) | October 27, 2021 |

#### Bug fixed in 2021.10.2

* The `endUserDashboardTouchPointVariant` property on the [Brands API Theme object](/docs/reference/api/brands/#theme-object) didn’t include a variant for LOGO_ON_FULL_WHITE_BACKGROUND. (OKTA-425798)

### Monthly Release 2021.10.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [New Brands API option to remove sign-in page footer message](#new-brands-api-option-to-remove-sign-in-page-footer-message) | October 6, 2021 |

#### New Brands API option to remove sign-in page footer message

You can now remove "Powered by Okta" and "© 2021" from the Okta-hosted sign-in page using either the [Customizations > Footer](https://help.okta.com/okta_help.htm?type=oie&id=ext-custom-footer) option in the Admin Console or the [Brands API](/docs/reference/api/brands/#brand-api-objects). <!--OKTA-424736-->

## September

### Weekly Release 2021.09.4

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [New Devices API](#new-devices-api)| September 29, 2021 |
| [New Policy Authenticator settings are available in the Policy API](#new-policy-authenticator-settings-are-available-in-the-policy-api)| September 29, 2021 |

#### New Devices API

The [Devices API](/docs/reference/api/devices/) allows you to retrieve a single device or a list of devices from an org. The API also allows you to activate, deactivate, suspend, unsuspend, and delete a device by ID. You can access the OAuth 2.0 supported Devices API by using the `okta.devices.manage` and `okta.devices.read` [scopes](/docs/guides/implement-oauth-for-okta/scopes/). <!--OKTA-424362-->

#### New Policy Authenticator settings are available in the Policy API

[Policy Authenticator](/docs/reference/api/policy/#policy-authenticator-object) configurations are now included in the Policy API's [Multifactor (MFA) Enrollment Policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) settings. You can configure either [Authenticators](/docs/reference/api/policy/#policy-authenticators-settings-example) or [Factors](/docs/reference/api/policy/#policy-factors-settings-example) for an MFA Enrollment Policy with this API update. The Policy Authenticator configurations are available for all active Authenticators, including enrollment and recovery Authenticators. <!--OKTA-429994-->

### Weekly Release 2021.09.3

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Native SSO Support](#native-sso-support)| September 22, 2021 |

#### Native SSO Support

You can now configure your org to use the [Native SSO](/docs/guides/configure-native-sso) flow on Identity Engine. The Native SSO feature allows you to protect native OpenID Connect applications and achieve Single Sign-On (SSO) and Single Logout (SLO) between native applications.

### Monthly Release 2021.09.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [The Subscriptions API is GA in Production](#the-subscriptions-api-is-ga-in-production)| September 1, 2021 |

#### The Subscriptions API is GA in Production

The [Subscriptions API](/docs/reference/api/admin-notifications/) provides operations to manage email subscription settings for Okta administrator notifications.

* Super Admins can manage the default admin notifications that each admin receives based on their role.
* Individual admins can update their own notification preferences by subscribing or unsubscribing. <!--OKTA-411527-->

## August

### Weekly Release 2021.08.2

| Change                                                                     | Expected in Preview Orgs |
|----------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2021.08.2](#bugs-fixed-in-2021-08-2)                          | August 18, 2021          |

#### Bugs fixed in 2021.08.2

- In the [Device Authorization grant flow](/docs/guides/device-authorization-grant/main/), the URI link that was used in a QR Code was missing if the org was on Okta Identity Engine. (OKTA-413425)

- When admins used the `/token` endpoint, OAuth 2.0 refreshed the [access and ID tokens](/docs/guides/refresh-tokens/overview/) for all application users, which included both active and deactivated users instead of only including active users. (OKTA-417991)

### Weekly Release 2021.08.1

| Change                                                                     | Expected in Preview Orgs |
|----------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2021.08.1](#bug-fixed-in-2021-08-1)                          | August 11, 2021          |

#### Bug fixed in 2021.08.1

When Single Sign-On (SSO) was used with an IdP that included a `fromURI` parameter, an HTTP 500 error was returned. (OKTA-407425)
