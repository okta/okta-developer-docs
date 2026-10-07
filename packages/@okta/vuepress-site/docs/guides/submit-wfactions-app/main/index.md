---
title: Submit an integration with API integration actions
meta:
  - name: description
    content: Learn how to submit an integration that uses API integration actions to the Okta Integration Network (OIN) team for publication. The submission task is performed in the Okta Admin Console through the OIN Wizard.
layout: Guides
---

Learn how to submit an integration that's implemented with API integration actions to the Okta Integration Network (OIN). Currently, you can implement the provisioning and Universal Logout capabilities with API Integration Actions.

> **Note:** Integrations that have provisioning and Universal Logout capabilities also require the SSO capability. If you have an existing SSO integration, you don't need to create a new submission. Go to **Applications and Resources** > **Your OIN Integrations**, then select your integration. Select **Provisioning** or **Universal Logout** with **API integration actions** under the **Add integration capabilities** section.

---

#### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup/). The OIN Wizard is only available in Integrator Free Plan orgs.

* An admin user in the Integrator Free Plan org with either the super admin or the app and org admin roles

* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

* Google Chrome browser with the Okta Browser Plugin installed (see [OIN Wizard requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-requirements))

* An integration that's based on the [Build integrations with API Integration Actions](/docs/guides/build-api-actions/main/) guide

---

## Overview

