| Property | Description  |
| -------- | ------------ |
| Are tenants deployed on-premise?  | Specify if your app is deployed on premise or  |
| Audience URI (SP)  | xxx |
| Default RelayState | xxx |
| Name ID format | xxx |
| Application Username | xxx |


**Supported features**

| Question | Description  |
| -------- | ------------ |
| **Do you support SAML Just-In-Time provisioning?**  | With Just-in-Time provisioning, you can use a SAML assertion to create users on the fly the first time they try to sign in. This eliminates the need to create user accounts in advance.  |
| **Do you support receiving SAML user/group attribute statements?**  | If **Yes**, you can add the attribute statements or group attribute statements in the provided fields. For more details on configuring attribute statements in SAML integrations, see [Create a SAML integration using AIW](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-saml). |
| **Okta requires that all SAML integrations support multi-tenancy. Do you support this in your implementation?** | Select **Yes** if your customers can set up a SAML connection between their tenant in your application and multiple external IdPs or even multiple instances inside a single IdP. See [OIN multi-tenancy](/docs/guides/submit-app-prereq/main/#oin-multi-tenancy). |
| **What type(s) of sign-in flows do you support?** | Choose from IdP or SP initiated, or both. If you support SP-initiated flows, you must specify the URL used to initiate the SP flow and include a description of how the SP flow is triggered by your integration. |
|  **Force authentication?** | Select **Yes** if your application forces users to authenticate again, even if they have an existing session. If you select **Yes**, include how customers configure force authentication on your end. Provide the steps for Okta to test this forced authentication. |
| **Do you use encrypted assertions?** | Select **Yes** if you support an encryption method for authentication assertion. |
| **Encryption Algorithm** | Select which standard algorithm is used in your encryption assertion. |
| **Key Transport Algorithm** | Select the key transport algorithm used in your encryption. |
| **Are you going to use the same encryption certificate for all tenants?**  | If you support the same encryption certificate for all tenants, copy your certificate and paste it in the field provided. |
| vv | xxx |
| xx | xxx |
