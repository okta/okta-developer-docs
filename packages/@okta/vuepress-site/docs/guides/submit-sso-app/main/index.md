---
title: Submit a SAML SSO integration
meta:
  - name: description
    content: Use this guide to learn how to submit your SAML SSO integration to the Okta Integration Network (OIN) team for publication. The submission task is performed in the Okta Admin Console.
layout: Guides
---

Use this guide to learn how to submit a SAML Single Sign-On (SSO) integration to the Okta Integration Network (OIN) team for publication. This guide also shows you how to create an SSO integration instance for testing in your org.

---

**Learning outcomes**

* Understand how to submit a SAML SSO integration to the OIN
* Understand how to create an integration instance for testing in your org

**What you need**

* An [Okta Developer Edition org](https://developer.okta.com/signup/)

* A functional SAML 2.0 SSO integration created and tested in accordance with the [Build a Single Sign-On integration](/docs/guides/build-sso-integration/) guide

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

---

## Overview

Okta provides you with a seamless experience in the Okta Admin Console to integrate and submit your app for publication in the [Okta Integration Network (OIN)](https://www.okta.com/okta-integration-network/). When you obtain an [Okta Developer-Edition org](https://developer.okta.com/signup/), you can use it as a sandbox playground to explore Okta features. You can create your app integration and add it to your developer-edition org for testing. Once you're satisfied with your tests, you can submit your integration to the OIN team directly from your developer-edition org Admin Console. The OIN team verifies your integration before they publish it in the [OIN catalog](https://www.okta.com/integrations/).

> **Note:** Only cloud-based SaaS apps (either traditional Web applications with a back-end or a modern browser-based SPA) are published in the OIN catalog.

### Protocol supported

This guide covers submissions that use the [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html) protocol for Single Sign-On (SSO).

> **Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

## Submit an integration

You need to review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission. There are artifacts and technical details that you need to provide during the submission process.

> **Note:** For best practices, create two or three additional administrative users in your Okta org to manage the integration. This ensures that your team can access the integration for updates in the future.

To submit an integration for OIN publication:

1. Sign in to your [developer-edition Okta org](/login/) as a user with administrative privileges.
1. Go to **Applications** > **My OIN Integrations** in the Admin Console.
1. Click **Build a new OIN integration**. The Okta Integration Network Wizard appears.
1. From the **Select your protocol** > **Enable Single Sign-On (SSO)** section of the page, select **<StackSnippet snippet="protocol-name" inline/>**.
1. Click **Next: Configure your integration**.
1. Click the **<StackSnippet snippet="protocol-name" inline/> properties** dropdown arrow.
1. Specify the following properties:

   <StackSnippet snippet="protocol-properties" />

1. If you need to specify additional properties for your integration, click **Show Advanced Settings** and specify the advanced properties.
1. Click **Save changes**.
1. Click the **OIN catalog display** dropdown arrow and specify the following OIN catalog properties:

    **General settings**

    | Property/Question | Description  |
    | -------- | ------------ |
    | **Does your app exist in the OIN?** | Indicate if your integration exists in the OIN. |
    | **Existing OIN app name**  | If your integration exists in the OIN, provide the **Existing OIN app name** so that the Okta OIN team can locate it. |
    | **What changes are you making to the existing OIN integration?**  | If your integration exists in the OIN, summarize the changes that you're requesting in your update. This summary helps the Okta OIN team address your changes. |
    | **App name**  | Provide a name for your integration. This is the main title used for your integration in the OIN. |
    | **App website**  | Provide a link to your product or service homepage or a specific location on your website where users can learn more about your integration. |
    | **Use case(s)** | Specify one or more use cases for Okta to categorize your integration in the OIN catalog. Click **+ Add Another** to choose up to five use cases. See [Use case guidelines](/docs/guides/submit-app-prereq/main/#use-case-guidelines). |
    | **App description** | Give a general description of your application and what the Okta integration does. See [App description guidelines](/docs/guides/submit-app-prereq/main/#app-description-guidelines). |
    | **App icon** | Upload a PNG, JPG, or GIF file of a logo to accompany your integration in the catalog. The logo file must be less than one MB. See [Logo guidelines](/docs/guides/submit-app-prereq/main/#logo-guidelines). |

    **Customer support**

    | Property/Question | Description  |
    | -------- | ------------ |
    | **Support contacts** | Include one or more public contact points for users who need assistance with your integration. You can also add a link to an FAQ or a troubleshooting guide. Use the dropdown menu to specify if you're adding an email, a URL, or a phone number. Click **+ Add Another** to add another contact. Okta shares this information with customers in the OIN catalog description for your app integration. |
    | xx | xx |
    | xx | xx |
    | xx | xx |
    | xx | xx |
    | xx | xx |



    * **Escalation support contact**: This is an email distribution list for Okta to use when contacting your company about your integration. Okta can use this escalation contact in an emergency, so make sure that the contact provided here isn't a generic contact, such as `support@example.com` or a 1-800 number. This contact information isn't shared with customers.

    See [Customer support contact guidelines](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines).

    **Test account**

     Property/Question | Description  |
    | -------- | ------------ |
    | xx | xx |
    | xx | xx |
    | xx | xx |


    The Okta OIN team requires a dedicated account on your application to run their tests. Ensure that this test account is active beyond the submission period in case Okta needs to update or troubleshoot your app integration. See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

    * **Test account URL**: This is a static URL to sign in to your application. An Okta OIN team member goes to this URL and uses the account credentials you provide in the subsequent fields to sign in to your application.

    * **Test account username or email**: The username for your application test account. The Okta OIN team signs in with this username to run tests. The preferred account username is `isvtest@okta.com`.

    * **Test account password**: The password for your application test account.

    * **Additional instructions**: Include any other information that you think the Okta OIN team needs to know about your integration, the test account, or the testing configuration.

1. Click **Save changes**.

## Test your integration

From the Okta Integration Network Wizard, click **Next: Test your integration** after you've saved your integration configuration. This action begins testing your integration. You need to test the following flows:

* IdP flow: If your integration supports IdP-initiated SSO
* SP flow: If your integration supports SP-initiated SSO
* Just in time (JIT) flow: If your application supports JIT

### IdP flow test

#### Prepare your instance for an IdP flow

#### Test the IdP flow

### SP flow test

#### Prepare your instance for an SP flow

#### Test the SP flow

Option 1: Direct URL

Option 2: Login page

### JIT flow test

#### Prepare your instance for JIT

#### Test the JIT flow

Option 1

Option 2

## Submit your integration

1. Close the incognito browser window and return to the Test your Okta customer experience page in the App Template Wizard
2. Select the checkbox for “I certify that I have successfully completed the testing phase” and click Submit your integration
3. On the Thank you for your submission confirmation page, select Close wizard

<br>

As you add configuration information about your integration to the submission page, the indicators in the upper-right corner of the page show your progress towards 100% completion.

Include all required information before you click **Submit for Review** to move your integration into the submission phase.

## Update your published integration

If you need to make protocol changes to your published integration, use the [OIN Manager](https://oinmanager.okta.com/) to create an updated version of the integration.

Similarly, when you enable a new capability in your application, you don't need to create an entirely new submission. For example, you can add SCIM provisioning to an existing published SAML application. You can update your existing submission to enable and specify the settings for that protocol, then submit the updated integration.

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

Finally, if you intend to remove your back-end application support for your Okta integration, alert your customer admins about the change. Inform your customers if you're deploying a replacement solution.

> **Note:** If you have questions or need more support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.
