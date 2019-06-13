---
title: Add and Configure Packages
---
Next you need to add an Okta SDK to your application.

<StackSelector snippet="addconfigpkg"/>

### Configure the Middleware

You need the following values from the Okta Application and the Developer Console that you worked with in <GuideLink link="../create-okta-application">Create an Okta Application</GuideLink>:

* **Client ID** - Find it in the applications list or on the application's **General** tab.
* **Client Secret** - Find it on the application's **General** tab.
* **Okta Domain** - Find it on the Developer Console dashboard in the upper-right corner as the **Org URL**. 

You can configure the properties of your application with environment variables, system properties, or configuration files. 

<StackSelector snippet="configmid"/>

<NextSectionLink/>
