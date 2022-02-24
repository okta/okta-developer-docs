---
title: Sign users in to your single-page application
excerpt: Learn how to sign users in to your JavaScript front-end applications and require authentication using Okta's APIs and libraries.
layout: Guides
---

This guide explains how to use Okta as the user store for your single-page application and sign users in.

> **Note**: If you are building a web application rendered by a server, read [Sign users in to your web application](/docs/guides/sign-into-web-app/) instead.

---

**Learning outcomes**

* Set up an Okta app integration to represent your SPA inside your Okta org.
* Add dependencies to your app and add authentication functionality to it.
* Sign a user in to your application.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Basic knowledge of building JavaScript applications
* A project or application to add authentication to

**Sample code**

<StackSelector snippet="samplecode" noSelector/>

---

## Refresh tokens and SPAs

Using long-lived refresh tokens with SPAs has long been considered insecure because there is no way to safely store a persistent refresh token in a browser and assure access by only the intended app. This makes the SPA susceptible to token theft. Additionally, it is usually undesirable to redirect the user to a sign-in page during normal navigation. To avoid this disruptive redirection, the `/authorize` endpoint allows the use of a request parameter called `prompt`. If the value of the `prompt` parameter is `none`, this guarantees that the user won't be prompted to sign in, regardless of whether they have an active session. Instead, your application either silently obtains the requested tokens or an OAuth error response occurs. Until now, the `prompt` parameter was the only way for a SPA to maintain user sessions without prompting the user to sign in multiple times.

