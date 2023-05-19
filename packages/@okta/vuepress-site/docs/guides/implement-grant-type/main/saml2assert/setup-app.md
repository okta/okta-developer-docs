4. Select **Native Application** as the **Application type**, then click **Next**.
5. Enter a name for your app integration. In the **Sign-in redirect URIs** box, specify the callback location where Okta returns the browser (along with the token).
6. Click **Save** to create the app.
7. On the **General** tab that appears, scroll to the **General Settings** section and click **Edit**.
8. Select **Refresh Token** and **SAML 2.0 Assertion** as the **Allowed grant types**. These selections enable you to exchange an assertion for the access token and also request a refresh token.

    > **Note:** The refresh token lifetime depends on the assertion lifetime and the [API Access Management policies](#configure-the-authorization-server-policy). The lowest of both of these defined values is the refresh token max lifetime.

9. Click **Save**.
10. On the **General** tab, make note of the **Client ID** and **Client secret** listed in the **Client Credentials** section. You need these credentials in the SAML 2.0 Assertion [flow specifics](#flow-specifics) section.

> **Note:** You can use either an existing OpenID Connect app integration or create a new one. In the previous instruction, we are creating a Native app using the Admin Console. You must use the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/#client-application-object) to create a SPA or Web client application for use with the SAML 2.0 Assertion grant type.

### Configure the authorization server policy

Make sure that the SAML 2.0 Assertion grant type is enabled in the authorization server. You can update an existing rule or create a new rule. In this example, we are updating the Default Policy Rule.

1. In the Admin Console, go to **Security** > **API**.

1. On the **Authorization Servers** tab, select **default** from the **Name** column in the table. In this example, we are configuring the Default Policy Rule for the [default custom authorization server](/docs/concepts/auth-servers/).

    > **Note:** See [Configure an access policy](/docs/guides/configure-access-policy/) for information on creating an access policy in the Okta authorization server.

1. Select the **Access Policies** tab and then click the pencil for the Default Policy Rule to make changes.

1. In the **Edit Rule** window, select **SAML 2.0 Assertion** in the **IF Grant type is** section.

1. Click **Update Rule**.
