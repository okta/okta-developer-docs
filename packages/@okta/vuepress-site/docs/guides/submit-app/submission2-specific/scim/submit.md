* **What SCIM version should this integration use?** - Choose either **SCIM 2.0** (the preferred version), or **SCIM 1.1**.

* **Link to configuration guide** - Your configuration guide (in either HTML or PDF format) should have step by step instructions on how to set up provisioning between Okta and your systems. See [Prepare a customer-facing configuration guide](/docs/guides/submit-app/create-guide).

* **Select provisioning features to be supported in the integration:** - These provisioning features should match what you have selected in the **Provisioning** tab in your SCIM application settings. For details on each of these options, see [Provisioning and Deprovisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Provisioning_Deprovisioning_Overview).

* **Base URL (enter “n/a” if the URL varies by tenant)** - Provide the base URL that your app uses when sending an outbound call to your SCIM server. This should be a production endpoint that customers will be using. If the the URL varies according to which tenant is using it (e.g. `lasvegas.example.com/scim/v2/` or `seattle.example.com/scim/v2`), then type `n/a`. Explain in your configuration guide how your users should construct the URL while configuring the settings for your application.

* **Does your SCIM server support HTTP PATCH operations for modifying resources?** - Select **Yes** if your SCIM server supports updates made through a PATCH.

* **What authentication mode should the integration use?** - The authentication method must match what your SCIM server expects to receive.

  * Header authentication: Specify what format the token is sent to the server.
  * OAuth 2: Specify the token and authorization endpoint URLs for your SCIM server, along with the consumer key and secret.

* **Does your SCIM `userName` attribute value follow an email address format?** - Select **Yes** if your SCIM server uses a name@company.TLD format for the unique userName attribute.

* **Optional: link to demo video** - If you have a video that explains how to configure access to your SCIM app, enter the URL for it here.

* **Link to Runscope test results** - This should be a link to the Runscope site test results showing that your app has successfully completed the SPEC test suite. See [Test your SCIM API](docs/guides/build-provisioning-integration/test-scim-api/).

* **Link to Runscope CRUD test results** - This should be a link to the Runscope site test results showing that your app has successfully completed the CRUD test suite. See [Test your Okta integration](/docs/guides/build-provisioning-integration/test-scim-app/).

These Runscope test results must show that all tests are passing before the Okta App Analysts approve a SCIM app integration for the OIN.
