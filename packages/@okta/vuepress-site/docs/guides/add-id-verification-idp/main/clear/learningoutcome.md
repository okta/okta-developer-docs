## <StackSnippet snippet="idp" inline />

This document explains how to configure <StackSnippet snippet="idp" inline />, an identity verification (IDV) vendor, as an identity provider (IdP) for your org. You can configure <StackSnippet snippet="idp" inline /> as an IdP in your org by creating an account with <StackSnippet snippet="idp" inline />, adding it as an IdP in Okta, and then testing the configuration.
<br></br>

> **Note:** <StackSnippet snippet="idp" inline /> works as an IDV vendor, but is listed as an IdP in the Admin Console. This guide refers to <StackSnippet snippet="idp" inline /> as an IDV vendor.

Okta manages the connection to the IDV vendor for your app, sitting between your app and the vendor that verifies your users. When a user signs in, you can verify their identity by having them submit a proof of identity to the IDV vendor.

---

#### Learning outcomes

Configure an IDV vendor so that your user’s identities are verified when they enroll a new authenticator.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An account with <StackSnippet snippet="idpaccount" inline />
* A new [group](https://help.okta.com/okta_help.htm?type=oie&id=usgp-groups-create) in your org for IDV users

---