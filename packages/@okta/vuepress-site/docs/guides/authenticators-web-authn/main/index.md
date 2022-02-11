---
title: Web Authentication integration guide
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

This guide shows you how to integrate Web Authentication (WebAuthn) into your app using the embedded SDK.

---
**Learning outcomes**

* Understand the WebAuthn flow
* Learn step-by-step how to integrate WebAuthn into your authentication use case

**What you need**

* <StackSnippet snippet="orgconfigurepwdonly" />
* <StackSnippet snippet="oiesdksetup" />
* An authenticator such as a fingerprint scanner or hardware security key

**Sample code**

* <StackSnippet snippet="samplecode" />

**Related use cases**

<StackSnippet snippet="relatedusecases" />

---

## The case for WebAuthn

Passwords and other authenticators that rely on one-time passwords (OTPs) are vulnerable to security attacks because they rely on relayable information that bad actors can easily obtain. Phishing, where phony websites, phone calls, and other fraudulent tactics are used to gain access to passwords, OTPs, and other data is the major cause of security attacks today.

To be resistant to phishing attacks, a local communication channel should exist between the device and the authentication factor. WebAuthn supplies this local communication channel by providing a framework to authenticate through USB security keys, fingerprints, Touch ID, and other types of localized authenticators. For example, an app running in a browser can authenticate a user by initiating a biometric request using a fingerprint scanner on their laptop.

Besides being resistant to phishing attacks, WebAuthn can drastically reduce the sign-in friction by allowing passwordless sign-ins during reauthentication use cases. For example, mobile banking apps use this type of sign-in today allowing iPhone users to sign-in using only Face ID after the first sign-in with a password.

### Example authentication flow

WebAuthn uses public-key cryptopgraphy to security communicate and validate the user's device, credentials, and other information. An example WebAuthn authentication challenge flow is as follows:

1. A user attempts to sign in to a service provider's website.
1. The website's backend servers generate a challenge that is cryptographically signed by a public key.
1. The encrypted challenge and other identifying information is sent to the client app running in the browser.
1. The client app then calls WebAuthn APIs in the browser and passes the challenge to the authenticator for validation.
1. The challenge and other data are validated and the laptop's biometrics authenticator prompts the user for a fingerprint.
1. Once the fingerprint is validated, the challenge is unencrypted using a private key, repackaged with additional information and re-encrypted using a private key.
1. This repackaged signature is then sent back to the server, where the challenge is unencrypted using the public key and validated that it's the same challenge that started the flow.

In the previous example the public and private keys are generated on the user's device during enrollment. The following diagram illustrates the enrollment and challenge flows and how they are integrated within Okta.

<div class="common-image-format">

![Diagram showing the WebAuthn enrollment flow](/img/authenticators/authenticators-webauthn-flow-overview.png)

</div>

As the service provider, you can provide WebAuthn support to your users by enabling it in your Okta org and building out support for it in your application using the Embedding SDK.

## Update configurations

Before you can start using Web Authentication (WebAuthn), create an Okta org application as described in <StackSnippet snippet="orgconfigurepwdonly" inline/>. Then add WebAuthn to your app integration by executing the following steps:

### Add WebAuthn to the Okta org

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, click **Add Authenticator**.
1. On the **Add Authenticator** dialog, click **Add** under **FIDO2 (WebAuthn)**.
1. Leave the default value for **User Verification**, which is set to "Discouraged".
1. On the **Add FIDO2(WebAuthn)** dialog, click **Add**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. On the **Enrollment** tab, click **Edit** for the **Default Policy**.
1. Set **FIDO2 (WebAuthn)** to **Optional** and click **Update Policy**.

### Configure your Okta org application to use WebAuthn

1. In the Admin Console, go to **Applications** and **Applications**.
1. On the **Applications** page, click on the application you've previously created.
1. On the **General** tab ensure that **Interaction Code** and **Refresh Token** are selected.
1. On the **Sign-On** tab, scroll down to the **Sign-On Policy** section and click **Add Rule**.
1. On the **Add Rule** dialog box, do the following:
   1. Enter a name for the new rule (for example "2FA Rule").
   1. Set **User must authenticate with** to **Password+Another Factor**.
   1. Select **Device Bound**.
   1. Confirm **Your org's authenticators that satisify this requirment** is set to **Password AND FIDO2 (WebAuthn) or ...**.
   1. Click **Save**.

## Verify browser version

<StackSnippet snippet="softwareversions" />

## Integrate SDK for authenticator enrollment

### Summary of steps

The following summarizes the WebAuthn enrollment flow using a user sign-in use case.

<StackSnippet snippet="enrollmentintegrationsummary" />

<StackSnippet snippet="enrollmentintegrationsteps" />

## Integrate SDK for authenticator challenge

### Summary of steps

The following summarizes the WebAuthn challenge flow using a user sign-in use case.

<StackSnippet snippet="challengeintegrationsummary" />

<StackSnippet snippet="challengeintegrationsteps" />

</div>
