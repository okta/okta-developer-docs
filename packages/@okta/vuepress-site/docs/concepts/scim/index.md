---
title: Understanding SCIM
layout: docs_page
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: System for Cross-domain Identity Management. Understand the the value of provisioning accounts with SCIM and how to set them up in Okta.
---

## SCIM: Provisioning with Okta Lifecycle Management

Developers at software vendors (ISVs), Okta customers, and IT system-integrators (SI) want to facilitate fast, enterprise-wide deployment of their app by integrating with Okta for user provisioning primarily via the SCIM standard.

This article describes:

* The provisioning actions and use cases that your integration should consider supporting.
* The technical options for how to build the integration (focusing on SCIM).
* The process for building, submitting for Okta Review, and publishing in the OIN (if you want the app available for all Okta customers).

## Understanding Provisioning Use Cases

### The Value of Provisioning

With the proliferation of cloud apps, today’s IT organizations are faced with the prospect of managing user accounts in an ever-expanding number of administrator consoles for each app. This is not a problem if an enterprise has one or two cloud apps, but as the number grows, the situation quickly becomes unmanageable. Cloud app vendors hoping to sell into enterprises need to have an answer to this concern.

Thousands of Okta customers have chosen our Lifecycle Management product as the platform solution to address this challenge of managing the lifecycle of user accounts in their cloud apps, and a key feature of this product is integrations for automated provisioning to those apps. Lifecycle Management (Provisioning) automates many of the traditionally manual tasks required to on-board and off-board employees. New employees are automatically provisioned with user accounts in their apps, profile updates like department changes populate automatically, and inactive employees are automatically deactivated from their apps. By making these actions less time-consuming and error-prone, companies can cut costs, allow new employees to be immediately productive, and reduce the threat of data leakage.

### Provisioning Actions

Provisioning consists of a set of actions between Okta and the cloud app. These actions are building blocks that combine to solve end-to-end use cases. As the developer, you'll need to define the use cases that your target customer wants and the corresponding actions to build into your integration.

The set of actions that an integration can do under the Provisioning umbrella are easily described with the acronym CRUD: the common database operations of Create, Read, Update, and Delete. CRUD actions relate to Provisioning in the following ways:

#### Create Users

Create new users in the downstream application based on values derived from the Okta user profile and Okta group assignment.

#### Read (Import) Users and Groups

Import users & groups from the downstream application in order to match them to existing Okta users, or to create new Okta users from the imported application.

#### Update Users

For an application user that is affiliated with an Okta user, update the downstream user's attributes when the Okta user is updated. Or, update the Okta user attributes if the application functions as the [master](#profile-mastering-users) for the full Okta user profile or specific attributes.

#### Deprovision (Deactivate) Users

Deprovisioning the application user removes access to the downstream application. This can take many forms, such as user disabled, user access permissions changed, or user license pulled. Each application may choose different methods for deactivating a user's access.

For audit purposes, Okta users are never deleted; they are deactivated instead. Because of this, Okta doesn't make delete requests to the user APIs in downstream applications.

#### Sync Password

Okta sets the user's password to either match the Okta password or to be a randomly generated password. Learn more about the overall use case in [Using Sync Password: Active Directory Environments](https://help.okta.com/en/prod/Content/Topics/Security/Security_Using_Sync_Password.htm).

#### Profile Mastering Users

Mastering is a more sophisticated version of read (import) Users. Mastering defines the flow and maintenance of user-object attributes and their lifecycle state. When a profile is mastered from a given resource (application or directory), the Okta user profile's attributes and lifecycle state are derived exclusively from that resource. In other words, an Okta user mastered by Active Directory (or HR system) has an Okta profile.

However, the profile isn't editable in Okta by the user or Okta admin, and derives its information exclusively from Active Directory. If the lifecycle state of the user in Active Directory moves to Disabled, the linked Okta user also switches to the corresponding lifecycle state of Deactivated on the next the read (import).

### Provisioning Use Cases

Provisioning actions can be combined to solve for end-to-end use cases.

#### Directory-as-Master (Downstream Provisioning)

<!-- Images for v2: https://oktawiki.atlassian.net/wiki/pages/viewpage.action?pageId=181895852 -->

