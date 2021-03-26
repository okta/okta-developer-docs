---
title: Register your app
---

You can use either the Okta CLI or the Admin Console to register your app to your Okta org for user authentication. After your app is registered, your Okta org generates the issuer ID, client ID, and client secret for you to integrate into your app build.

The following instructions show you how to register a server-side web app to have an Okta-hosted sign-in page. For Admin Console instructions on how to register other supported app types and sign-in methods, see [Create a new Okta app integration](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_App_Integration_Wizard.htm).

#### Start from a sample app

You can review and build Okta's sample applications from GitHub to learn how the various languages or frameworks can be used for Okta authentication.

Find the sample applications that match your app's language or framework:

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

For Okta-hosted sign-in implementations, explore the `okta-hosted-login` folder where several use case examples are provided.

Build the example app as-is, or use it as a template for modifying your own app. When you have an app running, you're ready to connect it to your Okta org.

#### Tell Okta about the app

<StackSelector snippet="register-app" />

<!--- 
#### Get values from Okta to set in the app

In the Admin Console, gather the following information from the **General** tab of your Application:

 - **Client ID**: This is the public identifier for the client, which is required for all OAuth flows.

 - **Client Secret**: This is the secret used by the client to exchange an authorization code for a token. This must be kept confidential.

Remaining in the Admin Console, go to **Security > API** and gather the following value found on the **Authorization Servers** tab:

 - **Issuer URI**: This is the URI of the authorization server that will perform authentication. All Developer Accounts have a "default" authorization server you can use.
 --->

#### Set values in environment variables or configuration file

After registering your app, you now have the specific values for client ID, client secret, and issuer ID required for your app integration. All the various example apps in Okta's GitHub provide ways of setting these values. Some example apps expect you to set environment variables, while others expect you to set parameters in a configuration file. Consult the README file for the example app you're using and set these three values.

<NextSectionLink/>
