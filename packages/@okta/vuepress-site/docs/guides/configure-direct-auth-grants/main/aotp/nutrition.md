<ApiLifecycle access="ie" />

Use this guide to implement a direct authentication single-factor one-time passcode (OTP) flow for your app.

---

**Learning outcomes**

* Understand the OAuth 2.0 direct authentication OTP flow.
* Set up your app with the OTP grant type.
* Implement the OTP flow in Okta.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An app that you want to implement OAuth 2.0 direct authentication OTP with Okta
* A test user in your org that's enrolled in an authenticator like Google Authenticator
* The Direct Authentication feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enable this EA feature.
* The super admin role assigned to you. When you create an app, or update an existing app, you must have super admin permissions to enable direct authentication grant types.

<ApiAmProdWarning />
