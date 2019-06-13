---
title: Add and Configure Packages
---
Next you need to add authentication flow to your application. The simplest way to add authentication to your app is using our SDK.

### Install the SDK

<StackSelector snippet="installsdk"/>

### Configure the Middleware

You need the Client ID that you copied from the Okta application that you created earlier to instantiate the client. You also need to know your Okta org URL, which you can find on the dashboard of the Okta Developer console.

The `issuer` parameter is your Okta Org URL + `oauth2/default`.

<StackSelector snippet="configuremid"/>

<NextSectionLink/>
