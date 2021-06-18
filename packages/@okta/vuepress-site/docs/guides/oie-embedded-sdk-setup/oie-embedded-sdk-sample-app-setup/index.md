---
title: Download and setup the SDK and sample app
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

Once the org is configured the next step is to download and configure the SDK and sample app.

## Software requirements

Before you download the SDK and sample app, you need the following:

<StackSelector snippet="softwarerequirements" noSelector />

### Download from Github

<StackSelector snippet="githubinstructions" noSelector />

## Configure the SDK and sample app

Before integrating the SDK into your app, you need to initialize the SDK with
configuration settings. The list of settings is shown below:

### Issuer

For the sample app use the **Issuer URI** from the custom authorization server
named “default”.  To find this value, go to **Security > API** in the Admin
console. Under the **Authorization servers** tab, the default authorization
server’s Issuer URI is displayed in the list.

An example of the URI is:  `https://dev-foo.okta.com/oauth2/default`.

Note that there are two main types of authorization servers: Org and custom:

1. **Org**: If you want to use the Org authorization server use the following
   url: `https://dev-foo.okta.com`.
1. **Custom**: There are two types of custom authorization servers:
   1. **default**: The default authorization server is predefined and
      was created when you created the org.  An example URI for this type
      is:  `https://dev-foo.okta.com/oauth2/default`. **If you are just getting
      started and want to run the sample app, use this value**
   1. **Create your own**: You can also create your own custom authorization
      server.  An example URI for this type is:
      `https://dev-foo.okta.com/oauth2/${authServerId}`

For more information about the authorization server types available see the
following resources:

* [Authorization Servers](/docs/concepts/auth-servers/#available-authorization-server-types)
* [Difference between Okta as an Authorization Server vs Custom Authorization Server](https://support.okta.com/help/s/article/Difference-Between-Okta-as-An-Authorization-Server-vs-Custom-Authorization-Server?language=en_US)

### Client Id

For the sample app use the **Client id** for the application you created in
[Create your Okta org](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/).
To find this value, go to **Applications > Applications** in the Admin console.
Click on your app, and under the **Generals** copy the **Client Id**.

### Client Secret

For the sample app use the **Client Secret** for the application you created in
[Create your Okta org](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/).
To find this value, go to **Applications > Applications** in the Admin console.
Click on your app, and under the **Generals** copy the **Client Secret**.

#### Redirect URI

<StackSelector snippet="redirecturi" noSelector />

This is the same value as **Redirect URI** for the application you created in
[Create your Okta org](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/).
To find this value, go to **Applications > Applications**
in the Admin console. Click on your app, and under the **Generals** copy
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

1. SDK Client constructor
1. Environment variables
1. Configuration

For example, values set in the SDK Client constructor override the
environment variables and configuration file settings. Subsequently,
the environment variables take precedence over the configuration file.

> **Note:** To avoid confusion of how the configuration values are being
set, it is recommended to only use one configuration option in your solution.

## Project structure

<StackSelector snippet="projectstructure" noSelector />

## Test the sample app

<StackSelector snippet="testapp" noSelector />

## Set up the SDK for your own application

<StackSelector snippet="sdkforyourapp" noSelector />

## Now your ready to start working with the use cases!

Now that you have
[created and configured your Okta org](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/)
and
[setup the SDK and sample](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-sample-app-setup/),
the next step is to start working with the available use cases.
See [Start with a use case overview](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-overview/)
for further details.

</div>
