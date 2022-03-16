---
title: Okta email (magic link/OTP) integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

Learn how to integrate the Okta Email authenticator into your app with the Embedded SDK.

---
**Learning outcomes**

<StackSnippet snippet="learningoutcomes" />
</br>

**What you need**

* <StackSnippet snippet="whatyouneedsdk" />
* <StackSnippet snippet="whatyouneedorg" />

**Sample code**

* <StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## Overview

<StackSnippet snippet="overview" />

## Get started

<StackSnippet snippet="getstarted" />

## Understand the magic link flow

<StackSnippet snippet="understandmagiclinkflow" />

## Update configurations

<StackSnippet snippet="updateconfigurations" />

<StackSnippet snippet="integratechallengemagiclinksummary"/>

<StackSnippet snippet="integratechallengemagiclink" />

<StackSnippet snippet="integratediffbrowserdeviceoverview"/>

<StackSnippet snippet="integratediffbrowserdevicesummary"/>

<StackSnippet snippet="integratediffbrowserdevice" />

<StackSnippet snippet="integrateenrollmagiclinksummary"/>

<StackSnippet snippet="integrateenrollmagiclink"/>

<StackSnippet snippet="integrateenrollotpsummary"/>

<StackSnippet snippet="integrateenrollotp" />

## Enable only OTP for the email authenticator

Magic links is a secure way to verify users' emails. However, you may want to use only OTP to provide an even higher level of security that positively proves that the person who started the request is the same person reading the email. In this case, OTP may be a more compatible solution. For example, if you have a banking app, which shows account information and allows for money transfers, magic links may be too convenient, and OTP may provide a better solution.

To disable magic link functionality, remove the links from the following email templates:

* Email Challenge
* Email Factor Verification
* Forgot password

In each template, find the anchor tag and remove it from the template HTML. The following screenshot identifies the magic link anchor tag (identified by `email-authentication-button` id) for the **Email Challenge** template.

<div class="common-image-format">

![Diagram showing email template with magic link](/img/authenticators/authenticators-email-magic-link-modify-template.png)

</div>

To learn more about customizing email templates and using the velocity template language, see [Customize an email template](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Email.htm) in the Okta Help Center.

</div>

<StackSnippet snippet="designconsiderationscustompasswordrecovery"/>
