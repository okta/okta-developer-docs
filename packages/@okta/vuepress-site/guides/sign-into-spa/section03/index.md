--
title: Add and Configure Packages
---
# Add and Configure Packages
Next you need to add Okta to your application. You can use our SDKs to sign the user in by redirecting to Okta.

## Install the SDK
Install the SDK via npm:

<StackSelector snippet="installsdk"/>

## Configure the Middleware
You need the Client ID that you copied from the Okta application that you created earlier to instantiate the middleware. You also need to know your Okta org URL, which you can find on the dashboard of the Okta Developer console.

The `issuer` parameter is your Okta Org URL + `oauth2/default`.

<StackSelector snippet="config"/>

> Note: `https://okta.okta.com` is different from your admin URL. Don't include `-admin` in the value.

<StackSelector snippet="attachcomponentsetc"/>

