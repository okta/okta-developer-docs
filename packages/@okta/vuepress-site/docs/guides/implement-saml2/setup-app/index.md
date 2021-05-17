---
title: Set up your application
---

You can use either an existing OpenID Connect app integration or create a new one. In this example, we are creating a Native app using the Admin Console.

> **Note:** You must use the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/#client-application-object) to create a SPA or Web client application for use with the SAML 2.0 Assertion grant type.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration window, select **SAML 2.0** as the **Sign-in method**. Select **Native Application** as the **Application type**. Click **Next**.
1. Enter a name for your app integration. In the **Sign-in redirect URIs** box, specify the callback location where Okta returns the browser (along with the token).
1. Click **Save** to create the app.
1. On the **General** tab that appears, scroll to the **General Settings** section and click **Edit**.
1. Select **Refresh Token** and **SAML 2.0 Assertion** as the **Allowed grant types**. These selections enable you to exchange an assertion for the access token and also request a refresh token.

    > **Note:** The refresh token lifetime depends on the assertion lifetime and the <GuideLink link="../configure-policy-as">API Access Management policies</GuideLink>. The lowest of both of these defined values is the refresh token max lifetime.

1. Click **Save**.
1. On the **General** tab, make note of the **Client ID** and **Client secret** listed in the **Client Credentials** section. You need these credentials in the <GuideLink link="../use-flow">Use the SAML 2.0 Assertion flow</GuideLink> section.

<NextSectionLink/>
