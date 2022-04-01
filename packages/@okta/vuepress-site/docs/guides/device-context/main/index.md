---
title: Device Context
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

This guide shows you how to enable and integrate device context into your application using the Embedded SDK.

---
**Learning outcomes**

* Understand how device context enables Adaptive Multifactor Authentication (AMFA).
* Learn how to enable device context in your app.

**What you need**

* <StackSnippet snippet="whatyouneedsdk" />
* <StackSnippet snippet="whatyouneedorg" />

**Sample code**

* <StackSnippet snippet="samplecode" />

---

## Overview

### Adaptive Multifactor Authentication and device context defined

A fixed authentication strategy for each one of your users isn't ideal, especially when their sign-in requests span varying degrees of risk levels. For example, a user signing in to your website from a new device or new country may signal a risky situation and demands strong security. Adding additional authenticators&#8212;email, phone SMS, or biometrics&#8212;gives extra identity assurance in these circumstances. These authenticators, however, also add sign-in friction for safer situations such as your user signing in from home on a previously used device. Okta's Adaptive Multifactor Authentication (AMFA) solves this need for differing security strategies by dynamically throttling the amount and type of authenticators based on the riskiness of the user's location and device identity.

Okta's AMFA uses device context coupled with policy-driven logic to decide when users are required to verify themselves with additional authenticators. This device context includes the device's location, unique identifier, and user agent used during the sign-in flow. Okta manages this device context for you automatically when you use the Redirect or Sign-In Widget deployment models. Create the policies in your org to start using AMFA.

### Use device context with the Embedded SDK

For Embedded SDK integrations, where your middleware server-side application is a trusted client, you are required to create, store, and pass this device context information to Okta. Currently, the SDK supports using a device ID that represents a unique identifier for the user's device. With this device ID, you can detect whether a user is using a new or previously used device to sign in.

To enable AMFA in your app using the Embedded SDK, you need to enable AMFA in your org, create and manage these device IDs, and update your application to pass the device ID to the SDK. This guide shows you how to do this.

## Update configurations

Update your Okta org to allow for AMFA. The following steps set up your org to prompt users with an additional authenticator when they are on a new device. Subsequent sign-in flows only require a username and password. The steps are as follows:

1. [Create your Okta org](#create-your-okta-org)
1. [Add a new Global Session Policy](#add-a-new-global-session-policy)
1. [Confirm catch-all rule has no additional authenticators](#confirm-catch-all-rule-has-no-additional-authenticators)
1. [Add a new rule in the authentication policy](#add-a-new-rule-in-the-authentication-policy)

### Create your Okta org

1. If you haven't yet created an org, [create one](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#get-set-up) and <StackSnippet snippet="configureorg" inline/>.

1. Ensure that you have at least one authenticator set up for your org. See how to set up an [Email](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#_1-set-up-the-email-authenticator-for-authentication-and-recovery) and [Phone](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#_2-add-the-phone-authenticator-for-authentication-and-recovery) aAthenticator.

### Add a new Global Session Policy

Add a new Global Session Policy that allows applications to set rules for new devices.

1. Open the **Admin Console** for your org.
1. Choose **Security > Global Session Policy** to show the available global session policies.
1. Click **Add Policy**.
1. Give the policy a name, for example "New Device AMFA Policy".
1. Set **Assign to Groups** to **Everyone**.
1. Click **Create Policy and Add Rule** to save the new policy.

After creating the policy, the **Add Rule** dialog appears.

1. Set a **Rule Name**, for example **New Device AMFA Rule**.
1. Set **Behavior is** to **New Device**.
1. Set **Primary factor is** to **Password / IDP**
1. Verify that **Require Secondary factor** is selected for **Secondary factor**.
1. Click **Create Rule** to create the rule.

> **Note:** The **New Device** behavior is defined under **Security** > **Behavior Detection**.

### Create a new authentication policy

New app integrations are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup. In production, multiple app integrations can share the same application policy. In testing however, it's recommended that you create a new policy specifically for your test application. Specifically for this app, the policy has two rules:

* By default, users authenticate with a username and password only.
* If the user is using a new device, require a second authentication factor.

1. Open the **Admin Console** for your org.
1. Choose **Security > Authentication Policies** to show the available authentication policies.
1. Click **Add a Policy**.
1. Give the policy a name, and then click **Save**.

Set the catch-all rule to require username and password only.

1. Locate the Catch-all Rule of the new policy and select **Actions > Edit**.
1. Select **Allowed after successful authentication**.
1. Verify that **User must authenticate with** is set to **Password**.
1. Click **Save**.

Add a new authentication rule that requires an authenticator when the user signs in with a new device.

1. Click **Add rule** on the **Rules** tab for your new policy.
1. Give the rule a name, for example, **New device requires second factor**
1. Set the **The following custom expression is true** to `security.behaviors.contains("New Device")`.
1. Verify that **User must authenticate with** is set to **Password + Another factor**.
1. Verify that at least one additional factor type (for example, email or Okta Verify) is listed in the box under **Additional factor types**.
1. Click **Save**.

1. Select the **Applications** tab for your newly created policy, and then click **Add App**.
1. Find your app in the list and click **Add** next to it.
1. Click **Close**.
1. Verify that the app is now listed in the **Applications** tab of the new policy.

> **Note:** For more information on the `New Device` expression, see the [Okta Expression Reference Guide](/docs/reference/okta-expression-language-in-identity-engine/#security-context).

## SDK Integration steps

<StackSnippet snippet="integrationsteps" />

## See also

<StackSnippet snippet="relatedusecases" />

</div>
