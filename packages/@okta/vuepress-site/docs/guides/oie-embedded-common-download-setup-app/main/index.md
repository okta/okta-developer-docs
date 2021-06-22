---
title: Download and set up the SDK, Sign-In Widget, and sample app
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

After you [create and set up your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/),
the next step is to download the GitHub repository that contains the SDK, Widget, and
accompanying sample apps.

## Software requirements

Before you download the SDK, Widget and sample apps, you need the following:

<StackSelector snippet="softwarerequirements" noSelector />

### Download from Github

<StackSelector snippet="githubinstructions" noSelector />

## Configure the SDK, Sign-In Widget, and sample app

Before you integrate either the SDK or the Widget into your app, you need to understand the
configuration settings that you need to add to initialize the SDK and the Widget (if you
decide to also use the Sign-In Widget).

## Configuration settings

### Issuer

Use the Issuer URI named "default" from your Custom Authorization Server.
To find this value, go to **Security** > **API** in the Admin
Console. On the **Authorization Servers** tab, the "default" Custom Authorization
Server's Issuer URI appears in the list.

Example URI: `https://dev-foo.okta.com/oauth2/default`

There are two main types of authorization servers: **Org** and **Custom**:

* **Org**: If you want to use the Org Authorization Server, use the following
   URL: `https://dev-example.okta.com`
* **Custom**: You can either use the **default** Custom Authorization Server or create
  your own.
  * **default**: The **default** Custom Authorization Server is predefined and
      was created when you created the org.<br> **Example URI**: `https://dev-foo.okta.com/oauth2/default`

      > **Note:** If you are just getting started and want to run the sample app,
        use the **default** Custom Authorization Server URI.
  * **Create your own**: You can also create your own custom authorization
      server.<br> **Example URI**: `https://dev-foo.okta.com/oauth2/${authServerId}`

For more information about the authorization server types available:

* [Authorization Servers](/docs/concepts/auth-servers/#available-authorization-server-types)
* [Difference between Okta as an Authorization Server vs Custom Authorization Server](https://support.okta.com/help/s/article/Difference-Between-Okta-as-An-Authorization-Server-vs-Custom-Authorization-Server?language=en_US)

### Client ID

For the sample app, use the **Client ID** for the application that you created in
[Create your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/).
To find this value, go to **Applications** > **Applications** in the Admin Console.
Select your app, and then on the **General** tab copy the **Client ID**.

### Client secret

For the sample app, use the **Client secret** for the application that you created in
[Create your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/).
To find this value, go to **Applications** > **Applications** in the Admin Console.
Select your app, and then on the **General** tab copy the **Client secret**.

#### Redirect URI

<StackSelector snippet="redirecturi" noSelector /><br>

This is the same value as the **Redirect URI** for the application that you created in [Create your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/). To find this value, go to **Applications** > **Applications** in the Admin Console. Select your app, and then on the **General** tab copy
the **Sign-in redirect URI**.

### Scopes

For the sample app, use the following scopes: `openid`, `profile`, `offline_access`. See [`OpenID Connect & OAuth 2.0 API`](https://developer.okta.com/docs/reference/api/oidc/#scopes) for more information.

## Where to place the configurations

<StackSelector snippet="configlocations" noSelector />

## Order of configuration options

When multiple çonfigurations options are used simultaneously, the SDK chooses
the option based on the following order:

* SDK Client constructor
* Environment variables
* Configuration

For example, values set in the SDK Client constructor override the
environment variables and configuration file settings. Subsequently,
the environment variables take precedence over the configuration file.

> **Note:** To avoid confusion on how the configuration values are being
set, we recommend that you only use one configuration option in your solution.

## Project structure

<StackSelector snippet="projectstructure" noSelector />

## Run the sample app

After you complete the configurations, run the sample app:

* [Run the SDK sample app](/docs/guides/oie-embedded-sdk-run-sample/aspnet/main/)
* [Run the Widget sample app](/docs/guides/oie-embedded-widget-run-sample/aspnet/main/)

## Set up the SDK for your own app

After you have run the sample app and explored its available use cases, you can begin
to integrate the SDK and/or Widget into your own app. To get started follow
these steps:

<StackSelector snippet="sdkforyourapp" noSelector />

</div>
