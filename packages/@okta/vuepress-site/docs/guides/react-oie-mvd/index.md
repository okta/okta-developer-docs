---
title: Federated Authentication with React and Identity Engine
meta:
  - name: React & Identiy engine
    content: This guide will show you how to test out some of the features of the Identity engine with our React sample app
layout: Guides
---

This document will walk you through setting-up Okta's React sample app in order to demonstrate some features of the Identity engine. The React app will redirect to Okta's Sign-In Widget, or to Facebook, for authentication. The following scenarios are included in this guide:

* [Simple enrolment and authentication](#)
* [Adding MFA with a mandatory second factor](#)
* [Authenticator recovery](#)
* [Identity Provider routing to Facebook](#)

### Initial set up

1. Sign in to your [Okta Admin Console](https://login.okta.com)
2. On the left-hand navigation bar, select **Applications** > **Applications** and then click on **Add Application**
3. From the "Add Application" page, click on **Create New App**
4. In the dialog that pops up, select **SPA** as your Platform, then click **Create**
5. Fill out the "Create OpenID Connect App Integration" as you like, but be sure to add `http://localhost:8080/login/callback` as one of the "Login redirect URIs".
6. On the page for your new Application, click on the **Assignments** tab and ensure that the "Everyone" group is assigned to this Application. This assignment is not mandatory, but only for the purposes of this example.
7. From the **General** tab, click **Download sample app**, then select **React** (**NOTE:** THIS WILL NOT WORK UNTIL THE 2021-03-12 CODE FREEZE) This file contains the [React Sample Applications] pre-configured with the settings of the Application that you just created. Your application settings are saved in the `testenv` file in root directory.
8. You can extract the ZIP file and then open the `samples-js-react` directory in your command line
9. Enter the `okta-hosted-login` subdirectory, and run `npm install`

### Simple enrolment and authentication

### Open the Widget

Now that we have the React Sample app configured and install, we can try enrolling a new user.

1. On the command line inside the `okta-hosted-login` subdirectory, start the React app by running `npm start`
2. Your default browser should automatically open `localhost:8080` and you will be presented with the Okta-React Sample landing page.
3. Click **Login** and you will be redirected to the Okta Sign-In Widget. As you can see, there is no "Sign Up" option. We can now enable self-service enrollment for the Sign-In Widget.

#### Enable self-service enrollment

1. Click on **Security** > **Profile Enrollment** then select **Add New Profile Enrollment Policy**
2. Give your Policy a Name and then click **Save**
3. On the "Profile Enrollment" page, select the **edit icon** for your Policy in the Actions column.
4. On the page for your policy, click **Manage Apps** and select the Application you created earlier.
5. Now find the **Edit icon** in the Policy's "Enrollment Settings", which should be beside green text that says "Enabled".
6. In the "Edit Rule" dialog that pops up, under "For new users", make sure that "Sign-up" is toggled to **Allowed** and then click **Save**.

#### Try enrollment

If you refresh the Sign-In Widget, you should now see **Sign Up** just below the **Forgot password?** link.

1. Click **Sign Up**, then enter in the requested information, and click **Register**
2. You will now have to set up your Email, Password, and Security Question factors. Do not set up any other factors at this time.
3. Once you have completed set up, you will be redirected to the React Sample's success page.
4. Sign out of the app with the **Logout** button at the top of the page.

### Adding MFA with a mandatory second factor

We can now modify the Application's Sign On Policy in order to require the user to have a second factor enabled for authentication. In this example, we will use the Phone Authenticator.

>> **Note:** Your Okta org will have different Authenticators enabled by default.

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



### Identity Provider routing to Facebook
