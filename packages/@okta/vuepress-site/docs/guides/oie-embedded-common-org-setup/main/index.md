---
title: Set up your Okta org
---

<ApiLifecycle access="ie" />

This guide covers how to create and set up your Okta org before you can [run the Identity Engine sample apps](/docs/guides/oie-embedded-common-run-samples/) or [integrate the SDK or Widget](/docs/guides/oie-embedded-common-download-setup-app/) into your own app.

---

**Learning outcomes**

Get a new org set up and ready for various use cases.

**What you need**

[Okta Developer Edition organization](/signup)

---

## Overview of the embedded identity solutions

Okta provides two embedded identity solutions:

* **Embedded SDK only**: A highly customizable solution that provides native language support for various identity use cases.
* **Embedded Widget + SDK**: A quick and easy to set up solution that moves most of the heavy lifting to Okta. Although the amount of code that you need to write is small, many of the most advanced identity use cases (for example, social sign-in, multifactor authentication) are supported out of the box.

<div class="three-quarter">

![Displays Okta embedded solution components: (SDK) and (Sign-In Widget + SDK)](/img/oie-embedded-sdk/embedded-solution-overview.png)

</div>

This guide shows you how to set up your Okta org to support the embedded SDK or the embedded widget with SDK solutions. Ensure that you [get set up](#get-set-up) with Okta and [set up your Okta org for your use case](#set-up-your-okta-org-for-your-use-case) before you <StackSnippet snippet="downloadguideuri" inline />.

> **Note:** You have the option to use direct authentication with your apps in Identity Engine rather than an embedded SDK. This allows you to directly authenticate users rather than delegating authentication to Okta Identity Providers and authorization servers through an HTTP redirect in a web browser. Direct authentication is beneficial in scenarios where there's a high degree of trust between the user and the app. It's also beneficial where browser-based flows aren't feasible, like with mobile apps. See the `/challenge` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/challengeOrgAS), the `/oob-authenticate` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/oob-authenticateOrgAS), and the new `grant_types` for the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) to help tailor authentication to your specific use cases. Also, for information on how to set up each new grant type, see [Implement by grant type](/docs/guides/configure-direct-auth-grants/aotp/main/).

## Get set up

Sample apps are provided for each solution to show you exactly how to integrate the SDK and the Widget into your own app. Before you can run the sample apps or integrate embedded authentication into your own app, you need to do the following:

1. [Create your Okta account](#create-your-okta-account).
1. [Verify that the Interaction Code grant type is enabled](/docs/guides/implement-grant-type/interactioncode/main/#verify-that-the-interaction-code-grant-type-is-enabled).
1. [Update the default custom authorization server](#update-the-default-custom-authorization-server).
1. [Create an application](#create-a-new-application).

After you've created your app, you need to [set up your Okta org for your use case](#set-up-your-okta-org-for-your-use-case) scenario.

### Create your Okta account

If you don't have an Okta Identity Engine org, you need to sign up for an Okta account and an Identity Engine org.

1. [Sign up](https://developer.okta.com/signup/oie.html) for an Okta account.

   After you sign up, Okta sends a verification email to the email address that you provide.

1. Using the activate link in Okta's email, activate your account and provide a new password. Okta redirects you to the [Admin Console](/docs/concepts/okta-organizations/#admin-console) of your new Identity Engine org.

### Update the default custom authorization server

You need to configure your default custom authorization server to enable the Interaction Code flow.

1. From your Okta org's [Admin Console](/docs/concepts/okta-organizations/#admin-console), select **Security** > **API**.
1. On the **Authorization Servers** tab, select the pencil icon for the **default** custom authorization server.
1. Select the **Access Policies** tab.
1. Select the pencil icon from the **Actions** column for the **Default Policy Rule** to access the **Edit Rule** dialog.
1. In the **IF Grant type is** section, select the **Interaction Code** checkbox.

   <VerifyICGrantType />

1. Click **Update Rule**.

### Create an application

Create an app integration that represents the application you want to add authentication to with Okta:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. <StackSnippet snippet="applicationtype" />
1. <StackSnippet snippet="newapp" />

   * Enter an application name.
   * Select the **Refresh Token** checkbox.
   * Click **Advanced** in the **Grant type** section and ensure that the **Interaction Code** checkbox is selected.

      <VerifyICGrantType />

   * Set **Sign-in redirect URIs** to <StackSnippet snippet="redirecturi" inline />
   * Set **Controlled Access** to **Allow everyone in your organization to access**.

1. Click **Save**.
1. On the **General** tab, note the **Client ID** value (and if applicable, the **Client secret** value) that is used later in your embedded solution.

<StackSnippet snippet="emailcallbackuri" />

> **Note:** New apps are automatically assigned the default authentication policy, which requires a user to verify their identity with two factors. To view or change this policy, select the **Sign On** tab, and then locate the **User Authentication** section.

<StackSnippet snippet="appsbaseurl" />

## Set up your Okta org for your use case

After you've created your app integration in your Okta org, the next step is to configure your app and org to support the use cases that you're implementing.

* For a basic password factor only use case, see [Set up your Okta org for a password factor only use case](#set-up-your-okta-org-for-a-password-factor-only-use-case)
* For a password-optional use case, see [Set up your Okta org for a password-optional use case](#set-up-your-okta-org-for-a-password-optional-use-case)
* For a multifactor use case, see [Set up your Okta org for a multifactor use case](#set-up-your-okta-org-for-a-multifactor-use-case)
* For a social sign-in use case, see [Set up your Okta org for a social IdP use case](#set-up-your-okta-org-for-a-social-idp-use-case)

### Set up your Okta org for a password factor only use case

This section shows you how to set up your Okta org and app to support password factor-only use cases. These use cases are intended to use the password factor without any additional factors (such as email or phone SMS). In the [Create a new application](#create-a-new-application) section, the app is assigned **Any two factors**, the default policy for a new app that requires a user to verify their identity with any two enabled authentication factors.

First, assign the **Password only** policy to your app:

1. In the Admin Console, go to **Applications** > **Applications**, and select your app.
1. Select the **Sign On** tab.
1. Click **Edit** in the **User Authentication** section.
1. Select **Password only** for the **Authentication policy**, and then click **Save**.

Next, check that the password authenticator doesn't require any additional verification.

1. Go to **Security** > **Authenticators**.
1. Select **Edit** from the **Actions** menu on the **Password** authenticator row.
1. On the **Password** policy page, scroll down to the rules section and click the pencil icon next to the **Default Rule**.
1. In the **Edit Rule** dialog box, select **Not required** in the **AND Additional verification is** section.
1. Click **Update rule**.

### Set up your Okta org for a password-optional use case

For password-optional authentication, you first need to:

1. [Set up the email authenticator for authentication and recovery](#set-up-the-email-authenticator).
2. [Create a separate group for password-optional users](#create-a-group-for-password-optional-users).

To ensure that only specific app integrations can let users **sign up** without a password, do the following:

1. [Create a profile enrollment policy for password-optional users](#create-a-profile-enrollment-policy-for-password-optional-users) that adds them to the new group and assign your app to it.
2. Place this group at the lowest priority (just above the default policy) in the authenticator enrollment policy.

To ensure that only password-optional users can **sign in** without a password and everybody else is appropriately prompted for it, do the following:

1. [Create a new password-optional authenticator enrollment policy for the group](#create-a-password-optional-authenticator-enrollment-policy).
2. [Add a new global session policy for the group](#add-a-new-global-session-policy-for-password-optional-users).
3. [Add a new authentication policy for the group](#add-a-new-authentication-policy-for-password-optional-users).
4. Ensure that password-optional users never fall through to the default policy. The default policy should always have a password as a required authenticator.
5. Explicitly exclude your main admin account from any further password-optional policies that you create.

> **Note**: See also [Set up password-optional sign-in experience](https://help.okta.com/okta_help.htm?type=oie&id=ext-passwordless).

#### Common password-optional setup tasks

##### Set up the email authenticator

1. Open the **Admin Console** for your org.
2. Choose **Security** > **Authenticators** to show the available authenticators.
3. On the **Setup** tab, locate the **Email** authenticator, and then select **Actions** > **Edit**.
4. Set **This authenticator can be used for** to **Authentication and recovery**.
5. Click **Save**.

##### Create a group for password-optional users

1. Choose **Directory** > **Groups**.
2. Click **Add Group**.
3. Give the group a name, for example, `Password-optional Users`.
4. Click **Save**.

#### Enable password-optional user sign-up flow

To ensure that only specific app integrations can let users sign up without a password, do the following:

##### Create a profile enrollment policy for password-optional users

A profile enrollment policy determines the minimum information required from a user to create an account, and how the user should verify their identity before creating their account.

1. Choose **Security** > **Profile Enrollment** to show the existing enrollment policies.
2. Click **Add Profile Enrollment Policy**.
3. Locate the **Profile Enrollment** section of the policy and click **Edit**.
4. Set **Self-service registration** to **Allowed**.
5. Verify that **Required before access is granted** is selected for **Email Verification**.
6. Set **Add the user to group** to the group you just made for password-optional users.
7. Click **Save**.
8. Click **Manage apps**.
9. Click **Add an App to This Policy**.
10. Locate your app integration in the list and click **Apply** next to it.
11. Verify that the app is now in the list of Apps using the new Profile Enrollment Policy.

#### Enable password-optional user sign-in flow

To ensure that only password-optional users can sign in without a password and everybody else is appropriately prompted for it, do the following:

##### Create a password-optional authenticator enrollment policy

An authenticator enrollment policy determines which authenticators must challenge a user before they’re successfully signed in. In this case, email is set to **Required**, while all the other authenticators are set to **Optional**.

1. Choose **Security** > **Authenticators**.
2. Select the **Enrollment** tab, and then click **Add A Policy**.
3. Give the new policy a name. For example, "Password-optional Sign-In Policy".
4. Set **Assign to groups** to the group you just made for password-optional users.
5. In the **Eligible Authenticators** section:

  * Set **Email** to **Required**.
  * Set **Password** to **Optional**.
  * Verify that the remaining authenticators are set to **Optional**.

6. Click **Create Policy**.
7. Give the rule a name. For example, "Password-optional Sign-In Rule".
8. Set **Exclude Users** to the names of your main admin accounts.
9. Leave the other settings at their defaults, and then click **Create Rule**.
10. Move the new policy immediately above the Default Policy in the list of policies.

##### Add a new global session policy for password-optional users

A global session policy determines user session length and basic authentication rules for groups of users. In this case, the policy turns off MFA for all users in the password-optional user group. Therefore, they only need email authentication to sign in.

1. Choose **Security** > **Global Session Policy**.
2. Click **Add policy**.
3. Give the policy a name. For example, "Global Password Optional Policy".
4. Set **Assign to groups** to the group you just made for password-optional users.
5. Click **Create Policy and Add Rule**.
6. Give the rule a name. For example, "Global Password Optional Rule".
7. Verify that **Establish the user session with** is set to **Any factor used to meet the Authentication Policy requirements**.
8. Set **Multifactor authentication (MFA) is** to **Not required**.
9. Leave the other settings at their defaults, and then click **Create Rule**.

##### Add a new authentication policy for password-optional users

1. Choose **Security** > **Authentication Policies**.
2. Click **Add a policy**.
3. Give the policy a name, for example "Authenticate with Email Only", and then click **Save**.
4. Locate the Catch-all Rule of the new policy and select **Actions** > **Edit**.
5. Set **User must authenticate with** to **Any 1 factor type**.
6. For **Possession factor constraints are**:

   1. Verify that no options are selected.
   2. Verify that **Email** is listed in the box under **1 factor type**.

7. Click **Save**.
8. Select the **Applications** tab for your newly created policy, and click **Add app**.
9. Find your app in the list and click **Add** next to it.
10. Click **Close**.
11. Verify that the app is now listed in the **Applications** tab of the new policy.

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
1. On the **Edit Rule** dialog, scroll down to the **AND User must authenticate with** dropdown menu and select **Password + Another Factor**.
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
1. Specify the **Rule Name** (for example, Facebook and Okta Rule).
1. From the **THEN Use this identity provider** drop-down list, select the [Facebook Identity Provider that you've just created](#_4-create-the-facebook-identity-provider-in-okta). Since Okta is the default IdP, the two values should be:

   * Okta
   * Facebook Identity Provider (IdP)

1. Click **Create Rule**.
1. At the prompt, click **Activate**.
1. Your new rule appears above the **Default Rule** in the routing rule list. This top position signifies that the setting in your new rule overrides the **Default Rule**.
