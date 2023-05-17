---
title: Use redirect auth with the Identity Engine sample apps
excerpt: Learn how to test some of the features of Okta Identity Engine with our sample apps
layout: Guides
---

<ApiLifecycle access="ie" />

This guide covers how to set up an Okta sample app to demonstrate some Identity Engine features. Among the many set up options available with the Okta sample apps, the apps can redirect to Okta's Sign-In Widget, or to a social Identity Provider like Facebook, for authentication.

---

**Learning outcomes**

* Create, set up, and install an Okta OAuth 2.0 app.
* Enroll and authenticate a user.
* Enable self-service enrollment and enable a second factor for authentication.
* Use email and Okta Verify as recovery options.
* Add a profile attribute to the Profile Enrollment Policy.
* Route users to an external IdP.

**What you need**

[Sample app](/docs/guides/oie-embedded-common-download-setup-app)

---

## Use case scenarios

The following scenarios are included in this guide:

* [Simple enrollment and authentication](#simple-enrollment-and-authentication)
* [Enable self-service enrollment](#enable-self-service-enrollment)
* [Add MFA with a mandatory second factor](#add-mfa-with-a-mandatory-second-factor)
* [Authenticator recovery](#authenticator-recovery)
* [Progressive Profiling](#progressive-profiling)
* [Identity Provider routing to Facebook](#identity-provider-routing-to-facebook)

## Initial set up

To get started, you need to create an Okta OAuth app to represent the <StackSnippet snippet="applang" inline /> app and then install the <StackSnippet snippet="applang" inline /> sample app.

<StackSnippet snippet="toolnote" />

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Create App Integration**.
3. In the dialog box that appears, select **OIDC - OpenID Connect** as the **Sign-on method**, <StackSnippet snippet="apptype" inline /> as the **Application type**, and then click **Next**.
4. Fill in the New <StackSnippet snippet="apptypepage" inline /> Integration fields that you need, and then click **Save**:

   * Be sure to add the following values (or leave the defaults if they match):

      **Sign-in redirect URIs**: <StackSnippet snippet="signinredirecturi" inline /><br>
      **Sign-out redirect URIs**: <StackSnippet snippet="signoutredirecturi" inline />

   * In the **Assignments** section, select **Allow everyone in your organization to access**. This assigns all Users in the Everyone Group to the app. You must assign the app to either the Everyone Group or a custom Group that you create so that profile enrollment functions correctly.
5. On the new Application page, click the "Copy to clipboard" icon to copy the <StackSnippet snippet="clientidsd" inline />. Store this information temporarily for use when you <StackSnippet snippet="configfile" inline /> in the next section.

<StackSnippet snippet="corsissuer" />

### Install the sample app

<StackSnippet snippet="installsampleapp" />

<!--
Once sample download is working we can provide these instructions instead:
7. From the **General** tab, click **Download sample app**, and then select **React**. (NOTE: THIS WILL NOT WORK UNTIL THE 2021-03-12 CODE FREEZE??) This file contains the [React sample application](https://github.com/okta/samples-js-react) pre-configured with the settings of the Application that you just created. Your application settings are saved in the `testenv` file in the root directory.
8. You can extract the ZIP file and then open the `samples-js-react` directory from the command line.
9. Enter the okta-hosted-login subdirectory and run `npm install`.
-->

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

<StackSnippet snippet="simpleenrollauth" />

4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
    > **Note:** Which authenticators appear during sign-in depends on how your [authentication policy](/docs/guides/configure-signon-policy/main/#authentication-policies) is configured.
5. Click <StackSnippet snippet="tryenrollout" inline /> to sign out of the <StackSnippet snippet="applang" inline /> app.

## Enable self-service enrollment

This section walks you through enabling self-service enrollment for the Sign-In Widget and then trying self-service enrollment with a user.

> **Note:** This section assumes that you followed the "Initial set up" and "Simple enrollment and authentication" sections above. The steps may be different if you didn't.

1. In the Admin Console, select **Security** > **Profile Enrollment**, and then select **Add Profile Enrollment Policy**.
2. Give your Policy a **Name** and then click **Save**.
3. On the Profile Enrollment page, select the pencil icon for your new Policy from the **Actions** column.
4. On the Policy page, click **Manage Apps** and then click **Add an App to This Policy**.
5. Locate the <StackSnippet snippet="applang" inline /> app that you created earlier, click **Apply**, and then **Close**.
6. Click **Back to Profile Enrollment Policy**.
7. Click **Edit** in the **Profile Enrollment** section.
8. Set **Self-service registration** to **Allowed**, and then click **Save**.

> **Note:** See [Manage Profile Enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).

### Try enrollment

This section walks you through the self-service enrollment steps for a new user.

<!-- >> **Note:** Enrollment uses the **Email Factor verification** email template that you can edit. See [Edit a default email template](/docs/guides/custom-email/main/#edit-a-default-email-template). -->

<StackSnippet snippet="tryenrollin" />

3. In the Okta Sign-In Widget, click **Sign up** just below the **Forgot password?** link.
4. Enter the requested information, and then click **Sign Up**.
5. Set up the Email and Password authenticators. Don't set up any other authenticators.

    > **Note:** Be sure to copy the code from the email and paste it into the Sign-In Widget to manually verify the email address rather than using the **Verify Email Address** button.

6. After you complete set up, click **Finish**. You are redirected to the app's welcome page.
7. Click <StackSnippet snippet="tryenrollout" inline /> to sign out of the <StackSnippet snippet="applang" inline /> app.

## Enable self-service password-optional enrollment

To enable self-service password-optional enrollments in the Sign-In Widget, <StackSnippet snippet="setuppwdoptional" inline/>. After completing the setup, try a password-optional enrollment with the following steps:

<StackSnippet snippet="tryenrollin" />

3. In the Okta Sign-In Widget, click **Sign up**.
4. Enter the email, first and last name, and then click **Sign Up**.
5. Verify your email address by clicking **Verify Email Address** in the email sent by Okta.

    > **Note:** Alternatively, you can verify your email address by copying the one-time passcode from the email into the Sign-In Widget.

5. Click **Set up later** for all the optional authenticators. The app redirects you to the home page.
6. Click <StackSnippet snippet="tryenrollout" inline /> to sign out of the <StackSnippet snippet="applang" inline /> app.

## Add MFA with a mandatory second factor

You can modify the application's authentication policy to require the user to have a second factor enabled for authentication. In this example, we use the Phone authenticator.

> **Note:** Your Okta org may have different Authenticators enabled by default.

### Enable multifactor authentication

1. Ensure that your org has the Phone authenticator enabled by going to **Security** > **Authenticators** and checking that **Phone** is listed.

    If it isn't listed, add it:
    * Click **Add Authenticator**, and then click **Add** in the **Phone** authentication box.
    * Set **This authenticator can be used for** to **Authentication and recovery**, and click **Add**.

2. From the side navigation, select **Applications** > **Applications** and then select the app integration that you created earlier.
3. Select the **Sign On** tab.
4. Scroll down to the **User authentication** section and click **Edit**.
5. From the **Authentication policy** dropdown menu, select **Any two factors** and click **Save**.

### Try multifactor authentication

<StackSnippet snippet="tryenrollin" />

3. Enter the credentials of the user that you enrolled with earlier. The Set up security methods page appears, prompting you to set up either the Okta Verify app or the Phone authenticator.
4. Under **Phone**, click **Set up**.
5. Fill out the requested phone authentication information and verify your phone with a code.
6. Under **Set up optional**, click **Set up later**. You are redirected to the <StackSnippet snippet="applang" inline /> welcome page.
7. Click <StackSnippet snippet="tryenrollout" inline /> to sign out of the <StackSnippet snippet="applang" inline /> app.

## Self-service Password Recovery

<!-- >> **Note:** Self-service Password Recovery uses the **Forgot Password** email template that you can edit. See [Edit a default email template](/docs/guides/custom-email/main/#edit-a-default-email-template). -->

### Password recovery with email magic link

> **Note:** In your org, password reset is configured by default to be initiated with an email. The steps in this section assume that you haven't changed that default configuration.

<!-- #### Understand the magic link flow

Before integrating email magic links in your app, it's important to understand how your app's user journey starts and ends. An example user journey for a sign-in with email use case:

1. Using the widget, a user submits their username and password. Next, an email is sent to the user and the widget displays an OTP input page.
1. Using a new tab in the browser, the user opens their email and clicks the magic link.
1. In a new tab, the link redirects the browser to the app and automatically signs the user in.

The following diagram illustrates these steps:

![Email magic link flow for redirect auth](/img/authenticators-email-magic-link-summary-redirect-flow-overview.png "Image title") -->

Try the email magic link recovery flow:

1. Select **Forgot password?** in the Sign-In Widget.
1. Enter your email or username when prompted and click **Next**.
1. Click **Send me an email**. A magic link is sent to your email address.
1. Click **Sign In**. A new window opens and you are automatically signed in.

### Password recovery with email OTP

> **Note:** In your org, password reset is configured by default to be initiated with an email. The steps in this section assume that you haven't changed that default configuration.

Try out the email password recovery flow:

1. Select **Forgot password?** in the Sign-In Widget.
1. Enter your email or username when prompted and click **Next**.
1. Click **Select** for the Email authenticator. An OTP code is sent to your email address. Manually copy the code from the email.
1. In the widget, click **Enter a code from the email instead**, paste the code and click **Verify**.
1. Enter a new password.
1. After you enter the new password successfully, you are prompted for the additional phone authentication that you set up in [Enable multifactor authentication](#enable-multifactor-authentication). Then, you are redirected to the <StackSnippet snippet="applang" inline /> welcome page.
1. Click <StackSnippet snippet="tryenrollout" inline /> to sign out of the <StackSnippet snippet="applang" inline /> app.

### Okta Verify recovery flow

In addition to recovering your password with an email, you can add Okta Verify as a recovery option.

1. Go to **Security** > **Authenticators**.
2. Click **Actions** beside the Password Authenticator, and then click **Edit**.
3. In the **Add Rule** section at the bottom of the page, click the pencil icon for the Default Rule.
4. In the **Recovery authenticators** section, locate **AND Users can initiate recovery with**.
5. Select **Okta Verify (Push notification only)** and click **Update Rule**.
6. [Enroll a new user](#try-enrollment), ensuring that this time you also enroll Okta Verify.
7. Sign in with your new user to confirm that you added the user correctly, and then click <StackSnippet snippet="tryenrollout" inline />.
8. Back on the welcome page of the <StackSnippet snippet="applang" inline /> app, click <StackSnippet snippet="appsignin" inline />.
9. After you are redirected to the Sign-In Widget, click **Forgot password?**.
10. Enter the email address of the user that you just created with Okta Verify as a factor, and then click **Next**.
11. On the next page, click **Select** beside **Get a push notification**. You should receive a push notification in Okta Verify. Respond appropriately.
12. Enter the answer to your security question, and then you are asked to reset your password.
13. When you finish, the <StackSnippet snippet="applang" inline /> welcome page appears.
14. Click <StackSnippet snippet="tryenrollout" inline /> to sign out of the <StackSnippet snippet="applang" inline /> app.

## Progressive Profiling

> **Note:** To use Progressive Profiling, you must disable the Self-Service Registration feature. Contact [Support](https://support.okta.com/help/s/opencase) for help.

Okta gives you the ability to check for what data is required from a user before they can access an app. For example, you can change the required user profile information for the same app, or handle SSO between two apps with different profile requirements. In this example, we add a required profile attribute, and the user we have already enrolled is asked for this information when they next authenticate.

When we enrolled our test user, the user was only prompted for first and last name, as well as their email and a password. Now add an additional required property to the Profile Enrollment Policy.

1. In the Admin Console side navigation, select **Security** > **Profile Enrollment**.
2. Find the profile that you created for self-service enrollment and click the pencil icon in the **Actions** column.
3. In the **Enrollment Settings** section, click the **Actions** menu icon (&#8942;) beside the **ENABLED** flag and select **Edit**.
4. In the Edit Rule dialog box, click **Add Another** and enter the following:

    * **Fields**: `region`
    * **Form label**: `Region`

5. Select the **Required** check box, and then click **Save**.
6. From the side navigation, select **Directory** > **Profile Editor**.
7. Under **Filters**, select **Okta**, and then click the pencil icon for the **User (default)** Profile.
8. Under **Attributes**, click **Add Attribute**, and then fill out the dialog box that appears with the following values. The other fields are optional and can be left blank. Click **Save** when you finish.

    * **Data type**: `string`
    * **Display name**: `Region`
    * **Variable name**: `region`

9. Find the **Region** attribute that you just created and click the pencil icon beside it.
10. In the **Region** dialog box that appears, set **User permission** to **Read-Write**, and then click **Save Attribute**.

> **Note:** You can check which User Attributes are required for your Directory by clicking the Information icon beside each Attribute. By default, **First name** and **Last name** are marked as required, in addition to what you specify in your Enrollment Policy.

11. Now try to authenticate using one of the same users as in the previous steps. You are prompted with a **Region** field and a **Sign Up** button. After you add a value, you can confirm that it is saved by accessing **Directory** > **People** in the Admin Console, locating the correct user, and selecting their **Profile** tab. If you try to register a new user, you see the **Region** field added to the **Create Account** page.

## Identity Provider routing to Facebook

Instead of signing in to Okta, it is possible to route users to an external Identity Provider (IdP) using Okta's IdP Routing Rules.

> **Note:** For B2B scenarios, you may want to add a SAML 2.0 Identity Provider rather than a social Identity Provider. See [Add an external Identity Provider](/docs/guides/add-an-external-idp/saml2/before-you-begin/).

### Create a Facebook App

1. Go to [Facebook for Developers](https://developers.facebook.com/docs/development/register) and register for a developer account if you haven't already done so.
2. Access the [Facebook App Dashboard](https://developers.facebook.com/apps).
3. Create a Facebook app using these [instructions](https://developers.facebook.com/docs/development/create-an-app).

    > **Note:** When you are creating the app, select **Consumer** as the app type.

4. After you create the app, on the Add Products to Your App page, click **Set Up** on the **Facebook Login** tile.
5. On the first page of the Quickstart, select **Web**.
6. In the **Site URL** box, enter your Org URL (found in the global header located in the upper-right corner of the Admin Console). This URL can also be any URL that makes sense for your app.
7. Click **Save**, click **Continue**, and then click **Next** until you exit the Quickstart wizard.

    > **Note:** Normally, under the **Facebook Login** > **Settings** section, you would enter the **Valid OAuth Redirect URIs**, but Facebook automatically adds `localhost` redirects so this isn't required for this example.

8. On the App's Dashboard page, expand **Settings** on the left side of the page, and then click **Basic**.
9. Save the **App ID** and the **App Secret** values so that you can add them to the Okta configuration in the next section.

> **Note:** There may be additional settings on the [Facebook App Dashboard](https://developers.facebook.com/apps) that you can configure for the app. The steps in this guide address the quickest route to setting up Facebook as an Identity Provider with Okta. See the Facebook documentation for more information on additional configuration settings.

### Create an Identity Provider in Okta

To connect your org to the IdP, add and configure that IdP in Okta.

> **Note:** You must assign your app to either the Everyone Group or a custom Group that you create so that profile enrollment functions correctly.

1. From the Admin Console side navigation, select **Security** > **Identity Providers**.
2. Select **Add Identity Provider** and then select **Add Facebook**.
3. In the Add an Identity Provider dialog box, define the following:

    * **Name**: Enter a name for the IdP configuration.
    * **Client ID**: Paste the app ID that you obtained from the IdP in the previous section.
    * **Client Secret**: Paste the secret that you obtained from the IdP in the previous section.
    * **Scopes**: Leave the defaults.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory.

    > **Note:** For more information about these settings as well as the **Advanced Settings**, see [Social Identity Provider Settings](/docs/guides/add-an-external-idp/-/configure-idp-in-okta/#social-identity-provider-settings).

4. Click **Add Identity Provider**. The Identity Provider page appears.
5. Locate the IdP that you just added and click the arrow next to the IdP name to expand.
6. Copy the **Redirect URI** (ending in `/callback`).
7. On the page for your Facebook App, under **Facebook Login**, select **Settings** and add the redirect URI that you just copied to the **Valid OAuth Redirect URIs** box.
8. Click **Save Changes**.

### Create the Routing Rule

> **Note:** These steps assume that you have no other Routing Rules defined. The following steps may be different if you have existing Routing Rules for the Identity Provider.

Create a Routing Rule that automatically routes all authentication requests to Facebook.

1. On the Identity Providers page in the Admin Console, select the **Routing Rules** tab.
2. Click **Add Routing Rule**.
3. Name the Rule, and then for the purposes of this example set two rule conditions:
    * For **AND User is accessing**, select **Any of the following applications**, and then choose your Application. This routes any attempts to access the <StackSnippet snippet="applang" inline /> app to the Facebook IdP, but still allows you to access your Admin Console normally.
    * For **THEN Use this identity provider**, select the Facebook IdP that you added earlier, and then click **Create Rule**.
4. Click **Activate** in the dialog box that appears.
5. Start the <StackSnippet snippet="applang" inline /> app in an incognito/private browser window and click ç. You are redirected to the Facebook site, where you can sign in.
6. After successful authentication, you are returned to the <StackSnippet snippet="applang" inline /> app's welcome page.
