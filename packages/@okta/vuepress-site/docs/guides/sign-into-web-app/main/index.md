---
title: Sign users in to your web application
excerpt: Learn how to add authentication to your web applications and sign users in using Okta's APIs and libraries.
layout: Guides
---

<StackSelector />

This guide explains how to use Okta as the user store for your server-side web application and sign users in to your application.

> **Note**: If you are building a single-page (browser) app, see [Sign users in to your single-page application](/docs/guides/sign-into-spa/) instead. Or, if you are building a server that returns API responses (but not HTML), see [Protect your API endpoints](/docs/guides/protect-your-api/).

---

**Learning outcomes**

* Create an Okta app integration to represent your app in your org.
* Add dependencies and configure your app to use Okta for authentication.
* Sign a user in to your app

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Knowledge of building server-side Web applications
* A project or application to add authentication to.

---

## Create an Okta app integration

Before you begin, you'll need a free Okta developer account. Install the [Okta CLI](https://cli.okta.com/) and run `okta register` to sign up for a new account. If you already have an account, run `okta login`. Then, run `okta apps create web`. Use "Quickstart" when prompted for a name.

Accept the default Redirect URI values provided for you. That is, a Login Redirect of `http://localhost:8080/login/oauth2/code/okta` and a Logout Redirect of `http://localhost:8080`.

<!--
You can also use the Okta Admin Console to create your app

<a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Web Application** as the **Application type** and click **Next**.
    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients aren't designed to have, and would break the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Enter values for the **Sign-in redirect URIs**. This is the callback described in [Understand the callback route](#understand-the-callback-route). Add values for local development (for example, `http://localhost:8080/login/oauth2/code/okta`) and production (for example, `https://app.example.com/login/oauth2/code/okta`).

    If your OpenID Connect client has multiple redirect URIs and you want to use a single redirect URI with a wildcard for the subdomain, select the **Allow wildcard * in sign-in redirect URI** checkbox.

    > **Caution:** The use of wildcard subdomains is discouraged as an insecure practice, since it may allow malicious actors to have tokens or authorization codes sent to unexpected or attacker-controlled pages. Exercise caution if you decide to include a wildcard redirect URI in your configuration.

    See the parameter [Details](/docs/reference/api/apps/#details) section on the Apps API Reference page for configuration guidance on the use of wildcard subdomains.

1. Assign the group that you want (if you set Group Assignments for your app) or leave the **Everyone** default. See the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation for instructions on how to assign the app integration to individual users and groups.
1. Click **Save** to finish creating the Okta app integration.

-->

## Add and configure packages

Next you need to add the Okta Spring Boot Starter to your application.

<StackSelector snippet="addconfigpkg" noSelector />

### Configure the package

<!--
You can find the values that it uses in your Admin Console as well.

* **Client ID** &mdash; find it in the applications list or on the application's **General** tab.
* **Client Secret** &mdash; find it on the application's **General** tab.
* **Okta Domain** &mdash; you can find the Okta Domain in the Admin Console's global header in the upper-right corner of the page. Click the section that displays your email and company name.  A drop-down box appears and displays general org information including the full Okta domain (for example, subdomain.okta.com).

You can use the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server) that's provided in your [Okta Developer Edition](https://developer.okta.com/signup/) org. If you want to use another [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), then you need the following value from the Admin Console:

* **Authorization Server ID** &mdash; find it on the **Security** > **API** > your custom Authorization Server name > **Settings** tab. The Authorization Server ID is the last generated ID string from the **Issuer** property. For example, if the issuer is `https://dev-000000.okta.com/oauth2/auss5kkzkkzYune155e6`, then your Authorization Server ID is `auss5kkzkkzYune155e6`.
-->

<ApiAmProdWarning />

You can configure the properties of your application with configuration files, environment variables, or other framework specific techniques.

<StackSelector snippet="configmid" noSelector />

<!--
## Redirect to the sign-in page

To sign a user in, your application must redirect the browser to the Okta-hosted sign-in page. You can do this when a user visits a protected route or when the user clicks a button to sign in.

<StackSelector snippet="login-redirect" noSelector />

The user is redirected to the hosted sign-in page where they authenticate. After successful authentication, the browser is redirected back to your application along with information about the user.

> **Note:** To customize the hosted sign-in page, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

You can also define protected routes or areas of your application that will always require authentication.

## Require authentication

In many applications, you want to prevent the user from accessing certain routes or sections unless they are signed in. You can require authentication across the entire app or just require it for particular routes or controllers. Any route that doesn't specifically require authentication is accessible without signing in (also called anonymous access).

### Require authentication for a specific route

If you want the user to only have access to a route if they are signed in, require authentication for just those routes.

<StackSelector snippet="reqauthspecific" noSelector />

### Require authentication for everything

For some applications, you may want to require the user to be authenticated for all routes.

<StackSelector snippet="reqautheverything" noSelector />

## Get info about the user

When a user signs in, their profile information (stored in Okta) is made available to your application. It's common to use this info to update your application's UI.

By default, the profile items (called "claims") that Okta returns include the user's email address, name, and preferred username.

<StackSelector snippet="getuserinfo" noSelector />

-->

<!-- You can also customize the items (called claims) that are returned from Okta. See [Token customization guide]. -->

## Sample code

<StackSelector snippet="samplecode" noSelector/>

## Next steps

You should now understand how to sign users in to your web applications using Okta.

Read more:

* [Customize the Okta URL domain](/docs/guides/custom-url-domain/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
* [Protect your API endpoints](/docs/guides/protect-your-api/)
