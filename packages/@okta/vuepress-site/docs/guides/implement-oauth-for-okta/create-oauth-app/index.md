---
title: Create an OAuth 2.0 app in Okta
---
Create the client application that you want to use with the Okta APIs.

1. Sign in to your Okta organization as a user with administrative privileges. [Create an org for free](https://developer.okta.com/signup).

    > **Note:** Make sure that you are using the Developer Console. If you see Admin Console in the top left of the page, click it and select **Developer Console** to switch.

2. Click **Applications** from the menu, and then click **Add Application**.

3. On the **Create New Application** page, select any app type and then click **Next**. We suggest creating a web, single-page, or native app for an easy way to test scope-based access to Okta's APIs using an OAuth 2.0 bearer token.

4. Enter a name for your app and, in the **Login redirect URIs** box, specify the callback location where Okta returns a browser (along with the token) after the user finishes authenticating.

5. For testing purposes, select the **Implicit (Hybrid)** grant flow. Using Implicit streamlines authentication for testing by returning a token without introducing any additional steps. In a production environment, we recommend that you always use the Authorization Code grant flow and clear the **Implicit (Hybrid)** check box.

    > **Note:** You can leave the rest of the defaults as they work with this guide for testing purposes.

6. Click **Done**. The application's page appears and you land on the application's **General** tab. Make note of the **Client ID** listed in the **Client Credentials** section at the bottom of the page. You need this in the <GuideLink link="../request-access-token">Request an access token</GuideLink> section.

7. Click **Assignments** and ensure that the right users are assigned to the app. For more information about which users have access to which scopes, see the <GuideLink link="../scopes">Scopes and supported endpoints</GuideLink> section.

<NextSectionLink/>
