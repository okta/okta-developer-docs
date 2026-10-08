## Email (primary factor)

This page describes how to implement a direct authentication out-of-band (OOB) flow for your app. The guide uses the Email authenticator, where Okta emails a one-time verification code to the user.

---

#### Learning outcomes

* Understand the OAuth 2.0 direct authentication OOB flow using the Email channel.
* Set up your app for direct authentication.
* Implement the Email OOB flow in Okta.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An app that you want to implement OAuth 2.0 direct authentication OOB with Okta
* A test user in your org enrolled in the Email authenticator
* The super admin role assigned to you. When you create an app, or update an existing app, you must have super admin permissions to enable direct authentication grant types.

<ApiAmProdWarning />
