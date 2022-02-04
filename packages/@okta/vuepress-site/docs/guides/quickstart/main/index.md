---
title: QuickStart - Signing in your first user
excerpt: Get started with Okta authentication
---

This guide explains how to get you up and running with basic Okta authentication, quickly and effectively. This includes how to create and manage Okta orgs, register a new app, authenticate the app by using Okta, and the subsequent steps from there.

---

**Learning outcomes**

* Learn what Okta organizations are, and how to create and manage your own org.
* Register a sample app with your org.
* Authenticate the app using Okta.

**Sample code**

[Sample app](#start-from-a-sample-app).

---

## Create your Okta organization

You built an awesome app, and you want to add user authentication to it. Let's get you set up and working with Okta.

To start, you're going to need an org. An org is a private data space &mdash; provided by Okta &mdash; that holds all the resources that you create to handle user authentication. See [Okta organizations](/docs/concepts/okta-organizations).

You can [sign up](/signup) for an Okta developer edition org for free, which allows for up to 100 monthly active users (MAU). Later, when you need more capacity, you can upgrade to a paid org.

### Create your org

<StackSelector snippet="create-org" noSelector />

### After creating your org

Your org is now created and usable. There's a survey you're prompted to fill out about your role, aims, and software stack, which can help us support you.

A wizard launches to help you through basic setup for a few commons scenarios. You can choose to exit the wizard by clicking **Dashboard**. (In the next sections of this QuickStart, we won't use the wizard, but rather the regular Dashboard menus that can be used on an ongoing basis.)

You now have an org. You can create additional orgs at any time, and it's often useful to do so to support separate development environments.

## Using the Admin Console

The Admin Console is the web UI that provides you with a window into your org and lets you configure and manage it. The URL to access your Admin Console consists of your Okta domain plus `-admin`, for example, `https://dev-133337-admin.okta.com`.

### Dashboard

After signing in to Admin Console, you see the Dashboard, which is a landing page that provides a summary of activity in your org.

You won't yet have much to see if you just created your org, but the Dashboard shows various statistics grouped into several different widgets. These widgets include:

- **Overview:** Shows totals and other statistics for your org's users, groups, and apps.
- **Status:** Lists the operation status of the Okta service and any running agents.
- **Tasks:** Lists issues in your org that require attention. You can filter by active (default) or unsubscribed tasks.
- **Org changes:** Displays system logs showing all the org changes in the last seven days.
- **Security Monitoring:** Displays security-related information such as recommended security tasks and suspicious user activity.

A search bar at the top of the Dashboard lets you quickly bring up information on a specific user or app.

### System Log

Some of the statistics on the Dashboard are derived from the org's system logs. You can access the System Log page either by clicking the  **View all** link in the **Org Changes** widget or the suspicious activity **View** link in the **Security Monitoring** widget. You can also access the System Log by going to **Reports** > **System Log**. The System Log records actions taken by you and any other admins, as well as ongoing events that occur for each user, such as user creation and authentication attempts. You can click each event to expand it and get full details.

In the global header in the upper-right corner of the page, you can view the Okta domain of the org that you're in. This can be handy if you manage multiple orgs.

The footer of the dashboard displays the version of the Okta system that you're currently running, for example: "Version: 2020.06.4". It also displays the Okta cell your org is running in, for example: "OK11 Cell (US)".

### Side navigation

The side navigation takes you from the Dashboard to the management pages for various aspects of your org's functionality:

| Menu          | What can you do there?                                                                             |
|---------------|----------------------------------------------------------------------------------------------------|
| Dashboard     | View your notifications, tasks, and get started guides for newbies.                                |
| Directory     | Manage your Okta org's people, groups, and related attributes.                                    |
| Applications  | Configure the connection between your Okta org and the apps that you want to handle authentication for. |
| Security      | Manage the security aspects of your Okta org.                                                      |
| Workflow      | Augment Okta process flows with your own additions.                                                |
| Reports       | View your Okta org's reports and system logs.                                                      |
| Settings      | Configure org-wide settings.                                                                       |

## Add a user using the Admin Console

Any authentication system needs to have a way of keeping track of the end users who are allowed to authenticate.

When you use Okta for authentication, you don't need to implement your own user management solution. You can create and delete users, configure their authentication flows, and reset their passwords all from the Admin Console. User profiles are stored securely for you in the Okta cloud.

To create a new user:

1. In the Admin Console, go to **Directory** > **People**.
1. Click **Add Person**.
1. Fill in the first name, last name, username (must be an email address), and primary emails, for example:
    - **First name:** Joe
    - **Last name:** Smith
    - **Username:** joe.smith@example.com
    - **Primary email:** joe.smith@example.com

    > **Note:** To try out end-user flows, you need to have access to the email address that you set for the end user.

1. For password, select **Set by user**.
1. Click **Save**.

In addition to manually creating a user in the Admin Console, you can also create users through the API, and there are multiple ways of doing batch imports of users from existing user stores.

## Register your app

You can use either the Okta CLI or the Admin Console to register your app to your Okta org for user authentication. After your app is registered, your Okta org generates the issuer ID, client ID, and client secret for you to integrate into your app build.

The following instructions show you how to register a server-side web app to have an Okta-hosted sign-in page. For Admin Console instructions on how to register other supported app types and sign-in methods, see [Create a new Okta app integration](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard).

### Start from a sample app

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

### Tell Okta about the app

<StackSelector snippet="register-app" noSelector />

<!---
#### Get values from Okta to set in the app

In the Admin Console, gather the following information from the **General** tab of your Application:

 - **Client ID**: This is the public identifier for the client, which is required for all OAuth flows.

 - **Client Secret**: This is the secret used by the client to exchange an authorization code for a token. This must be kept confidential.

Remaining in the Admin Console, go to **Security** > **API** and gather the following value found on the **Authorization Servers** tab:

 - **Issuer URI**: This is the URI of the authorization server that will perform authentication. All Developer Accounts have a "default" authorization server you can use.
 --->

### Set values in environment variables or configuration file

After registering your app, you now have the specific values for client ID, client secret, and issuer ID required for your app integration. All the various example apps in Okta's GitHub provide ways of setting these values. Some example apps expect you to set environment variables, while others expect you to set parameters in a configuration file. Consult the README file for the example app that you're using and set these three values.

## Try signing in

With the app now configured, you're ready to try signing in as an end user and see how the functionality comes together:

1. Follow the directions in the README to start the app.

2. The example apps are served by default at `localhost`. Point your browser at the URL of the app. Consult the README for default port number.

3. You should see a sign-in page. Try signing in as the end user that you created earlier.

4. If sign-in is successful, the example app confirms that.

To see the Admin view of the process that just occurred, you can open the Admin Console in another browser window and sign in with your original Admin account. The Dashboard displays the number of users that are signed-in, and the System Log records the sign-in event.

## Next steps

You've seen how Okta handles sign-in for your app and how you can use the Admin Console to manage users. Okta offers much more, including a large set of APIs that your software can interact with, either directly, through REST calls, or by means of SDKs that support various coding languages.

### Get an API token

To secure access to API endpoints, Okta requires an API token consisting of a secret value to be included in the header of each request.

To obtain an API token, use the Admin Console:

1. Select **API** from the **Security** menu.

1. Click the **Tokens** tab.

1. Click **Create Token**.

1. Name your token and click **Create Token**.

1. Record the token value. This is the only opportunity to see it and record it.

For full details on API tokens, see [Create an API token](/docs/guides/create-an-api-token/).

### Create a user by API

To create an additional end user in your org, you can make a REST API call to the `/users` endpoint.

The full URL of the endpoint needs to begin with your Okta domain. That should be followed by the specific path for this endpoint, which is `/api/v1/users`. For example: `https://dev-133337.okta.com/api/v1/users`.

To create a new user, you make a `POST` call to that endpoint, supplying information about the new user in a JSON object in the request body.

You need to include your API token in the `Authorization` header of the request.

Here's how you would do it using curl from the command line:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS 00QCjAl4MlV-WPXM...0HmjFx-vbGua" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  }
}' "https://dev-33337.okta.com/api/v1/users?activate=false"
```

In the above example, you need to replace the Okta domain in the URL with your own Okta domain. You also need to replace the API token in the `Authorization` header with the API token that you create. Note that the value of the API token needs to be prefaced with `SSWS` followed by a space.

For full details of the `/users` API and everything it can do, see the [Users](/docs/reference/api/users/) API reference page.

For information on using Postman to explore Okta APIs, see [Use Postman with the Okta REST APIs](/code/rest/).

### Create a user by SDK

Instead of making REST API calls directly, you can use one of the Okta SDKs provided for specific languages and frameworks.

For example, to create a user with the Java SDK, you could use the following code:

```java
User user = UserBuilder.instance()
    .setEmail("joe.coder@example.com")
    .setFirstName("Joe")
    .setLastName("Code")
    .buildAndCreate(client);
```

The Java SDK and its documentation are available at its [GitHub Repository](https://github.com/okta/okta-sdk-java).

See [Languages & SDKs](/code/) for information on getting started with a variety of Okta SDKs.
