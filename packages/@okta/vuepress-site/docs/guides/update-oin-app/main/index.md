---
title: Update a published integration with the OIN Wizard
meta:
  - name: description
    content: Learn how to update your published integration in the Okta Integration Network (OIN). You can make updates and resubmit your integration in the OIN Wizard. The OIN team reviews your submission and updates the OIN catalog after your integration has been verified.
layout: Guides
---

Learn how to update an OIDC, SAML 2.0, or SCIM 2.0 published integration in the Okta Integration Network (OIN) using the OIN Wizard.

---

#### What you need

* A published OIDC, SAML 2.0, or SCIM integration in the OIN
* The [Okta Integrator Free Plan org](https://developer.okta.com/signup/) from where you originally submitted your published integration. The OIN Wizard is only available in Integrator Free Plan orgs.
* An admin user in the Integrator Free Plan org with either the super admin or the app and org admin roles

---

## Overview

If you have a published Single Sign-On (SSO) or lifecycle management integration in the [OIN catalog](https://www.okta.com/integrations/), you can update and resubmit it with the OIN Wizard.

The OIN Wizard currently supports updates for integrations that use the following protocols:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

* [Security Assertion Markup Language (SAML) 2.0](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

* [System for Cross-domain Identity Management (SCIM) 2.0](https://scim.cloud)

> **Note:** You can also update OIDC, SAML 2.0, and SCIM 2.0 integrations with the [OIN Wizard](/docs/guides/update-oin-app/) that were originally submitted through the [OIN Manager](/docs/guides/submit-app/).

When you edit a published OIN integration, you need to test the flows for the updated version and the published version for backwards compatibility. The integration version that was previously installed in your customer's org isn't modified with the updated version from the OIN catalog. Testing the published version for backwards compatibility ensures that your integration still works for customers who have already installed it. See [Update integration considerations](#update-integration-considerations) before you edit your published integration.

After you successfully test the updated and published versions of your integration, resubmit your integration to the OIN team. Your integration goes through a [submission review process](/docs/guides/submit-app-overview/#understand-the-submission-review-process) before the updated version is published in the OIN catalog.

## Update integration considerations

For published integrations that were migrated from the OIN Manager, if you need to update configured properties that aren't available the OIN Wizard, contact <oin@okta.com>.

> **Note:** Some considerations on this page are specifically for the **<StackSnippet snippet="protocol-name" inline/>** protocol. <br>
> If you want to change the protocol details on this page, select the protocol from the **Instructions for** dropdown list on the right.

<StackSnippet snippet="considerations" />

* When you update an integration that's already published, be mindful to preserve backwards compatibility for your integration. Older instances of your integration could be in use by Okta customers.

    * If you modify the **Name** (`name`) property of your [integration variables](/docs/guides/submit-oin-app/openidconnect/main/#integration-variables), Okta removes the original variable and creates a variable with your updated name. This action negatively impacts your existing customers if you use the original variable in your integration dynamic properties.

    * Migrated published integrations from the OIN Manager don't have some OIN Wizard restrictions. For instance:

        * Published integrations can have more than three integration variables
        * Published integrations can have variable names with uppercase letters
        * Published integrations can use `http` (instead of enforced `https`) in URLs and Expression Language-supported properties

    * If your update introduces new variables and you're using dynamic URLs, ensure that your tests cover various scenarios with different possible values for those variables. The newly introduced variables aren't populated for older instances of your integration.

        For example:

       <StackSnippet snippet="backward-compatible-eg" />

## Update your integration

> **Note:** When you edit your published OIN integration, your previous PUBLISHED status and date are overwritten with the DRAFT status and current date.

To update a previously published OIN integration:

1. Sign in to your Integrator Free Plan org as a user with either app admin or super admin roles.
   > **Note:** Edit your integration from an Okta account that has your company domain in the email address. You can't use an account with a personal email address. The OIN team doesn't review submission edits from a personal email account.

1. In the Admin Console, go to **Applications** > **Your OIN Integrations**.

   > **Note:** If you have a draft submission and want to go straight to testing, see [Navigate directly to test your integration](/docs/guides/submit-oin-app/openidconnect/main/#navigate-directly-to-test-your-integration).

1. Click your published integration to update from the dashboard. Your published OIN submission appears in read-only mode.

1. From the **This integration is read-only** information box, click **Edit integration**.
    > **Note:** You can skip this step if your submission is in draft status. The **Edit integration** option isn't available for submissions in draft status because it's not in read-only mode.

    <StackSnippet snippet="detect-old-instance" />

1. Click **Configure your integration** to proceed to update your integration as required in the following sections of the OIN Wizard:

   <StackSnippet snippet="edit-links" />

1. Click **Test your integration** to save your updates and move to the testing section of the OIN Wizard.

## Test integration updates

The OIN Wizard journey includes the **Test integration** experience page to help you configure and test your updated integration within the same org before submission. These are the tasks that you need to complete:

<StackSnippet snippet="test-steps" />
<br>

See [Submit your updated integration](#submit-your-updates) after all required tests are successful.

> **Note:** Test steps on this page are specifically for the **<StackSnippet snippet="protocol-name" inline/>** protocol. <br>
> If you want to change the protocol details on this page, select the protocol from the **Instructions for** dropdown list on the right.

### Generate instances for testing

Generate instances for testing your updates directly from the OIN Wizard. See [Required app instances](#required-app-instances) in the OIN Wizard for the instances that you need to generate.

#### Required app instances

<StackSnippet snippet="required-app-instances" />

#### Generate an instance

<StackSnippet snippet="generate-instance" />

### Test your integration

<StackSnippet snippet="test-instance" />

## Submit your updates

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
