---
title: User password recovery
---

<ApiLifecycle access="ie" />

> **Note:** In proxy model architectures, where a server-side application using the Embedded SDK is used as a proxy between client applications and Okta servers, a request context for the client applications is required. The expectation is that security enforcement is based on the client request context's IP address and user agent. However, since these values are currently derived from the server application rather than the client, this enforcement isn't available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) won't work until a solution to the issue is found.

This use case describes how to integrate a password recovery flow into your app using an Okta SDK. The flow includes an email factor step that the user needs to verify before updating their password.

---

#### Learning outcomes

* Understand how to set up password recovery with only an email factor.
* Use the Okta SDK in your app to implement a password recovery flow.

#### What you need

* An app that uses the embedded Okta Identity Engine SDK
* [Okta org already configured for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Identity Engine SDK set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Configuration updates

The password recovery use case requires the **password** and **email** factors.

<div class="half">

![Displays Password and Email factor indicators](/img/oie-embedded-sdk/factor-password-email.png)

</div>

Before you build a password recovery flow with an email factor, ensure that your org is configured for a multifactor use case by completing the steps in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case).

### Set email as the only factor enabled for password recovery

In addition to configuring your Okta org for the multifactor use case, you need to enable email as the only factor for password recovery for this flow.

1. In the Admin Console, go to **Security** > **Authenticators**.
1. From the **Setup** tab, select **Edit** from the **Actions** dropdown menu on the **Password** authenticator row.
1. On the **Password** page, scroll down to the **Add Rule** section of the **Default Policy** and click
   the edit pencil icon for the **Default Rule**.
1. In the **Edit Rule** dialog box, ensure that the following values are configured for the **AND Users can initiate recovery with** field:
   * **Phone (SMS / Voice call)**: Clear
   * **Email**: Selected
1. Click **Update Rule** if you change any values.

## Summary of steps

<StackSnippet snippet="summaryofsteps" />

## Integration steps

<StackSnippet snippet="integrationsteps" />