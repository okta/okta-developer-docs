---
title: Sign users in to your web app using the redirect model
excerpt: Configure your Okta org and your web app to use Okta's redirect sign-in flow.
layout: Guides
---

Add user sign-in to a server-side web application with Okta's [redirect model](https://developer.okta.com/docs/concepts/redirect-vs-embedded/#redirect-authentication).

---

**Learning outcomes**

* Implement a simple redirect to an Okta-hosted sign-in page
* Configure a server-side web application to use Okta
* Test that users can sign in and sign out
* Define which parts of an application require authentication and which do not

**What you need**

* An [Okta developer edition org](https://developer.okta.com/signup/)
* <StackSnippet snippet="whatyouneed" />

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

The easiest and most secure way to add user sign-in to your server-side web application is to use an Okta-hosted Sign-In Widget. When a user attempts to sign in, the application redirects them to the widget hosted on an Okta web page. After they've signed in succesfully, Okta redirects them back to the application. This is known as the [redirect authentication deployment model](/docs/concepts/redirect-vs-embedded/#redirect-authentication).

> **Note**: To use the redirect model in a _single-page application (SPA)_, see [Sign users in to your SPA using the redirect model](/docs/guides/sign-into-spa-redirect/). To use the redirect model in a _mobile app_, see [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/).

In this quickstart, you'll:

1. [Create an app integration in the Admin Console](#create-an-app-integration-in-the-admin-console).
1. [Create and configure a new web application to use Okta](#create-and-configure-a-new-web-application-to-use-okta).
1. [Test that a user can sign in and sign out](#test-that-a-user-can-sign-in-and-sign-out).
1. [Configure different levels of access for specific areas of the site](#configure-different-levels-of-access-for-specific-areas-of-the-site).

> **Tip**: You'll need your Okta org domain to follow this tutorial. It looks like `dev-123456.okta.com`. See [Find your Okta domain](/docs/guides/find-your-domain/). Where you see `${yourOktaDomain}` in this guide, replace it with your Okta domain.

## Create an app integration in the Admin Console

An **app integration** represents your application in your Okta org. Use it to configure how your application connects with Okta services.

To create an app integration for your application:

1. Open the Admin Console for your org.
   1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
   {style="list-style-type:lower-alpha"}
   1. Click the **Admin** button on the top right of the page.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Web Application** as the **Application type**, then click **Next**.

   > **Note:** If you choose an inappropriate application type, it can break the sign-in or sign-out flows by requiring the verification of a client secret, which is something that public clients don't have.

1. Enter an **App integration name**. For example, *My First Web Application*.
1. Enter the callback URLs for the local development of your application.
   1. Enter <StackSnippet snippet="signinredirecturi" inline /> for **Sign-in redirect URIs**.
   {style="list-style-type:lower-alpha"}
   1. Enter <StackSnippet snippet="signoutredirecturi" inline /> for **Sign-out redirect URIs**.

   > **Note:** The values suggested here are those used in the sample app.

1. Select **Allow everyone in your organization to access** for **Controlled access**.
1. Click **Save** to create the app integration.

The configuration pane for the new app integration now opens. Keep this pane open.

> **Note:** For a complete guide to all the options not explained in this guide, see [Create OIDC app integrations](https://help.okta.com/oie/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_OIDC.htm).

### Note your client ID and client secret

Make a note of two values that you'll use to configure your web application. Both are in the configuration pane for the app integration you've just created:

* **Client ID**: Found on the **General** tab in the **Client Credentials** section.
* **Client Secret**: Found on the **General** tab in the **Client Credentials** section.

Moving on, where you see `${clientId}` and `${clientSecret}` in this guide, replace them with your client ID and client secret.

## Create and configure a new web application to use Okta

Now the app integration has been created and configuration settings noted, you'll:

* [Create a new web application](#create-a-new-web-application).
* [Add the required packages to your application](#add-the-required-packages-to-your-application)
* [Configure your application to use Okta](#configure-your-application-to-use-okta)
* [Add the pages and logic for a user to sign in and sign out](#add-the-pages-and-logic-for-a-user-to-sign-in-and-sign-out)

### Create a new web application

<StackSnippet snippet="createproject" />

### Add the required packages to your application

<StackSnippet snippet="addconfigpkg" />

### Configure your application to use Okta

Earlier you [noted the client ID and client secret](#note-your-client-id-and-client-secret) values generated for your app integration. Add these and your Okta domain to your application's configuration.

<StackSnippet snippet="configmid" />

### Add the pages and logic for a user to sign in and sign out

A user can start the sign-in process by either clicking a link or a button or by trying to access a protected page, such as their profile page. In both cases, the application redirects the browser to the Okta-hosted sign-in page. See [Redirect to the sign-in page](#redirect-to-the-sign-in-page).

After the user signs in, Okta redirects the browser back to the sign-in redirect URI you entered earlier. Similarly, after a user signs out, Okta redirects the browser to the sign-out redirect URI. Both sign-in and sign-out redirect URI are also called **callback routes**. A callback route isn't seen by the user, and it's not the user's final destination. However, your application does need to implement the logic for both of them. See [Define a callback route](#define-a-callback-route).

After the user signs in, Okta returns some of their profile information to your app. The default profile items (called **claims**) returned by Okta include the user's email address, name, and preferred username. These are sent in an [ID token](/docs/reference/api/oidc/#id-token-payload) as part of the redirect to the sign-in redirect URL. See [Get the user's information](#get-the-users-information).

#### Redirect to the sign-in page

<StackSnippet snippet="loginredirect" />

> **Note:** To customize the Okta sign-in form, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

#### Define a callback route

<StackSnippet snippet="defineroute" />

#### Get the user's information

<StackSnippet snippet="getuserinfo" />

> **Note:** The claims that you see may differ depending on the scopes requested by your app. See [Configure your application to use Okta](#configure-your-application-to-use-okta) and [Scopes](/docs/reference/api/oidc/#scopes).

## Test that a user can sign in and sign out

Now your site has enough content to sign a user in with Okta, prove they have signed in, and sign them out. Test it out by starting your server and signing a user in.

<StackSnippet snippet="testapp" />

## Configure different levels of access for specific areas of the site

Your application can require authentication for the entire site or just for specific routes. Routes that don't require authentication are accessible without signing in, which is also called anonymous access.

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
