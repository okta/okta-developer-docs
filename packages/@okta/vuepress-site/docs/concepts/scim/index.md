---
title: Understanding SCIM
meta:
  - name: description
    content: System for Cross-domain Identity Management. Understand the the value of provisioning accounts with SCIM and how to set up SCIM in Okta.
---

# SCIM

This topic covers the concepts and use cases for SCIM and Okta.

If you are ready to start creating a SCIM integration, see our [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/) guide and our technical references on how the [SCIM protocol is implemented with Okta](/docs/reference/scim/).

## What is SCIM for?

SCIM, or the [System for Cross-domain Identity Management](http://www.simplecloud.info/) specification, is an open standard designed to manage user identity information. SCIM provides a defined schema for representing users and groups, and a RESTful API to run CRUD operations on those user and group resources.

The goal of SCIM is to securely automate the exchange of user identity data between your company's cloud applications and any service providers, such as enterprise SaaS applications.

Managing user lifecycles in your organization is a fundamental business problem. Hiring new employees is just the first step - you also need to provision the applications that they need for their job, enforce the corporate security policies, and update their user accounts as they advance through their time with your company. At the end of their employment period, you need to make sure that all access is quickly and thoroughly revoked across all applications. Handling all of this can be a time-consuming and error-prone process if done manually.

![SCIM Lifecycle](/img/oin/scim_lifecycle.png "User lifecycle diagram: 1 - new employee 2 - provision applications 3 - enforce security 4 - update user information 5 - off-board")

As your company grows, the number of user accounts and provisioned software applications increases exponentially. Requests to add and remove users, reset passwords, change permissions, and add new types of accounts all take up valuable IT department time.

With the SCIM protocol, user data is stored in a consistent way and can be shared with different applications. Since data is transferred automatically, complex exchanges are simplified and the risk of error is reduced.

Adopting SCIM for domain management improves overall security for your company. Employees no longer need to sign in to each of their accounts. As teams develop new workflows and adopt new applications, your company can ensure security policy compliance across all accounts.

## How does Okta help?

[Okta Lifecycle Management](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_prov_con_okta_prov) is a platform solution to provision and manage user accounts in cloud-based applications. Okta serves as a universal directory for identity-related information, giving the following benefits:

* IT departments can manage the user provisioning lifecycle through a single system.
* New employees are automatically provisioned with a user account for their applications.
* Employee accounts can be created either directly from Okta accounts, or shared from external systems like HR applications or Active Directory.
* Any profile updates - like department changes - populate automatically.
* Inactive employees are automatically deactivated from their applications.

## How does SCIM work?

Provisioning consists of a set of actions between a service provider - like Okta - and the cloud-based integration (the SCIM client). Using REST style architecture and JSON objects, the SCIM protocol communicates data about users or groups.  As an application developer, you define the use cases needed and then build the corresponding SCIM actions into your integration.

By implementing support for the SCIM standard, an integration in the Okta Integration Network can be notified when a user is created, updated, or removed from their application in Okta.

The provisioning actions performed by an integration are described using the database operation acronym "CRUD": Create, Read, Update, and Delete. The four CRUD operations are the building blocks that combine to solve your end-to-end use cases:

### Create

This SCIM operation creates new users in your downstream application based on the values in the Okta user profile and group assignments.

### Read

Information about user and group resources can be queried from your application to match them against existing Okta resources, or to import them into Okta if the resources don't already exist.

### Update

If a resource in your application needs to be updated based on data changed in Okta, this operation updates existing user or group attributes. Alternatively, if your application functions as the source of truth for specific attributes of a user identity, this action updates the Okta user profile.

User attributes can be mapped from your source into Okta and conversely, an attribute can be mapped from Okta to a target attribute in your application.

### Delete (Deprovision)

The deletion or deprovisioning of end-user profiles in SCIM operations depends on whether Okta or your SCIM application functions as the source of truth for user profile information.

* If an admin deprovisions an end-user's profile inside Okta, the user resource inside your SCIM application is updated with `active=false`. If that user needs to be reprovisioned at a later date (for example, a return from parental leave or if a contractor is rehired), then the `active` attribute can be switched back to `true`.

   Deactivated end-user accounts lose access to their provisioned Okta integrations. Your application can run different actions after deprovisioning a user, such as changing user access permissions, removing a license, or completely disabling the user account.
* If an admin deletes a deactivated end-user profile inside Okta, the user resource inside your SCIM application isn't changed. The initial deactivation step already set `active=false`. Okta doesn't send a request to delete the user resource inside the customer's SCIM application.
* Conversely, if an end-user profile is marked with `active=false` inside your SCIM application, and the Okta integration is backed by that SCIM application, then when an import from your SCIM application is run, the user's profile is marked as deactivated inside Okta.
* Similarly, if an end-user profile is deleted from inside your SCIM application, and the end user is backed by that SCIM application, then when an import from your SCIM application is run, the user's profile is deleted inside Okta.

### Sync passwords

Outside of the base CRUD operations, Okta supports additional provisioning features like syncing passwords.

Password synchronization helps you coordinate Okta-backed users to ensure that a user’s Active Directory (AD) password and their Okta password always match. With password synchronization, your users have a single password to access applications and devices.

This option sets the user's password for your integration to match the Okta password or to be assigned a randomly generated password. For more information about this functionality and how to configure it in the Okta product, see [Synchronize passwords from Okta to Active Directory](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Using_Sync_Password).

### Map profile attributes

Another provisioning feature supported by Okta is the mapping of user profile attributes.

After provisioning is enabled, you can set an application to be the "source" from which users profiles are imported or the "target" to which attributes are sent.

Okta uses a Profile Editor to map specific user attributes from the source application to the Okta user profile.

## Lifecycle management using profile mastering

Profile mastering defines the flow and maintenance of user attributes. When a profile is backed using a source outside of Okta (for example, an HR application, Active Directory, or LDAP), then the Okta user's attributes and lifecycle state are derived exclusively from that resource. The SCIM protocol is used to handle the secure exchange of user identity data between the profile master and Okta. In this scenario, the profile isn't editable in Okta by the user or an Okta admin.

For example, if the lifecycle state of the user is changed to "Disabled" in Active Directory, then on the next SCIM read operation, the linked Okta user profile is switched and given the corresponding lifecycle state of `active=false`.

For more information about profile mastering and how to configure it in the Okta Admin Console, see:

* [Profile mastering](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Profile_Masters)
* [Provisioning and Deprovisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Provisioning_Deprovisioning_Overview)

## Provisioning use cases

Provisioning actions can be combined to solve for end-to-end use cases. Okta supports these common Provisioning use cases:

* Provision downstream applications automatically when a new employee joins the company.
* Update your downstream applications automatically when employee profile attributes change.
* Remove an employee's access to downstream applications automatically on termination or leave.
* Link existing downstream application users with Okta users using a one-time import.

## Publish SCIM-based provisioning integrations

For your customers to use your SCIM provisioning integration with Okta, you need to publish it through the [Okta Integration Network](https://www.okta.com/integrations/).

After you have built and tested your SCIM application, read through our [Submit an app integration](/docs/guides/submit-app/overview/) guide.

## Additional background

If you want to read more about how to use the Okta Admin Console to set up provisioning in your integration or have additional questions about SCIM, visit the following links:

* [Okta Lifecycle Management User Provisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_prov_okta_lcm_user_provision)
* [SCIM Technical FAQs](/docs/concepts/scim/faqs/)
* [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/overview/)
* [Create a SCIM integration using AIW](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-scim)
* [Provisioning Concepts](https://support.okta.com/help/s/article/Provisioning-Concepts-and-Methods)
* [Configuring On-Premises Provisioning](https://support.okta.com/help/s/article/29448976-Configuring-On-Premises-Provisioning)
* IETF [Overview and Specification of the SCIM Protocol](http://www.simplecloud.info/)

For setting up Active Directory or LDAP for profile mastering:

* [Manage your Active Directory integration](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_okta_active_directory_agent)
* [Manage your LDAP provisioning integration](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_LDAP_Provisioning)
