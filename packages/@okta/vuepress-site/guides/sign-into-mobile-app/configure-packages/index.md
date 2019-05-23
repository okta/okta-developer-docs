---
title: Add and Configure Packages
---
Next you need to add Okta to your application. The simplest way to add authentication to your app is using our SDK.

### Install the SDK

<StackSelector snippet="installsdk"/>

### Configure the Middleware

Things You Need:

* **Client ID** - You copied the Client ID from the Okta application that you created earlier to instantiate the client. You can find it in the applications list or on the application's **General** tab.
* **Okta Domain** - You need to know your Okta org URL, which you can find on the Developer Console dashboard in the upper-right corner as the **Org URL**.

> Note: The `issuer` parameter is your Okta Org URL + `oauth2/default`.

<StackSelector snippet="configuremid"/>

<NextSectionLink/>
