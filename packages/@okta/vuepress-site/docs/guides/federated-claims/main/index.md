---
title: Application federated claims with entitlements
excerpt: Learn how to implement federated claims with entitlements for an app
layout: Guides
---

This guide describes how to configure your app to pass Identity Governance entitlements in your tokens to the Service Provider (SP) using federated claims.

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

Federated claims create a more consistent experience for the configuration of claims across protocols. They unify the inconsistencies in the persistence and generation of claims for tokens by adding support for a claim type that all apps can consume.

This new claim type takes the form of the claim name and an [expression](/docs/reference/okta-expression-language-in-identity-engine/) to reference principal (user) information. The claim is included in tokens produced by federation protocols. Okta supports SAML and OpenID Connect (OIDC) apps.
So, a federated claim appears in either an OIDC ID tokens or a SAML assertion.

### Entitlements

An entitlement is a permission that allows users to take specific actions within a resource, such as a third-party app. Within the Identity Provider (IdP) org (Okta), app entitlements help you manage different levels of permissions that users can perform within an app. They represent permissions that you have at the SP.

There are three important properties associated with entitlements:

`name`: The display name for an entitlement property. This is a human-friendly name that's editable and for display purposes only.
`externalValue`: The value of an entitlement property. Think of this property as the system/external representation of the entitlement, and that it’s not editable. Use this value in your EL expression.
`parent`: The representation of a resource. This is the resource that the entitlement is bound to, in this use case an app instance.

An additional attribute included with an entitlement is the value or values that it may contain. Values within an entitlement may be either a single string or an array of strings. These values have two important attributes, similar to the entitlement itself:

`name`: The display name of the value
`externalValue`: External system representation of the value

When a user is assigned to an app that's configured to use entitlements, they may be granted one or more entitlements. Each entitlement that they're granted may have one or more values, depending on the entitlement definition (single value, multiple value, and so on). Two things need to be communicated to the downstream Service Provider (SP):

* What entitlement the principal (user) has. This may be `entitlement.externalValue` or some other value required by the agreement between the SP and the app.
* What specific values the principal (user) has for that entitlement (`entitlement.values[i].externalValue`)

### Expression Language and entitlements

The integration of entitlements into [Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/) is on the `appuser` and the `user` contexts. When you [configure an entitlement claim for an app](#configure-an-entitlement-claim-for-the-app), the expression states which entitlement the SP should evaluate for the principal and the app.

#### appuser entitlement example

If the `externalValue` of an entitlement property is `permission`, then your EL expression would be `appuser.entitlement.permission`, because `entitlement.externalValue == permission`. At evaluation time, the results of the expression are the entitlement values that the principal has been granted for the entitlement referenced in the expression.

The following is an example JSON body of a POST request to `https://{yourOktaDomain}/api/v1/apps/{appID}/federated-claims`:

```JSON
  {
     "name": "entitlement_claim_name",
     "expression": "appuser.entitlements.example_entitlement"
  }
```

#### user entitlement example

If the `externalValue` of an entitlement property is `firstName`, then your EL expression would be `user.profile.firstName`, because `entitlement.externalValue == firstName`. At evaluation time, the results of the expression are the properties that you requested from the user's profile.

The following is an example JSON body of a POST request to `https://{yourOktaDomain}/api/v1/apps/{appID}/federated-claims`:

```JSON
  {
     "name": "user_claim_name",
     "expression": "user.profile.firstName"
  }
```

## Configure entitlements

The following sections are an example flow for setting up and using entitlements for your <SAML or OIDC> app. This example flow focuses on setting up and using an `appuser` entitlement.

## Update your app to support entitlements

> **Note:** Identity Governance doesn't support **Federated Broker Mode** for OIDC apps.

1. Go to **Applications** > **Applications** and select the <SAML or OIDC> app that you want to define entitlements for.
1. On the **General** tab, scroll down to the **Identity Governance** section and click **Edit**.
1. Select **Enabled** to enable the Governance Engine, and then click **Save**. The **Governance** tab should appear within a few seconds. If it doesn't, referesh the page.

## Define entitlements for the app

> **Note:** Entitlements that you create here are what you use in the EL expressions used to include the claims in the <token or attribute statement>.

1. While still in the app that you updated in the previous section, select the **Governance** tab.
1. On the **Entitlements** tab, click **Add Entitlement** and define the entitlement properties:

   * Enter a **Display name** for the entitlement. In this example flow, enter **Permission**.
   * Enter a **Variable name** for the entitlement. In this example flow, enter **permission**. Use this attribute in your EL expression when you [configure an entitlement claim for the app](#configure-an-entitlement-claim-for-the-app).
   * Set the **Entitlement Type (Data Type)**. The entitlement can either be a static string (**String**) or a string array (**String Array**). In this example flow, select **String Array**.
   * Optional. Enter a **Description** of the entitlement.

1. Click **Next**.
1. Define entitlement attributes. You can define one or more values that can then be assigned to the user. Each value must be unique:

   * Enter a **Display name** for the entitlement value. In this example flow, enter **Read**.
   * Enter a **Variable name** for the entitlement value. In this example flow, enter **Read**. This property is the name that appears in the <SAML attribute statement or token>.
   * Optional. Enter a **Description** of the entitlement value.

1. Click **+ Add value** and repeat the previous step for the **Write** and **Delete** attribute values for this example flow.
1. Click **Save entitlement**.

## Assign entitlements to a user

> **Note:** If you created an app from scratch, assign a user to the app for testing.

1. On the **Assignments** tab, select **View access details** from the right-hand menu for your test user.
1. Click **Edit access**, and then click **Customize entitlements** to customize the entitlements for the user. The entitlement that you created in the previous section appears.
1. Select the permissions that you want to assign to the user. In this example flow, select **Read**, and then **Write**.
1. Click **Save**, and then **Save** again.

## Configure an entitlement claim for the app

1. Select the **Sign On** tab, scroll down to the <**SAML Attributes** or **Claims**> section, and click **Edit**.

   > **Note:** If you have the Identity Threat Protection (ITP) feature enabled for your org, select the **Authentication** tab.

1. Select **Add expression** to configure the `appuser` entitlement claim for the app.
1. In the dialog, give the entitlement claim a name. In this example flow, enter **PermissionAssignment**.
1. In the **Expression** field, enter `appuser.entitlements.permission` as the EL expression. The `permission` attribute is the variable name that you assigned when you [defined entitlements for the app](#define-entitlements-for-the-app).
1. Click **Save**.

## Test the flow

Access the <SAML or OIDCS> app from the End-User Dashboard and sign in as your test user. Use your browser's Dev Tools window or some other tool to extract the <SAML response or ID token>. Then, use a tool such as the [SAML Tokens tool](https://samltool.io/) to view the attribute statement with the included permissions that you assigned to the test user.

SAML example/OIDC example

```bash
        <saml2:AttributeStatement xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
            <saml2:Attribute Name="PermissionAssignment" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">
                    read
                </saml2:AttributeValue>
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">
                    write
                </saml2:AttributeValue>
            </saml2:Attribute>
        </saml2:AttributeStatement>
```
