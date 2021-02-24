
* **What SCIM version should this integration use?** &mdash; Choose either **SCIM 2.0** (Okta preferred version), or **SCIM 1.1**.

* **Link to configuration guide** &mdash; Your configuration guide (in either HTML or PDF format) should have step by step instructions on how to set up provisioning between Okta and your systems. See [Prepare a customer-facing configuration guide](/docs/guides/submit-app/create-guide).

* **Select provisioning features to be supported in the integration** &mdash; These provisioning features should match what you have selected in the **Provisioning** tab in the settings for your SCIM integration. For details on each of these options, see [Configure application provisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_prov_lcm_prov_app). To activate the Profile Sourcing feature, see [Submission process](/docs/guides/submit-app/scim/overview/#submission-process).

* **Does your Base URL vary per tenant?** &mdash; If **Yes**, a new field appears to assist you in setting up a per tenant configuration.
  * **What variables do your admins need to specify to install your app?** &mdash; When you click **Add Variable**, the interface displays a dialog box to collect the following information:
  * **Label Name** &mdash; A descriptive name for the dynamic variable that administrators see when installing your app integration.
  * **Variable Name** &mdash; An automatically generated variable used when constructing the dynamic address. This is hidden from admins and is only passed to your external application.
  * **Help Text** &mdash; Any descriptive text to be shown to administrators when installing your app integration.
  * **Type** &mdash; The property type for your parameter. Options are "String", "URL", or "HTTPS URL".
  * Click **Save** to add the variable to the list.

  After the variable is created, you can click the pencil icon to make changes to the details, the clipboard icon to copy the **Variable Name** to your local clipboard, or the "X" icon to remove the variable entirely.

  * **Construct your dynamic Base URL by copying the variables above and pasting them where applicable** &mdash; Provide the base URL that your integration uses when sending an outbound call to your SCIM server.

    If you're using a per tenant design, include the variable names that you created. For example:

    * https://`${app.variableName}`.okta.com
    * https://okta-`${app.variableName}`.com

* **Does your SCIM server support HTTP PATCH operations for modifying resources?** &mdash; Select **Yes** if your SCIM server supports updates made through a PATCH.

* **What authentication mode should the integration use?** &mdash; The authentication method must match what your SCIM server expects to receive.

  * Header authentication: Specify what format the token is sent to the server.
  * OAuth 2: Specify the token and authorization endpoint URLs for your SCIM server, along with the consumer key and secret.

* **Does your SCIM `userName` attribute value follow an email address format?** &mdash; Select **Yes** if your SCIM server uses a name@company.TLD format for the unique userName attribute.

* **Did you delete all unused attributes?** &mdash; As outlined in the [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/attribute-mapping/) guide, you need to update the base attributes and mappings that correspond with the attributes supported by your application. Select **Yes** if you have completed the instructions in the **Remove the mapping** and **Delete attributes from your attribute list** sub-sections in the **Delete attributes** section of that guide.

* **Optional: link to demo video** &mdash; If you have a video that explains how to configure access to your SCIM application, enter the URL for it here.

* **Link to Runscope test results** &mdash; This should be a link to the Runscope site test results showing that your application has successfully passed the SPEC test suite. See [Test your SCIM API](/docs/guides/build-provisioning-integration/test-scim-api/).

* **Link to Runscope CRUD test results** &mdash; This should be a link to the Runscope site test results showing that your application has successfully passed the CRUD test suite. See [Test your Okta integration](/docs/guides/build-provisioning-integration/test-scim-app/).

These Runscope test results must show that all tests are passing before the Okta OIN team approves a SCIM integration for the OIN.
