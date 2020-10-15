---
title: Register your app
---

In this section, you'll learn how to hook up your Okta org to the app that's going to use it for sign-in.

For simplicity, we'll assume that your app is a server-side web app, rather than one of the other supported types of apps, and that you want to use the Okta-hosted sign-in page, rather than host the sign-in page yourself.

#### Start from a sample app

To start, find the example applications provided by Okta on GitHub for the language or framework you work in:

| Framework         | Repository                                         |
|-------------------|----------------------------------------------------|
| ASP.Net           | <https://github.com/okta/samples-aspnet>           |
| ASP.NET Core      | <https://github.com/okta/samples-aspnetcore>       |
| ASP.Net Web Forms | <https://github.com/okta/samples-aspnet-webforms>  |
| Java Servlet      | <https://github.com/okta/samples-java-servlet>     |
| Java Spring       | <https://github.com/okta/samples-java-spring>      |
| Angular           | <https://github.com/okta/samples-js-angular>       |
| React             | <https://github.com/okta/samples-js-react>         |
| Vue               | <https://github.com/okta/samples-js-vue>           |
| Golang            | <https://github.com/okta/samples-golang>           |
| Node.js Express   | <https://github.com/okta/samples-nodejs-express-4> |
| Python Flask      | <https://github.com/okta/samples-python-flask>     |
| PHP               | <https://github.com/okta/samples-php>              |

Specifically, look for the `okta-hosted-login` example (there are samples provided for several use cases).

You can try building the example app as-is to start or you can use it as a template for modifying your own app. When you have an app running, you're ready to connect it to your Okta org. 

#### Tell Okta about the app

In the Developer Console, complete these steps:

1. Click **Applications**.

2. Click **Add Application**.

3. Select **Web** as the type of application. Click **Next**.

4. Enter the **Name** of your app.

5. Leave **Base URI** set to the default. This is the domain where your app runs. For this quick start guide, we'll use `localhost`, which is where the sample apps run by default. You might need to change the port, depending on the default port your framework uses to serve `localhost` pages. 

6. For **Login redirect URIs**, enter: `http://localhost:8080/login/callback`. Okta sends OAuth authorization responses to the specified URIs, which are also known as callback endpoints.

5. Leave **Logout redirect URIs** set to the default. This setting lets you specify a URI to redirect the user’s browser to when they sign out.

6. Leave **Group assignments** set to the default, which is "Everyone". Users can only sign in to apps that they are assigned to. Group assignments let you manage assignments for large numbers of users at once.

7. For **Grant type allowed**, under "Client acting on behalf of a user", select **Authorization Code**. This is the OAuth 2.0 grant type that Okta will provide.

8. Click **Done**.

#### Get values from Okta to set in the app

In the Developer Console, gather the following information from your app's settings page:

 - **Client ID**: This is the public identifier for the client, which is required for all OAuth flows.

 - **Client Secret**: This is the secret used by the client to exchange an authorization code for a token. This must be kept confidential.

Remaining in Developer Console, go to **API > Authorization Servers** and gather the following value found on that page:

 - **Issuer URI**: This is the URI of the authorization server that will perform authentication. All Developer Accounts have a "default" authorization server you can use..

#### Set values in environment variables or configuration file

You now have the specific values for Client ID, Client Secret, and Issuer ID, which your app needs to use. The various example apps all provide ways of setting these values, but some of the example apps expect you to set environment variables, while some expect settings in a configuration file. Consult the README file for the example app you're using and set the three values.

<NextSectionLink/>

