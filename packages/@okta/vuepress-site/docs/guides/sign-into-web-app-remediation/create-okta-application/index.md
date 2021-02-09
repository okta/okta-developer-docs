---
title: Create an Okta application
---
Before you can sign a user in, you need to create an Okta application that represents your web application.

Start by signing in to the Okta Admin Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications** and then **Applications**.

1. Click **Add Application**. Pick **Web** as the platform. Click **Next**.

1. Enter a name for your application (or leave the default value).

1. Add the **Base URI** of your application during local development, such as `http://localhost:3000`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`.

1. Next, enter values for the **Login redirect URI**. Add values for local development (such as `http://localhost:8080/authorization-code/callback`) and production (such as `https://app.example.com/authorization-code/callback`). Your users will not be redirected, but this URL is required by the API to validate the request.

1. Under **Grant type allowed**, make sure that **Interaction Code** is checked off.

1. Click **Done** to finish creating the Okta application. You need to copy some values into your code later, so leave the Admin Console open.

<NextSectionLink/>
