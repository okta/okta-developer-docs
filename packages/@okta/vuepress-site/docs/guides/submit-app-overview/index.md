---
title: Publish an OIN integration
meta:
  - name: description
    content: Use this guide to understand the Okta Integration Network (OIN) submission process. There are variations to the submission process depending on the integration type.
---

The Okta Integration Network (OIN) is the identity industry’s broadest and deepest set of pre-built cloud integrations to manage access management, authentication, and provisioning. Gain exposure to thousands of Okta customers who can discover your integration by adding it to the OIN. OIN integrations speed adoption by simplifying admin configuration steps and reducing friction for your customers. They can integrate your application to Okta with minimal effort on your part.

If you're an integrator, from an independent software vendor (ISV) or an existing Okta customer, who wants to add your integration to the OIN, use this guide to learn about the submission process. Adding your integration to the OIN and listing it publicly in the [OIN catalog](https://www.okta.com/integrations/) is free.

This guide assumes that you've created an app integration and are ready to submit it for OIN verification. See [Single Sign-On](/docs/guides/oin-sso-overview/), [Lifecycle management](/docs/guides/oin-lifecycle-mgmt-overview/), or [API service integrations](/docs/guides/oin-api-service-overview/) for guidance on how to create integrations for the OIN.

## Submission process

The following flowchart outlines the OIN submission and review process after you decide to make your integration public:

<div>

![ISV submission process flow](/img/oin/isv-portal_submission_flow.png)

<!--
Source link : https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3265%3A30940  isv_portal_submission_flow
-->

</div>

Before submitting your integration, review the [OIN submission requirements](/docs/guides/submit-app-prereq/) and prepare the artifacts required during submission (such as the app logo, description, support contact, and configuration document).

Submit your integration to Okta and work with the Okta OIN team as they test and review your submission. If the Okta OIN team identifies any issues in the review and QA testing phases, you’re sent an email with the specific details. At any point in the process, you can check the status of your submission in the [OIN Manager](https://oinmanager.okta.com).

The Okta OIN team reviews all submissions on a best-case basis.

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

## Protocols supported

Okta accepts integrations that use the following protocols or tools into the OIN:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

    >**Notes:** <br>
    > * To support the potentially large numbers of Okta orgs accessing an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.
    > * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

    >**Note:** SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).

* [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf)

* [System for Cross-domain Identity Management (SCIM)](https://scim.cloud)

* [OAuth 2.0](/docs/concepts/oauth-openid/#oauth-2-0) (for Okta management service apps, see [Build an API service integration](/docs/guides/build-api-integration/))

> **Note:** SWA app integrations are no longer accepted for publication in the OIN catalog. However, existing SWA apps are still maintained by the OIN team.

## Submission support

Getting your app integration in the OIN catalog involves two phases: creating a functional integration and submitting it through the OIN publication process. For each phase in the process, Okta has an associated support stream to assist you.

1. Create an integration phase

   * When you're constructing your Okta integration, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/).

1. Submit an integration phase

   * If you need help during the submission process, use the Get Support section on the **My App Integrations** page after you sign in to the [OIN Manager](https://oinmanager.okta.com). This section provides the following resources from the [Okta developer portal](https://developer.okta.com/):

     * OIN integration guides
     * Okta, OIDC, SAML, and SCIM concepts
     * A search tool to find articles in the Okta developer portal

If you have questions or need additional support to publish your app integration, you can reach out to the Okta OIN team directly at <oin@okta.com>.

>**Note:** All integrations in the OIN catalog are public. If you want to submit a request to create a private app integration for an application that uses SCIM 1.1 or Profile Sourcing, or for an application that uses a custom header expression for the Header Auth, then use the [SCIM App Integration Wizard](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-scim) to create your integration and submit your app through the [OIN Manager](https://oinmanager.okta.com). The Okta OIN team works with you to create an internal-only integration that isn't included in the OIN.

## Next steps

Ready to make your integration public? Submit an integration with the following guides:

<Cards>

<Card href="/docs/guides/submit-sso-app/openidconnect/main/" headerImage="/img/idp-logos/oidc.png" cardTitle="OpenID Connect (OIDC)" :showFooter=false>Submit an OIDC SSO integration</Card>

<Card href="/docs/guides/submit-sso-app/saml2/main/" headerImage="/img/idp-logos/saml.png" cardTitle="SAML" :showFooter=false>Submit a SAML SSO integration</Card>

<Card href="/docs/guides/submit-app/wfconnector/main/" headerImage="/img/icons/WEB_Icon_Platform_Workflows_40x40.svg" cardTitle="Workflows" :showFooter=false>Submit a Workflow Connector Builder integration</Card>

<Card href="/docs/guides/submit-app/scim/main/" headerImage="/img/icons/scim.svg" cardTitle="SCIM" :showFooter=false>Submit a SCIM integration</Card>

<Card href="/docs/guides/build-api-integration/main/#register-your-api-service-integration" headerImage="/img/icons/icon--tool.svg" cardTitle="API service" :showFooter=false>Submit an API service integration</Card>

</Cards>