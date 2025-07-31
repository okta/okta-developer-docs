---
title: Sign in to your native mobile app
excerpt: Configure your Okta org and your native mobile app for basic authentication use cases.
layout: Guides
---

Add authentication to your mobile app using the Okta Client SDK for Swift. This example implements a sample iOS app, using Okta APIs and interaction code flow, for browserless authentication.

---

#### Learning outcomes

* Create an integration that represents your app in your Okta org.
* Configure the Interaction Code grant type in your Okta org.
* Open and review the sample mobile iOS app from the SDK.
* Add dependencies and configure the sample mobile app to use Okta.
* Test your integration by signing in as a user.

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Overview of the Okta mobile sign-in flow

This guide introduces using the Okta Client SDK for Swift for integrating authentication flows in to your browserless, mobile apps.

You initialize your mobile app with your Okta org's app integration details. Then the flow requests the initial step, and then cycles through responding to steps until the user signs in, cancels, or an error occurs. Each sign-in step can include one or more user actions, such as choosing an authenticator or entering a one-time passcode (OTP).

The following sections demonstrate the iOS sign-in flow processes using`okta-mobile-swift` SDK, and begins by setting up your Okta org integration and then the SDK sample app ([IdxAuthSignIn](https://github.com/okta/okta-mobile-swift/tree/master/Samples/IdxAuthSignIn#idxauthsignin)).

## Set up your Okta org

Set up your [Okta org](/docs/concepts/okta-organizations/). You can sign up free for an [Okta Integrator Free Plan org](https://developer.okta.com/signup/) that works with the sample app.

Make a note of your Okta domain. Use it wherever `{yourOktaDomain}` appears in this guide.

### Enable the Interaction Code grant type for your org

Enable this grant type to allow apps the ability to use embedded sign-in flows across your entire org. You must have super admin permissions to enable this setting.

1. Open the Admin Console for your org.
1. Go to **Settings** > **Account** > **Embedded widget sign-in support**.
1. Click **Edit**.
1. Click **Advanced** in the **Grant type** section, and then select **Interaction Code**.
1. Click **Save**.

For further information on the Interaction Code grant type, see [Interaction Code grant type](/docs/concepts/interaction-code/).

### Create an Okta integration for your iOS app

An app integration represents your app in your Okta org. The integration configures how your app integrates with the Okta services. This includes which users and groups have access, authentication policies, token refresh requirements, redirect URLs, and more. The integration includes configuration information required by the app to access Okta.

To create your app integration in Okta using the Admin Console:

1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account. Click **Admin** on the top right of the page.
1. Open the apps configuration page by selecting **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select a **Sign-in method** of **OIDC - OpenID Connect**.
1. Select an **Application type** of **Native Application**, then click **Next**.
   > **Note:** If you choose the wrong app type, it can break the sign-in or sign-out flows.
1. Enter an **App integration name**.
1. Select the **Grant type**. Ensure that the **Authorization Code** grant type is selected. Add the **Refresh Token** grant type and under the **Advanced** arrow, select **Interaction Code**.
    >**Note:** You can't use the direct auth API grant types if you're using the Interaction Code grant.
1. Enter the callback routes.

    <StackSnippet snippet="redirectvalues" />

1. Select the type of **Controlled access** for your app in the **Assignments** section. You can allow all users to have access or limit access to individuals and groups. See the [Assign app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-user-app-assign) topic in the Okta product documentation.
1. Click **Save** to create the app integration and open its configuration page.
1. On the **General** page, make a note of the following values: **Client ID**, **Sign-in redirect URIs**, and **Sign-out redirect URIs**. You need to use these values to configure your iOS app.

### Update the default custom authorization server

Configure your custom authorization server with an access policy and to use the Interaction Code grant type.

1. Open the **Admin Console** for your org and go to **Security** > **API**.
1. Select the **Authorization Servers** tab, select the custom authorization server that you want to update, and click the edit icon.
1. Select the **Access Policies** tab.
1. Ensure that your default custom authorization server has an access policy. Add an access policy if it's not there. See [Create access policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-access-policies).
1. From the **Actions** column for the policy that applies to your app, edit the policy rule.
1. In the **IF Grant type is** section of the **Edit Rule** dialog, click **Advanced**.
1. Select **Interaction Code** in the **Other grants** section.

     <VerifyICGrantType />

1. Click **Create Rule** or **Update Rule**.

## Download the Okta Client SDK for Swift

Download the Okta Client SDK for Swift repository to access libraries and sample iOS apps for various authentication flows. See the [Okta Client SDK for Swift ReadMe](https://github.com/okta/okta-mobile-swift?tab=readme-ov-file#okta-client-sdk-for-swift) and the [OktaClient SDK documentation](https://okta.github.io/okta-mobile-swift/development/documentation/). This guide uses the `OktaIdxAuth` library and sample app to demonstrate an iOS app with browserless authentication.

```bash
git clone https://github.com/okta/okta-mobile-swift.git
cd okta-mobile-swift
```

### Open the browserless sample app

1. In Xcode, open the `OktaClient.xcworkspace` workspace from the root level.
1. In the navigator pane, select the `IdxAuthSignIn` app target from `Samples`, and choose a simulator type to use.

### Add project dependencies

1. In Xcode, choose **File** > **Add Package Dependencies**.
1. Search for and select `okta-mobile-swift`.
1. Ensure that the **Dependency Rule** is **Up to Next Major Version**, and you're adding to the correct project (`IdxAuthSignIn`).
1. Click **Add Package**.
1. In the **Choose Package Products for okta-mobile-swift** dialog, add the packages `AuthFoundation` and `OktaIdxAuth` to the project by clicking in the **Add to Target** field.
1. Click **Add Package**.

### Configure the Okta property list

Update the Okta property list (`Okta.plist`) with the Okta org OIDC settings that you created earlier in [Create an Okta integration for your iOS app](#create-an-okta-integration-for-your-ios-app).

1. In Xcode, open the sample app's `Okta.plist` file (`IdxAuthSignIn/IdxAuthSignIn/Okta`).
1. Use the built-in-editor, or other means, to update the string values for the following keys:

   | Key | Value |
   | --- | ----- |
   | `clientId` | The `id` for your Okta app integration (for example, `0oatd7g4tyk3bSlgL8867`) |
   | `issuer` | The customer authorization server URL for your org (for example, `https:{yourOktaDomain}.okta.com/oauth2/default`) |
   | `logoutRedirectUri` | Your Okta app integration's **Sign-our redirect URIs** value, for example, `com.okta.{yourOktaDomain}:/` |
   | `redirectUri` | Your Okta app integration's **Sign-in redirect URIs** value, for example, `com.okta.{yourOktaDomain}:/callback` |
   | `scope` | The scopes required by the app. Use `openid profile offline_access` |
   [[.table-word-break]]

1. Save the file.

### Run and test the sample app

1. Click the run button in the toolbar or choose **Product** > **Run** to build and run the app on the selected simulated or a real device.
1. In the simulator or device, click **Sign In**. You can see the **Client ID** of your app integration at the bottom of the simulator.
1. Sign in with a user assigned to your app integration. Authenticate with one or more authenticators based on your app's authentication policy.
1. Your user's profile appears. Click **Token details** to review the access token and the refresh token.
1. Click **Sign Out** and **Revoke Tokens** to sign out and return to the sign-in page.

<div class="half">

!["An image that shows the ios simulator with the start page of the IdxAuthSignIn app. The title "Embedded Auth with SDKs" and a sign-in button appears."](/img/ios-native-mobile-app-splash-screen.png)

</div>

## Next steps

Use the following references to review the authentication options and flows for your app:

* [Configuring your client](https://okta.github.io/okta-mobile-swift/development/documentation/browsersignin/configuringyourclient): a review of the sign-in authentication flows for browser-based apps.

* [Overview of the mobile Identity Engine SDK](/docs/guides/mobile-idx-sdk-overview/ios/main/): a detailed review of the sign-in flow and objects.
