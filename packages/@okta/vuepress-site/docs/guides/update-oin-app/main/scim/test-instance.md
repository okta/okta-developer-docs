> **Note:** Okta recommends that you execute the Runscope tests on a published-version instance of your SCIM integration, but it's not a requirement for submission.

---
You need to run three sets of tests for SCIM integrations:

1. [SCIM API specification tests](/docs/guides/scim-provisioning-integration-prepare/main/#test-your-scim-api)

    You need to first test your SCIM API service before you conduct Okta-SCIM integration tests. Okta provides you with a SCIM API specification test suite to execute in Runscope. See [Test your SCIM API](/docs/guides/scim-provisioning-integration-prepare/main/#test-your-scim-api) for instructions on how to run this test suite. Provide the test results URL in the **Link to Runscope spec test results** field when you submit your integration to the OIN.

1. [Runscope create, read, update, and delete (CRUD) user profile tests](#runscope-crud-tests)

    Enter the results URL from these tests in the **Link to Runscope CRUD test results** field when you submit your integration to the OIN.

1. [Manual Okta SCIM integration tests](#manual-okta-scim-integration-tests)

    You must certify that you've completed these tests when you submit your integration to the OIN.

#### Runscope CRUD tests

1. Download the [Okta SCIM 2.0 CRUD Test](/standards/SCIM/SCIMFiles/Okta-SCIM-20-CRUD-Test.json) file.

   This CRUD test file is built for the [BlazeMeter Runscope](https://www.runscope.com/) API monitoring tool. If you don't have a Runscope account, you can sign up with a [free trial to Runscope](https://www.runscope.com/okta) for Okta developers.
1. From Runscope, click **Import Test**.
1. Select **API Monitoring Tests** as the import format.
1. Click **Choose File** and select the **Okta SCIM 2.0 CRUD Test** file.
1. Click **Import API Test**. In this new test bucket, click **Editor** from the left-navigation menu.
1. Click **Test Settings** and then click **Initial Variables**.
1. Add the following variables with values that match your SCIM integration:
    * `oktaOrgUrl`: The base URL for your Okta org. Include the `https://` prefix.
    * `oktaAppId`: The unique identifier that's assigned to your test app instance. You can see this value in the **App Embed Link** panel under the **General** tab for your instance.

    <div class="three-quarter border">

    ![The browser bar showing the oktaOrgUrl location.](/img/oin/scim_crud-test-identifiers.png)

    </div>

    * `oktaToken`: The Okta API token used by Runscope to connect to Okta APIs. You can generate an API token inside your org. See [Create an API token](/docs/guides/create-an-api-token/main/).
    * `SCIMUrl`: The base URL of the SCIM service. For example: `https://example.com/scim/v2`
    * `SCIMAuth`: The authorization token used to access your SCIM API. You can use the same authorization token you used to **Enable API integration** from [Generate an instance for <StackSnippet snippet="protocol-name" inline/>](#generate-an-instance-for).

      The following is an example of the Runscope variable values:

    <div class="three-quarter border">

    ![Sample values for CRUD test variables. Runscope initial variables](/img/oin/scim_crud-variables-d.png)

    </div>

1. Click **Test Settings** and then click **Initial Script**.
1. Copy the contents of the [Okta CRUD Initial Script](/standards/SCIM/SCIMFiles/Initial_Script_CRUD.txt) text file and paste into this Runscope console.
1. Click **Save & Run**.

##### Review Runscope test results

On the left of your Runscope page, the test appears in the **Recent Test Runs** section.

1. Click **View Progress** from the **Recent Test Runs** section.
As the test suite runs, Runscope displays live updates of the test in progress. After the test suite completes, the main panel displays the results of your test.
1. Click a test case to see its **Request**, **Response**, and **Connection** information.

When you're satisfied with your Runscope CRUD test results, enter them in the **Link to Runscope CRUD test results** field:

1. From your Runscope dashboard, open the test results that you want to share.
2. At the top of the test result, set the **Private | Shareable** toggle to **Shareable**.
3. Copy the URL for the test result. The test results can be viewed in detail, but the test can't be edited or rerun by people outside of your team.

    Example of a test result URL:
    `https://www.runscope.com/radar/abcdefghijkl/m01nopq2-3456-7r8s-9012-t34567uvw890/history/123ef4gh-i567-89j0-1k2l-3m4n5o678901`.

1. Paste the test results URL into the **Link to Runscope CRUD test results** field in the OIN Wizard **Test integration** > **SCIM integration testing step** section.

#### Manual Okta SCIM integration tests

Execute the test cases in the [Okta SCIM Test Plan](/standards/SCIM/SCIMFiles/okta-scim-test-plan-v2.xlsx). Skip the test cases for the features that your integration doesn't support. All the other supported-feature test cases must pass before you can submit your integration to the OIN.

Depending on your test scenario, you can import users from the **Import** tab (see [Import users](https://help.okta.com/okta_help.htm?id=ext_Importing_People)) or create users in Okta before assigning them to your test instance. See [About adding provisioned users](https://help.okta.com/okta_help.htm?type=oie&id=lcm-about-user-management) and [Assign test users to your integration instance](#assign-test-users-to-your-integration-instance).

After you've successfully completed the manual SCIM integration tests, see [Submit your integration](#submit-your-integration).