The introduction of browser privacy controls such as Intelligent Tracking Prevention (ITP) and Enhanced Tracking Prevention (ETP) affect how browsers handle third-party cookies. These browser privacy controls prevent the use of an Okta session cookie to silently renew user sessions, which forces the user to reauthenticate and takes away the seamless user experience. [Refresh token rotation](/docs/guides/refresh-tokens/main/#refresh-token-rotation) provides a solution for SPAs to maintain user sessions in an ITP browser world. Since refresh tokens are independent of any cookies, you don't have to rely on an Okta session cookie to renew access and ID tokens.

> **Note:** You can still use the Okta session cookie and silently renew the tokens as long as the application and Okta are in the same domain.

See the [OAuth 2.0 for Browser-Based Apps specification](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-05#page-10) for the latest spec information on using refresh tokens with browser-based apps.

## Define a callback route

To sign users in, your application redirects the browser to an Okta-hosted sign-in page. Okta then redirects back to your application with information about the user. You can learn more about how this works on [Okta-hosted flows](/docs/concepts/okta-hosted-flows/).

The first thing that you need to define is how Okta calls your app after a user is authenticated. This is called a callback route or redirect URI.

The callback route isn't seen by the user, and it's not the user's final destination. It's just one step in the authentication redirect flow.

<StackSelector snippet="define-route" noSelector/>

> **Note:** It's important that the full URL of your callback route represents a real URL (in other words, it should serve your single-page app even after a "hard" browser reload). Most router components do this by default.

## Create an Okta app integration

Before you can sign a user in, you need to create an Okta app integration that represents your single-page application.

1. Sign in to your Okta organization with your administrator account.

    <a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** as the **Application type** and click **Next**.
    > **Note:** It's important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients aren't designed to have, and would break the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Select **Authorization Code** and **Refresh Token** as the **Grant type**. This enables Authorization Code flow with PKCE for your application and the ability to refresh the access token when it expires without prompting the user to re-authenticate.
1. Enter values for the **Sign-in redirect URIs**. This is the callback from [Define a callback route](#define-a-callback-route). Add values for local development (for example, `http://localhost:8080/login/callback` or `http://localhost:8080/authentication/login-callback` for Blazor) and production (for example, `https://app.example.com/login/callback`).

    If your OpenID Connect client has multiple redirect URIs, and you want to use a single redirect URI with a wildcard for the subdomain, select the **Allow wildcard * in sign-in redirect URI** checkbox.

    > **Caution:** The use of wildcard subdomains is discouraged as an insecure practice, since it may allow malicious actors to have tokens or authorization codes sent to unexpected or attacker-controlled pages. Exercise caution if you decide to include a wildcard redirect URI in your configuration.

    See the parameter [Details](/docs/reference/api/apps/#details) section on the Apps API Reference page for configuration guidance on the use of wildcard subdomains.

1. In the **Trusted Origins** section, add the **Base URI** of your application during local development, such as `http://localhost:8080`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`. These URIs are added as trusted origins in your Okta org and can be managed by navigating to **Security** > **API** and selecting the **Trusted Origins** tab. See [Enable Trusted Origins](#enable-trusted-origins).

1. In the **Assignments** section, select **Allow everyone in your organization to access** for everyone to access your app, or **Limit access to selected groups** and specify the groups that can access your app.
1. Click **Save** to finish creating the Okta app integration.
1. On the **General** tab, scroll to **General Settings** and click **Edit**.
1. If **Refresh Token** is selected as a **Grant type**, the **Refresh Token** section appears. [Refresh token rotation](/docs/guides/refresh-tokens/main/#refresh-token-rotation) is automatically set as the default refresh token behavior.
    > **Note:** The default number of seconds for the **Grace period for token rotation** is set to 30 seconds. You can [change the value](/docs/guides/refresh-tokens/main/#enable-refresh-token-rotation) to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token. Using a value of 0 indicates that there is no grace period.
1. In the **LOGIN** section, specify an **Initiate login URI** to have Okta initiate the sign-in flow. When Okta redirects to this URI (for example, `https://example:0000.com/login`), the client is triggered to send an authorize request. This URI is also used when users reset their passwords while signing in to the app. Okta redirects the user back to this URI after the password is reset so that the user can continue to sign in.
1. Click **Save** to update the Okta app settings.

## Enable Trusted Origins

To reduce possible attack vectors, you need to explicitly define the Trusted Origins that can access the Okta API for your app integration. Cross-Origin Resource Sharing (CORS) allows JavaScript hosted on your website to make a request using `XMLHttpRequest` to the Okta API with the Okta session cookie. For instructions on setting trusted origins, see [Grant cross-origin access to websites](/docs/guides/enable-cors/main/#grant-cross-origin-access-to-websites).

>**Note:** You should only grant access to specific origins (websites) that you control and trust to access the Okta API.

## Install the SDK

All Okta JavaScript SDKs are hosted on [npmjs.com](https://www.npmjs.com). These instructions show you how to install the SDK with npm.

Install the SDK and add it as a dependency to your project:

<StackSelector snippet="installsdk" noSelector />

## Configure the SDK

You need two values from the Okta application and the Admin Console that you worked with in [Create an Okta application](#create-an-okta-app-integration):

* **Client ID** &mdash; find it in the applications list or on the application's **General** tab.
* **Okta domain** &mdash; find the Okta Domain in the Admin Console's global header in the upper-right corner of the page. Click the section that displays your email and company name. A drop-down box appears and displays general org information including the full Okta domain (for example, `subdomain.okta.com`).

<StackSelector snippet="config" noSelector />

## Add a button to sign in

In your application, you want to provide a button to sign the user in. When the user clicks this button, they are redirected to the Okta-hosted sign-in page so they can authenticate.

> **Note:** To customize this sign-in page, see the [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

<StackSelector snippet="login-redirect" noSelector />

## Handle the callback from Okta

After Okta authenticates a user, they're redirected back to your application via the callback route that you [define](#define-a-callback-route). When Okta redirects back, the URL fragment (the portion after `#`) contains either tokens for the user or an error if something went wrong.

Your application must parse this information, and if tokens are present, store the user's tokens. The SDK does this for you.

<StackSelector snippet="handle-callback" noSelector />

## Require authentication

In many applications, you want to prevent the user from accessing certain routes or sections unless they are signed in. You can require authentication across the entire app or just require it for particular routes or controllers. Any route that doesn't specifically require authentication is accessible without signing in (also called anonymous access).

It's important to note that protecting routes in your SPA doesn't truly prevent the user from accessing those parts of your application. After all, it's JavaScript running in the browser, and anyone could open the browser's developer tools and change things! Protecting routes provides a consistent and good experience for your users. The real security enforcement must be done in the API that your single-page app calls (see [Use the access token](#use-the-access-token)). Also, see the [Protect your API endpoints guide](/docs/guides/protect-your-api/).

### Require authentication for a specific route

If you want the user to only have access to a route if they are signed in, require authentication for just those routes.

<StackSelector snippet="reqauthspecific" noSelector />

### Require authentication for everything

For some applications, you may want to require the user to be authenticated for all routes.

<StackSelector snippet="reqautheverything" noSelector />

## Get info about the user

When a user signs in, their profile information (stored in Okta) is made available to your application. It's common to use this info to update your app's UI.

By default, the profile items (called "claims") that Okta returns include the user's email address, first name, and last name. 

<StackSelector snippet="getuserinfo" noSelector />

You can also customize the items (called claims) that are returned from Okta. See [Customize tokens returned from Okta with custom claims](/docs/guides/customize-tokens-returned-from-okta/main/).

## Use the access token

SPAs need to send requests to one or more APIs to perform actions and retrieve information.

After a user signs in, your application stores an access token issued by Okta. By attaching this token to outgoing requests, your APIs can authenticate them (ensure that the user is signed in to perform an action) and authorize them (ensure that the user is allowed to do an action).

On your front-end (this SPA), make sure that you place the access token in the HTTP `Authorization` header of outgoing requests using this format:

```
Authorization: Bearer ${token}
```

On your back-end (the API), make sure that you check for valid tokens in incoming requests. See [Protect your API endpoints](/docs/guides/protect-your-api/).

<StackSelector snippet="getaccesstoken" noSelector />

To enable access token renewal you must obtain a refresh token. See [Get a refresh token with the code flow](/docs/guides/refresh-tokens/main/#get-a-refresh-token-with-the-code-flow).
> **Note:** Using a refresh token with a SPA is an Early Access feature. To enable it, contact [Support](https://support.okta.com/help/open_case).

Alternatively, tokens can be renewed by hitting the `/authorize` endpoint. See [Get a new access token/ID token silently for your SPA ](/docs/guides/refresh-tokens/main/#renew-access-and-id-tokens-with-spas).

## Next steps

You should now understand how to sign users in to your single-page applications using Okta.

From here, go on to check out these guides:

* [Customize the Okta URL domain](/docs/guides/custom-url-domain/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
* [Protect your API endpoints](/docs/guides/protect-your-api/)