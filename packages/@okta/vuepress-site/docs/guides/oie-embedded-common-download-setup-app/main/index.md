---
title: Download and set up the SDK, Sign-In Widget, and sample app
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

After you [create and set up your Okta org](/docs/guides/oie-embedded-common-org-setup/), the next step is to download the GitHub repository that contains the SDK, Widget, and accompanying sample apps.

## Software requirements

Before you download the SDK, Widget, and sample apps, you need the following:

<StackSelector snippet="softwarerequirements" noSelector />

## Download the repository

<StackSelector snippet="githubinstructions" noSelector />

## Configure the SDK, Sign-In Widget, and sample app

Before you integrate either the SDK or the Widget into your app, you need to understand the configuration settings that are required to initialize the SDK and/or the Sign-In Widget.

### Configuration settings

#### Issuer

If you're getting started with your first app or if you're running an Okta sample app, use the Issuer URI of your default Custom Authorization Server. To find this value:

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, use the **Issuer URI** value from the **default** Custom Authorization Server row (for example, `https://${yourOktaDomain}/oauth2/default`).

There are two main types of authorization servers in Okta: **Org** and **Custom**. See [Authorization Servers](/docs/concepts/auth-servers/#available-authorization-server-types) and [Difference between Okta as an Authorization Server vs Custom Authorization Server](https://support.okta.com/help/s/article/Difference-Between-Okta-as-An-Authorization-Server-vs-Custom-Authorization-Server?language=en_US) for more information on which Authorization Server to use.

If you're using either the Org or the Custom Authorization Servers, ensure your Issuer URI is in the following format:

* **Org**: If you want to use the Org Authorization Server, use the following URI format: `https://${yourOktaDomain}` (for example, `https://dev-example.okta.com`).
* **Custom**: You can either use the default Custom Authorization Server or create your own.
  * default Custom Authorization Server's URI format: `https://${yourOktaDomain}/oauth2/default`

  * your own Custom Authorization Server's URI format: `https://${yourOktaDomain}/oauth2/${authServerId}`

#### Client ID

For the sample app, use the **Client ID** for the application that you created in [Create a new application](/docs/guides/oie-embedded-common-org-setup/-/main/#create-a-new-application). To find this value, go to **Applications** > **Applications** in the Admin Console. Select your app, and then on the **General** tab copy the **Client ID**.

<StackSelector snippet="clientsecret" noSelector />

#### Redirect URI

<StackSelector snippet="redirecturi" noSelector /><br>

This is the same value as the **Redirect URI** for the application that you created in [Create a new application](/docs/guides/oie-embedded-common-org-setup/-/main/#create-a-new-application). To find this value, go to **Applications** > **Applications** in the Admin Console. Select your app, and then on the **General** tab copy the **Sign-in redirect URI**.

#### Scopes

The sample app uses the default scopes provided in the SDK, which include `openid`, `profile`, and others. See [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/#scopes) for more information on OIDC scopes associated with access tokens.

## Set the configuration values

<StackSelector snippet="configlocations" noSelector />

<StackSelector snippet="configorder" noSelector />

## Run the sample app

After you complete the configurations, run the sample app:

* [Run the SDK sample app](/docs/guides/oie-embedded-common-run-samples/-/main/#run-the-sdk-sample-app)
* [Run the Widget sample app](/docs/guides/oie-embedded-common-run-samples/-/main/#run-the-widget-sample-app)

## Set up the SDK for your own app

<StackSelector snippet="sdkforyourapp" noSelector />

</div>
