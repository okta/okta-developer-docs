---
title: OIN submission requirements
meta:
  - name: description
    content: Use this guide to prepare all the requirements prior to submitting your integration to Okta for publication in the Okta Integration Network.
layout: Guides
---

This guide provides you with a list of requirements you need to prepare prior to submitting your integration for publication in the [Okta Integration Network (OIN)](https://www.okta.com/integrations/).

---

**Learning outcome**

Understand the requirements necessary to submit your integration using the [OIN Manager](https://oinmanager.okta.com).

**What you need**

A built and tested OIN integration that's ready for Okta verification

---

## Overview

Prior to using the [OIN Manager](https://oinmanager.okta.com)&nbsp;to submit your OIN integration, you need to review the following guidelines to prepare for the artifacts requested during the submission process:

* [Logo guidelines](#logo-guidelines)
* [App description guidelines](#app-description-guidelines)
* [Use case guidelines](#use-case-guidelines)
* [Customer support contact guidelines](#customer-support-contact-guidelines)
* [Test account guidelines](#test-account-guidelines)
* [Customer configuration document guidelines](#customer-configuration-document-guidelines)

Before you submit your integration, ensure that your integration doesn't use Okta features that aren't supported in the OIN. See [OIN limitations](#oin-limitations).

## Logo guidelines

The app logo that you submit to the OIN Manager in the **General Settings** > **App icon** field must conform to the following:

* Submit a logo file that's less than one MB in size.
* Submit a square-dimensioned logo that has a 1:1 aspect ratio.

   > **Note:** OIN app icons are placed in a 200 x 200 pixel grid.

* Submit an icon rather than a wordmark (a graphic that includes the company or product name).

   > **Note:** The OIN catalog already lists the product name in plain text. Logos with text can appear redundant.

* Don't submit a logo with the trademark (:tm:) symbol.
* Submit a logo image that's in PNG format with a transparent background.
    * GIF and JPEG/JPG formats are also acceptable
    * A colored background is acceptable if it's a part of the logo color scheme

### Logo tips

* If your logo isn't in one of the acceptable formats, ask your design team to convert your existing logo to the preferred PNG format. If you have difficulty with converting your image to an acceptable format, contact the [OIN team](mailto:oin@okta.com).

* If your logo isn't square, consider using your website favicon. Alternatively, you can use the first letter of your app wordmark and convert it to a square image.

* You can use a slightly non-square icon, but take into account the scaling that occurs when your logo is resized to fit a 200 x 200 pixel area. If you have additional logo questions, contact the [OIN team](mailto:oin@okta.com).

<div class="full">

![OIN acceptable logos](/img/oin/oin-logo-size-guide.png)

</div>

### Examples of acceptable logos

<div class="full">

![OIN acceptable logos](/img/oin/oin-logo-guide.png)

</div>

## App description guidelines

After your integration is published, the content in the OIN Manager **General Settings** > **App description** field is displayed on the Integration detail page under the **Overview** heading. Descriptions must be less than 1024 characters and should describe the value that you provide to customers by partnering with Okta. See an app description example in this [Integration detail page](https://www.okta.com/integrations/servicenow-ud/).

## Use case guidelines

Integrations are organized by use cases in the OIN catalog. From the OIN Manager, you can specify the use case categories that your integration supports in the **General Settings** > **App use case** field. You can select up to five use cases. Use the following description list to determine the appropriate use case category for your integration:

| Use case | Integration capability |
| -------- | ---------------------- |
| [Single Sign-On](https://www.okta.com/integrations/?category=single-sign-on) (most common) | Enables users to access your application from any device with a single entry of their Okta user credentials. This use case is appropriate for SAML and OpenID Connect (OIDC) integrations. |
| [Automation](https://www.okta.com/integrations/?category=automation)  | Automates business processes and Okta administration tasks. Most integrations in this use case are API service integrations that access Okta’s APIs using OAuth 2.0.  |
| [Centralized Logging](https://www.okta.com/integrations/?category=centralized-logging) | Aggregates Okta logs into a central location, like a Security Information and Event Management (SIEM) tool, for optimized searching and alerting capabilities. API service integrations that poll the Okta API for System Logs using OAuth 2.0 support this use case. |
| [Directory and HR Sync](https://www.okta.com/integrations/?category=directory-and-hr-sync) | Provides synchronization capabilities for external-sourced user profiles with the Okta Universal Directory. This use case is most common for HR solutions using SCIM or Workflow Connectors. |
| [Lifecycle Management](https://www.okta.com/integrations/?category=lifecycle-management) | Enables organizations to securely manage their entire identity lifecycle: from on-boarding to off-boarding, and ensuring that compliance requirements are met as user roles evolve and access levels change. This use case is most common with either SCIM or Workflow Connector integrations. |
| [Identity Proofing](https://www.okta.com/integrations/?category=identity-proofing) | Enables user self-verification to improve identity assurance and approve access for authorized individuals using document-based and/or knowledge-based proofs |
| [Identity Governance and Administration (IGA)](https://www.okta.com/integrations/?category=identity-governance-and-administration-iga) | Simplifies and manages an organization's identity and access lifecycles across multiple systems |
| [Zero Trust](https://www.okta.com/integrations/?category=zero-trust) | Enables secure access for users regardless of their location, device, or network |
| [Bot or Fraud Detection](https://www.okta.com/integrations/?category=bot-or-fraud-detection) | Provides protection from inauthentic, forged, or otherwise fraudulent attempts to register, sign-in, recover, or perform identity-related transactions. Most integrations in this use case are API service integrations that send risk signals to Okta using OAuth 2.0. |
| [Multifactor Authentication (MFA)](https://www.okta.com/integrations/?category=multi-factor-authentication-mfa) | Provides an additional layer of security with multifactor authentication for an organization's cloud, mobile, and web apps |
| [Risk Signal Sharing](https://www.okta.com/integrations/?category=risk-signal-sharing)| Provides enriched context on clients, apps, users, and other first-party subjects to augment and inform Okta's adaptive authentication and authorization decisions |
| [Apps for Good](https://www.okta.com/integrations/?category=apps-for-good) | Pre-built integrations with leading apps that enable your workforce to give back. If your organization belongs in the Apps for Good use case, you first need approval from the Apps for Good team. Email [AppsForGood@okta.com](mailto:AppsForGood@okta.com) to request approval.  |

## Customer support contact guidelines

You need to specify support contacts for your integration in the **General Settings** > **Customer Support** fields from the OIN Manager. There are two types of contacts that you must provide:

* **Support contacts**: These are public support contacts that are visible from your Integration detail page in the OIN catalog. These contacts are for customers who need assistance with your integration. You can provide more than one of the following contact options:
    * **URL**: A link to an FAQ or a troubleshooting guide (see an [OIN URL support contact example](https://www.okta.com/integrations/onfido/) )
    * **Email**: An email support contact, such as `support@your-app.com` (see an [OIN email support contact example](https://www.okta.com/integrations/careervillage/) )
    * **Phone Number**: A public phone number that customers can call for support

* **Escalation support contact**: This is a private support contact used by Okta to contact your organization. It isn't shared with customers. In an emergency, Okta may need to reach your company's escalation support team, so this should be a monitored email distribution list or a phone number. Don’t use a general support contact that queues regular customer inquiries.

## Test account guidelines

You need to create a test account for your app so that the OIN team can use it to test and verify your integration. The test account details and credentials are specified in the **General Settings** > **Test Account** fields from the OIN Manager.

In general, the test account allows the OIN team to verify that your integration flow works as expected for your use case. The test account is typically an admin user in your app with additional privileges depending on your use case:

* For a lifecycle management integration, ensure that your admin test account has HR admin privileges to onboard, change roles, or offboard employees on your app.
* For an SSO or SCIM integration, ensure that your admin test account has privileges to configure SSO and SCIM (even if your app is already configured with SSO or SCIM). The OIN team needs to verify whether users and/or groups were created by SCIM provisioning or by SAML/OIDC (JiT) in your application.
* For an API service integration, ensure that your admin test account has privileges to configure an API integration and trigger API requests in your application.

> **Note:** The OIN team recommends `isvtest@okta.com` as the test account username, however, you can provide an alternative username with a different domain.

## Customer configuration document guidelines

A configuration guide helps your customers understand how to configure your Okta integration to work with your cloud application.

You need to provide a configuration guide as part of the OIN submission process. You can format the guide in any format that is accessible through a URL link (such as a webpage, a Google doc, or a PDF). During the OIN verification process, the link to your configuration guide needs to be accessible by the OIN team so that they can check your document for general adherence to the configuration instructions. After your integration is published to the OIN, you can make the link public or customer‐accessible. Your guide is provided to administrators through the Okta Admin Console.

>**Note:** A configuration guide is required for all integrations.

### Configuration guide content

The following are section suggestions for your configuration guide:

* [Prerequisites](#prerequisites)
* [Supported features](#supported-features)
* [Procedure](#procedure)
* [Troubleshooting tips](#troubleshooting-and-tips)

#### Prerequisites

In this section, specify any prerequisites required before your customer configures your integration in Okta. Examples may include enabling specific Okta features, enabling API access to your SCIM server, or adding a particular version of an integration in Okta.

##### Prerequisite example:

When using SAML as the SSO mode with provisioning, you need to enable a specific account plan on the application side for silent activation.

#### Supported features

In this section of your guide, list the features that your application supports and include any restrictions or limitations.

> **Note:** You can briefly describe what each feature does. See the SCIM guides from [Configuration guide examples](#scim-examples).

##### Supported feature example:

* IdP-initiated SSO
* SP-initiated SSO
* SLO (Single Log Out)
* Force authentication
* Create users
* Update user attributes
* Deactivate users
* Import users
* Import groups
* Sync password
* Profile sourcing

Okta can't update user attributes for Admin users. This is an API limitation.

#### Procedure

This section explains all the configuration steps needed to get your customers set up with your integration. Detail all settings and include any screenshots that can assist the user.

Also include any best practices for your procedure, such as SCIM guidance on setting mappings for attributes, especially required attributes that don't have a default mapping.

##### Procedure note example:

The External ID is a required attribute, but it doesn't have a default mapping. This is because some customers prefer to set it to `EmployeeNumber`, and others like to set it to `emailAddress`. Assign the mapping to the correct value for your organization.

#### Troubleshooting and tips

Include this section if there are known issues that apply to the entire configuration. You can include best practices with the step-by-step procedure instructions. You can also include information on how to contact your organization if the customer has any support queries.

### Configuration guide examples

##### OIDC examples:

* [Cerby](https://docs.google.com/document/d/e/2PACX-1vRiswyNyRPVYfEMEwPsbMO8Qn11BjAO-FfUsWBBit_IYe88tzQCHTmMPtmF8uPV044HmXQR13adj3LO/pub)
* [Upwave](https://help.upwave.io/en/articles/4129778-okta-configuration-guide)

##### SAML examples:

* [GitHub Enterprise](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Github_Enterprise.html)
* [Runscope](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Runscope.html)
* [Salesforce](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html)
* [Zoom.us](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Zoom.us.html)

##### SCIM examples:

* [Atlassian Cloud](https://confluence.atlassian.com/cloud/configure-user-provisioning-with-okta-957492956.html)
* [Contentful](https://www.contentful.com/help/okta-user-provisioning-integration-with-scim/)
* [Zscaler](https://help.zscaler.com/zia/saml-scim-configuration-guide-okta)

## OIN limitations

You can't publish integration with the following Okta features in the OIN catalog:

* **SWA apps:** Okta no longer publishes new Secure Web Authentication (SWA) integrations to the OIN catalog. Existing SWA integrations are still maintained by the OIN team. To update an existing SWA integration, contact the [OIN team](mailto:oin@okta.com).

* **Custom authorization server:** To support the potentially large numbers of Okta orgs accessing an authorization server through the OIN, an OIDC integration can't use a [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server), including the default server. You can only use the [Org authorization server](/docs/concepts/auth-servers/#org-authorization-server).

* **Refresh token:**  Refresh tokens aren't supported for integrations published in the OIN.

* **Unsupported scopes:** <br>
   * `offline_access` scope isn't available because refresh tokens aren't supported for integrations published in the OIN.
   * Custom scopes, such as the `groups` scope, aren't supported for integrations published in the OIN.
   * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* **SAML encryption:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

<ApiAmProdWarning />

## Next step

Ready to submit your app? See [Publish an OIN integration](/docs/guides/submit-app/).
