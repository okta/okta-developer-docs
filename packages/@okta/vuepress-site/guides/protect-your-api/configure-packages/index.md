---
title: Add and Configure Packages
---
First, install an Okta SDK for your framework to help validate incoming tokens.

### Include the Dependency

<StackSelector snippet="independ"/>

### Configure the Middleware

You need to configure the Okta SDK with some information about your Okta domain. You can provide this configuration though environment variables, configuration files, or in code. Then, put the middleware provided by the SDK into your application's pipeline.

#### Things You Need

* **Client ID** - Find it in the applications list or on the **General** tab of the Okta OIDC application.
* **Org URL** - For the `issuer` parameter. Find your org URL on the Developer console dashboard in the upper-right corner. The `issuer` parameter is your Okta Org URL + `oauth2/default`.
* **Audience** - The audience of your [authorization server](https://developer.okta.com/authentication-guide/implementing-authentication/set-up-authz-server/), for example, `api: default`.

> Note: `https://okta.okta.com` is different from your admin URL. Don't include `-admin` in the value.

<StackSelector snippet="configmid"/>

<NextSectionLink/>
