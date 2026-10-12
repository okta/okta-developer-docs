#### Authentiation settings

5. Specify authentication settings to your app resources.

| Property | Description |
|----------| -------------|
| **Authentication mode** `*` | Select the authentication mode to make outbound calls to your SCIM server. <br> <ul><li> **Header**: Uses authorization header with a customer-provided token in the following format: `Authorization: {API token}` </li><li> **Bearer**: Uses authorization header with a customer-provided bearer token in the following format: `Authorization: Bearer {API token}`</li><li> **OAuth 2**: Uses OAuth 2.0 authorization code grant flow</li> </ul> **Note**: Basic authentication isn't supported for SCIM. See [SCIM integration limitations](/docs/guides/submit-app-prereq/main/#scim-integration-limitations).  |
| | OAuth 2.0 settings |
| **Authorize endpoint** | Specify the HTTPS authorize endpoint. For example: `https://myexample.com/oauth2/auth`<br> You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Token endpoint** | Specify the HTTPS token endpoint. For example: `https://myexample.com/oauth2/token`<br>You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Client ID** | Specify the client ID. |
| **Client secret** | Specify the client secret. |
| **Scopes** | Optional: Specify scopes. |

<!-- OKTA-1293905: Client Credentials grant for SCIM submissions. Gated behind the
     isClientCredentialsGrantForSubmissionsEnabled kill switch (OKTA-1293764), currently off.
     Uncomment and merge the rows below into the table above once that switch is enabled.

| **Authentication mode** `*` | Select the authentication mode to make outbound calls to your SCIM server. <br> <ul><li> **Header**: Uses authorization header with a customer-provided token in the following format: `Authorization: {API token}` </li><li> **Bearer**: Uses authorization header with a customer-provided bearer token in the following format: `Authorization: Bearer {API token}`</li><li> **OAuth 2**: Uses OAuth 2.0. Choose a **Grant type**.</li> </ul> **Note**: Basic authentication isn't supported for SCIM. See [SCIM integration limitations](/docs/guides/submit-app-prereq/main/#scim-integration-limitations).  |
| | OAuth 2.0 settings |
| **Grant type** | Select the OAuth 2.0 grant type that your SCIM server uses: <ul><li> **Authorization Code** (default): Your app authenticates on behalf of a user. Requires an authorize endpoint, client ID, and client secret. </li><li> **Client Credentials**: Your app authenticates with its own credentials with no end user involved. The client ID and client secret aren't collected in the wizard. The tenant admin configures these values per app instance after your integration is published and instantiated in their org. </li></ul> |
| **Authorize endpoint** | Required for the **Authorization Code** grant type. Not allowed for **Client Credentials**. Specify the HTTPS authorize endpoint. For example: `https://myexample.com/oauth2/auth`<br> You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Token endpoint** | Required for both grant types. Specify the HTTPS token endpoint. For example: `https://myexample.com/oauth2/token`<br>You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Client ID** | Required for the **Authorization Code** grant type. Not allowed for **Client Credentials** — the tenant admin configures this value per app instance instead. Specify the client ID. |
| **Client secret** | Required for the **Authorization Code** grant type. Not allowed for **Client Credentials** — the tenant admin configures this value per app instance instead. Specify the client secret. |
| **Scopes** | Optional: Specify scopes. Applies to both grant types. |

For the **Client Credentials** grant type, reading back an auth mode returns `null` for **Client ID** and **Client secret** by design — the stored values are internal references to the per-instance properties, not literal credentials.

-->

6. Click **Configure your integration**.