---
title: Sign in with email only
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

Enable an email-only sign-in flow in your application using the embedded Okta Sign-In Widget.

**Learning outcomes**

* Configure your Okta org to enable user sign-in without a password.
* Integrate a password-optional sign-in flow into an application using the Sign-In Widget.

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Update configurations

Before you can start integrating password-optional sign-up flows in your app, <StackSnippet snippet="setupoktaorg" inline/>. See also <StackSnippet snippet="bestpractices" inline />.

> **Note:** To test the sign-in integration, you must use a user with an enrolled email authenticator.

## Integrate

### Summary of steps

The following summarizes the steps involved in the password-optional sign-in flow.

<StackSnippet snippet="integrationsummary" />

### 1. The user submits their username

The user enters their username and clicks the **Next** button to start the sign-in flow.

<div class="half border">

![The Sign-in Widget sign-in page with a username field and a Next button.](/img/pwd-optional/pwd-optional-widget-sign-in-page.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=2188%3A1717 pwd-optional-widget-sign-in-page
 -->

</div>

### 2. The user starts the email challenge flow

The Sign-In Widget displays a page for the user to start verifying their identity by email. Email is the only choice because:

* The user has only enrolled the email authenticator.
* Email is the only allowed authentication factor in your app integration's authentication policy.

The user clicks **Send me an email** to begin the email challenge flow.

<div class="half border">

![The Sign-in Widget verify-email page with a Send me an email button.](/img/pwd-optional/pwd-optional-widget-send-email-page.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=2188%3A1775 pwd-optional-widget-send-email-page
 -->

</div>

### 3. The user verifies their identity with the email authenticator

Okta Identity Engine sends a verification email to the user's primary email address. The email gives the user two ways to verify their identity:

* Copy a One-Time Password (OTP) from the email into the Sign-In Widget and submit it for verification.
* Click a "magic link" in the email that submits the OTP to Identity Engine on your behalf.

Your app requires no changes to use OTP since it's built into the Sign-In Widget. However, using magic links requires you to:

* Ensure the Sign-In Widget is always initialized with OTP and state values. See the [Embedded Okta Sign-In Widget fundamentals](/docs/guides/embedded-siw/main/) guide for details.
* Create an endpoint to handle the callback from the Magic Link.

<StackSnippet snippet="integrationsteps" />

</div>
