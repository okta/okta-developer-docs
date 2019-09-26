---
title: Create an OAuth 2.0 app in Okta
---
Create the client service application that you want to use with the Okta APIs. 

1.  Sign in to your Okta organization as a user with administrative privileges. Don't have one? [Create one for free](https://developer.okta.com/signup).
 
    > **Caution:** Make sure that you are using the Developer Console. If you see Admin Console in the top left of the page, click it and select **Developer Console** to switch.
 
2.  Click **Applications** from the menu, and then click **Add Application**.
 
3.  On the **Create New Application** page select any app type. We suggest creating a web, single-page, or native app for an easy way to test scope-based access to Okta's APIs using an OAuth 2.0 bearer token. 

    > **Note:** See the <GuideLink link="../use-client-credentials-grant-flow">Use the Client Credentials grant flow</GuideLink> section for information on using an OAuth Service app when you need a backend service to call the Okta APIs.

4. Click **Next** and make any necessary changes to the default values.

5. Click **Done**. The application's page appears and you land on the application's **General** tab. Make note of the **Client ID** listed in the **Client Credentials** section at the bottom of the page. You need this in the <GuideLink link="../request-access-token">Request an access token</GuideLink> section.

6. Click **Assignments** and ensure that the right users are assigned to the app. For more information about which users have access to which scopes, see the <GuideLink link="../scopes">Scopes</GuideLink> section.
 
<NextSectionLink/> 
