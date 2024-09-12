---
title: Okta Identity Engine API Products release notes 2021
---
<ApiLifecycle access="ie" />

## December

### Weekly release 2021.12.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2021.12.2](#bug-fixed-in-2021-12-2) | December 22, 2021 |

#### Bug fixed in 2021.12.2

The [`login_hint`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS!in=query&path=login_hint&t=request) didn't appear in the **Username** box even though the admin had already set up the sign-in flow with the [Org2Org](/docs/concepts/multi-tenancy/#diagram) OIDC [app](/docs/reference/api/apps/). (OKTA-445843)

### Monthly release 2021.12.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Browser-like devices can now use the Device Authorization Grant flow](#browser-like-devices-can-now-use-the-device-authorization-grant-flow) | December 8, 2021 |
| [Custom domains with Okta-managed certificates](#custom-domains-with-okta-managed-certificates) | December 8, 2021 |
| [Device Authorization grant type is now GA in Production](#device-authorization-grant-type-is-now-ga-in-production) | November 3, 2021 |
| [Dynamic Issuer Mode is GA in Preview](#dynamic-issuer-mode-is-ga-in-preview) | December 8, 2021          |
| [Error response updated for malicious IP address sign-in requests](#error-response-updated-for-malicious-ip-address-sign-in-requests) | December 8, 2021 |
| [IdP discovery supported for Device Authorization Grant flow](#idp-discovery-supported-for-device-authorization-grant-flow) | December 8, 2021 |
| [Upload Logo for Org deprecated](#upload-logo-for-org-deprecated) | December 8, 2021          |
| [Bugs fixed in 2021.12.0](#bugs-fixed-in-2021-12-0)  | December 8, 2021          |

#### Browser-like devices can now use the Device Authorization Grant flow

Browser-like devices such as Smart TV applications that run on WebOS, Samsung, and Tesla can now use the [Device Authorization Grant flow](/docs/guides/device-authorization-grant/main/). <!--OKTA-444993-->

#### Custom domains with Okta-managed certificates

When you customize an Okta URL domain, your Okta-hosted pages are branded with your own URL. [Okta-managed certificates](/docs/guides/custom-url-domain/main/#configure-a-custom-domain-through-okta-managed-certificates) automatically renew through a Let's Encrypt integration, a free certificate authority. Okta-managed certificate renewals lower customer developer maintenance costs and reduce the high risk of a site outage when certificates expire. <!--OKTA-444104-->

#### Device Authorization grant type is now GA in Production

Advancements in internet technology have seen an explosion of smart devices and the Internet of Things. Consumers need to sign in to applications that run on these devices, but the devices either lack support for a web browser or have limited ability for input, such as smart TVs, car consoles, and thermostats. As a result, users resort to insecure authentication solutions that are error-prone and time-consuming.

The Device Authorization grant feature is an OAuth 2.0 grant type that allows users to sign in to input-constrained devices and also to devices that lack web browsers. This feature enables users to use a secondary device, such as a laptop or mobile phone, to complete sign-in to applications that run on such devices. See [Configure Device Authorization](/docs/guides/device-authorization-grant/main/).<!--OKTA-450432-->

#### Dynamic Issuer Mode is GA in Preview

An authorization server's issuer URL can be used to validate whether tokens are issued by the correct authorization server. You can configure the issuer URL to be either the Okta subdomain (such as `company.okta.com`) or a custom domain (such as `sso.company.com`). See [Property details](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServer/).

When there are apps that use Okta's subdomain and other apps that use the custom domain, the issuer validation breaks because the value is hard-coded to one domain or the other.

With Dynamic Issuer Mode, the issuer value in minted tokens is dynamically updated based on the URL that is used to initiate the original authorize request. See [Client application settings](/docs/reference/api/apps/#settings-10). <!--OKTA-447358-->

#### Error response updated for malicious IP address sign-in requests

If you block suspicious traffic and [ThreatInsight](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ThreatInsight/) detects that the sign-in request comes from a malicious IP address, Okta automatically denies the user access to the organization. The user receives an error in response to the request. From the user's perspective, the blocked request can’t be identified due to ThreatInsight having identified the IP address as malicious. <!--OKTA-434409-->

#### IdP Discovery supported for Device Authorization Grant flow

The OAuth 2.0 [Device Authorization Grant flow](/docs/guides/device-authorization-grant/main/) now supports routing rules and IdP Discovery. <!--OKTA-425256-->

#### Upload Logo for Org deprecated

The Upload Logo for Org endpoint (`/org/logo`) is deprecated. Use the [Upload the Logo](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Themes/#tag/Themes/operation/uploadBrandThemeLogo) (`/brands/${brandId}/themes/${themeId}/logo`) endpoint instead. <!--OKTA-432207-->

#### Bugs fixed in 2021.12.0

* When the [Device Authorization Grant flow](/docs/guides/device-authorization-grant/main/) was used, token inline hooks weren't called. (OKTA-445422)

* When users signed in to Okta Identity Engine using the [Sign-In Widget](/code/javascript/okta_sign-in_widget/), the **Username** field wasn't set as a required field. (OKTA-391311)

## November

### Weekly release 2021.11.3

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Support for multiple device management statuses on a single device is now GA in Preview](#support-for-multiple-device-management-status-on-a-single-device-is-now-ga-in-preview) | December 02, 2021 |
| [Bug fixed in 2021.11.3](#bug-fixed-in-2021-11-3) | December 02, 2021 |

#### Support for multiple device management statuses on a single device is now GA in Preview

Multiple users signed in to a single device now retain their own device management status. Users with a `managed` device status don't share that status with users who have an `unmanaged` device status.<!--OKTA-447458-->

#### Bug fixed in 2021.11.3

SAML app requests that don't support the SAML protocol resulted in an `HTTP 500 Internal Server` error. (OKTA-435382)

### Weekly release 2021.11.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Profile enrollment policies can't be modified to deny access](#profile-enrollment-policies-can-t-be-modified-to-deny-access) | November 17, 2021 |
| [Bug fixed in 2021.11.2](#bug-fixed-in-2021-11-2) | November 17, 2021 |

#### Profile enrollment policies can't be modified to deny access

Admins can't update a [Profile Enrollment policy](/docs/reference/api/policy/#profile-enrollment-policy) by setting the `access` property to `DENY` in the [Profile Enrollment Action object](/docs/reference/api/policy/#profile-enrollment-action-object). <!--OKTA-442998-->

#### Bug fixed in 2021.11.2

Clients failed to access a custom domain if the optional `certificateChain` property for the [Certificate object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomDomain/#tag/CustomDomain/operation/upsertCertificate!path=certificateChain&t=request) wasn't provided when the custom domain was configured with the Domains API. (OKTA-440204)

### Weekly release 2021.11.1

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
| [Event hooks daily limit](#event-hooks-daily-limit)                          | November 3, 2021          |
| [Token-based SSO between native apps is now GA in Production](#token-based-sso-between-native-apps-is-now-ga-in-production)                          | October 6, 2021          |

#### Brands API support for auto-detecting contrast colors

The Brands API Theme object properties `primaryColorContrastHex` and `secondaryColorContrastHex` automatically optimize the contrast between font color and the background or button color. You can disable the auto-detection feature by updating either property value with an accepted contrast hex value. See [Replace a Theme](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Themes/#tag/Themes/operation/replaceBrandTheme).<!--OKTA-426715-->

#### New Devices API response property available

Calls to the [List devices](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices) endpoint with an `expand=user` query now return the management status associated with each embedded user.<!--OKTA-431007-->

#### New error page macros for themed templates

Custom [error page templates](/docs/guides/custom-error-pages/main/#use-macros/) include new macros to customize the URL (href) in addition to the button text for themed templates.<!--OKTA-440888-->

#### Event hooks daily limit

The maximum allowable daily limit of event hooks for all orgs has increased from 100,000 to 200,000. A higher daily allocation of event hooks reduces the likelihood that orgs will exceed their daily limits. See [Limits, duplicates, and order of Hook calls](/docs/reference/hooks-best-practices/#limits-duplicates-and-order-of-hook-calls).<!--OKTA-441433-->

#### Token-based SSO between native apps is now GA in Production

Single Sign-On (SSO) between browser-based web apps is achieved by leveraging shared cookies. Unlike web applications, native applications can't use web cookies. With Native SSO, Okta offers a token-based approach to achieve SSO between native applications.

Native SSO allows you to protect native OpenID Connect applications, such as desktop apps and mobile apps, and achive SSO and Single Logout (SLO) between these applications. See [Configure SSO for native apps](/docs/guides/configure-native-sso/main/).<!--OKTA-435714-->

## October

### Weekly release 2021.10.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2021.10.2](#bug-fixed-in-2021-10-2) | October 27, 2021 |

#### Bug fixed in 2021.10.2

The `endUserDashboardTouchPointVariant` property on the [Brands API Theme object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Themes/#tag/Themes/operation/replaceBrandTheme) didn't include a variant for LOGO_ON_FULL_WHITE_BACKGROUND. (OKTA-425798)

### Monthly release 2021.10.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [New Brands API option to remove sign-in page footer message](#new-brands-api-option-to-remove-sign-in-page-footer-message) | October 6, 2021 |

#### New Brands API option to remove sign-in page footer message

You can now remove "Powered by Okta" and "© 2021" from the Okta-hosted sign-in page using either the [Customizations > Footer](https://help.okta.com/okta_help.htm?type=oie&id=ext-custom-footer) option in the Admin Console or the [Brands API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/#tag/Brands/operation/replaceBrand). <!--OKTA-424736-->

## September

### Weekly release 2021.09.4

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [New Devices API](#new-devices-api)| September 29, 2021 |
| [New Policy Authenticator settings are available in the Policy API](#new-policy-authenticator-settings-are-available-in-the-policy-api)| September 29, 2021 |

#### New Devices API

The [Devices API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/) allows you to retrieve a single device or a list of devices from an org. The API also allows you to activate, deactivate, suspend, unsuspend, and delete a device by ID. You can access the OAuth 2.0 supported Devices API by using the `okta.devices.manage` and `okta.devices.read` [scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints). <!--OKTA-424362-->

#### New Policy Authenticator settings are available in the Policy API

[Policy Authenticator](/docs/reference/api/policy/#policy-authenticator-object) configurations are now included in the Policy API's [Multifactor (MFA) Enrollment Policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) settings. You can configure either [Authenticators](/docs/reference/api/policy/#policy-authenticators-settings-example) or [Factors](/docs/reference/api/policy/#policy-factors-settings-example) for an MFA Enrollment Policy with this API update. The Policy Authenticator configurations are available for all active Authenticators, including enrollment and recovery Authenticators. <!--OKTA-429994-->

### Weekly release 2021.09.3

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Native SSO Support](#native-sso-support)| September 22, 2021 |

#### Native SSO Support

You can now configure your org to use the [Native SSO](/docs/guides/configure-native-sso) flow on Identity Engine. The Native SSO feature allows you to protect native OpenID Connect applications and achieve Single Sign-On (SSO) and Single Logout (SLO) between native applications.

### Monthly release 2021.09.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [The Subscriptions API is GA in Production](#the-subscriptions-api-is-ga-in-production)| September 1, 2021 |

#### The Subscriptions API is GA in Production

The [Subscriptions API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Subscription/) provides operations to manage email subscription settings for Okta administrator notifications.

* Super Admins can manage the default admin notifications that each admin receives based on their role.
* Individual admins can update their own notification preferences by subscribing or unsubscribing. <!--OKTA-411527-->

## August

### Weekly release 2021.08.2

| Change                                                                     | Expected in Preview Orgs |
|----------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2021.08.2](#bugs-fixed-in-2021-08-2)                          | August 18, 2021          |

#### Bugs fixed in 2021.08.2

- In the [Device Authorization grant flow](/docs/guides/device-authorization-grant/main/), the URI link that was used in a QR Code was missing if the org was on Okta Identity Engine. (OKTA-413425)

- When admins used the `/token` endpoint, OAuth 2.0 refreshed the [access and ID tokens](/docs/guides/refresh-tokens/) for all application users, which included both active and deactivated users instead of only including active users. (OKTA-417991)

### Weekly release 2021.08.1

| Change                                                                     | Expected in Preview Orgs |
|----------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2021.08.1](#bug-fixed-in-2021-08-1)                          | August 11, 2021          |

#### Bug fixed in 2021.08.1

When Single Sign-On (SSO) was used with an IdP that included a `fromURI` parameter, an HTTP 500 error was returned. (OKTA-407425)
