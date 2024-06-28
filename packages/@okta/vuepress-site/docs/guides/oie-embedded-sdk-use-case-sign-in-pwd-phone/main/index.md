---
title: "Sign-in flow: password and phone"
---

<ApiLifecycle access="ie" />

> **Note:** In proxy model architectures, where a server-side app using the embedded SDK is used as a proxy between client apps and Okta servers, a request context for the client apps is required. The expectation is that security enforcement is based on the client request context's IP address and user agent.
>
>However, since these values are currently derived from the server app rather than the client, this enforcement isn't available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) won't work until a solution to the issue is found.

This guide covers the use case for a user sign-in flow with password and phone factors.

<StackSnippet snippet="pwdoptionalusecase" inline />

---

#### Learning outcome

* Configure your Okta org to use the password and phone factors.
* Challenge a user's identity with password and phone factors.

#### What you need

* An app that uses the embedded Identity Engine SDK
* [Okta org already configured for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

#### Sample code

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

1. In the Admin Console, go to **Security** > **Authenticators**.
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
