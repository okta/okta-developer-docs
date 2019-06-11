---
title: Create an App in Okta
---

You need to create an OIDC app in your Okta org. This app consumes the response from the IdP after authentication and authorization, allowing user access to your Okta org.

1. In the Developer's Console, select **Applications** and then click **Add Application**.
2. You need a trusted client, so select **Web** as the platform. OpenID Connect is the sign-in method by default.
3. Click **Next**.
4. Choose a name for your application.
5. Add one or more **Redirect URIs**. The login redirect URI is where Okta sends the user after they have completed authentication and authorization. You want to redirect the user to your Okta org after they have successfully authenticated. For example: `https://yourOktaorg.com`
6. Leave the other defaults and click **Done**.
7. Copy the **Client ID** from the **Client Credentials** section and paste in to a text editor. You need this to complete your **Authorize URL** in the next step.

<NextSectionLink/>
