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
* The [Okta Developer Edition org](https://developer.okta.com/signup/) from where you originally submitted your published integration. The OIN Wizard is only available in Okta Developer Edition orgs.
* An admin user in the Okta Developer Edition org with either the super admin or the app and org admin roles

---

## Overview

If you have a published Single Sign-On (SSO) or lifecycle management integration in the [OIN catalog](https://www.okta.com/integrations/), you can update and resubmit it with the OIN Wizard.

The OIN Wizard currently supports updates for integrations that use the following protocols:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

* [Security Assertion Markup Language (SAML) 2.0](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

* [System for Cross-domain Identity Management (SCIM) 2.0](https://scim.cloud)

> **Note:** You can update OIDC, SAML 2.0, and SCIM 2.0 integrations with the [OIN Wizard](/docs/guides/update-oin-app/) that were originally submitted through the [OIN Manager](/docs/guides/submit-app/).

When you edit a published OIN integration, you need to test the flows for the updated version and the published version for backwards compatibility. The integration version that was previously installed in your customer's org isn't modified with the updated version in the OIN catalog. Testing the published version for backwards compatibility ensures that your integration still works for customers who have already installed it. See [Update integration considerations](#update-integration-considerations) before you edit your published integration.

After you successfully test the updated and published versions of your integration, resubmit it to the OIN team. Your integration goes through a [submission review process](/docs/guides/submit-app-overview/#understand-the-submission-review-process) before the updated version is published in the OIN catalog.

## Update integration considerations

For published integrations that were migrated from the OIN Manager, if you need to update configured properties that aren't available the OIN Wizard, contact <oin@okta.com>.

> **Note:** Some considerations on this page are specifically for the **<StackSnippet snippet="protocol-name" inline/>** protocol. <br>
> If you want to change the protocol details on this page, select the protocol from the **Instructions for** dropdown list on the right.

<StackSnippet snippet="considerations" />

* When you update an integration that's already published, be mindful to preserve backwards compatibility for your integration. Older instances of your integration could be in use by Okta customers.

    * If you modify the **Name** (`name`) property of your [integration variables](/docs/guides/submit-oin-app/-/main/#integration-variables), Okta removes the original variable and creates a variable with your updated name. This action negatively impacts your existing customers if you use the original variable in your integration dynamic properties.

    * Migrated published integrations from the OIN Manager don't have some OIN Wizard restrictions. For instance:

        * Published integrations can have more than three integration variables
        * Published integrations can have variable names with uppercase letters
        * Published integrations can use `http` (instead of enforced `https`) in URLs and Expression Language-supported properties

    * If your update introduces new variables and you're using dynamic URLs, ensure that your tests cover various scenarios with different possible values for those variables. See [Dynamic properties with Okta Expression Language](/docs/guides/submit-oin-app/-/main/#dynamic-properties-with-okta-expression-language). The newly introduced variables aren't populated for older instances of your integration.

        For example:

       <StackSnippet snippet="backward-compatible-eg" />

## Update your integration

> **Note:** When you edit your published OIN integration, your previous PUBLISHED status and date are overwritten with the DRAFT status and current date.

To update a previously published OIN integration:

1. Sign in to your Okta Developer Edition org as a user with either app admin or super admin roles.
   > **Note:** Edit your integration from an Okta account that has your company domain in the email address. You can't use an account with a personal email address. The OIN team doesn't review submission edits from a personal email account.
1. In the Admin Console, go to **Applications** > **Your OIN Integrations**.

   > **Note:** If you don't need to edit your submission and want to jump to testing, see [Navigate directly to test your integration](/docs/guides/submit-oin-app/-/main/#navigate-directly-to-test-your-integration).

1. Click your published integration to update from the dashboard. Your published OIN submission appears in read-only mode.
1. From the **This integration is read-only** information box, click **Edit integration**.
    > **Note:** If you open a submission in **DRAFT** status, it's not in read-only mode and the **Edit integration** option isn't available.

    Continue to edit your draft submission as a new submission. See [Start a submission](#start-a-submission).
1. If the OIN Wizard doesn't detect an instance to test your published integration in the org, then an **Application instance not detected** dialog appears. Click **Generate instance** to create an app instance based on your published OIN integration. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) to create an instance for backwards-compatibility testing.
    > **Note:** The **Generate instance** option is disabled if you have five active instances in your org. [Deactivate instances](#deactivate-an-app-instance-in-your-org) that you're not using.

    If the OIN Wizard detects an instance based on your published integration, the dialog doesn't appear. This is usually the case if you tested and submitted your published integration from the same org.

1. Continue to update your integration in the **Select protocol**, **Configure your integration**, and **Test integration** pages. See [Update integration considerations](#update-integration-considerations) for backwards compatibility with integration variables.

    The **Required app instances** box contains the following items:
    * The instances that you need to test the **PUBLISHED VERSION** of your OIN integration.
    * The instances that you need to test the **CURRENT VERSION** of your integration submission.

    See [Required app instances](#required-app-instances).
    > **Note:** If the OIN Submission Tester session expired, click **Refresh tester session** for a new test session.

   Backwards-compatible test instances that were generated from your published integration appear in the **Application instances for testing** list.

1. Click **Generate Instance** to create an instance required for the **CURRENT VERSION** from the **Required app instances** status box.

    See [Generate an instance for testing](#generate-an-instance-for) to create instances for your current submission.
    > **Note:** There's a maximum of five active app instances allowed in a Developer Edition org. Deactivate any instances that you don't need for testing.

1. Test your integration protocol:

    * For SSO testing, click **Add to Tester** for each required test instance. See [Add to Tester](#add-to-tester).<br> The required tests appear for each test instance. Run your tests from the OIN Submission Tester. See [OIN Submission Tester](#oin-submission-tester). If you encounter errors, see [Failed tests](#failed-tests) for help with resolving the issues.

    * For SCIM testing, see [Test your SCIM integration](#test-your-scim-integration) for all the test requirements.

1. [Submit your updates](#submit-your-updates) if all your tests passed.



## Submit your updates

After you successfully test your updated integration, you're ready to submit.

The OIN Wizard checks the following for SSO submissions:

* All required instances are detected.
* All required instances are active.
* All required tests passed within the last 48 hours.

The OIN Wizard checks the following for SCIM submissions:

* All required instances are detected.
* All required instances are active.
* The **Link to Runscope spec test results** field is specified.
* The **Link to Runscope CRUD test results** field is specified.

> **Note:** See [Test your SCIM integration](#test-your-scim-integration) for SCIM submission requirements.

**Submit integration** is enabled after all these requirements are met.

1. Select **I certify that I have successfully completed required tests**.
1. Click **Submit integration** to submit your integration.
1. Click **Close wizard**.
    The **Your OIN Integration** dashboard appears.

After you submit your integration, your integration is queued for OIN initial review. Okta sends you an email with the expected initial review completion date.

The OIN review process consists of two phases:

1. The initial review phase
1. The QA testing phase

Okta sends you an email at each phase of the process to inform you of the status, the expected phase completion date, and any issues for you to fix. If there are issues with your integration, make the necessary corrections and resubmit in the OIN Wizard.

> **Note:** Sometimes, your fix doesn't include OIN Wizard edits to your integration submission. In this case, inform the OIN team of your fix so that they can continue QA testing.

Check the status of your submission on the **Your OIN Integrations** dashboard.

See [Understand the submission review process](/docs/guides/submit-app-overview/#understand-the-submission-review-process).

## Submission support

If you need help during your submission, Okta provides the following support stream for the various phases of your OIN submission:

1. Building an integration phase

    * When you're constructing your SSO app integration, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.

1. Using the OIN Wizard to submit an integration phase

    * If you need help with the OIN Wizard, review this document or see [Publish an OIN integration](/docs/guides/submit-app-overview/).
    * Submit your OIN Wizard question to <developers@okta.com> if you can't find an answer in the documentation.
    * If you have an integration status issue, contact <oin@okta.com>.

1. Testing an integration phase

    * If you have issues during your integration testing phase, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.

