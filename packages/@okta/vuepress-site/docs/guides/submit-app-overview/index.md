---
title: Publish an OIN integration
meta:
  - name: description
    content: Use this guide to understand the Okta Integration Network (OIN) submission process. The overview is common to all types of integration submissions.
---

The Okta Integration Network (OIN) is the identity industry’s broadest and deepest set of pre-built cloud integrations to manage access management, authentication, and provisioning. Gain exposure to thousands of Okta customers who can discover your integration by adding it to the OIN.

OIN integrations speed adoption by simplifying admin configuration steps and reducing friction for your customers. They can integrate your application to Okta with minimal effort.

If you're an integrator, from an independent software vendor (ISV) or an existing Okta customer, who wants to add your integration to the OIN, use this guide to learn about the submission process. It's free to submit and list your integration publicly in the [OIN catalog](https://www.okta.com/integrations/).

## Submission process

Okta introduced a seamless experience to submit SSO integrations for OIN publication. This new experience enables you to build and test your integration metadata before submission directly from the Admin Console with the new [OIN Wizard](/docs/guides/submit-oin-app/). This reduces the tools that you need to build, test, and submit your integration. Moreover, it reduces the time needed for the OIN team to review and validate your integration, which shortens the time to publish in the OIN.

For lifecycle management (LCM) integrations (such as SCIM or Workflows) or API service integrations, you need to use the [OIN Manager](https://oinmanager.okta.com/) for submission.

Before you submit your integration, in either the OIN Manager or Wizard, review the [OIN submission requirements](/docs/guides/submit-app-prereq/) and prepare the artifacts required (such as the app logo, description, and configuration document).

Consider the following questions to help you choose which pathway to use for submission:

* Are you submitting a new SSO integration?
  * [Use the OIN Wizard for SSO integrations](#submission-process-for-sso-with-oin-wizard).
* Are you submitting a new or published SCIM or Workflows integration?
  * [Use the OIN Manager for LCM integrations](#submission-process-for-lcm-with-oin-manager).
* Are you submitting a new or published API service integration?
  * [Use the OIN Manager for API service](#submission-process-for-api-service-with-oin-manager).
* Are you submitting a new SSO and SCIM integration?
  * [Use the OIN Wizard](#submission-process-for-sso-with-oin-wizard) to submit the SSO integration component.
  * [Use the OIN Manager](#submission-process-for-lcm-with-oin-manager) to submit your SCIM integration component.
* Are you updating a published SSO integration, previously submitted through OIN Manager?
  * Use the [OIN Manager to update published SSO integrations](/docs/guides/submit-sso-app/openidconnect/main/#update-your-published-integration).

Submit your integration to Okta and work with the Okta OIN team as they test and review your submission. If the Okta OIN team identifies any issues in the review and QA testing phases, you’re sent an email with the specific details. At any point in the process, you can check the status of your submission in the OIN Wizard or OIN Manager.

The Okta OIN team reviews and prioritizes all submissions.

---

### Submission process for SSO with OIN Wizard

(Build integration component your app) -> (Sign in to Admin Console and use the OIN Wizard) => (Add integration details) => (generate test instance) => (test integration) => (click **Submit integration**)

### Submission process for API service with OIN Manager

(Build integration component your app) -> (Sign in to OIN Manager) => (Add integration details) => (generate test instance) => (test integration) => (click **Submit for review**)

### Submission process for LCM with OIN Manager

(Build integration component your app) -> (Sign in to Admin Console) => (Create integration instance) => (test integration) -> <good?> -> (Sign in to OIN Manager) => (Add details) => (Click **Submit for review**)

---

> **Note to Lesie/Tova:** We should change the image below to have 4 steps (to separate out the multiple tasks in previous step 1):
STEP 1: Submit integration, STEP 2: OIN initial review, STEP 3: OIN code review, STEP 4: Published

<div>

![ISV submission process flow](/img/oin/isv-portal_submission_flow.png)

<!--
Source link : https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3265%3A30940  isv_portal_submission_flow
-->

</div>

### Understand the submission review process

The submission review process begins when you click **Submit for Review** in the [OIN Wizard](/docs/guides/submit-oin-app/) or **Submit integration** in the [OIN Manager](https://oinmanager.okta.com). Okta sends you an email notification that your integration is now queued for review and also includes the date when the initial review is expected to finish.

The status of your integration is shown in the **Your OIN Integrations** dashboard from the Admin Console or in the **My App Integrations** page from the OIN Manager.

| OIN Wizard status | OIN Manager status  | Description |
| --------------- | ------------ | ------------ |
| Draft | New |  An in-progress integration submission. The OIN team isn't reviewing this integration. |
| OIN to review | Pending reviewed by Okta | The integration was submitted. The OIN team needs to conduct an initial review, a code review, and QA testing for the integration. |
| ISV to review | ISV needs to review | The OIN team reviewed the submission and found some issues with the integration. An email is sent to the ISV to review their submission. |
| ISV to fix | ISV needs to fix bugs | The OIN team reviewed the submission and found some issues with the SSO integration. An email is sent to the ISV with a list of issues to fix.|
| Published | Complete | The OIN team verified that the integration works as intended for Okta customers. The integration is listed in the OIN catalog.|

#### OIN initial review

* **Okta to review**: The Okta OIN team is notified of your submission. Okta reviews the submission and notifies you by email when the submission review is complete.
* **ISV to review**: Okta has reviewed your submission and found issues that require your attention. Check your email for results from the initial review.
  * Sign in to your org Admin Console and update the request details using the OIN Wizard. Retest and resubmit your integration.
  * Sign in to OIN Manager and update the requested details. Retest and resubmit your integration.

After the OIN team reviews your updated submission and verifies that the issues are resolved, your submission moves to the next code review phase.

#### OIN code review

* **Okta to review**: The Okta OIN team conducts internal QA tests and notifies you by email when the QA review is complete. If the QA test is successful, your submission is automatically published in the OIN.
* **ISV to fix**: Okta has found QA issues that require your correction. Check your email for results from the Okta QA review. Make the requested changes as an update to your existing submission. Retest and resubmit your integration.

The Okta OIN team conducts a final internal QA test based on previously requested changes. The OIN team emails you when the final QA review is complete. If the review is successful, your submission is automatically published in the OIN.

#### Published

Congratulations, your integration is published in the OIN!

## Protocols supported

Okta accepts integrations that use the following protocols or tools into the OIN:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

    >**Notes:** <br>
    > * To support the potentially large number of Okta orgs that access an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.
    > * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

    >**Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

* [System for Cross-domain Identity Management (SCIM)](https://scim.cloud)

* [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builderz)

* [OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) (for Okta management service apps, see [Build an API service integration](/docs/guides/build-api-integration/))

> **Note:** SWA app integrations are no longer accepted for publication in the OIN catalog. However, the OIN team still maintains existing SWA apps.

## Submission support

Getting your app integration in the OIN catalog involves two phases: creating a functional integration and submitting it through the OIN publication process. For each phase in the process, Okta has an associated support stream to assist you.

1. Create an integration phase

   * When you're constructing your Okta integration, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.

1. Submit an integration phase

   * If you need help with using the OIN Wizard during the submission process, see [Submit an SSO integration using the OIN Wizard](/docs/guides/submit-oin-app/). If you can't find an answer in the documentation, post a question on the [Okta Developer Forum](https://devforum.okta.com/).

   * If you need help with using the [OIN Manager](https://oinmanager.okta.com) during the submission process, use the **Get Support** section on the OIN Manager **My App Integrations** page. This section provides resources from the Okta developer portal.

If you have questions or need more support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

> **Note:** All integrations in the OIN catalog are public. If you want to create a private integration for an app that uses SCIM, then use the [SCIM App Integration Wizard](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-scim). <br>
> You can also use the following template integrations from the OIN if they meet your app SCIM capabilities:
> * [SCIM 1.1 test apps](https://www.okta.com/integrations/?search=SCIM%201.1%20test%20app) for SCIM 1.1
> * [SCIM 2.0 test apps](https://www.okta.com/integrations/?search=SCIM%202.0%20Test%20App) for SCIM 2.0
> * [SCIM 1.1 Test App(Header Auth)](https://www.okta.com/integrations/scim-1-1-test-app-header-auth/) for SCIM 1.1 apps that use custom header expression for Header Auth
> * [SCIM 2.0 Test App(Header Auth)](https://www.okta.com/integrations/scim-2-0-test-app-header-auth/) for SCIM 2.0 apps that use custom header expression for Header Auth

## Next steps

Ready to make your integration public? Submit an integration with the following guides:

<Cards>

<Card href="/docs/guides/submit-oin-app/openidconnect/main/" headerImage="/img/idp-logos/oidc.png" cardTitle="OpenID Connect (OIDC)" :showFooter=false>Submit an OIDC SSO integration</Card>

<Card href="/docs/guides/submit-oin-app/saml2/main/" headerImage="/img/idp-logos/saml.png" cardTitle="SAML" :showFooter=false>Submit a SAML SSO integration</Card>

<Card href="/docs/guides/submit-app/wfconnector/main/" headerImage="/img/icons/WEB_Icon_Platform_Workflows_40x40.svg" cardTitle="Workflows" :showFooter=false>Submit a Workflow connector integration</Card>

<Card href="/docs/guides/submit-app/scim/main/" headerImage="/img/icons/scim.svg" cardTitle="SCIM" :showFooter=false>Submit a SCIM integration</Card>

<Card href="/docs/guides/build-api-integration/main/#register-your-api-service-integration" headerImage="/img/icons/icon--tool.svg" cardTitle="API service" :showFooter=false>Submit an API service integration</Card>

</Cards>