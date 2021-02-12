---
title: Add and configure packages
---
Next you need to add an Okta SDK to your application.

<StackSelector snippet="addconfigpkg"/>

### Configure the package

You need the following values from the Okta Application and the Admin Console that you worked with in <GuideLink link="../create-okta-application">Create an Okta application</GuideLink>:

* **Client ID** &mdash; Find it in the applications list or on the application's **General** tab.
* **Client Secret** &mdash; Find it on the application's **General** tab.
* **Okta Domain** &mdash; The Okta Domain can be found on the Admin Console's global header in the upper-right corner. Click the section which displays your email and company name.  A drop-down menu will appear and display general org information including the full Okta domain (e.g. subdomain.okta.com).

You can configure the properties of your application with configuration files, environment variables, or other framework specific techniques.

<StackSelector snippet="configmid"/>

<NextSectionLink/>
