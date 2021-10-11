---
title: Download and set up the SDK, Sign-In Widget, and sample app
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

This guide covers the next step after you [create and set up your Okta org](/docs/guides/oie-embedded-common-org-setup/aspnet/main/), which is to download the GitHub repository that contains the SDK, Widget, and accompanying sample apps.

 Nutrition Facts                                                                          |                                                                                      |
| --------------------------------------------------------------------------------  | -------------------------------------------------------------------------               |
| Learning outcomes                     | <ul><li>Configure the settings that you need to add to initialize the SDK and the Sign-In Widget.</li><li>Integrate the SDK and the Sign-In Widget into your own app after you run the sample app.</li></ul>                                                      |
| What you need | See [Software Requirements](/docs/guides/oie-embedded-common-download-setup-app/android/main/#software-requirements).                                                     |
| Sample code                                                        | <ul><li>Android: [okta-idx-android](https://github.com/okta/okta-idx-android)</li><li>ASP.NET: [okta-idx-dotnet](https://github.com/okta/okta-idx-dotnet)</li><li>Go: [okta-idx-golang](https://github.com/okta/okta-idx-golang)</li><li>iOS: [okta-idx-swift](https://github.com/okta/okta-idx-swift)</li><li>Java: [okta-idx-java](https://github.com/okta/okta-idx-java)</li><li>Node.js: [okta-auth-js](https://github.com/okta/okta-auth-js)</li></ul>                                                      |

## Software requirements

Before you download the SDK, Widget, and sample apps, you need the following:

<StackSelector snippet="softwarerequirements" noSelector />

## Download the repository

<StackSelector snippet="githubinstructions" noSelector />

## Configure the SDK, Sign-In Widget, and sample app

Before you integrate either the SDK or the Widget into your app, you need to understand the configuration settings that are required to initialize the SDK and/or the Sign-In Widget.

### Configuration settings

#### Issuer

There are two main types of authorization servers in Okta: [Org](/docs/concepts/auth-servers/#org-authorization-server) and [Custom](/docs/concepts/auth-servers/#custom-authorization-server). See [Authorization Servers](/docs/concepts/auth-servers/#available-authorization-server-types) and [Difference between Okta as an Authorization Server vs Custom Authorization Server](https://support.okta.com/help/s/article/Difference-Between-Okta-as-An-Authorization-Server-vs-Custom-Authorization-Server?language=en_US) for more information on which Authorization Server to use.

The Issuer URI format depends on which authorization server that you decide to use:

* Org &mdash; If you use the Org Authorization Server, the Issuer URI format is `https://${yourOktaDomain}` (for example, `https://dev-example.okta.com`).
* Custom &mdash; You can either use the default Custom Authorization Server or create your own.
  * If you use the default Custom Authorization Server, the Issuer URI format is `https://${yourOktaDomain}/oauth2/default`.
  * If you use your own Custom Authorization Server, the Issuer URI format is `https://${yourOktaDomain}/oauth2/${authServerId}`, where `${authServerId}` is your Custom Authorization Server's unique ID.

If you're getting started with your first app or if you're running an Okta sample app, use the Issuer URI of your default Custom Authorization Server. To find this value:

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, use the **Issuer URI** value from the **default** Custom Authorization Server row (for example, `https://${yourOktaDomain}/oauth2/default`).

#### Client ID

For the sample app, use the client ID for the application that you created in [Create a new application](/docs/guides/oie-embedded-common-org-setup/-/main/#create-a-new-application). To find this value, go to **Applications** > **Applications** in the Admin Console. Select your app, and then on the **General** tab, copy the **Client ID**.

<StackSelector snippet="clientsecret" noSelector />

#### Redirect URI

This is the same value as the **Redirect URI** for the application that you created in [Create a new application](/docs/guides/oie-embedded-common-org-setup/-/main/#create-a-new-application). To find this value, go to **Applications** > **Applications** in the Admin Console. Select your app, and then on the **General** tab copy the **Sign-in redirect URI**.

<StackSelector snippet="redirecturi" noSelector /><br>

#### Scopes

The sample app uses the default scopes provided in the SDK, which include `openid`, `profile`, and others. See [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/#scopes) for more information on OIDC scopes associated with access tokens.

## Set the configuration values

<StackSelector snippet="configlocations" noSelector />

<StackSelector snippet="configorder" noSelector />

## Set up the SDK for your own app

<StackSelector snippet="sdkforyourapp" noSelector />

## Set up the Sign-In Widget and SDK for your own app

<StackSelector snippet="widgetforyourapp" noSelector />

</div>
