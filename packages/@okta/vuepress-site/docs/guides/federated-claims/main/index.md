---
title: Federated claims with entitlements
excerpt: Learn how to implement federated claims with entitlements for an app
layout: Guides
---

This guide describes how to configure your app to pass Identity Governance (IGA) entitlements in your tokens to the Service Provider (SP) using federated claims.



Federated Claims with entitlements and Federated Claims with user entitlements

---

#### Learning outcomes

* Understand the purpose of federated claims with entitlements
* Understand how to configure federated claims for a SAML and an OpenID Connect (OIDC) app.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* The Identity Governance feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enable this feature.
* The Federated Claim Generation Layer feature enabled for your org. To enable this feature, go to **Settings** > **Features**, locate the Federated Claim Generation Layer feature and enable.
* An existing <SAML or OIDC> app
* A test user assigned to the <app>

---

## Overview

Currently, the persistence and generation of claims for tokens varies, depending on the protocol that you use. Only user attributes and group memberships are supported as claim types. The experience of configuring claims should work the same across protocols. The only difference should be the output format, which is tailored to the requirements of the protocol.

Federated claims create a more consistent experience for the configuration of claims for both SAML and OpenID Connect (OIDC) apps. Federated claims unifies the inconsistencies by adding support for a new type of claim that all apps can consume. This new claim type takes the form of the name of the claim and an [expression](/docs/reference/okta-expression-language-in-identity-engine/) to reference principal information. The contexts currently available for reference are `user` profile attributes and `appuser` entitlements. More about `user` profile attributes here. Then link them See the [Federated Claims with user entitlements](link).

### Entitlements

An entitlement is a permission that allows users to take specific actions within a resource, such as a third-party app. Within the Identity Provider org (Okta), app entitlements help you manage different levels of permissions that users can perform within an app. They represent permissions that you have at the SP.

There are three important properties associated with entitlements:

`name`: The display name for an entitlement property. This is a human-friendly name that's editable and for display purposes only.
`externalValue`: The value of an entitlement property. Think of this property as the system/external representation of the entitlement, and that it’s not editable. Use this value in your EL expression.
`parent`: The representation of a resource. This is the resource that the entitlement is bound to, in this use case an AppInstance.

An additional attribute included with an entitlement is the value or values that it may contain. Values contained within an entitlement may be either a single string or an array of strings. These values have two important attributes, similar to the entitlement itself:

`name`: The display name of the value.
`externalValue`: External system representation of the value.

When a user is assigned to an app that has entitlements configured, they may also be granted one or more entitlements. Each entitlement that they have been granted may have one or more values, depending on the entitlement definition (single value, multiple value, and so on). Two things need to be communicated to the downstream Service Provider (SP):

* What entitlement the principal (user) has. This may be `entitlement.externalValue` or some other value required by the agreement between the SP and the app.
* What specific values the principal (user) has for that entitlement (`entitlement.values[i].externalValue`)

### Expression Language and entitlements

The integration of entitlements into [Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/) is on the `appuser` context. When you [configure an entitlement claim for an app](#configure-an-entitlement-claim-for-the-app), the expression in EL states which entitlement the SP should evaluate for the principal and app. For example, if the `externalValue` of an entitlement property is `permission`, then your EL expression would be `appuser.entitlement.permission`, because `entitlement.externalValue == permission`. At evaluation time, the results of the expression are the values that the principal has been granted for the entitlement referenced in the expression.

## Update the app to use Identity Governance

Go to **Applications** > **Applications** and select the <SAML> app that you want to define entitlements for.
On the **General** tab, scroll down to the **Identity Governance** section and click **Edit**.
Select **Enabled** to enable the Governance Engine, and then click **Save**. The **Governance** tab should appear within a few seconds. If it doesn't, referesh the page.

## Define entitlements for the app

> **Note:** Entitlements that you create here are what you use in the Expression Language expressions used to ???referencing the variable name....

1. While still in the app that you updated in the previous section, select the **Governance** tab.
2. On the **Entitlements** tab, click **Add Entitlement** and define the entitlement properties:

   * Enter a **Display name** for the entitlement. In this example flow, enter **Permission**. This is an editable property and for display purposes only.
   * Enter a **Variable name** for the entitlement. In this example flow, enter **permission**. This is the external representation of the entitlement and isn't editable. Use this attribute in your Expression Language (EL) expression when you [configure an entitlement claim for the app](#configure-an-entitlement-claim-for-the-app).
   * Set the **Entitlement Type (Data Type)**. The entitlement can either be a static string (**String**) or a string array (**String Array**). In this example flow, select **String Array**.
   * Optional. Enter a **Description** of the entitlement.

3. Click **Next**.
4. Define entitlement attributes. You can define one value or a number of values that can then be assigned to the user. Each value must be unique:

   * Enter a **Display name** for the entitlement value. This is editable and for display purposes only. In this example flow, enter **Read**.
   * Enter a **Variable name** for the entitlement value. This is the external representation of the entitlement value and isn't editable. In this example flow, enter **Read**. This property is the name that appears in the <SAML attribute statement or token>.??
   * Optional. Enter a **Description** of the entitlement value.

5. Click **+ Add value** and repeat the previous step for the **Write** and **Delete** attribute values for this example flow.
6. Click **Save entitlement**.

## Assign entitlements to a user

> **Note:** If you created an app from scratch, assign a user to the app for testing.

1. On the **Assignments** tab, select **View access details** from the right-hand menu for your test user.
1. Click **Edit access**, and then click **Customize entitlements** to customize the entitlements for the user. The entitlement that you created in the previous section appears.
1. Select the permissions that you want to assign to the user. In this example flow, select **Read**, and then **Write**.
1. Click **Save**, and then **Save** again.

## Configure an entitlement claim for the app

1. Select the **Sign On** tab, scroll down to the **SAML Attributes** section, and click **Edit**.

   > **Note:** If you have the Identity Threat Protection (ITP) feature enabled for your org, select the **Authentication** tab.

1. Select **Add expression** to configure the user entitlement claim for the app.
1. In the dialog, give the entitlement claim a name.
1. In the **Expression** field, enter `appuser.entitlements.permission` as the EL expression. The `permission` attribute is the variable name that you assigned when you [defined entitlements for the app](#define-entitlements-for-the-app).
1. Click **Save**.

Test

Access the <SAML> app from the dashboard and sign in as the test user. Using "SOME SORT OF TOOL HERE", you can copy the SAML response and then use a tool such as this [SAML Tokens tool](https://samltool.io/) to view the attribute statement with the included permissions that you assigned to the test user.


