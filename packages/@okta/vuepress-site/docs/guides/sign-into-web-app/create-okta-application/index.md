---
title: Create an Okta Application
---

Before you can sign a user in, you need to create an Okta Application that represents your web application.

Start by signing in to the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then **Add Application**. Pick **Web** as the platform. Enter a name for your application (or leave the default value).

2. Add the **Base URI** of your application during local development, such as `http://localhost:3000`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`.

3. Next, enter values for the **Login redirect URI**. This is the callback described in <GuideLink link="../define-callback">Understand the Callback Route</GuideLink>. Add values for local development (such as `http://localhost:8080/authorization-code/callback`) and production (such as `https://app.example.com/authorization-code/callback`).

4. Click **Done** to finish creating the Okta Application. You need to copy some values into your code later, so leave the Developer Console open.

<NextSectionLink/>
