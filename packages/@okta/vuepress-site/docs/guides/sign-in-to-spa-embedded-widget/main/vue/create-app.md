Before integrating Okta authentication to your Vue.js app, you need to register your app in your Okta org. This provides you with the OpenID Connect client ID for authentication requests from your app. Register your app by creating an Okta app integration through the [Okta CLI](https://cli.okta.com/), the [Okta Apps API](/docs/reference/api/apps/), or through the [Admin Console](/docs/guides/quickstart/website/main/#using-the-admin-console) with the following steps.

1. To create an Okta app integration that represents your Vue.js app, sign in to [your Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Create App Integration**.
3. In the dialog box that appears, select **OIDC - OpenID Connect** as the **Sign-on method**, **Single-Page Application** as the **Application type**, and then click **Next**.
4. Fill in the following new app integration settings, and then click **Save**:

    | Setting                | Value/Description                                    |
    | -------------------    | ---------------------------------------------------  |
    | App integration name   | Specify a unique name for your app.                  |
    | Grant types            | Select **Authorization Code**, **Interaction Code**, and  **Refresh Token**. |
    | Sign-in redirect URIs  | `http://localhost:8080/login/callback`               |
    | Sign-out redirect URIs | `http://localhost:8080`                              |
    | Trusted Origins > Base URIs | Specify your app base URI. For example: `http://localhost:8080`|
    | Assignments   | Assign users for your app.                                |

    > **Note:** Cross-Origin Resource Sharing (CORS) is automatically enabled for the Trusted Origins base URI you've specified. Ensure that both **CORS** and **redirect** are selected in **Security** > **API** > **Trusted Origins** for your base URI.

### Okta org app integration configuration settings

You need two pieces of information from your org and app integration for your Vue.js app:

* **Client ID**: From the **General** tab of your app integration, save the generated **Client ID** value.
* **Issuer**: The [issuer](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) is the authorization server. Use `https://${yourOktaDomain}/oauth2/default` as the issuer for your app if you're using the Okta Developer Edition org. See [Issuer configuration](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) if you want to use another Okta custom authorization server.

