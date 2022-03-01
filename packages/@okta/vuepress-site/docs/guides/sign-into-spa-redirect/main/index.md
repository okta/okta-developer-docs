---
title: Sign users in to your SPA using the redirect model
excerpt: Configure your Okta org and your single-page app to use Okta's redirect sign-in flow.
layout: Guides
---

Add authentication with Okta's [redirect model](https://developer.okta.com/docs/concepts/redirect-vs-embedded/#redirect-authentication) to your single-page app. This example uses Okta as the user store.

---

**Learning outcomes**

* Create an integration that represents your app in your Okta org.
* Add dependencies and configure your app to use Okta redirect authentication.
* Add sign-in and sign-out actions.
* Require authentication on protected routes.
* Get authenticated user info.
* Make an HTTP call with the access token.
* Check the integration by signing in a user.

**Sample code**

<StackSnippet snippet="samplecode" />

---

> **Note**: For server-side web apps, see [Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/) instead. To protect the API your SPA calls, see [Protect your API endpoints](/docs/guides/protect-your-api/).

## Set up Okta

Set up your [Okta org](/docs/concepts/okta-organizations/). The CLI is the quickest way to work with your Okta org, so we recommend using it for the first few steps. If you don't want to install the CLI, you can [manually sign up for an org](https://developer.okta.com/signup/) instead. We provide non-CLI instructions along with the CLI steps below.

