---
title: Add and configure packages
---
First, install an Okta SDK for your framework to help validate incoming tokens.

### Include the dependency

<StackSelector snippet="independ"/>

### Configure the middleware

You need to configure the Okta SDK with some information about your Okta domain. You can provide this configuration through environment variables, configuration files, or in code. Then, put the middleware provided by the SDK into your application's pipeline.

#### Things you need

* **Okta Domain** &mdash; The Okta Domain can be found on the Admin Console's global header in the upper-right corner of the page. Click the section that displays your email and company name.  A drop-down menu appears and displays general org information including the full Okta domain (for example, `subdomain.okta.com`).

* **Audience** &mdash; The audience of your [Authorization Server](https://developer.okta.com/docs/guides/customize-authz-server/). The default value is `api://default`.

> **Note:** `https://${yourOktaDomain}` is different from your admin URL. Don't include `-admin` in the value. 

<StackSelector snippet="configmid"/>

<NextSectionLink/>
