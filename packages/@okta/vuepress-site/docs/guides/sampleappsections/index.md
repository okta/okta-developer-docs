---
title: Sample apps
excerpt: initial set up, sign in and enrollment sections
layout: Guides
---
samples-android

Progressive Profiling done

-------
samples-aspnet

Progressive Profiling done

-------
samples-aspnetcore

Progressive Profiling done

-----
samples-aspnet-webforms

Progressive Profiling done

------
samples-blazor

Progressive Profiling done

------
samples-python-flask

IdP Not working

-------
samples-js-react-native (Android)

Progressive Profiling done

-----

samples-js-react-native (iOS)

IdP not working

-----

DO LAST
samples-java-servlet

## Initial set up and authentication

This example shows you how to use the Okta Java Authentication SDK to sign a user in to a servlet-based application. This sample application is meant to show you how to integrate the Okta Java Authentication SDK into existing frameworks or applications. It is a convenient HTTP client wrapper for Okta's Authentication API.

1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-java-servlet.git`

    > **Note:** There is a `pom.xml` at the root of this project that exists to build all of the projects. Each project is independent and could be copied from this repo as a primer for your own application.

2. Obtain your Org URL (found in the global header located in the upper-right corner of the Admin Console), for example, `https://example-1234.oktapreview.com`.
3. From the command line, enter the `authn-servlet` directory.
4. Include your Org URL in the following `mvn` command to start the application: `mvn -Dokta.client.orgUrl=https://{yourOktaDomain}`
5. Open `http://localhost:8080` in an incognito/private browser window. The Okta Authentication SDK + Servlet page appears.
6. Click **Login**. You are redirected to a sign-in page.
7. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
8. Click **Logout** in the upper-right corner of the page to sign out of the app.

You now have the Okta Java servlet sample app installed and working.
______

not for redirect auth

okta-idx-swift

## Initial set up

Before we begin, you need to create an Okta Native OpenID Connect app to represent the Okta IDX Swift sample app and then install the sample app.

> **Note:** These steps assume that you are using XCode and the provided XCode workspace in the sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Add Application**.
3. From the Add Application page, click **Create New App**.
4. In the dialog box that appears, select **Native app** as the **Platform**, and then click **Create**.
5. Fill in the Create OpenID Connect App Integration fields that you need. Be sure to add the following, and then click **Save**:
    * **Login redirect URIs** &mdash; `com.okta.example:/callback`
    * **Logout redirect URIs** &mdash; `com.okta.example:/logoutCallback`
    > **Note:** Copy the Login redirect URI value and store it temporarily. You need it in a few steps.
6. On your new Application page, select the **Assignments** tab, click **Assign**, and then select **Assign to Groups**.
7. In the dialog box that appears, select **Assign** for the Everyone group, and then click **Done**. You must assign the app to either the Everyone Group or a custom Group that you create so that the profile enrollment functions correctly.
8. Select the **General** tab and click the "Copy to clipboard" icon to copy the **Client ID**. You need this ID when you are signing in using the simulator.
9. In the General Settings section, click **Edit**, select **Interaction Code** as a **Grant type allowed**, and click **Save**.
10. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
11. From the side navigation, select **Security** > **API**, and then select the "default" Custom Authorization Server.
12. Select **Access Policies** and then click the pencil icon for the **Default Policy Rule**.
13. Select **Interaction Code** in the **IF Grant type is** section and click **Update Rule**.
14. Install the sample app wherever you want using: `git clone https://github.com/okta/okta-idx-swift.git`

You have now created your App in Okta and installed the Okta IDX Swift sample app.

## Simple enrollment and authentication

This section walks you through enrolling a user and authenticating that user.

### Open and test the Sign-In Widget

1. From the `okta-idx-swift` directory, open `okta-idx.xcworkspace` in XCode.
2. In the XCode title bar, set the active scheme by selecting OktaIdxExample, and then run the example.
3. In the simulator, enter the **Issuer URL**, **Client ID**, and **Redirect URL** that you copied in previous steps.
4. Click **Log In**, and you are redirected to the Okta Sign-In Widget.
5. Enter the **Username** and **Password** for an admin user in your Okta org, and then click **Next**. The simulator displays the access token.
    > **Note:** Which authenticators appear during sign-in depends on how your [application sign-on policy](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-about-asop) is configured.

## Enable self-service enrollment

This section walks you through enabling self-service enrollment for the Sign-In Widget and then trying self-service enrollment with a user.

> **Note:** This section assumes that you followed the "Initial set up" and "Simple enrollment and authentication" sections above.

1. In the Admin Console, select **Security** > **Profile Enrollment**, and then select **Add New Profile Enrollment Policy**.
2. Give your Policy a **Name** and then click **Save**.
3. On the Profile Enrollment page, select the pencil icon for your new Policy from the **Actions** column.
4. On the Policy page, click **Manage Apps** and then click **Add an App to This Policy**.
5. Locate the Swift app that you created earlier, click **Apply**, and then **Close**.
6. Click **Back to Profile Enrollment Policy**.
7. In the **Enrollment Settings** section, click the **Actions** menu icon (&#8942;) beside the **ENABLED** flag and select **Edit**.
8. In the **For new users** section of the dialog box, select **Allowed** next to **Sign-up**, and then click **Save**.

> **Note:** See [Create a Profile Enrollment policy for self-registration](https://help.okta.com/en/oie/okta_help_CSH.htm#ext-create-profile-enrollment).

### Try enrollment

This section walks you through the self-service enrollment steps for a new user.

1. In XCode, open `okta-idx.xcworkspace` from the `okta-idx-swift` directory, select **OktaIdxExample** in the title bar to set the active scheme, and then run the example.
2. In the simulator, enter the **Issuer URL**, **Client ID**, and **Redirect URL** that you copied in previous steps and then click **Log In**.
3. Click **Sign up** just below the **Forgot password?** link, enter the requested information, and click **Sign Up**.
4. Set up the Email, Password, and Security Question factors. Don't set up any other factors.
5. After you complete set up, click **Finish**. You are redirected to the app's welcome page.
6. Click **Logout** in the upper-right corner of the page to sign out of the app.

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

You can try out the email password recovery flow:

* Select **Forgot password?** from the Sign-In Widget.
* Enter your email or username when prompted. An OTP code is sent to your email address.

> **Note:** Be sure to copy the code from the email and paste it into the Sign-In Widget manually.

* After you paste the code, answer the security question that appears. You are then prompted to enter a new password.
* After you enter the new password successfully, you are prompted for the additional phone authentication that you set up in the last section. Then, you are directed to the <StackSelector snippet="applang" noSelector inline /> Welcome page. <StackSelector snippet="tryenrollout" noSelector inline /> to sign out of the <StackSelector snippet="applang" noSelector inline /> app.

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
