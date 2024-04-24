---
title: Sign in with email only
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

Enable an email-only sign-in flow in your app using the embedded Okta Sign-In Widget.

#### Learning outcomes

* Configure your Okta org to enable a user to sign in without a password.
* Integrate a password-optional sign-in flow into an app using the Sign-In Widget.

#### What you need

<StackSnippet snippet="whatyouneed" />
</br>

#### Sample code

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

The user enters their username and clicks **Next** to start the sign-in flow.

<div class="half wireframe-border">

![The Okta Sign-In Widget's sign-in form with a field for a username, next button, and links to reset your password and sign up](/img/wireframes/widget-sign-in-form-username-only-sign-up-forgot-your-password-links.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3401%3A37287&t=vr9MuCR8C4rCt3hC-1 widget-sign-in-form-username-only-sign-up-forgot-your-password-links
 -->

</div>

### 2. The user starts the email challenge flow

The Sign-In Widget displays a page for the user to start verifying their identity by email. Email is the only choice because:

* The user has only enrolled the email authenticator.
* Email is the only allowed authentication factor in your app integration's authentication policy.

The user clicks **Send me an email** to begin the email challenge flow.

<div class="half wireframe-border">

![The Okta Sign-In Widget's prompt to enter the code or click a link sent in an email to the user. Also, a button to resend the email](/img/wireframes/widget-send-email-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3401%3A37261&t=vr9MuCR8C4rCt3hC-1 widget-send-email-form
 -->

</div>

### 3. The user verifies their identity with the email authenticator

Okta Identity Engine sends a verification email to the user's primary email address. The email gives the user two ways to verify their identity:

* Copy a one-time passcode (OTP) from the email into the Sign-In Widget and submit it for verification.
* Click a "magic link" in the email that submits the OTP to Identity Engine on your behalf.

Your app requires no changes to use OTP since it's built into the Sign-In Widget. However, using magic links requires you to:

* Ensure that the Sign-In Widget is always initialized with OTP and state values. See the [Embedded Okta Sign-In Widget fundamentals](/docs/guides/embedded-siw/main/) guide for details.
* Create an endpoint to handle the callback from the magic link.

<StackSnippet snippet="integrationsteps" />

</div>
