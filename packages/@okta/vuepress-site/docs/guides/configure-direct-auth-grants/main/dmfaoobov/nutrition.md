<ApiLifecycle access="ie" />

This page describes how to implement a direct authentication multifactor out-of-band (MFA OOB) flow for your app. The guide uses Okta Verify Push with the Okta Verify authenticator.

---

#### Learning outcomes

* Understand the OAuth 2.0 direct authentication MFA OOB flow.
* Set up your app for direct authentication.
* Implement the MFA OOB flow in Okta.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An app that you want to implement OAuth 2.0 direct authentication MFA OOB with Okta
* A test user in your org that's enrolled in the Okta Verify authenticator
* The super admin role assigned to you. When you create an app, or update an existing app, you must have super admin permissions to enable direct authentication grant types.

<ApiAmProdWarning />
