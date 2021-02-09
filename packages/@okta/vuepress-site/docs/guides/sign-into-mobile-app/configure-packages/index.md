---
title: Add and configure packages
---
Next you need to add Okta to your application by installing our SDK.

### Install the SDK

<StackSelector snippet="installsdk"/>

### Configure the SDK

You need the following values from the Okta app integration and the Admin Console that you worked with in <GuideLink link="../create-okta-application">Create an Okta app integration</GuideLink>:

* **Client ID** &mdash; Find it in the applications list or on the **General** tab of your app integration.
* **Okta Domain** &mdash; Find it on the Admin Console dashboard in the upper-right corner as the **Org URL**.

> **Note:** Your Okta domain is different from your admin domain. Don't include `-admin` in your Okta domain.

You'll also need the full redirect URI that you defined in <GuideLink link="../define-callback">Define a callback route</GuideLink>.

<StackSelector snippet="configuremid"/>

<NextSectionLink/>
