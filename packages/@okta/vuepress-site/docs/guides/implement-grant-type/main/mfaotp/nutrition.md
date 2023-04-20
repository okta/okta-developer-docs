<ApiLifecycle access="ea" />
<ApiLifecycle access="ie" />

This guide explains how to implement a direct authentication MFA one-time-passcode (OTP) flow for your app in Okta.

---

**Learning outcomes**

* Understand the OAuth 2.0 direct authentication MFA OTP flow.
* Set up your app with the MFA OTP grant type.
* Implement the MFA OTP flow in Okta.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An app that you want to implement OAuth 2.0 direct authentication MFA OTP with Okta
* A test user in your org enrolled in an authenticator like Google Authenticator
* The Direct Authentication feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate the Direct Authentication feature and slide to enable.

<ApiAmProdWarning />
