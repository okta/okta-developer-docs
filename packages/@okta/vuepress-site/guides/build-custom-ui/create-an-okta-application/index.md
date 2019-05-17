---
title: Create an Okta Application
---
Before your code can successfuly get access token, you need to create an Okta Application that represents your mobile application.

First, sign in to the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then **Add Application**. Pick **Native** as the platform. Enter a name for your application (or leave the default value).

2. Enter values for the **Login redirect URI**. For example `com.okta.example:/callback`. This URI will be used to send Oauth responses.

3. Finally, click **Done** to finish creating the Okta Application. You need to copy some values into your application later, so leave the Developer Console open.

<NextSectionLink/>
