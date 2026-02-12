---
title: Set up an Okta app
---

<ApiLifecycle access="ie" />

This guide covers some SDK-specific instructions for how to set up an app. Then, you can [run the Identity Engine sample apps](/docs/guides/oie-embedded-common-run-samples/) or [integrate the SDK or Widget](/docs/guides/oie-embedded-common-download-setup-app/) into your own app.

> **Note:**  For introductory information about setting up an Okta org, see [Set up your org](/docs/guides/set-up-org/).

---

#### Learning outcomes

Get a new app set up and ready for various use cases.

#### What you need

[Okta Integrator Free Plan org](/signup)

<StackSnippet snippet="repoarchivenote" />

---

## Overview of the embedded identity solutions

Okta provides two embedded identity solutions:

* **Embedded SDK only**: A highly customizable solution that provides native language support for various identity use cases.
* **Embedded Widget + SDK**: A quick and easy to set up solution that moves most of the heavy lifting to Okta. The amount of code that you need to write is small. However, many of the most advanced identity use cases (for example, social sign-in, multifactor authentication) are supported out of the box.

<div class="three-quarter">

![Displays Okta embedded solution components: (SDK) and (Sign-In Widget + SDK)](/img/oie-embedded-sdk/embedded-solution-overview.png)

</div>

