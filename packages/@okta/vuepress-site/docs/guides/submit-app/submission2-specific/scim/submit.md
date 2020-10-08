
* **What SCIM version should this integration use?** &mdash; Choose either **SCIM 2.0** (the preferred version), or **SCIM 1.1**.

* **Link to configuration guide** &mdash; Your configuration guide (in either HTML or PDF format) should have step by step instructions on how to set up provisioning between Okta and your systems. See [Prepare a customer-facing configuration guide](/docs/guides/submit-app/create-guide).

* **Select provisioning features to be supported in the integration:** &mdash; These provisioning features should match what you have selected in the **Provisioning** tab in the settings for your SCIM integration. For details on each of these options, see [Configure application provisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_prov_lcm_prov_app). To activate the Profile Sourcing feature, see [Submission process](/docs/guides/submit-app/scim/overview/#submission-process).

* **Base URL (enter “n/a” if the URL varies by tenant)** &mdash; Provide the base URL that your integration uses when sending an outbound call to your SCIM server. This should be a valid production endpoint. If the the URL varies according to which tenant is using it (e.g. `lasvegas.example.com/scim/v2/` or `seattle.example.com/scim/v2`), then type `n/a`. Explain in your configuration guide how your users should construct the URL while configuring the settings for your application.

* **Does your SCIM server support HTTP PATCH operations for modifying resources?** &mdash; Select **Yes** if your SCIM server supports updates made through a PATCH.

* **What authentication mode should the integration use?** &mdash; The authentication method must match what your SCIM server expects to receive.

  * Header authentication: Specify what format the token is sent to the server.
  * OAuth 2: Specify the token and authorization endpoint URLs for your SCIM server, along with the consumer key and secret.

* **Does your SCIM `userName` attribute value follow an email address format?** &mdash; Select **Yes** if your SCIM server uses a name@company.TLD format for the unique userName attribute.

* **Optional: link to demo video** &mdash; If you have a video that explains how to configure access to your SCIM application, enter the URL for it here.

* **Link to Runscope test results** &mdash; This should be a link to the Runscope site test results showing that your application has successfully passed the SPEC test suite. See [Test your SCIM API](/docs/guides/build-provisioning-integration/test-scim-api/).

* **Link to Runscope CRUD test results** &mdash; This should be a link to the Runscope site test results showing that your application has successfully passed the CRUD test suite. See [Test your Okta integration](/docs/guides/build-provisioning-integration/test-scim-app/).

These Runscope test results must show that all tests are passing before the Okta OIN team approves a SCIM integration for the OIN.
