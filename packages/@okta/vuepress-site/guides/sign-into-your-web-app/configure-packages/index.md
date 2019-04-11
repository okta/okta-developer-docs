---
title: Add and Configure Packages
---
## Add and Configure Packages

Next you need to add Okta to your application.

<StackSelector snippet="addconfigpkg"/>

### Configure the Middleware

You'll need the following values from the Okta Application and the Developer Console you worked with in [Create an Okta Application](/guides/sign-into-spa/-/create-okta-application):

* **Client ID** - Find it in the applications list or on the application's **General** tab.
* **Client Secret** - Find it in the applications list or on the application's **General** tab.
* **Okta Domain** - Find it on the Developer Console dashboard in the upper-right corner. 

You can configure the properties of your application with environment variables, system properties, or configuration files. 

<StackSelector snippet="configmid"/>

<!-- <NextSectionLink/> -->
