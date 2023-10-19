---
title: Configure direct authentication grant types
excerpt: How to configure authorization flows using direct authentication grant types with Okta
layout: Guides
---

<StackSnippet snippet="nutrition" />

<StackSnippet snippet="nut-facts-samplecode" />

---

## About the direct authentication <StackSnippet snippet="granttype" inline /> grant

Use direct authentication when you want your application to directly authenticate users. For example, you don't want to delegate authentication to an IdP or authorization server using an HTTP redirect in a web browser. While delegating authentication is preferred, use direct authentication in situations where there's a high degree of trust between the user and your app.

Also, you can use direct authentication where usability constraints hinder the use of browser-based flows, such as mobile applications.

<StackSnippet snippet="overview" />

## Grant-type flow

<StackSnippet snippet="flow-diagram"/>

## Enable authenticators for your org

Direct authentication grant type flows use passwordless authentication, such as using Okta Verify, SMS, or signing in with email. You need a non-password authenticator enabled like <StackSnippet snippet="authenticator" inline /> in your org to use the direct authentication <StackSnippet snippet="granttype" inline /> flow.

1. Open the Admin Console for your org.
1. Select **Security** > **Authenticators** to view the available authenticators.
1. Do the following if <StackSnippet snippet="authenticator" inline /> isn't in the list:
    * Click **Add authenticator**.
    * Click **Add** on the authenticator tile, and then click **Add** in the next dialog.
    * Select the **Enrollment** tab.
    * Verify that the authenticator is set to either **Optional** or **Required** in the **Eligible authenticators** section of the Default Policy.
1. Click **Edit** for the Default Policy if the authenticator is set to **Disabled**.
1. Select **Optional** from the dropdown box for the authenticator, and then click **Update Policy**.

START WORKING HERE FOR SHARING CONTENT

## Set up your authorization server

To use the <StackSnippet snippet="granttype" inline /> flow, both your client app and the [Okta authorization server](/docs/concepts/auth-servers/) that you're using with the app must have the MFA OOB grant type enabled.

If your Okta org uses Identity Engine, then the MFA OOB grant type is automatically configured in your org authorization server. For custom authorization servers that you're using with your app, you must enable the MFA OOB grant:

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, select the pencil icon next to the authorization server that you want to use.
3. Select the **Access Policies** tab.
4. Select the pencil icon from the **Actions** column for the **Default Policy Rule**.

    If you aren’t using the Default Policy for your client app that requires the MFA OOB grant, select the policy that applies to your app.

5. In the **Edit Rule** dialog, select the **MFA OOB** checkbox (in addition to any other grant type that is already supported).
6. Click **Update Rule**.


## Set up your app

Before you can implement authorization, you need to register your app in Okta by creating an app integration from the Admin Console.

1. Open the **Admin Console** for your org.
1. Choose **Applications** > **Applications** to view the current app integrations.
1. Click **Create App Integration**.
1. Select **<StackSnippet snippet="sign-in-method" inline />** as the **Sign-in method**.

<StackSnippet snippet="setup-app" />

<StackSnippet snippet="install-sdk" />

## Flow specifics

<StackSnippet snippet="use-flow" />

<StackSnippet snippet="examples" />

## Next steps

<StackSnippet snippet="nextsteps" />
