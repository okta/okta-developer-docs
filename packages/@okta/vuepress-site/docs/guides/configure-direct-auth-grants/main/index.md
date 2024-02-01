---
title: Configure Direct Authentication grant types
excerpt: How to configure direct authentication authorization flows using primary factors and MFA
layout: Guides
---

<StackSnippet snippet="nutrition" />

---

## About the direct authentication <StackSnippet snippet="granttype" inline /> grant

Use direct authentication when you want your application to directly authenticate users. For example, you don't want to delegate authentication to an IdP or authorization server using an HTTP redirect in a web browser. While delegating authentication is preferred, use direct authentication in situations where there's a high degree of trust between the user and your app.

Also, you can use direct authentication where usability constraints hinder the use of browser-based flows, such as mobile applications.

<StackSnippet snippet="overview" />

> **Note:**
>
> * See [About MFA authenticators](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators) for more information on authenticators, and primary and secondary factors.
>
> * See [Configure a global session policy and authentication policies](https://developer.okta.com/docs/guides/configure-signon-policy/main/) for more information on configuring primary and secondary factor conditions.

## Grant-type flow

<StackSnippet snippet="flow-diagram"/>

## Enable authenticators for your org

Direct authentication grant type flows use passwordless authentication, such as using Okta Verify, SMS, or signing in with email. To use the direct authentication <StackSnippet snippet="granttype" inline /> flow, you must enable a non-password authenticator like <StackSnippet snippet="authenticator" inline />.

1. Open the Admin Console for your org.
1. Go to **Security** > **Authenticators** to view the available authenticators.
1. Do the following if <StackSnippet snippet="authenticator" inline /> isn't in the list:
    * Click **Add authenticator**.
    * Click **Add** on the authenticator tile, and then click **Add** in the next dialog.
    * Verify the status of the authenticator.
        * Select the **Enrollment** tab.
        * Identify the authenticator and verify that the authenticator is set to either **Optional** or **Required** in the **Eligible authenticators** section of the Default Policy.
    * If the authenticator is set to **Disabled**, enable the authenticator.
        * Click **Edit** for the Default Policy.
        * Select **Optional** from the dropdown box for the authenticator.
        * Click **Update Policy**.

## Set up your authorization server

To use the <StackSnippet snippet="granttype" inline /> flow, both your client app and the [Okta authorization server](/docs/concepts/auth-servers/) used with the app must have the <StackSnippet snippet="granttype" inline /> grant type enabled.

If your Okta org uses Identity Engine, then the <StackSnippet snippet="granttype" inline /> grant type is automatically configured in your org authorization server. For custom authorization servers used with your app, you must enable <StackSnippet snippet="granttype" inline />:

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, click the pencil icon next to the authorization server that you want to use.
3. Select the **Access Policies** tab.
4. Click the pencil icon from the **Actions** column for the **Default Policy Rule**.

    > **Note:** If you're using a different policy for your app, edit that policy instead.

5. In the **Edit Rule** dialog, select the **<StackSnippet snippet="granttype" inline />** checkbox (in addition to any other grant type that is already supported).
6. Click **Update Rule**.

## Set up your app

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

> **Note:** When you create an app, or update an existing app, you must have super admin permissions to enable direct authentication grant types.

1. Open the **Admin Console** for your org.
1. Select **Applications** > **Applications** to view the current app integrations.
1. Click **Create App Integration**.
1. Select **<StackSnippet snippet="sign-in-method" inline />** as the **Sign-in method**.
1. Select **Native Application** as the **Application type**, then click **Next**.
1. Specify the **App integration name**.
1. Enable the <StackSnippet snippet="setupappgt" inline /> in addition to the defaults.
1. Select **Allow everyone in your organization to access**, then click **Save**.
1. From the **General** tab of your app integration, copy and save the generated **Client ID** value to implement your authorization flow.

## Set up the authentication policy

In direct authentication flows, the client specifies a grant type that indicates the type of authenticator being used. However, the server can't grant a token until the client’s authentication policy is satisfied.

> **Note:** This example creates a new app authentication policy with a <StackSnippet snippet="noterule" inline /> for testing purposes.

1. Go to your app’s **Sign On** tab, scroll to the bottom, and click **View policy details**.
1. Click **Actions** on the right of the Default Policy title and select **Clone policy**.
1. Click **Actions** again and select **Edit name and description**.
1. Name the policy (for example, **<StackSnippet snippet="policyname" inline />**) and click **Save**.
1. Click **Add a rule**, name it (for example, **<StackSnippet snippet="rulename" inline />**).
1. Specify your test user for **AND User is**.
1. Skip down to **AND User must authenticate with** and select **<StackSnippet snippet="authwith" inline />**, and then click **Save**.
1. Open the application that you just created and select the **Sign On** tab.
1. Scroll to the **User authentication** section at the bottom and click **Edit**.
1. Select the authentication policy that you just created and click **Save**.

<StackSnippet snippet="setup-app" />

## Flow specifics

<StackSnippet snippet="use-flow" />

## Next steps

<StackSnippet snippet="nextsteps" />
