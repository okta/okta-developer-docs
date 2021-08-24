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
1. Ensure that **Authorization Code** and **Refresh Token** are selected in the **Grant Type Allowed** section.
1. Assign the group that you want (if you set Group Assignments for your app) or leave the **Everyone** default. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Apps_Page-assign) topic in the Okta product documentation.
1. Click **Save**.
1. In the **General Settings** section, click **Edit**.
1. In the **Login** section, click **Add URI** next to **Sign-out Redirect URIs**.
1. Enter `com.first.sample:/logout` for the first app.
    > **Note:** When you create the second app, enter `com.second.sample:/logout`.
1. Scroll to the **Client Credentials** section. Copy the Client IDs for both the first and second app for use in a later step.

Next, you set up the mobile applications using the configuration from these native apps that you just created.

<NextSectionLink/>
