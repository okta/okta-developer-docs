#### Setup instructions

* **Is your Service Provider configured as a “Big Bang”?** &mdash; If yes, what is the backdoor URL for admins to sign in if SAML is misconfigured? If the SP is a "Big Bang", Okta suggests that you have a backdoor URL or some other recovery mechanism available.

* **Is SAML support available in the SP for all tenants by default or is it available only for specific SKUs?** &mdash; If you select only certain SKUs, provide details on which products provide SAML support.

* **To configure SAML, can your customers do it by themselves from your app's UI, or do they need to contact your support team?** &mdash; If a customer needs support to configure your integration, you need to include support contact information in your configuration guide. We recommend that you build a UI that enables self-service configuration to reduce the set up time for your customers.

* **Are tenants deployed on-premises?** &mdash; If tenant data for you application is hosted locally on your customer's systems, select **Yes**. If the tenant data for your application is hosted on your servers, select **No**.

* **Is the Assertion Consumer Service (ACS) URL the same for all tenants and environments?** &mdash; If **No**, enter which part of the ACS URL is customizable. For example, the `subdomain` in `https://<subdomain>.example.com/saml2/`.

* **Is your app capable of requesting other SSO URLs?** &mdash; Select this option to configure support for multiple ACS URLs where the SAML Response can be sent. Specify an index or URL to uniquely identify each ACS URL endpoint. If an **AuthnRequest** message does not specify an index or URL, the SAML Response is sent to the default ACS URL specified above. Enter the SSO URLs and an index value for any other nodes.

* **Is the audience URI the same for all tenants and environments?** &mdash; If **No**, enter which part of the audience URI is customizable. For example, the `subdomain` in `https://<subdomain>.example.com/saml2/`.

* **What is the unique SAML identifier for authentication: the subject NameID or a specific SAML attribute?** &mdash; What identifier is used by the integration to perform authentication against your SAML application? If you are using an attribute different than the `NameID` attribute, what is the name of that attribute?

* **Link to configuration guide** &mdash; Your configuration guide (in either HTML or PDF format) should have step by step instructions on how to set up SSO between Okta and your systems. See [Prepare a customer-facing configuration guide](/docs/guides/submit-app/create-guide).

#### Supported Features

* **Do you support SAML Just-In-Time provisioning?** &mdash; With Just-in-Time provisioning, you can use a SAML assertion to create users on the fly the first time they try to log in. This eliminates the need to create user accounts in advance.

* **Do you support receiving SAML user/group attribute statements?** &mdash; If **Yes**, you can add the attribute statements or group attribute statements in the provided fields. For more details on configuring attribute statements in SAML integrations, see [Create a SAML integration using AIW](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-saml).

* **Can one tenant connect to multiple Identity Providers?** &mdash; Select **Yes** if your customers can set up a SAML connection between their tenant in your application and multiple external IdPs or even multiple instances inside a single IdP.

* **What type(s) of sign-in flows do you support?** &mdash; Choose from IdP or SP initiated, or both. If you support SP-initiated flows, you must specify the URL used to initiate the SP flow and include a description of how the SP flow is triggered by your integration.

* **Force authentication?** &mdash; Select **Yes** if your application forces users to authenticate again, even if they have an existing session. If you select **Yes**, include how customers configure force authentication on your end? Provide the steps for Okta to test this forced authentication.

* **Do you support SP-initiated Single-Logout?** &mdash; If you select **Yes**, then **Are you going to use the same single-logout certificate for all tenants?**

    If you support the same single-logout certificate for all tenants, copy your certificate and paste it in the field provided.

    The Single Logout URL and SP Issuer should be specified in the test application.

    >**Note:** Okta only supports signed logout requests.

* **Do you require a default relay state** &mdash; The default relay state is the page where your users land after they successfully sign on. If you have this configured, enter a specific application resource for an IdP initiated Single Sign-On scenario.

#### Review info

* **Optional: link to demo video** &mdash; If you have prepared a video that explains how to configure access to your SAML application, enter the URL here. A short demo video showing your working test application helps expedite the review process. Please show the IdP and SP-initiated sign-in flows and sign-out (if applicable).

* **Optional: link to the test results of a SAML validation tool** &mdash; Use the tool at <http://saml.oktadev.com> to validate your SAML Service Provider implementation. The results help expedite the review process.
