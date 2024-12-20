---
title: Publish an OIN integration
meta:
  - name: description
    content: Use this guide to understand the Okta Integration Network (OIN) submission process. The overview is common to all types of integration submissions.
---

The Okta Integration Network (OIN) is the identity industry's broadest and deepest set of pre-built cloud integrations to manage access management, authentication, and provisioning. Gain exposure to thousands of Okta customers who can discover your integration by adding it to the OIN.

OIN integrations speed adoption by simplifying admin configuration steps and reducing friction for your customers. They can integrate your application to Okta with minimal effort.

If you're an integrator, from an independent software vendor (ISV) or an existing Okta customer, who wants to add your integration to the OIN, use this guide to learn about the submission process. It's free to submit and list your integration publicly in the [OIN catalog](https://www.okta.com/integrations/).

## Submission process

Okta introduced a seamless experience to submit SSO and SCIM integrations for OIN publication. This experience enables you to build and test your integration before submission directly from the Admin Console with the [OIN Wizard](/docs/guides/submit-oin-app/). This reduces the tools that you need to build, test, and submit your integration. Moreover, it reduces the time needed for the OIN team to review and validate your integration, which shortens the time to publish in the OIN.

You can also submit updates to a previously published SSO or SCIM integration in the OIN Wizard.

For Workflows connector or API service integrations, you need to use the [OIN Manager](https://oinmanager.okta.com/) for submission.

> **Note:** Okta recommends that you have separate environments for development, testing, and production. Use the Okta Developer Edition org as part of your development and testing environment, and submit your integration to the OIN from the same org. However, don't connect the generated app instance in your Developer Edition org to your production environment.

Before you submit your integration, in either the OIN Wizard or Manager, review the [OIN submission requirements](/docs/guides/submit-app-prereq/) and prepare the necessary artifacts (such as the app logo, description, and configuration document).

Consider the following questions to help you choose which pathway to use for submission:

* Are you submitting a new or published SSO integration?
  * [Use the OIN Wizard](#submission-process-for-sso-and-scim-integrations).
    > **Note:** Published SSO integrations that were submitted through the OIN Manager have been moved to the OIN Wizard and appear in the **Your OIN Integrations** dashboard.
* Are you submitting a new or published SCIM integration?
  * [Use the OIN Wizard](#submission-process-for-sso-and-scim-integrations).
    > **Note:** Published SCIM integrations that were submitted through the OIN Manager have been moved to the OIN Wizard and appear in the **Your OIN Integrations** dashboard.
* Are you submitting a new SSO and SCIM integration?
  * [Use the OIN Wizard](#submission-process-for-sso-and-scim-integrations) to submit the SSO and SCIM integration.
* Are you submitting a new or published Workflows integration?
  * [Use the OIN Manager for Workflows integrations](#submission-process-for-workflows-integrations).
* Are you submitting a new or published API service integration?
  * [Use the OIN Manager for API services](#submission-process-for-api-service-integrations).

Submit your integration to Okta and work with the OIN team as they test and review your submission. If the OIN team identifies any issues in the review and QA testing phases, you're sent an email with the specific details. At any point in the process, you can check the status of your submission in the OIN Wizard or OIN Manager.

The Okta OIN team reviews and prioritizes all submissions.

### Submission process for SSO and SCIM integrations

The following steps outline the process for submitting SSO and SCIM integrations through the OIN Wizard.

1. Build the integration in your app.
1. Sign in to the Admin Console of your Okta Developer Edition org.
   - Add integration details in the OIN Wizard.
   - Generate the app integration instance.
   - Test the integration.
   - Submit the integration.
1. Review feedback.
   - After submission, the OIN team reviews your integration. See [Understand the submission review process](#understand-the-submission-review-process).
1. Publish to OIN catalog.
   - The OIN team publishes your integration after they verify that your integration works as intended for your Okta customers.

<div>

![ISV SSO submission process flow](/img/oin/OIN_Wizard_submission_flow_SSO.png)

<!--
Source link : https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=2361-1870&mode=design&t=F1zglScb7dL1B8hX-0
-->

</div>

### Submission process for API service integrations

The following steps outline the submission process for API service integrations with the OIN Manager:

1. Build the integration in your service app.
1. Sign in to the OIN Manager with your Developer Edition org credentials.
   - Add integration details in the OIN Manager.
   - Generate the app integration instance.
   - Test the integration.
   - Submit the integration.
1. Review feedback.
   - After submission, the OIN team reviews your integration. See [Understand the submission review process](#understand-the-submission-review-process).
1. Publish to OIN catalog.
   - The OIN team publishes your integration after they verify that your integration works as intended for your Okta customers.

### Submission process for Workflows integrations

The following steps and flowchart explain how to submit Workflows integrations through the OIN Manager:

1. Build the Workflows capabilities in your app.
   - Sign in to your Developer Edition org Admin Console.
   - Build your Workflows connector.
   - Test the Workflows capabilities.
1. Sign in to the OIN Manager with your Developer Edition org credentials.
   - Add integration details in the OIN Manager.
   - Submit the integration.
1. Review feedback.
   - After submission, the OIN team reviews your integration. See [Understand the submission review process](#understand-the-submission-review-process).
1. Publish to OIN catalog.
   - The OIN team publishes your integration after they verify that your integration works as intended for your Okta customers.

<div>

![ISV submission process flow](/img/oin/isv_portal_submission_flow_LCM.png)

<!--
Source link : https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=2361-1870&mode=design&t=F1zglScb7dL1B8hX-0
-->

</div>

### Understand the submission review process

The submission review process begins when you click **Submit integration** in the [OIN Wizard](/docs/guides/submit-oin-app/) or [OIN Manager](https://oinmanager.okta.com). Okta sends you an email notification confirming your integration is queued for review. The email includes the date when the initial review is expected to finish.

The status of your integration is shown in the **Your OIN Integrations** dashboard from the Admin Console or on the **My App Integrations** page from the OIN Manager.

|  <div style="width:150px">OIN Wizard status</div>|  <div style="width:160px">OIN Manager status</div>  | Description |
| --------------- | ------------ | ------------ |
| Draft | Draft&mdash;ISV new |  An in-progress integration that hasn't been submitted yet. The OIN team doesn't review draft integrations. |
| OIN to review | To be reviewed by Okta | The integration was submitted. The OIN team needs to conduct an initial review. The OIN team notifies you by email when the initial submission review is complete.|
| ISV to review | ISV needs to review | The OIN team reviewed the submission and found some issues. An email is sent to you with a list of issues. Review the list and resolve the issues before you respond or resubmit the updated integration to Okta. |
| OIN to review | To be QA tested by Okta | The integration was submitted and passed the initial review phase. The OIN team conducts internal QA tests and notifies you by email when the QA review is complete. If QA testing is successful, your integration is automatically published in the OIN. |
| ISV to review | ISV needs to fix bugs | The OIN team tested the integration and found some issues. An email is sent to you with a list of issues to fix. Make the requested changes as an update to your existing submission. Retest and resubmit your integration.|
| OIN to review | Final Review | The Okta OIN team conducts a final internal QA test based on previously requested changes. The OIN team emails you when the final QA review is complete. If the review is successful, your integration is automatically published in the OIN. |
| Published | Published | Congratulations, your integration is published in the OIN. <br>The OIN team verified that the integration works as intended for your Okta customers.|

## Protocols supported

Okta accepts integrations that use the following protocols or tools into the OIN:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

    >**Notes:** <br>
    > * To support the potentially large number of Okta orgs that access an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.
    > * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

    >**Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

* [System for Cross-domain Identity Management (SCIM)](https://scim.cloud)

   > **Note:** All integrations in the OIN catalog are public. If you want to create a private integration for an app that uses SCIM, see [Add a private SCIM integration](/docs/guides/scim-provisioning-integration-connect/main/).

* [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builderz)

* [OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) (for Okta management service apps, see [Build an API service integration](/docs/guides/build-api-integration/))

> **Note:** SWA app integrations are no longer accepted for publication in the OIN catalog. However, the OIN team still maintains existing SWA apps.

## Submission support

Getting your app integration in the OIN catalog involves two phases: creating a functional integration and submitting it through the OIN publication process. For each phase in the process, Okta has an associated support stream to assist you.

1. Create an integration phase

   * When you're constructing your Okta integration, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.

1. Submit an integration phase

   * If you need help with using the OIN Wizard during the submission process, see [Submit an integration using the OIN Wizard](/docs/guides/submit-oin-app/). If you can't find an answer in the documentation, post a question on the [Okta Developer Forum](https://devforum.okta.com/).

   * If you need help with using the OIN Manager during the submission process, use the **Get Support** section on the OIN Manager **My App Integrations** page. This section provides resources from the Okta developer portal.

If you have questions or need more support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

## Next steps

Ready to make your integration public? Submit an integration with the following guides:

<Cards>

<Card href="/docs/guides/submit-oin-app/openidconnect/main/" headerImage="/img/idp-logos/oidc.png" cardTitle="OpenID Connect (OIDC)" :showFooter=false>Submit an OIDC SSO integration</Card>

<Card href="/docs/guides/submit-oin-app/saml2/main/" headerImage="/img/idp-logos/saml.png" cardTitle="SAML" :showFooter=false>Submit a SAML SSO integration</Card>

<Card href="/docs/guides/submit-app/wfconnector/main/" headerImage="/img/icons/WEB_Icon_Platform_Workflows_40x40.svg" cardTitle="Workflows" :showFooter=false>Submit a Workflow connector integration</Card>

<Card href="/docs/guides/submit-oin-app/scim/main/" headerImage="/img/icons/scim.svg" cardTitle="SCIM" :showFooter=false>Submit a SCIM integration</Card>

<Card href="/docs/guides/build-api-integration/main/#register-your-api-service-integration" headerImage="/img/icons/icon--tool.svg" cardTitle="API service" :showFooter=false>Submit an API service integration</Card>

</Cards>