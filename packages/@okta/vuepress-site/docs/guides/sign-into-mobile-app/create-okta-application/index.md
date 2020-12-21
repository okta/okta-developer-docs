---
title: Create an Okta application
---
Before you can sign a user in, you need to create an Okta Application that represents your mobile application.

First, sign in to the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then **Add Application**. Pick **Native** as the platform. Enter a name for your application (or leave the default value).
  > **Note:** It is important to choose appropirate application type for apps which are public clients. Failing to do so may result in Okta API endpoints attempting to verify app's client secret, which public client are not designed to have, hence breaking sign in or sign out flow.

2. Enter your callback route for the **Login redirect URI**. This is the full redirect URI that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (like `com.okta.example:/login`).

3. Enter your callback route for the **Logout redirect URI**. This is the full redirect URI that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (for example, `com.okta.example:/logout`).

4. Finally, click **Done** to finish creating the Okta application. You need to copy some values into your application later, so leave the Developer Console open.

<NextSectionLink/>
