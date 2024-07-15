---
title: Understanding SCIM
meta:
  - name: description
    content: System for Cross-domain Identity Management. Understand the the value of provisioning accounts with SCIM and how to set up SCIM in Okta.
---

# SCIM

This topic covers the concepts and use cases for SCIM and Okta.

When you’re ready to create a SCIM integration, see [Build a SCIM provisioning integration](/docs/guides/scim-provisioning-integration-overview) and [how to implement the SCIM protocol with Okta](/docs/reference/scim/).

## What is SCIM for?

SCIM, or the [System for Cross-domain Identity Management](https://scim.cloud) specification, is an open standard designed to manage user identity information. SCIM provides a defined schema for representing users and groups, and a RESTful API to run CRUD operations on those user and group resources.

The goal of SCIM is to securely automate the exchange of user identity data between your company's cloud apps and any Service Providers (SP).

Managing user lifecycles in your org is a fundamental business problem. Hiring employees is just the first step. You also need to provision apps needed for their job and enforce corporate security policies. Then you need to update user accounts as they advance through your company. At the end of their employment, you need to ensure that all access is quickly and thoroughly revoked across all apps. Handling all of this can be time-consuming and error-prone if done manually.

<div class="three-quarter">

![SCIM user lifecycle diagram](/img/oin/scim_lifecycle.png)

</div>

As your company grows, the number of user accounts and provisioned software apps increases. Requests to add and remove users, reset passwords, change permissions, and add new types of accounts all take up valuable IT department time.

With the SCIM protocol, user data is stored in a consistent way and can be shared with different apps. Since data is transferred automatically, complex exchanges are simplified and the risk of error is reduced.

Adopting SCIM for domain management improves overall security for your company. Employees no longer need to sign in to each of their accounts. As teams develop new workflows and adopt new apps, your company can ensure security policy compliance across all accounts.

## How does Okta help?

[Okta Lifecycle Management](https://help.okta.com/okta_help.htm?id=ext_Provisioning_Deprovisioning_Overview) is a platform solution to provision and manage user accounts in cloud-based apps. Okta serves as a universal directory for identity-related information, giving the following benefits:

* IT departments can manage the user provisioning lifecycle through a single system.
* New employees are automatically provisioned with a user account for their apps.
* You can create employee accounts either directly from Okta accounts or shared from external systems like HR apps or Active Directory.
* Any profile updates - like department changes - populate automatically.
* Inactive employees are automatically deactivated from their apps.

> **Note**: Okta event hooks provide a mechanism for outbound calls to notify your systems of events occurring in your Okta org. The event hooks can, for example, provision external app access after a user account is created in Okta. Event hooks are a flexible and lightweight alternative to SCIM. See [Event hook implementation](/docs/guides/event-hook-implementation/nodejs/main/).

## How does SCIM work?

Provisioning consists of a set of actions between a Service Provider - like Okta - and the cloud-based integration (the SCIM client). Using REST-style architecture and JSON objects, the SCIM protocol communicates data about users or groups. As an app developer, you define the use cases needed and then build the corresponding SCIM actions into your integration.

By implementing support for the SCIM standard, an integration in the Okta Integration Network is notified when a user is created in Okta. An integration is also notified when the user is updated or removed from their app in Okta.

The provisioning actions performed by an integration are described using the database operation acronym "CRUD": Create, Read, Update, and Delete. The four CRUD operations are the building blocks that combine to solve your end-to-end use cases:

### Create

This SCIM operation creates users in your downstream app based on the values in the Okta user profile and group assignments.

### Read

Information about user and group resources can be queried from your app to match them against existing Okta resources. If the resources don't exist, they can be imported into Okta.

### Update

If a resource in your app needs to be updated based on data changed in Okta, this operation updates existing user or group attributes. Alternatively, if your app functions as the source of truth for specific attributes of a user identity, this action updates the Okta user profile.

User attributes can be mapped from your source into Okta. Conversely, an attribute can be mapped from Okta to a target attribute in your app.

### Delete (Deprovision)

Deleting or deprovisioning user profiles in SCIM operations depends on whether Okta or your SCIM app is the source of truth for user profile information.

* If an admin deprovisions a user's profile inside Okta, the user resource inside your SCIM app is updated with `active=false`. If that user needs to be reprovisioned later (for example, a return from parental leave or if a contractor is rehired), then you can switch back the `active` attribute to `true`.

   Deactivated user accounts lose access to their provisioned Okta integrations. Your app can run different actions after deprovisioning a user, such as changing user access permissions or removing a license.

* If an admin deletes a deactivated user profile inside Okta, the user resource inside your SCIM app isn't changed. The initial deactivation step already set `active=false`. Okta doesn't send a request to delete the user resource inside the customer's SCIM app.

* SCIM app sources the user: A user profile is deleted from inside your SCIM app. The user's profile is deleted inside Okta when an import from your SCIM app is run.

* SCIM app sources the Okta integration: A user profile is marked with `active=false` inside your SCIM app. The user's profile is marked as deactivated in Okta when an import from your SCIM app runs.

### Sync passwords

Outside of the base CRUD operations, Okta supports other provisioning features like syncing passwords.

Password synchronization helps you coordinate Okta-sourced users to ensure that a user’s Active Directory (AD) password and their Okta password always match. With password synchronization, your users have a single password to access apps and devices.

This option sets the user's password for your integration to match the Okta password or to be assigned a randomly generated password. For more information about this functionality and how to configure it in the Okta product, see [Synchronize passwords from Okta to Active Directory](https://help.okta.com/okta_help.htm?id=ext_Security_Using_Sync_Password).

### Map profile attributes

Another provisioning feature supported by Okta is the mapping of user profile attributes.

After enabling provisioning, you can set an app as the "source" from which user profiles are imported or the "target" to which attributes are sent.

Okta uses a Profile Editor to map specific user attributes from the source app to the Okta user profile.

## Lifecycle management using profile sourcing

Profile sourcing defines the flow and maintenance of user attributes. When a profile is sourced from outside of Okta (example: an HR app or LDAP), then the Okta user's attributes and lifecycle state are derived exclusively from that resource. The SCIM protocol handles the secure exchange of user identity data between the profile source and Okta. In this scenario, the profile isn't editable in Okta by the user or an Okta admin.

For example, if the lifecycle state of the user is changed to "Disabled" in Active Directory, then on the next SCIM read operation, the linked Okta user profile is switched and given the corresponding lifecycle state of `active=false`.

For more information about profile sourcing and how to configure it in the Admin Console, see:

* [Profile sourcing](https://help.okta.com/okta_help.htm?id=ext_Directory_Profile_Masters)
* [Provisioning and Deprovisioning](https://help.okta.com/okta_help.htm?id=ext_Provisioning_Deprovisioning_Overview)

## Provisioning use cases

Provisioning actions can be combined to solve for end-to-end use cases. Okta supports these common Provisioning use cases:

* Provision downstream apps automatically when a new employee joins the company.
* Update your downstream apps automatically when changes are made to employee profile attributes.
* Remove an employee's access to downstream apps automatically on termination or leave.
* Link existing downstream apps users with Okta users using a one-time import.

## Publish SCIM-based provisioning integrations

For your customers to use your SCIM provisioning integration with Okta, you need to publish it through the [Okta Integration Network](https://www.okta.com/integrations/).

After you have built and tested your SCIM app, read through our [Publish an OIN integration](/docs/guides/submit-app-overview/) guide.

## Related resources

For more information about SCIM and how to use the Admin Console to set up provisioning in your integration, see:

* [Provision cloud applications](https://help.okta.com/okta_help.htm?id=ext_prov_okta_lcm_user_provision)
* [SCIM Technical FAQs](/docs/concepts/scim/faqs/)
* [Build a SCIM provisioning integration](/docs/guides/scim-provisioning-integration-overview)
* [Add SCIM provisioning to app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-scim)
* [Provisioning Concepts](https://support.okta.com/help/s/article/okta-provisioning?language=en_US)
* [Provision on-premises applications](https://help.okta.com/okta_help.htm?id=ext_OPP_configure)
* IETF [Overview and Specification of the SCIM Protocol](https://scim.cloud)

For setting up Active Directory or LDAP for profile sourcing:

* [Manage your Active Directory integration](https://help.okta.com/okta_help.htm?id=ext_okta_active_directory_agent)
* [Manage your LDAP provisioning integration](https://help.okta.com/okta_help.htm?id=ext_LDAP_Provisioning)
