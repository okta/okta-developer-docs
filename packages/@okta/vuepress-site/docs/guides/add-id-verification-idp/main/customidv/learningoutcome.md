## <StackSnippet snippet="idp" inline />

This document explains how to configure a custom IDV vendor as an identity provider (IdP) for your org. You can configure a custom IDV vendor as an IdP in your org by creating an account with the vendor, adding it as an IdP in Okta, and then testing the configuration.
<br></br>

> **Note:** IDV vendors are listed as IdPs in the Admin Console. This guide refers to the custom IDV vendor as an IDV vendor.

Okta manages the connection to the IDV vendor for your app, sitting between your app and the vendor that verifies your users. When a user signs in, you can verify their identity by having them submit a proof of identity to the IDV vendor.

---

#### Learning outcomes

Configure a custom IDV vendor so that your user’s identities are verified when they enroll a new authenticator.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* [An IDV vendor that's integrated with Okta](/docs/guides/idv-integration/)
* An account with the custom IDV vendor
* A test [user account](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) that you can use to enroll an authenticator
* A test [group](https://help.okta.com/okta_help.htm?type=oie&id=usgp-groups-create) in your org that the test user is added to

---
