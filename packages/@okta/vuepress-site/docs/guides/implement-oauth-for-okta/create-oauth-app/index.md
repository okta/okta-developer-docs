---
title: Create an OAuth 2.0 app in Okta
---
Create the client application that you want to use with the Okta APIs.

1. Sign in to your Okta organization as a user with administrative privileges. [Create an org for free](https://developer.okta.com/signup).

1. Select **Applications** and then **Applications** from the side navigation.

1. On the **Applications** page, click **Add Application**.

1. On the **Create New Application** page, select any app type and then click **Next**. We suggest creating a web, single-page, or native app for an easy way to test scope-based access to Okta's APIs using an OAuth 2.0 bearer token.
  > **Note:** It is important to choose the appropriate application type for apps which are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, hence breaking the sign-in or sign-out flow.

1. Enter a name for your app and, in the **Login redirect URIs** box, specify the callback location where Okta returns a browser (along with the token) after the user finishes authenticating.

1. We recommend that you always use the Authorization Code grant flow and clear the **Implicit (Hybrid)** check box.

    > **Note:** You can leave the rest of the defaults as they work with this guide for testing purposes.

1. Click **Done**. The application's page appears and you land on the application's **General** tab. Make note of the **Client ID** listed in the **Client Credentials** section at the bottom of the page. You need this in the <GuideLink link="../request-access-token">Request an access token</GuideLink> section.

1. Click **Assignments** and ensure that the right users are assigned to the app. For more information about which users have access to which scopes, see the <GuideLink link="../scopes">Scopes and supported endpoints</GuideLink> section.

<NextSectionLink/>