This guide shows you how to set up your Okta org to support the embedded SDK or the embedded widget with SDK solutions. Ensure that you [get set up](#get-set-up) with Okta and [set up your Okta org for your use case](#set-up-your-okta-org-for-your-use-case) before you <StackSnippet snippet="downloadguideuri" inline />.

> **Note:** You can use direct authentication with your apps in Identity Engine rather than an embedded SDK. This enables you to directly authenticate users rather than delegating authentication to Okta Identity Providers and authorization servers through an HTTP redirect in a browser. Direct authentication is beneficial in scenarios where there's a high degree of trust between the user and the app. It's also beneficial where browser-based flows aren't feasible, like with mobile apps. See the `/challenge` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/challengeOrgAS), the `/primary-authenticate` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/primary-authenticateOrgAS), and the new `grant_types` for the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) to help tailor authentication to your specific use cases. Also, for information on how to set up each new grant type, see [Implement by grant type](/docs/guides/configure-direct-auth-grants/aotp/main/).

## Get set up

Sample apps are provided for each solution to show you exactly how to integrate the SDK and Sign-In Widget into your own app. Before you can run the sample apps or integrate embedded authentication into your own app, you need to do the following:

1. [Create your Okta account](/docs/guides/set-up-org/).
1. [Verify that the Interaction Code grant type is enabled](/docs/guides/implement-grant-type/interactioncode/main/#verify-that-the-interaction-code-grant-type-is-enabled).
1. [Update the default custom authorization server](/docs/guides/set-up-org/#enable-interaction-code-for-a-custom-authorization-server).
1. [Create an app](#create-an-app).

After you've created your app, you need to [set up your Okta org for your use case](#set-up-your-okta-org-for-your-use-case).

### Create an app

Create an app integration that represents the app you want to add authentication to with Okta:

1. Go to **Applications** > **Applications** in the Admin Console.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. <StackSnippet snippet="applicationtype" />
1. <StackSnippet snippet="newapp" />

   * Enter an app name.
   * Select the **Refresh Token** checkbox.
   * Click **Advanced** in the **Grant type** section and ensure that the **Interaction Code** checkbox is selected.

      <VerifyICGrantType />

   * Set **Sign-in redirect URIs** to <StackSnippet snippet="redirecturi" inline />
   * Set **Controlled Access** to **Allow everyone in your organization to access**.

1. Click **Save**.
1. Note the **Client ID** value (and if applicable, the **Client secret** value) on the **General** tab. You need it later in your embedded solution.

<StackSnippet snippet="emailcallbackuri" />

> **Note:** New apps are automatically assigned the default app sign-in policy, which requires a user to verify their identity with two factors. To view or change this policy, select the **Sign On** tab, and then locate the **User Authentication** section.

<StackSnippet snippet="appsbaseurl" />

## Set up your Okta org for your use case

After you create your app integration in your Okta org, configure your app and org to support the use cases that you're implementing:

* For a password-optional use case, see [Set up your Okta org for a password-optional use case](/docs/guides/set-up-org/#set-up-your-okta-org-for-a-password-optional-use-case)
* For a multifactor use case, see [Set up your Okta org for a multifactor use case](/docs/guides/set-up-org/#set-up-your-okta-org-for-a-multifactor-use-case)
* For a social sign-in use case, see [Set up your Okta org for a social IdP use case](#set-up-your-okta-org-for-a-social-idp-use-case)

### Set up your Okta org for a social IdP use case

Use this section to set up your Okta org and app to support Facebook IdP use cases that are available in this embedded authentication guide. If you want to implement a use case with another social IdP, see [Add an external identity provider](/docs/guides/identity-providers/). Review the list of Okta-supported social IdPs and instructions on how to configure them for social login with Okta.

Perform the following configurations after you [create an app](#create-an-app) to set up the Facebook IdP and your Okta org:

1. [Create a Facebook app in Facebook](#create-a-facebook-app-in-facebook).
1. [Set up the Facebook test user](#set-up-the-facebook-test-user).
1. [(Optional) Switch your Facebook app to Live mode](#switch-your-facebook-app-to-live-mode)&mdash;this step isn't required if you want to remain in Facebook Development mode.
1. [Create the Facebook Identity Provider in Okta](#create-the-facebook-identity-provider-in-okta).
1. [Add an Identity Provider routing rule in Okta](#add-an-identity-provider-routing-rule-in-okta).

#### Create a Facebook app in Facebook

1. Go to [Facebook for Developers](https://developers.facebook.com/) and click the **Login** link. If you don't have an account, create one.
1. Use these Facebook [instructions](https://developers.facebook.com/docs/apps/register) as a guide to create a Facebook app. When you create the Facebook app, ensure that you select **None** as the app type.
1. Select the app that you created from the Facebook [Apps](https://developers.facebook.com/apps/) page.
1. Scroll to the **Add a product** section on the App Dashboard page and click the **Set up** link in the **Facebook Login** tile.
1. Select **Web** as the platform type on the first set up page.
1. Set the value for **Site URL** to `https://{yourOktaDomain}/oauth2/v1/authorize/callback` (for example: `https://integrator-12345678.okta.com/oauth2/v1/authorize/callback`).
1. Click **Save**, **Continue**, and then click **Next** until you finish.

##### Configure Facebook settings

1. Click **Facebook Login** (under products) in the left navigation menu, and then click **Settings**.
1. Locate **Client OAuth Settings** on the **Settings** page and add the following URLs for the **Valid OAuth Redirect URIs** field:
      `https://{yourOktaDomain}/oauth2/v1/authorize/callback` (for example, `https://integrator-12345678.okta.com/oauth2/v1/authorize/callback`).
1. Click **Save Changes** at the bottom of the page.
1. Expand **Settings** on the left side of the page, and then click **Basic**.
1. Save the **App ID** and the **App Secret** values so you can add them to your Okta org's Identity Provider settings.

#### Set up the Facebook test user

A test account is required to test Facebook sign-in in Development mode. Facebook automatically creates one test user for you. Perform the following steps to find, set the password, and save this user's information.

1. From the Facebook App Dashboard page, click **Roles** and then click **Test Users**.
1. Click **Edit** for the test user and select **Change the name or password for this test user**.
1. In the **Edit Test User** dialog box, set a password in the **New Password** and **Confirm New Password** fields.
1. Click **Save**.
1. Save the test user's **email** and **password** for testing social IdP sign-in use cases with Okta and Facebook.

#### Switch your Facebook app to Live mode

> **Note:** This section is optional.

By default, your Facebook app is in Development mode. This means that only the test user and the user that you used to sign in and create the Facebook app can use the app. As a result, you can only use these users when you test your Facebook sign-in use cases.

If you would like to sign in any public Facebook user, you need to set the Facebook app to Live mode. To switch your Facebook app to Live mode, perform the following steps:

1. From the Facebook App Dashboard page, click **Settings** and then click **Basic**.
1. Specify a value in the **Privacy Policy URL** field for your app. If you don't have a privacy URL, you can temporarily use: `https://www.okta.com/privacy-policy/`.
1. Click **Save Changes** at the bottom of the page.
1. At the top of the App Dashboard page, use the **App Mode** toggle to switch the app from **In development** to **Live** mode.
1. In the **Switch to Live Mode** dialog box, click **Switch Mode**.

#### Create the Facebook Identity Provider in Okta

To connect your org to Facebook, you need to add and configure the Facebook IdP in Okta. The following steps assume that you've [created and configured your Facebook app](#create-a-facebook-app-in-facebook). Ensure that you have the Facebook **App ID** and **App Secret** values available.

1. In the Admin Console, go to **Security** > **Identity Providers**.
1. Click **Add Identity Provider**, and then select **Add Facebook**.
1. Enter a name (for example, Facebook IdP) on the **Add Identity Provider - Facebook** page.
1. Keep the default **SSO Only** option for the **IdP Usage** field.
1. Specify the Facebook **App ID** as the **Client ID**, and the Facebook **App Secret** as the **Client Secret**.
1. Keep the default values for **public_profile** and **email** in the **Scopes** field, and click **Add Identity Provider**.

#### Add an Identity Provider routing rule in Okta

The final step is to add the [created Facebook IdP](#create-the-facebook-identity-provider-in-okta) to the routing rule.

1. Go to **Security** > **Identity Providers** in the Admin Console.
1. Click the **Routing Rules** tab on the Identity Providers page, and then click **Add Routing Rule**.
1. Specify the **Rule Name** (for example: Facebook and Okta Rule).
1. Select the [Facebook Identity Provider that you created](#create-the-facebook-identity-provider-in-okta) from the **THEN Use this identity provider** dropdown list. Since Okta is the default IdP, the two values should be:

   * Okta
   * Facebook Identity Provider (IdP)

1. Click **Create Rule**.
1. Click **Activate** at the prompt. Your new rule appears above the **Default Rule** in the routing rule list. This top position signifies that the setting in your new rule overrides the **Default Rule**.
