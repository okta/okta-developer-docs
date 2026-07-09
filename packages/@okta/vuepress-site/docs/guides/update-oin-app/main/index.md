---
title: Update a published integration with the OIN Wizard
meta:
  - name: description
    content: Learn how to update your published integration in the Okta Integration Network (OIN). You can make updates and resubmit your integration in the OIN Wizard. The OIN team reviews your submission and updates the OIN catalog after your integration has been verified.
layout: Guides
---

Learn how to update an existing integration with SSO, Universal Logout, provisioning, Entitlement Management, API service, or Identity Verification (IDV) capabilities in the Okta Integration Network (OIN) using the OIN Wizard.

---

#### What you need

* A published OIDC, SAML 2.0, SCIM, API Integration Action, API service, or Identity Verification (IDV) integration in the OIN.
* The [Okta Integrator Free Plan org](https://developer.okta.com/signup/) from where you originally submitted your published integration. The OIN Wizard is only available in Integrator Free Plan orgs.
* An admin user in the Integrator Free Plan org with either the super admin or the app and org admin roles.

---

## Overview

If you've a published Single Sign-On (SSO), lifecycle management, provisioning, Entitlement Management, API service, or IDV integration in the [OIN catalog](https://www.okta.com/integrations/), you can update and resubmit it with the OIN Wizard.

The OIN Wizard currently supports updates for integrations that use the following protocols or tools:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

* [Security Assertion Markup Language (SAML) 2.0](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

* [System for Cross-domain Identity Management (SCIM) 2.0](https://scim.cloud)

* [Universal Logout](https://developer.okta.com/docs/guides/oin-universal-logout-overview/)

* [Entitlement Management](https://developer.okta.com/docs/guides/scim-with-entitlements/main/)

* [API service integration](/docs/guides/oin-api-service-overview/)

> **Note:** You can use the [OIN Wizard](/docs/guides/update-oin-app/) to update OIDC, SAML 2.0, SCIM 2.0, API service, or IDV integrations that were originally submitted through the [OIN Manager](/docs/guides/submit-app/).

> **Note:** You can use the [OIN Wizard](/docs/guides/update-oin-app/) to update OIDC, SAML 2.0, SCIM 2.0, and API service integrations that were originally submitted through the [OIN Manager](/docs/guides/submit-app/).
* Identity Proofing (Identity Verification integration)

There are two types of updates you can make to a published OIN integration:

* Catalog information only - Update your app listing details such as name, logo, description, or contact information without requiring functional configuration changes or testing.

* Functional configuration - Update functional settings such as SAML configurations, SCIM provisioning, URLs, or other integration capabilities. This update type requires testing and backward compatibility verification.

After you successfully test the updated and published versions of your integration, resubmit your integration to the OIN team. Your integration goes through a [submission review process](/docs/guides/submit-app-overview/#understand-the-submission-review-process) before the updated version is published in the OIN catalog.

## Update integration considerations

### Update catalog information only

Update catalog information independently to keep your listing accurate without requiring engineering resources.

To edit the catalog information directly, go to the **Home** page, locate the **Your apps** section, click **Edit** next to the app you want to modify, and select **Catalog Info**. Use this streamlined workflow to update the following catalog fields:

- App name
- Logo
- App description
- Contact information

When you modify only the preceding catalog fields on a published integration, the OIN Wizard bypasses configuration and testing. A confirmation dialog appears for you to submit your changes. Your submission goes directly to the OIN team. Your app displays an in-review status in **Your apps** section. Your changes are tracked through an automated operations ticket and deployed upon OIN Ops team approval. The live version remains active in the public OIN catalog during this review.

If your update includes changes to functional configurations such as SAML settings, SCIM provisioning, or URLs, you must select the **Edit** >  **Integration** option instead of **Edit** > **Catalog Info** and complete the full end-to-end testing Workflow.

### Functional configuration considerations

To update functional settings for your published app, you can use either of the following navigation paths:

- Go to the **Home** page, locate the **Your apps** section, click **Edit** next to the app, and select **Integration**.
- Go to **Applications > Your OIN Integrations**, click your published integration, and select the standard editing option.

Review the following guidelines before you edit and resubmit your configurations:

> **Note:** Some considerations on this page are specifically for the **<StackSnippet snippet="protocol-name" inline/>**. <br>
> If you want to change the instructions that you see on this page, select a different option from the **Instructions for** dropdown list.

When you update an integration that's already published, be mindful to preserve backward compatibility for customer that have installed your integration before your latest update.

* If you modify the **Name** (`name`) property of your [tenant settings](/docs/guides/submit-oin-app/openidconnect/main/#tenant-settings), Okta removes the original variable and creates a variable with your updated name. This action negatively impacts your existing customers if you use the original variable in your integration dynamic properties.

* If your update introduces new variables and you're using dynamic URLs, ensure that your tests cover various scenarios with different possible values for those variables. The newly introduced variables aren't populated for older instances of your integration.

    <StackSnippet snippet="backward-compatible-eg" />

<StackSnippet snippet="considerations" />

## Update your integration

> **Notes:**
>- This section applies only to functional updates. For updating catalog information only, see, [Update catalog information only](#update-catalog-information-only).<br>
>- When you edit your published OIN integration, your previous PUBLISHED status and date are overwritten with the DRAFT status and current date.
</br><StackSnippet snippet="express-submission-note" inline/>

Update catalog information independently to keep your listing accurate without requiring engineering resources or going through the full testing workflow.

To update only your app's catalog listing:

1. In the Admin Console, go to **Applications** > **Your OIN Integrations**.

2. Locate your published integration in the **Your apps** section.

3. Click **Edit** next to the app, and then select **Catalog Info**.

Use this streamlined workflow to update the following catalog fields:

- App name
- Logo
- App description
- Contact information

When you modify only these catalog fields on a published integration, the OIN Wizard bypasses configuration and testing. A confirmation dialog appears for you to submit your changes. Your submission goes directly to the OIN team. Your app displays an in-review status in **Your apps** section. Your changes are tracked through an automated operations ticket and deployed upon OIN Ops team approval. The live version remains active in the public OIN catalog during this review.

### Update functional configuration

> **Notes:**</br>
> When you edit your published OIN integration, your previous PUBLISHED status and date are overwritten with the DRAFT status and current date.
</br><StackSnippet snippet="express-submission-note" inline/>

1. Sign in to your Integrator Free Plan org as a user with either app admin or super admin roles.

   > **Note:** Edit your integration from an Okta account that has your company domain in the email address. You can't use an account with a personal email address. The OIN team doesn't review submission edits from a personal email account.

1. Go to your published integration using one of the following paths:

    - Go to the **Home** page, locate the **Your apps** section, click **Edit** next to the app, and select **Integration**.
    - Go to **Applications > Your OIN Integrations**, click your published integration, and select the standard editing option.

   > **Note:** If you have a draft submission and want to go straight to testing, see [Navigate directly to test your integration](/docs/guides/submit-oin-app/openidconnect/main/#navigate-directly-to-test-your-integration).

1. From the **This integration is read-only** information box, click **Edit integration**. The **Add integration capabilities** page appears.

    > **Note:** You can skip this step if your submission is in draft status. The **Edit integration** option isn't available for submissions in draft status because it's not in read-only mode.

    <StackSnippet snippet="detect-old-instance" />

1. Click **Add integration details**. The **OIN catalog properties** page appears.

1. Proceed to update your integration as required in the following sections of the OIN Wizard:

   <StackSnippet snippet="edit-links" />

1. Click **Test your integration** to save your updates and move to the testing section of the OIN Wizard.

## Test integration updates

>**Note:** This section applies only to functional updates. When updating catalog information only, the OIN Wizard bypasses testing and proceeds directly to submission.

The OIN Wizard journey includes the **Test integration** experience page to help you configure and test your updated integration within the same org before submission. These are the tasks that you need to complete:

<StackSnippet snippet="test-steps" />
<br>

See [Submit your updated integration](#submit-your-updates) after all required tests are successful.

> **Note:** Test steps on this page are specifically for the **<StackSnippet snippet="protocol-name" inline/>**.<br>
> If you want to change the instructions that you see on this page, select a different option from the **Instructions for** dropdown list.

### Generate instances for testing

Generate instances for testing your updates directly from the OIN Wizard. See [Required app instances](#required-app-instances) in the OIN Wizard for the instances that you need to generate.

#### Required app instances

<StackSnippet snippet="required-app-instances" />

#### Generate an instance

<StackSnippet snippet="generate-instance" />

### Test your integration

<StackSnippet snippet="test-instance" />

## Submit your updates

>**Note:** This section applies only to functional updates. Catalog information only updates are submitted directly without configuration or testing.

After you successfully test your updated integration, you're ready to submit.

<StackSnippet snippet="submit-checks" />
<br>

**Submit integration** is enabled after all these requirements are met.

1. Select **I certify that I have successfully completed required tests**.
1. Click **Submit integration** to submit your integration.
1. Click **Close wizard**.
    The **Your OIN Integration** dashboard appears.

After you submit your integration, your integration is queued for OIN initial review. Okta sends you an email with the expected initial review completion date.

Check the status of your submission on the **Your OIN Integrations** dashboard. See [Understand the submission review process](/docs/guides/submit-app-overview/#understand-the-submission-review-process).

## Submission support

If you need help during your submission, Okta provides the following support:

* If you need help with the OIN Wizard, review this document or see [Publish an OIN integration](/docs/guides/submit-app-overview/).

* Submit your OIN Wizard question to <developers@okta.com> if you can't find an answer in the documentation.

* If you have issues during your integration testing phase, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.

* If you have an integration status issue, contact <oin@okta.com>.
