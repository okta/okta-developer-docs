---
title: Sign Users into Your Mobile Apps
---
This guide walks you through how to sign users into your mobile applications and supports these operating systems:

- Android (Java)
- iOS (Swift)
- React Native

If you are building a web app that is served by a server framework, see [Sign Users into Your Web App](linkhere). If you are building a single-page app, see [Sign Users into Your Single-Page App](Linkhere).

# Before You Begin

These instructions assume that you: 

- Have an Okta Developer organization. If you don't, you can get one here: <https://developer.okta.com/signup>
- Have a project or application that you want to add authentication to.

> Note: If you'd prefer to download a complete sample application, you can use ours:

<stack selector>

<android sample app documentation>
</android documentation>
<iOS sample app documentation>
</iOS documentation>
<React Native sample app documentation>
</React Native sample app documentation>

</stack selector>

If you meet all of the prerequisites, then you can move on to the first step, which is creating an Okta application.

# Create an Okta Application
In Okta, applications are OpenID Connect (OIDC) clients that can use Okta authorization servers to authenticate users. Your Okta org already has a default authorization server, so you just need to create an OIDC client that uses it.

1. Sign in to the Okta Developer Console, click **Applications**, and then **Add Application**.
2. Select **Native** as the platform, and then click **Next**.
3. Provide a name for your Native application or leave the default value.
4. Enter the correct Okta scheme in the **Login redirect URIs** box, for example, `com.oktaorg.name:/callback`.
5. Leave the default values for **Group assignments** and **Grant Types Allowed**.
6. Click **Done**.
7. On the **General** tab of the app that you just created, click **Edit** and enter the correct Okta scheme in the **Logout redirect URIs** box, for example, `com.oktaorg.name:/logout`.

# Things You Need
After you create the application, there are two values that you need:

**Client ID** - Find it in the applications list or on the **General** tab of a specific application.
**O**rg URL** - Find it on the Developer console dashboard in the upper-right corner. 

These values are used in your application to set up the OpenID Connect flow with Okta.

# Add and Configure Packages
Next you need to add Okta to your application. The simplest way to add authentication to your app is using our SDK.

## Install the SDK

<stack selector>

<android>
</android>
<iOS>
</iOS>
<React Native>
</React Native>

</stack selector>


