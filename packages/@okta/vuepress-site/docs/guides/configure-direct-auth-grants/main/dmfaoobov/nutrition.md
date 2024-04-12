<ApiLifecycle access="ie" />

Use this guide to implement a direct authentication multifactor out-of-band (MFA OOB) flow for your app. The guide uses Okta Verify Push with the Okta Verify authenticator.

---

#### Learning outcomes

* Understand the OAuth 2.0 direct authentication MFA OOB flow.
* Set up your app with the MFA OOB grant type.
* Implement the MFA OOB flow in Okta.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An app that you want to implement OAuth 2.0 direct authentication MFA OOB with Okta
* A test user in your org that's enrolled in the Okta Verify authenticator
* The Direct Authentication feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enable this EA feature.
* The super admin role assigned to you. When you create an app, or update an existing app, you must have super admin permissions to enable direct authentication grant types.

<ApiAmProdWarning />