In many enterprises, Active Directory (or LDAP) is the system of record for employee identities.
Okta has developed a powerful, lightweight agent to sync with Active Directory to populate employee and group information.
Within Okta, IT admins can leverage features such as [Universal Directory](https://help.okta.com/en/prod/Content/Topics/Directory/About_Universal_Directory.htm) and [group membership rules](https://help.okta.com/en/prod/Content/Topics/Directory/About_Universal_Directory.htm) to map that information when provisioning accounts and permissions in downstream apps.

Subsequently, any updates to an employee's profile, such as a change in department, in either Active Directory or Okta flow into the downstream app. Similarly, removing or deactivating an employee from Active Directory triggers deactivation in the downstream app as well.

Okta supports these common Provisioning use cases:

* Provision downstream apps automatically when new employee joins the company
* Update downstream app automatically when employee profile attributes change
* Remove employee access to downstream app automatically on termination or leave
* Link existing downstream app users with Okta users using one-time app import

#### App-as-Master

While most apps fit the category of a downstream app in the directory-as-master use case, some apps can be the master. This is the App-as-Master use case.

The app-as-master use case typically applies to apps that can be used as the system of record for all employee profile information. An HR app like Workday or Successfactors Employee Central is the most common example. In this scenario, the HR app, not Active Directory, feeds employee profile details downstream into directories like AD and Okta, and apps like Box.

>**Note:** Integrations for the "App-as-Master" use case are significantly more complex than the Directory-as-Master use case and take more time to build and support. This is because these integrations sync a larger number of attributes and lifecycle states, and more directly impact the Okta user profile and downstream apps.

#### Advanced App-as-Master Use Cases

There are several advanced App-as-Master use cases that aren't currently supported by the SCIM-Based Provisioning option, but may be added in the future. Until then, consider out-of-band processes that work around these use cases.

* Attribute-level mastering: The app wants to be the master for some employee attributes like phone number, while letting Okta or another app master other attributes. We call this attribute-level mastering.

* Pre-hire interval: In an HR-as-Master use case, there is sometimes a desire to import the new employee into Okta from the HR app a few days prior to the hire/start date. This gives IT time to set up the employee's apps in advance. A pre-hire interval configuration would specify how many days before the employee's hire date Okta should import the employee.

* Real-time sync/termination: In an HR-as-Master use case, a change in employee status within the HR system may need to be immediately reflected in Okta. Involuntary terminations is one scenario where an employee's access to sensitive apps and content via Okta needs to be cut off within minutes.

* Incremental/delta import: Importing a large number of user profiles from an app into Okta can take minutes, even hours. This can become a major performance and timing issue if frequent updates are needed. Currently, the SCIM-Based Provisioning option doesn't support the ability to import only those user profiles that have changed since the last import. In the future, we may support this via filtering on `meta.lastModified`. ([More information](#filtering-on-metalastmodified))

## SCIM-Based Provisioning Integration

### Overview

By implementing support for the SCIM standard, an application in the Okta Integration Network can be notified when a user is created, updated, or removed from their application in Okta.

If you haven't heard of SCIM before, here is a good summary from the [Wikipedia article on SCIM](https://en.wikipedia.org/wiki/System_for_Cross-domain_Identity_Management):

"System for Cross-domain Identity Management (SCIM) is an open standard for automating the exchange of user identity information between identity domains, or IT systems."

### Understanding User Provisioning in Okta

Okta is a universal directory that stores identity-related information.  Users can be created in Okta directly
as local users or imported from external systems like Active Directory or a [Human Resource Management Software](https://en.wikipedia.org/wiki/Category:Human_resource_management_software) system.

An Okta user schema contains many different user attributes, but always contains a user name, first name, last name, and email address. This schema can be extended.

Okta user attributes can be mapped from a source into Okta and can be mapped from Okta to a target.

Below are the main operations in a SCIM user provisioning lifecycle:

1. Create a user account.
2. Read a list of accounts, with support for searching for a preexisting account.
3. Update an account (user profile changes, entitlement changes, etc).
4. Deactivate an account.

In Okta, an application instance is a connector that provides Single Sign-On and provisioning functionality with the target application.

## Publishing Your SCIM-Based Provisioning Integration

In order to allow customers to use your SCIM provisioning integration with Okta, you'll need to get your app published in [the Okta Integration Network](https://www.okta.com/resources/find-your-apps/).

**Note:** The OIN is for making an integration publicly discoverable and accessible to all Okta customers. However, you can also just use the integration privately within a few named orgs, called the Private App Option. This could be the case if you are a system integrator, customer, or Okta PS integrating to a custom app. If this is the case, you will be able to indicate in that you don't want to publish in OIN. Okta will create the submitted integration per usual and assign it to Orgs that you specify as a private app. Note that you cannot use the SCIM template app used for prototyping, as it has limitations that prevent it from being used in production.