Okta provides you with a seamless experience to integrate and submit your app for publication in the [Okta Integration Network (OIN)](https://www.okta.com/okta-integration-network/). When you obtain an [Integrator Free Plan org](https://developer.okta.com/signup/), you can use it as a sandbox to integrate your app with Okta and explore more Okta features. When you decide to publish your integration to the OIN, you can use the same Integrator Free Plan org to submit your integration using the OIN Wizard.

The OIN Wizard is a full-service tool in the Admin Console for you to do the following:

* Provide all your integration submission details.
* Generate an app instance in your org for testing:
  * Test your SSO integration with the OIN Submission Tester.
  * Test your provisioning and Entitlement Management capabilities manually.
  * Test your Universal Logout integration manually.
  * Validate your API integration actions.
* Submit your integration directly to the OIN team when you're satisfied with your test results.
* Monitor the status of your submissions through the **Your OIN Integrations** dashboard.
* Edit published integrations and resubmit them to the OIN.

The OIN team verifies your submitted integration before they publish it in the [OIN catalog](https://www.okta.com/integrations/).

> **Note:** Traditional SPA and mobile apps integrate with Okta using an OIDC flow that authenticates by exchanging and storing tokens on the client. They rely on client-side authentication and can't be added to the OIN Wizard directly. However, SaaS app stacks with SPA or mobile components can be included in the OIN Wizard if a backend server handles the authentication. See the [Enterprise-Ready workshop](https://developer.okta.com/blog/2023/07/28/oidc_workshop) for more information on authenticating SaaS apps with OIDC.

### Supported capabilities

This guide covers submissions that use API Integration Actions for the following capabilities:

* Universal Logout (with SSO)
* Provisioning
* Entitlement Management (with provisioning)

> **Notes:**
> * Universal Logout is supported with SAML 2.0 or OIDC SSO capability.
> * Entitlement Management is supported for provisioning integrations that manage entitlements. [Okta Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga) is required to use entitlements in Okta. See [Entitlement Management](https://help.okta.com/okta_help.htm?type=oie&id=ext-entitlement-mgt).
> * There are protocol-specific limitations on integrations in the OIN. See [OIN limitations](/docs/guides/submit-app-prereq/main/#oin-limitations).

## Start a submission

Review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission. You need to provide artifacts and technical details during the submission process.

> **Note:** As a best practice, add two or three extra admin users in your Okta org to manage the integration. This ensures that your team can access the integration for future updates. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and ensure that the app and org admin roles are assigned to your admin users. The super admin role also provides the same access, but Okta recommends limiting assignments to this role.

Start your integration submission for OIN publication:

1. Sign in to your Integrator Free Plan org as a user with either the super admin (`SUPER_ADMIN`) role, or the app (`APP_ADMIN`) and org (`ORG_ADMIN`) admin [roles](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#standard-roles).

    > **Note:** Submit your integration from an Okta account that has your company domain in the email address. You can't use an account with a personal email address. The OIN team doesn't review submissions from personal email accounts.

1. Go to **Applications and Resources** > **Your OIN Integrations** in the Admin Console.

   > **Note:** If you only want to test an existing submission, see [Navigate directly to test your integration](#navigate-directly-to-test-your-integration).

1. Click **Build new OIN integration**. The OIN Wizard appears.
1. Select the capability and protocol that your integration supports from the **Add integration capabilities** section.

    > **Note:** You can't select new or disabled capabilities for existing submissions.

1. Click **Add integration details**.

> **Note:** The instructions on this page are for the **API Integration Actions** low-code Workflows Integration Builder.
> If you want to change the instructions that you see on this page, select a different option from the **Instructions for** dropdown list.

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

2. In the **Tenant settings** section, specify the name and label for each tenant setting variable:

    | <div style="width:100px">Property</div> | Description  |
    | --------------- | ------------ |
    | **Label** `*`  | The tenant setting label that's displayed when admins install your app integration. For example: `Subdomain` or `Tenant name` |
     | **Name** `*`  | The tenant setting variable name. This is used to construct dynamic URLs or other app properties that are dependent on the tenant. It's hidden from admins and is only used to pass tenant details to your external app.<br>String is the only variable type supported.<br>**Note:** Use alphanumeric lowercase and underscore characters for the variable name field. The first character must be a letter and the maximum field length is 1024 characters. For example: `subdomain_div1` |

     `*` This section is optional, but if you specify a variable, both `Label` and `Name` properties are required.

1. Click **+ Add another** to add another variable. You can add up to eight variables.

   > **Note:**  Apps that are migrated from the OIN Manager and that have more than eight variables can retain those variables, but you can't add new ones. However, you can update or delete the existing variables.

1. If you need to delete a variable, click the delete icon (![trash can; delete icon](/img/icons/odyssey/delete.svg)) next to it.
<!--Odyssey icons sourced from: https://github.com/okta/odyssey/blob/main/packages/odyssey-icons/src/figma.generated/ -->

#### Support contact

1. Specify a support contact from your org:

    | <div style="width:150px">Property</div> | Description  |
    | ----------------- | ------------ |
    | **Support email** `*` | Specify an email that the Okta team can use to contact your org for emergencies and escalations. This field is private and not visible to customers. See [Customer support contact guidelines](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines).

#### Authentication settings

5. Specify authentication settings to your app resources for Universal Logout, provisioning, or entitlements.

| Property | Description |
|----------| ----------- |
| **Authentication mode** | Select the authentication mode for your integration actions. <br> <ul><li> **Basic**: Use the Basic authentication scheme. Basic authentication contains the default `auth_user_name` and `auth_user_password` settings available for tenant integration. See [Build Basic authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-connectorbuilder-auth-basic) in the Workflows product documentation. </li><li> **Custom**: Use a custom authentication scheme. See [Build custom authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-connectorbuilder-auth-custom) in the Workflows product documentation. </li><li> **OAuth 2**: Uses OAuth 2.0 Authorization Code grant flow. See [Build OAuth 2.0 authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-connectorbuilder-auth-oauth) in the Workflows product documentation. </li> </ul> |

| Custom | Settings required for API Integration Action custom authentication |
| ------- | ----------- |
| **Authentication variables** | Specify the variables used for **Custom** authentication in your integration actions. The variables are shown as connection parameters in the Integration Builder. |
| **Label** | Specify the label of the authentication variable. This is the display name for the parameter that is shown in the dialog when an admin sets up your integration. |
| **Name** | Specify the authentication variable name (the parameter name). |

| OAuth 2 | Settings required for API Integration Action OAuth 2.0 authentication |
| ------- | ----------- |
| **Authorize endpoint** | Specify the HTTPS authorize endpoint. For example: `https://myexample.com/oauth2/auth`<br> You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Token endpoint** | Specify the HTTPS token endpoint. For example: `https://myexample.com/oauth2/token`<br>You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Client ID** | Specify a client ID field to map to the Integration Builder. You can specify any string field. This field is automatically mapped to the **Client ID** field (`auth.client_id`) in the **Authentication mapping** section of your project in the Integration Builder. |
| **Client secret** | Specify the client secret field to map to the Integration Builder. You can specify any string field. This field is automatically mapped to the **Client Secret** field (`auth.client_secret`) in the **Authentication mapping** section of your project in the Integration Builder. |
| **Scopes** | (Optional) Specify scopes for the resources to access. |


6. Click **Save and start building**.

  The OIN Wizard redirects you to the Integration Builder to define API actions for your integration. See [Build integrations with API Integration Actions](/docs/guides/build-api-actions/main/).

 > **Note**: You can click **Skip to configure your integration** to bypass building your API integration actions. Continue to [Configure your integration](#configure-your-integration) if you have already defined all your API integration actions.

### Configure your integration

Configure your integration settings. Settings appear based on your capability selection.
#### Provisioning API Integration Actions

> **Notes:**
> * This section appears only if you select provisioning with API Integration Actions.
> * The instructions on this page are for **API Integration Actions**. If you want to change the instructions that you see on this page, select a different option from the **Instructions for** dropdown list.

1. Specify the flows that you built in API Integration Actions to support the following operation:

    | <div style="width:150px">Property</div> | Description  |
    | ----------------- | ------------ |
    | **User query** `*` | Operations that allow Okta to read and import users from your app. |
    | List users `*` | Specify the flow to list users. |
    | Get user by ID `*` | Specify the flow to retrieve a user by their ID. |
    | Get user by username `*` | Specify the flow to retrieve a user by their username. |
    | **User schema discovery** `*` | Operations that allow Okta to retrieve your app's user schema and the available attribute values. These are required for attribute mapping and profile sourcing. |
    | List user schema `*` | Specify the flow to list your user schema. |
    | List user schema property values `*` | Specify the flow to list your user schema and the available attribute values.        |
    | **User operations** | User lifecycle operations that Okta can perform in your app. Each operation is optional. However, they could be required, depending on the provisioning capability you want to support. Okta only calls the operations that you define. |
    | Create user | (Optional) Specify the flow for Okta to create a user in your app. |
    | Update user | (Optional) Specify the flow for Okta to update a user in your app. |
    | Update user password | (Optional) Specify the flow for Okta to update a user password in your app. |
    | Activate user | (Optional) Specify the flow for Okta to activate a user in your app. |
    | Deactivate user | (Optional) Specify the flow for Okta to deactivate a user in your app. |
    | **Group query** `*` | Operations that allow Okta to read and import groups from your app. |
    | List groups `*` | Specify the flow to list the groups in your app. |
    | Get group by ID `*` | Specify the flow to retrieve a group by their ID. |
    | **Group operations** | Operations that allow Okta to read and manage groups in your app. |
    | Enable group operations | Enable group operations. Specify flows for all group operations if you enable this feature. |
    | List groups by display name | Specify the flow to list groups in your app based on the group display name. |
    | Create group  | Specify the flow to create a group in your app. |
    | Update group  | Specify the flow to update a group in your app. |
    | Remove group  | Specify the flow to remove a group in your app. |
    | **Group Membership** | Operations that allow Okta to read and manage group memberships in your app. |
    | Enable group membership | Enable group membership operations. Specify flows for all group membership operations if you enable this feature. |
    | List group members | Specify the flow to list group members in your app. |
    | Add group members | Specify the flow to add members to a group in your app. |
    | Remove group members | Specify the flow to remove members from a group in your app. |

    `*` Required properties

#### Entitlement API Integration Actions

> **Notes:**
> * This section appears if you select **Entitlement Management** with API Integration Actions.
> * Entitlement Management is only supported with provisioning integrations. [Okta Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga) is required to use entitlements in Okta. See [Entitlement Management](https://help.okta.com/okta_help.htm?type=oie&id=ext-entitlement-mgt).

Specify the following properties for Entitlement Management submissions:

| <div style="width:150px">Property</div> | Description |
| ----------------- | ------------ |
| **List entitlement schema** | Specify the flow to list the entitlement schema in your app. |
| **List entitlement schema property values** | Specify the flow to list entitlement-schema property values. |

#### Universal Logout API Integration Actions

> **Notes:**
> * This section appears only if you select **Universal Logout** with API Integration Actions.
> * Universal Logout is only supported with SSO integrations.
> * If you want instructions for SSO integrations, select **OpenID Connect** or **SAML 2.0** from the **Instructions for** dropdown list on the right.
> * For integrations that include API actions, always access the OIN Wizard through the **Application** > **Your OIN Integrations** path in the Admin Console.

1. Specify the following properties for Universal Logout:

    | <div style="width:150px">Property</div> | Description  |
    | ----------------- | ------------ |
    | **Proprietary** `*` | Specify the flow for Universal Logout in your app. |

    `*` Required properties

<br>

2. Click **Get started with testing** to save your edits and move to the **Test your integration** section, where you need to [enter test information](#enter-test-information) for your integration.

#### Dynamic properties with Okta Expression Language

 The OIN Wizard supports [Okta Expression Language](/docs/reference/okta-expression-language/#reference-user-attributes) to generate dynamic properties, such as URLs or URIs, based on your customer tenant. You can specify dynamic strings for your API integration actions properties in the OIN Wizard:

1. Add your [tenant settings](#tenant-settings) in the OIN Wizard. These settings become fields for customer admins to enter during your OIN integration installation to identify their tenant.

2. Use the tenant setting variables with the Expression Language format in your integration properties for dynamic values based on customer information.

For example, if you have a tenant setting variable named `subdomain`, then you can set your **Authorize endpoint** string to ` 'https://' + app.subdomain + '.example.org/oauth/v1/authorize'`. When your customer admin sets their `subdomain` setting value to `berryfarm`, then `https://berryfarm.example.org/oauth/v1/authorize` is their base URL.

> **Note**: A variable can include a complete URL (for example, `https://example.com/strawberry/`). This enables you to use global variables, such as `app.baseURL`.

The following are Expression Language specifics for API integrations action properties:

* Any [tenant settings](#tenant-settings) that you define in the OIN Wizard are considered [application properties](/docs/reference/okta-expression-language/#application-properties). They have an `app.` prefix when you reference them in Expression Language. For example, if your integration variable name is `subdomain`, then you can reference that variable using `app.subdomain`.

* Tenant setting variables that you define in the OIN Wizard appear in the Integration Builder's **Authentication mapping** section. You can map the API integration action authentication parameters to the OIN Wizard tenant variables.

### Enter test information

From the OIN Wizard **Test your integration** page, specify the information that's required for testing your integration. The OIN team uses this information to verify your integration after submission.

#### Test information for Okta review

A dedicated test admin account in your app is required for Okta integration testing. This test account needs to be active during the submission review period for Okta to test and troubleshoot your integration. Ensure that the test admin account has:

* Privileges to configure admin settings in your test app
* Privileges to administer test users in your test app

* Credentials to access your app
<br><br>

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

> **Notes:** For integrations that use API Integration Actions:
> * Provide credentials for the OIN team to conduct [QA testing](/docs/guides/submit-app-overview/#understand-the-submission-review-process). You can include instructions on obtaining credentials from your app.
> * Before you test your integration, ensure that your flows are active in the Integration Builder.

Click **Test your integration** to save your test information and begin the integration testing phase.

## Test your integration

The OIN Wizard journey includes the **Test integration** experience page to help you configure and test your integration within the same org before submission. These are the tasks that you need to complete:

1. [Generate instances for testing](#generate-instances-for-testing). You need to create an app integration instance to test each protocol that your integration supports.

2. Test your integration.

     * For an SSO integration, test the required flows in the [OIN Submission Tester](#oin-submission-tester) with your generated test instance. Fix any test failures from the OIN Submission Tester, then regenerate the test instance (if necessary) and retest.

   * For a Universal Logout integration, test the logout flow manually. See [Test your Universal Logout integration](#test-your-universal-logout-integration).

  * In addition to testing your provisioning flows in the Integration Builder, Okta also provides a test plan for you to functionally test your provisioning flow through the Admin Console and End-User Dashboard. See [Test API integration action provisioning](#test-api-integration-action-provisioning).

3. [Submit your integration](#submit-your-integration) after all required tests are successful.

> **Note:** You must have the Okta Browser Plugin installed with **Allow in Incognito** enabled before you use the **OIN Submission Tester**. See [OIN Wizard requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-requirements).

#### Navigate directly to test your integration

You can navigate directly to the OIN Wizard **Test integration** page if you have an existing submission in the **Your OIN Integrations** dashboard. You can bypass the **[Select protocol](#start-a-submission)**, **[Configure your integration](#configure-your-integration)**, and **[Test your integration](#enter-test-information)** pages in the OIN Wizard, and start generating instances for testing. This saves you time and avoids unnecessary updates to an existing integration submission.

Follow these steps to bypass the configuration pages in the OIN Wizard:

1. Select **Applications and Resources** > **Your OIN Integrations**. Then select the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) next to the integration submission that you want to test.
1. Select **Test your integration**.

   * The OIN Wizard **Test integration** page appears for you to generate an instance and test your integration.

   * If you haven't specified test information in the **[Test your integration](#enter-test-information)** page, then you're directed to this page to enter testing details. You can go to the **Test integration** page only if the protocols, configuration, and test details are provided in your submission.

   * If your integration is in read-only mode, click **Edit integration** to enter test details before testing.

### Generate instances for testing

Generate instances for testing in your Integrator Free Plan org directly from the OIN Wizard. The OIN Wizard takes the configuration and test information from your OIN submission and allows you to configure a specific integration instance to your test app. You can test the admin and end user sign-in experiences with the generated instance flow.

> **Note:** Okta recommends that you:
> * Separate environments for development, testing, and production.
> * Use the Integrator Free Plan org as part of your development and testing environment.
> * Don't connect the generated app instance from the Integrator Free Plan org to your production environment. Connecting your development and testing environment with your production environment creates several potential risks, including unintentionally modifying data and misconfiguring your service. This could result in providing inadequate security or disrupting your service.

Okta recommends that you generate an instance for testing each capability supported by your integration:

* You must generate separate instances for testing if you support two SSO protocols (one for OIDC and one for SAML). The OIN Submission Tester can only test one protocol at a time.
* If your SSO integration supports provisioning, create one instance specifically for provisioning testing. You also need to create a separate instance for each supported SSO protocol testing.
* For a Universal Logout integration, you can use the same instance that you created for SSO protocol testing.

There are certain conditions where you can test two capabilities on one instance. You can create one instance for SSO and provisioining testing if your integration meets all of these conditions:

* It supports provisioning and one SSO protocol
* It doesn't support JIT provisioning
* The **Create User** operation is enabled

The Integrator Free Plan org has no limit on active instances. You can create as many test instances as needed for your integration. To deactivate any instances you no longer need, see [Deactivate an app instance in your org](#deactivate-an-app-instance-in-your-org).

#### Generate an instance for API integration actions


1. From the **Test integration** page, click **Generate instance**.

   A page appears to add your instance details. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app).

   When your integration is published in the OIN catalog, the customer admin uses the Admin Console **Browse App Catalog** > [add an existing app integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) page to add your integration to their Okta org. The next few steps are exactly what your customer admins experience when they instantiate your integration with Okta. This enables you to assume the customer admin persona to verify that app labels and properties are appropriate for your integration.

   If you need to change any labels or properties, go back to edit your submission.

1. In the **General settings** tab, enter an **Application label** and any other required integration properties.
1. Click **Done**. Your generated test instance appears with more tabs for configuration.
1. If your integration supports Entitlement Management, go to **Entitlement Management** in the **General** tab. Click **Edit** and enable Entitlement Management.

   The **Governance** tab appears in the app page.

1. If your integration supports provisioning, click **Provisioning** > **Configure API Integration**.
    1. Select **Enable API integration**.
    1. Click **Save**.
    1. Select **Settings** > **To Okta** from the updated **Provisioning** tab.
    1. In the **General** section, click **Edit** to schedule imports and configure the username format for imported users.

       You can also define a percentage of acceptable assignments before the [import safeguards](https://help.okta.com/okta_help.htm?id=csh-eu-import-safeguard) feature is automatically triggered.

1. Click **Save**.

#### Assign test users to your integration instance

For SSO-only flow tests, create your test users in Okta before you assign them to your app. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign).

For SSO flow tests without JIT provisioning, you need to create the same test user in your app. If the app supports JIT provisioning, Okta provisions the test user automatically.

For provisioning, you can assign an imported user to your app. Alternatively, you can create a user in Okta and push them to the app. Then you can assign the user to the app. See [About adding provisioned users](https://help.okta.com/okta_help.htm?type=oie&id=lcm-about-user-management).

> **Note:** You need an Okta admin role that grants permission to create users.

To assign test users to your app:

1. In the OIN Wizard, go to **Test integration** > **Generate instance**.
1. Click the **Assignments** tab.
1. Click **Assign**, and then select either **Assign to People** or **Assign to Groups**.
1. Enter the people or groups that you want to assign to the app, and then click **Assign** for each.
1. Verify the user-specific attributes for the assigned users, and then select **Save and Go Back**.
1. Click **Done**.

   > **Note:** If your integration supports Entitlement Management, assign entitlements to the users manually for testing or automatically through a policy. See [Assign entitlements to users](https://help.okta.com/okta_help.htm?type=oie&id=assign_entitlements_to_users).

1. Click **Begin testing** in the OIN Wizard. After the **Test integration** page appears, continue to the [Application instances for testing](#application-instances-for-testing) section to include your test instance in the OIN Submission Tester.

   > **Note:** If you're not in the OIN Wizard, go to **Your OIN Integration** > **Select protocol**  > **Configure your integration** > **Test integration**.

### Required app instances

The **Required app instances** field displays the instances detected in your org. Use these instances to test your integration. This field also shows you the test instances required for the **OIN Submission Tester** based on your selected protocols:

* The **CURRENT VERSION** status indicates the instances that you need to test your current integration submission.
* The **PUBLISHED VERSION** status indicates the instances that you need to test backwards compatibility if you edit a previously published integration. See [Update a published integration with the OIN Wizard](/docs/guides/update-oin-app/).


### Application instances for testing

The **Application instances for testing** section displays, by default, the instances available in your org that are eligible for submission testing.

> **Note:** The filter (![filter icon](/img/icons/odyssey/filter.svg)) is automatically set to only show eligible instances.

An instance is eligible if it was generated from the latest version of the integration submission in the OIN Wizard. An instance is ineligible if it was generated from a previous version of the integration submission and you later made edits to the submission. This is to ensure that you test your integration based on the latest submission details.

If you modify a published OIN integration, you must generate an instance that's based on the currently published integration for backwards compatibility testing. A backward-compatible instance is eligible if it was generated from the published version of the integration before any edits are made in the current submission. The OIN Wizard detects if you're modifying a published OIN integration and asks you to generate a backward-compatible instance before you make any edits.

> **Note:** The Integrator Free Plan org has no limit on active instances. You can create as many test instances as needed for your integration. To deactivate any instances you no longer need, see [Deactivate an app instance in your org](#deactivate-an-app-instance-in-your-org).

#### Add to Tester

> **Note:** The OIN Submission Tester only supports SSO integrations. The **Add to Tester** option isn't available for provisioning integrations with SCIM or API Integration Actions.

* Click **Add to Tester** next to the app in the **Application instances for testing** list. This includes it for testing with the OIN Submission Tester. The **Add to Tester** option appears only for active and eligible apps.

    The test cases are populated with the app name and the **Run test** option is enabled in the OIN Submission Tester.

* Click **Remove from Tester** to disable the test cases that are associated with the app.

    The app name and test results are removed from the corresponding test cases in the OIN Submission Tester. The **Run test** option is also disabled.

#### Deactivate an app instance in your org

To deactivate an instance from the OIN Wizard:

1. Go to **Test integration** > **Application instances for testing**.
1. Click **Clear filters** to see all instances in your org.
1. Disable the **ACTIVE** toggle next to the app instance you want to deactivate.

Alternatively, to deactivate an app instance without the OIN Wizard, see [Deactivate app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-deactivate).


#### Update an app instance in your org

To edit the app instance from the OIN Wizard, follow these steps:

1. Go to **Test integration** > **Application instances for testing**.
1. Click **Clear filters** to see all instances in your org if you don't see the instance that you want to edit.
1. Select **Update instance details** from the more icon <span>(<img style="display: inline-block; margin-bottom: 0;" src="/img/icons/odyssey/more.svg" alt="more icon"/>)</span> next to the app instance you want to update. The instance details page appears.
1. Edit the app instance. You can [edit app instance settings](#generate-an-instance-for) or [assign users to your app instance](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_Apps_Page-assign).

5. Return to the OIN Wizard:

    * Click **Begin testing** (upper-right corner) for the current submission instance.

        The **Test integration** page appears.

    * Click **Go to integrations** (upper-right corner) for the backward-compatible instance.

        The **Your OIN Integrations** dashboard appears.
        Go to your integration submission > **Configure your integration** > **Get started with testing** to continue with testing your integration.

> **Note:** After you edit a test instance, any previous test results for that instance are invalid and removed from the OIN Submission Tester. Rerun all the required tests again with the new instance.

### OIN Submission Tester

> **Note:** The OIN Submission Tester only supports SSO integrations.

The **Test integration** page includes the integrated OIN Submission Tester, which is a plugin app that runs the minimal tests required to ensure that your sign-in flow works as expected. Ideally, you want to execute other variations of these test cases without the OIN Submission Tester, such as negative and edge test cases. You can't submit your integration in the OIN Wizard until all required tests in the OIN Submission Tester pass.

Before you start testing with the OIN Submission Tester, see [OIN Wizard test requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-test-requirements).

> **Notes:**
> * Click **Initialize Tester** if you're using the OIN Submission Tester for the first time.
> * Click **Refresh Tester session** for a new test session if the OIN Submission Tester session expired.
> * See [Troubleshoot the OIN Submission Tester](/docs/guides/submit-app-prereq/main/#troubleshoot-the-oin-submission-tester) if you have issues loading the OIN Submission Tester.

The OIN Submission Tester includes the mechanism to test the following flows:

* IdP flow
* SP flow
* Just-In-Time (JIT) provisioning (with IdP flow)
* Just-In-Time (JIT) provisioning (with SP flow)

> **Note:** The **JIT provisioning (with SP flow)** test case appears in the OIN Submission Tester if your integration supports JIT and only the SP flow. If your integration supports JIT, IdP, and SP flows, then a successful **JIT provisioning (with IdP flow)** test is sufficient for the submission.

The test cases for these flows appear in the **Test integration using the OIN Submission Tester** section depending on your OIN Wizard [test information](#test-information-for-okta-review).

> **Note:** See [Run test](#run-tests) for the steps on how to run each test case.

Your test results in the OIN Submission Tester are valid for 48 hours after the test run. Rerun all your test cases in the OIN Submission Tester if they expired.

[Submit your integration](#submit-your-integration) if all your tests have passed. If you have errors, see [Failed tests](#failed-tests) to resolve the errors.

#### Run tests

The **Run test** option is enabled for test cases that have an eligible test instance.

After you click **Run test**, the OIN Submission Tester opens a browser window in incognito mode. Use the incognito browser window to execute the test and verify it with the **Test in progress** dialog that appears in the upper-right corner.

##### Run the IdP flow test

To run the IdP flow test:

1. Click **Run test** next to the **IdP flow** test case.

   A new Chrome browser in incognito mode appears for you to sign in.

1. Sign in to Okta as an end user who's assigned to your test app instance.

    * Your app tile appears on the Okta End-User Dashboard.
    * The tester selects the app tile and you're signed in to your app.

1. Verify that the test end user is signed in to your app with the correct profile.
1. Select **The user successfully signed in to your app** in the upper-right **Test in progress** dialog to confirm that the IdP flow test passed.
1. Click **Continue** from the **Test in progress** dialog to sign out of your app.

   The incognito browser closes and you're redirected to the OIN Submission Tester. The OIN Submission Tester records the test run result and time stamp.

1. Click the **IdP flow** expand icon <span>(<img style="display: inline-block; margin-bottom: 0;" src="/img/icons/odyssey/chevron-down.svg" alt="more icon"/>)</span> to view the test steps and network traffic details for the test run.

    If your test run wasn't successful, this is a useful tool to troubleshoot the issues and correct your integration, instance, or submission details.

##### Run the SP flow test

1. Click **Run test** next to the **SP flow** test case.

    A new Chrome browser in incognito mode appears for you to sign in.

1. Sign in to your app as the test end user who's assigned to your app instance.
1. Verify that the test end user is signed in to your app with the correct profile.
1. Select **The user successfully signed in to your app** in the upper-right **Test in progress** dialog to confirm that the SP flow test passed.
1. Click **Continue** from the **Test in progress** dialog to sign out of your app.

    The incognito browser closes and you're redirected to the OIN Submission Tester. The OIN Submission Tester records the test run result and time stamp.

1. Click the **SP flow** expand icon <span>(<img style="display: inline-block; margin-bottom: 0;" src="/img/icons/odyssey/chevron-down.svg" alt="more icon"/>)</span> to view the test steps and network traffic details for the test run.

##### Run the JIT provisioning with IdP flow test

For the JIT provisioning test, the OIN Submission Tester creates a temporary Okta test user account for you to verify that JIT provisioning is successful. The OIN Submission Tester then removes the test user account from Okta to complete the test.

> **Notes:**
> * Ensure that your app integration supports JIT provisioning before you run the JIT provisioning test.
> * For JIT provisioning testing, you must have either the super admin role or both the app admin and org admin roles assigned to you.
> * The JIT provisioning test case appears only if you select **Supports Just-In-Time provisioning** in your submission.

To run the JIT provisioning with IdP flow test:

1. Click **Run test** next to the **JIT provisioning (w/ IdP flow)** test case.

    The OIN Submission Tester executes the following steps for the JIT provisioning test case:
    1. Creates a user in Okta and assigns them to the test app instance.
    [[style="list-style-type:lower-alpha"]]
    1. Opens an incognito browser window to sign in to Okta.
    1. Sign in to Okta as the test user.
    1. Selects the app tile.
    1. Wait for confirmation that the new test user signed in and was provisioned in your app. You're responsible for verifying this step.

1. Verify that the test user is signed in to your app with the correct first name, last name, and email attributes.

    > **Note:** You can go back to the OIN Submission Tester window and expand the test case to view network traffic details for this test run. The **NETWORK TRAFFIC** tab contains API calls to Okta with the test user details in the request payload.

1. Select **The user successfully signed in to your app** in the upper-right **Test in progress** dialog to confirm that the JIT provisioning IdP flow test passed.
1. Click **Continue** from the **Test in progress** dialog to sign out of your app.

    The OIN Submission Tester executes the following steps after you click **Continue**:
    1. Signs out of the app and closes the incognito browser window.
    [[style="list-style-type:lower-alpha"]]
    1. Unassigns the test user from the app instance in Okta.
    1. Deletes the test user from Okta.
    1. Records the test run result and time stamp in the OIN Submission Tester.
    1. Redirects you to the OIN Submission Tester.

1. Click the **JIT provisioning (w/ IdP flow)** expand icon <span>(<img style="display: inline-block; margin-bottom: 0;" src="/img/icons/odyssey/chevron-down.svg" alt="more icon"/>)</span> to view the test steps and network traffic details for the test run.

> **Note:** The test user account created in your app from JIT provisioning persists after the JIT provisioning test. The OIN Submission Tester only removes the temporary test user account from your Okta org. It's your responsibility to manage the JIT test user accounts in your app.

##### Run the JIT provisioning with SP flow test

You're only required to pass one JIT provisioning test case to submit your integration. The OIN Submission Tester includes the **JIT provisioning (w/ SP flow)** test case if you support JIT and only the SP flow. If your integration supports JIT, IdP, and SP flows, then a successful **JIT provisioning (w/ IdP flow)** test is sufficient for submission.

Similar to the [JIT provisioning with IdP flow test](#run-the-jit-provisioning-with-idp-flow-test), the OIN Submission Tester creates a temporary Okta test user account for you to verify that JIT provisioning was successful. The OIN Submission Tester then removes the test user account from Okta to complete the test.

 Follow the same steps in [Run the JIT provisioning with IdP flow test](#run-the-jit-provisioning-with-idp-flow-test) to run the JIT provisioning with SP flow test. The only difference in the SP test is that the OIN Submission Tester opens an incognito browser window to sign in to your app first.

#### Failed tests

If any of your test cases fail, investigate and resolve the failure before you submit your integration. You can only submit integrations that have successfully passed all the required tests in the OIN Submission Tester.

If you have to update the SSO or test detail properties in your submission to resolve your failed test cases, then [generate a new app integration instance for testing](#generate-an-instance-for). [Assign test users to your new integration instance](#assign-test-users-to-your-integration-instance) before you execute all your SSO test cases again.

> **Note:** You don't have to generate a new app instance for every failed test scenario. If you have an environment issue or if you forgot to assign a user, you can fix your configuration and run the tests again. Generate a new instance if you need to modify an SSO property, such as an integration variable, a redirect URI, or an ACS URL.

It's good practice to deactivate your test instances that aren't in use. You can delete the instance later to clean up your app integration list.

If you have questions or need more support, email Okta developer support at <developers@okta.com> and include your test results. Follow these steps to obtain your test results:

1. From the OIN Submission Tester, click **Export results** (upper-right corner) to download a JSON-formatted file of all your test results.

All required tests in the OIN Submission Tester must have passed within 48 hours of submitting your integration.

### Test your Universal Logout integration
If your integration supports Universal Logout, you need to test the logout flow manually with your generated test app instance.

1. Ensure that you have an active end user session on your app.
1. As an Okta admin, go to **Directory** > **People** in the Admin Console
1. Select the user who has the current session on your app.
1. Click **More Actions** > **Clear User Sessions**.
1. Select **Also include logout enabled apps and Okta API tokens**, and then click **Clear and revoke**.
1. Go back to the app as the end user, and ensure that the session is terminated.

> **Note**: For partial Universal Logout, the app only revokes the user's refresh tokens when it ends the user's Okta session. This prevents the user from getting new access in the future. However, existing user sessions aren't terminated until the user's existing access tokens expire or the user signs out of an app.

### Validate API integration action flows

You must validate all active flows from your Integration Builder project before you can submit your integration.

1. Click **Validate flows** to validate all your API integration action flows.
1. Resolve any errors from the validation.

> **Note:** The validation process from the OIN Wizard validates all the active flows that you have in your Integration Builder project. This includes active flows from different folders in the project.

### Test API integration action provisioning

Okta recommends that you run manual provisioning tests in your Okta org with your generated test app instance.

Use the [Okta Provisioning Test Plan](/standards/SCIM/SCIMFiles/okta_actions_test_plan_provisioning.xlsx) for guidance. The test plan provides test cases for full provisioning support. Skip the test cases for the features that your integration doesn't support.

Ensure that all the supported test cases pass before you submit your provisioning integration.

## Submit your integration

After you successfully test your integration, you're ready to submit.

The OIN Wizard checks the following for SSO submissions:

* All required instances are detected.
* All required instances are active.
* All required tests passed within the last 48 hours.

The OIN Wizard checks the following for API integration action submissions:

* All required instances are detected.
* All required instances are active.
* All flows are validated.

The OIN Wizard checks the following for Universal Logout submissions:

* All required instances are detected.

<p><p>

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

## See also

* [API Integration Actions](/docs/guides/oin-api-actions/) overview
* [Build an integration with API Integration Actions](/docs/guides/build-api-actions/main/)
* [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder)