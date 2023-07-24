---
title: Publish an OIN integration
meta:
  - name: description
    content: Use this guide to understand the OIN submission process. There are variations to the submission process depending on the integration type.
---

The Okta Integration Network (OIN) is the identity industry’s broadest and deepest set of pre-built cloud integrations to manage access management, authentication, and provisioning. By adding your integration to the OIN, you can gain exposure to thousands of Okta customers who can discover your integration and deploy your application to millions of users. OIN integrations speed adoption by simplifying configuration steps and reducing friction for your customers.

If you're an independent software vendor (ISV), Okta customer, or IT system integrator who wants to add their integration to the [Okta Integration Network](https://www.okta.com/integrations/), read this guide for instructions on how to submit your integration.

Adding your integration to the Okta Integration Network is completely free.


## Submission process

After you have built a functioning app integration, a few steps are required to submit it to Okta for review and publication in the OIN:

1. Review the [OIN submission requirements](/docs/guides/submit-app-prereq/) and prepare the various items required during submission. See the following guidelines:
    * [Logo guidelines](/docs/guides/submit-app-prereq/main/#logo-guidelines)
    * [App description guidelines](/docs/guides/submit-app-prereq/main/#app-description-guidelines)
    * [Use case guidelines](/docs/guides/submit-app-prereq/main/#use-case-guidelines)
    * [Customer support contact guidelines](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines)
    * [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines)
    * [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines)

1. [Submit your integration](#submit-an-integration) to Okta through the OIN Manager tool. Your submission must provide Okta with the general and protocol or tool-specific metadata that's required to create a customized integration for publication in the OIN.
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

<div>

![ISV Submission process flow](/img/oin/isv-portal_submission_flow.png)

<!--
Source link : https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3265%3A30940  isv_portal_submission_flow
-->

</div>

## Protocols supported

This guide covers submissions that use one or more of these protocols or tools:

* [System for Cross-domain Identity Management (SCIM)](https://scim.cloud)
* [OpenID Connect (OIDC)](https://openid.net/connect/)

    >**Note:** <br>
    > * To support the potentially large numbers of Okta orgs accessing an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.
    > * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

    >**Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

* [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf)

>**Note:** For submitting API service integrations, see [Build an API service integration](/docs/guides/build-api-integration/).

## Submission support

Getting your app integration in the OIN catalog involves two phases: creating a functional integration and submitting it through the OIN publication process. For each phase in the process, Okta has an associated support stream to assist you.

When you're constructing your Okta integration, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/).

If you need help during the submission process, use the Get Support section on the My App Integrations page after you sign in to the [OIN Manager](https://oinmanager.okta.com). This section provides the following resources from the [Okta developer portal](https://developer.okta.com/):

* OIN integration guides
* Okta, OIDC, SAML, and SCIM concepts
* A search tool to find articles in the Okta developer portal

If you have questions or need additional support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

>**Note:** All integrations in the OIN catalog are public. If you want to submit a request to create a private app integration for an application that uses SCIM 1.1 or Profile Sourcing, or for an application that uses a custom header expression for the Header Auth, then use the [SCIM App Integration Wizard](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-scim) to create your integration and submit your app through the [OIN Manager](https://oinmanager.okta.com). The Okta OIN team works with you to create an internal-only integration that isn't included in the OIN.

## Submit in the Admin Console

New content link goes here for SAML


## Submit with the OIN Manager

Submit the following integrations with OIN Manager:

<Cards>
<Card href="/docs/guides/build-sso-integration/openidconnect/main/" headerImage="/img/idp-logos/oidc.png" cardTitle="OpenID Connect (OIDC)" :showFooter=false>Submit an OIDC SSO integration</Card>

<Card href="/docs/guides/build-sso-integration/saml2/main/" headerImage="/img/idp-logos/saml.png" cardTitle="SAML" :showFooter=false>Submit a SAML SSO integration</Card>

<Card href="https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder" headerImage="/img/icons/WEB_Icon_Platform_Workflows_40x40.svg" cardTitle="Workflows" :showFooter=false>Submit a Workflow Connector Builder integration</Card>

<Card href="/docs/guides/scim-provisioning-integration-overview/" headerImage="/img/icons/scim.svg" cardTitle="SCIM" :showFooter=false>Submit a SCIM integration</Card>

<Card href="/docs/guides/build-api-integration/" headerImage="/img/icons/icon--tool.svg" cardTitle="API service" :showFooter=false>Submit an API service integration</Card>

</Cards>

