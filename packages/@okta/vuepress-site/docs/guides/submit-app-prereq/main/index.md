---
title: OIN submission requirements
meta:
  - name: description
    content: Use this guide to prepare all the requirements prior to submitting your integration to Okta for publication in the Okta Integration Network.
layout: Guides
---

This guide provides you with a list of requirements you need prepare prior to submitting your integration for publication in the [Okta Integration Network (OIN)](https://www.okta.com/integrations/).

---

**Learning outcome**

* Understand the requirements necessary for the submission process using the OIN Manager.

**What you need**

* a built and tested OIN integration that is ready for verification

---

## Overview

Prior to using the [OIN Manager](https://oinmanager.okta.com) to submit your completed integration, you need to review the following guidelines to prepare for the artifacts requested during the submission process:

* [Logo guidelines](#logo-guidelines)
* [App description guidelines](#app-description-guidelines)
* [Use case guidelines](#use-case-guidelines)
* [Test account guidelines](#test-account-guidelines)
* [Customer configuration document guidelines](#customer-configuration-document-guidelines)

## Logo guidelines

The integration logo that you submit to the OIN Manager in the **General Settings** > **App icon** field must adhere to the following guidelines:

* The ideal logo has a 1:1 (square) aspect ratio.

   > **Note:** OIN integration icons are placed in a 200 x 200 pixels square.

* Avoid logos with the trademark (:tm:) symbol.

* Avoid logos with both an icon and a wordmark.

* The ideal logo is in SVG format (high resolution PNG or GIF formats are also acceptable).

* If the background color isn't part of your logo color scheme, then you need to use a transparent background.

* The logo file size must be smaller than one MB.

<div class="three-quarter">

![OIN acceptable logos](/img/oin/oin-logo-file-checklist.png)

</div>

### Adhere to the logo guidelines

If your logo doesn't meet the OIN requirements, the following are suggestions for you to adhere to the guidelines:

#### My logo isn't in SVG format

High resolution PNG, GIF, or SVG logo images are acceptable in the OIN catalog, although SVG images are preferred. If possible, you can convert your high resolution PNG or GIF file to an SVG file. If you have difficulty with converting your image to an acceptable format, contact the OIN team.

#### My logo isn't square

If your integration logo isn't square, consider using your website's favicon. Alternatively, you can use the first letter of your app wordmark and convert it to a square image. You can use a slightly non-square icon, but take into account the scaling that occurs when your logo is fitted into a 200 x 200 pixels space. If you have additional logo questions, contact the OIN team.

<div class="full">

![OIN acceptable logos](/img/oin/oin-logo-size-guide.png)

</div>

### Example of acceptable logos

<div class="full">

![OIN acceptable logos](/img/oin/oin-logo-guide.png)

</div>

## App description guidelines

An app description is displayed on your integration tile in the OIN catalog. You can specify your app description in the **General Settings** > **App description** field from the OIN Manager. See the [OIN catalog](https://www.okta.com/integrations/) for examples of existing app descriptions.

Prepare an app description that describes what your integration offers and the features supported. You can also provide value-added messaging for your integration. Your description needs to be less than 256 (???) characters.

For example, the following is an app description for a fictitious app called Infinipoint:

> Infinipoint enables enterprises of all sizes to automate cyber hygiene across their entire IT estate with unprecedented speed and scale. For the benefit of single-sign-on, Okta's Infinipoint integration gives your team the ability to securely manage and secure the organisation's IT assets.

## Use case guidelines

Integrations are organized by use cases in the OIN catalog. From the OIN Manager, you can specify the use case categories that your app supports in the **General Settings** > **App use case** field. You can select up to five use cases. Use the following description list to determine the appropriate use case category for your integration:

| Use case | Integration capability |
| -------- | ---------------------- |
| [Single Sign-On](https://www.okta.com/integrations/?category=single-sign-on) (most common) | Enables users to access your application from any device with a single entry of their Okta user credentials. This use case is appropriate for SAML and OpenID Connect (OIDC) integrations. |
| [Automation](https://www.okta.com/integrations/?category=automation)  | Automates business processes and Okta administration tasks. Most integrations in this use case are API service integrations that access Okta’s APIs using OAuth 2.0.  |
| [Centralized Logging](https://www.okta.com/integrations/?category=centralized-logging) | Aggregates Okta logs into a central location, like a Security Information and Event Management (SIEM) tool, for optimized searching and alerting capabilities. Integrations in this use case are API service integrations that poll the Okta API for System Logs using OAuth 2.0. |
| [Directory and HR Sync](https://www.okta.com/integrations/?category=directory-and-hr-sync) | Provides synchronization capabilities for external-sourced user profiles with the Okta Universal Directory. This use case is most common for HR solutions using SCIM or Workflow Connectors. |
| [Lifecycle Management](https://www.okta.com/integrations/?category=lifecycle-management) | Enables organizations to securely manage their entire identity lifecycle: from on-boarding to off-boarding, and ensuring compliance requirements are met as user roles evolve and access levels change.  This use case is most common with either SCIM or Workflow Connector integrations. |
| [Identity Proofing](https://www.okta.com/integrations/?category=identity-proofing) | Enables user self-verification to improve identity assurance and approve access for authorized individuals using document-based and/or knowledge-based proofs |
| [Identity Governance and Administration (IGA)](https://www.okta.com/integrations/?category=identity-governance-and-administration-iga) | Provides the right people access to the right tools at the right time |
| [Zero Trust](https://www.okta.com/integrations/?category=zero-trust) | Enables secure access for users regardless of their location, device, or network |
| [Bot or Fraud Detection](https://www.okta.com/integrations/?category=bot-or-fraud-detection) | Provides protection from inauthentic, forged, or otherwise fradulent attempts to register, sign-in, recover, or perform identity-related transactions. Most integrations in this use case are API service integrations that send risk signals to Okta using OAuth 2.0. |
| [Multi-factor Authentication (MFA)](https://www.okta.com/integrations/?category=multi-factor-authentication-mfa) | Provides an additional layer of security with multifactor authentication for an organization’s cloud, mobile, and web apps |
| [Risk Signal Sharing](https://www.okta.com/integrations/?category=risk-signal-sharing)| Provides enriched context on clients, apps, users, and other first-party subjects to augment and inform Okta's adaptive authentication and authorization decisions |
| [Apps for Good](https://www.okta.com/integrations/?category=apps-for-good) | Pre-built integrations with leading apps that enable your workforce to give back |

## Test account guidelines

You need to create a test account on your app so that the OIN team can use it to test and verify your integration. The test account details and credentials are specified  in the **General Settings** > **Test Account** fields from the OIN Manager.

Depending on the use case of our app, the permissions and roles for your test account are varied. For example:

* For an SSO integration, you can provide a regular, non-admin user test account for the OIN team to test Single Sign-On with your app.
* For a lifecycle management integration, you can provide a test account with HR admin privileges to onboard, change roles, or offboard employees on your app.
* For an API service integration, you can provide a test account with privileges to trigger an API process on your app.

In general, the test account provides the OIN team with the ability to verify that your integration flow works as expected for your use case. Provide the necessary permissions required for your app. If you have further questions, contact the OIN team.

## Customer configuration document guidelines

A configuration guide helps your customers understand how to configure your Okta integration to work with your cloud application.

You need to provide a configuration guide as part of the OIN submission process. Your guide is provided to administrators through the Okta Admin Console. Okta checks your document for general adherence to the configuration guide instructions. After your integration is published to the OIN, you can make the link public or customer‐accessible.

>**Note:** A configuration guide is required for SCIM and OIDC integrations. It's optional for SAML integrations, as Okta supplies its own documentation with the apps.

You can create the guide in whatever format works best for you: a webpage, a Google or Word doc, or a PDF are all acceptable.

### Configuration guide examples

OIDC:

* [Cerby](https://docs.google.com/document/d/e/2PACX-1vRiswyNyRPVYfEMEwPsbMO8Qn11BjAO-FfUsWBBit_IYe88tzQCHTmMPtmF8uPV044HmXQR13adj3LO/pub)
* [Upwave](https://help.upwave.io/en/articles/4129778-okta-configuration-guide)

SAML:

* [GitHub Enterprise](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Github_Enterprise.html)
* [Runscope](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Runscope.html)
* [Salesforce](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html)
* [Zoom.us](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Zoom.us.html)

SCIM:

* [Atlassian Cloud](https://confluence.atlassian.com/cloud/configure-user-provisioning-with-okta-957492956.html)
* [Contentful](https://www.contentful.com/help/okta-user-provisioning-integration-with-scim/)
* [Zscaler](https://help.zscaler.com/zia/saml-scim-configuration-guide-okta)

### Configuration guide content

The following are section suggestions for your configuration guide:

* [Prerequisites](#prerequisites)
* [Supported features](#supported-features)
* [Procedure](#procedure)
* [Troubleshooting tips](#troubleshooting-and-tips)

#### Prerequisites

In this section, specify any prerequisites required before your customer configures your integration in Okta. Examples may include enabling specific Okta features, enabling API access to your SCIM server, or adding a particular version of an integration in Okta.

For example:

When using SAML as the SSO mode with provisioning, you need to enable a specific account plan on the application side for silent activation.

#### Supported features

In this section of your guide, you want to outline what features your application supports. For example:

* IdP-initiated SSO
* SP-initiated SSO
* SLO (Single Log Out)
* Force Authentication
* Create Users
* Update User Attributes
* Deactivate Users
* Import Users
* Import Groups
* Sync Password
* Profile Sourcing (formerly called Profile Mastering)

Also include any restrictions. For example:

Okta can't update user attributes for Admin users. This is an API limitation.

> **Note:** You can briefly describe what each feature does. See the SCIM guides from the earlier example section.

#### Procedure

This section constitutes the majority of your guide and explains all the configuration steps needed to get your customers set up with your integration. Detail all settings and include any screenshots that can assist the user.

Also include any best practices for your procedure, such as guidance on setting mappings for attributes, especially required attributes that don't have a default mapping. For example:

> **Note:** The External ID is a required attribute, but it doesn't have a default mapping. This is because some customers prefer to set it to `EmployeeNumber`, and others like to set it to `emailAddress`. Assign the mapping to the correct value for your organization.

#### Troubleshooting and tips

You need to only include this section if there are known issues that apply to the entire configuration. In general, you should include best practices with the step-by-step procedure instructions.

You may also want to include information on how to contact your organization if the customer has any support queries.
