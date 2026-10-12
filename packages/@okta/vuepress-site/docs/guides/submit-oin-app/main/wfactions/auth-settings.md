#### Authentication settings

5. Specify authentication settings to your app resources for Universal Logout, provisioning, or entitlements.

| Property | Description |
|----------| ----------- |
| **Authentication mode** | Select the authentication mode for your integration actions. <br> <ul><li> **Basic**: Use the Basic authentication scheme. Basic authentication contains the default `auth_user_name` and `auth_user_password` settings available for tenant integration. See [Build Basic authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-connectorbuilder-auth-basic) in the Workflows product documentation. </li><li> **Custom**: Use a custom authentication scheme. See [Build custom authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-connectorbuilder-auth-custom) in the Workflows product documentation. </li><li> **OAuth 2**: Uses OAuth 2.0. Select a grant type. See [Build OAuth 2.0 authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-connectorbuilder-auth-oauth) in the Workflows product documentation. </li> </ul> |

| Custom | Settings required for API Integration Action custom authentication |
| ------- | ----------- |
| **Authentication variables** | Specify the variables used for **Custom** authentication in your integration actions. The variables are shown as connection parameters in the Integration Builder. |
| **Label** | Specify the label of the authentication variable. This is the display name for the parameter that is shown in the dialog when an admin sets up your integration. |
| **Name** | Specify the authentication variable name (the parameter name). |

| OAuth 2 | Settings required for API Integration Action OAuth 2.0 authentication |
| ------- | ----------- |
| **Grant type** | Select the OAuth 2.0 grant type that your integration actions use: <ul><li> **Authorization Code** (default): Redirects the user to sign in to the identity provider and grant consent before returning an authorization code. Your app then exchanges the authorization code and client credentials for a token at the token endpoint. Requires an authorize endpoint, client ID, and client secret, which apply at the integration level for all orgs that install your integration. </li><li> **Client Credentials**: Your app authenticates directly with its own credentials in a machine-to-machine call. There's no redirect, sign-in, or consent step. Your app exchanges its client credentials directly for a token at the token endpoint. Only the token endpoint and scopes are specified at the integration level. The client ID and client secret aren't collected here. Each org admin specifies their own values for their app instance when they enable API integration in the **Provisioning** tab. </li></ul> |
| **Authorize endpoint** | Required for the **Authorization Code** grant type. Specify the HTTPS authorize endpoint. For example: `https://myexample.com/oauth2/auth`<br> You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Token endpoint** | Required for both grant types. Specify the HTTPS token endpoint. For example: `https://myexample.com/oauth2/token`<br>You can specify a dynamic endpoint URL. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language). |
| **Client ID** | Required for the **Authorization Code** grant type. Specify a client ID field to map to the Integration Builder. You can specify any string field. This field is automatically mapped to the **Client ID** field (`auth.client_id`) in the **Authentication mapping** section of your project in the Integration Builder. |
| **Client secret** | Required for the **Authorization Code** grant type. Specify the client secret field to map to the Integration Builder. You can specify any string field. This field is automatically mapped to the **Client Secret** field (`auth.client_secret`) in the **Authentication mapping** section of your project in the Integration Builder. |
| **Scopes** | (Optional) Specify scopes for the resources to access. Applies to both grant types. |

> **Note:** The Client Credentials grant type doesn't collect a client ID or client secret in the OIN Wizard. In the Authorization Code flow, Okta redirects the user to sign in to the identity provider and grant consent before Okta and your app exchange a token. This extra step means every app instance can safely share the same client ID and client secret. The Client Credentials flow skips that step and makes a direct machine-to-machine call, so each app instance needs its own client ID and client secret. The org admin sets the client ID and client secret for their app instance in the Admin Console. Go to **Applications** > **Applications** > *your app instance* > **Provisioning** > **Configure API Integration** > **Enable API integration**.


6. Click **Save and start building**.

  The OIN Wizard redirects you to the Integration Builder to define API actions for your integration. See [Build integrations with API Integration Actions](/docs/guides/build-api-actions/main/).

 > **Note**: You can click **Skip to configure your integration** to bypass building your API integration actions. Continue to [Configure your integration](#configure-your-integration) if you have already defined all your API integration actions.