---
title: Download and set up the SDK, widget, and sample app
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

Once you have
[created and set up your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/),
next step is to download the GitHub repostory containing the SDK, widget, and
accompanying sample apps.

## Software requirements

Before you download the SDK, widget and sample apps, you need the following:

<StackSelector snippet="softwarerequirements" noSelector />

### Download from Github

<StackSelector snippet="githubinstructions" noSelector />

## Configure the SDK, widget and sample app

Before integrating either SDK or widget into your app, you need to understand the
configuration settings that need to be added to initialize the SDK and widget (if you
decide to also use the widget). The list of settings is shown below:

## Configuration settings

### Issuer

For the sample app use the **Issuer URI** from the custom authorization server
named “default”.  To find this value, go to **Security > API** in the Admin
Console. Under the **Authorization servers** tab, the default authorization
server’s Issuer URI is displayed in the list.

An example of the URI is:  `https://dev-foo.okta.com/oauth2/default`.

Note that there are two main types of authorization servers: Org and custom:

* **Org**: If you want to use the Org authorization server use the following
   url: `https://dev-foo.okta.com`.
* **Custom**: There are two types of custom authorization servers:
  * **default**: The default authorization server is predefined and
      was created when you created the org.  An example URI for this type
      is:  `https://dev-foo.okta.com/oauth2/default`.

      > **Note:** If you are just getting started and want to run the sample app,
        use this value.
  * **Create your own**: You can also create your own custom authorization
      server.  An example URI for this type is:
      `https://dev-foo.okta.com/oauth2/${authServerId}`

For more information about the authorization server types available see the
following resources:

* [Authorization Servers](/docs/concepts/auth-servers/#available-authorization-server-types)
* [Difference between Okta as an Authorization Server vs Custom Authorization Server](https://support.okta.com/help/s/article/Difference-Between-Okta-as-An-Authorization-Server-vs-Custom-Authorization-Server?language=en_US)

### Client Id

For the sample app use the **Client id** for the application you created in
[Create your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/).
To find this value, go to **Applications > Applications** in the Admin Console.
Click on your app, and under the **Generals** copy the **Client Id**.

### Client Secret

For the sample app use the **Client Secret** for the application you created in
[Create your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/).
To find this value, go to **Applications > Applications** in the Admin Console.
Click on your app, and under the **Generals** copy the **Client Secret**.

#### Redirect URI

<StackSelector snippet="redirecturi" noSelector />

This is the same value as **Redirect URI** for the application you created in
[Create your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/).
To find this value, go to **Applications > Applications**
in the Admin Console. Click on your app, and under the **Generals** copy
the **Sign-in redirect URI**.

### Scopes

For the sample app use the following scopes: openid profile offline_access.
For more information on available scopes see the
[`OpenID Connect & OAuth 2.0 API`](https://developer.okta.com/docs/reference/api/oidc/#scopes).

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

> **Note:** To avoid confusion of how the configuration values are being
set, it is recommended to only use one configuration option in your solution.

## Project structure

<StackSelector snippet="projectstructure" noSelector />

## Run the sample app

Once you have completed the configurations, the next step is to run the sample app:

* [Run the SDK sample app](/docs/guides/oie-embedded-sdk-run-sample/aspnet/main/)
* [Run the widget sample app](/docs/guides/oie-embedded-widget-run-sample/aspnet/main/)

## Set up the SDK for your own application

Once you have run the sample app and explored it's available use cases, you can begin
to integrate the SDK and/or widget into your own application.  To get started follow
the below steps:

<StackSelector snippet="sdkforyourapp" noSelector />

</div>
