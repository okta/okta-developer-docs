---
title: Publish an OIN integration
meta:
  - name: description
    content: Use this guide to learn how to submit your integration to Okta for publication in the Okta Integration Network.
layout: Guides
---


This guide walks you through the process of submitting a SCIM, OIDC, or SAML 2.0 app to the Okta Integration Network (OIN), including preparing and configuring new integrations and updating previously published integrations.

---

**Learning outcomes**

* Submit a new app to the OIN.
* Update a previously-submitted app.

**What you need**

A functional integration created and tested in accordance with one of our OIN guides &mdash; [Build a SCIM provisioning integration](/docs/guides/scim-provisioning-integration-overview/) or [Build a Single-Sign On integration](/docs/guides/build-sso-integration/).

---

## Overview

The Okta Integration Network (OIN) is the identity industry’s broadest and deepest set of pre-built cloud integrations to manage access management, authentication, and provisioning. By adding your integration to the OIN, you can gain exposure to thousands of Okta customers who can discover your integration and deploy your application to millions of users. OIN integrations speed adoption by simplifying configuration steps and reducing friction for your customers.

If you are an independent software vendor (ISV), Okta customer, or IT system integrator who wants to add their integration to the [Okta Integration Network](https://www.okta.com/integrations/), read this guide for instructions on how to submit your integration. Adding your integration to the Okta Integration Network is completely free.

### Protocols supported

This guide covers submissions that use one or more of these protocols:

* [System for Cross-domain Identity Management (SCIM)](http://www.simplecloud.info/)
* [OpenID Connect (OIDC)](https://openid.net/connect/)

    >**Note:** To support the potentially large numbers of Okta orgs accessing an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.

    >**Note:** ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](https://en.wikipedia.org/wiki/SAML_2.0)

    >**Note:** SAML integrations must use SHA256 encryption for security. If you are using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

### Submission process

After you have built a functioning app integration, a few steps are required to submit it to Okta for review and publication in the OIN:

1. Create a [customer-facing configuration guide](#prepare-a-customer-facing-configuration-guide).
    >**Note:** This guide is required for SCIM and OIDC OIN apps. It's optional for SAML integrations, as Okta provides its own documentation for those apps. The guide is supplied with your published app.
1. [Submit your integration](#submit-an-integration) to Okta through the OIN Manager tool. Your submission must provide Okta with the general and protocol-specific metadata that's required to create a customized integration for publication in the OIN.
    >**Note:** In the OIN manager, the Profile Sourcing option (formerly known as Profile Mastering) is enabled for developer orgs by Okta Developer Support. You can contact your Okta account team or post on our [forum](https://devforum.okta.com/) to request temporary activation of this capability when submitting a SCIM app integration.

1. Work with the Okta OIN team to test your integration using your input and then get it published to the OIN Catalog.

The Okta OIN team reviews all submissions on a best-case basis.

If the Okta OIN team identifies any issues in the initial review and QA testing phases, you are sent an email with the specific details. At any point in the process, you can check the status of your submission in the [OIN Manager](https://oinmanager.okta.com).

  >**Note:** SWA app integrations are no longer accepted for publication in the OIN catalog. However, existing SWA apps are still maintained by the OIN team.

### Understand the submission review process

The submission review process begins when you click **Submit for Review** in the [OIN Manager](https://oinmanager.okta.com). Okta sends you an email notification that your integration is now queued for review by the Okta OIN team, which includes the date that the initial review of the integration is expected to finish.

The OIN Manager shows the current status of your integration.

#### Step 1: Initial review

* **Pending review by Okta**: The Okta OIN team is notified of your submission. Okta reviews the submission and notifies you by email when the submission review is complete.
* **Action required**: Okta has reviewed your submission and found issues that require your attention. Check your email for results from the Okta initial review. Sign in to OIN Manager, update the requested details, and click **Submit for Review**. After the OIN team reviews your updated submission and verifies that the issues are resolved, your submission moves to step two for QA testing.

#### Step 2: Code review

* **Pending review by Okta**: The Okta OIN team conducts internal QA tests and notifies you by email when the QA review is complete. If the QA test is successful, your submission is automatically published in the OIN.
* **Action required**: Okta has found QA issues that require your correction. Check your email for results from the Okta QA review. Make the requested changes as an update to your existing submission.
* **Final review by Okta**: The Okta OIN team conducts a final internal QA test based on previously requested changes and notifies you by email when the final QA review is complete. If the review is successful, your submission is automatically published in the OIN.

#### Step 3: Published

* Congratulations, your integration is published in the OIN!

The following flowchart outlines the entire process:

<div class="three-quarter">

![ISV Submission process flow](/img/oin/isv-portal_submission_flow.png)

</div>

### Submission support

Getting your app integration in the OIN catalog involves two phases: creating a functional integration and submitting it through the OIN publication process. For each phase in the process, Okta has an associated support stream to assist you.

When you are constructing your Okta integration, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/).

If you need help during the submission process, use the Get Support section on the My App Integrations page after you sign in to the [OIN Manager](https://oinmanager.okta.com). This section provides the following resources from the [Okta developer portal](https://developer.okta.com/):

* OIN integration guides
* Okta, OIDC, SAML, and SCIM concepts
* A search tool to find articles in the Okta developer portal

If you have questions or need additional support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

>**Note:** All integrations in the OIN catalog are public. If you want to submit a request to create a private app integration for an application that uses SCIM 1.1 or Profile Sourcing, or for an application that uses a custom header expression for the Header Auth, then use the [SCIM App Integration Wizard](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-scim) to create your integration and submit your app through the [OIN Manager](https://oinmanager.okta.com). The Okta OIN team works with you to create an internal-only integration that isn't included in the OIN.

## Prepare a customer-facing configuration guide

A configuration guide helps your customers understand how to configure your Okta integration to work with your cloud application.

You need to provide a configuration guide as part of the OIN submission process. Your guide is provided to administrators through the Okta Admin Console. Okta checks your document for general adherence to the configuration guide instructions. After your integration is published to the OIN, you can make the link public or customer‐accessible.

>**Note:** A configuration guide is required for SCIM and OIDC integrations. It's optional for SAML integrations, as Okta supplies its own documentation with the apps.

You can create the guide in whatever format works best for you: a Web page, a Google or Word doc, or a PDF are all acceptable.

### Examples

Some examples of detailed configuration guides:

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
* [Fuze](http://images.em.fuze.com/Web/ThinkingPhones/%7Be980dc53-8c7e-4758-b5e5-3fa20845c561%7D_Fuze_Admin_Guide_-_Okta_Provisioning_(1).pdf) (PDF link)
* [Zscaler](https://help.zscaler.com/zia/saml-scim-configuration-guide-okta)

### Content

Your configuration guide should include the following sections:

#### Prerequisites

In this section, specify any prerequisites required before your customer configures your integration in Okta. Examples may include enabling specific Okta features or SKUs, enabling API access to your SCIM server, or adding a particular version of an integration in Okta.

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

> **Note:** You can briefly describe what each feature does. See the guides from the earlier SCIM section for examples.

#### Procedure

This section constitutes the majority of your guide and explains all the configuration steps needed to get your customers set up with your integration. Detail all settings and include any screenshots that can assist the user.

Also include any best practices for your procedure, such as guidance on setting mappings for attributes, especially required attributes that don't have a default mapping. For example:

> **Note:** The External ID is a required attribute, but it doesn't have a default mapping. This is because some customers prefer to set it to `EmployeeNumber`, and others like to set it to `emailAddress`. Assign the mapping to the correct value for your organization.

#### Troubleshooting and tips

You need to only include this section if there are known issues that apply to the entire configuration. In general, you should include best practices with the step-by-step procedure instructions.

You may also want to include information on how to contact your organization if the customer has any support queries.

## Submit an integration

To start your integration submission, open the [OIN Manager](https://oinmanager.okta.com) and click **Start Submission Form**.

Sign in using your development org credentials and click **Add New Submission** to create a new submission instance.

If you want to review an in-progress submission, click **View** beside the name of your integration.

Begin defining your submission by specifying details in the [General Settings](#configure-general-settings) and [protocol specific](#configure-protocol-specific-settings) tabs.

If you need to update an integration, see [Update your published integration](#update-your-published-integration).

### Configure general settings

On the General Settings page, fill in the basic information about your integration:

#### App information

* **Does your app exist in the OIN?**: Indicate if your integration exists in the OIN. 

   * If your integration already exists in the OIN, provide the **Existing OIN app name** so that the Okta OIN team can locate it.

   * **What changes are you making to the existing OIN integration?**: If your integration already exists in the OIN, summarize the changes that you are requesting in your update. This summary helps the Okta OIN team address your changes.

* **App name**: Provide a name for your integration. This is the main title used for your integration in the OIN.

* **App website**:  Provide a link to your product or service homepage or a specific location on your website where users can learn more about your integration.

* **App use case**: Specify one or more use cases for Okta to categorize your integration in the OIN catalog. Click **Add Another** to choose up to five use cases.

* **App description**: Give a general description of your application and what the Okta integration does. For examples, see the overview section for any of the integrations listed on the [OIN](https://www.okta.com/integrations/).

* **App icon**: Upload a PNG, JPG, or GIF file of a logo to accompany your integration in the catalog. The logo file must be smaller than 1 MB in size. For best results, use a PNG image with a transparent background, a landscape orientation, and use a minimum resolution of 420 x 120 pixels to prevent upscaling.

#### Customer support

* **Support contacts**: Include one or more public contact points for users who need assistance with your integration. You can also add a link to an FAQ or a troubleshooting guide. Use the drop-down menu to specify if you are adding an email, a URL, or a phone number and click **Add Another** to add additional contacts. Okta shares this information with customers in the OIN catalog description for your app integration.

* **Escalation support contact**: This should be an email distribution list for Okta to use when contacting your company about your integration. It can be a phone number, but ideally when there is an issue with your integration, Okta wants to reach as many people as possible without creating any bottlenecks. Make sure that the contact provided here isn't a generic contact such as `support@example.com` or a 1-800 number. The escalation contact should be a contact list that Okta can reach out to in an emergency. This contact information isn't shared with customers.

#### Test account

The Okta OIN team requires a dedicated account on your application to run their tests. This test account needs to be kept active beyond the submission period in case Okta needs to update or troubleshoot your app integration.

* **Test account URL**: This is a static URL to sign in to your application. An Okta OIN team member navigates to this URL and uses the account credentials you provide in the subsequent fields to sign in to your application.

* **Test account username or email**: The username for your application test account. The Okta OIN team signs in with this username to run tests. The preferred account username is `isvtest@okta.com`.

* **Test account password**: The password for your application test account.

* **Additional instructions**: Include any other information that you think the Okta OIN team needs to know about your integration, the test account, or the testing configuration.

### Configure protocol-specific settings

Your application needs to support at least one protocol for interacting with Okta: SAML or OIDC for authentication, or SCIM for provisioning.

You can submit protocol support details all together or asynchronously. For example, if your application currently only supports SAML and SCIM, you can create the submission with the SAML and SCIM protocol details. At a later date, when you add OIDC support to your application, you can return to your integration submission, activate the OIDC support panel, and add in the details needed for Okta to enable OIDC support.

For each protocol, click the appropriate tab name and change the protocol support drop-down box from **Off** to **On**.

#### Instance URL

For each protocol, enter the **Okta instance URL** for your integration in the first field.

To get your Okta instance URL in your development org:

1. In the Okta Admin Console, go to **Applications** > **Applications** to see all the integrations in your org.
1. Click the name of the app integration that you are going to submit.
1. On the settings page, confirm that the settings match what you want as the global defaults for all customers.
1. In your browser, click in the address bar showing the current URL and copy it to your clipboard. This is the Okta instance URL for your integration.
1. Back in the OIN Manager, paste that URL into your submission.

<!--
1. Click the **General** tab.
1. Go to the **App Embed Link** section and copy the text in the Embed Link field:
   ![App Embed Link](/img/oin/isv-portal_app-embed-link.png "App Embed Link GUI in the Application settings")
1. Paste that value into your submission.
-->

#### Protocol-specific settings

Each of the supported protocols has different configuration settings for the remainder of the submission.

<StackSnippet snippet="submit" />

As you add configuration information about your integration to the submission page, the indicators in the top right show your progress towards 100% completion.

You must include all required information before you can click **Submit for Review** to move your integration into the submission phase.


## Update your published integration

If you need to make protocol changes to your integration that is already published in the OIN catalog, you can visit the [OIN Manager](https://oinmanager.okta.com/) and create an updated version of the integration.

Similarly, when you enable a new capability in your application (for example, adding SCIM provisioning onto an existing published SAML application), you don't need to create an entirely new submission. You can update your existing submission to enable and specify the settings for that protocol, then submit the updated integration.

1. Sign in to the OIN Manager using the credentials for your original dev org.
    >**Note:** You must submit the updated integration using the same dev org that was used to make the original submission, otherwise the Okta OIN team rejects the update.
1. The published integration appears on your integrations page. Click **Update**.

    This creates a new instance of your integration where you can safely change any of the parameters. Your existing integration remains in the OIN catalog and keeps the previous settings until this new version is published.
1. Update any of the parameters for your existing protocols or add a new protocol depending on your needs.

    If you need to leave your in-progress submission at any point, you can return to it through the OIN Manager. When you sign on again, the published version and your in-progress version appears. Click **Edit** on the in-progress version to pick up where you left off.
1. When you complete the updates or fill in the new protocol information so that the indicator shows 100% complete, you can click **Submit for Review**.

    At this point, the Okta OIN team is notified and your submission undergoes the same process flow as the original submission.

    After the new version of the integration reaches the **Publish** stage and is published by Okta, the new version replaces the old one in the OIN catalog.

>**Note:** You can have a maximum of 10 submissions for any development org in the OIN Manager.

## Delete draft submissions

There are two scenarios where you need to delete a draft submission:

1. You have 10 draft submissions, which is the maximum number permitted in the OIN Manager.
1. You have decided against completing a draft submission and want to remove it.

In either of these scenarios, the OIN Manager provides a method to delete unpublished submissions. For instructions on how to delete app integrations that are already published in the OIN catalog, see [Delete published submissions](#delete-published-submissions).

You can only delete unpublished submissions that are in **DRAFT** state.

To delete your submission:

1. Click the delete icon ![trash can; delete icon](/img/icons/delete_can.png) beside the **Edit** button. If the delete icon is unavailable, that submission can't be deleted.
1. Confirm the deletion in the dialog box.

No email confirmation is sent when deleting a submission. Deleted submissions can't be recovered.

If you need assistance with deleting a draft submission, contact the Okta OIN team at <oin@okta.com>.

## Delete published submissions

If you want to remove an app integration that is already published to the OIN catalog, this change must be processed by the Okta OIN team. Send an email to <oin@okta.com> with the URL of your dev org, the name of the app integration, and a link to its location in the OIN catalog.

Removing an app integration from the OIN doesn't prohibit existing users from accessing it. The app integration won't be removed from end-user dashboards until an admin for the customer's org removes the app integration from the org.

Finally, if you intend to remove your back-end application support for the Okta app integration, alert your customer admins about the change and if you are deploying a replacement solution.

## See also 

* [SAML - Frequently Asked Questions](/docs/concepts/saml/faqs/)
* [SCIM - Frequently Asked Questions](/docs/concepts/scim/faqs/)
