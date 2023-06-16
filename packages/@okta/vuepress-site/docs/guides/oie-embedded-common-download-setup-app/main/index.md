---
title: Download and set up the SDK, Sign-In Widget, and sample apps
---

<ApiLifecycle access="ie" />

This guide shows you how to download and configure the Identity Engine SDKs, Sign-In Widget, and accompanying sample apps after you [create and set up your Okta org](/docs/guides/oie-embedded-common-org-setup).

---

**Learning outcomes**

* Download the SDK, Sign-In Widget, sample apps, and prerequisites required for your language.
* Configure the settings that you require for the SDK and the Sign-In Widget.

**What you need**

* [Okta Developer Edition organization](/signup)
* <StackSnippet snippet="samplecode" inline />
* [Software requirements](#software-requirements)
---

## Software requirements

Before you download the SDK, Widget, and sample apps, you need the following:

<StackSnippet snippet="softwarerequirements" />

## Download the repository

<StackSnippet snippet="githubinstructions" />

## Configure the SDK, Sign-In Widget, and sample app

Before you integrate either the SDK or the Widget into your app, you need to understand the configuration settings that are required to initialize the SDK and/or the Sign-In Widget.

### Configuration settings

#### Issuer

There are two main types of authorization servers in Okta: [Org](/docs/concepts/auth-servers/#org-authorization-server) and [Custom](/docs/concepts/auth-servers/#custom-authorization-server). To understand which type to use, see [Authorization servers](/docs/concepts/auth-servers/#available-authorization-server-types).

<ApiAmProdWarning />

The Issuer URI format depends on which authorization server that you decide to use:

* Org &mdash; If you use the org authorization server, the Issuer URI format is `https://${yourOktaDomain}` (for example, `https://dev-example.okta.com`).
* Custom &mdash; You can either use the default custom authorization server or create your own.
  * If you use the default custom authorization server, the Issuer URI format is `https://${yourOktaDomain}/oauth2/default`.
  * If you use your own custom authorization server, the Issuer URI format is `https://${yourOktaDomain}/oauth2/${authServerId}`, where `${authServerId}` is your custom authorization server's unique ID.

If you're getting started with your first app or if you're running an Okta sample app, use the Issuer URI of your default custom authorization server. To find this value:

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, use the **Issuer URI** value from the **default** custom authorization server row (for example, `https://${yourOktaDomain}/oauth2/default`).

#### Client ID

For the sample app, use the client ID for the application that you created in [Create a new application](/docs/guides/oie-embedded-common-org-setup/-/main/#create-a-new-application). To find this value, go to **Applications** > **Applications** in the Admin Console. Select your app, and then on the **General** tab, copy the **Client ID**.

<StackSnippet snippet="clientsecret" />

#### Redirect URI

This is the same value as the **Redirect URI** for the application that you created in [Create a new application](/docs/guides/oie-embedded-common-org-setup/-/main/#create-a-new-application). To find this value, go to **Applications** > **Applications** in the Admin Console. Select your app, and then on the **General** tab copy the **Sign-in redirect URI**.

<StackSnippet snippet="redirecturi" />

#### Scopes

The sample app uses the default scopes provided in the SDK, which include `openid`, `profile`, and others. See [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/#scopes) for more information on OIDC scopes associated with access tokens.

## Set the configuration values

<StackSnippet snippet="configlocations" />

<StackSnippet snippet="configorder" />

## Set up the SDK for your own app

<StackSnippet snippet="sdkforyourapp" />

## Set up the Sign-In Widget and SDK for your own app

<StackSnippet snippet="widgetforyourapp" />
