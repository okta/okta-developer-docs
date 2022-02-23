---
title: Sign users into your web app using the redirect model
excerpt: Configure your Okta org and your web app to use Okta's redirect sign in.
layout: Guides
---

Add authentication with Okta's [redirect model](https://developer.okta.com/docs/concepts/redirect-vs-embedded/#redirect-authentication) to your server-side web app. This example uses Okta as the user store. 

---

**Learning outcomes**

* Create an integration representing your app in your Okta org.
* Add dependencies and configure your app to use Okta redirect authentication.
* Test user log in.

**Sample code**

<StackSnippet snippet="samplecode" />

---

> **Note**: For single-page (browser) apps, see [Sign users into your SPA using the redirect model](/docs/guides/sign-into-spa-redirect/). For servers returning non-HTML API responses, see [Protect your API endpoints](/docs/guides/protect-your-api/).

## Set up Okta

Set up your [Okta org](/docs/concepts/okta-organizations/). The CLI is by far the quickest way to work with your Okta org, so we'd recommend using it for the first few steps. If you don't want to install the CLI, you can [manually sign up for an org](https://developer.okta.com/signup/) instead. We'll provide non-CLI instructions along with the CLI steps below as well.

1. Install the Okta command-line interface: [Okta CLI](https://cli.okta.com/).
2. If you don't already have a free Okta developer account, create one by entering `okta register` on the command line.
3. Make a note of the Okta Domain as you'll use that later.
4. **IMPORTANT:** Set the password for your Okta developer org by opening the link that's shown after your domain is registered. Look for output similar to this:

```
Your Okta Domain: https://dev-xxxxxxx.okta.com
To set your password open this link:
https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
```

> **Note**: If you don't receive the confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`

5. Connect to your Okta developer org if you didn't create one in the last step (successfully creating an Okta org also signs you in) by running the following command (you'll need the URL of your org &mdash; which is your [Okta domain](/docs/guides/find-your-domain/) with `https://` prepended &mdash; and an [API/access token](/docs/guides/create-an-api-token/)):

```
okta login
```

## Create an Okta integration for your app

An Application Integration represents your app in your Okta org. The integration configures how your app integrates with the Okta services including: which users and groups have access, authentication policies, token refresh requirements, redirect URLs, and more. The integration includes configuration information required by the app to access Okta. 

To create your app integration in Okta using the CLI:

1. Create the app integration by running:

```
okta apps create web
```

2. When prompted for a name, use "Quickstart".
3. Specify the required Redirect URI values:
<StackSnippet snippet="redirectvalues" />
4. Note down the application configuration printed to the terminal as you'll use the client id, client secret, and Okta domain to configure your mobile app.

At this point, you can move to the next step — [Creating your app](#create-app). If you want to set up the integration manually, or find out what the CLI just did for you, read on. 

1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
1. Click the **Admin** button on the top right of the page to open the Admin Console, and then open the Applications configuration pane by selecting **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select a **Sign-in method** of **OIDC - OpenID Connect**.
1. Select an **Application type** of **Web Application**, then click **Next**.
    > **Note:** Choosing an inappropriate application type can break the sign-in or sign-out flows by requiring the verification of a client secret, something that public clients don't have.
1. Enter an **App integration name**.
1. Enter the **Sign-in redirect URIs** for both local development, such as `http://localhost:xxxx/login/oauth2/code/okta`, and for production, such as `http://app.example.com/login/oauth2/code/okta`. For more information on callback URIs, see [Define a callback route](#define-a-callback-route).    
1. Select the type of **Controlled access** for your app in the **Assignments** area. Select the **Everyone** group for now. For more information, see [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign).
1. Click **Save** to create the app integration. The configuration pane for the integration opens after it's saved. Keep this pane open as you'll copy some values when configuring your app.

## Create app

In this section you'll create a sample web app and add redirect authentication using your new Okta app integration.

### Create a new project

<StackSnippet snippet="createproject" />

### Add packages

Add the required dependencies for using the Okta SDK to your web app.

<StackSnippet snippet="addconfigpkg" />

### Configure your app

Our app uses information from the Okta integration we created earlier to configure communication with the API — client id, client secret, and Okta domain.

<StackSnippet snippet="configmid" />

#### Find your config values

If you haven't got your configuration values handy, you can find them in your Okta admin console (choose **Applications** > **Applications** and find the entry for your application integration):

* **Client ID** &mdash; Found in the entry for your application integration shown by choosing **Applications** > **Applications**.
* **Client Secret** &mdash; Found on the **General** tab in the details view of your application integration.
* **Okta Domain** &mdash; Found in a drop-down box shown by clicking on your email on the right side of the global header at the top of the page. Open the drop-down, move your pointer over the domain name, and then click the button that appears to copy the domain to the clipboard.

> **Note:** Your Okta domain is different from your admin domain — your Okta domain doesn't include the `-admin` part.

### Redirect to the sign-in page

To authenticate a user your web app redirects the browser to the Okta-hosted sign-in page. This usually happens from a sign-in action such as clicking a button, or when a user visits a protected page.

<StackSnippet snippet="loginredirect" />

After successful authentication Okta redirects back to the app with an authorization code that's then exchanged for an ID and access token that can be used to confirm sign in status. Later we will look at [displaying some of the returned user information](#get-info-about-the-user) in the app.

> **Note:** To customize the Okta sign-in form, see [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget).

### Define a callback route

<StackSnippet snippet="defineroute" />

### Get info about the user

After the user signs in, Okta returns some of their profile information to your app, such as those shown in the [userinfo response example](/docs/reference/api/oidc/#response-example-success-6). One use of this information is updating your user interface, such as displaying the customer's name.

The default profile items (called "claims") returned by Okta include the user's email address, name, and preferred username. The claims you see may differ depending on the scopes requested by your app. For more information, see [Configure your app](#configure-your-app).

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

Your website may enable anonymous access for some content but require sign in for other content, or to take some action. For example, an ecommerce site might allow a user to browse anonymously and add items to a cart, but require sign in for checkout and payment.

<StackSnippet snippet="reqauthanon" />

## Next steps

* To support multi-tenancy, see [Multi-tenant solutions](https://developer.okta.com/docs/concepts/multi-tenancy/)

<StackSnippet snippet="specificlinks" />