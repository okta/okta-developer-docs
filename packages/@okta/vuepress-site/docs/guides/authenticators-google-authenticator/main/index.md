---
title: Google Authenticator integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

This guide shows you how to integrate the Google Authenticator into your authentication use cases using the embedded SDK. Google Authenticator can be used in various authentication use cases such as <StackSnippet snippet="basicsignin" inline/> and <StackSnippet snippet="signinfacebook" inline/> .

---
**Learning outcomes**

* Understand the Google Authenticator flow.
* Learn step-by-step how to integrate the Google Authenticator into your authentication use case

**What you need**

* <StackSnippet snippet="orgconfigurepwdonly" />
* <StackSnippet snippet="oiesdksetup" />
* Google Authenticator installed on a mobile device

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Update configurations

Before you can start using the Google Authenticator, create an Okta org application as described in <StackSnippet snippet="orgconfigurepwdonly" inline/>. Then add the Google Authenticator to your app integration by executing the following steps:

### 1: Add Google Authenticator to the Okta org

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, click **Add Authenticator**.
1. On the **Add Authenticator** dialog box, click **Add** under **Google Authenticator**.
1. On the **Add Google Authenticator** dialog box, click **Add**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. On the **Enrollment** tab, click **Edit** for the **Default Policy**.
1. Set **Google Authenticator** to **Optional** and click **Update Policy**.

### 2: Configure your Okta org application to use Google Authenticator

1. In the Admin Console, go to **Applications** and **Applications**.
1. On the **Applications** page, click on the application you've previously created.
1. On the **General** tab ensure that **Interaction Code** and **Refresh Token** are selected.
1. On the **Sign-On** tab, scroll down to the **Sign-On Policy** section and click **Add Rule**.
1. On the **Add Rule** dialog box, do the following:
   1. Enter a name for the new rule (for example "2FA Rule").
   1. Set **User must authenticate with** to **Password+Another Factor**.
   1. Select **Device Bound**.
   1. Confirm **Your org's authenticators that satisify this requirment** is set too **Password AND Google Authenticator or ...**.
   1. Click **Save**.

## Install Google Authenticator

Install the Google Authenticator app on your mobile device either using either the Google Play Store (Android) or Apple App Store (iOS).

## Integrate SDK for authenticator enrollment

The following instructions detail step-by-step how to integrate the Google Authenticator enrollment flow into your app.

<StackSnippet snippet="enrollmentintegrationsteps" />

## Integrate SDK for authenticator challenge

The following instructions detail step-by-step how to integrate the Google Authenticator challenge flow into your app.

<StackSnippet snippet="challengeintegrationsteps" />

</div>
