#### SCIM properties

> **Notes:**
> * This section appears if you select provisioning with SCIM 2.0.
> * The instructions on this page are for the **SCIM 2.0** protocol. <br>
> If you want to change the instructions that you see on this page, select a different option from the **Instructions for** dropdown list.

1. Specify the following protocol properties in the **SCIM properties** section:

    | <div style="width:150px">Property</div> | Description  |
    | ----------------- | ------------ |
    | **Base URL** `*` | Specify the base URL for your SCIM server. The base URL must support the HTTPS protocol. If you're using a per tenant design, include the variable names that you created in your URL. For example:` 'https://' + app.subdomain + '.example.com/scim2/' `. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language).<br>The maximum field length is 1024 characters. |
    | **What objects do you want Okta to manage in your integration?** `*` | Select the objects that you want Okta to manage with your SCIM integration. <br> <ul><li> **Users**: Okta manages users in your app by default. </li><li> **Groups**: Select this option if you also want Okta to manage groups in your app.</li></ul> |
    | **User operations** `*` | Select user operations for your SCIM integration. <br> <ul><li> **Create**: Okta can create users in your app.</li><li> **Read** `*`: Okta can read users from your app.</li><li>**Update**: Okta can update users in your app.</li><li>**Change password**: Okta can update user passwords in your app.</li><li>**Deactivate**: Okta can deactivate users in your app.</li><li>**Support PATCH for User**: Okta can update users with the PATCH method in your app. </li> </ul> **Note**: **Import users** capability is enabled by default. **Profile sourcing** isn't supported, contact the [OIN team](mailto:oin@okta.com) if your integration must support this capability.|
    | **Group operations** | Group operations for your SCIM integration. These are all selected by default if your integration manages the **Groups** object. <br> <ul><li> **Create**: Okta can create groups in your app.</li><li> **Read** `*`: Okta can read groups from your app.</li><li>**Update (Uses PATCH)**: Okta can update groups in your app with the PATCH method.</li> <li> **Delete**: Okta can delete groups in your app.</li> </ul> **Note**: **Import groups** capability is enabled by default.|
    | **Link to configuration guide** `*` | Specify the URL link to your customer-facing instructions on how to configure SCIM provisioning between Okta and your app. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).|

    `*` Required properties
