#### Authentiation settings

5. Specify authentication settings to your app resources.

| Property | Description |
|----------|-------------|
| **Authentication mode** `*` | Select the authentication mode to make outbound calls to your SCIM server. <br> <ul><li> **Header**: Uses authorization header with a customer-provided token in the following format: `Authorization: {API token}` </li><li> **Bearer**: Uses authorization header with a customer-provided bearer token in the following format: `Authorization: Bearer {API token}`</li><li> **OAuth 2**: Uses OAuth 2.0 authorization code grant flow</li> </ul> **Note**: Basic authentication isn't supported. See [SCIM integration limitations](/docs/guides/submit-app-prereq/main/#scim-integration-limitations).  |
| **Authorize endpoint**<br>(For OAuth 2.0) | Specify the HTTPS authorize endpoint. For example: `https://myexample.com/oauth2/auth`<br> You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Token endpoint**<br>(For OAuth 2.0)| Specify the HTTPS token endpoint. For example: `https://myexample.com/oauth2/token`<br>You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Client ID**<br>(For OAuth 2.0) | Specify the client ID. |
| **Client secret**<br>(For OAuth 2.0) | Specify the client secret. |
| **Scopes**<br>(For OAuth 2.0) | Optional: Specify scopes. |

6. Click **Configure your integration**.