---
title: Federated claims with entitlements
excerpt: Learn how to implement federated claims with entitlements for an app
layout: Guides
---

Intro blurb here

---

#### Learning outcomes

* Understand the purpose of federated claims with entitlements
* Understand how to configure federated claims for a SAML and an OpenID Connect (OIDC) app.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* The Identity Governance feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enables this feature.
* The Federated Claim Generation feature enabled for your org. To enable this feature, go to **Settings** > **Features**, locate the Federated Claim Generation feature and enable.
* An existing <SAML> app
* A test user within that app

---

## Overview

Currently, the way that Okta handles the persistence and generation of claims for tokens varies, depending on the protocol used. Only user attributes and group memberships are supported as claim types. 

The experience of configuring claims for both SAML and OIDC apps should be consistent. If an expression works for OIDC, it should work exactly the same way for a SAML app. The only difference should be the output format--tailored to the requirements of SAML rather than OIDC.

A unified resolution for these inconsistencies is adding support for a new type of claim that can be consumed by all applications--federated claims generation. These claims take the form of the name of the claim and an expression (ELV3) to reference the principal information. The contexts currently available for reference are user profile attributes and appuser entitlements.

An entitlement is a permission that allows users to take specific actions within a resource, such as a third-party app. Within the Identity Provider org (Okta), app entitlements help you manage different levels of permissions that users can perform within an app. They represent permissions that you have at the Service Provider.

### Entitlements

Entitlements are a way to represent permissions that you have in the service provider.

entitlements for the app within the IdP org is how you manage different levels of permissions that users can perform within an app.

An entitlement is a permission that allows users to take specific actions within a resource, such as an app.

There are three important properties associated with entitlements:

name: Display name for an entitlement property. this is a human-friendly name that is mutable and for display purposes only. 
externalValue: Value of an entitlement property (shown in the Admin Console as the Variable Name). Think of this property as the system/external representation of the entitlement, and that it’s immutable.
parent: Representation of a resource (implicit in the Admin Console, as you can only act upon one AppInstance at a time). This is the resource that the entitlement is bound to, in this use case an AppInstance.

> Note: See the [Entitlements API](https://preview.redoc.ly/okta-iga-internal/macya-fix-ts-gen/openapi/governance.api/tag/Entitlements/#tag/Entitlements/operation/listEntitlementValues) for more information on entitlements and the supported values.

An additional attribute included with an entitlement is the value(s) that it may contain. Values contained within an entitlement may be either a single string or an array of strings. These values have two important attributes:

name: Display name of the value
externalValue: External system representation

When a user is assigned to an app that has entitlements configured, they may also be granted one or more entitlements. Each entitlement that they have been granted may have one or more values, depending on the entitlement definition (single value, multiple value, and so on). Two things need to be communcated to the downstream Service Provider (SP).

What entitlement the principal (user) has. This may be entitlement.externalValue or some other value required by the agreement between the SP and the app.
What specific values the principal (user) has for that entitlement (entitlement.values[i].externalValue)

## Update the app to use Identity Governance

Go to **Applications** > **Applications** and select the <SAML> app that you want to define entitlements for.
On the **General** tab, scroll down to the **Identity Governance** section and click **Edit**.
Select **Enabled** to enable the Governance Engine, and then click **Save**. The **Governance** tab should appear within a few seconds. If it doesn't, referesh the page.

## Define entitlements for the app

While still in the app that you updated in the previous section, select the **Governance** tab.
On the **Entitlements** tab, click **Add Entitlement** and define the entitlement details:

    Enter a display name and variable name for the entitlement. The variable name is.....the display name is.... (Permission and permission)
    Set the **Entitlement Type (Data Type)**. The entitlement can either be a static string or a string array. In this example flow, select **String Array**.
    Optional. Enter a description of the entitlement.

Click **Next**.
Define entitlement values:

    Enter a display name, value, and optionally a description for the entitlement value. Each entitlement value that you enter must be unique.

Optional. Click + Add value and repeat the previous step.

Click Save entitlement.







Assign app to test user
Assign an entitlement to the test user
Assign the entitlement values to the user
Configure entitlement claim expression for the app
assigned claims show up in the attribute statements next time the user authenticates
