---
title: Add and Configure Packages
---
First, install an Okta SDK for your framework to help validate incoming tokens.

### Include the Dependency

<StackSelector snippet="independ"/>

### Configure the Middleware

You need to configure the Okta SDK with some information about your Okta domain. You can provide this configuration through environment variables, configuration files, or in code. Then, put the middleware provided by the SDK into your application's pipeline.

#### Things You Need

* **Okta Domain** - Find it on the Developer Console dashboard in the upper-right corner as the **Org URL**.
* **Audience** - The audience of your [authorization server](https://developer.okta.com/authentication-guide/implementing-authentication/set-up-authz-server/). The default value is `api://default`.

> Note: `https://{yourOktaDomain}` is different from your admin URL. Don't include `-admin` in the value. 

<StackSelector snippet="configmid"/>

<NextSectionLink/>
