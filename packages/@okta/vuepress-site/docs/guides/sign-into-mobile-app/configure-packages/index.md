---
title: Add and configure packages
---
Next you need to add Okta to your application by installing our SDK.

### Install the SDK

<StackSelector snippet="installsdk"/>

### Configure the SDK

You need the following values from the Okta Application and the Admin Console that you worked with in <GuideLink link="../create-okta-application">Create an okta application</GuideLink>:

* **Client ID** &mdash; Find it in the applications list or on the **General** tab of your app integration.
* **Okta Domain** &mdash; The Okta Domain can be found on the Admin Console's global header in the upper-right corner. Click the section which displays your email and company name.  A drop-down menu will appear and display general org information including the full Okta domain (e.g. subdomain.okta.com).

> **Note:** Your Okta domain is different from your admin domain. Don't include `-admin` in your Okta domain.

You'll also need the full redirect URI that you defined in <GuideLink link="../define-callback">Define a callback route</GuideLink>.

<StackSelector snippet="configuremid"/>

<NextSectionLink/>
