---
title: Overview
---

A new user's first impression starts with the registration process, making it a critical aspect to get right. Because you're asking a user to give you information for the first time, you need to personalize and streamline the experience.

Okta's self-service registration lets you configure a custom app or the Okta Homepage for use when users self-register. After you configure and enable your self-service registration policy, a sign-up link appears in the Okta Sign-In Widget. Users who click this link are directed to a Create Account registration form that is based on your registration policy.

**Self-service registration supports these registration workflows:**

* **Make email verification mandatory.** After registering their information, users are immediately sent an email to verify their email address. Users must click the link in the email to complete the registration process. Users are then redirected to your app or to your org's Okta Homepage.

> **Note:** The lifetime of the emailed link is dictated by the **Activation emails are valid for** setting on the **Security** > **General** page of the Admin Console.

* **Make email verification optional.** After registration, end users are immediately redirected to your custom app/portal or to your org's Okta Homepage. Okta then sends the user an email requesting verification of their email address.

## Before you begin

> **Note:** This is an Early Access feature. To enable it, contact [Okta Support](https://support.okta.com/help/s/?_ga=2.17747641.1660906902.1597076228-1076744453.1575496867).

* Super admin permissions are required to enable self-service registration.
* If you are hosting your own [customized Widget](https://developer.okta.com/code/javascript/okta_sign-in_widget/), version 2.9 or later is required.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>