---
title: Sign in to your mobile app
excerpt: Configure your Okta org and your mobile app to use Okta's embedded sign-in flow.
layout: Guides
---

Add authentication to your mobile app using the Okta [embedded model](/docs/concepts/redirect-vs-embedded/#embedded-authentication). This example creates a native iOS app with self-hosted authentication.

---

#### Learning outcomes

* Create an integration that represents your app in your Okta org.
* Configure the Interaction Code grant type in your Okta org.
* Open and review the sample native iOS app from the SDK.
* Add dependencies and configure the sample mobile app to use Okta.
* Test your integration by signing in as a user.

#### Sample code

<StackSnippet snippet="samplecode" />

---

## Set up your Okta org

Set up your [Okta org](/docs/concepts/okta-organizations/). You can sign up free for an [Okta Integrator Free Plan org](https://developer.okta.com/signup/) that works with the sample app.

Make a note of your Okta domain. Use it wherever `{yourOktaDomain}` appears in this guide.

> **Note**: If you're using an existing org, verify that API Access Management is enabled: Open your Admin Console, go to **Security** > **API**, and verify that an **Authorization Servers** tab is present. If not, contact your support team to enable the feature in your org.
>

### Enable the Interaction Code grant type for your org

Enable this grant type to allow apps the ability to use embedded sign-in flows across your entire org. You must have Super admin permissions to enable this setting.

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
   > **Note:** If you choose the wrong app type, it can break the sign-in or sign-out flows. Integrations require the verification of a client secret, which public clients don't have.
1. Enter an **App integration name**.
1. Select the **Grant type**. Ensure the **Authorization Code** grant type is selected. Add the **Refresh Token** grant type and under the **Advanced** arrow, select **Interaction Code**.
1. Enter the callback routes.

    <StackSnippet snippet="redirectvalues" />

1. Select the type of **Controlled access** for your app in the **Assignments** section. You can allow all users to have access or limit access to individuals and groups. See the [Assign app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-user-app-assign) topic in the Okta product documentation.
1. Click **Save** to create the app integration and open its configuration page.
1. On the **General** page, make a note of the following values: **Client ID**, **Sign-in redirect URIs**, and **Sign-out redirect URIs**. You'll need to use these values to configure your iOS app.

### Update the default custom authorization server

You need to configure your custom authorization server to use the Interaction Code grant type.

1. Open the **Admin Console** for your org and go to **Security** > **API**.
1. Select the **Authorization Servers** tab, select the custom authorization server that you want to update, and click the edit icon.
1. Select the **Access Policies** tab.
1. Ensure that your default custom authorization server has an access policy. Add an access policy if it's not there. See [Create access polices](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-access-policies).
1. From the **Actions** column for the policy that applies to your app, edit the policy rule.
1. In the **IF Grant type is** section of the **Edit Rule** dialog, click **Advanced**.
1. Select **Interaction Code** in the **Other grants** section.

     <VerifyICGrantType />

1. Click **Create Rule** or **Update Rule**.

## Download the Okta Client SDK for Swift

Download the Okta Client SDK for Swift repository to access libraries and sample iOS applications for various authentication flows. See the [Okta Client SDK for Swift ReadMe](https://github.com/okta/okta-mobile-swift?tab=readme-ov-file#okta-client-sdk-for-swift) and the [OktaClient SDK documentation](https://okta.github.io/okta-mobile-swift/development/documentation/). This guide uses the `OktaIdxAuth` library and sample app to demonstrate a native iOS app with self-hosted authentication.

```bash
git clone https://github.com/okta/okta-mobile-swift.git
cd okta-mobile-swift
```

### Open the self-hosted sample application

1. In Xcode, open the `IdxAuthSignIn.xcodeproj` workspace from the root level (`/Samples/IdxAuthSignIn/IdxAuthSignIn.xcode.proj`).
1. Select the `IdxAuthSignIn` application target, and choose a simulator type to use.
1. 

### Add project dependencies

1. In Xcode, choose **File** > **Add Package Dependencies**.
1. Search for and select `okta-mobile-swift`.
1. Ensure the **Dependency Rule** is **Up to Next Major Version**, and you're adding to the correct project (`IdxAuthSignIn`).
1. Click **Add Package**.
1. In the **Choose Package Products for okta-mobile-swift** dialog, add the packages `AuthFoundation` and `OktaIdxAuth` to the project by clicking in the **Add to Target** field
1. Click **Add Package**.

### Configure the Okta property list

Update the Okta property list (`Okta.plist`) with the Okta org OIDC settings you created earlier in [Create an Okta integration for your iOS app](#create-an-okta-integration-for-your-ios-app)

1. In Xcode, open the sample app's `Okta.plist` file (`IdxAuthSignIn/IdxAuthSignIn/Okta`).
1. Use the built-in-editor, or other means, to update the values for the following keys:

    * `issuer_url`: The customer authorization server URL for your org (for example, `https:{yourOktaDomain.okta.com/oauth2/default}`)
    * `client_id`: The `id` for your Okta app integration (for example, `0oatd7g4tyk3bSlgL8867`)
    * `scope`: The scopes required by the app. Use `openid profile offline_access`.
    * `redirect_uri`: Your Okta app integration's **Sign-in redirect URIs** value, for example, `com.okta.{yourOktaDomain}:/callback`
    * `logout_redirect-uri`: Your Okta app integration's **Sign-our redirect URIs** value, for exampple, `com.okta.{yourOktaDomain}:/`

1. Save the file.

### Run and test the sample application

xyz 














## Create an app

In this section you create a sample mobile app and add redirect authentication using your new Okta app integration.

### Create a project

<StackSnippet snippet="createproject" />

### Add packages

Add the required dependencies for using the Okta SDK with your app.

<StackSnippet snippet="addconfigpkg" />

### Configure your app

The app uses information from the Okta integration that you created earlier to communicate with the API:

* Redirect URI
* Post logout redirect URI
* Client ID
* Issuer

<StackSnippet snippet="configmid" />

#### Find your config values

If you don't have your configuration values handy, you can find them in the Admin Console. Go to **Applications** > **Applications** and find the app integration that you created earlier:

* **Sign-in redirect URI**: Found on the **General** tab in the **Login** section.
* **Sign-out redirect URI**: Found on the **General** tab in the **Login** section.
* **Client ID**: Found on the **General** tab in the **Client Credentials** section.
* **Issuer**: Found in the **Issuer URI** field for the authorization server that appears by selecting **Security** > **API** from the left navigation pane.

### Define a callback route

To sign users in, your app opens a browser and displays an Okta-hosted sign-in page. Okta then redirects back to your app with information about the user. To achieve this you need to define how Okta can redirect back to your app. This is called a callback route or redirect URI.

In mobile apps, use a custom scheme similar to `your-app:/callback` so that your app can switch back into the foreground after the user is done signing in through the browser. This should be the same value that you used for the sign-in and sign-out redirect URIs.

Your mobile app is responsible for parsing the information Okta sends to the callback route. The Okta SDKs can help you with this task (covered later in the [Open the sign-in page](#open-the-sign-in-page) section). For now, define the route itself.

<StackSnippet snippet="definecallback" />

## Open the sign-in page

The SDK signs in the user by opening an Okta-hosted web page. The app can send the SDK sign-in request when the following occurs:

* A user visits a protected route.
* A user taps a button.

<StackSnippet snippet="opensignin" />

## Get info about the user

The ID token returned by Okta contains user information or claims that are based on the scopes requested by the app (see [Configure your app](#configure-your-app)).

This app includes the `profile` scope that includes the user's email address, name, and preferred username. You can use this information to update your UI, such as showing the customer's name.

Use the Okta user information endpoints for items that aren't available in the ID token. For general information on requesting user info, see the [userinfo response example](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/userinfoCustomAS).

<StackSnippet snippet="getuserinfo" />

## Sign in a user

Test your integration by signing in a user using your mobile app.

<StackSnippet snippet="testapp" />

## Check for a session at startup

Okta issues an access token when the user signs in. This token allows the user to access the services for a set amount of time. Check for an existing unexpired token when the app launches to find out if the user is still signed in.

<StackSnippet snippet="checkfortoken" />

## Keep the user signed in

Access tokens are short-lived. Yet, for some types of apps users expect to remain signed in for a long time. Granting a refresh token in your app integration enables the client to request an updated access token.

Enable a refresh token in your app integration by following these steps:

1. Launch the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations.
1. Click the name of your integration to open the configuration manager.
1. Click **Edit** in the **General Settings** section.
1. Select **Refresh Token** in the **Application** section.
1. Click **Save** at the bottom of the **General Settings** section.

<StackSnippet snippet="refresh" />

## Use the access token

Your own server API (a resource server in OAuth 2.0) uses the Okta-generated access token for the following:

* To authenticate that the user is signed in.
* To ensure that the user is authorized to perform the action or access the information.

Use the access token by adding it to the HTTP `Authorization` header of outgoing requests in your mobile or other client using this format:

```
Authorization: Bearer ${token}
```

Your API then checks incoming requests for valid tokens. To learn how to protect your API endpoints and require token authentication, see [Protect your API endpoints](/docs/guides/protect-your-api/).

<StackSnippet snippet="usetoken" />

## Next steps

This guide showed you how to sign users in with their username and password using an Okta themed sign-in page. Here are some ways to extend that functionality:

* [Customize the sign-in page that Okta presents](https://developer.okta.com/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
* [Share a sign-in session with native mobile apps](https://developer.okta.com/docs/guides/shared-sso-android-ios/)
* [Add a sign-in flow using biometrics](https://developer.okta.com/docs/guides/unlock-mobile-app-with-biometrics/)
* [Protect your servers' API endpoints](https://developer.okta.com/docs/guides/protect-your-api/)

<StackSnippet snippet="specificlinks" />
