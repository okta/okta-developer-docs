#### Setup instructions

* **Is your Service Provider configured as a “Big Bang”?** &mdash; If **Yes**, what is the backdoor URL for admins to sign in if SAML is misconfigured? If the SP is a "Big Bang", Okta suggests that you have a backdoor URL or some other recovery mechanism available.

* **Is SAML support available in the SP for all tenants by default or is it available only for specific SKUs?** &mdash; If you select **Certain SKUs**, provide details on which products provide SAML support.

* **To configure SAML, can your customers do it by themselves from your app's UI, or do they need to contact your support team?** &mdash; If a customer needs support to configure your app integration, you need to include support contact information in your configuration guide. We recommend that you build a UI that enables self-service configuration to reduce the set up time for your customers.

* **Are tenants deployed on-premises?** &mdash; If tenant data for you application is hosted locally on your customer's systems, select **Yes**. If the tenant data for your application is hosted on your servers, select **No**.

* **Is your app capable of requesting other SSO URLs?** &mdash; Select this option to configure support for multiple ACS URLs where the SAML Response can be sent. Specify an index or URL to uniquely identify each ACS URL endpoint. If an **AuthnRequest** message does not specify an index or URL, the SAML Response is sent to the default ACS URL specified above. Enter the SSO URLs and an index value for any other nodes.

* **What is the unique SAML identifier for authentication: the subject NameID or a specific SAML attribute?** &mdash; What identifier is used by the integration to perform authentication against your SAML application? If you are using an attribute different than the `NameID` attribute, what is the name of that attribute?

* **Link to configuration guide** &mdash; Your configuration guide (in either HTML or PDF format) should have step by step instructions on how to set up SSO between Okta and your systems. See [Prepare a customer-facing configuration guide](/docs/guides/submit-app/create-guide).

#### Configure variables

* **Does your ACS URL or Audience URI vary per tenant?** &mdash; If you select **Yes**, a new field appears to assist you in setting up a per tenant configuration.
  * **What variables do your admins need to specify to install your app?** &mdash; When you click **Add Variable**, the interface displays a dialog box to collect the following information:
  * **Label Name** &mdash; A descriptive name for the dynamic variable that administrators see when installing your app integration.
  * **Variable Name** &mdash; An automatically generated variable used when constructing the dynamic address. This is hidden from admins and is only passed to your external application.
  * **Help Text** &mdash; Any descriptive text to be shown to administrators when installing your app integration.
  * **Type** &mdash; The property type for your parameter. Options are "String", "URL", or "HTTPS URL".
  * Click **Save** to add the variable to the list.

    After the variable is created, you can click the pencil icon to make changes to the details, the clipboard icon to copy the **Variable Name** to your local clipboard, or the "X" icon to remove the variable entirely.

  * **Construct your dynamic ACS URL by copying the variables above and pasting them where applicable** &mdash; Provide your complete Assertion Consumer Service (ACS) URL endpoint where Okta posts SAML responses for your app integration.
  
    If you're using a per tenant design, include the variable names that you created. For example:
    * https://`${app.variableName}`.okta.com
    * https://okta-`${app.variableName}`.com

  * **Construct your dynamic Audience URI by copying the variables above and pasting them where applicable** &mdash; Provide your complete Audience URI. This field, which dictates the audience the SAML Assertion is intended for, can be any data string up to 1024 characters long.

    It is typically in the form of a URL, often the same as the ACS URL for your app integration. If you're using a per tenant design, include the variable names that you created, the same as for the ASC URL.

  If you select **No**, the ACS URL and Audience URI are pulled from the app during the submission review.

#### Supported features

* **Do you support SAML Just-In-Time provisioning?** &mdash; With Just-in-Time provisioning, you can use a SAML assertion to create users on the fly the first time they try to log in. This eliminates the need to create user accounts in advance.

* **Do you support receiving SAML user/group attribute statements?** &mdash; If **Yes**, you can add the attribute statements or group attribute statements in the provided fields. For more details on configuring attribute statements in SAML integrations, see [Create a SAML integration using AIW](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-saml).

* **Can one tenant connect to multiple Identity Providers?** &mdash; Select **Yes** if your customers can set up a SAML connection between their tenant in your application and multiple external IdPs or even multiple instances inside a single IdP.

* **What type(s) of sign-in flows do you support?** &mdash; Choose from IdP or SP initiated, or both. If you support SP-initiated flows, you must specify the URL used to initiate the SP flow and include a description of how the SP flow is triggered by your integration.

* **Force authentication?** &mdash; Select **Yes** if your application forces users to authenticate again, even if they have an existing session. If you select **Yes**, include how customers configure force authentication on your end? Provide the steps for Okta to test this forced authentication.

* **Do you use encrypted assertions?** &mdash; Select **Yes** if you support an encryption method for authentication assertion.

  * **Encryption Algorithm** &mdash; Select which standard algorithm is used in your encryption assertion.
  * **Key Transport Algorithm** &mdash; Select the key transport algorithm used in your encryption.
  * **Are you going to use the same encryption certificate for all tenants?** &mdash; If you support the same encryption certificate for all tenants, copy your certificate and paste it in the field provided.

* **Do you support SP-initiated Single-Logout?** &mdash; If you select **Yes**, then **Are you going to use the same single-logout certificate for all tenants?**

    If you support the same single-logout certificate for all tenants, copy your certificate and paste it in the field provided.

    The Single Logout URL and SP Issuer should be specified in the test application.

    >**Note:** Okta only supports signed logout requests.

* **Do you require a default relay state** &mdash; The default relay state is the page where your users land after they successfully sign on. If you have this configured, enter a specific application resource for an IdP initiated Single Sign-On scenario.

#### Review info

* **Optional: link to demo video** &mdash; If you have prepared a video that explains how to configure access to your SAML application, enter the URL here. A short demo video showing your working test application helps expedite the review process. Please show the IdP and SP-initiated sign-in flows and sign-out (if applicable).

* **Optional: link to the test results of a SAML validation tool** &mdash; Use the tool at <http://saml.oktadev.com> to validate your SAML Service Provider implementation. The results help expedite the review process.
