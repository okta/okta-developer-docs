---
title: Sign users in to your mobile app
excerpt: Learn how to add authentication to your mobile apps and sign users in using Okta's APIs and libraries.
layout: Guides
---
<StackSelector />

This guide shows you how to use Okta as the user store for your mobile application. When you've finished following the steps, your app opens a browser to sign users in.

> **Note** If you are building a web application, see [Sign users in to your web application](/docs/guides/sign-into-web-app/) or [Sign users in to your single-page application](/docs/guides/sign-into-spa/) instead.

<EmbeddedBrowserWarning />

---

**Learning outcomes**

* Create an Okta app integration to represent your app in the system
* Implement an Okta-hosted sign-in page
* Handle a user sign-in flow
* Handle access tokens appropriately

**What you need**

* An Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* A mobile project or app that you want to add authentication to.

**Sample code**

<StackSelector snippet="samplecode" noSelector/>

---

> **Note** If you are building a web application, see [Sign users in to your web application](/docs/guides/sign-into-web-app/) or [Sign users in to your single-page application](/docs/guides/sign-into-spa/) instead.

## Define a callback route

To sign users in, your application opens a browser and shows an Okta-hosted sign-in page. Okta then redirects back to your app with information about the user. 

You can learn more about how this works by reading about [Okta-hosted flows](/docs/concepts/okta-hosted-flows/).

The first thing that you need to define is how Okta can redirect back to your app. This is called a callback route or redirect URI. In mobile apps, use a custom scheme similar to `your-app:/callback` so that your app can switch back into the foreground after the user is done signing in with the browser.

<StackSelector snippet="definescheme" noSelector/>

This defines your redirect scheme. Add `:/callback` to the scheme to get the full redirect URI (like `com.okta.example:/callback`), which you need in the following steps.

> **Note**: `com.okta.example` is just an example scheme. You can replace it with any string that follows the pattern of `domain.company.appname`.

Your mobile app is responsible for parsing the information Okta sends to this callback route. Our SDKs can help you with this task (covered later in the [Open the sign-in page](#open-the-sign-in-page) section). For now, just define the route itself.

## Create an Okta app integration

Before you can sign a user in, you need to create an Okta app integration that represents your mobile application.

1. Sign in to your Okta organization with your administrator account.
<a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Native Application** as the **Application type** and click **Next**.
    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, and would break the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Enter your callback route for the **Sign-in redirect URIs**. This is the full redirect URI that you defined in the [previous step](#define-a-callback-route) (for example, `com.okta.example:/login`).
1. Enter your callback route for the **Sign-out redirect URIs**. This is the full redirect URI that you defined in the [previous step](#define-a-callback-route) (for example, `com.okta.example:/logout`).
1. Include a URI in the **Initiate login URI** box to have Okta initiate the sign-in flow. When Okta redirects to this endpoint (for example, `https://example:0000.com/login`), the client is triggered to send an authorize request. This URI is also used when users reset their passwords while signing in to the app. Okta redirects the user back to this URI after the password is reset so that the user can continue to sign in.

## Add and configure packages

To add Okta authentication to your app, you need install and configure the Okta SDK.

### Install the SDK

<StackSelector snippet="installsdk" noSelector/>

### Configure the SDK

You need the following values from the Okta app that you created in the [Create an Okta app integration](#create-an-okta-app-integration) section:

* **Client ID** &mdash; find it in the applications list or on the **General** tab of your app integration.
* **Okta Domain** &mdash; you can find the Okta Domain in the Admin Console's global header in the upper-right corner of the page. Click the section that displays your email and company name.  A drop-down box appears and displays general org information including the full Okta domain (for example, subdomain.okta.com).

> **Note:** Your Okta domain is different from your admin domain. Don't include `-admin` in your Okta domain.

You'll also need the full redirect URI that you defined in the [Define a callback route](#define-a-callback-route) section.

<StackSelector snippet="configuremid" noSelector/>

## Open the sign-in page

To sign in users, open a browser and navigate to the Okta-hosted sign-in page.

To learn how to customize the sign-in page, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

<StackSelector snippet="signin" noSelector/>

## Get info about the user

When a user signs in, their profile information (stored in Okta) is made available to your application. You can use the user's profile information to personalize their app experience.

By default, the profile items (called "claims") that Okta returns include the user's email address, first name, and last name. You can see the default items returned in the [/userinfo response example](/docs/reference/api/oidc/#response-example-success-6). The claims you see may differ depending on what scopes your app has requested (see [Add and configure packages](#add-and-configure-packages)).

<StackSelector snippet="getinfo" noSelector/>

<!-- You can also customize the items (called claims) that are returned from Okta. See [Token customization guide]. -->

## Check for a session at startup

When the app is closed and reopened, you need to check for the existence of an access token to see if the user has an existing session.

<StackSelector snippet="checkfortoken" noSelector/>

## Keep the user signed in

In many apps, users expect to stay signed in to the app for a long time. Access tokens are short-lived, but you can keep the user signed in by using the refresh token to get new access tokens automatically.

<StackSelector snippet="refresh" noSelector/>

## Use the access token

Mobile apps need to send requests to one or more APIs to perform actions and retrieve information. The token issued by Okta helps you call your API securely. By attaching this token to outgoing requests, your API can authenticate them (ensure that the user is signed in to perform an action) and authorize them (ensure that the user is allowed to do an action).

In your mobile app, make sure that you place the access token in the HTTP `Authorization` header of outgoing requests using this format:

```
Authorization: Bearer ${token}
```

Your API must check for valid tokens in incoming requests. To learn how to protect your API endpoints and require token authentication, see [Protect your API endpoints](/docs/guides/protect-your-api/).

<StackSelector snippet="usetoken" noSelector/>

## Next steps

You should now understand how to sign users in to your mobile applications using Okta.

* In this guide you signed users in to your app by opening a browser. To learn how to customize the sign-in page displayed in the browser, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).
* To learn how to protect the API endpoints that your mobile app calls, see [Protect your API endpoints](/docs/guides/protect-your-api/).