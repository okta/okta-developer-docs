---
title: Submit an SSO integration with the OIN Wizard
meta:
  - name: description
    content: Learn how to submit your integration to the Okta Integration Network (OIN) team for publication. The submission task is performed in the Okta Admin Console through the OIN Wizard.
layout: Guides
---

Use this guide to learn how to submit an SSO integration to the Okta Integration Network (OIN) team using the OIN Wizard.

---

#### Learning outcomes

* Learn how to submit an SSO integration using the OIN Wizard.
* Learn how to test your SSO integration with the OIN Submission Tester before submission.

#### What you need

* An [Okta Developer Edition org](https://developer.okta.com/signup/). The OIN Wizard is only available in Okta Developer Edition orgs.
* An admin user in the Okta Developer Edition org with either the super admin or the app and org admin roles
* A functional SSO integration based on the [Build a Single Sign-On integration](/docs/guides/build-sso-integration/) guide
* Google Chrome browser with the Okta Browser Plugin installed (see [OIN Wizard requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-requirements))
* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

---

## Overview

Okta provides you with a seamless experience to integrate and submit your app for publication in the [Okta Integration Network (OIN)](https://www.okta.com/okta-integration-network/). When you obtain an [Okta Developer Edition org](https://developer.okta.com/signup/), you can use it as a sandbox to integrate your app with Okta and explore more Okta features. When you decide to publish your integration to the OIN, you can use the same Developer Edition org to submit your integration using the OIN Wizard.

The OIN Wizard is a full-service tool in the Admin Console for you to do the following:

* Provide all your integration submission details.
* Generate an app instance in your org for testing.
* Test your SSO integration with the OIN Submission Tester.
* Submit your integration directly to the OIN team when you're satisfied with your test results.
* Monitor the status of your submissions through the **Your OIN Integrations** dashboard.

The OIN team verifies your submitted integration before they publish it in the [OIN catalog](https://www.okta.com/integrations/).

> **Note:** SPA apps aren't accepted in the OIN Wizard. You can only submit cloud-based SaaS apps (web apps with a back end) in the OIN Wizard.

### Protocols supported

This guide covers submissions that use the following protocols:

* [OpenID Connect (OIDC)](https://openid.net/connect/)

    > **Note:** <br>
    > * To support the potentially large number of Okta orgs that access an authorization server through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server.
    > * ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* [Security Assertion Markup Language (SAML)](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

    > **Notes:**
    > * SAML integrations must use SHA256 encryption for security. If you're using SHA-1 for encryption, see our guide on how to [Upgrade SAML Apps to SHA256](/docs/guides/updating-saml-cert/).
    > * The OIN Wizard places certain limits on SAML integration submissions. See [OIN limitations](/docs/guides/submit-app-prereq/main/#oin-limitations).

> **Note:** SWA app integrations are no longer accepted for publication in the OIN catalog. However, the OIN team still maintains existing SWA apps.

## Start a submission

Review the [OIN submission requirements](/docs/guides/submit-app-prereq) before you start your submission. There are artifacts and technical details that you need to provide during the submission process.

> **Note:** As a best practice, add two or three extra admin users in your Okta org to manage the integration. This ensures that your team can access the integration for updates in the future. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and ensure that the super admin or the app admin role is assigned to the admin users.

Start your integration submission for OIN publication:

1. Sign in to your [Developer Edition org](/login/) as a user with either the super admin role, or the app and org admin roles.

    Submit your integration from an Okta account that has your company domain in the email address. You can't use an account with a personal email address. The OIN team doesn't review submissions from a personal email account.

1. Go to **Applications** > **Your OIN Integrations** in the Admin Console.
1. Click **Build new OIN integration**. The OIN Wizard appears.
1. Select **<StackSnippet snippet="protocol-fullname" inline/>** from the **Select your protocol** section.
    > **Note:** If you want to change the protocol instructions on this page, select the protocol you want from the **Instructions for** dropdown list on the right.

    You can select both **OpenID Connect (OIDC)** and **Security Assertion Markup Language (SAML)** protocols in the same submission.

1. Click **Configure your integration**.

### Configure your integration

Continue with the OIN Wizard and configure your integration:

#### OIN catalog properties

1. In the **OIN catalog properties** section, specify the following OIN catalog information:

    | <div style="width:150px">Property</div>| Description  |
    | ----------------- | ------------ |
    | **Display name** `*` | Provide a name for your integration. This is the main title used for your integration in the OIN.<br>The maximum field length is 64 characters. |
    | **Description** `*` | Give a general description of your app and the benefits of this integration to your customers. See [App description guidelines](/docs/guides/submit-app-prereq/main/#app-description-guidelines). |
    | **Logo** `*` | Upload a PNG, JPG, or GIF file of a logo to accompany your integration in the catalog. The logo file must be less than one MB. See [Logo guidelines](/docs/guides/submit-app-prereq/main/#logo-guidelines). |

    `*` Required properties

#### Integration variables

Configure integration variables if your URLs are dynamic for each tenant. The variables are for your customer admins to add their specific tenant values during installation.

<StackSnippet snippet="variable-desc" />
<br>

1. In the **Integration variables** section, specify the name and label for each variable:

    | <div style="width:100px">Property</div> | Description  |
    | --------------- | ------------ |
    | **Label** `*`  | A descriptive name for the dynamic variable that admins see when they install your app integration |
     | **Name** `*`  | Specify the variable name. This variable name is used to construct the dynamic URL. It's hidden from admins and is only passed to your external app.<br>String is the only variable type supported.<br>**Note:** Use alphanumeric lowercase and underscore characters for the variable name field. The first character must be a letter and the maximum field length is 1024 characters. For example: `subdomain_div1` |

     `*` This section is optional, but if you specify a variable, both `Label` and `Name` properties are required.

1. Click **+ Add another** to add another variable. You can add up to three variables.

1. If you need to delete a variable, click the delete icon (![trash can; delete icon](/img/icons/odyssey/delete.svg)) next to it.
<!--Odyssey icons sourced from: https://github.com/okta/odyssey/blob/main/packages/odyssey-icons/src/figma.generated/ -->

#### <StackSnippet snippet="protocol-name" inline/> properties

Continue with the OIN Wizard and configure your protocol settings:

1. Specify the following protocol properties in the **<StackSnippet snippet="protocol-name" inline/> properties** section:

    <StackSnippet snippet="protocol-properties" />

1. Click **Get started with testing** to save your edits and move to the testing section, where you need to enter your integration test details.

### Enter test information

From the OIN Wizard **Test your integration experience** page, specify the information required for testing your integration. An OIN analyst uses this information to verify your integration after submission.

#### Test information

A dedicated test admin account in your app is required for Okta integration testing. This test account needs to be active beyond the submission period in case Okta needs to update or troubleshoot your app integration. Ensure that the test admin account has:

* Privileges to configure SSO in your test app
* Privileges to administer test users in your test app

See [Test account guidelines](/docs/guides/submit-app-prereq/main/#test-account-guidelines).

> **Note**: This admin account is in your app and not an account in Okta.

1. In the **Testing information** section, specify the following test account details:

    | <div style="width:100px">Property</div> | Description  |
    | --------------- | ------------ |
    | **Test account URL** `*`  | A static URL to sign in to your app. An OIN analyst goes to this URL and uses the account credentials you provide in the subsequent fields to sign in to your app. |
    | **Username** `*`  | The username for your test admin account. The OIN analyst signs in with this username to execute test cases. The preferred account username is `isvtest@okta.com`. |
    | **Password** `*`  | The password for your test admin account |
    | **Support contact** `*`  | Provide an email for Okta to contact your company about your integration. This email isn't exposed in the OIN catalogs or to your customers. Okta uses this email to contact your company for issues during the QA testing phase or for ongoing maintenance of your integration in the OIN. See [Escalation support contact](/docs/guides/submit-app-prereq/main/#customer-support-contact-guidelines) in the customer support-contact guidelines. |
    | **Testing instructions** | Include any other information that you think the OIN analyst needs to know about your integration (such as the admin account or the testing configuration). You can also provide instructions on how to add test user accounts. |

    `*` Required properties

#### <StackSnippet snippet="protocol-name" inline/> tests

Continue with the OIN Wizard and specify your supported SSO flows:

1. In the **<StackSnippet snippet="protocol-name" inline/> tests** section, specify the following sign-in flow details:

    <StackSnippet snippet="protocol-test-flow" />

1. Click **Test your integration** to save your test information and begin the testing phase.

## Test your integration

The OIN Wizard journey includes the **Test your integration experience** page to help you configure and test your integration within the same org before submission. This page functions in a top-down approach, where you need to do the following:

1. Generate instances for testing.
2. Test the required flows in the OIN Submission Tester with your generated test instances.
3. Fix any test failures from the OIN Submission Tester, then regenerate the app instance (if necessary) and retest.
4. Submit your integration after all required tests ran successfully in the OIN Submission Tester.

> **Notes:**
> * You must have the Okta Browser Plugin installed with **Allow in Incognito** enabled before you begin the **Test your integration experience** journey.
> * For testing in the OIN Wizard, if you don't have the super admin role, then you must have both the app admin and the org admin roles assigned. See [OIN Wizard requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-requirements).

### Generate instances for testing

Generate instances for testing in your Okta Developer Edition org directly from the OIN Wizard. The Wizard takes the configuration and test information from your OIN submission and allows you to configure a specific integration instance to your test app. The generated instance allows you to test your customer admin experience and end-user sign-in experience. Generate an instance for each SSO protocol that your integration supports.

To generate an integration instance:

1. From the **Test your integration experience** page, click **Generate instance**.

    A page appears to add your instance details. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app).

    When your integration is published in the OIN catalog, the customer admin uses the Admin Console **Browse App Catalog** > [add an existing app integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) page to add your integration to their Okta org. The next few steps are exactly what your customer admins experience when they instantiate your integration with Okta. This enables you to assume the customer admin persona to verify that app labels and properties are appropriate for your integration.

    If you need to change any labels or properties, go back to edit your submission.

    > **Note:** There's a limit of five app instances in a Developer Edition org. **Generate instance** is deactivated when you reach this limit. Deactivate unused instances to make room for new instances in your org. See [Deactivate app instances in your org](#deactivate-an-app-instance-in-your-org).

<StackSnippet snippet="test-instance" />
<br>

7. Follow these steps if you have an Identity Engine <ApiLifecycle access="ie" /> &nbsp;Developer Edition org:
   1. Click the **Sign On** tab, scroll to the **User authentication** section and click **Edit**.
   1. Select **Password only** from the **Authentication policy** dropdown menu.
   {style="list-style-type:lower-alpha"}
   1. Click **Save**.
   > **Note:** Most recent Okta Developer Edition orgs are Identity Engine orgs. See [OIN Wizard authentication policy for testing](/docs/guides/submit-app-prereq/main/#oin-wizard-authentication-policy-for-testing).

#### Assign test users to your integration instance

Assign users to your integration instance to test your SSO flow. Create your test users in Okta before you assign them to your integration. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topics in the Okta product documentation.

For SSO flow tests without JIT provisioning, you also need to create the same test user in your app. If your integration supports JIT provisioning, Okta provisions the test user on your app automatically.

> **Note:** You need to have the org admin role assigned to you before you can create users in Okta.

To assign test users to your integration:

1. Continue from the OIN Wizard > **Test your integration experience** > **Generate instance** pages. Alternatively, if you aren't in the OIN Wizard, go to **Applications** > **Applications** > your app integration instance in the Admin Console.
    > **Note:**  If you aren't in the OIN Wizard, ensure that you've generated your app instance from the OIN Wizard.
1. From your app instance page, click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have SSO into your app, and then click **Assign** for each.
1. Verify the user-specific attributes for any people that you add, and then select **Save and Go Back**.
1. Click **Done**.
1. Click **Begin testing** (upper-right corner) from the OIN Wizard. The **Test your integration experience** page appears. If you're not in the OIN Wizard, go to **Your OIN Integration** > **Select your protocol**  > **Configure your integration** > **Test your integration experience**. Continue to the [Application instances for testing](#application-instances-for-testing) section to include your instance for testing in the OIN Submission Tester.

### Required app instances

The **Required app instances** box shows you the instances detected in your org that are available to test your integration. It also shows you the test instances required for the OIN Submission Tester based on your selected protocols:

* The **CURRENT VERSION** status indicates the instances that you need to test your current integration submission.
* The **PUBLISHED VERSION** status indicates the instances that you need to test backwards compatibility if you edit a previously published integration. See [Update your integration](#update-your-integration).

### Application instances for testing

The **Application instances for testing** section displays, by default, the instances available in your org that are eligible for submission testing.

> **Note:** The filter (![filter icon](/img/icons/odyssey/filter.svg)) is automatically set to only show eligible instances.

An instance is eligible if it was generated from the latest version of the integration submission in the OIN Wizard. An instance is ineligible if it was generated from a previous version of the integration submission and you subsequently made edits to the submission. This is to ensure that you test your integration based on the latest submission details.

If you modify a published OIN integration, you must generate an instance based on the published integration for backwards-compatibility testing. A backwards-compatible instance is eligible if it was generated from the published version of the integration before any edits are made in the current OIN Wizard submission. The OIN Wizard detects if you're modifying a published OIN integration and asks you to generate a backwards-compatible instance before you make any edits.

There's a maximum of five active instances allowed in a Developer Edition org, so [deactivate](#deactivate-an-app-instance-in-your-org) or delete any instances you aren't using. Click **Clear filter** to find instances in your org that may be active and ineligible for testing.

#### Add to Tester

* Click **Add to Tester** next to the instance from the **Application instances for testing** list to include it for testing with the OIN Submission Tester. The **Add to Tester** option only appears for instances that are active and eligible for testing.

    After you click **Add to Tester** for the instance, the corresponding test cases are populated with the instance name and the **Run test** option is enabled in the OIN Submission Tester.

* Click **Remove from Tester** to disable the test cases associated with the instance from the OIN Submission Tester.

    After you click **Remove from Tester** for the instance, the instance name and test results are removed for the corresponding test cases in the OIN Submission Tester. The **Run test** option is also disabled.

#### Deactivate an app instance in your org

Since the Okta Developer Edition org has a limit of five active app instances, deactivate any instances you're not using in the org.

To deactivate an instance from the OIN Wizard:

1. Go to **Test your integration experience** > **Application instances for testing**.
1. Click **Clear filters** to see all instances in your org.
1. Disable the **ACTIVE** toggle next to the app instance you want to deactivate.

Alternatively, to deactivate an app instance without the OIN Wizard, see [Deactivate app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-deactivate).

#### Update an app instance in your org

To edit the app instance from the OIN Wizard, follow these steps:

1. Go to **Test your integration experience** > **Application instances for testing**.
1. Click **Clear filters** to see all instances in your org if you don't see the instance that you want to edit.
1. Select **Update instance details** from the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) next to the app instance you want to update. The instance details page appears.
1. Edit the app instance. You can edit app instance settings or [assign users to your app instance](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_Apps_Page-assign).
1. Return to the OIN Wizard:

    * Click **Begin testing** (upper-right corner) for the current submission instance.

        The **Test your integration experience** page appears.

    *  Click **Go to integrations** (upper-right corner) for the backwards-compatible instance.

        The **Your OIN Integrations** dashboard appears.
        Go to your integration submission > **Configure your integration** > **Get started with testing** to continue with testing your integration.

> **Note:** After you edit a test instance, any previous test results for that instance are invalid and removed from the OIN Submission Tester. Rerun all the required tests again with the new instance.

### OIN Submission Tester

The **Test your integration experience** page includes the integrated OIN Submission Tester, which is a plugin that runs the minimal tests required to ensure that your sign-in flow works as expected. Ideally, you want to execute other variations of these test cases without the OIN Submission Tester. Try negative and edge test cases.

You can't submit your integration in the OIN Wizard until all required tests in the OIN Submission Tester pass.

> **Notes:**
> * The OIN Submission Tester requires you to trust the current Okta Developer Edition org if you're using multiple Okta orgs.
> * Click **Initialize Tester** if you're using the OIN Submission Tester for the first time.
> * Click **Refresh Tester session** for a new test session if the OIN Submission Tester session expired.

The OIN Submission Tester includes the mechanism to test the following flows:

* IdP flow
* SP flow
* Just-In-Time (JIT) provisioning (with IdP flow)
* Just-In-Time (JIT) provisioning (with SP flow)

> **Note:** The **JIT provisioning (with SP flow)** test case appears in the OIN Submission Tester if your integration supports JIT and only the SP flow. If your integration supports JIT, IdP, and SP flows, then a successful **JIT provisioning (with IdP flow)** test is sufficient for submission.

The test cases for these flows appear in the **Test integration using the OIN Submission Tester** section depending on your OIN Wizard [test information](#test-information).

> **Note:** See [Run test](#run-tests) for the steps on how to run each test case.

Your test results in the OIN Submission Tester are valid for 48 hours after the test run. Rerun all your test cases in the OIN Submission Tester if they expired.

[Submit your integration](#submit-your-integration) if all your tests have passed. If you have errors, see [Failed tests](#failed-tests) to resolve the errors.

#### Run tests

The **Run test** option is enabled for test cases with an eligible test instance.

After you click **Run test**, the OIN Submission Tester opens a browser window in incognito mode. Use the incognito browser window to execute the test and verify it with the **Test in progress** dialog that appears in the upper-right corner.

##### Run the IdP flow test

To run the IdP flow test:

1. Click **Run test** next to the **IdP flow** test case.

   A new Chrome browser in incognito mode appears for you to sign in.

1. Sign in to Okta as an end user that was assigned to your test app instance.

    * Your app tile appears on the Okta End-User Dashboard.
    * The Tester selects your app tile and you're signed in to your app.

1. Verify that the test end user signed in to your app with the correct profile.
1. Select **The user successfully signed in to your app** in the upper-right **Test in progress** dialog to confirm that the IdP flow test passed.
1. Click **Continue** from the **Test in progress** dialog to sign out of your app.

    The incognito browser closes and you're redirected back to the OIN Submission Tester. The OIN Submission Tester records the test run result and timestamp.

1. Click the **IdP flow** expand icon (![chevron-down expand icon](/img/icons/odyssey/chevron-down.svg)) to view the test steps and network traffic details for the test run.

    If your test run wasn't successful, this is a useful tool to troubleshoot the issues and correct your integration, instance, or submission details.

##### Run the SP flow test

To run the SP flow test:

1. Click **Run test** next to the **SP flow** test case.

    A new Chrome browser in incognito mode appears for you to sign in.

1. Sign in to your app as the test end user that was assigned to your app instance.
1. Verify that the test end user signed in to your app with the correct profile.
1. Select **The user successfully signed in to your app** in the upper-right **Test in progress** dialog to confirm that the SP flow test passed.
1. Click **Continue** from the **Test in progress** dialog to sign out of your app.

    The incognito browser closes and you're redirected back to the OIN Submission Tester. The OIN Submission Tester records the test run result and timestamp.

1. Click the **SP flow** expand icon (![chevron-down expand icon](/img/icons/odyssey/chevron-down.svg)) to view the test steps and network traffic details for the test run.

##### Run the JIT provisioning with IdP flow test

For the JIT provisioning test, the OIN Submission Tester creates a temporary Okta test user account for you to verify that JIT provisioning was successful. The Tester then removes the test user account from Okta to complete the test.

> **Notes:**
> * Ensure that your app integration supports JIT provisioning before you run the JIT provisioning test.
> * If you don't have the super admin role, then you must have both the app admin and the org admin roles assigned to you for JIT provisioning testing.
> * The JIT provisioning test case appears only if you select **Supports Just-In-Time provisioning** in your submission.

To run the JIT provisioning with IdP flow test:

1. Click **Run test** next to the **JIT provisioning (w/ IdP flow)** test case.

    The OIN Submission Tester executes the following steps for the JIT provisioning test case:
    1. Creates a new user in Okta and assigns them to the test app instance.
    {style="list-style-type:lower-alpha"}
    1. Open an incognito browser window to sign in to Okta.
    1. Sign in to Okta as the new test user.
    1. Select the app tile.
    1. Wait for confirmation that the new test user signed in and was provisioned in your app (you're responsible to verify this step).

1. Verify that the test user signed in to your app with the correct first name, last name, and email attributes.

    > **Note:** You can go back to the OIN Submission Tester window and expand the test case to view network traffic details for this test run. The **NETWORK TRAFFIC** tab contains API calls to Okta with the test user details in the request payload.

1. Select **The user successfully signed in to your app** in the upper-right **Test in progress** dialog to confirm that the JIT provisioning IdP flow test passed.
1. Click **Continue** from the **Test in progress** dialog to sign out of your app.

    The OIN Submission Tester executes the following steps after you click **Continue**:
    1. Signs out of the app and closes the incognito browser window.
    {style="list-style-type:lower-alpha"}
    1. Unassigns the test user from the app instance in Okta.
    1. Deletes the test user from Okta.
    1. Records the test run result and timestamp in the OIN Submission Tester.
    1. Redirects you back to the OIN Submission Tester.

1. Click the **JIT provisioning (w/ IdP flow)** expand icon (![chevron-down expand icon](/img/icons/odyssey/chevron-down.svg)) to view the test steps and network traffic details for the test run.

> **Note:** The test user account created in your app from JIT provisioning persists after the JIT provisioning test. The OIN Submission Tester only removes the temporary test user account from your Okta org. It's your responsibility to manage the JIT test user accounts in your app.

##### Run the JIT provisioning with SP flow test

You're only required to pass one JIT provisioning test case to submit your integration. The OIN Submission Tester includes the **JIT provisioning (w/ SP flow)** test case if you support JIT and only the SP flow. If your integration supports JIT, IdP, and SP flows, then a successful **JIT provisioning (w/ IdP flow)** test is sufficient for submission.

Similar to the [JIT provisioning with IdP flow test](#run-the-jit-provisioning-with-idp-flow-test), the OIN Submission Tester creates a temporary Okta test user account for you to verify that JIT provisioning was successful. The Tester then removes the test user account from Okta to complete the test.

To run the JIT provisioning with SP flow test, follow the same steps in [Run the JIT provisioning with IdP flow test](#run-the-jit-provisioning-with-idp-flow-test). The difference between the JIT provisioning with SP and IdP tests is that the OIN Submission Tester opens an incognito browser window to sign in to your app first instead of to sign in to Okta.

#### Failed tests

If any of your test cases fail, investigate and resolve the failure before you submit your integration. You can only submit integrations that have successfully passed all the required tests in the OIN Submission Tester.

If you have to update SSO or test detail properties in your submission to resolve your failed test cases, then [generate a new app integration instance for testing](#generate-instances-for-testing). [Assign test users to your new integration instance](#assign-test-users-to-your-integration-instance) before you execute all your SSO test cases again.

> **Note:** You don't have to generate a new app instance for every failed test scenario. If you have an environment issue or if you forgot to assign a user, you can fix your configuration and run the tests again. Generate a new instance if you need to modify an SSO property, such as an integration variable, a redirect URI, or an ACS URL.

It's good practice to deactivate your test instances that aren't in use. You can later delete the instance to clean your app integration list.

If you have questions or need more support, email Okta developer support at <developers@okta.com> and include your test results. To obtain your test results:

1. From the OIN Submission Tester, click **Export results** (upper-right corner) to download a JSON-formatted file of all your test results.

All required tests in the OIN Submission Tester must have passed within 48 hours of submitting your integration.

## Update your integration

You can modify your published SSO integration from the OIN Wizard.

When you edit a published OIN integration, you need to test the SSO flow for the updated version and the published version for backwards compatibility. Testing the published version for backwards compatibility ensures that SSO to your app still works for customers who have already installed your published OIN integration. After you successfully test the updated and published versions of your integration, resubmit it to the OIN team.

> **Note:** When you edit your published OIN integration, your previous PUBLISHED status and date are overwritten with the DRAFT status and current date.

To update a previously published OIN integration:

1. Sign in to your Okta Developer Edition org as a user with either app admin or super admin roles.
   > **Note:** Edit your integration from an Okta account that has your company domain in the email address. You can't use an account with a personal email address. The OIN team doesn't review submission edits from a personal email account.
1. Go to **Applications** > **Your OIN Integrations** in the Admin Console.
1. Click your published integration to update from the dashboard. Your published OIN submission appears in read-only mode.
1. From the **This integration is read-only** information box, click **Edit integration**.
    > **Note:** If you open a submission in DRAFT status, it's not in read-only mode and the **Edit integration** option isn't available. Continue to edit your draft submission as a new submission. See [Start a submission](#start-a-submission).
1. If the OIN Wizard doesn't detect an instance to test your published integration in the org, then an **Application instance not detected** dialog appears. Click **Generate instance** to create an app instance based on your published OIN integration. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) to create an instance for backwards-compatibility testing.
    > **Note:** **Generate instance** is disabled if you have five active instances in your org. [Deactivate instances](#deactivate-an-app-instance-in-your-org) that you're not using.

    If the OIN Wizard detects an instance based on your published integration, the dialog doesn't appear. This is usually the case if you tested and submitted your published integration from the same org.

1. Continue to update your integration in the **Select your protocol**, **Configure your integration**, and **Test your integration experience** > **Testing information** pages. See [Update integration considerations](#update-integration-considerations) for backwards compatibility with integration variables.
1. Click **Test your integration** to open the **Test your integration experience** > OIN Submission Tester.

    The **Required app instances** box contains the following items:
    * The instances that you need to test the **PUBLISHED VERSION** of your OIN integration.
    * The instances that you need to test the **CURRENT VERSION** of your integration submission.

    See [Required app instances](#required-app-instances).
    > **Note:** If the OIN Submission Tester session expired, click **Refresh tester session** for a new test session.

   Backwards-compatible test instances that were generated from your published integration appear in the **Application instances for testing** list.

1. Click **Generate Instance** to create an instance required for the **CURRENT VERSION** from the **Required app instances** status box.

    See [Generate an instance for testing](#generate-instances-for-testing) to create instances for your current submission.
    > **Note:** There is a maximum of five active app instances allowed in a Developer Edition org. Deactivate any instances you don't need for testing.

1. Click **Add to Tester** for each required test instance. See [Add to Tester](#add-to-tester). The required tests appear for each test instance.
1. Run your tests from the OIN Submission Tester. See [OIN Submission Tester](#oin-submission-tester).
1. [Submit your integration](#submit-your-integration) if all your tests passed. If you have errors, see [Failed tests](#failed-tests) to resolve the issues.

### Update integration considerations

* If you have an existing SAML SSO integration and you want to update advanced properties that aren't available in the OIN Wizard, contact <oin@okta.com>.

* When you update an integration that's already published, be mindful to preserve backwards compatibility for your integration. Older instances of your integration could be in use by Okta customers.

   If your update introduces new variables and you're using dynamic URLs, ensure that your test cases cover a variety of scenarios with different possible values for those variables. The newly introduced variables aren't populated for older instances of your integration. For example:

   <StackSnippet snippet="backward-compatible-eg" />

## Submit your integration

After you successfully test your integration, you're ready to submit.

The OIN Wizard checks the following:

* All required instances are detected
* All required instances are active
* All required tests passed within the last 48 hours

**Submit integration** is enabled after all these requirements are met.

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

## See also

<StackSnippet snippet="see-also" />
