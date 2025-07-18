---
title: Set up your org
meta:
  - name: description
  - content: Set up your org to handle different scenarios and tasks
---

# Set up your org

This journey outlines how to set up your Okta org with some basic, but important, settings and how to configure it for different use cases.

## Set up your org with these steps

1. [Create your Okta account](#create-your-okta-account).
1. [Create user accounts](#create-user-accounts).
1. [Create a user group](#create-a-group).
1. [Enable an embedded Sign-In Widget](#enable-an-embedded-okta-sign-in-widget).
1. [Create an app](#create-an-app).
1. [Set up your org for different use cases](#set-up-your-okta-org-for-your-use-cases).

## Create your Okta account

If you don't have an Okta Identity Engine org, you need to sign up for an Okta account and an Identity Engine org.

1. [Sign up](https://developer.okta.com/signup/) for an Okta account.

   After you sign up, Okta sends a verification email to the email address that you provide.

1. Using the activate link in the email from Okta, activate your account and provide a new password. Okta redirects you to the [Admin Console](/docs/concepts/okta-organizations/#admin-console) of your new Identity Engine org.

The email and password that you use to create your account are used as your admin credentials. Your account is automatically created as an admin with the Super Administrator role.

## Create user accounts

After you get access to your org, create two user accounts.

Users are assigned to non-administrator user groups either during or after their creation. Admins must assign users their admin role after their creation.

### Create two test accounts

Create two test accounts to test the end-user experience for your apps.

1. Sign in to your Okta org with your administrator account.
   * Select **Admin** in the upper-right corner of the page. You're redirected to the Admin Console.
1. Go to **Directory** > **People** to view the existing users.
1. Select **Add Person**.
1. Configure your user like this:

   * **First name**: John
   * **Last name**: Doe
   * **Username**: john.doe@example.com
   * **Primary email**: john.doe@example.com
   * **Secondary email**: Enter your email address that you used to create your Okta account

> **Note:** Okta supports 3-byte encoded UTF-8 characters for these values.

1. For **Activation**, select **Activate now**.
1. Select **I will set password**, and enter a password.
1. Clear the **User must change password on first login** checkbox.
1. Select **Save and Add Another**.

Create a second test account.

1. Configure your user like this:
   * **First name**: Alex
   * **Last name**: Doe
   * **Username**: alex.doe@example.com
   * **Primary email**: alex.doe@example.com
   * **Secondary email**: Enter your email address that you used to create your Okta account
1. For **Activation**, select **Activate now**.
1. Select **I will set password**, and enter a password.
1. Clear the **User must change password on first login** checkbox.
1. Select **Save and Add Another**.

For more information about creating users, see [Add users manually](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-add-users.htm).

### Activate the accounts

If you don't activate your test accounts when creating them, you can activate them with this process.

1. In the Admin Console, select your name in the upper right corner of the page. [Copy your domain](/docs/guides/find-your-domain/main/#find-your-okta-domain) to your clipboard.
1. In your browser, open a private browsing window. For example, if you're using Chrome as your browser, open a new incognito window.
1. Paste your domain into the address bar.
1. Sign into your org as `alex.doe@example.com`.
1. When prompted, follow the steps to set up Okta Verify.
1. Select **Continue**.
1. Close the window.

Use the same process when you activate other accounts.

## Create a user group

Creating user (role) groups and assigning users to them is often done by an automated import process for large companies. However, you can also assign users to groups with a manual, per-user process.

For basic testing scenarios, create a group called **Retailers**. Assign your John Doe test account to it.

### Create a group

1. In your Admin Console, go to **Directory** > **Groups** to view the existing groups in your org.
1. Select **Add group**.
1. Enter **Retailers** as the name for the group.
1. Enter **All retailers** as the description for the group.
1. Click **Save**.

### Add a user to the group

1. Under the list of groups, select the **Retailers** group. Refresh the page if you don't see the group.
1. Click **Assign people**.
1. Click **Assign +** next to John Doe’s name.
1. Click **Done**.

## Enable an embedded Okta Sign-In Widget

You can embed the Okta Sign-In Widget in your apps rather than have it hosted by Okta. Enable an [interaction code](/docs/concepts/interaction-code/#the-interaction-code-flow) to allow communication between the widget embedded in your app and your Okta org.

If you’re using a custom authorization server for your app, you need to enable the interaction code for that particular authorization server.

### Enable interaction code for your org

1. In the Admin Console, go to **Settings** > **Account**.
1. Scroll down to **Embedded widget sign-in support**, and then click **Edit**.
1. Select **Interaction Code**.
1. Click **Save**.

By selecting **Interaction Code**, admins can use the interaction code as a grant type for their OpenID Connect app integrations and authorization servers.

If you don't select it, then Okta hides the interaction code as a grant type.

> **Note:** You can't use the interaction code for any OpenID Connect app integration or with any access policy rule of an authorization server.

### Enable interaction code for a custom authorization server

If you’re using a custom authorization server for your app, follow these steps. If you aren't using a custom authorization server, go to the [next section](#create-an-app).

1. In the Admin Console, go to **Security** > **API**.
1. Under **Name**, select the authorization server to edit.
1. Select the **Access Policies** tab.
1. Click the pencil icon under the **Actions** column for the default policy rule.
1. Select **IF Grant Type is** > **Advanced**.
1. Select the **Interaction Code** checkbox.
1. Select **Update Rule**.

<VerifyICGrantType />

## Create an app

Create an app integration that represents the app you want to add authentication to with Okta. For a basic app configuration, follow these steps to set up a web app: [Create an app](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-an-application). 

> **Note:** When you follow those steps, ensure that you enable interaction code in the app.

If you have a particular type of app that you want to create, see the following types:

### Native app

Native apps run natively on a device and redirect users to a non-HTTP callback. They can be desktop or mobile apps.

* [Android](/docs/guides/oie-embedded-common-org-setup/android/main/#create-an-application)
* [iOS](/docs/guides/oie-embedded-common-org-setup/ios/main/#create-an-application)

### Web app

Server-side apps are used in scenarios where authentication and tokens are handled on the server.

* [ASP.NET](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-an-application)
* [Go](/docs/guides/oie-embedded-common-org-setup/go/main/#create-an-application)
* [Java](/docs/guides/oie-embedded-common-org-setup/java/main/#create-an-application)
* [Node.js](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-an-application)

### Single-Page app

Single-page web apps run in the browser where the client receives tokens.

* [React](/docs/guides/oie-embedded-common-org-setup/react/main/#create-an-application)

## Set up your app to use the Okta APIs

This step is optional. However, you can use your web app to interact with Okta APIs. Follow the steps in [Set up Okta for API access](/docs/reference/rest/#set-up-okta-for-api-access) and use the app that you created in the [previous section](#create-an-app).

## Set up your Okta org for your use cases

After you create your app integration in your Okta org, configure your app and org to support the authentication use cases that you're implementing:

* For a basic password factor only use case, see [Set up your Okta org for a password factor only use case](#set-up-your-okta-org-for-a-password-factor-only-use-case)
* For a multifactor use case, see [Set up your Okta org for a multifactor use case](#set-up-your-okta-org-for-a-multifactor-use-case)
* For a password-optional use case, see [Set up your Okta org for a password-optional use case](#set-up-your-okta-org-for-a-password-optional-use-case)

### Set up your Okta org for a password factor only use case

This section shows you how to set up your Okta org and app to support password factor-only use cases. These use cases are intended to use the password factor without any additional factors (such as email or phone SMS). When you [create an app](#create-an-app), the app is assigned **Any two factors**. This is the default policy for new apps. It requires a user to verify their identity with any two enabled authentication factors.

First, assign the **Password only** policy to your app:

1. Go to **Applications** > **Applications** in the Admin Console, and then select your app.
1. Select the **Sign On** tab.
1. Click **Edit** in the **User Authentication** section.
1. Select **Password only** for the **Authentication policy**, and then click **Save**.

Next, check that the password authenticator doesn't require any additional verification:

1. Go to **Security** > **Authenticators**.
1. Select **Edit** from the **Actions** menu on the **Password** authenticator row.
1. Scroll down on the **Password** policy page to the rules section.
1. Click the pencil icon next to the **Default Rule** to access the **Edit Rule** dialog.
1. Select **Not required** in the **AND Additional verification is** section.
1. Click **Update rule**.

### Set up your Okta org for a multifactor use case

This section shows you how to set up your Okta org and app to support the multifactor use cases. The multifactor use case presented in this guide uses the email and password factors. Perform the following configurations to set up the email and password factors in your Okta org.

> **Note:** The multifactor use cases in this guide implement the password and email factors. However, there are more supported factors that you can use in your embedded authentication app. See [Multifactor Authentication](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-authenticators).

#### Set up the email authenticator

1. Open the **Admin Console** for your org.
2. Go to **Security** > **Authenticators** to see the available authenticators.
3. Locate the **Email** authenticator on the **Setup** tab, and then select **Actions** > **Edit**.
4. Set **This authenticator can be used for** to **Authentication and recovery**.
5. Click **Save**.

#### Update your authentication policy with multifactor authentication

1. Go to **Security** > **Authentication Policies**.
1. Select **Any two factors** as this is the policy that the [app you created](#create-an-app) is assigned to.
1. Select **Edit** from the **Actions** menu for the **Catch-all Rule** to access the **Edit Rule** dialog.
1. Scroll down to the **AND User must authenticate with** dropdown menu and select **Password + Another Factor**.
1. Click **Save**.

   > **Note:** Because the default authentication policy is a shared policy, changes you make apply to both new and existing apps that are assigned to it.

### Set up your Okta org for a password-optional use case

For password-optional authentication, you first need to:

1. [Set up the email authenticator for authentication and recovery](#set-up-the-email-authenticator).
2. [Create a separate group for password-optional users](#create-a-group-for-password-optional-users).

To ensure that only specific app integrations can let users **sign up** without a password, do the following:

1. [Create a user profile policy for password-optional users](#create-a-user-profile-policy-for-password-optional-users) that adds them to the new group and assign your app to it.
2. Place this group at the lowest priority (just above the default policy) in the authenticator enrollment policy.

To ensure that only password-optional users can **sign in** without a password and everybody else is appropriately prompted for it, do the following:

1. [Create a new password-optional authenticator enrollment policy for the group](#create-a-password-optional-authenticator-enrollment-policy).
2. [Add a global session policy for the group](#add-a-global-session-policy-for-password-optional-users).
3. [Add an authentication policy for the group](#add-an-authentication-policy-for-password-optional-users).
4. Ensure that password-optional users never fall through to the default policy. The default policy should always have a password as a required authenticator.
5. Explicitly exclude your main admin account from any further password-optional policies that you create.

> **Note**: See also [Set up password-optional sign-in experience](https://help.okta.com/okta_help.htm?type=oie&id=ext-passwordless).

#### Create a group for password-optional users

1. Go to **Directory** > **Groups** to view the existing groups in your org.
1. Select **Add group**.
1. Enter **Password optional** as the name for the group.
1. Enter **Group for password optional users** as the description for the group.
1. Click **Save**.

After you create the **Password optional** group, add the Alex Doe test account to the group. See [Add a user to the group](#add-a-user-to-the-group).

#### Enable password-optional user sign-up flow

To ensure that only specific app integrations can let users sign up without a password, do the following:

##### Create a user profile policy for password-optional users

A user profile policy determines the minimum information required from a user to create an account. The policy also determines how the user should verify their identity before creating their account.

1. Go to **Security** > **User Profile Policies**.
1. Click **Add user profile policy**.
1. Enter **Password-optional user profile policy** as the name of the policy. Click **Save**.
1. For your new policy, and under **Actions**, click the pencil icon to edit the policy.
1. On the **Enrollment** tab, locate the **Profile Enrollment** section of the policy and click **Edit**.
1. Set **Self-service registration** to **Allowed**.
1. Verify that **Required before access is granted** is selected for **Email Verification**.
1. Set **Add the user to group** to your **Password optional** group, and then click **Save**.
1. Go to the **Apps** tab.
1. Click **Add an App to This Policy**.
1. Locate your app integration and click **Apply**.
1. Click **Close** and then verify that the app is in the list of **Apps using this policy**.

#### Enable password-optional user sign-in flow

To ensure that only password-optional users can sign in without a password and other users are appropriately prompted for it, do the following:

##### Create a password-optional authenticator enrollment policy

An authenticator enrollment policy determines which authenticators must challenge a user before they’re successfully signed in. In this case, email is set to **Required**, while all the other authenticators are set to **Optional**.

1. Go to **Security** > **Authenticators**.
2. Go to the **Enrollment** tab, and then click **Add a policy**.
3. Enter **Password-optional sign-in policy** as the name.
4. Under **Assign to groups**, assign the policy to your **Password optional** group.
5. Do the following in the **Eligible Authenticators** section:

   * Set **Email** to **Required**.
   * Set **Password** to **Optional**.
   * Verify that the remaining authenticators are set to **Optional**.

6. Click **Create policy**.

##### Create a rule for the policy

1. Enter **Password-optional sign-in policy rule** as the name.
1. Under **Exclude users**, enter your username to ensure that the policy doesn't apply to your admins.
1. Leave the other settings at their defaults, and then click **Create rule**.
1. Move the new policy immediately above the default policy in the list of policies.

##### Add a global session policy for password-optional users

A global session policy determines user session length and authentication rules for groups of users. In this case, the policy turns off MFA for all users in the password-optional user group. Therefore, they only need email authentication to sign in.

1. Go to **Security** > **Global Session Policy**.
1. Click **Add policy**.
1. Enter **Password-optional global sign-in policy** as the name.
1. Under **Assign to groups**, assign the policy to your **Password optional** group.
1. Click **Create policy and add rule**. Give the rule a name.
1. Enter **Password-optional GSP rule** as the name of the rule.
1. Verify that **Establish the user session with** is set to **Any factor used to meet the Authentication Policy requirements**.
1. Set **Multifactor authentication (MFA) is** to **Not required**.
1. Leave the other settings at their defaults, and then click **Create rule**.

##### Add an authentication policy for password-optional users

1. Go to **Security** > **Authentication Policies**.
1. Click **Add a policy**.
1. Enter **Password-optional authentication policy** as the name.
1. Click **Save**.
1. Go to the **Catch-all Rule** of the new policy and select **Actions** > **Edit**.
1. Set **User must authenticate with** to **Any 1 factor type**.
1. In the **Possession factor constraints are** section, verify the following:

   * Verify that no options are selected.
   * Verify that **Email** is listed in the box under **1 factor type**.

1. Click **Save**.
1. Select the **Applications** tab for your newly created policy. Then, click **Add app**.
1. Find your app in the list and click **Add** next to it.
1. Click **Done**.
1. Verify that the app is now listed in the **Applications** tab of the new policy.

## Related topics

* [Download and set up the SDK, Sign-In Widget, and sample apps](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/)
* [Run the sample apps](/docs/guides/oie-embedded-common-run-samples/nodejs/main/)

See the [Okta Docs](https://help.okta.com/en-us/content/index.htm?cshid=csh-index) for more information on the Admin Console dialogs in this guide:

* [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users)
* [Manage groups](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-assign-group-people)
