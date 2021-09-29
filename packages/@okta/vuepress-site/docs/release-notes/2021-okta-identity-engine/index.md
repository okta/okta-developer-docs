---
title: Okta Identity Engine API Products Release Notes 2021
---
<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

## September

### Weekly Release 2021.09.3

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Native SSO Support is in Preview](#native-sso-support-is-in-preview)| September 22, 2021 |

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
