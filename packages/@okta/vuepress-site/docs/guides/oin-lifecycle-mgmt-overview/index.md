---
title: Overview of lifecycle management in the OIN
meta:
  - name: description
    content: Learn how to build a lifecycle management app integration for the Okta Integration Network.
---

Lifecycle management refers to the process of provisioning and deprovisioning application access as a user moves through an organization. Onboarding, role change, transfer, and offboarding employee processes require provisioning user accounts in workforce applications and enforcing corporate security policies in a timely manner.

<div class="half">

![Lifecycle management](/img/oin/scim_lifecycle.png "User lifecycle diagram: 1 - new employee 2 - provision applications 3 - enforce security 4 - update user information 5 - off-board")

</div>

Okta provides two methods to integrate lifecycle management to your application. You can use the [System for Cross-domain Identity Management](/docs/reference/scim/) (SCIM) protocol to manage user accounts from Okta, or you can use the [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) to create automated identity processes in [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf).

After completing your Okta lifecycle management integration, publish it in the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) for your customers to benefit secure provisioning automation and meet compliance requirements. The OIN is a collection of pre-built app integrations covering numerous use cases. Join the community that customers trust to exchange secure authentication between users, devices, and applications.

## Why build a lifecycle management integration with Okta?

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Automate onboarding/offboarding and win larger customers** | After an organization reaches a certain size, manually provisioning accounts and getting users set up for success are time consuming and a huge bottleneck for your product’s adoption. Okta lifecycle management integration automates mundane tasks for your customers, which reduces the total cost of ownership and removes barriers to end-user activation. |
| **Secure access to your application** | Secure access to your application. Integrating with Okta ensures that end users can access your application as soon as they join an organization. Access is automatically removed as they leave the organization to prevent embarrassing data loss and dangling access. |
| **Meet compliance requirements** | Help your customers generate logs of access changes to comply with security policies and audits. |
| **Increase adoption of your product and sell more licenses** | Okta lifecycle management integration helps your customers use SaaS licenses and ultimately purchase more as the organization grows or use expands. |

## Choose how to implement your integration

