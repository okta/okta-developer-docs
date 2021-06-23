---
title: Set up your Application
---

You set up your OpenID Connect app integration inside the Okta Admin Console:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method**, and then pick either **Native Application** or **Single-Page Application**, depending on the type of application that you are working on.

    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have and would break the sign-in or sign-out flow.

1. Fill in the details for your app integration, then click **Save**.

<NextSectionLink/>
