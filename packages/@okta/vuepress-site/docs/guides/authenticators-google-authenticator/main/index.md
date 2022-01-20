---
title: Google Authenticator integration guide
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

This guide shows you how to integrate the Google Authenticator into your authentication use cases using the embedded SDK.

---
**Learning outcomes**

* Understand the Google Authenticator flow.
* Learn step-by-step how to integrate the Google Authenticator your authentication use case

**What you need**

* [An Okta org already configured for a password-only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

Before you can start using the Google Authenticator, create an Okta org application as described in [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case). Once completed add the Google Authenticator to your app integration by executing the following steps:

### Add Google Authenticator to the Okta org

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, click **Add Authenticator**.
1. On the **Add Authenticator** dialog box, click **Add** under **Google Authenticator**.
1. On the **Add Google Authenticator** dialog box, click **Add**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. On the **Enrollment** tab, click **Edit** for the **Default Policy**.
1. Set **Google Authenticator** to **Optional** and click **Update Policy**.

### Configure your Okta org application to use Google Authenticator

1. In the Admin Console, go to **Applications** and **Applications**.
1. On the **Applications** page, click on your application you've previously created.
1. On the **General** tab ensure that **Interaction Code** and **Refresh Token** are selected.
1. On the **Sign On** tab, scroll down to the **Sign On Policy** section and click **Add Rule**.
1. On the **Add Rule** dialog box, do the following:
   1. Enter a name for the new rule (for example "2FA Rule").
   1. Set **User must authenticate with** to **Password+Another Factor**.
   1. Select **Device Bound**.
   1. Confirm **Your org's authenticators that satisify this requirment** is set too **Password AND Google Authenticator or ...**.
   1. Click **Save**.

### Install Google Authenticator

Depending on your mobile device, install Google Authenticator either using the Android Google Play store or Apple app store.

## Integrate authenticator enrollment

These steps detail how to integrate the Google Authenticator enrollment flow into your application.

### Summary of steps

<StackSnippet snippet="enrollmentsummaryofsteps" />

### Integration steps

The integration steps below detail how to integrate the Google Authenticator which can be used in varying authentication use cases such as [Basic sign-in flow using the password factor]() and [Sign-in with Facebook]().

<StackSnippet snippet="enrollmentintegrationsteps" />

## Integrate authenticator challenge

These steps detail how to integrate the Google Authenticator challenge flow into your application.

### Summary of steps

<StackSnippet snippet="challengesummaryofsteps" />

### Integration steps

<StackSnippet snippet="challengeintegrationsteps" />
