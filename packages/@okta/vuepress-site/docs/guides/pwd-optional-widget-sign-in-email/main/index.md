---
title: Sign in with email only
---

<ApiLifecycle access="ie" /><br>

Enable users to sign in with email only in an application using the embedded Okta Sign-In Widget.

**Learning outcomes**

* Set up password-optional sign-in in your Okta org
* Integrate password-optional sign-ins in your app using the Sign-In Widget

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

## Update configurations

Before you can start integrating password-optional sign-ins in your app, <StackSnippet snippet="setupoktaorg" inline/>. Also, to test the sign-in integration, you must use a user with an enrolled email authenticator.

## Integrate

### Summary of steps

The following summarizes the steps involved in the password-optional sign-in.

<StackSnippet snippet="integrationsummary" />

### 1. User signs in using their username

The user enters their username and selects the **Next** button to start the sign-in flow.

> **Note:** This guide assumes you have already set up and configured the Sign-in Widget. To learn more about how to add the Sign-In Widget to your app, see the [Embedded Okta Sign-In Widget fundamentals](docs/guides/embedded-siw/main/) guide.

<div class="half">

![Screenshot showing the Sign-in Wiget sign-in page with a username field and a Next button.](/img/pwd-optional/pwd-optional-widget-sign-in-page.png)

</div>

### 2. User submits to verify their identity by email

After the user selects **Next**, the widget displays a page allowing the user to verify their email. Email is the only available authenticator because

* the only authenticator the user is enrolled in is email
* the org's application integration policy allows for only one authentication factor type

To continue the email verification, the user selects the **Send me an email** button.

<div class="half">

![Screenshot showing the Sign-in Wiget verify-email page with a Send me an email button.](/img/pwd-optional/pwd-optional-widget-send-email-page.png)

</div>

### 3. User verifies their email

After the user selects **Send me an email**, the Identity Engine sends a verification email to the their primary email. The email allows the user to verify with a One-Time Password (OTP) or a magic link. No changes are required to your app for OTP since it's built into the widget, however, magic links require app updates. Specifically, update your application for

* a browser check to ensure that the user uses the same browser to initiate the sign-in and click on the magic link
* a routing method to handle the callback request originating from the magic link. This method pulls the `otp` and `state` query parameters from the request and passes them to the Sign-In Widget

>**Note:** For more information on magic links and OTP including customizations and complete user journeys, see the [Email Magic Links Overview](docs/guides/email-magic-links-overview/main/) guide.


<StackSnippet snippet="integrationsteps" />
