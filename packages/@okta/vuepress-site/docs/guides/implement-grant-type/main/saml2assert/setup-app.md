1. Select **Native Application** for **Application type**, then click **Next**.
1. Enter an **App integration name**.
1. Enter the **Sign-in redirect URIs** box to redirect the user with their token.
1. Fill in the remaining details for your app integration, then click **Save**.
1. Locate the **General Settings** section on the **General** tab, and then click **Edit**.
1. Select **Refresh Token** and **SAML 2.0 Assertion** as the **Allowed grant types**. These selections enable you to exchange an assertion for the access token and also request a refresh token.

   > **Note:** The refresh token lifetime depends on the assertion lifetime and the [API Access Management policies](#configure-the-authorization-server-policy). The lowest of these defined values is the refresh token max lifetime.

1. Click **Save**.

Save the generated **Client ID** and **Client secret** values to implement your authorization flow.

> **Note:** You can either create an OIDC app integration or use an existing one. In the previous instructions, you're creating a native (mobile)app integration using the Admin Console. Use the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/#client-application-object) to create a SPA or web client application for use with the SAML 2.0 Assertion grant type.

### Configure the authorization server policy

Make sure that the SAML 2.0 Assertion grant type is enabled in the authorization server. You can create a rule or update an existing one. In this example, you're updating the default policy rule.

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select **default** from the **Name** column in the table. In this example, you're configuring the default policy rule for the [default custom authorization server](/docs/concepts/auth-servers/).

    > **Note:** See [Configure an access policy](/docs/guides/configure-access-policy/) for information on creating an access policy in the Okta authorization server.

1. Select the **Access Policies** tab and then click the pencil for the default policy rule to make changes.
1. In the **Edit Rule** window, select **SAML 2.0 Assertion** in the **IF Grant type is** section.
1. Click **Update Rule**.
