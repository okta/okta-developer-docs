---
title: Submit an integration with the OIN Manager
meta:
  - name: description
    content: Use this guide to learn how to submit your integration for publication using the Okta Integration Network (OIN) Manager.
layout: Guides
---

Use this guide to understand the process of submitting Workflows connector and API service integrations to the Okta Integration Network (OIN) using the OIN Manager. This guide also shows you how to update a previously published integration or delete a draft submission.

> **Note:** For SSO or Lifecycle Management (LCM) SCIM integrations, use the [OIN Wizard](/docs/guides/submit-oin-app/scim/main/) for a seamless ISV submission experience. Previously submitted SSO and LCM SCIM integrations from the OIN Manager have been migrated to the OIN Wizard. You can edit these published integrations directly in the OIN Wizard and resubmit them to the OIN team. See [Update your integration](/docs/guides/submit-oin-app/scim/main/#update-your-integration).

---

#### Learning outcomes

* Understand how to submit a new Workflows connector integration to the OIN
* Understand how to submit a new API service integration to the OIN
* Understand how to update or delete a previously published integration with the OIN Manager

#### What you need

* A functional integration created and tested in accordance with the [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) or the [Build an API service integration](/docs/guides/build-api-integration/main/guide)

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

---

## Overview

The [Okta Integration Network (OIN) Manager](https://oinmanager.okta.com) is a submission tool that's connected to your Okta Developer Edition org where you build your Okta integration. Use this tool to submit your integration for verification and publication in the OIN catalog.

### Protocols supported

This guide covers the following submissions:

* Integrations that use the [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder)
* Service app integrations that access your customer tenants through Okta APIs using OAuth 2.0

### Submission support

If you need help during the submission process, use the **Get Support** section on the **My App Integrations** page after you sign in to the [OIN Manager](https://oinmanager.okta.com). This section provides the following resources from the [Okta Developer Portal](https://developer.okta.com/):

* OIN integration guides
* Okta concepts
* A search tool to find articles in the Okta Developer Portal

If you have questions or need more support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

## Submit an integration

> **Note:** As of release 2024.11.0, you can't submit SCIM integrations using the OIN Manager. Use the [OIN Wizard](/docs/guides/submit-oin-app/scim/main/) for a seamless ISV submission experience. If you submitted a SCIM integration through the OIN Manager and the OIN review process hasn't started, resubmitted it in the OIN Wizard.

Review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission.

Start your integration submission:

1. Open the [OIN Manager](https://oinmanager.okta.com) and click **Start Submission Form**.

1. Sign in to the OIN Manager with your Okta developer org credentials. Ensure that this org contains your app integration for submission.

1. Click **Add New Submission**.

1. Click **View** beside the name of your integration if you want to review an in-progress submission.

    > **Note:** If you need to update an integration, see [Update your published integration](#update-your-published-integration).

1. Define your submission by specifying details in the [General Settings](#configure-general-settings) and [integration type](#configure-integration-type-settings) tabs.

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

* **Escalation support contact**: This is an email distribution list for Okta to use when contacting your company about your integration. Okta can use this escalation contact in an emergency, so make sure that the contact provided here isn't a generic contact, such as `support@example.com` or a 1–800 number. This contact information isn't shared with customers.

See [Customer support contact guidelines](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines).

#### Test account

The Okta OIN team requires a dedicated account in your app to run their tests. Ensure that this test account is active during the submission review period for Okta to test and troubleshoot your integration. After your integration is verified by Okta and published in the OIN, delete or deactivate your app test account within 30 days. See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

* **Test account URL**: This is a static URL to sign in to your app. An Okta OIN team member goes to this URL and uses the account credentials you provide in the subsequent fields to sign in to your app.

* **Test account username or email**: The username for your app test account. The Okta OIN team signs in with this username to run tests. The preferred account username is `isvtest@okta.com`.

* **Test account password**: The password for your app test account.

* **Additional instructions**: Include any other information that you think the Okta OIN team needs to know about your integration, the test account, or the testing configuration.

### Configure integration type settings

> **Note:** The instructions on this page are for a **<StackSnippet snippet="protocol-name" inline/>** submission. If you want to change the submission instructions on this page, select the option you want from the **Instructions for** dropdown list on the right.

### <StackSnippet snippet="protocol-name" />

<StackSnippet snippet="submit" />

<br>

As you add configuration information about your integration to the submission page, the indicators on the top right show your progress towards 100% completion.

Include all required information before you click **Submit for Review** to move your integration into the submission phase.

## Update your published integration

If you need to edit your published integration, use the [OIN Manager](https://oinmanager.okta.com/) to create an updated version of the integration.

> **Note:** As of release 2024.11.0, use the OIN Wizard to [edit your published SCIM integration](/docs/guides/submit-oin-app/scim/main/#update-your-integration). Previous SCIM integrations submitted through the OIN Manager are now available through the **Your OIN Integrations** dashboard in the Admin Console.
> If you submitted a SCIM integration through the OIN Manager and the OIN review process hasn't started, resubmitted it in the OIN Wizard.

1. Sign in to the OIN Manager using the credentials for your original developer org.

    >**Note:** Submit the updated integration using the same developer org that was used to make the original submission, otherwise the Okta OIN team rejects the update.

   The published integration appears on your integrations page.

1. Click **Update**.

    This creates an instance of your integration submission where you can safely change any of the parameters. Your existing integration remains in the OIN catalog and keeps the previous settings until this new version is published.

1. Update any parameters for your existing integration.

    If you need to leave your in-progress submission at any point, you can return to it through the OIN Manager. When you sign in again, the published version and your in-progress version appear. Click **Edit** on the in-progress version to continue.

1. Click **Submit for Review** when you complete the updates or fill in the new protocol information. Ensure that the indicator shows 100% complete before you submit.

    At this point, the Okta OIN team is notified and your submission undergoes the same process flow as the original submission.

    Okta publishes the new version of your integration after it reaches the **Publish** stage. The new version replaces the old one in the OIN catalog.

>**Note:** You can have a maximum of 10 submissions for any Okta Developer Edition org in the OIN Manager.

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

If you want to remove an app integration that's already published in the OIN catalog, contact the Okta OIN team. Only the Okta OIN team can remove published integrations in the catalog. Send an email to <oin@okta.com> with the URL of your developer org, the name of the app integration, and a link to its location in the OIN catalog.

Removing an app integration from the OIN doesn't prohibit existing users from accessing it. The app integration isn't removed from End-User Dashboards until an admin for the customer's org removes the app integration from their org.

Finally, if you intend to remove your back-end app support for your Okta integration, alert your customer admins about the change. Inform your customers if you're deploying a replacement solution.

## See also

<StackSnippet snippet="see-also" />
