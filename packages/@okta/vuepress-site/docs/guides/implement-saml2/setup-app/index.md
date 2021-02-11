---
title: Set up your application
---

Set up your OpenID Connect application:

1. From the side navigation, select **Applications** and then **Applications**.

2. Click **Add Application** and then **Create New App**.

3. Select **Native** as the type of app **Platform** on the **Create a New Application Integration** window and then click **Create**.

4. Enter a name for your app and, in the **Login redirect URIs** box, specify the callback location where Okta returns a browser (along with the token) after the user finishes authenticating.

5. Click **Save** to create the app.

6. On the **General** tab that appears, scroll to the **General Settings** section and click **Edit**. 

7. Select **Refresh Token** and **SAML 2.0 Assertion** as the **Allowed grant types**. This enables you to exchange an assertion for the access token and also request a refresh token.

??Refresh token lifetimes will depend on the assertion lifetime and API Access Management policies. The lowest of both the values will end up being the refresh token max lifetime.??

??8. Make note of the **Client ID** listed in the **Client Credentials** section. You need this in the <GuideLink link="../use-flow">Use the SAML 2. 0 Assertion flow</GuideLink> section.??

<NextSectionLink/>