1. Install the Okta command-line interface: [Okta CLI](https://cli.okta.com/).
2. If you don't already have a free Okta developer account, create one by entering `okta register` on the command line.
3. Make a note of the Okta Domain as you need that later.
4. **IMPORTANT:** Set the password for your Okta developer org by opening the link that's shown after your domain is registered. Look for output similar to this:

```
Your Okta Domain: https://dev-xxxxxxx.okta.com
To set your password open this link:
https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
```

> **Note**: If you don't receive the confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`

5. Connect to your Okta developer org if you didn't create one in the last step (successfully creating an Okta org also signs you in) by running the following command. You need the URL of your org &mdash; which is your [Okta domain](/docs/guides/find-your-domain/) with `https://` prepended &mdash; and an [API/access token](/docs/guides/create-an-api-token/):

```
okta login
```

## Create an Okta integration for your app

An application integration represents your app in your Okta org. The integration configures how your app integrates with the Okta services including: which users and groups have access, authentication policies, token refresh requirements, redirect URLs, and more. The integration includes configuration information required by the app to access Okta.

To create your app integration in Okta using the CLI:

1. Create the app integration by running:

```
okta apps create spa
```

2. Enter **Quickstart** when prompted for the app name.
3. Specify the required redirect URI values:
<StackSnippet snippet="redirectvalues" />
4. Make note of the application configuration printed to the terminal as you use the Client ID and Issuer to configure your SPA.

At this point, you can move to the next step: [Creating your app](#create-app). If you want to set up the integration manually, or find out what the CLI just did for you, read on.

1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
1. Click **Admin** in the upper-right corner of the page.
1. Open the Applications page by selecting **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select a **Sign-in method** of **OIDC - OpenID Connect**.
1. Select an **Application type** of **Single-Page Application**, then click **Next**.
    > **Note:** If you choose an inappropriate application type, it can break the sign-in or sign-out flows by requiring the verification of a client secret, which is something that public clients don't have.
1. Enter an **App integration name**.
1. Select **Authorization Code** and **Refresh Token** as the **Grant type**. This enables the Authorization Code flow with PKCE for your application and the ability to refresh the access token when it expires without prompting the user to re-authenticate.
1. Enter the **Sign-in redirect URIs** for both local development, such as `http://localhost:xxxx/login/callback`, and for production, such as `https://app.example.com/login/callback`.
1. Select the type of **Controlled access** for your app in the **Assignments** section. You can allow all users to have access or limit access to individuals and groups. See the [Assign app integrations](https://help.okta.com/oie/en-us/Content/Topics/Provisioning/lcm/lcm-user-app-assign.htm) topic in the Okta product documentation.
1. Click **Save** to create the app integration and open its configuration page. Keep this page open as you need to copy some values in later steps when configuring your app.
1. On the **General** tab, scroll to **General Settings** and click **Edit**.
1. Verify that **Refresh Token** is selected as a **Grant type**. In the **Refresh Token** section, [refresh token rotation](/docs/guides/refresh-tokens/main/#refresh-token-rotation) is automatically set as the default refresh token behavior.
    > **Note:** The default number of seconds for the **Grace period for token rotation** is set to 30 seconds. You can [change the value](/docs/guides/refresh-tokens/main/#enable-refresh-token-rotation) to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token. Using a value of 0 indicates that there is no grace period.
1. In the **Login** section, specify an **Initiate login URI** to have Okta initiate the sign-in flow. When Okta redirects to this URI (for example, `https://example.com:xxxx/login`), the client is triggered to send an authorize request. This URI is also used when users reset their passwords while signing in to the app. Okta redirects the user back to this URI after the password is reset so that the user can continue to sign in.
1. Click **Save**.

### Enable Trusted Origins

Reduce possible attack vectors by defining Trusted Origins, which are the websites allowed to access the Okta API for your app integration. Cross-Origin Resource Sharing (CORS) enables JavaScript requests using `XMLHttpRequest` with the Okta session cookie. For information on enabling CORS, see [Grant cross-origin access to websites](/docs/guides/enable-cors/main/#grant-cross-origin-access-to-websites).

>**Note:** To reduce risk, only grant access to the Okta API to specific websites (origins) that you both control and trust.

To set trusted origins manually, add the **Base URIs** for local development, such as `http://localhost:xxxx`, and for production, such as `https://app.example.com`. These URIs are added as trusted origins in your Okta org and you can manage them by navigating to **Security** > **API** and selecting the **Trusted Origins** tab. See [Enable Trusted Origins](#enable-trusted-origins).

## Create app

In this section you create a sample SPA and add redirect authentication using your new Okta app integration.

### Create a new project

<StackSnippet snippet="createproject" />

### Add packages

Add the required dependencies for using the Okta SDK to your SPA.

<StackSnippet snippet="addconfigpkg" />

### Configure your app

Our app uses information from the app integration that we created earlier to configure communication with the API: Client ID and Issuer.

<StackSnippet snippet="configmid" />

#### Find your config values

If you don't have your configuration values handy, you can find them in the Admin Console (choose **Applications** > **Applications** and find your app integration that you created earlier):

* **Client ID**: Found on the **General** tab in the **Client Credentials** section.
* **Issuer**: Found in the **Issuer URI** field for the authorization server that appears by selecting **Security** > **API** from the left navigation pane.

### Redirect to the sign-in page

To sign a user in, your web app redirects the browser to the Okta-hosted sign-in page. This usually happens from a sign-in action, such as clicking a button or when a user visits a protected page.

> **Note**: The sign-out action requires your app to be listed as a trusted origin. The Okta CLI sets this up for you, but if you used the Okta dashboard, follow the steps to [add your app as a trusted origin](#enable-trusted-origins).

<StackSnippet snippet="loginredirect" />

During the sign-in flow, the user is redirected to the hosted sign-in page where they authenticate. After successful authentication, the browser is redirected back to your application along with [information about the user](#get-info-about-the-user).

> **Note:** To customize the hosted sign-in page, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

### Handle the callback from Okta

After Okta authenticates a user, they're redirected back to your application through the callback route that you define. When Okta redirects back, the URL query string contains a short-lived code that is exchanged for a token. The SDK does this for you with its callback component.

<StackSnippet snippet="handlecallback" />

### Get info about the user

After the user signs in, Okta returns some of their profile information to your app (see [/userinfo response example](/docs/reference/api/oidc/#response-example-success-6)). You can use this information to update your UI, for example to show the customer's name.

The default profile items (called `claims`) returned by Okta include the user's email address, name, and preferred username. The claims that you see may differ depending on what scopes your app has requested. See [Configure packages](#configure-packages).

<StackSnippet snippet="getuserinfo" />

> **Note**: To get user information beyond the default profile claims, you can call the [/userinfo endpoint](/docs/reference/api/oidc/#userinfo), or call the `getUser()` method in `OktaAuth`.

## Sign in a user

Test your integration by starting your server and signing in a user.

<StackSnippet snippet="testapp" />

## Configure required authentication

Your app can require authentication for everything or just for specific routes. Routes that don't require authentication are accessible without signing in, which is also called anonymous access.

### Require authentication for everything

Some apps requires that the user be authenticated for all routes, for example a company intranet.

<StackSnippet snippet="reqautheverything" />

### Require authentication for a specific route

Your website may enable users to find some initial information but require a user to sign in or take some action for more information. For example, an ecommerce site can allow a user to browse anonymously and even to add items to a cart. However, checking out requires the user to sign in.

<StackSnippet snippet="reqauthspecific" />

## Use the access token

SPAs need to send requests to one or more APIs to perform actions and retrieve information.

After a user signs in, your application stores an access token issued by Okta. By attaching this token to outgoing requests, your APIs can authenticate them (ensure that the user is signed in to perform an action) and authorize them (ensure that the user is allowed to do an action).

On your front-end (this SPA), make sure that you place the access token in the HTTP `Authorization` header of outgoing requests using this format:

```http
Authorization: Bearer ${token}
```

On your back-end (the API), make sure that you check for valid tokens in incoming requests. See [Protect your API endpoints](/docs/guides/protect-your-api/).

<StackSnippet snippet="useaccesstoken" />

To enable access token renewal you must obtain a refresh token. See [Get a refresh token with the code flow](/docs/guides/refresh-tokens/main/#get-a-refresh-token-with-the-code-flow).

> **Note:** Using a refresh token with a SPA is an [Early Access](/docs/reference/releases-at-okta/#early-access-ea) feature. To enable it, contact [Support](https://support.okta.com/help/open_case).

Alternatively, you can renew tokens by hitting the `/authorize` endpoint. See [Get a new access token/ID token silently for your SPA ](/docs/guides/refresh-tokens/main/#renew-access-and-id-tokens-with-spas).

## Next steps

Learn more about session management, securing your APIs, and ways that you can integrate with Okta.

*  To protect the API that your SPA calls, see [Protect your API endpoints](/docs/guides/protect-your-api/).
* To customize your Okta org domain name, see [Customize the Okta URL and email notification domains](https://developer.okta.com/docs/guides/custom-url-domain/main/)
* To customize the hosted sign-in page, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).
* For resources to create a fully customized sign-in experience, see [Languages & SDKs Overview](https://developer.okta.com/code/)
* To secure your mobile app, see [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/)
* To support multi-tenancy, see [Multi-tenant solutions](https://developer.okta.com/docs/concepts/multi-tenancy/)

<StackSnippet snippet="specificlinks" />
