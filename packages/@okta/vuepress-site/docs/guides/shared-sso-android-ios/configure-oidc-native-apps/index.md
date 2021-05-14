---
title: Configure Two OpenID Connect Native Apps
---
Within the same org, you need to set up two Native OpenID Connect (OIDC) client apps.

1. In the Admin console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Native Application** as the **Application type** and click **Next**.
1. Give the app integration a name, and then enter `com.first.sample:/callback` in the **Sign-in redirect URIs** box for the first app.
    > **Note:** When you create the second app, enter `com.second.sample:/callback`.
1. Assign the group that you want (if you set [Group Assignments](/docs/reference/social-settings/) for your app) or leave the **Everyone** default.
1. Make sure that **Authorization Code** and **Refresh Token** are selected in the **Grant Type Allowed** section.
1. Click **Done**.
1. In the **General Settings** section, click **Edit**.
1. In the **Login** section, click **Add URI** next to **Sign-out Redirect URIs**.
1. Enter `com.first.sample:/logout` for the first app.
    > **Note:** When you create the second app, enter `com.second.sample:/logout`.
1. Scroll to the **Client Credentials** section and copy the Client IDs for both the first and second app for use in a later step.

Next, you set up the mobile applications using the configuration from these native apps that you just created.

<NextSectionLink/>
