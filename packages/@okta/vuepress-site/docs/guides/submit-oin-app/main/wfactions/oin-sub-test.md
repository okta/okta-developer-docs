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

1. Verify that the test end user signed in to your app with the correct profile.
1. Select **The user successfully signed in to your app** in the upper-right **Test in progress** dialog to confirm that the IdP flow test passed.
1. Click **Continue** from the **Test in progress** dialog to sign out of your app.

   The incognito browser closes and you're redirected to the OIN Submission Tester. The OIN Submission Tester records the test run result and time stamp.

1. Click the **IdP flow** expand icon <span>(<img style="display: inline-block; margin-bottom: 0;" src="/img/icons/odyssey/chevron-down.svg" alt="more icon"/>)</span> to view the test steps and network traffic details for the test run.

    If your test run wasn't successful, this is a useful tool to troubleshoot the issues and correct your integration, instance, or submission details.

##### Run the SP flow test

1. Click **Run test** next to the **SP flow** test case.

    A new Chrome browser in incognito mode appears for you to sign in.

1. Sign in to your app as the test end user who's assigned to your app instance.
1. Verify that the test end user signed in to your app with the correct profile.
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

1. Verify that the test user signed in to your app with the correct first name, last name, and email attributes.

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
