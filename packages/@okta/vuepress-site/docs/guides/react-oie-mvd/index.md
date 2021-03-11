---
title: Federated Authentication with React and Identity Engine
meta:
  - name: React & Identity engine
    content: This guide will show you how to test out some of the features of the Identity engine with our React sample app
layout: Guides
---

This document will walk you through setting-up Okta's React sample app in order to demonstrate some features of the Identity engine. The React app will redirect to Okta's Sign-In Widget, or to Facebook, for authentication. The following scenarios are included in this guide:

* [Simple enrolment and authentication](#simple-enrolment-and-authentication)
* [Adding MFA with a mandatory second factor](#adding-mfa-with-a-mandatory-second-factor)
* [Authenticator recovery](#authenticator-recovery)
* [Progressive Profiling](#progressive-profiling)
* [Identity Provider routing to Facebook](#identity-provider-routing-to-facebook)


### Initial set up

Before we begin, you will need to create an Okta OAuth app to represent the React Sample, and install the React sample app.

1. Sign in to your [Okta Admin Console](https://login.okta.com)
2. On the left-hand navigation bar, select **Applications** > **Applications** and then click on **Add Application**
3. From the "Add Application" page, click on **Create New App**
4. In the dialog that pops up, select **SPA** as your Platform, then click **Create**
5. Fill out the "Create OpenID Connect App Integration" as you like, but be sure to add `http://localhost:8080/login/callback` as one of the "Login redirect URIs".
6. On the page for your new Application, click on the **Assignments** tab and ensure that the "Everyone" group is assigned to this Application. This assignment is not mandatory, but only for the purposes of this example. The app must be assigned either to the "Everyone" Group or a custom Group that you create, in order for profile enrollment to function correctly.
7. Install the sample app in your location of choice: `git clone https://github.com/okta/samples-js-react.git`
8. Create a `testenv` file in the new `samples-js-react` directory with the following contents:

      ```
      ISSUER=https://${yourOktaDomain}/oauth2/default
      CLIENT_ID={yourAppClientId}
      ```

9. Now you can enter the `okta-hosted-login` directory and run `npm install`

You now have your App created in Okta, and the Okta React Sample app installed.

<!--
Once sample download is working we can provide these instructions instead:
7. From the General tab, click Download sample app, then select React (NOTE: THIS WILL NOT WORK UNTIL THE 2021-03-12 CODE FREEZE) This file contains the [React Sample Applications] pre-configured with the settings of the Application that you just created. Your application settings are saved in the `testenv` file in the root directory.
8. You can extract the ZIP file and then open the `samples-js-react` directory in your command line
9. Enter the okta-hosted-login subdirectory, and run `npm install`
-->

### Simple enrolment and authentication

#### Open and test the Sign-In Widget

Now that we have the React Sample app configured and installed, we can try authenticating.

1. On the command line inside the `okta-hosted-login` subdirectory, start the React app by running `npm start`
2. Your default browser should automatically open `localhost:8080` and you will be presented with the Okta-React Sample landing page.
3. Click **Login** and you will be redirected to the Okta Sign-In Widget. As you can see, there is no "Sign Up" option.
4. Enter the Username and Password for your admin user. You should be redirected to the React Sample's success page.

We can now enable self-service enrollment for the Sign-In Widget.

#### Enable self-service enrollment

1. Click on **Security** > **Profile Enrollment** then select **Add New Profile Enrollment Policy**
2. Give your Policy a Name and then click **Save**
3. On the "Profile Enrollment" page, select the **edit icon** for your Policy in the Actions column.
4. On the page for your policy, click **Manage Apps** and select the Application you created earlier.
5. Now find the **Edit icon** in the Policy's "Enrollment Settings", which should be beside green text that says "Enabled".
6. In the "Edit Rule" dialog that pops up, under "For new users", make sure that "Sign-up" is toggled to **Allowed** and then click **Save**.

For more information see [Create a Profile Enrollment policy for self-registration](https://help.okta.com/en/oie/Content/Topics/identity-engine/policies/create-profile-enrollment-policy-sr.htm)

#### Try enrollment

If you refresh the Sign-In Widget, you should now see **Sign Up** just below the **Forgot password?** link.

1. Click **Sign Up**, then enter in the requested information, and click **Register**
2. You will now have to set up your Email, Password, and Security Question factors. Do not set up any other factors at this time.
3. Once you have completed set up, you will be redirected to the React Sample's success page.
4. Sign out of the app with the **Logout** button at the top of the page.

### Adding MFA with a mandatory second factor

We can now modify the Application's Sign On Policy in order to require the user to have a second factor enabled for authentication. In this example, we will use the Phone Authenticator.

> **Note:** Your Okta org will have different Authenticators enabled by default.

#### Enable multi-factor authentication

1. First, ensure that your Org has the Phone Authenticator enabled by going to **Security** > **Authenticators** and checking that Phone is listed. If it is not, add it with the **Add Authenticator** button.
2. Click on **Applications** > **Applications** and then select the Application you created.
3. Select the **Sign On** tab.
4. Under the "Sign On Policy" section, click the **Edit icon**, which should be beside green text that says "Enabled", then click **Edit**.
5. In the dialog that pops up, scroll down to the "THEN" section and under "AND User must authenticate with" select **Password + Another factor**, then click **Save**

#### Try multi-factor authentication

1. If you now go back to the page for the React Sample and click **Login**, you will once again be redirected to the Widget.
2. Sign in with the credentials of the user you enrolled earlier.
3. You will now be taken to the next screen, which will prompt you to set up either the Okta Verify or Phone Authenticators. Under Phone click **Set up**.
4. Fill out the requested phone authentication information, verify your phone with a code, and then click **Finish**. You will now be redirected to the React Sample's success page.
5. Sign out of the app with the **Logout** button at the top of the page.

### Authenticator recovery

By default, your org should have Password reset configured to be initiated with an email. You can try out the email password recovery flow by selecting **Forgot password?** from the Sign-In Widget page. It will prompt you for your email or username and then email a OTP code to your email address. Once you enter this code and answer a security question, you will be prompted to enter in a new password. You will then be directed to the React Sample's success page.

#### Recovery with Okta Verify

In addition to recovering your password with an email, you can also add Okta Verify as a recovery option.

1. Go to **Security** > **Authenticators**
2. Click **Actions** beside the Password Authenticator, then click **Edit**
3. In the Rule section at the bottom, click the **Edit icon** beside the Default Rule
4. Under "Password reset", there is a section "AND Users can initiate reset with", select **Okta Verify (Push)**
5. Enroll a new user, ensuring that this time you also enroll Okta Verify.
6. Sign in with your new user to confirm that you added it correctly, then click **Logout**.
7. Back on the welcome page of the React Sample, click **Login**
8. After you are redirected to the Sign-In Widget, click **Forgot password?**.
9. Enter the email address of the user you just created with Okta Verify as a factor then click **Next**.
10. On the next page, click **Select** beside "Get a push notification"
11. You should receive a push notification in the Okta Verify. Respond appropriately.
12. You will now be prompted for the answer to your Security Question, and then you will be asked to reset your password.
13. When you are complete, you should arrive on the React Sample's success page.


### Progressive Profiling

Okta now gives you the ability to check for what data is required from a user before they can access an app. For example, you can change the required user profile information for the same app, or handle single sign-on between two apps with different profile requirements. In this example we will add a required profile attribute and the user we have already enrolled will be asked for this information when they next authenticate.

When we enrolled our test user, they were only prompted for their first and last name, as well as their email and a password. We will now add an additional required property to the Profile Enrollment Policy.

1. Go to **Security** > **Profile Enrollment**
2. Find the Profile you created for self-service enrollment and click the **Edit icon** beside its name.
3. Click the **Edit icon** in the Policy's "Enrollment Settings", which should be beside green text that says "Enabled".
4. In the "Edit Rule" dialog, click **Add Another** then add a new property with the "Fields" value as `region` and the "Form label" as `Region`. Finally, check the **Required** box. Now click **Save**.
5. Now go to **Directory** > **Profile Editor** and under filters click **Okta** then click the **Edit icon** beside the "User (default)" Profile
6. Under "Attributes" click **Add Attribute** and fill out the dialogue that pops up. The values are the same as in our earlier step: it is a String with the "Display name" `Region` and the "Variable name" `region`. The other fields are optional and can be left blank. When you are done click **Save**.
7. Find the "Region" attribute you just created and click the **Edit icon** beside it. In the dialog that pops up, set **User permission** as **Read-Write** and then click **Save Attribute**.


> **Note:** You can check which User Attributes are required for your Directory by clicking the **Information icon** beside each Attribute. By default, "First name" and "Last name" will be marked as required, in addition to what you specify in your Enrollment Policy.

8. If you now try to authenticate using one of the same users as in the previous steps, you will be prompted with a "Region" field and a **Register** button. Once you add a value, you can confirm that it has been saved by going to **Directory** > **People** and finding the correct user, and clicking on their **Profile** tab. If you try to register a new user, you will see the "Region" field added to the "Create Account" screen.

### Identity Provider routing to Facebook

Instead of signing in to Okta, it is possible to route users to an external Identity Provider (IdP) instead, using Okta's IdP Routing rules.
#### Create a Facebook App

1. Go to [Facebook for Developers](https://developers.facebook.com) and register for a developer account if you haven't already done so.

2. Access the [Facebook App Dashboard](https://developers.facebook.com/apps).

3. Create a Facebook app using these [instructions](https://developers.facebook.com/docs/apps/register).

4. After you create the app, on the **Add a Product** page, click **Set Up** in the **Facebook Login** tile.

5. On the first page of the Quickstart, select **Web**.

6. In the **Site URL** box, enter the Okta redirect URI. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the Identity Provider (IdP). This is the URL where the IdP returns the authentication response (the access token and the ID token). In this example this is `http://localhost:8080/login/callback`.

7. Click **Save**, then click **Next** until you exit the Quickstart wizard.

 > **Note:** Normally, under the "Facebook Login" **Settings** section, you would enter the **Valid OAuth Redirect URIs**, but Facebook automatically adds `localhost` redirects so this is not required for this example.

10. On the App's Dashboard page, expand **Settings** on the left side of the page, and then click **Basic**.

11. Save the **App ID** and the **App Secret** values so you can add them to the Okta configuration in the next section.

> **Note:** There may be additional settings on the [Facebook App Dashboard](https://developers.facebook.com/apps) that you can configure for the app. The steps in this guide address the quickest route to setting up Facebook as an Identity Provider with Okta. See the Facebook documentation for more information on additional configuration settings.

#### Create an Identity Provider in Okta

To connect your org to the Identity Provider, add and configure that Identity Provider in Okta.

1. From the Admin Console side navigation, select **Security** and then **Identity Providers**.

2. Select **Add Identity Provider** and then select **Add Facebook**.

3. In the **Add an Identity Provider** dialog box, define the following:

* **Name** &mdash; Enter a name for the Identity Provider configuration.
* **Client Id** &mdash; Paste the app ID that you obtained from the Identity Provider in the previous section.
* **Client Secret** &mdash; Paste the secret that you obtained from the Identity Provider in the previous section.
* **Scopes** &mdash; Leave the defaults.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory.

> **Note:** For more information about these settings as well as the **Advanced Settings**, see [Social Identity Provider Settings](/docs/reference/social-settings/).

4. Click **Add Identity Provider**. The Identity Providers page appears.

5. Locate the Identity Provider that you just added and click the arrow next to the Identity Provider name to expand.

6. Copy the "Redirect URI" (ending in `/callback`)

7. On the page for your Facebook App, under "Facebook Login" select **Settings** and add the Redirect URI you just copied to the "Valid OAuth Redirect URIs".

#### Create the Routing Rule

Now we will create a Routing Rule that will automatically route all authentication requests to Facebook.

1. From the "Identity Providers" page, select the **Routing Rules** tab.
2. Click on **Add Routing Rule**
3. Give your Rule a name, and whatever rules you like. For the purposes of this example we will set two rule conditions:
4. Under "AND User is accessing" set it as **Any of the following applications** and then choose your Application. This will route any attempts to access the React sample to the Facebook IdP, but will still allow you to access your Admin Console normally.
5. Under "THEN Use this identity provider" select the Facebook IdP you added earlier. Then click **Create Rule**.
6. A dialog will appear asking if you'd like to activate the rule, select **Activate**
7. Return to the React sample at `localhost:8080` and click **Login**. You will be redirected to the Facebook site, where you can sign in.
8. After successful authentication you will be returned to the React sample's success page.
9. If you go to your Okta org's Directory, under **Directory** > **People** you should see the Facebook user that you just authenticated with as a new user.
