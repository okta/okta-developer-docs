---
title: Register an App in Okta
---
You can either use an existing OpenID Connect (OIDC) app integration or create a new one. This is the app that consumes the response from the Identity Provider after authentication and authorization. Users that sign in for the first time are created in Okta and are associated with this app integration.

1. In the Admin Console for your Okta org, click **Applications**.
1. Click **Add Application**.

If you want to add an existing OIDC app integration:

1. Enter the name of the app integration in the **Search...** text box
1. On the app integration catalog page, click **Add**.
1. On the **Assignments** settings tab, you can assign the app integration to any user or group in your org or leave the **Everyone** default. Click **Done**.
1. On the **Sign On** settings tab, copy the **Client ID** needed to complete the Authorize URL in the next step.

If you need to create a new OIDC app integration:

1. Click **Create New App**.
1. Select the appropriate platform for your external application and select the OpenID Connect sign-on method. Click **Create**.
1. Enter a label for your new application.
1. Add one or more **Login redirect URIs**. This is where the user is directed after they authenticate with the Identity Provider.
1. On the **General** settings tab, copy the **Client ID** from the **Client Credentials** section. You need this ID to complete the Authorize URL in the next section.
1. Click **Edit** to change the **General Settings** pane. In the **Allowed grant types** section, enable **Implicit**. Using the [Implicit](/docs/guides/implement-implicit/overview/) flow streamlines authentication by returning tokens without introducing additional steps. It allows you to get an ID token quickly, which makes it easy to test your configuration. Click **Save** to confirm your changes.
    > **Note:** The Authorization Code grant flow is also supported.
1. On the **Assignments** settings tab, you can assign the app integration to any user or group in your org or leave the **Everyone** default. Click **Done**.

<NextSectionLink/>
