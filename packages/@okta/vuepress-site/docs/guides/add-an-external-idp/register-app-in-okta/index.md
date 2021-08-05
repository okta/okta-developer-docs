---
title: Register an App in Okta
---

You can use either an existing OpenID Connect (OIDC) app integration or create a new one. The app integration consumes the response from the Identity Provider (IdP) after authentication and authorization. Users that sign in for the first time are created in Okta and are associated with this app integration.

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.

> **Note:** If you need Okta to only authenticate users and not to redirect them to a particular OpenID Connect client, then the Identity Provider (IdP) configuration is complete. Add [routing rules](https://help.okta.com/en/prod/Content/Topics/Security/Identity_Provider_Discovery.htm) to redirect users from the Okta Sign-In Page to the IdP.

If you want to add an existing OIDC app integration:

1. Click **Browse App Catalog**.
1. Enter the name of the app integration in the **Search...** text box
1. On the catalog page for the app integration, click **Add**.
1. Enter a label for your copy of this app integration. Click **Done** to add this to your org.
1. On the **Assignments** tab, click **Assign** to assign the app integration to any user or group in your org. Click **Done** when the assignments are complete.

If you need to create a new OIDC app integration:

1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method** and choose the appropriate **Application type** to match your external application environment. Click **Next**.
1. Enter a name for your new app integration.
1. Add one or more **Sign-in redirect URIs**. This is where the user is sent to after they authenticate with the Identity Provider.
1. Click **Save**.
1. Click **Edit** to change the **General Settings** pane. In the **Allowed grant types** section, enable **Implicit**. Using the [Implicit](/docs/guides/implement-grant-type/implicit/main/) flow streamlines authentication by returning tokens without introducing additional steps. It allows you to get an ID token quickly, which makes it easy to test your configuration. Click **Save** to confirm your changes.
    > **Note:** The Authorization Code grant flow is also supported.
1. On the **Assignments** tab, click **Assign** to assign the app integration to any user or group in your org. Click **Done** when the assignments are complete. For instructions on how to assign the app integration to individual users and groups, see the [Assign applications for people and groups](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Apps_Page-assign) topic in the Okta product documentation.

To get the client credentials for your app integration:

1. On the **General** tab, copy the **Client ID** from the **Client Credentials** section. You need this ID to complete the Authorize URL in the next section.

<NextSectionLink/>
