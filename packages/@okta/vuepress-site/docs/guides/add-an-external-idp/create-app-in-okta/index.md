---
title: Create an App in Okta
---
You need to create an OpenID Connect app in your Okta org. This app consumes the response from the Identity Provider after authentication and authorization, allowing user access to your application. Users that sign in for the first time are created in Okta and are associated with this application.

1. In your Okta org, click **Applications**, and then **Add Application**.

2. Select the appropriate platform for your use case, enter a name for your new application, and then click **Next**.

3. Add one or more **Login redirect URIs**. This is where the user is directed after they authenticate with the Identity Provider.

4. Assign the group of your choosing (if you [set Group Assignments](/docs/reference/social-settings/) for your app) or leave the **Everyone** default.

5. In the **Grant type allowed** section, make sure that you enable **Implicit**.

    > Note: The Authorization Code grant flow is also supported.

6. Click **Done**.

7. Scroll to the **Client Credentials** section and copy the Client ID that you use to complete the Authorize URL in the next step.

<NextSectionLink/>
