---
title: Sign users in to your web app using the redirect model
excerpt: Configure your Okta org and your web app to use Okta's redirect sign-in flow.
layout: Guides
---

Add a user sign-in flow to a server-side web app with Okta's [redirect model](https://developer.okta.com/docs/concepts/redirect-vs-embedded/#redirect-authentication).

---

#### Learning outcomes

* Implement a simple redirect to an Okta-hosted sign-in page.
* Configure a server-side web app to use Okta.
* Test that users can sign in and sign out.
* Define which parts of an app require authentication and which don't.

#### What you need

* An [Okta Developer Edition org](https://developer.okta.com/signup/)
* <StackSnippet snippet="whatyouneed" />

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Overview

The easiest and most secure way to add a user sign-in flow to your server-side web app is to use an Okta-hosted Sign-In Widget. When a user attempts to sign in, the app redirects them to the widget hosted on an Okta web page. After they've signed in successfully, Okta redirects them back to the app. This is known as the [redirect authentication deployment model](/docs/concepts/redirect-vs-embedded/#redirect-authentication).

> **Note**: To use the redirect model in a single-page application (SPA), see [Sign users in to your SPA using the redirect model](/docs/guides/sign-into-spa-redirect/). To use the redirect model in a mobile app, see [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/).

In this quickstart, you:

1. [Create an app integration in the Admin Console](#create-an-app-integration-in-the-admin-console).
1. [Create and configure a new web app to use Okta](#create-and-configure-a-new-web-application-to-use-okta).
1. [Test that a user can sign in and sign out](#test-that-a-user-can-sign-in-and-sign-out).
1. [Configure different levels of access for specific areas of the site](#configure-different-levels-of-access-for-specific-areas-of-the-site).

> **Tip**: You need your Okta org domain to follow this tutorial. It looks like `dev-123456.okta.com`. See [Find your Okta domain](/docs/guides/find-your-domain/). Where you see `${yourOktaDomain}` in this guide, replace it with your Okta domain.

## Create an app integration in the Admin Console

An **app integration** represents your app in your Okta org. Use it to configure how your app connects with Okta services.

To create an app integration for your app:

1. Open the Admin Console for your org.
   1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
   {style="list-style-type:lower-alpha"}
   1. Click **Admin** in the upper-right corner of the page.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Web Application** as the **Application type**, then click **Next**.

   > **Note:** You can break the sign-in or sign-out flows for your app if you choose the wrong app type.

1. Enter an **App integration name**. For example, **My first web application**.
1. Enter the callback URLs for the local development of your app.
   1. Enter <StackSnippet snippet="signinredirecturi" inline /> for **Sign-in redirect URIs**.
   {style="list-style-type:lower-alpha"}
   1. Enter <StackSnippet snippet="signoutredirecturi" inline /> for **Sign-out redirect URIs**.

   > **Note:** The values suggested here are those used in the sample app.

1. Select **Allow everyone in your organization to access** for **Controlled access**.
1. Click **Save** to create the app integration.

The configuration page for the new app integration appears. Keep this page open.

> **Note:** For a complete guide to all the options not explained in this guide, see [Create OIDC app integrations](https://help.okta.com/oie/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_OIDC.htm).

### Note your client ID and client secret

Make a note of two values that you use to configure your web app. Both are in the configuration pane for the app integration that you've created:

* **Client ID**: Found on the **General** tab in the **Client Credentials** section.
* **Client Secret**: Found on the **General** tab in the **Client Credentials** section.

Moving on, where you see `${clientId}` and `${clientSecret}` in this guide, replace them with your client ID and client secret.

## Create and configure a new web app to use Okta

Now that you have created the app integration and noted the configuration settings, complete the following steps:

* [Create a web app](#create-a-web-app).
* [Add the required packages to your app](#add-the-required-packages-to-your-app)
* [Configure your app to use Okta](#configure-your-app-to-use-okta)
* [Add the pages and logic for a user to sign in and sign out](#add-the-pages-and-logic-for-a-user-to-sign-in-and-sign-out)

### Create a web app

<StackSnippet snippet="createproject" />

### Add the required packages to your app

<StackSnippet snippet="addconfigpkg" />

### Configure your app to use Okta

Earlier you [noted the client ID and client secret](#note-your-client-id-and-client-secret) values generated for your app integration. Add these and your Okta domain to your app's configuration.

<StackSnippet snippet="configmid" />

### Add the pages and logic for a user to sign in and sign out

A user can start the sign-in process by:

* Clicking a sign-in link or button
* Trying to access a protected page, such as their profile page.

In both cases, the app redirects the browser to the Okta-hosted sign-in page. See [Redirect to the sign-in page](#redirect-to-the-sign-in-page).

After the user signs in, Okta redirects the browser to the sign-in redirect URI that you entered earlier. Similarly, after a user signs out, Okta redirects the browser to the sign-out redirect URI. Both sign-in and sign-out redirect URIs are called **callback routes**. Users don't see callback routes, and they aren't the user's final destination. However, your app does need to implement them. See [Define a callback route](#define-a-callback-route).

After the user signs in, Okta returns some of their profile information to your app. The default profile items (called **claims**) returned by Okta include the user's email address, name, and preferred username. These are sent in an [ID token](/docs/reference/api/oidc/#id-token-payload) as part of the redirect to the sign-in redirect URL. See [Get the user's information](#get-the-users-information).

#### Redirect to the sign-in page

<StackSnippet snippet="loginredirect" />

> **Note:** To customize the Okta sign-in form, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

#### Define a callback route

<StackSnippet snippet="defineroute" />

#### Get the user's information

<StackSnippet snippet="getuserinfo" />

> **Note:** The claims that you see may differ depending on the scopes requested by your app. See [Configure your app to use Okta](#configure-your-app-to-use-okta) and [Scopes](/docs/reference/api/oidc/#scopes).

## Test that a user can sign in and sign out

Your site now has enough content to sign a user in with Okta, prove they've signed in, and sign them out. Test it by starting your server and signing a user in.

<StackSnippet snippet="testapp" />

## Configure different levels of access for specific areas of the site

Your app can require authentication for the entire site or just for specific routes. Routes that don't require authentication are accessible without signing in, which is also called anonymous access.

### Require authentication for everything

Some apps require user authentication for all routes, for example a company intranet.

<StackSnippet snippet="reqautheverything" />

### Require authentication for a specific route

Your website may have a protected portion that is only available to authenticated users.

<StackSnippet snippet="reqauthspecific" />

### Allow anonymous access

Your website may enable anonymous access for some content but require a user to sign in for other content or to take some other action. For example, an ecommerce site might allow a user to browse anonymously and add items to a cart, but require a user to sign in for checkout and payment.

<StackSnippet snippet="reqauthanon" />

## Next steps

* [Protect your API endpoints](/docs/guides/protect-your-api/).
* [Custom domain and email address](/docs/guides/custom-url-domain/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/).
* [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/)
* [Multi-tenant solutions](/docs/concepts/multi-tenancy/)

<StackSnippet snippet="specificlinks" />
