---
title: Understanding SCIM
layout: docs_page
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: System for Cross-domain Identity Management. Understand the the value of provisioning accounts with SCIM and how to set up SCIM in Okta.
---

This topic covers the concepts and use-cases for SCIM and Okta.

If you are ready to start creating a SCIM app, see our [Guide to Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/), and our technical references on how the [SCIM protocol is implemented with Okta](https://developer.okta.com/docs/reference/scim/).

## What is SCIM for?

SCIM, or the [System for Cross-domain Identity Management](http://www.simplecloud.info/) specification, is an open standard designed to manage user identity information. SCIM provides a defined schema for representing users and groups, and a RESTful API to run CRUD operations on those user and group resources.

The goal of SCIM is to securely automate the exchange of user identity data between your company's cloud applications and any service providers, such as enterprise SaaS applications.

Managing user lifecycle in your organization is a fundamental business problem. Hiring new employees is just the first step - you also need to provision the apps they need for their job, enforce corporate security policies, and update their user accounts as they advance through their time with your company. At the end of their employment period, you need to make sure that all access is quickly and thoroughly revoked across all applications. Handling all of this can be time consuming and error prone if done manually.

![SCIM Lifecycle](/img/oin/scim_lifecycle.png "User lifecycle diagram: 1 - new employee 2 - provision apps 3 - enforce security 4 - update user information 5 - offboard")

As companies grow, the number of user accounts increases; every software application requires a new account for each user and users are have to remember a password for each of their user accounts. Requests to add and remove users, reset passwords, change permissions, and add new types of accounts all take up valuable IT department time.

With the SCIM protocol, user data is stored in a consistent way and can be shared with different apps. Since data is transferred automatically, complex exchanges are simplified and the risk of error is reduced.

The security risks that companies face are reduced by adopting SCIM. Employees no longer need to sign on to each of their accounts, and so as teams develop new workflows and adopt new apps, your company can ensure security policy compliance across all accounts.

## How does Okta help?

[Okta Lifecycle Management](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_prov_con_okta_prov) is a platform solution to provision and manage user accounts in cloud-based applications. Okta serves as a universal directory for identity-related information, giving the following benefits:

* IT departments can manage the user provisioning lifecycle through a single system.
* New employees are automatically provisioned with a user account for their apps.
* Employee accounts can be created either directly from Okta accounts, or shared from external systems like HR applications or Active Directory.
* Any profile updates - like department changes - populate automatically.
* Inactive employees are automatically deactivated from their apps.

## How does SCIM work?

Provisioning consists of a set of actions between a service provider - like Okta - and the cloud-based integration (the SCIM client). Using REST style architecture and JSON objects, the SCIM protocol communicates data about users or groups.  As an app developer, you define the use cases needed and then build the corresponding SCIM actions into your integration.

By implementing support for the SCIM standard, an application in the Okta Integration Network can be notified when a user is created, updated, or removed from their application in Okta.

The provisioning actions performed by an integration are described using the database operation acronym "CRUD": Create, Read, Update, and Delete:

### Create

This SCIM operation creates new users in your downstream application based on the values in the Okta user profile and group assignments.

### Read

Information about user and group resources can be queried from your application to match them against existing Okta resources, or to import them into Okta if the resources don't already exist.

### Update

If a resource in your application needs to be updated based on data changed in Okta, this operation updates existing user or group attributes. Alternatively, if your application functions as the source of truth for specific attributes of a user identity, this action updates the Okta user profile.

User attributes can be mapped from your source into Okta and conversely, an attribute can be mapped from Okta to a target attribute in your app.

### Delete (Deprovision)

For audit purposes, Okta users are never deleted; instead, they are deprovisioned by setting an `active` attribute to "false". Then, if an existing user needs to be re-provisioned at a later date (for example, returning from parental leave or if a contractor is re-hired), then the attribute can be switched back to "true".

Deprovisioning a user removes their access to the downstream application. Your application can specify different results for deprovisioning a user, such as changing user access permissions, removing a user license, or completely disabling the user account.

These four CRUD operations are the building blocks that combine to solve your end-to-end use cases.

### Syncing Passwords

Outside of the base CRUD operations, Okta supports additional provisioning features like syncing passwords.

Password synchronization helps you coordinate Okta-mastered users to ensure a user’s Active Directory (AD) password and their Okta password always match. With password synchronization, your users have a single password to access applications and devices.

This option sets the user's password for your integration either to match the Okta password, or to be assigned a randomly generated password. For more information about this functionality and how to configure it in the Okta product, see [Synchronize passwords from Okta to Active Directory](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Using_Sync_Password).

### Profile Attribute Mappings

Another provisioning feature supported by Okta is mapping of user profile attributes.

After provisioning is enabled, you can set a profile master to be the "source" app from which users are imported or the target app to which attributes are sent.

Okta uses a Profile Editor to map user attributes from the source of truth to the Okta user profile.

## Lifecycle Management Using Profile Mastering

Profile mastering defines the flow and maintenance of user attributes. When a profile is mastered using a source outside of Okta (for example, an HR application, Active Directory, or LDAP), then the Okta user's attributes and lifecycle state are derived exclusively from that resource. The SCIM protocol is used to handle the secure exchange of user identity data between the profile master and Okta. In this scenario, the profile isn't editable in Okta by the user or an Okta admin.

For example, if the lifecycle state of the user is changed to "Disabled" in Active Directory, then on the next SCIM read operation, the linked Okta user profile is switched and given the corresponding lifecycle state of `active=false`.

For more information about profile mastering and how to configure it in the Okta Admin Console, see:

* [Profile mastering](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Profile_Masters)
* [Provisioning and Deprovisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Provisioning_Deprovisioning_Overview)

## Provisioning Use Cases

Provisioning actions can be combined to solve for end-to-end use cases. Okta supports these common Provisioning use cases:

* Provision downstream apps automatically when a new employee joins the company
* Update your downstream app automatically when employee profile attributes change
* Remove an employee's access to downstream apps automatically on termination or leave
* Link existing downstream app users with Okta users using a one-time import

## Publishing SCIM-based Provisioning Integrations

For your customers to use your SCIM provisioning integration with Okta, you need to publish it through the [Okta Integration Network](https://www.okta.com/integrations/).

After you have built and tested your SCIM application, read through our guide on [Publishing an app integration with the OIN](/docs/guides/submit-app/overview/).

## Additional background

If you want to read more about how to use the Okta Admin Console for provisioning in your app integration or have additional questions about SCIM, visit the following links:

* [Okta Lifecycle Management User Provisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_prov_okta_lcm_user_provision)
* [SCIM Technical FAQs](/docs/concepts/scim/faqs/)
* [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/overview/)
* The "SCIM Applications" section of [Using the App Integration Wizard](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_App_Integration_Wizard.htm)
* [Provisioning Concepts](https://support.okta.com/help/s/article/Provisioning-Concepts-and-Methods)
* [Configuring On-Premises Provisioning](https://support.okta.com/help/s/article/29448976-Configuring-On-Premises-Provisioning)
* IETF [Overview and Specification of the SCIM Protocol](http://www.simplecloud.info/)

For setting up Active Directory or LDAP for profile mastering:

* [Install and configure the Okta Active Directory agent](https://help.okta.com/en/prod/Content/Topics/Directory/ad-agent-install.htm)
* [Manage LDAP provisioning, import, and integration settings](https://help.okta.com/en/prod/Content/Topics/Directory/ldap-agent-configure.htm)
