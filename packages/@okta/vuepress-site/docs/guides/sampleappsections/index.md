---
title: Sample apps
excerpt: initial set up, sign in and enrollment sections
layout: Guides
---
samples-android

## Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables.

-------
samples-aspnet

## Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables.
-----
samples-aspnet-webforms

## Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables
-------
samples-aspnetcore

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables
------
samples-blazor

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables
-----
samples-golang

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

-----
samples-ios

samples-golang

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

------
samples-java-micronaut

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

-----

samples-java-spring

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

----

samples-java-micronaut

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

-----
samples-js-angular

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

-----

samples-js-react-native (iOS)

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

-------
samples-js-react-native (Android)

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

------
samples-js-vue

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

----
samples-nodejs-express

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

-----
samples-php

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables

------
samples-python-flask

# Add MFA with a mandatory second factor

### Enable multifactor authentication

### Try multifactor authentication

all in main doc managed by stack selector variables
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
