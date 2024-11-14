---
title: Federated claims with entitlements
excerpt: Learn how to implement federated claims with entitlements for an app
layout: Guides
---

This guide describes how to configure your app to pass entitlements in your tokens using federated claims.

---

#### Learning outcomes

* Understand the purpose of federated claims with entitlements.
* Understand how to configure federated claims for a SAML and an OpenID Connect (OIDC) app.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* The Identity Governance feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enable this feature.
* The Federated Claim Generation Layer feature enabled for your org. To enable this feature, go to **Settings** > **Features**, locate the Federated Claim Generation Layer feature, and enable.
* An existing SAML or OIDC app
* A test user assigned to the SAML or OIDC app

---

## Overview

Federated claims create a more consistent experience for the configuration of claims across protocols. They unify the inconsistencies in the persistence and generation of token claims by adding support for a claim type that all apps can consume.

A federated claim takes the form of a claim name and an [expression](/docs/reference/okta-expression-language-in-identity-engine/) that references principal (user) information. The claim is included in tokens produced by federation protocols. Okta supports SAML and OpenID Connect (OIDC) apps. Federated claims appear in either an OIDC ID token or a SAML assertion.

### Entitlements

An entitlement is a permission that allows users to take specific actions within a resource, such as a third-party app. Within the Identity Provider org (Okta), app entitlements help you manage different levels of permissions that users can perform within a third-party app.

When a user is assigned to an app that's configured to use entitlements, they may be granted one or more entitlements. Each entitlement that they're granted may have one or more values, depending on the entitlement definition (**String** or **String Array**).

There are two important properties associated with entitlements:

* `name`: The display name for an entitlement property. This is a human-friendly name that's for display purposes only.
* `externalValue`: The value of an entitlement property. Think of this property as the system/external representation of the entitlement. Use this value in your EL expression to communicate to the Service Provider (SP) app which entitlement property that the principal (user) has been granted.

Other attributes included with an entitlement are the value or values that it may contain. These are the specific values that the principal (user) has for each entitlement property. Values within an entitlement may be either a single string or an array of strings. These values have two important attributes, similar to the entitlement property itself:

* `name`: The display name of the entitlement value
* `externalValue`: External system representation of the value

### Expression Language and entitlements

The integration of entitlements into [Expression Language in Identity Engine](/docs/reference/okta-expression-language-in-identity-engine/) is on the `appuser` context. When you [configure an entitlement claim for an app](#configure-an-entitlement-claim-for-the-app), the expression states which entitlement the SP should evaluate for the principal and the app.

If the `externalValue` of an entitlement property is `permission`, then your EL expression would be `appuser.entitlement.permission`, because `entitlement.externalValue = permission`. At evaluation time, the results of the expression are the entitlement values that the principal has been granted for the entitlement referenced in the expression.

The following is an example JSON body of a POST request to `https://{yourOktaDomain}/api/v1/apps/{appID}/federated-claims` to create an entitlement:

```JSON
  {
     "name": "entitlement_claim_name",
     "expression": "appuser.entitlements.example_entitlement"
  }
```

## Configure entitlements

The following sections are an example flow for setting up and using entitlements for your SAML or OIDC app.

## Update your app to support entitlements

> **Note:** Identity Governance doesn't support **Federated Broker Mode** for OIDC apps.

1. Go to **Applications** > **Applications** and select the app that you want to define entitlements for.
1. On the **General** tab, scroll down to the **Identity Governance** section and click **Edit**.
1. Select **Enabled** to enable the Governance Engine, and then click **Save**. The **Governance** tab should appear within a few seconds. If it doesn't, refresh the page.

## Define entitlements for the app

> **Note:** Entitlements that you create here are what you use in the [EL expressions](/docs/reference/okta-expression-language-in-identity-engine/) that then insert the claims into the attribute statement or ID token.

1. While still in the app that you updated in the previous section, select the **Governance** tab.
1. On the **Entitlements** tab, click **Add Entitlement** and define the entitlement properties:

   * Enter a **Display name** for the entitlement. In this example flow, enter **Permission**.
   * Enter a **Variable name** for the entitlement. In this example flow, enter **permission**. Use this attribute in your EL expression when you [configure an entitlement claim for the app](#configure-an-entitlement-claim-for-the-app).

    > **Note:** You can't edit a variable name after you create it.

   * Set the **Entitlement Type (Data Type)**. The entitlement can either be a static string (**String**) or a string array (**String Array**). In this example flow, select **String Array**.
   * Optional. Enter a **Description** of the entitlement.

1. Click **Next**.
1. Define entitlement attributes. You can define one or more values that can then be assigned to the user. Each value must be unique:

   * Enter a **Display name** for the entitlement value. In this example flow, enter **Read**.
   * Enter a **Variable name** for the entitlement value. In this example flow, enter **Read**. This property is the name that appears in the attribute statement or ID token.
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

1. Select the **Sign On** tab, scroll down to the **SAML Attributes** (SAML) or **Claims** (OIDC) section, and click **Edit**.

   > **Note:** If you have the Identity Threat Protection (ITP) feature enabled for your org, select the **Authentication** tab.

1. Select **Add expression** to configure the `appuser` entitlement claim for the app.
1. In the dialog, give the entitlement claim a name. In this example flow, enter **PermissionAssignment**.
1. In the **Expression** field, enter `appuser.entitlements.permission` as the EL expression. The `permission` attribute is the variable name (`externalValue`) that you assigned when you [defined entitlements for the app](#define-entitlements-for-the-app).
1. Click **Save**.

## Test the configuration

To test your configuration, federate into your app to obtain the attribute statement or ID token.

### Obtain the SAML attribute statement

Access the SAML app from the End-User Dashboard and sign in as your test user. Use your browser's dev tools window or some other tool to extract the SAML response. Then, use a tool such as the [SAML Tokens tool](https://samltool.io/) to view the attribute statement. The statement should include the permissions that you assigned to the test user.

**Example**

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

### Obtain an ID token

Obtain an ID token by making the appropriate authorization requests, depending on the grants that you enabled for your app. Then, use a tool such as [jwt.io](https://jwt.io/) to decode the ID token and view the entitlement that you granted to the user.

**Example**

```JSON
{
  "sub": "00u47ijy7sRLaeSdC0g7",
  "ver": 1,
  "iss": "https://sharper.trexcloud.com",
  "aud": "0oa87r54wrFDQZM2z0g7",
  "iat": 1731539752,
  "exp": 1731543352,
  "jti": "ID.0483Z8YWB5FK6a-QQeP7JGyU1_OIGazHJ74_T2rx758",
  "amr": [
    "pwd"
  ],
  "idp": "00o47ijbqfgnq5gj00g7",
  "auth_time": 1731532528,
  "at_hash": "7bSvZiSZ_h28NNAnYEVORA",
  "PermissionAssignment": [
    "Read",
    "Write"
  ]
}
```
