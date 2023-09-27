To submit a SAML integration, click the **SAML** tab and select **On** from the **SAML support** dropdown menu.

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

#### Setup instructions

* **Is your Service Provider configured as a “Big Bang”?**: If **Yes**, what is the backdoor URL for admins to sign in if SAML is misconfigured? If the SP is a "Big Bang", Okta suggests that you have a backdoor URL or some other recovery mechanism available.

* **Is SAML support available in the SP for all tenants by default or is it available only for specific SKUs?**: If you select **Certain SKUs**, provide details on which products provide SAML support.

* **To configure SAML, can your customers do it by themselves from your app's UI, or do they need to contact your support team?**: If a customer needs support to configure your app integration, you need to include support contact information in your configuration guide. See [SAML configuration steps example](/docs/guides/submit-app-prereq/main/#saml-configuration-steps-example) for configuration steps when the customer requires the support team to configure SAML. See [SAML admin configuration steps example](/docs/guides/submit-app-prereq/main/#saml-admin-configuration-steps-example) for configuration steps when the customer configures SAML for themselves. Okta recommends that you build a UI that enables self-service configuration to reduce the setup time for your customers.

* **Are tenants deployed on-premises?**: If tenant data for your application is hosted locally on your customer's systems, select **Yes**. If the tenant data for your application is hosted on your servers, select **No**.

* **Is your app capable of requesting other SSO URLs?**: Select this option to configure support for multiple ACS URLs where the SAML Response can be sent. If **Yes**, specify an index or URL to identify each ACS URL endpoint. If an **AuthnRequest** message does not specify an index or URL, the SAML Response is sent to the default ACS URL specified above. Enter the SSO URLs and an index value for any other nodes. You can specify variables in the SSO URL field to construct non-static URLs, for example, `https://${app.variableName}.okta.com`.

* **What is the unique SAML identifier for authentication: the subject NameID or a specific SAML attribute?**: What identifier is used by the integration to perform authentication against your SAML application? If you are using an attribute different than the `NameID` attribute, what is the name of that attribute?

* **Link to configuration guide**: Your configuration guide (in HTML or PDF format) should have step-by-step instructions on how to configure SSO between Okta and your systems. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).

#### Configure variables

* **Does your ACS URL or Audience URI vary per tenant?**: If you select **No**, the ACS URL and Audience URI are pulled from the app during the submission review. If you select **Yes**, new fields appear to assist you in setting up a per tenant configuration.
  * **What variables do your admins need to specify to install your app?**: When you click **Add Variable**, the interface displays a dialog box to collect the following information:
    * **Label Name**: A descriptive name for the dynamic variable that administrators see when installing your app integration.
    * **Variable Name**: An automatically generated variable used when constructing the dynamic address. This is hidden from admins and is only passed to your external application.
    * **Help Text**: Any descriptive text to be shown to administrators about the variable when they install your app integration.
    * **Type**: The property type for your parameter. Options are "String", "URL", or "HTTPS URL".

    Click **Save** to add the variable to the list.

    After the variable is created, you can click the pencil icon to make changes to the details, the clipboard icon to copy the **Variable Name** to your local clipboard, or the "X" icon to remove the variable entirely.

  * **Construct your dynamic ACS URL by copying the variables above and pasting them where applicable**: Provide your complete Assertion Consumer Service (ACS) URL endpoint where Okta posts SAML responses for your app integration.

    If you're using a per tenant design, include the variable names that you created. For example:
    * https://`${app.variableName}`.okta.com
    * https://okta-`${app.variableName}`.com
    * `${app.variableName}`/route

     > **Note**: A variable can include a complete URL (for example, https://example.com). This enables you to use more globally useful variables such as `${org.baseURL}`.

  * **Construct your dynamic Audience URI by copying the variables above and pasting them where applicable**: Provide your complete Audience URI. This field, which dictates the audience the SAML Assertion is intended for, can be any data string up to 1024 characters long.

    It is typically in the form of a URL, often the same as the ACS URL for your app integration. If you're using a per tenant design, include the variable names that you created, the same as for the ACS URL.

#### Supported features

  * **Does your Single-Logout URL vary per tenant?**: If you select **Yes**, new app instance properties appear to assist you in setting up a per tenant configuration.

    * **What variables do your admins need to specify to install your app?**: When you click **Add Variable**, a dialog box appears to collect the following information:
      * **Label Name**: A descriptive name for the dynamic variable that administrators see when installing your app integration. For example, `sloBase`.
      * **Variable Name**: An automatically generated variable used when constructing the dynamic address. This is hidden from admins and is only passed to your external application. For example, `${org.slobase}`.
      * **Help Text**: Any descriptive text to be shown to administrators about the variable when they install your app integration.
      * **Type**: The property type for your parameter. Options are "String", "URL", or "HTTPS URL".

      Click **Save** to add the variable to the list.

      After the variable is created, you can click the pencil icon to make changes to the details, the clipboard icon to copy the **Variable Name** to your local clipboard, or the "X" icon to remove the variable entirely.

    * **Construct your dynamic Single-Logout URL by copying the variables above and pasting them where applicable**: Provide your complete SLO URL endpoint where Okta redirects for your app integration single-logout. For example, `${org.slobase}/signout`.

  * **Are you going to use the same single-logout certificate for all tenants?**: Select **Yes** if you support the same single-logout certificate for all tenants. Copy your certificate and paste it in the field provided.

    The Single Logout URL and SP Issuer should be specified in the test application.

    >**Note:** Okta only supports Single Logout requests.

* **Do you require a default relay state**: The default relay state is the page where your users land after they successfully sign in. If you have this configured, enter a specific application resource for an IdP-initiated Single Sign-On (SSO) scenario.

#### Review info

* **Optional: link to demo video**: If you have a video that explains how to configure access to your SAML application, enter the URL here. A short demo video showing your working test application helps expedite the review process. Please show the IdP and SP-initiated sign-in flows and sign-out (if applicable).

* **Optional: link to the test results of a SAML validation tool**: Use the tool at <http://saml.oktadev.com> to validate your SAML Service Provider implementation. The results help expedite the review process.
