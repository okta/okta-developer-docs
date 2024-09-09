---
title: Configure Keep me signed in
excerpt: How to configure pre-authentication and post-authentication KMSI and customize KMSI UI components
layout: Guides
---

<ApiLifecycle access="ie" /></br>
<ApiLifecycle access="ea" />

This guide describes how to use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/) to configure the Keep Me Signed In (KMSI) feature. It also describes how to use the [Brands API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/replaceCustomizedSignInPage) to customize the KMSI sign-in prompts for delegated authentication flows.

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need



---

## About Keep me signed in (KMSI)

Keep me signed in (KMSI) is a usability feature that reduces sign-in friction on remembered devices. Users who select **Keep me signed in** are exempt from subsequent MFA prompts until their MFA lifetime expires or their browser cookies are cleared. Enable the feature only if you accept the security risks of MFA exemptions, and encourage your users to only select KMSI on trusted devices.

You can configure the feature so that the KMSI prompt is displayed before or after users authenticate.

* In standard authentication flows, users go directly to an app or your org's sign-in page and enter their credentials. Configure pre-authentication KMSI if you want to display the prompt on the Sign-In Widget when they enter their credentials. Configure post-authentication KMSI if you want them to see the prompt after their authentication is complete.
* In delegated authentication flows, users bypass the Sign-In Widget and sign in with an identity provider. Configure post-authentication KMSI for these users, so that the KMSI option appears after they authenticate and are redirected back to Okta.
* You can customize the buttons


## Configure pre-authentication KMSI

Pre-authentication KMSI is enabled in the Organization Security settings of the Admin Console. Once enabled, it's available to all users in your org.

It uses the [MFA lifetime](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicyRule!path=4/actions/signon/session&t=request) from your [global session policy](/docs/guides/configure-signon-policy/main/).

> **Note:** If you set this value using the API, you can't exceed that maximum in the Admin Console. Setting a value over the API maximum results in an error.

Use the Policies API to update the global session policy rule conditions.

### Enable the feature

1. In the Admin Console, go to **Security** > **General**.
1. In the **Organization Security** section, click **Edit**.
1. Enable the setting to **Show option to stay signed in before users sign in**.
1. Click **Save**.

### Modify your policies





## Configure post-authentication KMSI



## Customize post-authentication sign-in prompts

