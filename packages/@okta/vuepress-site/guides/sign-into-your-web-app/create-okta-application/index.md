---
title: Create an Okta Application
---

Before your code can redirect to Okta to sign a user in, you need to create an Okta Application that represents your web application.

First, sign in to the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then **Add Application**. Pick **Web** as the platform. Enter a name for your application (or leave the default value).

2. Add the **Base URI** of your application that you use for local development, such as `http://localhost:8080`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`.

3. Next, enter values for the **Login redirect URI**. This is the callback explained in the [previous step](define-callback-route). You should add values for local development (such as `http://localhost:8080/authorization-code/callback`) and production (such as `https://app.example.com/authorization-code/callback`).

4. Finally, click **Done** to finish creating the Okta Application. You need to copy some values into your application later, so leave the Developer Console tab open.

<NextSectionLink/>
