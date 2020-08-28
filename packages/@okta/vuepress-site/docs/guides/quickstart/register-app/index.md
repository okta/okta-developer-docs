---
title: Register your app
---

In this section, you'll learn how to hook up your Okta org to the app that's going to use it for sign-in. To tell Okta about the app, and to collect the pieces of information you need to integrate into your app, you use the Developer Console's app screen.

For simplicity, in this run-through let's assume that your app is a web app, i.e., a server-side app, and that you want to use the Okta-hosted sign-in page, rather than implement or host your own sign-in page.

To start, find the example applications, provided by Okta on GitHub, for the language or framework you work in:

| Language / Framework | Link                                               |
|----------------------|----------------------------------------------------|
| ASP.Net              | <https://github.com/okta/samples-aspnet>           |
| ASP.NET Core         | <https://github.com/okta/samples-aspnetcore>       |
| ASP.Net Web Forms    | <https://github.com/okta/samples-aspnet-webforms>  |
| Java Servlet         | <https://github.com/okta/samples-java-servlet>     |
| Java Spring          | <https://github.com/okta/samples-java-spring>      |
| JavaScript Angular   | <https://github.com/okta/samples-js-angular>       |
| JavaScript React     | <https://github.com/okta/samples-js-react>         |
| JavaScript Vue       | <https://github.com/okta/samples-js-vue>           |
| Golang               | <https://github.com/okta/samples-golang>           |
| Node.js Express      | <https://github.com/okta/samples-nodejs-express-4> |
| Python Flask         | <https://github.com/okta/samples-python-flask>     |
| PHP                  | <https://github.com/okta/samples-php>              |

Specifically, look for the `okta-hosted-login` example (there are samples provided for many other purposes).

After getting the sample code, you need to hook it up to your Okta org by registering the app in Developer Console and then getting some values from Okta, which you need to set in the app.

### Tell Okta about the app

Using the Okta CLI, run `okta apps create`.

1. Give your app a name.
2. Select **Web** for Type of Application.
3. Select **Other**.
4. Use the default Login redirect URI, `http://localhost:8080/callback`

You can also use the Developer Console:

1. Click **Applications**.

2. Click **Add Application**.

3. Select **Web** as the type of application. Click **Next**.

4. Enter the **Name** of your app.

5. Leave **Base URI** set to the default. This is the domain where your app runs. For this quick start guide, we'll use `localhost`, which is where the sample apps run by default. You might need to change the port, depending on the default port your framework uses to serve `localhost` pages. 

6. Leave **Login redirect URIs** set to the default. Okta sends OAuth authorization responses to these URIs, which are also known as callback endpoints.

5. Leave **Logout redirect URIs** set to the default. This setting lets you specify a URI to redirect the user’s browser to when they sign out.

6. Leave **Group assignments** set to the default, which is "Everyone". Users can only sign in to apps that they are assigned to. Group assignments let you manage assignments for large numbers of users at once.

7. For **Grant type allowed**, under "Client acting on behalf of a user", select **Authorization Code**. This is the OAuth 2.0 grant type that Okta will provide.

8. Click **Done**.

### Get values from Okta to set in the app

On the same **Apps** page in Developer Console, gather the following information that Okta populates into fields on the page:

 - **Client ID**: This is the public identifier for the client, which is required for all OAuth flows.

 - *Client Secret**: This is the secret used by the client to exchange an authorization code for a token. This must be kept confidential.

Now, still in Developer Console, go to **API > Authorization Servers** and gather the following value found on that page:

 - **Issuer URI**: This is the URI of the authorization server that will perform authentication. All Developer Accounts have a "default" authorization server you can use..

### Set values in environment variables or configuration file

You now have the specific values for Client ID, Client Secret, and Issuer ID, which your app needs to use. The various example apps all provide ways of setting these values, but some of the example apps expect you to set environment variables, while some expect settings in a configuration file. Consult the README file for the example app you're using and set the three values.
