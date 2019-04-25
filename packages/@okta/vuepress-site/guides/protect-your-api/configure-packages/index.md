---
title: Add and Configure Packages
---
First, install an Okta SDK for your framework to help validate incoming tokens.

### Include the Dependency

<StackSelector snippet="independ"/>

### Configure the Middleware

You need to configure the Okta SDK with some information about your Okta domain. You can provide this configuration though environment variables, configuration files, or in code. Then, put the middleware provided by the SDK into your application's pipeline.

#### Things You Need

* **Okta Domain** - Find it on the Developer Console dashboard in the upper-right corner. 
* **Audience** - The audience of your [authorization server](https://developer.okta.com/authentication-guide/implementing-authentication/set-up-authz-server/), for example, `api://default`.

You can configure the properties of your application with environment variables, system properties, or configuration files. 

> Note: `https://{yourOktaDomain}` is different from your admin URL. Don’t include -admin in the value. 
When copying your Okta domain from the developer console, you can find the correct value in upper right corner of the dashboard.

<StackSelector snippet="configmid"/>

<NextSectionLink/>
