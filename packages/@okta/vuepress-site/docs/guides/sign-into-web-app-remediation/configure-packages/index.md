---
title: Add and configure packages
---
Next you need to add an Okta SDK to your application.

<StackSelector snippet="addconfigpkg"/>

### Configure the package

You need the following values from the Okta Application and the Developer Console that you worked with in <GuideLink link="../create-okta-application">Create an Okta application</GuideLink>:

* **Client ID** &mdash; Find it in the applications list or on the application's **General** tab.
* **Client Secret** &mdash; Find it on the application's **General** tab.
* **Issuer** &mdash; If you're using your Okta Org authorization server, this is the "Org URL" found in the upper right of your main dashboard page. If you're using a custom authorization server, you can find the URL in the Developer Console dashboard under **API** > **Authorization Servers**.

You can configure the properties of your application with configuration files, environment variables, or other framework specific techniques.

<StackSelector snippet="configmid"/>

<NextSectionLink/>
