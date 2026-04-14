#### Authentiation settings

5. Specify authentication settings to your app resources for Universal Logout, provisioning, or entitlements.

| Property | Description |
|----------| ----------- |
| **Authentication mode** | Only OAuth 2.0 authorization code grant flow is supported. See [OIN limitations](/docs/guides/submit-app-prereq/main/#oin-limitations). |
| | OAuth 2.0 settings |
| **Authorize endpoint** | Specify the HTTPS authorize endpoint. For example: `https://myexample.com/oauth2/auth`<br> You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Token endpoint**| Specify the HTTPS token endpoint. For example: `https://myexample.com/oauth2/token`<br>You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Client ID** | Specify the client ID. |
| **Client secret** | Specify the client secret. |
| **Scopes** | Optional: Specify scopes. |

6. Click **Save and start building**.

  You are redirected to the Workflows Integrator Builder in your org to define API Integration Actions. See [Build integrations with API Integration Actions](/docs/guides/build-api-actions/main/).

  Alternatively, click **Skip to configure your integration** to bypass building your integration with API Integration Actions. Continue to [Configure your integration](#configure-your-integration) only if your integration supports all the capabilities you selected at the beginning of the OIN Wizard.