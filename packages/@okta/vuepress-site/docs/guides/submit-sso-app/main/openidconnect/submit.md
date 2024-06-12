To submit an OIDC integration, click the **OIDC** tab and select **On** from the **OIDC support** dropdown menu.

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

#### OIDC settings

* **Does your Redirect URI vary per tenant?**: If **Yes**, a new field appears to assist you in setting up a per tenant configuration.
  * **What variables do your admins need to specify to install your app?**: When you click **+ Add Variable**, the interface displays a dialog to collect the following information:
    * **Label Name**: A descriptive name for the dynamic variable that administrators see when installing your app integration.
    * **Variable Name**: An automatically generated variable used when constructing the dynamic address. This is hidden from admins and is only passed to your external application.
    * **Help Text**: Any descriptive text to be shown to administrators when installing your app integration.
    * **Type**: The property type for your parameter. Options are "String", "URL", or "HTTPS URL".

    Click **Save** to add the variable to the list.

    After you create the variable, click the pencil icon to make changes to the details, the clipboard icon to copy the **Variable Name** to your local clipboard, or the "X" icon to remove the variable entirely.

  * **Construct your dynamic Redirect URI by copying the variables above and pasting them where applicable**: Provide one or more complete sign-in redirect URIs where Okta sends the OAuth responses for your app integration. You must add at least one valid redirect URI.

    If you're using a per tenant design, include the variable names that you created. For example:
    * https://`${app.variableName}`.okta.com
    * https://okta-`${app.variableName}`.com
    * `${app.variableName}/route`

    > **Note**: A variable can include a complete URL (for example, https://example.com). This enables you to use more globally useful variables such as `org.baseURL`.

* **Do you require an Initiate Login URI** (Optional): Include a sign-in URI if you want the Okta integration to handle redirecting your users to your application to start the sign-in request. When end users click a tile in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client application, which constructs an authorization request and redirects the end user back to Okta.

  * **Does your Initiate Login URI vary per tenant?**: If **Yes**, an additional field appears to assist you in setting up a per tenant configuration. The instructions for adding and using the custom variables are identical to the per tenant instructions for the Redirect URI.

  * **Enter your Initiate Login URI**: Provide the complete sign-in URI for your app integration, including the variable names if you're using a per tenant design.

* **Do you require a Post Logout Redirect URI?** (Optional): Include a sign-out Redirect URI if you have a location where you want to send your end user after they sign out of your application.

  * **Does your Post Logout URI vary per tenant?**: If **Yes**, an additional field appears to assist you in setting up a per tenant configuration. The instructions for adding and using the custom variables are identical to the per tenant instructions for the Redirect URI.

  * **Enter your Post Logout Redirect URI**: Provide the complete sign-out redirect URI for your app integration, including the variable names if you're using a per tenant design.

* **Okta requires that all OIDC integrations support multi-tenancy. Do you support this in your implementation?**: Select **Yes** if your customers can set up an OIDC connection between their tenant in your application and multiple external IdPs or even multiple instances inside a single IdP. See [OIN multi-tenancy](/docs/guides/submit-app-prereq/main/#oin-multi-tenancy).

* **To configure OIDC, can your customers do it by themselves from your app's UI, or do they need to contact your support team?**: If a customer needs support to configure your app integration, you need to include support contact information in your configuration guide. We recommend that you build a UI that enables self-service configuration to reduce the setup time for your customers.

* **Link to configuration guide**: Your configuration guide (in HTML or PDF format) should have step-by-step instructions on how to configure SSO between Okta and your systems. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).

* **What type of sign-in flows do you support?**: Choose either **IdP initiated** or **SP initiated**, or both.

* **Select the OIDC mode supported by your application**: Choose either **SPA** (for Single-Page Application) or **Web**.
