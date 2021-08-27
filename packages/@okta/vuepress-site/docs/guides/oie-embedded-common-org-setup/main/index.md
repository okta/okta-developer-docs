---
title: Get set up
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

## Overview

Okta provides two embedded identity solutions:

* **Embedded SDK only**: A highly customizable solution that provides native language support for a variety of identity
   use cases.
* **Embedded Widget + SDK**: A quick and easy to set up solution that moves most of the the heavy lifting to Okta. Although the amount of code that you need to write is small, many of the most advanced identity use cases (for example, social sign-in, multifactor authentication) are supported out of the box.

<div class="common-image-format">

![Displays Okta embedded solution components: (SDK) and (Sign-In Widget + SDK)](/img/oie-embedded-sdk/embedded-solution-overview.png)

</div>

This guide shows you how to set up your Okta org to support the embedded SDK or the embedded Widget with SDK solutions. Ensure that you [get set up](#get-set-up) with Okta and [set up your Okta org for your use case](#set-up-your-okta-org-for-your-use-case) before you [download and set up the SDK, Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).

## Get set up

Sample apps are provided for each solution to show you exactly how to integrate the SDK and the Widget into your own app. Before you can run the sample apps or integrate embedded authentication into your own app, you need to do the following:

1. [Create your Okta account](#create-your-okta-account)
1. [Update the default Custom Authorization Server](#update-the-default-custom-authorization-server)
1. [Create a new application](#create-a-new-application)

After you've created your app, you need to [set up your Okta org for your use case](#set-up-your-okta-org-for-your-use-case) scenario. 

<StackSelector class="cleaner-selector"/>

### Create your Okta account

If you don't have an Okta Identity Engine org, you need sign up for an Okta account and an Identity Engine org.

1. [Sign up](https://developer.okta.com/signup/oie.html) for an Okta account.

   After you sign up, Okta sends you a verify email with the email address that you provided.

1. Using the activate link in Okta's email, activate your account and provide a new password. Okta redirects you to the [Admin Console](https://developer.okta.com/docs/guides/quickstart/using-console/) of your new Identity Engine org.

### Update the default Custom Authorization Server

You need to configure your default Custom Authorization Server to enable the Interaction code flow.

1. From your Okta org's [Admin Console](/docs/guides/quickstart/using-console/), select **Security** > **API**.
1. On the **Authorization Servers** tab, select the pencil icon for the **default** Custom Authorization Server.
1. Select the **Access Policies** tab.
1. Select the pencil icon from the **Actions** column for the **Default Policy Rule**.
1. In the **Edit Rule** dialog box, select the **Interaction Code** check box.
1. Click **Update Rule**.

### Create a new application

Create an app integration representing the application you want to provide embedded authentication in Okta:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. <StackSelector snippet="applicationtype" noSelector />
1. <StackSelector snippet="newapp" noSelector />

   * Enter an application name.
   * Ensure that the **Interaction Code** check box is selected.
   * Select the **Refresh Token** check box.
   * Set **Sign-in redirect URIs** to: <StackSelector snippet="redirecturi" noSelector />

1. Click **Save**.

> **Note:** From the **General** tab of your app integration, save the generated **Client ID** and **Client secret** values to be used later on in your embedded solution.

<StackSelector snippet="appsbaseurl" noSelector />

## Set up your Okta org for your use case

After you've created your app integration in your Okta org, the next step is to configure your app and org to support the use case that you are implementing.

* For a basic password factor use case, see [Set up your Okta org for a password factor only use case](#set-up-your-okta-org-for-a-password-factor-only-use-case)
* For a multifactor use case, see [Set up your Okta org for a multifactor use case](#set-up-your-okta-org-for-a-multifactor-use-case)
* For a social sign-in use case, see [Set up your Okta org for a social IdP use case](#c#set-up-your-okta-org-for-a-social-idp-use-case)

### Set up your Okta org for a password factor only use case

This section shows you how to set up your Okta org and app to support password factor only use cases. These use cases are intended to use the password factor only without any additional factors (such as email or phone SMS). Perform the following configuration after you've [created a new app](#create-a-new-application) in your Okta org:

1. [Update the password authenticator to password only](#update-the-password-authenticator-to-password-only)
1. [Update your app sign-on policy with password only authentication](#update-your-app-sign-on-policy-with-password-only-authentication)

#### Update the password authenticator to password only

For password only authentication, you need to update the password authenticator policy rule to not require any additional verification.

1. In the Admin Console, go to **Security** > **Authenticators**.
1. Select **Edit** from the **Actions** menu on the **Password** authenticator row.
1. On the **Password** policy page, scroll down to the rules section and click the pencil icon next to the **Default Rule**.
1. In the **Edit Rule** dialog box, select **Not required** in the **AND Additional verification is** section.
1. Click **Update Rule**.

#### Update your app sign-on policy with password only authentication

1. In the Admin Console, go to **Applications** > **Applications**.
1. From the **Applications** page, select the [application that you've created](#create-a-new-application).
1. On the page for your application, select the **Sign On** tab.
1. In the **Sign On Policy** section, select the action menu icon (⋮) beside the **ENABLED** flag for **Catch-all Rule** and select **Edit**.
1. On the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with** drop-down menu and select **Password**.
1. Click **Save**.

### Set up your Okta org for a multifactor use case

This section shows you how to set up your Okta org and app to support the multifactor use cases available in this embedded authentication guide. The multifactor use cases presented in this guide use the email and phone factors, in addition to the password factor. Perform the following configuration after you've [created a new app](#create-a-new-application) to set up the email and phone factors in your Okta org:

1. [Set up the email authenticator for authentication and recovery](#set-up-the-email-authenticator-for-authentication-and-recovery)
1. [Add the phone authenticator for authentication and recovery](#add-the-phone-authenticator-for-authentication-and-recovery)
1. [Update your app sign-on policy with multifactor authentication](#update-your-app-sign-on-policy-with-multifactor-authentication)

#### Set up the email authenticator for authentication and recovery

1. In the Admin Console, select **Security** > **Authenticators**.
1. Select **Edit** from the **Actions** drop-down menu on the **Email** authenticator row.
1. In the **Used for** section, select the **Authentication and recovery** option for the **This authenticator can be used for** field.
1. Click **Save**.

#### Add the phone authenticator for authentication and recovery

1. In the Admin Console, select **Security** > **Authenticators**.
1. Click **Add Authenticator**.
1. On the **Add Authenticator** page, click **Add** for the **Phone** authenticator.
1. In the **Verification options** section, select **SMS** for the **User can verify with** field.

   > **Note:** Some SDKs support only SMS with a phone authenticator.

1. In the **Used for** section, select the **Authentication and recovery** option for the **This authenticator can be used for** field.
1. Click **Add**.

If your org already has the phone authenticator added, ensure that the **Authentication and recovery** option is selected for the **This authenticator can be used for** field for the phone authenticator.

#### Update your app sign-on policy with multifactor authentication

1. Select **Applications** > **Applications** from the left navigation menu.
1. From the **Applications** page, select the application that you created
   in [Set up your Okta org for password factor only use cases](#set-up-your-okta-org-for-password-factor-only-use-cases).
1. On the page for your application, select the **Sign On** tab.
1. In the **Sign On Policy** section, select the **Actions** menu icon (⋮) beside the **ENABLED** flag for **Catch-all Rule** and select **Edit**.
1. On the **Edit Rule** dialog box, scroll down to the **AND User must authenticate with** field and change it's value to **Password + Another Factor**.
1. Ensure that no values are selected for the **AND Possession factor constraints are** field.
1. Click **Save**.

### Set up your Okta org for a social IdP use case

This section describes how to set up your org to use Facebook as an Identity Provider. 

You can skip this section until you are ready to run through the above use case. Otherwise, the steps to add support for the Facebook social provider are
listed below.


#### Step 1: Create a Facebook app in Facebook

1. Go to [Facebook for Developers](https://developers.facebook.com/) and click the **Login** link. If you don't have an account, then create one.
1. Using these [instructions](https://developers.facebook.com/docs/apps/register) as a guide, create a Facebook app. Ensure that when you are creating the app, you select **None** as the app type.
1. After creating the app, on the [Apps](https://developers.facebook.com/apps/) page select the app that you just created.
1. On the **App** page, scroll to the **Add a product** section.
1. Click the **Set up** link in the **Facebook Login** tile.
1. On the first set up page, select **Web** as the platform type.
1. On the next page, set the value for **Site URL** to `https://${yourOktaDomain}/oauth2/v1/authorize/callback` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).
1. Click **Save** and then **Continue**.
1. Click through all the **Next** buttons until you run through all of the sections.
1. In the left navigation menu, click **Facebook Login** (under products) and then click **Settings**.
1. On the **Settings** page and under **Client OAuth Settings**, add the following URLs for the **Valid OAuth Redirect URIs** field:
      `https://${yourOktaDomain}/oauth2/v1/authorize/callback` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).
1. Click **Save Changes** at the bottom of the page.

#### Step 2: Copy the App ID and Secret

After you finish creating the app, the next step is to copy the **App ID** and **App Secret** for the next step where you set up the Facebook Identity Provider in the Okta org.

1. In the left navigation menu, click **Settings** and then **Basic**.
1. Copy the **App ID** and **App Secret** to an accessible place in preparation for the next step.

#### Step 3: Set up and copy test user information

A test account is required to test the social media sign in in development mode. Facebook automatically creates one test user that we can use for the Facebook use cases. Perform the following steps to find, set the password, and copy this user's information.

1. From the left navigation menu, click **Roles** and then **Test Users**.
1. When the list of users appears, there should be one test user. Select **Edit** for the test user and select **Change the name or password for this test user**.
1. In the Edit Test User dialog box, set a password for the **New Password** and **Confirm New Password** fields.
1. Click **Save**.
1. Copy or note the test user's **email** and **password** for when you perform the social media use cases.

#### Step 4: Optional: Switch to live mode

By default the Facebook app is in development mode and can only be used by the test users and the user that you used to sign in and create the Facebook app. As a result, when testing your social media use cases, you can only use these users to sign in to Facebook.

If you would like to use any public Facebook user, you need to set the app to live mode. To switch the app to live mode, do the following:

1. From the left navigation menu, click **Settings** and then **Basic**.
1. Set a value in the **Privacy Policy URL** field for your app. If you don't have one, you can temporarily use: `https://www.okta.com/privacy-policy/`.
1. Click **Save Changes** at the bottom of the page.
1. At the top of the Dashboard page, select the **App Mode** slider and slide to switch the app from **Development** to
   **Live** mode.
1. In the **Switch to Live Mode** dialog box, click **Switch Mode**.

#### Step 5: Create the Facebook Identity Provider in Okta

The next step is to create the Facebook Identity Provider in Okta.

1. Select **Security** > **Identity Providers** from the left navigation menu.
1. On the **Identity Providers** page, click **Add Identity Provider**.
1. In the drop-down list that appears, select **Add Facebook**.
1. On the **Add Identity Provider - Facebook** page, enter a name (for example, Facebook IdP).
1. Keep **Idp Usage** set to the **SSO Only** default.
1. Set the **Client ID** and **Client Secret** to the **App ID** and **App Secret** that you copied in the previous step.
1. Keep the **Scopes** values set to the default: **public_profile** and **email**.
1. Click **Add Identity Provider**.

#### Step 6: Add routing rule

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
1. Your new rule should appear above the **Default Rule** in the list to the left. This top position signifies that the settings in your new rule override
   the **Default Rule**.

</div>
