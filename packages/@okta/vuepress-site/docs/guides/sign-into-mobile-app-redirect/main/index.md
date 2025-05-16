---
title: Sign in to your mobile app
excerpt: Configure your Okta org and your mobile app to use Okta's redirect sign-in flow.
layout: Guides
---

Add authentication to your mobile app using the Okta [redirect model](https://developer.okta.com/docs/concepts/redirect-vs-embedded/#redirect-authentication). This example uses Okta as the user store.

---

#### Learning outcomes

* Create an integration that represents your app in your Okta org.
* Add dependencies and configure your mobile app to use Okta.
* Add a browser-based sign-in flow that Okta controls (redirect authentication).
* Load the details of the signed in user and check for an existing authenticated session at app startup.
* Refresh tokens to keep the user signed in.
* Make server calls using an access token for the session.
* Test your integration by signing in as a user.

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Set up Okta

Set up your [Okta org](/docs/concepts/okta-organizations/). You can sign up for an [Okta Integrator Free Plan org](https://developer.okta.com/signup/).

Make a note of your Okta domain. Use it wherever `${yourOktaDomain}` appears in this guide.

> **Note**: If you're using an existing org, verify that API Access Management is enabled: Open your Admin Console, go to **Security** > **API**, and verify that an **Authorization Servers** tab is present. If not, choose one of the following:
>
> * Contact your support team to enable the feature in your org.
> * Use the Admin Console to create your app integrations instead of the CLI.
>

## Create an Okta integration for your app

An app integration represents your app in your Okta org. The integration configures how your app integrates with the Okta services. This includes which users and groups have access, authentication policies, token refresh requirements, redirect URLs, and more. The integration includes configuration information required by the app to access Okta.

To create your app integration in Okta using Admin Console:

1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account. Click **Admin** on the top right of the page.
1. Open the apps configuration pane by selecting **Applications** > **Applications**. Click **Create App Integration**.
1. Select a **Sign-in method** of **OIDC - OpenID Connect**.
1. Select an **Application type** of **Native Application**, then click **Next**.
   > **Note:** If you choose the wrong app type, it can break the sign-in or sign-out flows. Integrations require the verification of a client secret, which public clients don't have.
1. Enter an **App integration name**.
1. Enter the callback routes.

    <StackSnippet snippet="redirectvalues" />

1. Click **Save** to update the Okta app settings.

## Create an app

In this section you create a sample mobile app and add redirect authentication using your new Okta app integration.

### Create a project

<StackSnippet snippet="createproject" />

### Add packages

Add the required dependencies for using the Okta SDK with your app.

<StackSnippet snippet="addconfigpkg" />

### Configure your app

The app uses information from the Okta integration that you created earlier to communicate with the API:

* Redirect URI
* Post logout redirect URI
* Client ID
* Issuer

<StackSnippet snippet="configmid" />

#### Find your config values

If you don't have your configuration values handy, you can find them in the Admin Console. Go to **Applications** > **Applications** and find the app integration that you created earlier:

* **Sign-in redirect URI**: Found on the **General** tab in the **Login** section.
* **Sign-out redirect URI**: Found on the **General** tab in the **Login** section.
* **Client ID**: Found on the **General** tab in the **Client Credentials** section.
* **Issuer**: Found in the **Issuer URI** field for the authorization server that appears by selecting **Security** > **API** from the left navigation pane.

### Define a callback route

To sign users in, your app opens a browser and displays an Okta-hosted sign-in page. Okta then redirects back to your app with information about the user. To achieve this you need to define how Okta can redirect back to your app. This is called a callback route or redirect URI.

In mobile apps, use a custom scheme similar to `your-app:/callback` so that your app can switch back into the foreground after the user is done signing in through the browser. This should be the same value that you used for the sign-in and sign-out redirect URIs.

Your mobile app is responsible for parsing the information Okta sends to the callback route. The Okta SDKs can help you with this task (covered later in the [Open the sign-in page](#open-the-sign-in-page) section). For now, define the route itself.

<StackSnippet snippet="definecallback" />

## Open the sign-in page

The SDK signs in the user by opening an Okta-hosted web page. The app can send the SDK sign-in request when the following occurs:

* A user visits a protected route.
* A user taps a button.

<StackSnippet snippet="opensignin" />

## Get info about the user

The ID token returned by Okta contains user information or claims that are based on the scopes requested by the app (see [Configure your app](#configure-your-app)).

This app includes the `profile` scope that includes the user's email address, name, and preferred username. You can use this information to update your UI, such as showing the customer's name.

Use the Okta user information endpoints for items that aren't available in the ID token. For general information on requesting user info, see the [userinfo response example](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/userinfoCustomAS).

<StackSnippet snippet="getuserinfo" />

## Sign in a user

Test your integration by signing in a user using your mobile app.

<StackSnippet snippet="testapp" />

## Check for a session at startup

Okta issues an access token when the user signs in. This token allows the user to access the services for a set amount of time. Check for an existing unexpired token when the app launches to find out if the user is still signed in.

<StackSnippet snippet="checkfortoken" />

## Keep the user signed in

Access tokens are short-lived. Yet, for some types of apps users expect to remain signed in for a long time. Granting a refresh token in your app integration enables the client to request an updated access token.

Enable a refresh token in your app integration by following these steps:

1. Launch the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations.
1. Click the name of your integration to open the configuration manager.
1. Click **Edit** in the **General Settings** section.
1. Select **Refresh Token** in the **Application** section.
1. Click **Save** at the bottom of the **General Settings** section.

<StackSnippet snippet="refresh" />

## Use the access token

Your own server API (a resource server in OAuth 2.0) uses the Okta-generated access token for the following:

* To authenticate that the user is signed in.
* To ensure that the user is authorized to perform the action or access the information.

Use the access token by adding it to the HTTP `Authorization` header of outgoing requests in your mobile or other client using this format:

```
Authorization: Bearer ${token}
```

Your API then checks incoming requests for valid tokens. To learn how to protect your API endpoints and require token authentication, see [Protect your API endpoints](/docs/guides/protect-your-api/).

<StackSnippet snippet="usetoken" />

## Next steps

This guide showed you how to sign users in with their username and password using an Okta themed sign-in page. Here are some ways to extend that functionality:

* [Customize the sign-in page that Okta presents](https://developer.okta.com/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
* [Share a sign-in session with native mobile apps](https://developer.okta.com/docs/guides/shared-sso-android-ios/)
* [Add a sign-in flow using biometrics](https://developer.okta.com/docs/guides/unlock-mobile-app-with-biometrics/)
* [Protect your servers' API endpoints](https://developer.okta.com/docs/guides/protect-your-api/)

<StackSnippet snippet="specificlinks" />
