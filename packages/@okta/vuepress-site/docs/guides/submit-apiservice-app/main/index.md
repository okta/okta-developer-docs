---
title: Submit an API service integration
meta:
  - name: description
    content: Learn how to submit an API service integration to the Okta Integration Network (OIN) team for publication. The submission task is performed in the Okta Admin Console through the OIN Wizard.
layout: Guides
---

Learn how to submit an API service integration to the Okta Integration Network (OIN) using the OIN Wizard.

---

#### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup/). The OIN Wizard is only available in Integrator Free Plan orgs.

* An admin user in the Integrator Free Plan org with either the super admin or the app and org admin roles

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)
* A functional integration that's created and tested in accordance with the [Build an API service integration](/docs/guides/build-api-integration/) guide

---

## Overview

Okta provides you with a seamless experience to integrate and submit your app for publication in the [Okta Integration Network (OIN)](https://www.okta.com/okta-integration-network/). When you obtain an [Integrator Free Plan org](https://developer.okta.com/signup/), you can use it as a sandbox to integrate your app with Okta and explore more Okta features. When you decide to publish your integration to the OIN, you can use the same Integrator Free Plan org to submit your integration using the OIN Wizard.

The OIN Wizard is a full-service tool in the Admin Console for you to do the following:

* Provide all your integration submission details.
* Generate an app instance in your org for testing.
* Submit your integration directly to the OIN team when you're satisfied with your test results.
* Monitor the status of your submissions through the **Your OIN Integrations** dashboard.
* Edit published integrations and resubmit them to the OIN.

The OIN team verifies your submitted integration before they publish it in the [OIN catalog](https://www.okta.com/integrations/).

### Integration supported

This guide covers submissions for an [API service](/docs/guides/oin-api-service-overview/) integration.

> **Notes:** The API service capability is mutually exclusive of other capabilities in a submission. If you select the API service capability, you can't select any other capability, such as SSO or provisioning. Similarly, if you select another capability, the API service option is unavailable.

## Start a submission

Review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission. You need to provide artifacts and technical details during the submission process.

> **Note:** As a best practice, add two or three extra admin users in your Okta org to manage the integration. This ensures that your team can access the integration for future updates. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and ensure that the app and org admin roles are assigned to your admin users. The super admin role also provides the same access, but Okta recommends limiting assignments to this role.

Start your integration submission for OIN publication:

1. Sign in to your Integrator Free Plan org as a user with either the super admin (`SUPER_ADMIN`) role, or the app (`APP_ADMIN`) and org (`ORG_ADMIN`) admin [roles](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#standard-roles).

    > **Note:** Submit your integration from an Okta account that has your company domain in the email address. You can't use an account with a personal email address. The OIN team doesn't review submissions from personal email accounts.

1. On the **Home** page, do one of the following:

    * Click **Create new app** to create an app that you want to list in the OIN.

1. Enter a display name and description.

1. Select **API Service**.

1. Click **Add Integration Details**. The **Integration details** page appears.

   > **Note:** Alternatively, you can go to **Applications and Resources** > **Your OIN Integrations** to build your integration and select **API Service**.

   If you only want to test an existing submission, see [Navigate directly to test your integration](#navigate-directly-to-test-your-integration).

### Integration details

#### OIN catalog properties

1. In the **OIN catalog properties** section, specify the following OIN catalog information:

    | <div style="width:150px">Property</div>| Description  |
    | ----------------- | ------------ |
    | **Display name** `*` | Provide a name for your integration. This is the main title used for your integration in the OIN.<br>The maximum field length is 64 characters. |
    | **Description** `*` | Give a general description of your app and the benefits of this integration to your customers. See [App description guidelines](/docs/guides/submit-app-prereq/main/#app-description-guidelines). |
    | **Logo** `*` | Upload a PNG, JPG, or GIF file of a logo to accompany your integration in the catalog. The logo file must be less than one MB. See [Logo guidelines](/docs/guides/submit-app-prereq/main/#logo-guidelines). |
    | **Use Cases** | Add optional use case categories that apply to your integration:<br><ul><li>Automation</li> <li>Centralized Logging</li> <li>Directory and HR Sync</li> <li>Identity Governance and Administration (IGA)</li> <li>Identity Verification</li> <li>Multifactor Authentication (MFA)</li> <li>Zero Trust</li></ul>You can select up to three optional use cases. Default use cases are assigned to your integration based on supported features. See [Use case guidelines](/docs/guides/submit-app-prereq/main/#use-case-guidelines). |

    `*` Required properties

#### Tenant settings

Configure integration variables if your URLs are dynamic for each tenant. The variables are for your customer admins to add their specific tenant setting values during installation. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language).

1. In the **Tenant settings** section, specify the name and label for each tenant setting variable:

    | <div style="width:100px">Property</div> | Description  |
    | --------------- | ------------ |
    | **Label** `*`  | The tenant setting label that's displayed when admins install your app integration. For example: `Subdomain` or `Tenant name` |
    | **Name** `*`  | The tenant setting variable name. This variable name is used to construct dynamic URLs or other app properties that are dependent on the tenant. It's hidden from admins and is only used to pass tenant details to your external app.<br>String is the only variable type supported.<br>**Note:** Use alphanumeric lowercase and underscore characters for the variable name field. The first character must be a letter and the maximum field length is 1024 characters. For example: `subdomain_div1` |

    `*` This section is optional, but if you specify a variable, both `Label` and `Name` properties are required.

1. Click **+ Add another** to add another variable. You can add up to eight variables.

   > **Note:** Apps that are migrated from the OIN Manager and that have more than eight variables can retain those variables, but you can't add new ones. However, you can update or delete the existing variables.

1. If you need to delete a variable, click the delete icon (![trash can; delete icon](/img/icons/odyssey/delete.svg)) next to it.
<!--Odyssey icons sourced from: https://github.com/okta/odyssey/blob/main/packages/odyssey-icons/src/figma.generated/ -->

#### Support contact

1. Specify a support contact from your org:

    | <div style="width:150px">Property</div> | Description  |
    | ----------------- | ------------ |
    | **Support email** `*` | Specify an email that the Okta team can use to contact your org for emergencies and escalations. This field is private and not visible to customers. See [Customer support contact guidelines](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines).

1. Click **Configure your integration**.

### Configure your integration

Configure your integration settings. Settings appear based on your capability selection.

#### Authentiation properties

1. Specify authentication settings to your app.

    | Property | Description |
    | --- | --- |
    | **Client secret** | This is a confidential, unique string that's used to prove your app’s identity during a secure exchange. This option generates a unique secret key for each instance of your app. Only client-secret authentication is supported for API service integrations. |

#### API service integration properties

1. Specify the following properties:

    | Property | Description |
    | --- | --- |
    | **Scope** | Scopes define the specific levels of access that your app requires for the customer’s Okta org. You can manually select the **scopes** from the provided list of [Okta OAuth 2.0 scopes](https://developer.okta.com/docs/api/oauth2/). You can also filter the selected and available scopes. |
    | **Tell us why you need these scopes** | Specify why these scopes are required for your app. |
    | **Link to configuration guide** `*` | Enter the URL for your customer-facing instructions for configuring your API service integration. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines). |

    `*` Required properties

<br>

2. Click **Get started with testing** to save your edits and move to the **Test your integration** section, where you need to [enter test information](#enter-test-information) for your integration.

#### Dynamic properties with Okta Expression Language

The OIN Wizard supports [Okta Expression Language](/docs/reference/okta-expression-language/#reference-user-attributes) to generate dynamic properties, such as URLs or URIs, based on your customer tenant. You can specify dynamic strings for your API service properties in the OIN Wizard:

1. Add your [tenant settings](#tenant-settings) in the OIN Wizard. These settings become fields for customer admins to enter during your OIN integration installation to identify their tenant.
2. Use the tenant setting variables with the Expression Language format in your integration properties for dynamic values that are based on customer information.

### Enter test information

From the OIN Wizard **Test your integration** page, specify the information that's required for testing your integration. The OIN team uses this information to verify your integration after submission.

#### Test information for Okta review

A dedicated test admin account in your app is required for Okta integration testing. This test account needs to be active during the submission review period for Okta to test and troubleshoot your integration. Ensure that the test admin account has:

* Privileges to configure admin settings in your test app
* Privileges to administer test users in your test app

After your integration is verified, Okta automatically deletes test account credentials 30 days after your app is published in the OIN Wizard. To resubmit your app after this period, create a test account and provide the required information.

See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

In the **Testing information for Okta review** section, specify the following **Test account** details:

| <div style="width:100px">Property</div> | Description  |
| --------------- | ------------ |
| **Account URL** `*`  | A static URL to sign in to your app. An OIN analyst goes to this URL and uses the account credentials you provide in the subsequent fields to sign in to your app. |
| **Username** `*`  | The username for your test admin account. The OIN analyst signs in with this username to execute test cases. The preferred account username is `isvtest@okta.com`. |
| **Password** `*`  | The password for your test admin account |
| **Testing instructions** | Include information that the OIN team needs to know about your integration for testing (such as the admin account or the testing configuration). You can also provide instructions on how to add test user accounts. |

`*` Required properties

## Test your integration

The OIN Wizard journey includes the **Test integration** experience page to help you configure and test your integration within the same org before submission. These are the tasks that you need to complete:

1. [Generate instances for testing](#generate-instances-for-testing). You need to create an app integration instance to test your API service.

2. Test your integration.

3. [Submit your integration](#submit-your-integration) after all required tests are successful.

#### Navigate directly to test your integration

You can navigate directly to the OIN Wizard **Test integration** page if you have an existing submission in the **Your OIN Integrations** dashboard. You can bypass the **[Select protocol](#start-a-submission)**, **[Configure your integration](#configure-your-integration)**, and **[Test your integration](#enter-test-information)** pages in the OIN Wizard, and start generating instances for testing. This saves you time and avoids unnecessary updates to an existing integration submission.

Follow these steps to bypass the configuration pages in the OIN Wizard:

1. Select **Applications and Resources** > **Your OIN Integrations**. Then select the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) next to the integration submission that you want to test.
1. Select **Test your integration**.

   * The OIN Wizard **Test integration** page appears for you to generate an instance and test your integration.

   * If you haven't specified test information in the **[Test your integration](#enter-test-information)** page, then you're directed to this page to enter testing details. You can go to the **Test integration** page only if the protocols, configuration, and test details are provided in your submission.

   * If your integration is in read-only mode, click **Edit integration** to enter test details before testing.

### Generate instances for testing

Generate instances for testing in your Integrator Free Plan org directly from the OIN Wizard. The OIN Wizard takes the configuration and test information from your OIN submission and allows you to configure a specific integration instance to test your API service.

> **Note:** Okta recommends that you:
> * Separate environments for development, testing, and production.
> * Use the Integrator Free Plan org as part of your development and testing environment.
> * Don't connect the generated app instance from the Integrator Free Plan org to your production environment. Connecting your development and testing environment with your production environment creates several potential risks, including unintentionally modifying data and misconfiguring your service. This could result in providing inadequate security or disrupting your service.

The Integrator Free Plan org has no limit on active instances. You can create as many test instances as needed for your integration. To deactivate any instances you no longer need, see [Deactivate an app instance in your org](#deactivate-an-app-instance-in-your-org).

#### Generate an instance for API service

1. From the **Test integration** page, click **Generate instance**. The **API Service integrations/ Authorize integration** page appears, where you can review the requested scopes.

    When your API service integration is published in the OIN catalog, the customer admin uses the Admin Console's **Applications and Resources** > **API Service Integrations** page to add your integration to their Okta org. The next few steps are exactly what your customer admins experience when they instantiate your integration with Okta. This enables you to assume the customer admin persona to verify that app labels and properties are appropriate for your integration.

    If you need to change any labels or properties, go back to edit your submission.

    > **Note:** The Integrator Free Plan has no limit on active app instances. You can create as many test instances as needed for your integration. To deactivate any instances that you no longer need, see [Deactivate an app instance in your org](#deactivate-an-app-instance-in-your-org).

2. On the **Authorize integration** page, click **Install & Authorize**.
3. Copy the client secret from the dialog and store it securely. For security purposes, the client secret is only displayed once and can't be retrieved later.
4. Click **Done**.
5. On the **General** tab, copy the **Okta domain** and **client ID** and securely store them for your integration test.
6. Configure your app using the Okta domain, client ID, and client secret.
7. Perform manual testing to verify your integration.
8. Once the testing is complete, click **Continue to submission**. The **Test integration** page appears.
9. Ensure that the **Test account requirements** and **API service requirements** checkboxes show a completed status.

### Required app instances

The **Required app instances** field displays the instances detected in your org. Use these instances to test your integration. This field also shows you the test instances required for the **OIN Submission Tester** based on your selected protocols:

* The **CURRENT VERSION** status indicates the instances that you need to test your current integration submission.
* The **PUBLISHED VERSION** status indicates the instances that you need to test backwards compatibility if you edit a previously published integration. See [Update a published integration with the OIN Wizard](/docs/guides/update-oin-app/).

### Application instances for testing

The **Application instances for testing** section displays, by default, the instances available in your org that are eligible for submission testing.

> **Note:** The filter (![filter icon](/img/icons/odyssey/filter.svg)) is automatically set to only show eligible instances.

An instance is eligible if it was generated from the latest version of the integration submission in the OIN Wizard. An instance is ineligible if it was generated from a previous version of the integration submission and you later made edits to the submission. This is to ensure that you test your integration based on the latest submission details.

If you modify a published OIN integration, you must generate an instance that's based on the currently published integration for backwards compatibility testing. A backward-compatible instance is eligible if it was generated from the published version of the integration before any edits are made in the current submission. The OIN Wizard detects if you're modifying a published OIN integration and asks you to generate a backward-compatible instance before you make any edits.

#### Deactivate an app instance in your org

To deactivate an instance from the OIN Wizard:

1. Go to **Test integration** > **Application instances for testing**.
1. Click **Clear filters** to see all instances in your org.
1. Disable the **ACTIVE** toggle next to the app instance you want to deactivate.

Alternatively, to deactivate an app instance without the OIN Wizard, see [Deactivate app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-deactivate).

The OIN Wizard checks the following for API service submissions:

* All required instances are created.
* Required client credentials are created.

## Submit your integration

After you successfully test your integration, you're ready to submit.

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

    * When you're constructing your app integration, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.

1. Using the OIN Wizard to submit an integration phase

    * If you need help with the OIN Wizard, review this document or see [Publish an OIN integration](/docs/guides/submit-app-overview/).
    * Submit your OIN Wizard question to <developers@okta.com> if you can't find an answer in the documentation.
    * If you have an integration status issue, contact <oin@okta.com>.

1. Testing an integration phase

    * If you have issues during your integration testing phase, you can post a question on the [Okta Developer Forum](https://devforum.okta.com/) or submit your question to <developers@okta.com>.
