---
title: Test your SCIM API
---

The best way to develop and verify your SCIM integration is to use an automated test suite that runs on the [BlazeMeter Runscope](https://www.runscope.com/) API monitoring tool.

## Set up Runscope

If you don't have a Runscope account, you can sign up with a [free trial to Runscope](https://www.runscope.com/okta) for Okta developers.

If you are developing your SCIM integration in a local environment and need to expose it to Runscope for testing, we suggest using the [ngrok](https://ngrok.com/) tool so you can route external address requests to your local web server.

To get started using Runscope to test your SCIM API:

1. Download the Okta SCIM Spec Test file that corresponds to the version of SCIM you set up on your server. You will use this file to import the Okta SCIM test suite into Runscope.

    - [Okta SCIM 2.0 Spec Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-20-SPEC-Test.json)
    - [Okta SCIM 1.1 Spec Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-11-SPEC-Test.json)

1. If you are new to Runscope, your dashboard displays sample Runscope tutorials. Click **Skip Tutorial**.
1. You should now see a screen titled **API Tests**.
1. In the lower left of your screen, click **Import Test**.
1. A new screen appears, titled **Import Tests into &#x2026;**
1. Select **Runscope API Tests** as the import format.
1. Click **Choose File** and select the JSON file that you saved in Step 1.
1. Click **Import API Test**.
1. After the import is finished, click **All Tests** on the left hand side of your screen.

After you've imported the Okta SCIM test suite into Runscope, the next step is to customize the test suite with the variables for your SCIM implementation.

## Customize the imported Runscope test for your SCIM integration

After importing the Okta SCIM test suite into Runscope, you need to configure the test settings for your SCIM integration:

1. You should be looking at the **API Tests** window in Runscope, if not, click the **Tests** tab at the top of the Runscope user interface.
1. You should see a test named **Okta SCIM X.X Spec Test** (where X.X corresponds to the SCIM version of the JSON file you uploaded).
1. Click **Edit** on the test panel.
1. The **Okta SCIM X.X SPEC Test** window appears. Under the **Environment** section of your test, there is a collapsed section labelled **Test Settings**. Click the small arrow to expand this section.
1. Select the **Initial Variables** tab.

    ![Initial Variables tab](/img/oin/scim_test-init_variables.png "Showing the location of the Initial Variables tab")
1. Click **Add Initial Variable** and add the following case-sensitive variables:

    | Variable Name | Example Values | Notes |
    |:-|:-|:-|
    | SCIMBaseURL | `https://example.com/scim/v2`  `https://example.com/scim/v1` | For example, if your SCIM integration is hosted on <https://example.com> and uses a prefix of /scim/v2 then the *SCIMBaseURL* value for your integration would be: `https://example.com/scim/v2`. |
    | auth | Bearer abcxyz1234567890 | OAuth 2.0 Bearer token or Basic authentication code. |
    Click **Save**.

1. In a new browser window, open the [Initial Script Spec](/standards/SCIM/SCIMFiles/Initial_Script_Spec.txt) text file and copy all the text to your clipboard.
1. Back in the Runscope **Environment** panel, select the **Initial Script** tab, and then paste the text into the script console on this tab.
  ![Initial Script tab](/img/oin/scim-test_init-script.png "Showing the location of the Initial Script tab")

    This script sets up a number of randomly generated "dummy" variables that are used during the testing process:

    | Variable Name | Example Value | Notes |
    |:-|:-|:-|
    | InvalidUserEmail | `abcdefgh@example.com` | A specific email address considered invalid by the test. |
    | randomEmail | `Runscope300Hfluaklab151@example.com` | A valid email address. |
    | randomFamilyName | `Hfluaklab151` | A valid last name. |
    | randomGivenName | `Runscope300` | A valid first name. |
    | randomUsername | `Runscope300Hfluaklab151@example.com` | A valid user name. |
    | randomUsernameCaps |  `RUNSCOPE300HFLUAKLAB151@example.com` | The random user name in all caps to test case sensitivity. |
    | UserIdThatDoesNotExist | `010101001010101011001010101011` | A specific UUID considered invalid by the test. |

    A "Script ON" label appears on your Test Settings page to indicate that the script is accepted and will be run before the first request in the test.
1. Click **Save**.

## Running Okta SPEC tests against your SCIM server

After you have customized your SCIM test in Runscope with the details of your SCIM server, you can run the test:

1. If you followed the steps above, **Run Now** appears at the top of your test.
1. Click **Run Now**.
1. On the left side of your screen, the test appears in the **Recent Test Runs** section.
1. Click **View Progress** in the **Recent Test Runs** section.
1. While the test is still running, it displays live updates of the test in progress.

    During the test phase, several additional variables are created, based on results returned from your SCIM server.

    | Variable Name | Example Value | Notes |
    |:-|:-|:-|
    | ISVUserid | `29cb3ed0-b0da-498a-ba0c-f146f15a65d5` | The first UUID returned from a GET request to your `/Users` endpoint. |
    | idUserOne | `323da8f8-21b8-4b25-8322-90673d9e1bc7` | A UUID of a test user created on your SCIM server. |
    | randomUserEmail | `Runscope300Hfluaklab151@example.com` | An email address returned from your SCIM server. |

1. To see the details of tests, click the name of each particular test case to expand the section. The details have information on the **Request**, **Response**, and **Connection** for each HTTP request involved in the test. Each test sends a composed GET or POST request to your SCIM server, and the HTTP status received in response determines the success or failure of each test.
1. After the test is complete, the main panel displays the results of your test.

Since this test is running in your own Runscope instance, you can modify the tests to better fit your own environment and complete the test run again. If you need more technical details, see the [SCIM Reference](/docs/reference/scim/), or the previous step on how to [Prepare your SCIM service](../prepare-api/).

## Sharing test results from Runscope

As you refine your SCIM implementation, you can share API test results with your teammates or with people outside of your organization:

1. From your Runscope dashboard, open the test result that you want to share.
2. At the top of the test result, Change the **Private | Shareable** toggle from **Private** to **Shareable**.
3. Copy the URL for the test result, it will look something like this:
    `https://www.runscope.com/radar/abcdefghijkl/m01nopq2-3456-7r8s-9012-t34567uvw890/history/123ef4gh-i567-89j0-1k2l-3m4n5o678901`.
    The test results can be viewed in detail, but the test can't be edited or re-run by people outside of your team.

<NextSectionLink/>
