---
title: Submit an LCM integration with the OIN Manager
meta:
  - name: description
    content: Use this guide to learn how to submit your Okta Lifecycle management integration for publication with the Okta Integration Network (OIN) Manager.
layout: Guides
---

Use this guide to understand the process of submitting a lifecycle management (LCM) integration to the Okta Integration Network (OIN) using the OIN Manager. You can submit a Workflows connector LCM integration. This guide also shows you how to update a previously published LCM integration or delete a draft submission.

> **Note:** As of release 2024.11.0, you can't submit new SCIM integrations using the OIN Manager. Use the new [OIN Wizard](/docs/guides/submit-oin-app/scim/main/) for a seamless ISV submission experience.
> Any integration submitted through the OIN Manager that has not yet begun the review process with the OIN team needs to be resubmitted in the OIN Wizard.
> If you need to update a SCIM integration, see [Update your integration](/docs/guides/submit-oin-app/scim/main/#update-your-integration).

---

#### Learning outcomes

* Understand how to submit a new LCM integration to the OIN
* Understand how to update or delete a previously published integration

#### What you need

* A functional LCM integration created and tested in accordance with one of the following guides:
   * [Build a SCIM provisioning integration](/docs/guides/scim-provisioning-integration-overview/)
   * [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder)

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

---

## Overview

The [Okta Integration Network (OIN) Manager](https://oinmanager.okta.com) is a submission tool that's connected to your developer org where you test and develop your Okta integration. Use this tool to submit your lifecycle management (LCM) app integration for verification and publication in the OIN catalog.

### Protocols supported

This guide covers submissions that use one of these protocols or tools:

* [System for Cross-domain Identity Management (SCIM)](https://scim.cloud)

* [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder)

### Submission support

If you need help during the submission process, use the **Get Support** section on the My App Integrations page after you sign in to the [OIN Manager](https://oinmanager.okta.com). This section provides the following resources from the [Okta developer portal](https://developer.okta.com/):

* OIN integration guides
* Okta, OIDC, SAML, and SCIM concepts
* A search tool to find articles in the Okta developer portal

If you have questions or need more support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

> **Note:** All integrations in the OIN catalog are public. If you want to create a private integration for an app that uses SCIM, then use the [SCIM App Integration Wizard](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-scim). <br>
> You can also use the following template integrations from the OIN if they meet your app SCIM capabilities:
> * [SCIM 1.1 test apps](https://www.okta.com/integrations/?search=SCIM%201.1%20test%20app) for SCIM 1.1
> * [SCIM 2.0 test apps](https://www.okta.com/integrations/?search=SCIM%202.0%20Test%20App) for SCIM 2.0
> * [SCIM 1.1 Test App(Header Auth)](https://www.okta.com/integrations/scim-1-1-test-app-header-auth/) for SCIM 1.1 apps that use custom header expression for Header Auth
> * [SCIM 2.0 Test App(Header Auth)](https://www.okta.com/integrations/scim-2-0-test-app-header-auth/) for SCIM 2.0 apps that use custom header expression for Header Auth
> See [Add a private SCIM integration](/docs/guides/scim-provisioning-integration-connect/main/).

## Submit an integration

> **Note:** As of release 2024.11.0, you can't submit new SCIM integrations using the OIN Manager. Use the new [OIN Wizard](/docs/guides/submit-oin-app/scim/main/) for a seamless ISV submission experience. Any integration submitted through the OIN Manager that has not yet begun the review process with the OIN team needs to be resubmitted in the OIN Wizard.

Review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission.

Start your integration submission:

1. Open the [OIN Manager](https://oinmanager.okta.com) and click **Start Submission Form**.

1. Sign in to the OIN Manager with your Okta developer org credentials. Ensure that this org contains your developed app integration for submission.

1. Click **Add New Submission**.

1. Click **View** beside the name of your integration if you want to review an in-progress submission.

    > **Note:** If you need to update an integration, see [Update your published integration](#update-your-published-integration).

1. Begin defining your submission by specifying details in the [General Settings](#configure-general-settings) and [protocol or tool-specific](#configure-protocol-or-tool-specific-settings) tabs.

### Configure general settings

On the **General Settings** tab, fill in the basic information about your integration:

#### App information

* **Does your app exist in the OIN?**: Indicate if your integration exists in the OIN.

   * If your integration exists in the OIN, provide the **Existing OIN app name** so that the Okta OIN team can locate it.

   * **What changes are you making to the existing OIN integration?**: If your integration exists in the OIN, summarize the changes that you're requesting in your update. This summary helps the Okta OIN team address your changes.

* **App name**: Provide a name for your integration. This is the main title used for your integration in the OIN.

* **App website**:  Provide a link to your product or service homepage or a specific location on your website where users can learn more about your integration.

* **Use case(s)**: Specify one or more use cases for Okta to categorize your integration in the OIN catalog. Click **+ Add Another** to choose up to five use cases. See [Use case guidelines](/docs/guides/submit-app-prereq/main/#use-case-guidelines).

* **App description**: Give a general description of your app and what the Okta integration does. See [App description guidelines](/docs/guides/submit-app-prereq/main/#app-description-guidelines).

* **App icon**: Upload a PNG, JPG, or GIF file of a logo to accompany your integration in the catalog. The logo file must be less than one MB. See [Logo guidelines](/docs/guides/submit-app-prereq/main/#logo-guidelines).

#### Customer support

* **Support contacts**: Include one or more public contact points for users who need assistance with your integration. You can also add a link to an FAQ or a troubleshooting guide. Use the dropdown menu to specify if you're adding an email, a URL, or a phone number. Click **+ Add Another** to add another contact. Okta shares this information with customers in the OIN catalog description for your app integration.

* **Escalation support contact**: This is an email distribution list for Okta to use when contacting your company about your integration. Okta can use this escalation contact in an emergency, so make sure that the contact provided here isn't a generic contact, such as `support@example.com` or a 1-800 number. This contact information isn't shared with customers.

See [Customer support contact guidelines](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines).

#### Test account

The Okta OIN team requires a dedicated account in your app to run their tests. Ensure that this test account is active beyond the submission period in case Okta needs to update or troubleshoot your app integration. See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

* **Test account URL**: This is a static URL to sign in to your app. An Okta OIN team member goes to this URL and uses the account credentials you provide in the subsequent fields to sign in to your app.

* **Test account username or email**: The username for your app test account. The Okta OIN team signs in with this username to run tests. The preferred account username is `isvtest@okta.com`.

* **Test account password**: The password for your app test account.

* **Additional instructions**: Include any other information that you think the Okta OIN team needs to know about your integration, the test account, or the testing configuration.

### Configure protocol or tool-specific settings

You can submit protocol support details all together or asynchronously. For example, if your app currently only supports SCIM, you can create the submission with the SCIM protocol details. Later, when you add Workflows connector capabilities to your app, you can return to your integration submission to include Workflows connector support.

> **Note:** If you don't see the protocol or tool-specific settings that you want in this section, select the **Instructions for** dropdown menu on this page.

<StackSnippet snippet="protocol-name" />

<StackSnippet snippet="submit" />

<br>

As you add configuration information about your integration to the submission page, the indicators in the top right show your progress towards 100% completion.

Include all required information before you click **Submit for Review** to move your integration into the submission phase.

## Update your published integration

If you need to make changes to your published LCM integration, use the [OIN Manager](https://oinmanager.okta.com/) to create an updated version of the integration.

Similarly, when you enable a new capability in your app, you don't need to create an entirely new submission. For example, you can add a Workflows connector feature onto an existing published SCIM integration. You can update your existing submission to enable and specify the settings for that protocol, then submit the updated integration.

> **Note:** As of release 2024.11.0, use the OIN Wizard to [edit your published SCIM integration](/docs/guides/submit-oin-app/scim/main/#update-your-integration). Previous SCIM integrations submitted through the OIN Manager are now available through the **Your OIN Integrations** dashboard in the Admin Console.
> Any integration submitted through the OIN Manager that has not yet begun the review process with the OIN team needs to be resubmitted in the OIN Wizard.

1. Sign in to the OIN Manager using the credentials for your original dev org.

    >**Note:** Submit the updated integration using the same dev org that was used to make the original submission, otherwise the Okta OIN team rejects the update.

   The published integration appears on your integrations page.

1. Click **Update**.

    This creates an instance of your integration where you can safely change any of the parameters. Your existing integration remains in the OIN catalog and keeps the previous settings until this new version is published.

1. Update any of the parameters for your existing protocols or add a protocol depending on your needs.

    If you need to leave your in-progress submission at any point, you can return to it through the OIN Manager. When you sign in again, the published version and your in-progress version appear. Click **Edit** on the in-progress version to continue.

1. Click **Submit for Review** when you complete the updates or fill in the new protocol information. Ensure that the indicator shows 100% complete before you submit.

    At this point, the Okta OIN team is notified and your submission undergoes the same process flow as the original submission.

    Okta publishes the new version of your integration after it reaches the **Publish** stage. The new version replaces the old one in the OIN catalog.

>**Note:** You can have a maximum of 10 submissions for any development org in the OIN Manager.

## Delete draft submissions

There are two scenarios where you need to delete a draft submission:

1. You have 10 draft submissions, which is the maximum number permitted in the OIN Manager.
1. You've decided against completing a draft submission and want to remove it.

In either of these scenarios, the OIN Manager provides a method to delete unpublished submissions. For instructions on how to delete app integrations that are already published in the OIN catalog, see [Delete published submissions](#delete-published-submissions).

You can only delete unpublished submissions that are in **DRAFT** state.

To delete your submission:

1. Click the delete icon ![trash can; delete icon](/img/icons/delete_can.png) next to **Edit**. If the delete icon is unavailable, you can't delete that submission.
1. Confirm the deletion in the dialog box.

No email confirmation is sent when deleting a submission. Deleted submissions can't be recovered.

If you need assistance with deleting a draft submission, contact the Okta OIN team at <oin@okta.com>.

## Delete published submissions

If you want to remove an app integration that's already published in the OIN catalog, contact the Okta OIN team. Only the Okta OIN team can remove published integrations in the catalog. Send an email to <oin@okta.com> with the URL of your dev org, the name of the app integration, and a link to its location in the OIN catalog.

Removing an app integration from the OIN doesn't prohibit existing users from accessing it. The app integration isn't removed from end-user dashboards until an admin for the customer's org removes the app integration from their org.

Finally, if you intend to remove your back-end app support for your Okta integration, alert your customer admins about the change. Inform your customers if you're deploying a replacement solution.

## See also

<StackSnippet snippet="see-also" />
