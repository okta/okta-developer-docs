<ApiLifecycle access="ea" />
<ApiLifecycle access="ie" />

Use this guide to implement a direct authentication out-of-band (OOB) flow for your app. The guide uses the Phone authenticator with SMS or Voice factors.

---

**Learning outcomes**

* Understand the OAuth 2.0 direct authentication OOB flow.
* Set up your app with the OOB grant type.
* Implement the OOB flow in Okta.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An app that you want to implement OAuth 2.0 direct authentication OOB with Okta
* A test user in your org enrolled in the Phone authenticator with **SMS** and/or **Voice call** enabled
* The Direct Authentication feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enable this EA feature.
* The super admin role assigned to you. When you create an app, or update an existing app, you must have super admin permissions to enable direct authentication grant types.

<ApiAmProdWarning />
