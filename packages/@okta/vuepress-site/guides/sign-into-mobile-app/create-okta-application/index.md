---
title: Create an Okta Application
---
Before you can sign a user in, you need to create an Okta Application that represents your mobile application.

First, sign in to the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then **Add Application**. Pick **Native** as the platform. Enter a name for your application (or leave the default value).

2. Enter your callback route for the **Login redirect URI**. This is the callback route that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (like `com.okta.example:/callback`). 

3. Finally, click **Done** to finish creating the Okta Application. You need to copy some values into your application later, so leave the Developer Console open.

<NextSectionLink/>