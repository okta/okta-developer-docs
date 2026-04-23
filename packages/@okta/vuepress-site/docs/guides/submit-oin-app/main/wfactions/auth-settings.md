#### Authentiation settings

5. Specify authentication settings to your app resources for Universal Logout, provisioning, or entitlements.

| Property | Description |
|----------| ----------- |
| **Authentication mode** | Select the authentication mode for your integration actions. <br> <ul><li> **Basic**: Use the Basic authentication scheme. See [Build basic authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-basic.htm) in the Workflows product documentation. </li><li> **Custom**: Use a custom authentication scheme. See [Build custom authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-custom.htm) in the Workflows product documentation. </li><li> **OAuth 2**: Uses OAuth 2.0 authorization code grant flow. See [Build OAuth 2.0 authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-oauth2.htm) in the Workflows product documentation. </li> </ul> |
| | Settings required for **OAuth 2** authentication |
| **Authorize endpoint** | Specify the HTTPS authorize endpoint. For example: `https://myexample.com/oauth2/auth`<br> You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Token endpoint** | Specify the HTTPS token endpoint. For example: `https://myexample.com/oauth2/token`<br>You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Client ID** | Specify the client ID. |
| **Client secret** | Specify the client secret. |
| **Scopes** | Optional: Specify scopes. |
| **Authentication variables** | Specify the variables used for **Custom** authentication in your integration actions. The variables are shown as parameters in the Integration Builder. |
| **Label** | Specify the label of the authentication variable. This is the name for the parameter that is shown in the dialog when an admin sets up your integration. |
| **Name**| Specify the authentication variable name (the parameter name).  |

6. Click **Save and start building**.

  You are redirected to the Workflows Integrator Builder in your org to define API Integration Actions. See [Build integrations with API Integration Actions](/docs/guides/build-api-actions/main/).

  Alternatively, click **Skip to configure your integration** to bypass building your integration with API Integration Actions. Continue to [Configure your integration](#configure-your-integration) only if your integration supports all the capabilities you selected at the beginning of the OIN Wizard.