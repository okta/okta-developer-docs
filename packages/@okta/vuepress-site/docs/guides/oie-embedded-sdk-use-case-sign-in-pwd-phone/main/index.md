---
title: Sign in with password and phone factors
---

<ApiLifecycle access="ie" />

> **Note:** In proxy model architectures, where a server-side application using the Embedded SDK is used as a proxy between client applications and Okta servers, a request context for the client applications is required. Security enforcement is expected to be based on the client request context’s IP address and user agent. However, since these values are currently being derived from the server application rather than the client, this enforcement is not available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) will not work until we can find a solution to the issue.

This guide covers the use case for a user sign-in flow with password and phone factors.

<StackSnippet snippet="pwdoptionalusecase" inline />

---

#### Learning outcomes

Understand how to implement a user sign-in flow with password and phone factors.

#### What you need

* An app that uses the embedded Okta Identity Engine SDK
* [Okta org already configured for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

This sign-in use case requires the password and phone factors.

<div class="half">

![Password and phone factors](/img/oie-embedded-sdk/factor-password-phone.png)

</div>

Before you build a sign-in flow with password and phone factors, you need to configure the Okta org to accept both factors in your app. See [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) to configure your app and Okta org for this use case.

### Set phone as optional for authentication enrollment

The instructions in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) enables both email and phone factors as optional for enrollment. For this use case, you need to enable the phone factor as optional and disable the email factor.

1. In the Admin console, go to **Security** > **Authenticators**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. In **Default Policy**, click **Edit**.
1. In the **Edit Policy** dialog box, under **Effective Factors**:
   * Set **Email Authentication** to **Disabled**.
   * Set **Phone Authentication** to **Optional**.
1. Click **Update Policy** if a value has changed.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />
