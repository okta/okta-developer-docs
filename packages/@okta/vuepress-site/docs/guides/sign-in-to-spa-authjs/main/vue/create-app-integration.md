Before you integrate authentication to your Vue.js app, you must register your app in your org. This provides you with the OpenID Connect client ID for authentication requests from your app. Register your app by creating an app integration through the [Okta Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application). You can also use the [Admin Console](/docs/concepts/okta-organizations/#admin-console) with the following steps:

1. To create an app integration that represents your Vue.js app, sign in to [your Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Create App Integration**.
3. In the dialog that appears, select **OIDC - OpenID Connect** as the **Sign-in method**, **Single-Page Application** as the **Application type**, and then click **Next**.
4. Fill in the following new app integration settings, and then click **Save**:

    | Setting                | Value/Description                                    |
    | -------------------    | ---------------------------------------------------  |
    | App integration name   | Specify a unique name for your app.                  |
    | Grant types            | Leave **Authorization Code** selected, and then select **Refresh Token**. Click **Advanced** and select **Interaction Code**. |
    | Sign-in redirect URIs  | Specify your app URI for the callback redirect from Okta. For example: `http://localhost:8080/login/callback` |
    | Sign-out redirect URIs | Specify your app sign-out redirect URI. For example: `http://localhost:8080` |
    | Trusted Origins > Base URIs | Specify your app base URI for CORS. For example: `http://localhost:8080`|
    | Assignments   | Assign users to your app.    |

5. Select the **Sign On** tab and scroll down to the **User authentication** section. New apps are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup.

6. For this use case, Okta wants to use only the password factor. Click **Edit** and select the **Password only** [preset policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) to assign it to your app.

7. Click **Save**.

    > **Note:** Be sure to also [update the policy rule of the password authenticator](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#update-the-password-authenticator-to-password-only) to not require any additional verification.

> **Note:** You can verify that both **CORS** and **redirect** are enabled for your app using the Admin Console. Go to **Security** > **API** > **Trusted Origins** page in the Admin Console to review the configured trusted origins.
> * Ensure that **Interaction Code**, **Refresh Token**, and **Authorization Code** grant types are enabled for your app.

### App integration settings

You need two pieces of information from your org and app integration for your Vue.js app:

* **Client ID**: From the **General** tab of your app integration, save the generated **Client ID** value.
* **Issuer**: From the **General** tab of your app integration, save the **Okta domain** value. Use your Okta domain value for the [issuer](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) setting that represents the authorization server. Use `https://{yourOktaDomain}/oauth2/default` as the issuer for your app if you're using the Okta Integrator Free Plan org. See [Issuer configuration](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) if you want to use another Okta custom authorization server.
