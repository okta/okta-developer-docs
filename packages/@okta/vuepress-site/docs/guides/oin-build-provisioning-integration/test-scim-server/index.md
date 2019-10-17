---
title: Test your SCIM server
---

The easiest way for you to develop and verify your SCIM integration is to make use of an automated test suite that runs on Runscope.

If you are already familiar with Runscope, then import the OKTA SCIM Spec Test JSON API test (for SCIM 1.1 or SCIM 2.0) and configure the `SCIM Base URL` variable to point at the base URL for your SCIM server, for example: `https://example.com/scim/v2`.

* [Okta SCIM 2.0 Spec Test JSON](SCIMFiles/Okta-SCIM-20-SPEC-Test.json)
* [Okta SCIM 1.1 Spec Test JSON](SCIMFiles/Okta-SCIM-11-SPEC-Test.json)

If you are not familiar with Runscope, follow the detailed instructions below to get started with using Runscope to test your SCIM server.

### Set up Runscope

If you do not have a Runscope account already, we suggest starting with [Runscope's free trial plan for Okta](https://www.runscope.com/okta). Here is how to get started:

1. Download the Okta SCIM Spec Test for your version of SCIM. You will use this file to import Okta's SCIM test suite into Runscope:
    * [Okta SCIM 2.0 Spec Test JSON](SCIMFiles/Okta-SCIM-20-SPEC-Test.json)
    * [Okta SCIM 1.1 Spec Test JSON](SCIMFiles/Okta-SCIM-11-SPEC-Test.json)
2. [Sign up for Runscope](http://www.runscope.com/signup).
3. You may see a tutorial after signing up for Runscope, if so, click "Skip Tutorial".
4. You should now see a screen that says "API Tests".
5. In the lower left of your screen, click on the "Import Tests" link.
6. You should now see a title that starts with "Import Tests into &#x2026;"
7. Select "Runscope API Tests" as the format to import
8. Click the "Choose File" button and select the JSON file that you saved in Step 1.
9. Click the blue "Import API Test" button.
10. After the import completes, click on the "All Tests" link on the left hand side of your screen.

Now that you've imported Okta's SCIM test suite into Runscope, your next step will be to customize the test suite for the SCIM integration that you are writing.

### Customize the imported Runscope test for your SCIM integration

After importing Okta's SCIM test suite into Runscope, you will need to
configure the test for your SCIM integration. Here is how to do that:

1. You should be looking at the "API Tests" screen in Runscope, if not, click on the "Tests" tab on the top of Runscope's user interface.
2. You should see a test named "Okta SCIM 2.0 Tests", if not, follow the "Set up Runscope" steps above.
3. Move your mouse over the "Okta SCIM 2.0 Tests" test, then select the "Edit" link on the lower left of the test.
4. In the "Environment" section of your test, you should see a collapsed "Test Settings" section, click the arrow on the left of "Test Settings" to expand this section.
5. "Initial Variables" should be selected, click the "Add Initial Variable" link and add the following:

    | Variable Name (Case Sensitive) | Example Values              | Notes                                                                                                                                                                                     |
    |:-------------------------------|:----------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | SCIMBaseURL                    | `https://example.com/scim/v2` | For example, if your SCIM integration is hosted on <https://example.com> and uses a prefix of /scim/v2 then the "SCIM Base URL" for your integration would be: `https://example.com/scim/v2`. |
    | auth                           | Bearer abcxyz1234567890     | Basic/Oauth authorization values                                                                                                                                                          |
6. Add the [Initial Script Spec](SCIMFiles/Initial_Script_Spec.txt). If you are developing your SCIM integration in a local development environment, we suggest using the excellent tool [ngrok](https://ngrok.com/) to expose your local development environment to Runscope.
7. Click the "Save" button at the top of the test.

### Running Okta's SCIM tests against your SCIM server

Now that you have updated your SCIM test in Runscope for your SCIM
server, it is time to run the test:

1. If you followed the steps above, you should now be seeing a "Run Now" button at the top of your test.
2. Click the "Run Now" button.
3. On the left side of your screen, you will see a test show up in the "Recent Test Results" section.
4. Click on the top test in the "Recent Test Results" section.
5. If the test is still running, you will see live updates of the test in progress. Once the test is complete, you will see the results of your test.
6. To see the details of tests, click on the little arrow next to each test to expand the details of a particular test case. Doing this will allow you to see the **Request** and **Response** for each HTTP request that was made.
7. Since this test is running in your own Runscope instance, we encourage you to update the tests to better fit your own environment.
8. See [Required SCIM Server Capabilities](#required-scim-server-capabilities) for details about your SCIM server needs to implement to pass all of the tests.
9. Keep running this test suite until all the tests pass. Here is an [example of a test suite where all tests pass](https://www.runscope.com/radar/qmovuxkrhtws/f95ac15f-3f22-46c3-8f1a-1001fbf8fb66/history/6a35fabf-5ce5-4e48-a13f-7292b1bd3cc5).

### Sharing test results from Runscope

As you are developing your SCIM server, you will likely want to
share test results with teammates or with Okta.

Here is how to share a test result from Runscope with someone else:

1. Open the test result that you want to share.
2. At the top of the test result, Change the "Private / Shareable" toggle from "Private" to "Shareable".
3. Copy the URL for the test result, it will look something like this:
    `https://www.runscope.com/radar/abcdefghijkl/m01nopq2-3456-7r8s-9012-t34567uvw890/history/123ef4gh-i567-89j0-1k2l-3m4n5o678901`
4. Share that URL with the person that you want to share the test result with. Here is an example test result from Runscope:
    <https://www.runscope.com/radar/qmovuxkrhtws/f95ac15f-3f22-46c3-8f1a-1001fbf8fb66/history/6a35fabf-5ce5-4e48-a13f-7292b1bd3cc5>

## Testing your SCIM server with Okta

Once you have a SCIM server that passes all of the Runscope tests,
test your SCIM integration directly with Okta. To do so, you will first need to sign up for [an Okta developer account](https://developer.okta.com/signup/).

Note: If you are using OAuth Authorization Code Grant flow as your authentication method
or need to support the Profile Master action, Okta will need to custom-configure a template app for you.
Please request this in your email to <developers@okta.com>.

1. Navigate to the administrator interface in your Okta org by clicking **Admin**.
  ![Admin Button](/img/oin/scim-end-user-ui.png "Admin Button")

2. Click **Applications**, then **Add Application**.
  ![Admin Button](/img/oin/scim-apps.png "Admin Button")

3. Search for "SCIM". You'll see three different SCIM template applications for each SCIM version (1.1 and 2.0) based off of the various authentication methods you could choose to support (Header Auth, Basic Auth, or Bearer Token).
  ![Admin Button](/img/oin/scim-templates.png "Admin Button")

Your QA team should test the use cases in this downloadable spreadsheet: [Okta SCIM Test Plan](SCIMFiles/okta-scim-test-plan.xls).

<NextSectionLink/>
