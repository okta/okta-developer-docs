---
title: Overview of lifecycle management in the OIN
meta:
  - name: description
    content: Learn how to build a lifecycle management app integration for the Okta Integration Network.
---

Lifecycle management refers to the process of provisioning and deprovisioning application access as a user moves through an organization. Onboarding and offboarding are also terms used to describe the actions associated with lifecycle management.

### Ready to get started?

Choose how you want to implement your lifecyle management integration:

<Cards>
<Card href="/docs/guides/scim-provisioning-integration-overview/" headerImage="/img/icons/scim.svg" cardTitle="System for Cross-domain Identity Management" :showFooter=false>Build a SCIM provisioning integration</Card>

<Card href="https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder" headerImage="/img/icons/WEB_Icon_Platform_Workflows_40x40.svg" cardTitle="Workflow Connector" :showFooter=false>Build a Workflow integration</Card>
</Cards>

[Workflow Connector in HOC](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder)
<br>

Read further for reasons [why you want to build an SSO integration](#why-build-an-sso-integration-with-okta) for the OIN, [choosing the right lifecycle management tools](#choose-your-sso-protocol), and [use case examples](#use-case-examples).



## Why build a Lifecycle Management integration with Okta?

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Increase adoption of your product and sell more licenses** | Okta lifecycle management integration helps your customers utilize SaaS licenses and ultimately purchase more as the organization grows or usage expands. |
| **Automate onboarding / offboarding and win larger customers** | Once an organization reaches a certain size, manually provisioning accounts and getting users set up for success can be time consuming and a huge bottleneck for your product’s adoption. Okta lifecycle management integration automates mundane tasks for your customers which reduces the total cost of ownership and removes barriers to end-user activation. |
| **Secure access to your application** | Secure access to your application - Integrating with Okta ensures end-users can access your application as soon as they join an organization. Access is automatically removed as they leave the organization to prevent embarrassing data loss and dangling access. |
| **Meet compliance requirements** | Help your customers generate logs of access changes in order to comply with security policies and pass audits. |

## Choose how you implement lifecycle management integration

| &nbsp; | System for Cross-domain Identity Management (SCIM) |  Workflow Connector |
| ------ | :------------------- | :----------------------- |
| **Description** | [SCIM](http://www.simplecloud.info) is the industry standard protocol for managing users and groups in cloud-based systems. It handles basic operations like create, read, update, delete, and search. | [Okta Workflows](https://www.okta.com/platform/workflows/) is a no-code if-this-then-that logic builder which Okta customers use to automate custom or complex employee onboarding and offboarding flows. Publishing a workflow connector with Okta allows your customers to deeply integrate with your product as part of these lifecycle management flows. |
| **Technology** | JSON-based REST API server implementation | Low code development environment (Okta Workflows).  |
| **Benefits** | <ul><li>Covers the most common lifecycle management needs related to onboarding / offboarding</li> <li>SCIM standard is throughout the industry</li> </ul> | <ul><li>Customers can create highly custom automation with your product without writing code</li> <li>Deep and sticky integration with Okta</li> </ul>|
| **Ease of Implementation** | <span style="width: 150px;display:block">![Low](/img/ratings/high.png)</span> | <span style="width: 150px;display:block">![Medium](/img/ratings/medium.png)</span> |
| **Get started** | [Build a SCIM Provisioning Integration](/docs/guides/scim-provisioning-integration-overview/) | [Workflow Connector Builder](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-builder/connector-builder.htm) |

## Use case examples

### Example of a workforce lifecycle journey with Okta

Key terms for lifecycle management:

* Joiner &mdash; starting employment at an organization
* Mover &mdash; changing roles or teams within an organization
* Leaver &mdash; ending employment at an organization

#### Joining

1. Lucy accepts an offer to join the Customer Support team at Acme Corp! The Acme HR team sets her start date in the employee directory and adds her to the “Customer Support” Okta group.
1. On her start date, Okta creates accounts for Lucy in all the tools used by every employee at Acme (chat, corporate directory, intranet, etc).
1. Since Lucy is in the “Customer Support” Okta group, an account is also provisioned for Lucy in the tools used exclusively by the Customer Support team (for example, the case management tool).
1. Acme is using Okta Workflows to provide even deeper and more custom provisioning actions. Once Lucy’s account is activated, an onboarding Flow is triggered which checks Lucy’s team. Since she is part of the Customer Support group, Lucy is added to a special folder in Acme’s cloud file storage service that the Customer Support team uses to share template files.

#### Moving

5. After 2 years of great work on the Customer Support team, Lucy is promoted and becomes a team manager! The HR team updates Lucy’s role in the employee directory to reflect her new level and manager title. Lucy’s profile in Okta is updated, and Lucy is added to a new group called “People Managers” in Okta.
6. The applications Lucy was given access to when she joined Acme are automatically updated with Lucy’s latest profile information including her new title.
7. Since Lucy is now a member of the “People Managers” Okta group, an account is provisioned for her in Acme’s employee performance evaluation tool.
8. A Flow is triggered in Okta Workflows when Lucy’s profile is updated which adds Lucy to a private chat group for people managers.

#### Leaving

9. After working at Acme for 5 years, Lucy decides to leave to take a Customer Support executive role at another organization. HR sets her last day in the employee directory.
10. At close of business on Lucy’s last day with Acme, her account is removed from Okta. Her accounts in the various applications she uses for her job are removed.
11. An offboarding Flow is triggered in Okta Workflows which reassigns ownership of Lucy’s files and folders in Acme’s cloud file storage service to her manager. A rule is created in Acme’s email system which forwards any email sent to Lucy’s corporate email address to her manager.

### Example of partner lifecycle management integration journey with Okta

Tom is an internal developer at RewardMe, an HR employee rewards app that is a partner with Okta. RewardMe is already in the OIN with an SSO integration. RewardMe is looking to add lifecycle management integration with Okta as a value-added feature for their customers.

Acme is a company that is using Okta to manage identity for their workforce. Acme is considering adding RewardMe into their HR suite. Since RewardMe is in the OIN, Acme knows that when they deploy RewardMe, they can easily configure SSO and various access privileges for their employees. However, adding employee profiles to the Acme app will still be a manual process for their HR and IT staff. In addition, onboarding, role changes, and offboarding processes will need to be addressed. Acme is worried about the security issues around adding personnel information manually and the additional workload for their staff. Acme will need a thorough project plan to rollout RewardMe without a lifecycle management integration feature.

Tom builds the RewardMe-Okta lifecycle management integration by using the SCIM protocol so that their customers don’t need to worry about manual employee profile processes, such as onboarding or offboarding. Tom submits the integration for Okta to verify and review. After approval, the RewardMe app is published as a lifecycle management integration (in addition to an SSO integration) in the OIN.

Now that RewardMe is in the OIN as an SSO and lifecycle management integration app, Acme knows that they can deploy RewardMe with minimal effort. When new employees join Acme, their HR staff adds user profiles in one Okta source, as usual. The profiles are automatically provisioned to the apps with lifecycle management support, which now includes RewardMe. This will alleviate Acme's resource efficiency and security concerns with RewardMe. Acme is more compelled to adopt RewardMe into their HR suite.

## Next steps

After your app integration is built and tested, submit the integration to the Okta OIN team for verification:

<Cards>
<Card href="/docs/guides/submit-app/scim/" headerImage="/img/icons/provisioning--blue.svg" :showFooter=false>Publish an OIN integration</Card>
</Cards>