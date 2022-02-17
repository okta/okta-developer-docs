---
title: Device Context
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

This guide shows you how to enable and integrate device context into your application using the Embedded SDK.

---
**Learning outcomes**

* Understand how device context enables Adaptive Multi-factor Authentication (AMFA)
* Learn step-by-step how to enable device context in your app

**What you need**

* <StackSnippet snippet="whatyouneedsdk" />
* <StackSnippet snippet="whatyouneedorg" />

**Sample code**

* <StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

### Adaptive Multi-Factor Authentication and device context defined

A fixed authentication strategy for each one of your users is not ideal, especially when their sign-in requests span varying degrees of risk levels. For example, a user signing in to your website from a new device or new country may signal a risky situation and demands strong security. Adding additional authenticators&#8212;email, phone SMS, or biometrics&#8212;gives extra identity assurance in these circumstances. These authenticators, however, also add sign-in friction for safer situations such as your user signing in from home on a previously used device. Okta's Adaptive Multi-Factor Authentication (AMFA) solves this need for differing security strategies by dynamically throttling the amount and type of authenticators based on the riskiness of the user's location and device identity.

Okta's AMFA uses device context coupled with policy-driven logic to decide when users should be required to verify themselves with additional authenticators. This device context includes the device's location, unique identifier, and user agent used during the sign-in. Okta manages this device context for you automatically when you use the Redirect or Sign-in Widget deployment models. Create the policies in your org to start using AMFA.

### Use device context with the Embedded SDK

For Embedded SDK integrations, where your middleware server-side application is a trusted client, you are required to create, store, and pass this device context information to Okta. Currently, the SDK supports using a device ID, which represents a unique identifier for the user's device. With this device ID, you can detect whether a user is using a new or previously used device to sign in.

To enable AMFA in your app using the Embedded SDK, you need to enable AMFA in your org, create and manage these device IDs, and update your application to pass the device ID to the SDK. This guide shows you step-by-step how to do this.

## Update configurations

Update your Okta org to allow for AMFA. The following steps set up your org to prompt users with an additional authenticator when they are on a new device. Subsequent sign-ins only require a username and password. The steps are as follows:

1. [Create your Okta org](#create-your-okta-org)
1. [Add a new global sign-on policy](#add-a-new-global-sign-on-policy)
1. [Confirm catch-all rule has no additional authenticators](#confirm-catch-all-rule-has-no-additional-authenticators)
1. [Add a new rule in the application sign on policy](#add-a-new-rule-in-the-application-sign-on-policy)

### Create your Okta org

1. If you haven't yet created an org, [create one](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#get-set-up) and <StackSnippet snippet="configureorg" inline/>.

1. Ensure that you have at least one authenticator set up for your org. See how to set up an [email](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#_1-set-up-the-email-authenticator-for-authentication-and-recovery) and [phone](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#_2-add-the-phone-authenticator-for-authentication-and-recovery) authenticator for more details.

### Add a new global sign-on policy

Add a new global sign-on policy that allows applications to set rules for new devices.

1. In the Admin Console, go to **Security > Okta Sign-on Policy**.
1. On the **Okta Sign-on Policy** page, click on **Add New Okta Sign-on Policy**.
1. On the **Add Policy** dialog box, do the following:
   1. Set **Policy Name**, for example, "New Device AMFA Policy.
   1. Set **Assign to Groups** to **Everyone**.
   1. Click **Create Policy and Add Rule** to save the new policy.
1. After adding the rule, the **Add Rule** dialog box opens. In this dialog do the following:
   1. Set a **Rule Name**, for example **New Device AMFA Rule**.
   1. Set **Behavior is** to **New Device**.
   1. Set **Primary factor is** to **Password / IDP**
   1. Uncheck **Require secondary factor** for **Secondary factor**.
   1. Confirm **Secondary factor** is set to **Require secondary factor**
   1. Click **Create Rule** to create the rule.

> **Note:** The **New Device** behavior is defined under **Security > Behavior Detection**.

### Confirm catch-all rule has no additional authenticators

1. In the Admin Console, go to **Applications > Applications**.
1. On the **Applications** page, click on your application.
1. On your application page, click on the **Sign On** tab.
1. Scroll down to the **Sign on Policy** section and click on your default **catch-all** rule.
1. On the **Edit Rule** dialog box, confirm that **User must authenticate with** is set to **Password**.
1. Click **Cancel** to exit if no changes were made.

### Add a new rule in the application sign on policy

Add a new application rule that requires an authenticator when the user signs in with a new device.

1. In the Admin Console, go to **Applications > Applications**.
1. On the **Applications** page, click on your application.
1. On your application page, click on the **Sign On** tab.
1. Scroll down to the **Sign on Policy** section and click on **Add rule**.
1. On the **Add Rule** dialog box, set the name for the rule name, for example, "New Device AMFA"
1. Set the **The following custom expression is true** to the following expression `security.behaviors.contains(“New Device”)`. For more information on this expression and other expressions see the [Okta Expression Reference Guide](/docs/reference/okta-expression-language-in-identity-engine/#security-context).
1. Confirm that the **User must authenticate with** field is set to **Password + Another factor**.
1. Confirm **Your org's authenticators that satisfy this requirement** displays password plus at least one additional factor type (for example, email or phone).
1. Click **Save** to save your changes.

## SDK Integration steps

<StackSnippet snippet="integrationsteps" />

</div>
