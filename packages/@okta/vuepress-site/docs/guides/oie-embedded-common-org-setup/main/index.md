---
title: Create and set up your Okta org
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

## Overview

Before you can run the provided sample app or integrate the SDK or
Widget into your own app, you need to do the following:

1. **Step 1:** [Create your Okta Account](#create-your-okta-account)
1. **Step 2:** Set up your Okta org.

   * To load the SDK, Widget, and get started with the simple use cases
      go to [Set up your Okta org (for Password factor only use cases)](#set-up-your-okta-org-for-password-factor-only-use-cases)

   * **Recommended for later:** After you've completed the basic use cases, advance to the more
      complex use cases by performing the following:

      * [Set up your Okta org (for multifactor use cases)](#set-up-your-okta-org-for-multifactor-use-cases)
      * [Set up your Okta org (for social identity providers)](#set-up-your-okta-org-for-social-identity-providers)

      > **Note:** We recommend that you skip the more advanced configurations until you have the basic use cases working.

After you complete setting up the Okta org, [download and set up the SDK, Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).

## Create your Okta account

The first step is to create an Okta account, if you haven't already.

1. [Sign up](https://developer.okta.com/signup/oie.html) for an Okta account.

   After you sign up, Okta sends you a verify email with the email address that
   you provided.

1. Using the activate link in Okta's email, activate your account and provide a new password. Okta redirects you to the
   [Admin Console](https://developer.okta.com/docs/guides/quickstart/using-console/).

## Set up your Okta org for password factor only use cases

The next step is to set up your Okta org so that you can connect your sample app
and any app that you're building, to the org. The setup includes creating a new org
application, updating the default authorization server's settings, and
defining new org policies.

> **Note:** This section discusses how to set up your Okta org for password factor only
use cases. These use cases are intended to use the password factor only
without any additional factors such as email and phone SMS. The use cases
that support this basic setup include:

**Widget**

* [Load the Widget](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-load/)
* [Basic sign in using the Widget](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-basic-sign-in/)
* [Sign in with Facebook](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-sign-in-soc-idp/)

**SDK**

* [Basic user sign in (password factor only)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-basic-sign-in/)
* [User sign out (local app)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-basic-sign-out/)
* [Sign in with a social Identity Provider (password factor only)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-sign-in-soc-idp/)

### Step 1:  Update the default Custom Authorization Server

1. In the [Admin Console](/docs/guides/quickstart/using-console/)
   (for the Okta org that you set up in the previous step), select
   **Security** > **API** from the left navigation menu.
1. On the **Authorization Servers** tab, click the **edit** pencil icon for the "default" Custom Authorization
      Server.
1. On the default authorization server page, click the **Access Policies** tab and do the following:
      * Click the pencil icon for the **Default Policy Rule**.
      * In the **Edit Rule** dialog box, select the **Interaction Code** checkbox if not already selected.
      * Click **Update Rule**.

### Step 2: Update the authenticators for password factor only use cases

1. Select **Security** > **Authenticators** from the left navigation menu.
1. On the **Authenticators** page, select **Edit** from the **Actions** menu on the **Password** authenticator row.
1. On the **Password** page, scroll down to the rules section and click the pencil icon next to the **Default Rule**.
1. In the **Edit Rule** dialog box, select **Not required** in the **AND Additional verification is** section.
1. Click **Update Rule**.

### Step 3: Add a trusted origin and enable CORS

1. Select **Security** > **API** from the left navigation menu.
1. On the **API** page, click **Trusted Origins**.
1. On the **Trusted Origins** tab, click **Add Origin**.
1. In the **Add Origin** dialog box, do the following:
      * Set an origin name (for example, MyOrigin).
      * Add your app's URL. If you are using the
         sample app, use <StackSelector snippet="appsbaseurl" noSelector />
      * Under **Type**, select the **CORS** and **Redirect** checkboxes.
      * Click **Save**.

### Step 4:  Create new application

1. Select **Applications** > **Applications** from the left navigation menu.
1. On the **Applications** page, click **Create App Integration**.
1. From the **Add Applications** page, click **Create New App**.
1. In the **Create New Application Integration** dialog box:

   *  Select **OIDC - OpenID Connect** as the **Sign-on method**.
   *  <StackSelector snippet="applicationtype" noSelector />
1. <StackSelector snippet="newapp" noSelector />
   * Enter an application name.
   * Select the **Interaction Code** checkbox if not already selected.
   * Select the **Refresh Token** checkbox.
   * Set **Sign-in redirect URIs** to: <StackSelector snippet="redirecturi" noSelector />
   * Click **Save**.
1. Select the **Sign On** tab, and in the **Sign On Policy** section make note of the **Available Authenticators**. The value
      should be **1 factor** that is **Password**. (If you are coming back to this
      step after completing
      [Set up your Okta org (for multifactor use cases)](#set-up-your-okta-org-for-multifactor-use-cases),
      then set this value to **Password**. Currently, if there are multiple factors
      defined in the Okta org but the application uses only one factor, it must
      be **Password**.)

## Set up your Okta org for multifactor use cases

This section sets up your org for multifactor use cases. These use cases include:

**SDK**

* [Sign in (password and email factor)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-sign-in-pwd-email/)
* [Sign in (password and phone factor)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-sign-in-pwd-phone/)
* [User password recovery (password and email factors)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-pwd-recovery-mfa/)
* [Self user registration (email and optional phone factor)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-self-reg/)

> **Note:** We recommend that you skip this step if you are just getting started with the
sample app and like to run the basic use cases listed in
[Set up your Okta org (for password factor only use cases)](#set-up-your-okta-org-for-password-factor-only-use-cases).

If you have completed the basic use cases or simply want to move on to more
complex multifactor use cases, continue with the following steps.

The steps to enable these factors are as follows:

### Step 1: Set up the email authenticator for authentication

1. In the Admin Console, select **Security** > **Authenticators** from the left navigation menu.
1. From the **Authenticators page**, select **Edit** from the **Actions** menu on the **Email** authenticator row.
1. In the **Used for** section, select the **Authentication and recovery** option for the **This authenticator can be used for** field.
1. Click **Save**.

### Step 2: Add the phone authenticator

1. From the **Authenticators page**, click **Add Authenticator**.
1. On the **Add Authenticator** page, click **Add** for the **Phone** authenticator.
1. In the **Verification options** section, select **SMS** for the **User can verify with** field.

   > **Note:** Currently, the SDK works only with a phone authenticator set up for SMS.

1. In the **Used for** section, select **Authentication and recovery** for the **This authenticator can be used for** field.
1. Click **Add**.

### Step 3: Update Application sign on policy for multiple factors

1. Select **Applications** > **Applications** from the left navigation menu.
1. From the **Applications** page, select the application that you created
   in [Set up your Okta org for password factor only use cases](#set-up-your-okta-org-for-password-factor-only-use-cases).
1. On the page for your application, select the **Sign On** tab.
1. In the **Sign On Policy** section, select the **Actions** menu icon (⋮) beside the **ENABLED** flag for **Catch-all Rule** and select **Edit**.
1. On the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with** field and change it's value to **Password + Another Factor**.
1. Ensure that no values are selected for the **AND Possession factor constraints are** field.
1. Click **Save**.

## Set up your Okta org for social Identity Providers

This section describes how to set up your org to use Facebook as an Identity Provider. This use case requires the following setup:

**Widget**

* [Sign in with Facebook](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-sign-in-soc-idp/)

**SDK**

* [Sign in with Facebook (password factor only)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-sign-in-soc-idp/)

You can skip this section until you are ready to run through the above use
case. Otherwise, the steps to add support for the Facebook social provider are
listed below.

> **Note:** We recommend that you skip this step if you are just getting started with the
sample app and like to run the basic use cases listed in
[Set up your Okta org (for password factor only use cases)](#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 1: Create a Facebook app in Facebook

1. Go to [Facebook for Developers](https://developers.facebook.com/) and click the **Login** link. If you don't have an account, then create one.
1. Using these [instructions](https://developers.facebook.com/docs/apps/register) as a guide, create a Facebook app. Ensure that when you are creating the app, you select **None** as the app type.
1. After creating the app, on the [Apps](https://developers.facebook.com/apps/) page select the App that you just created.
1. On the **App** page, scroll to the **Add a product** section.
1. Click the **Set up** link in the **Facebook Login** tile.
1. On the first set up page, select **Web** as the platform type.
1. On the next page, set the value for **Site URL** to `https://{Okta org domain}/oauth2/v1/authorize/callback` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).
1. Click **Save** and then **Continue**.
1. Click through all the **Next** buttons until you run through all the sections.
1. In the left navigation menu, click **Facebook Login** (under products) and then click **Settings**.
1. On the **Settings** page and under **Client OAuth Settings**, add the following URLs for the **Valid OAuth Redirect URIs** field:
      `https://{Okta org domain}/oauth2/v1/authorize/callback` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).
1. Click **Save Changes** at the bottom of the page.

### Step 2: Copy the App ID and Secret

After you finish creating the app, the next step is to copy the **App ID** and **App Secret** for the next step where you will set up the Facebook social provider in the Okta org.

1. In the left navigation menu, click **Settings** and then **Basic**.
1. Copy the **App ID** and **App Secret** to an accessible place in preparation for the next step.

### Step 3: Set up and copy test user information

A test account is required to test the social media sign in in development mode. Facebook automatically creates one test user that we can use for the Facebook use cases. Perform the following steps to find, set the password, and copy this user's information.

1. From the left navigation menu, click **Roles** and then **Test Users**.
1. When the list of users appears, there should be one test user. Select **Edit** for the test user and select **Change the name or password for this test user**.
1. In the Edit Test User dialog box, set a password for the **New Password** and
   **Confirm New Password** fields.
1. Click **Save**.
1. Copy or note the test user's **email** and **password** for when you perform the social media use cases.

### Step 4: Optional: Switch to live mode

By default the Facebook app is in development mode and can only be used by the
test users and the user that you used to sign in and create the Facebook app. As a
result, when testing your social media use cases, you can only use these users
to sign in to Facebook.

If you would like to use any public Facebook user, you need to set the app to
live mode. To switch the app to live mode, do the following:

1. From the left navigation menu, click **Settings** and then **Basic**.
1. Set a value in the **Privacy Policy URL** field for your app. If you don't have one, you can temporarily use: `https://www.okta.com/privacy-policy/`.
1. Click **Save Changes** at the bottom of the page.
1. At the top of the Dashboard page, select the **App Mode** slider and slide to switch the app from **Development** to
   **Live** mode.
1. In the **Switch to Live Mode** dialog box, click **Switch Mode**.

### Step 5: Create the Facebook Identity Provider in Okta

The next step is to create the Facebook Identity Provider in Okta.

1. Select **Security** > **Identity Providers** from the left navigation menu.
1. On the **Identity Providers** page, click **Add Identity Provider**.
1. In the drop-down menu that appears, select **Add Facebook**.
1. On the **Add Identity Provider - Facebook** page, enter a name (for example, Facebook IdP).
1. Keep **Idp Usage** set to the **SSO Only** default.
1. Set the **Client ID** and **Client Secret** to the **App ID** and **App Secret** that you copied in the previous step.
1. Keep the **Scopes** values set to the default: **public_profile** and **email**.
1. Click **Add Identity Provider**.

### Step 6: Add routing rule

The next step is to add a new routing rule.

1. Select **Security** > **Identity Providers** from the left navigation menu.
1. On the Identity Providers page, click **Routing Rules**.
1. Click **Add Routing Rule**.
1. Enter the **Rule Name** (for example, FB and Okta Rule).
1. From the **THEN Use this identity provider** drop-down list, select the Facebook Identity Provider that you just created. Since Okta is defaulted, the two values should be:
      * Okta
      * Facebook Identity Provider (IdP)
1. Click **Create Rule**.
1. At the prompt, click **Activate**.
1. Your new rule should appear above the **Default Rule** in the list to the
   left. This top position signifies that the settings in your new rule override
   the **Default Rule**.

</div>

### Download and set up the SDK and sample app

After you finish setting up your Okta org, the next step is to
download and set up the sample app and SDK. See
[Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/)
for further details.
