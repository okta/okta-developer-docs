---
title: Redirect authentication with the sample apps and Identity Engine
excerpt: Learn how to test some of the features of the Identity Engine with our sample apps
layout: Guides
---

This document walks you through setting up an Okta sample app to demonstrate some Identity Engine features. Among the many set up options available with the Okta sample apps, the apps can redirect to Okta's Sign-In Widget, or to a social Identity Provider like Facebook, for authentication. The following scenarios are included in this guide:

* [Simple enrollment and authentication](#simple-enrollment-and-authentication)
* [Enable self-service enrollment](#enable-self-service-enrollment)
* [Add MFA with a mandatory second factor](#add-mfa-with-a-mandatory-second-factor)
* [Authenticator recovery](#authenticator-recovery)
* [Progressive Profiling](#progressive-profiling)
* [Identity Provider routing to Facebook](#identity-provider-routing-to-facebook)

Select your sample app language.

<StackSelector snippet="sampleapplang" />

## Initial set up

To get started, you need to create an Okta OAuth app to represent the <StackSelector snippet="applang" noSelector inline /> app and then install the <StackSelector snippet="applang" noSelector inline /> sample app.

<StackSelector snippet="toolnote" noSelector />

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Create App Integration**.
3. In the dialog box that appears, select **OIDC - OpenID Connect** as the **Sign-on method**, <StackSelector snippet="apptype" noSelector inline /> as the **Application type**, and then click **Next**.
4. Fill in the New <StackSelector snippet="apptypepage" noSelector inline /> Integration fields that you need, and then click **Save**:

   * Be sure to add the following values (or leave the defaults if they match):

      **Sign-in redirect URIs** &mdash; <StackSelector snippet="signinredirecturi" noSelector inline /><br>
      **Sign-out redirect URIs** &mdash; <StackSelector snippet="signoutredirecturi" noSelector inline />

   * In the **Assignments** section, select **Allow everyone in your organization to access**. This assigns all Users in the Everyone Group to the app. You must assign the app to either the Everyone Group or a custom Group that you create so that profile enrollment functions correctly.
5. On the new Application page, click the "Copy to clipboard" icon to copy the <StackSelector snippet="clientidsd" noSelector inline />. Store this information temporarly for use when you <StackSelector snippet="configfile" noSelector inline /> in the next section.

<StackSelector snippet="corsissuer" noSelector />

### Install the sample app

<StackSelector snippet="installsampleapp" noSelector />

<!--
Once sample download is working we can provide these instructions instead:
7. From the **General** tab, click **Download sample app**, and then select **React**. (NOTE: THIS WILL NOT WORK UNTIL THE 2021-03-12 CODE FREEZE??) This file contains the [React sample application](https://github.com/okta/samples-js-react) pre-configured with the settings of the Application that you just created. Your application settings are saved in the `testenv` file in the root directory.
8. You can extract the ZIP file and then open the `samples-js-react` directory from the command line.
9. Enter the okta-hosted-login subdirectory and run `npm install`.
-->

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

<StackSelector snippet="simpleenrollauth" noSelector />

4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
    > **Note:** Which authenticators appear during sign-in depends on how your [application sign-on policy](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-about-asop) is configured.
5. Click <StackSelector snippet="tryenrollout" noSelector inline /> to sign out of the <StackSelector snippet="applang" noSelector inline /> app.

## Enable self-service enrollment

This section walks you through enabling self-service enrollment for the Sign-In Widget and then trying self-service enrollment with a user.

> **Note:** This section assumes that you followed the "Initial set up" and "Simple enrollment and authentication" sections above.

1. In the Admin Console, select **Security** > **Profile Enrollment**, and then select **Add New Profile Enrollment Policy**.
2. Give your Policy a **Name** and then click **Save**.
3. On the Profile Enrollment page, select the pencil icon for your new Policy from the **Actions** column.
4. On the Policy page, click **Manage Apps** and then click **Add an App to This Policy**.
5. Locate the <StackSelector snippet="applang" noSelector inline /> app that you created earlier, click **Apply**, and then **Close**.
6. Click **Back to Profile Enrollment Policy**.
7. In the **Enrollment Settings** section, click the **Actions** menu icon (&#8942;) beside the **ENABLED** flag and select **Edit**.
8. In the **For new users** section of the dialog box, select **Allowed** next to **Sign-up**, and then click **Save**.

> **Note:** See [Create a Profile Enrollment policy for self-registration](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-create-profile-enrollment).

### Try enrollment

This section walks you through the self-service enrollment steps for a new user.

<StackSelector snippet="tryenrollin" noSelector />

3. In the Okta Sign-In Widget, click **Sign up** just below the **Forgot password?** link.
4. Enter the requested information, and then click **Sign Up**.
5. Set up the Email, Password, and Security Question factors. Don't set up any other factors.

    > **Note:** Be sure to copy the code from the email and paste it into the Sign-In Widget to manually verify the email address rather than using the **Verify Email Address** button.

6. After you complete set up, click **Finish**. You are redirected to the app's Welcome page.
7. Click <StackSelector snippet="tryenrollout" noSelector inline /> to sign out of the <StackSelector snippet="applang" noSelector inline /> app.

## Add MFA with a mandatory second factor

You can now modify the Application's Sign-On Policy to require the user to have a second factor enabled for authentication. In this example, we use the Phone Authenticator.

> **Note:** Your Okta org may have different Authenticators enabled by default.

### Enable multifactor authentication

1. Ensure that your org has the Phone authenticator enabled by going to **Security** > **Authenticators** and checking that **Phone** is listed.

    If it isn't listed, add it by doing the following:
    * Click **Add Authenticator**.
    * Click **Add** in the **Phone** authentication box.
    * Leave **Authentication (MFA/SSO)** selected in the **Add Phone** dialog box.
    * Click **Add**.

2. From the side navigation, select **Applications** > **Applications** and then select the Okta OAuth app that you created to represent the <StackSelector snippet="applang" noSelector inline /> app.
3. Select the **Sign On** tab.
4. Scroll down to the **Sign On Policy** section, click the **Actions** menu icon (&#8942;) beside the **ENABLED** flag and select **Edit**.
5. In the Edit Rule dialog box, scroll down to the **THEN** section and locate **AND User must authenticate with**.
6. Select **Password + Another factor** and click **Save**.

### Try multifactor authentication

<StackSelector snippet="tryenrollin" noSelector />

3. Enter the credentials of the user that you enrolled earlier.
4. The Set up authentications page appears, which prompts you to set up either the Okta Verify or the Phone authenticator. Under **Phone**, click **Set up**.
5. Fill out the requested phone authentication information, verify your phone with a code, and then click **Finish**. You are redirected to the <StackSelector snippet="applang" noSelector inline /> Welcome page.
6. Click <StackSelector snippet="tryenrollout" noSelector inline /> to sign out of the <StackSelector snippet="applang" noSelector inline /> app.

## Authenticator recovery

In your org, Password reset is configured by default to be initiated with an email. The steps in this section assume that you haven't changed that default configuration.

You can try out the email password recovery flow by selecting **Forgot password?** from the Sign-In Widget. You are prompted for your email or username, and then an OTP code is sent to your email address. Be sure to copy the code from the email and paste it into the Sign-In Widget manually. After you enter the code and answer a security question, you are prompted to enter a new password. You are then directed to the <StackSelector snippet="applang" noSelector inline /> Welcome page. <StackSelector snippet="tryenrollout" noSelector inline /> to sign out of the <StackSelector snippet="applang" noSelector inline /> app.

CHECK and fix - For completeness, the flow also prompts for additional phone authentication, as setup on the previous step.

### Recovery with Okta Verify

In addition to recovering your password with an email, you can also add Okta Verify as a recovery option.

1. Go to **Security** > **Authenticators**.
2. Click **Actions** beside the Password Authenticator, and then click **Edit**.
3. In the **Add Rule** section at the bottom of the page, click the pencil icon for the Default Rule.
4. In the **Password reset** section, locate **AND Users can initiate reset with**.
5. Select **Okta Verify (Push)** and click **Update Rule**.
6. [Enroll a new user](#try-enrollment), ensuring that this time you also enroll Okta Verify.
7. Sign in with your new user to confirm that you added the user correctly, and then click <StackSelector snippet="tryenrollout" noSelector inline />.
8. Back on the welcome page of the <StackSelector snippet="applang" noSelector inline /> app, click <StackSelector snippet="appsignin" noSelector inline />.
9. After you are redirected to the Sign-In Widget, click **Forgot password?**.
10. Enter the email address of the user that you just created with Okta Verify as a factor, and then click **Next**.
11. On the next page, click **Select** beside **Get a push notification**. You should receive a push notification in Okta Verify. Respond appropriately.
12. You are prompted for the answer to your Security Question, and then you are asked to reset your password.
13. When you are finished, the React Sample's success page should appear.



4. In the **Recovery authenticators** section, locate **AND Users can initiate recovery with**.
5. Select **Okta Verify (Push notification only)** and click **Update Rule**.

## Progressive Profiling

Okta now gives you the ability to check for what data is required from a user before they can access an app. For example, you can change the required user profile information for the same app, or handle SSO between two apps with different profile requirements. In this example, we add a required profile attribute, and the user we have already enrolled is asked for this information when they next authenticate.

When we enrolled our test user, the user was only prompted for first and last name, as well as their email and a password. Now add an additional required property to the Profile Enrollment Policy.

1. In the Admin Console side navigation, select **Security** > **Profile Enrollment**.
2. Find the profile that you created for self-service enrollment and click the pencil icon in the **Actions** column.
3. In the **Enrollment Settings** section, click the **Actions** menu icon (&#8942;) beside the **ENABLED** flag and select **Edit**.
4. In the Edit Rule dialog box, click **Add Another** and enter the following:

    * **Fields** &mdash; `region`
    * **Form label** &mdash; `Region`

5. Select the **Required** check box, and then click **Save**.
6. From the side navigation, select **Directory** > **Profile Editor**.
7. Under **Filters**, select **Okta**, and then click the pencil icon for the **User (default)** Profile.
8. Under **Attributes**, click **Add Attribute**, and then fill out the dialog box that appears:

    * **Data type** &mdash; `string`
    * **Display name** &mdash; `Region`
    * **Variable name** &mdash; `region`

9. Click **Save** when you are done. The other fields are optional and can be left blank.
10. Find the **Region** attribute that you just created and click the pencil icon beside it.
11. In the **Region** dialog box that appears, set **User permission** to **Read-Write**, and then click **Save Attribute**.

> **Note:** You can check which User Attributes are required for your Directory by clicking the Information icon beside each Attribute. By default, **First name** and **Last name** are marked as required, in addition to what you specify in your Enrollment Policy.

12. Now try to authenticate using one of the same users as in the previous steps. You are prompted with a **Region** field and a **Register** button. After you add a value, you can confirm that it has been saved by accessing **Directory** > **People** in the Admin Console, locating the correct user, and selecting their **Profile** tab. If you try to register a new user, you see the **Region** field added to the **Create Account** page.

## Identity Provider routing to Facebook

Instead of signing in to Okta, it is possible to route users to an external Identity Provider (IdP) instead, using Okta's IdP Routing rules.

> **Note:** For B2B scenarios, you may want to add a SAML 2.0 Identity Provider rather than a social Identity Provider. See [Add a SAML 2.0 IdP](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-idp-inbound-saml).

### Create a Facebook App

1. Go to [Facebook for Developers](https://developers.facebook.com) and register for a developer account if you haven't already done so.
2. Access the [Facebook App Dashboard](https://developers.facebook.com/apps).
3. Create a Facebook app using these [instructions](https://developers.facebook.com/docs/apps/register).

    > **Note:** When you are creating the app, select **Build Connected Experiences** as the app type.

4. After you create the app, on the Add a Product page, click **Set Up** on the **Facebook Login** tile.
5. On the first page of the Quickstart, select **Web**.
6. In the **Site URL** box, enter the Okta redirect URI. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the IdP. This is the URL where the IdP returns the authentication response (the access token and the ID token). In this example, this is `http://localhost:8080/login/callback`.
7. Click **Save**, click **Continue**, and then click **Next** until you exit the Quickstart wizard.

    > **Note:** Normally, under the "Facebook Login" **Settings** section, you would enter the **Valid OAuth Redirect URIs**, but Facebook automatically adds `localhost` redirects so this isn't required for this example.

8. On the App's Dashboard page, expand **Settings** on the left side of the page, and then click **Basic**.
9. Save the **App ID** and the **App Secret** values so that you can add them to the Okta configuration in the next section.

> **Note:** There may be additional settings on the [Facebook App Dashboard](https://developers.facebook.com/apps) that you can configure for the app. The steps in this guide address the quickest route to setting up Facebook as an Identity Provider with Okta. See the Facebook documentation for more information on additional configuration settings.

### Create an Identity Provider in Okta

To connect your org to the IdP, add and configure that IdP in Okta.

1. From the Admin Console side navigation, select **Security** > **Identity Providers**.
2. Select **Add Identity Provider** and then select **Add Facebook**.
3. In the Add an Identity Provider dialog box, define the following:

    * **Name** &mdash; Enter a name for the IdP configuration.
    * **Client Id** &mdash; Paste the app ID that you obtained from the IdP in the previous section.
    * **Client Secret** &mdash; Paste the secret that you obtained from the IdP in the previous section.
    * **Scopes** &mdash; Leave the defaults.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory.

    > **Note:** For more information about these settings as well as the **Advanced Settings**, see [Social Identity Provider Settings](/docs/reference/social-settings/).

4. Click **Add Identity Provider**. The Identity Provider page appears.
5. Locate the IdP that you just added and click the arrow next to the IdP name to expand.
6. Copy the **Redirect URI** (ending in `/callback`).
7. On the page for your Facebook App, under **Facebook Login**, select **Settings** and add the redirect URI that you just copied to the **Valid OAuth Redirect URIs**.
8. Click **Save Changes**.

### Create the Routing Rule

Create a Routing Rule that automatically routes all authentication requests to Facebook.

1. On the Identity Providers page in the Admin Console, select the **Routing Rules** tab.
2. Click **Add Routing Rule**.
3. Name the Rule, and then for the purposes of this example set two rule conditions:
    * For **AND User is accessing**, select **Any of the following applications**, and then choose your Application. This routes any attempts to access the React sample to the Facebook IdP, but still allows you to access your Admin Console normally.
    * For **THEN Use this identity provider**, select the Facebook IdP that you added earlier, and then click **Create Rule**.
4. A dialog box appears asking if you'd like to activate the rule. Select **Activate**.
5. Return to the React sample at `localhost:8080` and click **Login**. You are redirected to the Facebook site, where you can sign in.
6. After successful authentication, you are returned to the React sample's success page.
7. From the Admin Console side navigation, under **Directory** > **People**, you should see the Facebook user that you just authenticated as a new user.
