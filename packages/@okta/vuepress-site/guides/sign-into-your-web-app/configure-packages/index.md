---
title: Add and Configure Packages
---
Next you need to add Okta to your application.

<StackSelector snippet="addconfigpkg"/>

### Configure Dependencies

<StackSelector snippet="configdep"/>

### Configure the Middleware

You need the Client ID and Client Secret that you copied from the Okta application that you created earlier to instantiate the middleware. You also need to know your Okta org URL, which you can find on the dashboard of the Okta Developer console.

You can configure the properties of your application with environment variables, system properties, or configuration files. An example `application.properties` file looks like:

<StackSelector snippet="configmid"/>
