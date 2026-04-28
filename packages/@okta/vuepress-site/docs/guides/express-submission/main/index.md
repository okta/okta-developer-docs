---
title: Submit Express Configuration for Auth0-enabled apps
excerpt: Learn how to use Express Submission to submit Express Configuration functionality
layout: guide
---
<ApiLifecycle access="ie" />

This guide provides an overview of the Express Submission workflow to submit Express Configuration functionality for Auth0-enabled SaaS apps.

---

### Learning outcomes

* Understand Express Submission workflow for Auth0-enabled apps
* Submit new Okta Integration Network (OIN) integrations or update existing integrations using Express Configuration

### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup/). The OIN Wizard is only available in Integrator Free Plan orgs.
* An admin user in the Integrator Free Plan org with either the super admin or the app and org admin roles.
* An Auth0 tenant with an integrated SSO (SAML and OIDC, or OIDC only), Universal Logout, or SCIM provisioning app.
* Google Chrome browser with the Okta Browser Plugin installed (see [OIN Wizard requirements](https://developer.okta.com/docs/guides/submit-app-prereq/main/#oin-wizard-requirements)).
* The various items necessary for submission in accordance with the OIN submission requirements.
* Customer setup guide for your end users. See [Express Configuration customer configuration guide template](https://developer.okta.com/docs/guides/express-config-guide-template/main/).
* Access to the OIN dashboard within your Auth0 tenant to generate your Express Configuration information.

## Overview

Okta provides you with a seamless experience to integrate and submit Express Configuration functionality in your Auth0-enabled app for publication in the OIN. If your app uses Auth0 as the Service Provider for SSO (SAML and OIDC, or OIDC only), Universal Logout, or SCIM provisioning, you can use Express Submission to accelerate your Express Configuration functionality submission into the OIN. This submission flow automates the exchange of technical metadata between your Auth0 tenant and the OIN Wizard.

## Express Submission workflow

* **New integration**: Go to [Submit a new OIN integration](#submit-a-new-oin-integration)
* **Update existing integration**: Go to [Update an existing OIN integration](#update-an-existing-oin-integration)

### Submit a new OIN integration

#### Generate the Express Configuration information in the Auth0 dashboard

Before starting the submission in the OIN Wizard, you must generate the Express Configuration information in your Auth0 dashboard.

1. Log in to your Auth0 dashboard and navigate to the OIN dashboard.
2. Select your app and provide the required profile details.
3. Generate the Express Configuration information.
4. Copy the generated configuration information to your clipboard. For more information, see [Express Configuration with Okta](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta/express-configuration).

#### Create a new OIN app that supports Auth0-enabled Express Configuration

1. Sign in to your [Okta Integrator Free Plan org](https://developer.okta.com/signup/).
2. Go to **Applications** > **Applications** > **Your OIN Integrations** > **Build new OIN integration** to start a new submission.
3. In the **Add integration capabilities** tab, select your support protocols. You must have at least OpenID Connect (OIDC) selected.
4. Click **Add integration details** to go to the **Integration details** page.
5. Fill out all appropriate fields, then click **Configure your integration**. See [Submit an integration](https://developer.okta.com/docs/guides/submit-oin-app/openidconnect/main/) with the OIN Wizard.
6. Locate the **Express Configuration for Auth0 apps** pane on the right sidebar.
7. Click **Enable Express Configuration**.
8. Paste the information that you copied from the Auth0 dashboard into the **Express Configuration information** field, and click **Continue**.

#### Establish a secure connection

1. In the OIN Wizard, click **Download PEM key**.
2. Click **Finish**. The configuration details automatically load in the **Configure your integration** page.
3. Return to the Auth0 dashboard, upload your generated PEM key, and click **Finish**.

> **Note**: If you exited the setup after providing the Express Configuration information, you can return to your submission to continue. In the Admin Console, go to **Applications** > **Applications** > **Your OIN Integrations**. Select your draft integration, and then go to **Configure your integration** to download the PEM file again.

### Update an existing OIN integration

#### Configure your integration in Okta

1. Sign in to your [Okta Integrator Free Plan org](https://developer.okta.com/signup/).
2. Go to **Applications** > **Your OIN Integrations**.
3. Select your published integration to update. Your published OIN submission appears in read-only mode.
4. Click **Edit integration** from the **This integration is read-only** information box.
5. Select your support protocols from the **Add integration capabilities** page. You must have at least OpenID Connect (OIDC) selected.
6. Click **Add integration details** to go to the Integration details page.
7. Fill out all appropriate fields, then click **Configure your integration**.
8. When you reach the **Configure your integration** page, locate the **Express Configuration for Auth0 apps** pane on the right sidebar.
9. Click **Reconfigure**.
10. Paste the information that you copied from the Auth0 dashboard into the **Express Configuration information** field, and click **Finish**.

### Test and submit your integration

The standard OIN testing process remains valid for Express Configuration submissions. Once you have created the app instance, run the Express Configuration on that specific instance to ensure the settings are applied correctly. See [Test your integration](https://developer.okta.com/docs/guides/submit-oin-app/openidconnect/main/#test-your-integration) and [Submit your integration](https://developer.okta.com/docs/guides/submit-oin-app/openidconnect/main/#submit-your-integration).
