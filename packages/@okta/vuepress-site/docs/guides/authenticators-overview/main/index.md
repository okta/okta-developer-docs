---
title: Authenticators overview
---

<ApiLifecycle access="ie" /><br>

Increase the security of your app by requiring a user to verify their identity in more than one way.

---

## Overview

Strengthen your application's sign-in process by adding multiple authentication factors, or ways for a user to confirm their identity. Factors are enabled in the Okta org by creating a policy with one or more [authenticators](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators), and then assigning that policy to your app.

A policy manages both the [types of authenticators](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-authenticators) and which ones are required or optional. Multifactor authentication (MFA) means that the policy requires at least two factors for a user to sign in. For example, an application can require using Okta Verify in addition to a username and password.

An application must support two flows for an authenticator: enrollment and challenge. A user enrolls an authenticator before using it for the first time. This configures the authenticator for a particular user. For example, they use a QR Code or shared secret to add a time-based one-time password (TOTP) generator. New users for apps with MFA enabled enroll the required authenticators when they create an account. Users can also enroll optional authenticators at this point. The enrollment flow also occurs when a new, required authenticator is added to a policy.

The most common flow is challenge. During the challenge flow, the user fulfills the requirements for the authenticator, such as entering a one-time passcode (OTP) or answering a security question.

Okta verifies the user's identity at the end of both flows.

## Guides

The following guides step through adding a type of authenticator to your app using the embedded SDK for your platform:

* [Okta Email authenticator](/docs/guides/authenticators-okta-email/aspnet/main/)
* [Okta Verify](/docs/guides/authenticators-okta-verify/aspnet/main/)
* [Google Authenticator](/docs/guides/authenticators-google-authenticator/aspnet/main/)
* [FIDO2 (WebAuthn) authenticators](/docs/guides/authenticators-web-authn/aspnet/main/), such as a USB security key, fingerprint, FaceID, or Windows Hello

> **Note:** See the [Password authenticator](https://help.okta.com/okta_help.htm?type=oie&id=ext-configure-password) page for information on configuring the Password authenticator for your org.

In each guide, you learn:

* How to enable the authenticator in your Okta org.
* How to add the enrollment and challenge flows to your application for that authenticator.

> **Note:** These guides are for applications that use the embedded SDK deployment model. This offers the greatest level of flexibility and customization, but isn't as secure or maintainable as the embedded Sign-In Widget and redirect models. See [Redirect authentication vs. embedded authentication](/docs/concepts/redirect-vs-embedded/).
