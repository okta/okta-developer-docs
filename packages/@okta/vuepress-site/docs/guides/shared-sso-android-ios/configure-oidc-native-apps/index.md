---
title: Configure Two OpenID Connect Native Apps
---
Within the same org, you need to set up two Native OpenID Connect (OIDC) client apps.

1. In the console, navigate to **Applications** and click **Add Application**.
2. Select **Native** and click **Next**.
3. Give the app a name, and then enter `com.first.sample:/callback` in the **Login redirect URIs** box for the first app.
    > **Note:** When you create the second app, enter `com.second.sample:/callback`.
4. Assign the group that you want (if you set [Group Assignments](/docs/reference/social-settings/) for your app) or leave the **Everyone** default. 
5. Make sure that **Authorization Code** and **Refresh Token** are selected in the **Grant Type Allowed** section.
6. Click **Done**.
7. In the **General Settings** section, click **Edit**.
8. In the **Login** section, click **Add URI** next to **Logout Redirect URIs**.
9. Enter `com.first.sample:/logout` for the first app.
    > **Note:** When you create the second app, enter `com.second.sample:/logout`.
10. Scroll to the **Client Credentials** section and copy the Client IDs for both the first and second app for use in a later step. 

Next, you set up the mobile applications using the configuration from these native apps that you just created.

<NextSectionLink/>
