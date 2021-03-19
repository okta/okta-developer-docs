---
title: Set up your application
---

You can use either an existing OpenID Connect app integration or create a new one. In this example, we are creating a Native app using the Admin Console.

> **Note:** You must use the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/#client-application-object) to create a SPA or Web client application for use with the SAML 2.0 Assertion grant type.

1. From the Admin Console side navigation, select **Applications** and then **Applications**.

2. On the Applications page, click **Add Application** and then **Create New App**.

3. Select **Native** as the type of app **Platform** on the **Create a New Application Integration** window and then click **Create**.

4. Enter a name for your app and, in the **Login redirect URIs** box, specify the callback location where Okta returns the browser (along with the token).

5. Click **Save** to create the app.

6. On the **General** tab that appears, scroll to the **General Settings** section and click **Edit**.

7. Select **Refresh Token** and **SAML 2.0 Assertion** as the **Allowed grant types**. This enables you to exchange an assertion for the access token and also request a refresh token.

    > **Note:** The refresh token lifetime depends on the assertion lifetime and the <GuideLink link="../configure-policy-as">API Access Management policies</GuideLink>. The lowest of both of these defined values is the refresh token max lifetime.

6. Click **Save**. The application's page appears and you land on the application's **General** tab. Make note of the **Client ID** and **Client secret** listed in the **Client Credentials** section. You need this in the <GuideLink link="../use-flow">Use the SAML 2.0 Assertion flow</GuideLink> section.

<NextSectionLink/>