| &nbsp; |  System for Cross-domain Identity Management (SCIM) |  Workflows Connector |
| ------ | :------------------- | :----------------------- |
| **Description** | [SCIM](https://scim.cloud) is the industry standard protocol for managing users and groups in cloud-based systems. It handles basic operations like create, read, update, delete, and search. | [Okta Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) is a no-code, if-this-then-that logic builder that Okta customers can use to automate custom or complex employee onboarding and offboarding flows in your application. Publishing a Workflows Connector with Okta allows your customers to deeply integrate your product as part of their lifecycle management flows. |
| **Technology** | <ul><li>JSON-based REST API server implementation</li> <li>Okta supports outbound SCIM requests to your SCIM API service</li> <li>See [SCIM Protocol](/docs/reference/scim/)</li></ul> | <ul><li>Low code development environment</li> <li>See [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf)</li></ul>|
| **Benefits** | <ul><li>Covers the most common lifecycle management needs related to onboarding/offboarding</li> <li>SCIM standard is throughout the industry</li> </ul> | <ul><li>Customers can create highly custom automation with your product without writing code</li> <li>Your product is tightly integrated with Okta</li> </ul>|
| **Get started** | [Build a SCIM Provisioning Integration](/docs/guides/scim-provisioning-integration-overview/) | [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) |

## Use case examples

### Example of a partner integration journey with Okta

Tom is an internal developer at OktReward, an HR employee rewards app. OktReward is already in the OIN with an SSO integration. OktReward wants to add a lifecycle management integration with Okta.

Tom performs the following tasks:

* Builds the OktReward-Okta lifecycle management integration by using the Workflows Connector Builder so that their customers don’t need to worry about manual employee profile processes, such as onboarding or offboarding

* Documents the required configuration steps for the customer admin

* Submits the integration and corresponding documentation for Okta to verify and review

After approval, the OktReward app is published as a lifecycle management integration (in addition to an SSO integration) in the OIN.

### Example of a customer admin integration journey with Okta

Acme is a company that is using Okta to manage identity for their workforce. Acme is considering adding OktReward into their HR suite. Since OktReward is in the OIN with SSO and lifecycle management use cases, Acme knows that they can integrate OktReward securely into their existing Okta-managed SSO and automated user lifecycle flow with minimal effort. In addition, Acme can access OktRewards audits for their compliance needs.

Alicia is an admin at Acme and performs the following tasks to integrate OktReward:

* Adds the OktReward app integration in the OIN catalog from the Okta Admin Console

* Follows the instructions provided by OktReward to configure the SSO and Okta Workflows integration

* Configures the authentication policy and the groups of Acme employees with various access levels to the OktReward app

* Imports user profiles from Okta to the OktReward app

* Tests signing in to the OktReward app with existing Okta credentials to verify the authentication flow

* Tests user onboarding, role changes, offboarding with HR to ensure that the user provisioning flow is working accurately

Acme's employees can sign in to the OktReward app with their existing Okta credentials and no additional OktReward app registration is required. When new employees join Acme, their HR staff adds user profiles in one Okta source. The user profiles are automatically provisioned to the apps with lifecycle management support, which now includes OktReward.

### Example of a workforce lifecycle journey with Okta

Key terms for lifecycle management in this workforce journey:

* **Joiner**: Starting employment at an organization
* **Mover**: Changing roles or teams within an organization
* **Leaver**: Ending employment at an organization

#### Joiner

1. Lucy accepts an offer to join the Customer Support team at Acme Corp. The Acme HR team sets her start date in the employee directory and adds her to the “Customer Support” Okta group.
1. On her start date, Okta automatically creates accounts for Lucy in all the tools used by every employee at Acme (for example: chat, corporate directory, intranet, and so on).
1. Since Lucy is in the Customer Support Okta group, an account is also provisioned for Lucy in the tools used exclusively by the Customer Support team (for example, the case management tool).
1. Acme uses Okta Workflows to provide custom onboarding actions, extending the usual account provisioning flows. After Lucy’s account is activated, an onboarding flow is triggered based on Lucy's group. Since she is part of the Customer Support group, Lucy is added to a special folder in Acme’s cloud file storage service that the Customer Support team uses to share template files.

#### Mover

1. After two years of great work on the Customer Support team, Lucy is promoted and becomes a team manager! The HR team updates Lucy’s role in the employee directory to reflect her new level and manager title. Lucy’s profile in Okta is updated, and Lucy is added to a new group called “People Managers” in Okta.
1. The applications Lucy was given access to when she joined Acme are automatically updated with Lucy’s latest profile information including her new title.
1. Since Lucy is now a member of the People Managers Okta group, an account is provisioned for her in Acme’s employee performance evaluation tool.
1. A flow is triggered in Okta Workflows when Lucy’s profile is updated that adds Lucy to a private chat group for people managers.

#### Leaver

1. After working at Acme for five years, Lucy decides to leave to take a Customer Support executive role at another organization. HR sets her last day in the employee directory.
1. At close of business on Lucy’s last day with Acme, her account is removed from Okta. Her accounts in the various applications she uses for her job are removed.
1. An offboarding flow is triggered in Okta Workflows which reassigns ownership of Lucy’s files and folders in Acme’s cloud file storage service to her manager. A rule is created in Acme’s email system that forwards any email sent to Lucy’s corporate email address to her manager.

## Next steps

Ready to get started? Choose how you want to implement your lifecycle management integration.

<Cards>

<Card href="/docs/guides/scim-provisioning-integration-overview/" headerImage="/img/icons/scim.svg" cardTitle="System for Cross-domain Identity Management" :showFooter=false>Build a SCIM provisioning integration</Card>

<Card href="https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder" headerImage="/img/icons/WEB_Icon_Platform_Workflows_40x40.svg" cardTitle="Workflows Connector Builder" :showFooter=false>Build a Workflow integration</Card>

</Cards>
<br>

After your Okta lifecycle management integration is built and tested, [submit](/docs/guides/submit-app/scim/main/) it to the Okta OIN team for verification through the OIN Manager.
