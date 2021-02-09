---
title: Create an Okta application
---
Before you can sign a user in, you need to create an Okta Application that represents your mobile application.

First, sign in to the Okta Admin Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications** and then **Applications** from the side navigation.
 
1. Click **Add Application** on the **Applications** page. Pick **Native** as the platform. Enter a name for your application (or leave the default value).
  > **Note:** It is important to choose the appropriate application type for apps which are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, hence breaking the sign-in or sign-out flow.

1. Enter your callback route for the **Login redirect URI**. This is the full redirect URI that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (like `com.okta.example:/login`).

1. Enter your callback route for the **Logout redirect URI**. This is the full redirect URI that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (for example, `com.okta.example:/logout`).

1. Finally, click **Done** to finish creating the Okta application. You need to copy some values into your application later, so leave the Admin Console open.

<NextSectionLink/>
