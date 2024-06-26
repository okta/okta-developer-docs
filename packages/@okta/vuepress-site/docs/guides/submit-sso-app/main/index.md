---
title: Submit an SSO integration
meta:
  - name: description
    content: Use this guide to learn how to submit your Okta Single Sign-On (SSO) integration for publication with the Okta Integration Network (OIN) Manager.
layout: Guides
---

<ApiLifecycle access="deprecated" />

> **Deprecated:** As of release 2024.01.0 (Jan 10, 2024), you can't submit new Single Sign-On (SSO) integrations using the OIN Manager. Use the new [OIN Wizard](/docs/guides/submit-oin-app) for a seamless ISV submission experience. Okta is in the process of migrating published integrations from the OIN Manager to the OIN Wizard. If your published integration hasn't been migrated yet, you can still use the OIN Manager to [update integrations](#update-your-published-integration). See [Submission process](/docs/guides/submit-app-overview/#submission-process) for OIN submission guidance.

---

#### Learning outcomes

* Understand how to submit an SSO integration to the Okta Integration Network (OIN) with the OIN Manager.
* Learn how to update or delete a previously published OIN SSO integration with the OIN Manager.

#### What you need

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

---

## Overview

The [Okta Integration Network (OIN) Manager](https://oinmanager.okta.com) is a submission tool that's connected to your developer org where you test and develop your Okta integration. Use this tool to submit your SSO app integration for verification and publication in the OIN catalog.

### Protocols supported

This guide covers submissions that use the following protocols:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

    > **Note:** <br>
    > * To support the potentially large number of Okta orgs that access an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.
    > * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

    > **Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

> **Note:** SWA app integrations are no longer accepted for publication in the OIN catalog. However, the OIN team still maintains existing SWA apps.

### Submission support

If you need help during the submission process, use the **Get Support** section on the My App Integrations page after you sign in to the [OIN Manager](https://oinmanager.okta.com). This section provides the following resources from the [Okta developer portal](https://developer.okta.com/):

* OIN integration guides
* Okta, OIDC, SAML, and SCIM concepts
* A search tool to find articles in the Okta developer portal

If you have questions or need more support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

## Submit an integration

<ApiLifecycle access="deprecated" />

> **Deprecated:** As of release 2024.01.0 (Jan 10, 2024), you can't submit new Single Sign-On (SSO) integrations using the OIN Manager. Use the new [OIN Wizard](/docs/guides/submit-oin-app) for a seamless ISV submission experience.

Review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission.

1. Open the [OIN Manager](https://oinmanager.okta.com) and click **Start Submission Form**.

1. Sign in to the OIN Manager with your Okta development org credentials. Ensure that this org contains your developed app integration for submission.

1. Click **Add New Submission**.

1. Click **View** beside the name of your integration if you want to review an in-progress submission.

    > **Note:** If you need to update an integration, see [Update your published integration](#update-your-published-integration).

1. Begin defining your submission by specifying details in the [General Settings](#configure-general-settings) and [protocol-specific](#configure-protocol-specific-settings) tabs.

### Configure general settings

On the **General Settings** tab, fill in the basic information about your integration:

#### App information

* **Does your app exist in the OIN?**: Indicate if your integration exists in the OIN.

   * If your integration exists in the OIN, provide the **Existing OIN app name** so that the Okta OIN team can locate it.

   * **What changes are you making to the existing OIN integration?**: If your integration exists in the OIN, summarize the changes that you're requesting in your update. This summary helps the Okta OIN team address your changes.

* **App name**: Provide a name for your integration. This is the main title used for your integration in the OIN.

* **App website**: Provide a link to your product or service homepage or a specific location on your website where users can learn more about your integration.

* **Use case(s)**: Specify one or more use cases for Okta to categorize your integration in the OIN catalog. Click **+ Add Another** to choose up to five use cases. See [Use case guidelines](/docs/guides/submit-app-prereq/main/#use-case-guidelines).

* **App description**: Give a general description of your app and what the Okta integration does. See [App description guidelines](/docs/guides/submit-app-prereq/main/#app-description-guidelines).

* **App icon**: Upload a PNG, JPG, or GIF file of a logo to accompany your integration in the catalog. The logo file must be less than one MB. See [Logo guidelines](/docs/guides/submit-app-prereq/main/#logo-guidelines).

#### Customer support

* **Support contacts**: Include one or more public contact points for users who need assistance with your integration. You can also add a link to an FAQ or a troubleshooting guide. Use the dropdown menu to specify if you're adding an email, a URL, or a phone number. Click **+ Add Another** to add another contact. Okta shares this information with customers in the OIN catalog description for your app integration.

* **Escalation support contact**: This is an email distribution list for Okta to use when contacting your company about your integration. Okta can use this escalation contact in an emergency, so make sure that the contact provided here isn't a generic contact, such as `support@example.com` or a 1-800 number. This contact information isn't shared with customers.

See [Customer support contact guidelines](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines).

#### Test account

The Okta OIN team requires a dedicated account on your app to run their tests. Ensure that this test account is active beyond the submission period in case Okta needs to update or troubleshoot your app integration. See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

* **Test account URL**: This is a static URL to sign in to your app. An Okta OIN team member goes to this URL and uses the account credentials that you provide in the subsequent fields to sign in to your app.

* **Test account username or email**: The username for your app test account. The Okta OIN team signs in with this username to run tests. The preferred account username is `isvtest@okta.com`.

* **Test account password**: The password for your app test account

* **Additional instructions**: Include any other information that you think the Okta OIN team needs to know about your integration, the test account, or the testing configuration.

### Configure protocol-specific settings

You can submit protocol support details all together or asynchronously. For example, if your app currently only supports SAML, you can create the submission with the SAML protocol details. Later, when you add Workflows Connector capabilities to your app, you can return to your integration submission to include Workflows Connector support.

>**Note:** If you don't see the protocol-specific settings that you want in this section, select the **Instructions for** dropdown menu on this page.

<StackSnippet snippet="protocol-name" />

<StackSnippet snippet="submit" />

<br>

As you add configuration information about your integration to the submission page, the indicators in the upper-right corner of the page show your progress towards 100% completion.

Include all required information before you click **Submit for Review** to move your integration into the submission phase.

## Update your published integration

> **Note:** Okta is migrating published SSO integrations from the OIN Manager to the OIN Wizard as of release 2024.06.0.
> *  If your published SSO integration was migrated to the OIN Wizard, make updates in the [OIN Wizard](/docs/guides/submit-oin-app/#update-your-integration). A deprecated note appears next to your integration in the OIN Manager. If you edit and submit your migrated integration from the OIN Manager, it won't be reviewed by the OIN team.
> * If your published SSO integration wasn't migrated to the OIN Wizard, it appears as usual in the OIN Manager. Follow the steps in this section to update your published integration in the OIN Manager.

When you enable a new capability in your app, you don't need to create an entirely new submission. For example, you can add SCIM provisioning to an existing published SAML app. You can update your existing submission to enable and specify the settings for that protocol, then submit the updated integration.

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
1. Confirm the deletion in the dialog.

No email confirmation is sent when deleting a submission. You can't recover deleted submissions.

If you need assistance with deleting a draft submission, contact the Okta OIN team at <oin@okta.com>.

## Delete published submissions

If you want to remove an app integration that's already published in the OIN catalog, contact the Okta OIN team. Only the Okta OIN team can remove published integrations in the catalog. Send an email to <oin@okta.com> with the URL of your dev org, the name of the app integration, and a link to its location in the OIN catalog.

Removing an app integration from the OIN doesn't prohibit existing users from accessing it. The app integration isn't removed from end-user dashboards until an admin for the customer's org removes the app integration from their org.

Finally, if you intend to remove your back-end app support for your Okta integration, alert your customer admins about the change. Inform your customers if you're deploying a replacement solution.

## See also

<StackSnippet snippet="see-also" />
