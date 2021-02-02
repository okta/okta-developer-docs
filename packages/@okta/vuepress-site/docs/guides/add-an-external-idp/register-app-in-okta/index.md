---
title: Register an App in Okta
---
You can either use an existing OpenID Connect app or create one. This is the app that consumes the response from the Identity Provider after authentication and authorization. Users that sign in for the first time are created in Okta and are associated with this app integration.

1. In your Okta org, click **Applications**, and then **Add Application**.

2. Select the appropriate platform for your use case, enter a name for your new application, and then click **Next**.

3. Add one or more **Login redirect URIs**. This is where the user is directed after they authenticate with the Identity Provider.

4. Assign the group of your choosing (if you [set Group Assignments](/docs/reference/social-settings/) for your app) or leave the **Everyone** default.

5. In the **Grant type allowed** section, enable **Implicit**. Using the [Implicit](/docs/guides/implement-implicit/overview/) flow streamlines authentication by returning tokens without introducing any unnecessary additional steps. It allows you to get an ID token quickly, which makes it easy to test your configuration.

    > **Note:** The Authorization Code grant flow is also supported.

6. Click **Done**.

7. Scroll to the **Client Credentials** section and copy the client ID that you use to complete the Authorize URL in the next step.

<NextSectionLink/>
