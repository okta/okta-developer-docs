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
1. **Step 2:** Setup your Okta org.

   1. To load the SDK and Widget and get started with the simple use cases
      go to [Setup your Okta org (for password factor only use cases)](#set-up-your-okta-org-for-password-factor-only-use-cases)

   1. **Recommended for later:** Once you've completed the basic use cases, advance to the more
      complex use cases by performing the following:

      1. [Set up your Okta org (for multi-factor use cases)](#set-up-your-okta-org-for-multi-factor-use-cases)
      1. [Set up your Okta org (for social identity providers)](#set-up-your-okta-org-for-social-identity-providers)

      > **Note:** It's recommended to skip these more advanced configurations
        until you got the basic use cases working.

After you have completed setting up the Okta org, [download and set up the SDK, widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/)

## Create your Okta account
The first step is to create an Okta account, if you have not already.
The steps are as follows:

1. Sign up for an Okta account using the provided links below:
   1. **Before July 20th, 2021 (Preview only):**
   [Sign-up](https://developer.okta.com/signup/oie-preview.html) for an Okta account.
   1. **After July 20th, 2021:** [Sign-up](https://developer.okta.com/signup/oie.html) for an Okta account.
      **Only use this link after the listed date.**

   After you sign up, Okta sends you a verify email with the email address that
   you provided.

1. Using the activate link in Okta’s email, activate your account
   providing a new password. Okta redirects you to the
   [Admin Console](https://developer.okta.com/docs/guides/quickstart/using-console/)
   dashboard.

## Set up your Okta org for password factor only use cases

The next step is to set up your Okta org so that you can connect your sample app
and any app that you're building, to the org. The setup includes creating a new org
application, updating the default authorization server’s settings, and
defining new org policies.

**This section discusses how to set up your Okta Org for password factor only
use cases.** These use cases are intended to use the password factor only
without any additional factors such as email and phone SMS. The use cases
that support this basic setup include:

**Widget**

* [Load the widget](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-load/)
* [Basic sign in using the widget](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-basic-sign-in/)
* [Sign in with Facebook](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-sign-in-soc-idp/)


**SDK**

* [Basic user sign in (password factor only)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-basic-sign-in/)
* [User sign out (local app)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-basic-sign-out/)
* [Sign in with a social identity provider (password factor only)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-sign-in-soc-idp/)

The steps are as follows:

### Step 1:  Update the custom authorization server named “default”
1. In the [Admin Console](/docs/guides/quickstart/using-console/)
   (for the Okta org you set up in the previous step), select
   ***Security > API*** from the left navigation menu.
1. In the **API** page under the **Authorization Servers** tab:
   1. Click on the **edit** pencil icon next to the default authorization
      server.
   1. In the default authorization server page, click on the
      **Access policies** tab. In the **Access policies** do
      the following:
      1. Under the **Default policy rule**, click on the **edit** icon.
      1. In the **Edit rule** page, select the **Interaction Code** checkbox
         if not already selected.
      1. Click **Update Rule**.

### Step 2: Update the authenticators for password factor only use cases
1. Select **Security > Authenticators** from the left navigation menu.
1. From the **Authenticators** page, perform the following steps:
   1. Select the **Actions** link from the **Password** authenticator row.
   1. Click the **Edit** submenu.
   1. From the **Password default policy** page, scroll down to the rules section.
   1. Click on the pencil icon next to the default rule.
   1. In the edit rule page, set the **Additional verification is** field to **Not Required**.
   1. Click **Update Rule**.

### Step 3: Add a trusted origin and enable CORS

1. Select **Security > API** from the left navigation menu.
1. On the **API** page, click **Trusted Origins**:
1. Under the Trusted Origins tab click on **Add Origin**.
   1. In the Add Origin dialog do the following:
      1. Set a origin name (for example, MyOrigin)
      1. Add the url of your app. If you are using the
         sample app, use `https://localhost:44314/`
      1. Under Type, select the **CORS** and **Redirect** checkboxes.
      1. Click **Save**.

### Step 4:  Create new application
1. Select **Applications > Applications** from the left navigation menu.
1. From the **Applications** page, click **Create App Integration**.
1. From the **Add Applications** page, click **Create New App**.
1. In the **Create New Application Integration** dialog:
   1. Select **OIDC - OpenID Connect** as the Sign-on method.
   1. Select **Web Application** as application type.
   1. Click **Next**.
1. On the **New Web App Integration** page:
   1. Enter an application name
   1. Select the **Interactions Code** checkbox if not already selected.
   1. Set **Sign-in redirect URIs** to:
      <StackSelector snippet="redirecturi" noSelector />
   1. Click **Save**.
1. Select the **Sign on** tab:
   1. Under **Sign on Policy** note the **Available Authenticators**. The value
      should be **1 factor** which is **Password**. (If you are coming back to this
      step after completing
      [Set up your Okta org (for multi-factor use cases)](#set-up-your-okta-org-for-multi-factor-use-cases)
      then set this value to **Password**. Currenly, if there are multiple factors
      defined in the Okta org but the application uses only one factor, it must
      be **password**.)

## Set up your Okta org for multi-factor use cases

This section sets up your org for the multi factor use cases. These use cases
include:

**SDK**

* [Sign in (password and email factor)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-sign-in-pwd-email/)
* [Sign in (password and phone factor)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-sign-in-pwd-phone/)
* [User password recovery (password and email factors)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-pwd-recovery-mfa/)
* [Self user registration (email and optional phone factor)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-self-reg/)

> **Note:** It is recommended to skip this step if you are just getting started with the
sample app and like to run the basic use cases listed in
[Set up your Okta org (for password factor only use cases)](#set-up-your-okta-org-for-password-factor-only-use-cases).

If you have completed the basic use cases or simply want to move on to more
complex multi factor use cases, continue with the steps below.

The steps to enable these factors are as follows:

### Step 1: Setup the authenticators for multi-factor use cases
1. In the Admin Console,
   select **Security > Authenticators** from the left navigation menu.
1. From the **Authenticators page**, perform the following steps:

#### Step 1a:  Setup the email authenticator for authentication
1. Select the **Actions** link from the **Email** authenticator row.
1. Click the **Edit** submenu.
1. In the **User for** section, select the
   **Authentication and password reset** option for the
   **This authenticator can be used for** field.
1. Click the **Save** button.

#### Step 1b:  Setup the password authenticator for authentication
1. Select the **Actions** link from the **password** authenticator row.
1. Click the **Edit** submenu.
1. In the **User for** section, select the
   **Authentication and password reset** option for the
   **This authenticator can be used for** field.
1. Click the **Save** button.

#### Step 1c:  Add the phone authenticator
1. Click on **Add Authenticator**.
1. On the **Add Authenticator** page, click **Add** for the
   **Phone** authenticator.
1. In the **Verification options** section, select **SMS** for the
   **User can verify with field**.

    >  **Note**: Currently, the SDK only works with a phone authenticator
    setup for SMS.
1. In the **Used for** section, select **Authentication and password reset**
   for the **This authenticator can be used for** field.
1. Click the **Add** button.

#### Step 2: Update Application sign on policy for multiple factors
1. Select **Applications > Applications** from the left navigation menu.
1. From the **Applications** page, click on the application name you created
   in [Set up your Okta org for password factor only use cases](#set-up-your-okta-org-for-password-factor-only-use-cases).
1. On the page for your application, select the **Sign on** tab.
1. Under **Sign on Policy** select the **Actions** menu icon (⋮) beside
   the **ENABLED** flag for the **Catch-all** rule and select **Edit**.
   1. In the **Edit** Rule page scroll down to the **User must authenticate with**
   field and change it’s value to **Password + Another Factor**.
   1. Ensure that no values are checked for the
   **Possession factor constraints are** field.
   1. Click **Save**.

## Set up your Okta org for social identity providers

This section describes how to set up your org for the facebook social identity
provider. The use cases requiring this setup are as follows:

**Widget**

* [Sign in with Facebook](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-sign-in-soc-idp/)

**SDK**

* [Sign in with Facebook (password factor only)](/docs/guides/oie-embedded-sdk-use-cases/aspnet/oie-embedded-sdk-use-case-sign-in-soc-idp/)

You can skip this section until you are ready to run through the above use
case. Otherwise, the steps to add support for the Facebook social provider are
listed below.

> **Note:** It is recommended to skip this step if you are just getting started with the
sample app and like to run the basic use cases listed in
[Set up your Okta org (for password factor only use cases)](#set-up-your-okta-org-for-password-factor-only-use-cases).

### Step 1: Create a Facebook app in Facebook

#### Step 1a:  Create the app

1. Go to [Facebook for Developers](https://developers.facebook.com/) and click
   on the **Login** link. If you don’t have a login, then create an account.
1. Using these [instructions](https://developers.facebook.com/docs/apps/register)
   as a guide, create a Facebook app. Ensure when you are creating the app, you
   select None as the app type.
1. After creating the app, in the [Apps](https://developers.facebook.com/apps/)
   page select the App you just created.
1. In the **App** page, scroll to the **Add a product** section.
    1. Click the **Set up** link in the **Facebook Login** tile.
    1. On the first set up page, select **web** as the platform type.
    1. On the next page, set the value for **Site URL** to
   `https://{Okta org domain}/oauth2/v1/authorize/callback`
    (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).
    1. Click **Save** and then **Continue**.
    1. Click through all the **Next** buttons until you run through all the
       sections.
1. In the left navigation menu, click on **Facebook Login** (under products)
   and then click **Settings**.
   1. In the **Settings** page and under **Client OAuth Settings**, add the
      following urls for the  **Valid OAuth Redirect URIs**. field:
      `https://{Okta org domain}/oauth2/v1/authorize/callback`
      (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).
   1. Click the **Save Changes** button at the bottom of the page to save
      your changes.

#### Step 1b:  Copy the App ID and Secret

After you have completed creating the app, the next step is to copy the
**App ID** and **sApp ecret** for the next step where you will set up the Facebook social
provider in the Okta org.

1. In the left navigation menu, click on **Settings** which will display
   the **Basic** sub menu.
1. Click **Basic** and copy the **App ID** and **App Secret** to an easy
   accessible place in preparation for the next step.

### Step 3: Setup and copy test user information

In order to test the social media login in development mode, a test account is
required. Facebook automatically creates one test user which we will use for
the Facebook use cases. Perform the following steps to find, set the
password, and copy this user’s information.

1. In the left navigation menu, click on **Roles** which will display the test
   users sub menu.
1. Click **Test users**.
1. When the list of users appears, there should be one test user. Select the
   **Edit** button for the user and select the
   **Change the name or password for this test user**.
1. In the Edit Test User window, set a password for the **New Password** and
   **Confirm New Password** fields.
1. Click Save.
1. Copy or note the test user’s **email** and **password** for when you
   perform the social media use cases.

### Step 4: Optional: Switch to live mode

By default the Facebook app is in development mode and can only be used by the
test users and the user you used to sign in and create the Facebook app. As a
result, when testing your social media use cases, you can only use these users
to sign in to Facebook.

If you would like to use any public Facebook user, you need to set the app to
live mode. In order to switch the app to live mode, perform the following
steps:

1. In the left navigation menu, click on **Settings** which will display the
   **Basic** sub menu.
1. Click **Basic**. In the **Basic settings** page do the following:
  1. Set a value in the Privacy Policy URL for your app.  If you don’t
     have one you can temporarily use:  `https://www.okta.com/privacy-policy/`.
  1. Click **Save Changes** at the bottom of the page.
1. On the top of the dashboard screen, select the **In development** slider to
   switch the app to Live mode.
1. In the **Switch to Live Mode?** dialog box, click on the **Switch Mode**
   button.

### Step 5: Create the Facebook identity provider in Okta
The next step is to create the Facebook identity provider in Okta.

1. Select **Security > Identity Providers** from the left navigation menu.
1. In the **Identity Providers** page click the **Add Identity Provider**
   button. (A dropdown menu will appear.)
1. In the dropdown menu, select **Add Facebook**.
1. In the **Add Identity Provider – Facebook** page, do the following:
  1. Enter a name (for example, Facebook IdP)
  1. Keep **Idp Usage** set to the **SSO Only** default.
  1. Set the **Client ID** and **Client Secret** to the **App ID** and
     **Secret** you copied in the previous step.
  1. Keep the **Scopes** values to the default: **public_profile** and
     **default**.
  1. Click the **Add Identity Provider** button to save the settings.

### Step 6: Add routing rule

The next step is to add a new routing rule.

1. Select **Security > Identity Providers** from the left navigation menu.
1. On the Identity Providers page, click **Routing rules**.
1. Click **Add Routing Rule**.
   1. In the **Add Rule** page do the following:
   1. Set a value for the **Rule Name** (for example, FB and Okta Rule)
   1. Add the **Facebook identity provider** for the **Use this identity provider**
      field. Since Okta is defaulted, the two values should be:
      1. Okta
      1. Facebook Identity Provider (IdP)
   1. Click **Create Rule**.
   1. A prompt will appear asking whether you like to Activate the rule. Click
      the **Activate** button.
1. Your new rule should appear above the **Default Rule** in the list to the
   left. This top position signifies the settings in your new rule override
   the **Default Rule**.

</div>

### Download and set up the SDK and sample app

Once you have completed setting up your Okta org, the next step is to
download and set up the sample app and SDK.  See
[Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/)
for further details.
