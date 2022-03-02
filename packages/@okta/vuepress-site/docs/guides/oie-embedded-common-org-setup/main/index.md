---
title: Get set up
---

<ApiLifecycle access="ie" />

This guide covers how to create and set up your Okta org before you can run the provided sample apps or integrate the SDK or Widget into your own app.

---

**Learning outcomes**

Get a new org set up and ready for various use cases.

**What you need**

[Okta Developer Edition organization](https://developer.okta.com/signup/oie-preview.html)

---

## Overview of the embedded identity solutions

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

### Create your Okta account

If you don't have an Okta Identity Engine org, you need to sign up for an Okta account and an Identity Engine org.

1. [Sign up](https://developer.okta.com/signup/oie.html) for an Okta account.

   After you sign up, Okta sends a verification email to the email address that you provide.

1. Using the activate link in Okta's email, activate your account and provide a new password. Okta redirects you to the [Admin Console](/docs/concepts/okta-organizations/#admin-console) of your new Identity Engine org.

### Update the default Custom Authorization Server

You need to configure your default Custom Authorization Server to enable the Interaction Code flow.

1. From your Okta org's [Admin Console](/docs/concepts/okta-organizations/#admin-console), select **Security** > **API**.
1. On the **Authorization Servers** tab, select the pencil icon for the **default** Custom Authorization Server.
1. Select the **Access Policies** tab.
1. Select the pencil icon from the **Actions** column for the **Default Policy Rule**.
1. In the **Edit Rule** dialog box, select the **Interaction Code** check box.
1. Click **Update Rule**.

### Create a new application

Create an app integration that represents the application you want to add authentication to with Okta:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. <StackSnippet snippet="applicationtype" />
1. <StackSnippet snippet="newapp" />

   * Enter an application name.
   * Ensure that the **Interaction Code** check box is selected.
   * Select the **Refresh Token** check box.
   * Set **Sign-in redirect URIs** to <StackSnippet snippet="redirecturi" inline />

1. Click **Save**.
1. On the **General** tab, save the generated **Client ID** value (and if applicable, the **Client secret** value) that is used later on in your embedded solution.

   > **Note:** New apps are automatically assigned the shared default authentication policy that has a catch-all rule that allows a user access to the app using one factor. To view more information on the default authentication policy, from the left navigation pane, select **Security** > **Authentication Polices** and then select **Default Policy**.

<StackSnippet snippet="appsbaseurl" />

## Set up your Okta org for your use case

After you've created your app integration in your Okta org, the next step is to configure your app and org to support the use case that you're implementing.

* For a basic password factor use case, see [Set up your Okta org for a password factor-only use case](#set-up-your-okta-org-for-a-password-factor-only-use-case)
* For a multifactor use case, see [Set up your Okta org for a multifactor use case](#set-up-your-okta-org-for-a-multifactor-use-case)
* For a social sign-in use case, see [Set up your Okta org for a social IdP use case](#set-up-your-okta-org-for-a-social-idp-use-case)

### Set up your Okta org for a password factor only use case

This section shows you how to set up your Okta org and app to support password factor only use cases. These use cases are intended to use the password factor without any additional factors (such as email or phone SMS). In the [Create a new application](#create-a-new-application) section, your new app was automatically assigned to the shared default authentication policy that has a catch-all rule that allows a user access to the app using one factor. In the next section, follow the steps to finish setting up your Okta org for a password factor only use case.

#### Update the password authenticator to password only

For password-only authentication, you need to update the password authenticator policy rule to not require any additional verification.

1. In the Admin Console, go to **Security** > **Authenticators**.
1. Select **Edit** from the **Actions** menu on the **Password** authenticator row.
1. On the **Password** policy page, scroll down to the rules section and click the pencil icon next to the **Default Rule**.
1. In the **Edit Rule** dialog box, select **Not required** in the **AND Additional verification is** section.
1. Click **Update Rule**.

### Set up your Okta org for a multifactor use case

This section shows you how to set up your Okta org and app to support the multifactor use cases available in this embedded authentication guide. In addition to the password factor, the multifactor use cases presented in this guide use the email and phone factors. Perform the following configuration after you've [created a new app](#create-a-new-application) to set up the email and phone factors in your Okta org:

1. [Set up the email authenticator for authentication and recovery](#_1-set-up-the-email-authenticator-for-authentication-and-recovery)
1. [Add the phone authenticator for authentication and recovery](#_2-add-the-phone-authenticator-for-authentication-and-recovery)
1. [Update your authentication policy with multifactor authentication](#_3-update-your-app-sign-on-policy-with-multifactor-authentication)

> **Note:** The multifactor use cases in this guide implement the password, email, and phone factors. However, there are other supported factors that you can use in your embedded authentication app. See [Multifactor Authentication](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-authenticators).

#### 1: Set up the email authenticator for authentication and recovery

1. In the Admin Console, select **Security** > **Authenticators**.
1. Select **Edit** from the **Actions** drop-down menu on the **Email** authenticator row.
1. In the **Used for** section, select **Authentication and recovery** for the **This authenticator can be used for** field.
1. Click **Save**.

#### 2: Add the phone authenticator for authentication and recovery

**Note:** If your org already has the phone authenticator added, ensure that the **Authentication and recovery** option is selected for the **This authenticator can be used for** field.

1. To add the phone authenticator, select **Security** > **Authenticators** in the Admin Console.
1. Click **Add Authenticator**.
1. On the **Add Authenticator** page, click **Add** for the **Phone** authenticator.
1. In the **Verification options** section, select **SMS** for the **User can verify with** field.

   > **Note:** Some SDKs support only SMS with a phone authenticator.

1. In the **Used for** section, select **Authentication and recovery** for the **This authenticator can be used for** field.
1. Click **Add**.

#### 3: Update your authentication policy with multifactor authentication

1. In the Admin Console, go to **Security** > **Authentication Policies**.
1. On the Authentication polices page, select **Default Policy** as this is the policy that the [app that you created](#create-a-new-application) is assigned to.
1. Select **Edit** from the **Actions** menu for the **Catch-all Rule**.
1. On the **Edit Rule** dialog, scroll down to the **AND User must authenticate with** dropdown menu and select **Password/IdP + Another Factor**.
1. Ensure that no options are selected for the **AND Possession factor constraints are** field.
1. Click **Save**.

   > **Note:** Remember that since the default authentication policy is a shared policy, changes you make are applied to both new and existing apps that are assigned to it.

### Set up your Okta org for a social IdP use case

This section shows you how to set up your Okta org and app to support Facebook IdP use cases that are available in this embedded authentication guide. If you want to implement a use case with another social IdP, see [Add an external Identity Provider](/docs/guides/identity-providers/) for the list of Okta-supported social IdPs and instructions on how to configure them for social authentication with Okta.

Perform the following configurations after you've [created a new app](#create-a-new-application) to set up the Facebook IdP and your Okta org:

1. [Create a Facebook app in Facebook](#_1-create-a-facebook-app-in-facebook)
1. [Set up the Facebook test user](#_2-set-up-the-facebook-test-user)
1. [(Optional) Switch your Facebook app to Live mode](#_3-optional-switch-your-facebook-app-to-live-mode) &mdash; this step is not required if you want to remain in Facebook Development mode
1. [Create the Facebook Identity Provider in Okta](#_4-create-the-facebook-identity-provider-in-okta)
1. [Add an Identity Provider routing rule in Okta](#_5-add-an-identity-provider-routing-rule-in-okta)

#### 1: Create a Facebook app in Facebook

1. Go to [Facebook for Developers](https://developers.facebook.com/) and click the **Login** link. If you don't have an account, then create one.
1. Using these Facebook [instructions](https://developers.facebook.com/docs/apps/register) as a guide, create a Facebook app. When you create the Facebook app, ensure that you select **None** as the app type.
1. From the Facebook [Apps](https://developers.facebook.com/apps/) page, select the app that you just created.
1. On the App Dashboard page, scroll to the **Add a product** section.
1. Click the **Set up** link in the **Facebook Login** tile.
1. On the first set up page, select **Web** as the platform type.
1. On the next page, set the value for **Site URL** to `https://${yourOktaDomain}/oauth2/v1/authorize/callback` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).
1. Click **Save** and then **Continue**.
1. Click through all the **Next** buttons until you run through all of the sections.
1. In the left navigation menu, click **Facebook Login** (under products) and then click **Settings**.
1. On the **Settings** page and under **Client OAuth Settings**, add the following URLs for the **Valid OAuth Redirect URIs** field:
      `https://${yourOktaDomain}/oauth2/v1/authorize/callback` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).
1. Click **Save Changes** at the bottom of the page.
1. On the App Dashboard page, expand **Settings** on the left side of the page, and then click **Basic**.
1. Save the **App ID** and the **App Secret** values so you can add them to your Okta org's Identity Provider settings.

#### 2: Set up the Facebook test user

A test account is required to test Facebook sign-in in Development mode. Facebook automatically creates one test user for you. Perform the following steps to find, set the password, and save this user's information.

1. From the Facebook App Dashboard page, click **Roles** and then click **Test Users**.
1. Click **Edit** for the test user and select **Change the name or password for this test user**.
1. In the **Edit Test User** dialog box, set a password in the **New Password** and **Confirm New Password** fields.
1. Click **Save**.
1. Save the test user's **email** and **password** for testing social IdP sign-in use cases with Okta and Facebook.

#### 3 (Optional): Switch your Facebook app to Live mode

By default, your Facebook app is in Development mode and can only be used by the test user and the user that you used to sign in and create the Facebook app. As a result, you can only use these users when you test your Facebook sign-in use cases.

If you would like to sign in any public Facebook user, you need to set the Facebook app to Live mode. To switch your Facebook app to Live mode, perform the following steps:

1. From the Facebook App Dashboard page, click **Settings** and then click **Basic**.
1. Specify a value in the **Privacy Policy URL** field for your app. If you don't have a privacy URL, you can temporarily use: `https://www.okta.com/privacy-policy/`.
1. Click **Save Changes** at the bottom of the page.
1. At the top of the App Dashboard page, use the **App Mode** toggle to switch the app from **In development** to **Live** mode.
1. In the **Switch to Live Mode** dialog box, click **Switch Mode**.

#### 4: Create the Facebook Identity Provider in Okta

To connect your org to Facebook, you need to add and configure the Facebook IdP in Okta. The following steps assume that you have already [created and configured your Facebook app](#_1-create-a-facebook-app-in-facebook) and that you have the Facebook **App ID** and **App Secret** values available.

1. In the Admin Console, go to **Security** > **Identity Providers**.
1. Click **Add Identity Provider** and then select **Add Facebook**.
1. On the **Add Identity Provider - Facebook** page, enter a name (for example, Facebook IdP).
1. Keep the default **SSO Only** option for the **Idp Usage** field.
1. Specify the Facebook **App ID** value as the **Client ID**.
1. Specify the Facebook **App Secret** value as the **Client Secret**.
1. Keep the default values for **public_profile** and **email** in the **Scopes** field.
1. Click **Add Identity Provider**.

#### 5: Add an Identity Provider routing rule in Okta

The final step is to add the [created Facebook IdP](#_4-create-the-facebook-identity-provider-in-okta) to the routing rule.

1. In the Admin Console, go to **Security** > **Identity Providers**.
1. On the Identity Providers page, click the **Routing Rules** tab.
1. Click **Add Routing Rule**.
1. Specify the **Rule Name** (for example, FB and Okta Rule).
1. From the **THEN Use this identity provider** drop-down list, select the [Facebook Identity Provider that you've just created](#_4-create-the-facebook-identity-provider-in-okta). Since Okta is the default IdP, the two values should be:

   * Okta
   * Facebook Identity Provider (IdP)

1. Click **Create Rule**.
1. At the prompt, click **Activate**.
1. Your new rule appears above the **Default Rule** in the routing rule list. This top position signifies that the setting in your new rule overrides the **Default Rule**.