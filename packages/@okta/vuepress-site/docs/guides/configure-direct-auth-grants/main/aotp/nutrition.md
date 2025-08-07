<ApiLifecycle access="ie" />

This page describes how to implement a direct authentication single-factor flow for your app using a one-time passcode (OTP) authenticator.

If you’re looking for a different authenticator supported by direct authentication, select one from the dropdown list on the right.

---

#### Learning outcomes

* Understand the OAuth 2.0 direct authentication OTP flow.
* Set up your app for direct authentication.
* Implement the OTP authenticator flow in Okta.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An app that you want to implement OAuth 2.0 direct authentication OTP with Okta
* A test user in your org that's enrolled in an authenticator like Google Authenticator
* The super admin role assigned to you. When you create an app, or update an existing app, you must have super admin permissions to enable direct authentication grant types.

<ApiAmProdWarning />
