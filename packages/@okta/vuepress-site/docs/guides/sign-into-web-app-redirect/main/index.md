---
title: Sign users in to your web app using the redirect model
excerpt: Configure your Okta org and your web app to use Okta's redirect sign-in flow.
layout: Guides
---

Add authentication with Okta's [redirect model](https://developer.okta.com/docs/concepts/redirect-vs-embedded/#redirect-authentication) to your server-side web app. This example uses Okta as the user store.

---

**Learning outcomes**

* Create an integration that represents your app in your Okta org.
* Add dependencies and configure your app to use Okta redirect authentication.
* Test user sign in flow.

**Sample code**

<StackSnippet snippet="samplecode" />

---

> **Note**: For single-page (browser) apps, see [Sign users in to your SPA using the redirect model](/docs/guides/sign-into-spa-redirect/). For servers returning non-HTML API responses, see [Protect your API endpoints](/docs/guides/protect-your-api/).

## Set up Okta

Set up your [Okta org](/docs/concepts/okta-organizations/). The Okta command-line interface (CLI) is the quickest way to do this. If you don't want to install the CLI, you can [manually sign up for an org](https://developer.okta.com/signup/) instead.

1. Install [Okta CLI](https://cli.okta.com/).
1. If you don't already have a free Okta developer account:
   1. Open your terminal.
   {style="list-style-type:lower-alpha"}
   1. Run `okta register`, and enter your first name, last name, email address, and country.
   1. Click or tap **Activate** in the account activation email that is sent to the email address that you gave.

      > **Tip**: If you don't receive the confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`

   1. Find your new domain and a link to set your password in the email:

      ```txt
      Your Okta Domain: https://dev-xxxxxxx.okta.com
      To set your password open this link:
      https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
      ```

   1. Set the password for your org by opening the link and following the instructions. Your Okta domain is returned, similar to the following:

      ```txt
      New Okta Account created!
      Your Okta Domain: https://dev-xxxxxxx.okta.com
      ```

   1. Make a note of your Okta domain. Use it wherever `${yourOktaDomain}` appears in this guide.

1. Run `okta login` to connect to your org if you didn't create one in the last step (successfully creating an Okta org also signs you in). You need the URL of your org, which is `https://` followed by your [Okta domain](/docs/guides/find-your-domain/), and an [API/access token](/docs/guides/create-an-api-token/).

> **Note**: If you're using an existing org, verify that API Access Management is enabled: Open your Admin Console, go to **Security** > **API**, and verify that an **Authorization Servers** tab is present. If not, choose one of the following:
>
> * Create a developer account and org with Okta CLI.
> * Contact your support team to enable the feature in your org.
> * Use the Admin Console to create your app integrations instead of the CLI.
>
> All accounts created with Okta CLI are developer accounts.

## Create an Okta integration for your app

An application integration represents your app in your Okta org. The integration configures how your app integrates with the Okta services including: which users and groups have access, authentication policies, token refresh requirements, redirect URLs, and more. The integration includes configuration information required by the app to access Okta.

To create your app integration in Okta using the CLI:

1. Create the app integration by running:

   ``` bash
   okta apps create web
   ```

   > **Tip**: If Okta CLI returns the error "Your Okta Org is missing a feature required to use the Okta CLI: API Access Management," you're not using an Okta developer account. To resolve this, see [Set up Okta](#set-up-okta).

2. Enter **Quickstart** when prompted for the app name.
3. Specify the required Redirect URI values:
<StackSnippet snippet="redirectvalues" />
4. The Okta CLI creates an `.okta.env` file with export statements containing the Client ID, Client Secret, and Issuer. Keep this safe as you use it later to configure your web app.

At this point, you can move to the next step: [Creating your app](#create-app). If you want to set up the integration manually, or find out what the CLI just did for you, read on.

1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
1. Click the **Admin** button on the top right of the page.
1. Open the Applications configuration pane by selecting **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select a **Sign-in method** of **OIDC - OpenID Connect**, then click **Next**.
1. Select an **Application type** of **Web Application**, then click **Next**.
   > **Note:** If you choose an inappropriate application type, it can break the sign-in or sign-out flows by requiring the verification of a client secret, which is something that public clients don't have.
1. Enter an **App integration name**.
1. Enter the **Sign-in redirect URIs** for local development, such as `http://localhost:xxxx/authorization-code/callback`.
1. Enter the **Sign-out redirect URIs** for both local development, such as `http://localhost:xxxx/signout/callback`. For more information on callback URIs, see [Define  callback route](#define-a-callback-route).
1. In the **Assignments** section, define the type of **Controlled access** for your app. Select the **Everyone** group for now. For more information, see the [Assign app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-user-app-assign) topic in the Okta product documentation.
1. Click **Save** to create the app integration. The configuration pane for the integration opens after it's saved. Keep this pane open as you copy some values when configuring your app.

## Create app

In this section you create a sample web app and add redirect authentication using your new app integration.

### Create a new project

<StackSnippet snippet="createproject" />

### Add packages

Add the required dependencies for using the Okta SDK with your web app.

<StackSnippet snippet="addconfigpkg" />

### Configure your app

Our app uses information from the Okta integration that we created earlier to configure communication with the API: Client ID, Client Secret, and Issuer.

<StackSnippet snippet="configmid" />

#### Find your config values

If you don't have your configuration values handy, you can find them in the Admin Console (choose **Applications** > **Applications** and find the application integration that you created earlier):

* **Client ID**: Found on the **General** tab in the **Client Credentials** section.
* **Client Secret**: Found on the **General** tab in the **Client Credentials** section.
* **Okta Domain**: Found in the global header located in the upper-right corner of the dashboard. Click the down arrow next to your email address and in the dropdown box that appears, move your pointer over the domain name. Click the Copy to clipboard icon that appears to copy the domain.

  > **Note:** Your Okta domain is different from your admin domain. Your Okta domain doesn't include `-admin`, for example, `https://dev-133337.okta.com`.

### Redirect to the sign-in page

To authenticate a user, your web app redirects the browser to the Okta-hosted sign-in page. This usually happens from a sign-in action such as clicking a button or when a user visits a protected page.

<StackSnippet snippet="loginredirect" />

After successful authentication Okta redirects back to the app with an authorization code that's then exchanged for an ID and access token that you can use to confirm sign in status. Later we look at [displaying some of the returned user information](#get-info-about-the-user) in the app.

> **Note:** To customize the Okta sign-in form, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

### Define a callback route

<StackSnippet snippet="defineroute" />

### Get info about the user

After the user signs in, Okta returns some of their profile information to your app, such as those shown in the [/userinfo response example](/docs/reference/api/oidc/#response-example-success-6). One use of this information is updating your user interface, for example to display the customer's name.

The default profile items (called `claims`) returned by Okta include the user's email address, name, and preferred username. The claims that you see may differ depending on the scopes requested by your app. See [Configure your app](#configure-your-app).

<StackSnippet snippet="getuserinfo" />

## Sign in a user

Test your integration by starting your server and signing in a user.

<StackSnippet snippet="testapp" />

## Configure required authentication

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
* [Custom domain and email address](https://developer.okta.com/docs/guides/custom-url-domain/main/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).
* [Sign users in to your mobile app using the redirect model](/docs/guides/sign-into-mobile-app-redirect/)
* [Multi-tenant solutions](https://developer.okta.com/docs/concepts/multi-tenancy/)

<StackSnippet snippet="specificlinks" />
