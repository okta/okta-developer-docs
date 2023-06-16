To submit a SCIM integration, click the **SCIM** tab and select **On** from the **SCIM support** dropdown menu.

* **Provide the instance URL for your app where Okta will retrieve configuration details:** Specify the Okta instance URL for your integration.

   To retrieve your Okta instance URL from your development org:

   1. From the Okta Admin Console, navigate to **Applications** > **Applications** to see all the integrations in your org.
   1. Click the name of the app integration that you're going to submit.
   1. Confirm that the app settings match what you want as the global defaults for all customers.
   1. In your browser, click in the address bar showing the current URL and copy it to your clipboard. This is the Okta instance URL for your integration.
   1. Back in the OIN Manager, paste that URL in the **Provide the instance URL for your app where Okta will retrieve configuration details** field of your submission protocol tab.

<!--
1. Click the **General** tab.
1. Go to the **App Embed Link** section and copy the text in the Embed Link field:
   ![App Embed Link](/img/oin/isv-portal_app-embed-link.png "App Embed Link GUI in the Application settings")
1. Paste that value into your submission.
-->

* **What SCIM version should this integration use?**: Choose either **SCIM 2.0** (Okta preferred version) or **SCIM 1.1**.

* **Link to configuration guide**: Your configuration guide (in HTML or PDF format) should have step-by-step instructions on how to set up provisioning between Okta and your systems. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).

* **Select provisioning features to be supported in the integration**: These provisioning features should match what you have selected on the **Provisioning** tab in the settings for your SCIM integration. For details on each of these options, see [Configure provisioning for an app integration](https://help.okta.com/okta_help.htm?id=ext_prov_lcm_prov_app) and [Profile Sourcing activation](/docs/guides/scim-provisioning-integration-test/main/#profile-sourcing-activation).

* **Does your Base URL vary per tenant?**: If **Yes**, a new field appears to assist you in setting up a per tenant configuration.
  * **What variables do your admins need to specify to install your app?**: When you click **Add Variable**, the interface displays a dialog box to collect the following information:
    * **Label Name**: A descriptive name for the dynamic variable that administrators see when installing your app integration.
    * **Variable Name**: An automatically generated variable used when constructing the dynamic address. This is hidden from admins and is only passed to your external application.
    * **Help Text**: Any descriptive text to be shown to administrators when installing your app integration.
    * **Type**: The property type for your parameter. Options are "String", "URL", or "HTTPS URL".

    Click **Save** to add the variable to the list.

    After you create the variable, click the pencil icon to make changes to the details, the clipboard icon to copy the **Variable Name** to your local clipboard, or the "X" icon to remove the variable entirely.

  * **Construct your dynamic Base URL by copying the variables above and pasting them where applicable**: Provide the base URL that your integration uses when sending an outbound call to your SCIM server.

    If you're using a per tenant design, include the variable names that you created. For example:

    * https://`${app.variableName}`.okta.com
    * https://okta-`${app.variableName}`.com
    * `${app.variableName}`/route

    > **Note**: A variable can include a complete URL (for example, https://example.com). This enables you to use more globally useful variables such as `${org.baseURL}`.

* **Does your SCIM server support HTTP PATCH operations for modifying resources?**: Select **Yes** if your SCIM server supports updates made through a PATCH.

* **What authentication mode should the integration use?**: The authentication method must match what your SCIM server expects to receive.

  * Header authentication: Specify what format the token is sent to the server.
  * OAuth 2.0: Specify the token and authorization endpoint URLs for your SCIM server, along with the consumer key and secret.

* **Does your SCIM `userName` attribute value follow an email address format?**: Select **Yes** if your SCIM server uses a `name@company.TLD` format for the unique `userName` attribute.

* **Did you delete all unused attributes?**: As outlined in [Check the attributes and corresponding mappings ](/docs/guides/scim-provisioning-integration-connect/main/#check-the-attributes-and-corresponding-mappings), you need to update the base attributes and mappings that correspond with the attributes supported by your application. Select **Yes** if you have completed the instructions in the **Remove the mapping** and **Delete attributes from your attribute list** sub-sections in the **Delete attributes** section of that guide.

* **How many Group membership changes are allowed in a custom PATCH operation?**: This value tells Okta the maximum number of Group membership changes to submit inside a single PATCH operation. When you organize these changes into smaller chunks, you can improve the efficiency of updates. Enter a numerical value between 100 and 1000.

  * The default value is 100.
  * Group membership PATCH operations timeout after 60 seconds.

* **Optional: link to demo video**: If you have a video that explains how to configure access to your SCIM application, enter the URL for it here.

* **Link to Runscope test results**: A link to the Runscope site test results that show your application passed the SPEC test suite. See [Test your SCIM API](/docs/guides/scim-provisioning-integration-prepare/main/#test-your-scim-api).

* **Link to Runscope CRUD test results**: A link to the Runscope site test results that show your application passed the CRUD test suite. See [Test your Okta SCIM integration](/docs/guides/scim-provisioning-integration-test/).

  > **Note:** Runscope CRUD test results aren't required if your application only supports the Import feature. Instead, enter a link to your SPEC test results for this field.

These Runscope test results must show that all tests are passing before the Okta OIN team approves a SCIM integration for the OIN.
