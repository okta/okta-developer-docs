---
title: Okta Identity Engine API Products Release Notes 2021
---
<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

## November

### Weekly Release 2021.11.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Profile enrollment policies can't be modified to deny access](#profile-enrollment-policies-can-t-be-modified-to-deny-access) | November 17, 2021 |
| [Bug fixed in 2021.11.2](#bug-fixed-in-2021-11-2) | November 17, 2021 |

#### Profile enrollment policies can't be modified to deny access

Admins can't update a [Profile Enrollment policy](/docs/reference/api/policy/#profile-enrollment-policy) by setting the `access` property to `DENY` in the [Profile Enrollment Action object](/docs/reference/api/policy/#profile-enrollment-action-object). <!--OKTA-442998-->

#### Bug fixed in 2021.11.2

Clients failed to access a custom domain if the optional `certificateChain` property for the [Certificate object](/docs/reference/api/domains/#certificate-object) wasn't provided when the custom domain was configured with the Domains API. (OKTA-440204)

### Weekly Release 2021.11.1

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2021.11.1](#bugs-fixed-in-2021-11-1) | November 10, 2021 |

#### Bug fixed in 2021.11.1

When the [Update User endpoint](/docs/reference/api/users/#update-user) or the [Change Recovery Question endpoint](/docs/reference/api/users/#change-recovery-question) was used to update the user's security question, Okta Identity Engine still returned the old security question. (OKTA-442243)

### Monthly release 2021.11.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Brands API support for auto-detecting contrast colors](#brands-api-support-for-auto-detecting-contrast-colors) | November 3, 2021 |
| [New Devices API response property available](#new-devices-api-response-property-available) | November 3, 2021 |
| [New error page macros for themed templates](#new-error-page-macros-for-themed-templates)                          | November 3, 2021          |
| [Event Hooks daily limit](#event-hooks-daily-limit)                          | November 3, 2021          |
| [Token-based SSO between native apps is now GA in Production](#token-based-sso-between-native-apps-is-now-ga-in-production)                          | October 6, 2021          |

#### Brands API support for auto-detecting contrast colors

The Brands API [Theme object properties](/docs/reference/api/brands/#theme-api-objects) `primaryColorContrastHex` and `secondaryColorContrastHex` automatically optimize the contrast between font color and the background or button color. You can disable the auto-detection feature by updating either property value with an accepted contrast hex value. See [Update Theme](/docs/reference/api/brands/#update-theme).<!--OKTA-426715-->

#### New Devices API response property available

Calls to the [List devices](/docs/reference/api/devices/#usage-example-expand-user) endpoint with an `expand=user` query now return the management status associated with each embedded user.<!--OKTA-431007-->

#### New error page macros for themed templates

Custom [error page templates](/docs/guides/custom-error-pages/main/#use-macros/) include new macros to customize the URL (href) in addition to the button text for themed templates.<!--OKTA-440888-->

#### Event Hooks daily limit

The maximum allowable daily limit of Event Hooks for all orgs has increased from 100,000 to 200,000. A higher daily allocation of Event Hooks reduces the likelihood that orgs will exceed their daily limits. See [Limits, duplicates, and order of Hook calls](/docs/reference/hooks-best-practices/#limits-duplicates-and-order-of-hook-calls).<!--OKTA-441433-->

#### Token-based SSO between native apps is now GA in Production

Single Sign-On (SSO) between browser-based web apps is achieved by leveraging shared cookies. Unlike web applications, native applications can't use web cookies. With Native SSO, Okta offers a token-based approach to achieve SSO between native applications.

Native SSO allows you to protect native OpenID Connect applications, such as desktop apps and mobile apps, and achive SSO and Single Logout (SLO) between these applications. See [Configure SSO for native apps](/docs/guides/configure-native-sso/main/).<!--OKTA-435714-->

## October

### Weekly Release 2021.10.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2021.10.2](#bug-fixed-in-2021-10-2) | October 27, 2021 |

#### Bug fixed in 2021.10.2

The `endUserDashboardTouchPointVariant` property on the [Brands API Theme object](/docs/reference/api/brands/#theme-object) didn’t include a variant for LOGO_ON_FULL_WHITE_BACKGROUND. (OKTA-425798)

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
