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

Okta provides two methods to integrate lifecycle management to your application. You can use the [System for Cross-domain Identity Management](/docs/reference/scim/) (SCIM) protocol to manage user accounts from Okta, or you can use the [Workflow Connector](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) to create automated identity processes in [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf).

After completing your Okta lifecycle management integration, add it to the Okta Integration Network (OIN) for your customers to benefit with secure provisioning automation, as well as with compliance requirements. The OIN is a collection of pre-built app integrations, with over 200 of these being lifecycle management integrations. Join the community that customers trust to exchange secure authentication between users, devices, and applications.

#### Ready to get started?

Choose how you want to implement your lifecycle management integration.

<Cards>

<Card href="/docs/guides/scim-provisioning-integration-overview/" headerImage="/img/icons/scim.svg" cardTitle="System for Cross-domain Identity Management" :showFooter=false>Build a SCIM provisioning integration</Card>

<Card href="https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder" headerImage="/img/icons/WEB_Icon_Platform_Workflows_40x40.svg" cardTitle="Workflows Connector Builder" :showFooter=false>Build a Workflow integration</Card>

</Cards>

<br>

Read further for reasons [why you want to build a lifecycle management integration](#why-build-a-lifecycle-management-integration-with-okta) for the OIN, [choosing the right implementation](#choose-how-you-implement-your-integration), and [use case examples](#use-case-examples).

#### Ready to submit an integration?

Your lifecycle management app integration is built and tested. Submit the integration to the Okta OIN team for verification.

<Cards>
<Card href="/docs/guides/submit-app/scim/main/" headerImage="/img/icons/provisioning--blue.svg" cardTitle="OIN Manager" :showFooter=false>Publish an OIN integration</Card>
<Card href="https://www.okta.com/integrations/" headerImage="/img/oin/Okta_OIN_Blue_RGB.svg" :showFooter=false>View current integrations in the OIN</Card>
</Cards>
<br>

## Why build a lifecycle management integration with Okta?

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Automate onboarding/offboarding and win larger customers** | Once an organization reaches a certain size, manually provisioning accounts and getting users set up for success can be time consuming and a huge bottleneck for your product’s adoption. Okta lifecycle management integration automates mundane tasks for your customers which reduces the total cost of ownership and removes barriers to end-user activation. |
| **Secure access to your application** | Secure access to your application: integrating with Okta ensures that end-users can access your application as soon as they join an organization. Access is automatically removed as they leave the organization to prevent embarrassing data loss and dangling access. |
| **Meet compliance requirements** | Help your customers generate logs of access changes in order to comply with security policies and audits. |
| **Increase adoption of your product and sell more licenses** | Okta lifecycle management integration helps your customers utilize SaaS licenses and ultimately purchase more as the organization grows or usage expands. |

## Choose how you implement your integration

| &nbsp; | System for Cross-domain Identity Management (SCIM) |  Workflow Connector |
| ------ | :------------------- | :----------------------- |
| **Description** | [SCIM](http://www.simplecloud.info) is the industry standard protocol for managing users and groups in cloud-based systems. It handles basic operations like create, read, update, delete, and search. | [Okta Workflows](https://www.okta.com/platform/workflows/) is a no-code if-this-then-that logic builder that Okta customers can use to automate custom or complex employee onboarding and offboarding flows. Publishing a Workflow Connector with Okta allows your customers to deeply integrate with your product as part of their lifecycle management flows. |
| **Technology** | JSON-based REST API server implementation | Low code development environment ([Okta Workflows](https://help.okta.com/okta_help.htm?type=wf)).  |
| **Benefits** | <ul><li>Covers the most common lifecycle management needs related to onboarding/offboarding</li> <li>SCIM standard is throughout the industry</li> </ul> | <ul><li>Customers can create highly custom automation with your product without writing code</li> <li>Deep and sticky integration with Okta</li> </ul>|
| **Ease of Implementation** | <span style="width: 150px;display:block">![Low](/img/ratings/high.png)</span> | <span style="width: 150px;display:block">![Medium](/img/ratings/medium.png)</span> |
| **Get started** | [Build a SCIM Provisioning Integration](/docs/guides/scim-provisioning-integration-overview/) | [Workflow Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) |

## Use case examples

### Example of a workforce lifecycle journey with Okta

Key terms for lifecycle management in this workforce journey:

* **Joiner**: Starting employment at an organization
* **Mover**: Changing roles or teams within an organization
* **Leaver**: Ending employment at an organization

#### Joiner

1. Lucy accepts an offer to join the Customer Support team at Acme Corp. The Acme HR team sets her start date in the employee directory and adds her to the “Customer Support” Okta group.
1. On her start date, Okta automatically creates accounts for Lucy in all the tools used by every employee at Acme (for example: chat, corporate directory, intranet, and so on).
1. Since Lucy is in the Customer Support Okta group, an account is also provisioned for Lucy in the tools used exclusively by the Customer Support team (for example, the case management tool).
1. Acme uses Okta Workflows to provide custom onboarding actions, extending the usual account provisioning flows. Once Lucy’s account is activated, an onboarding flow is triggered based on Lucy's group. Since she is part of the Customer Support group, Lucy is added to a special folder in Acme’s cloud file storage service that the Customer Support team uses to share template files.

#### Mover

1. After 2 years of great work on the Customer Support team, Lucy is promoted and becomes a team manager! The HR team updates Lucy’s role in the employee directory to reflect her new level and manager title. Lucy’s profile in Okta is updated, and Lucy is added to a new group called “People Managers” in Okta.
1. The applications Lucy was given access to when she joined Acme are automatically updated with Lucy’s latest profile information including her new title.
1. Since Lucy is now a member of the People Managers Okta group, an account is provisioned for her in Acme’s employee performance evaluation tool.
1. A flow is triggered in Okta Workflows when Lucy’s profile is updated that adds Lucy to a private chat group for people managers.

#### Leaver

1. After working at Acme for 5 years, Lucy decides to leave to take a Customer Support executive role at another organization. HR sets her last day in the employee directory.
1. At close of business on Lucy’s last day with Acme, her account is removed from Okta. Her accounts in the various applications she uses for her job are removed.
1. An offboarding Flow is triggered in Okta Workflows which reassigns ownership of Lucy’s files and folders in Acme’s cloud file storage service to her manager. A rule is created in Acme’s email system which forwards any email sent to Lucy’s corporate email address to her manager.

### Example of partner lifecycle management integration journey with Okta

Tom is an internal developer at RewardMe, an HR employee rewards app that is a partner with Okta. RewardMe is already in the OIN with an SSO integration. RewardMe is looking to add lifecycle management integration with Okta as a value-added feature for their customers.

#### Customer admin perspective before a lifecycle management integration

Acme is a company that is using Okta to manage identity for their workforce. Acme is considering adding RewardMe into their HR suite. Since RewardMe is in the OIN, Acme knows that when they deploy RewardMe, they can easily configure SSO and various access privileges for their employees. However, adding employee profiles to the RewardsMe app will still be a manual process for their HR and IT staff. In addition, onboarding, role changes, and offboarding processes will need to be addressed. Acme is worried about the security issues around adding personnel information manually and the additional workload for their staff. Acme will need a thorough project plan to rollout RewardMe without a lifecycle management integration feature.

#### Partner integration actions

1. Tom builds the RewardMe-Okta lifecycle management integration by using the SCIM protocol so that their customers don’t need to worry about manual employee profile processes, such as onboarding or offboarding.
1. Tom documents the required configuration steps for the customer admin.
1. Tom submits the integration and corresponding documentation for Okta to verify and review.
1. After approval, the RewardMe app is published as a lifecycle management integration (in addition to an SSO integration) in the OIN.

#### Customer admin perspective after a lifecycle management integration

Now that RewardMe is in the OIN as an SSO and lifecycle management integration app, Acme knows that they can deploy RewardMe with minimal effort. When new employees join Acme, their HR staff adds user profiles in one Okta source, as usual. The profiles are automatically provisioned to the apps with lifecycle management support, which now includes RewardMe. This will alleviate Acme's resource efficiency and security concerns with RewardMe. Acme is more compelled to adopt RewardMe into their HR suite.
