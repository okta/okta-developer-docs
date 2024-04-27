---
title: Submit an SSO integration with the OIN Wizard
meta:
  - name: description
    content: Learn how to submit your integration to the Okta Integration Network (OIN) team for publication. The submission task is performed in the Okta Admin Console through the OIN Wizard.
layout: Guides
---

Use this guide to learn how to submit a Single Sign-On (SSO) integration to the Okta Integration Network (OIN) team using the OIN Wizard.

---

#### Learning outcomes

* Learn how to submit an SSO integration using the OIN Wizard.
* Learn how to test your SSO integration with the OIN Submission Tester before submission.

#### What you need

* An [Okta Developer Edition org](https://developer.okta.com/signup/). The OIN Wizard is only available in Developer Edition orgs.
* An admin user in the Developer Edition org with either the Super Administrator or the Application Administrator role
* A functional SSO integration based on the [Build a Single Sign-On integration](/docs/guides/build-sso-integration/) guide
* Google Chrome browser with the Okta Browser Plugin installed (see [OIN Wizard requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-requirements))
* The various items necessary for submission in accordance with the [OIN submission requirements](/docs/guides/submit-app-prereq/)

---

## Overview

Okta provides you with a seamless experience to integrate and submit your app for publication in the [Okta Integration Network (OIN)](https://www.okta.com/okta-integration-network/). When you obtain an [Okta Developer Edition org](https://developer.okta.com/signup/), you can use it as a sandbox to integrate your app with Okta and explore more Okta features. When you decide to publish your integration to the OIN, you can use the same Developer Edition org to submit your integration using the OIN Wizard.

The OIN Wizard is a full-service tool in the Okta Admin Console for you to:

* Provide all your integration submission details.
* Generate an app instance in your org for testing.
* Test your SSO integration with the OIN Submission Tester
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

> **Note:** As a best practice, add two or three extra admin users in your Okta org to manage the integration. This ensures that your team can access the integration for updates in the future. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and ensure that the Super Administrator or the Application Administrator role is assigned.

Start your integration submission for OIN publication:

1. Sign in to your [Developer Edition org](/login/) as a user with administrative privileges.
1. Go to **Applications** > **Your OIN Integrations** in the Admin Console.
1. Click **Build new OIN integration**. The OIN Wizard appears.
1. From the **Select your protocol** section, select **<StackSnippet snippet="protocol-fullname" inline/>**.
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
     | **Name** `*`  | Specify the variable name. This variable name is used to construct the dynamic URL. It's hidden from admins and is only passed to your external app.<br>String is the only variable type supported.<br>The maximum field length is 1024 characters. |

     `*` This section is optional, but if you specify a variable, both `Label` and `Name` properties are required.

1. Click **+ Add another** to add another variable. You can add up to three variables.

1. If you need to delete a variable, click the ![trash can; delete icon](/img/icons/delete_can.png) icon next to it.

#### <StackSnippet snippet="protocol-name" inline/> properties

Continue with the OIN Wizard and configure your protocol settings:

1. In the **<StackSnippet snippet="protocol-name" inline/> properties** section, specify the following protocol properties:

    <StackSnippet snippet="protocol-properties" />

1. Click **Get started with testing** to save your edits and move to the testing section, where you need to enter your integration test details.

### Enter test information

From the OIN Wizard **Test your integration experience** page, specify information required for testing your integration. An OIN analyst uses this information to verify your integration after submission.

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
    | **Testing instructions** | Include any other information that you think the OIN analyst needs to know about your integration (such as the test admin account or the testing configuration). You can also provide instructions on how to add test user accounts. |

    `*` Required properties

#### <StackSnippet snippet="protocol-name" inline/> tests

Continue with the OIN Wizard and specify your supported SSO flows:

1. In the **<StackSnippet snippet="protocol-name" inline/> tests** section, specify the following sign-in flow details:

    <StackSnippet snippet="protocol-test-flow" />

1. Click **Test your integration** to save your test information and begin the testing phase.

## Test your integration

The OIN Wizard journey includes the **Test your integration experience** page to help you configure and test your integration within the same org before submission. This page functions in a top-down approach where you need to:

1. Generate instances for testing.
2. Test required flows in the OIN Submission Tester with your generated test instances.
3. Fix any test failures from the OIN Submission Tester, then regenerate the app instance (if necessary) and retest.
4. Submit your integration after all required tests ran successfully in the OIN Submission Tester.

> **Notes:** You must have the Okta Browser Plugin installed with **Allow in Incognito** enabled on your Chrome browser before you begin the **Test your integration experience** journey. See [OIN Wizard requirements](/docs/guides/submit-app-prereq/main/#oin-wizard-requirements).

### Generate instances for testing

Generate instances for testing in your Developer Edition org directly from the OIN Wizard. The wizard takes the configuration and test information from your OIN submission and allows you to configure a specific integration instance to your test app. The generated instance allows you to test your customer admin experience and your end-user sign-in experience. You must generate an instance for each SSO protocol your integration supports.

To generate an integration instance:

1. From the **Test your integration experience** page, click **Generate instance**.

    A page appears to add your [app integration instance details](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app).

    When your integration is published in the OIN catalog, the customer admin uses the Admin Console **Browse App Catalog** > [add an existing app integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) page to add your integration to their Okta org. The next few steps are exactly what your customer admins experience when they instantiate your integration with Okta. So you can assume the customer admin persona to verify that application labels and properties are appropriate for your integration. If you need to change any labels or properties, go back to edit your submission.

    > **Note:** There is a limit of five app instances in a Developer Edition org. The **Generate instance** button is deactivated when you reach this limit. Deactivate unused app instances to make room for new instances in your org. See [Deactivate app instances in your org].

<StackSnippet snippet="test-instance" />


#### Assign test users to your integration instance

As a customer admin persona, assign users to your app integration instance to test your SSO flow. Create your test users in Okta before you assign them to your integration. See [Add users manually](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) and [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topics in the Okta product documentation.

Test case preconditions:

* [Generated the app integration instance in the OIN Wizard](#generate-the-instance-for-testing)
* Sign-on options are configured for the instance

To assign test users to your integration:

1. Continue as the customer admin persona from the OIN Wizard > **Generate instance** pages. Alternatively, if you aren't in the OIN Wizard, go to **Applications** > **Applications** > your app integration instance in the Admin Console.
1. From your app integration instance page, click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have SSO into your app, and then click **Assign** for each.
1. Verify the user-specific attributes for any people that you add, and then select **Save and Go Back**.
1. Click **Done**.
1. If you want to go back to the OIN Wizard, click **Begin testing** (upper-right corner). The **Test your integration experience** page appears. Testing guidance is provided on this page, and you can submit your integration after you've successfully completed testing.

### How to test an IdP flow

Test the IdP sign-in flow as a customer end-user persona. Use an end user that you [assigned to your integration](#assign-test-users-to-your-integration-instance). This sign-in flow initiates from the Okta End-User Dashboard.

#### Sign in with the IdP flow

Test case preconditions:

* App integration supports IdP SSO
* [App integration instance was generated in the OIN Wizard](#generate-the-instance-for-testing) and sign-on options are configured
* The test end user used to sign in to the app was [assigned to the integration](#assign-test-users-to-your-integration-instance)

To test the SSO IdP flow:

1. Open a new incognito window in your browser.
1. Go to your Developer Edition Okta org. For example: `https://dev-12345678.okta.com`
1. Sign in to the Okta End-User Dashboard as an end user that was assigned the integration.
    > **Note**: If you sign in as a non-admin user to your Okta org from a browser, the End-User Dashboard appears.
1. Confirm that your app tile appears on the Okta End-User Dashboard.
1. Click your app tile and confirm that you can sign in.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

### How to test an SP flow

To test the SP flow (the app-initiated flow), you need to execute the test cases as a customer end-user persona. Use one of the test end users you previously [assigned to your integration](#assign-test-users-to-your-integration-instance).

There are two options to sign in with the SP-initiated flow:

1. Direct URL: [Sign in with a direct URL for the SP flow](#sign-in-with-a-direct-url-for-the-sp-flow)
2. Sign-in page: [Sign in with the sign-in page for the SP flow](#sign-in-with-a-sign-in-page-for-the-sp-flow)

#### Sign in with a direct URL for the SP flow

Test case preconditions:

* App integration supports SP-initiated SSO
* [App integration instance was generated in the OIN Wizard](#generate-the-instance-for-testing) and sign-on options are configured
* The test end user was [assigned to the integration](#assign-test-users-to-your-integration-instance)

To test the SP-initiated flow with a direct URL:

1. Open a new incognito window in your browser.
1. Go to the app sign-in page directly from the browser URL address field (for example: `https://berryfarm.example.org/strawberry/signin`). The browser redirects you to Okta for authentication.
1. Sign in with Okta credentials for the test end user.
1. Confirm that you are signed in to the app.
    > **Note**: If you have multiple apps in the OIN catalog, verify that you've signed in to the correct app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

#### Sign in with a sign-in page for the SP flow

Test case preconditions:

* App integration supports SP-initiated SSO
* [App integration instance was generated in the OIN Wizard](#generate-the-instance-for-testing) and sign-on options are configured
* The test end user was [assigned to the integration](#assign-test-users-to-your-integration-instance)

To test the SP-initiated flow with a sign-in page:

1. Open a new incognito window in your browser.
1. Go to the app sign-in page.
1. Initiate the sign-in action from the sign-in page (such as clicking **Sign in with Okta**).
1. Sign in with Okta credentials for the test end user.
1. Confirm that you're signed in to the app.
    > **Note**: If you have multiple apps in the OIN catalog, verify that you've signed in to the correct app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

### How to test JIT provisioning

To test Just-In-Time (JIT) provisioning, you need to execute the test cases with two personas: as a customer admin user and as an end user. The customer admin user sets up the new end user in Okta. And the new end user signs in to the app. The new user profile is provisioned in the app without extra admin intervention.

Test JIT provisioning with either SSO flow:

- With IdP SSO flow: [Test JIT provisioning with the IdP flow](#test-jit-provisioning-with-the-idp-flow)
- With SP-initiated SSO flow: [Test JIT provisioning with the SP flow](#test-jit-provisioning-with-the-sp-flow)

#### Test JIT provisioning with the IdP flow

Test case preconditions:

* App integration supports IdP flow
* App integration supports JIT provisioning
* [App integration instance was generated in the OIN Wizard](#generate-the-instance-for-testing) and sign-on options are configured
* The [Sign in with the IdP flow](#sign-in-with-the-idp-flow) test case was executed successfully
* A new test user profile that isn't in Okta or in your app

To test JIT provisioning with the IdP flow:

1. As an Okta admin user, verify that the test user doesn't exist in your Okta org.
1. As an app admin user, verify that the test user doesn't exist in the app. Sign in to your app and verify that there's no user with the same unique attributes as your new test user.
1. As an Okta admin user, sign in to your Okta org.
1. Go to **Directory** > **People** and add the new test user in Okta. See [Add users manually](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) for complete instructions.
1. Go to **Applications** > **Applications** > your app integration instance in the Admin Console.
1. From your app integration instance page, click the **Assignments** tab.
1. Click **Assign** > **Assign to People**.
1. Find the name of the new test user and click **Assign** next to their name. A dialog box appears with the title **Assign {app-name} to People**.
1. Click **Save and Go Back**.
1. On the **People** page, click **Done**.
1. Open a new incognito window in your browser.
1. Go to your Okta org URL.
1. Sign in to the Okta org as the new user that was assigned to the app integration. The End-User Dashboard appears.
1. Confirm that your app tile appears on the Okta End-User Dashboard.
1. Click your app tile and confirm that you can sign in.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.
1. Verify that the new user was created in your app with supported attributes passed from the Okta profile, such as the user's name and email.

#### Test JIT provisioning with the SP flow

Test case preconditions:

* App integration supports SP flow
* App integration supports JIT provisioning
* [App integration instance was generated in the OIN Wizard](#generate-the-instance-for-testing) and sign-on options are configured
* The [Sign in with the SP flow](#how-to-test-an-sp-flow) test case was executed successfully
* A new test user profile that isn't in Okta or in your app

To test JIT provisioning with the SP flow:

1. As an admin user, verify that the test user doesn't exist in your Okta org.
1. As an admin user, verify that the test user doesn't exist in the app. Sign in to your app and verify that there's no user with the same unique attributes as your new test user.
1. As an admin user, sign in to your Okta org.
1. Go to **Directory** > **People** and add the new test user in Okta. See [Add users manually](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) for complete instructions.
1. Go to **Applications** > **Applications** > your app integration instance in the Admin Console.
1. From your app integration instance, click the **Assignments** tab.
1. Click **Assign** > **Assign to People**.
1. Find the name of the new test user and click **Assign** next to their name. A dialog box appears with the title **Assign {app-name} to People**.
1. Click **Save and Go Back**.
1. On the **People** page, click **Done**.
1. Open a new incognito window in your browser.
1. Go to the app sign-in page directly from the browser URL address field (for example: `https://berryfarm.example.org/strawberry/signin`). The browser redirects you to Okta for authentication.
1. Sign in with Okta credentials for the new test user that was assigned to the app integration.
1. Confirm that you can sign in to the app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.
1. Verify that the new user was created in your app with supported attributes passed from the Okta profile.

### Failed SSO tests

If any of your SSO test cases failed, you need to investigate and resolve the failure before submitting the integration. You can only submit integrations that have successfully passed all basic supported SSO tests.

If you have to update SSO flow properties in your submission to resolve your failed test cases, then you need to [generate a new app integration instance](#generate-the-instance-for-testing) for testing. [Assign test users to your new integration instance](#assign-test-users-to-your-integration-instance) before executing all your SSO test cases again.

> **Note:** You don't have to generate a new app integration for every failed test scenario. If you have an environment issue or if you forgot to assign a user, you can fix your configuration and run the tests again. Generate a new instance only if you need to modify an SSO property, such as an integration variable, a redirect URI, or an ACS URL.

It's good practice to deactivate your app integration instance (from the failed test cases) from the **Applications** > **Applications** page of the Admin Console. You can later delete the test app integration instance if you want to clean your app integration list.

To receive help with failed test cases or server error messages, post your questions on the [Okta Developer Forum](https://devforum.okta.com/) or submit your questions to <developers@okta.com>.

If you have questions or need more support with the OIN submission process, contact the Okta OIN team at <oin@okta.com>.

## Submit your integration

After you successfully test your integration, you're ready to submit.

1. Close the incognito browser window and return to the **Test your integration experience** page in the OIN Wizard.
1. Select **I certify that I have successfully completed the required tests**.
1. Click **Submit integration**.
1. Click **Close wizard** from the **Thank you for your submission** confirmation page. This takes you back to the **Your OIN Integrations** dashboard.

After you submit your integration, an OIN analyst performs an initial review of your submission details. They send an email to you with any submission issues to correct.

After the initial review is complete and all the issues are correct, the submission moves to the QA testing phase. An OIN analyst uses the test information that you provide in the OIN Wizard to test your integration. They send you an email with any test failures or issues to correct. See [Understand the submission review process](/docs/guides/submit-app-overview/#understand-the-submission-review-process).

## Update your integration

You can modify a submitted or published integration in the **Your OIN Integrations** dashboard. These integrations are initially in read-only mode. If you decide to edit an integration and update any property from the previous submission, your integration reverts to `Draft` status. You have to retest and resubmit your draft integration.

> **Notes:**
> * If you edit your submitted or published integration in the **Your OIN Integrations** dashboard, your previous status and date are overwritten with the `Draft` status and date.
> * If you previously submitted your SSO integration using the OIN Manager, you can [edit your published integration only with the OIN Manager](/docs/guides/submit-sso-app/openidconnect/main/#update-your-published-integration).

To update a submitted integration:

1. Sign in to your [Okta Developer Edition org](/login/) as a user with admin privileges.
1. Go to **Applications** > **Your OIN Integrations** in the Admin Console.
1. Click your integration to update from the dashboard. The OIN Wizard appears.
1. Go to the OIN Wizard page that you want to update.
1. From the **This integration is read-only** information box, select **Edit integration**.
1. Update the desired properties in the OIN Wizard.
1. Click **View testing information** or **Close wizard** to save the modified integration. When you save the updated properties, the integration submission status is set to `Draft`.
1. Go to **Applications** > **Your OIN Integrations** in the Admin Console and confirm that your integration submission is in `Draft` status.
1. Retest your integration before you submit it again.

### Update integration considerations

* If you have an existing SAML SSO integration and you want to update advanced properties that aren't available in the OIN Wizard, contact <oin@okta.com>.

* When you update an integration that is already published, be mindful to preserve backwards compatibility for your integration. Older instances of your integration could be in use by Okta customers.

   If your update introduces new variables and you're using dynamic URLs, ensure that your test cases cover a variety of scenarios with different possible values for those variables. The newly introduced variables aren't populated for older instances of your integration. For example:

   <StackSnippet snippet="backward-compatible-eg" />

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
