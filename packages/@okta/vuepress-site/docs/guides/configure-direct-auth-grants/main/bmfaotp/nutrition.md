<ApiLifecycle access="ea" />
<ApiLifecycle access="ie" />

Use this guide to implement a direct authentication multifactor one-time-passcode (MFA OTP) flow for your app in Okta.

---

**Learning outcomes**

* Understand the OAuth 2.0 direct authentication MFA OTP flow.
* Set up your app with the MFA OTP grant type.
* Implement the MFA OTP flow in Okta.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An app that you want to implement OAuth 2.0 direct authentication MFA OTP with Okta
* A test user in your org that's enrolled in an authenticator like Google Authenticator
* The Direct Authentication feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enable this EA feature.
* Super admin role assigned to you. When you create an app, or update an existing app, you must have super admin permissions to enable direct authentication grant types.

<ApiAmProdWarning />
