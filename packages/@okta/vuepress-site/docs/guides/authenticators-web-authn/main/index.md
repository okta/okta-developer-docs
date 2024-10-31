---
title: Web Authentication integration guide
---

<ApiLifecycle access="ie" /><br>

This guide shows you how to integrate Web Authentication (WebAuthn) into your app using the embedded SDK.

---
#### Learning outcomes

* Understand the WebAuthn flow
* Learn how to integrate WebAuthn into your authentication use case

#### What you need

* <StackSnippet snippet="oiesdksetup" />
* An authenticator such as a fingerprint scanner or hardware security key

#### Sample code

<StackSnippet snippet="samplecode" />

---

## The case for WebAuthn

Passwords and other authenticators that rely on one-time passcodes (OTPs) are vulnerable to security attacks because they rely on relayed information that bad actors can easily obtain. Phishing, where phony websites, phone calls, and other fraudulent tactics are used to gain access to passwords, OTPs, and other data is the major cause of security attacks today.

To be resistant to phishing attacks, a local communication channel should exist between the device and the authentication factor. WebAuthn supplies this local communication channel by providing a framework to authenticate through USB security keys, fingerprints, Touch ID, and other types of localized authenticators. For example, an app running in a browser can authenticate a user by initiating a biometric request using a fingerprint scanner on their laptop.

Besides being resistant to phishing attacks, WebAuthn can drastically reduce sign-in friction by allowing passwordless sign-ins during reauthentication use cases. For example, mobile banking apps use this type of sign-in today, which allows iPhone users to sign in using only Face ID after the first sign-in with a password.

> **Note**: For detailed information on the WebAuthn standard, including an up-to-date list of supported browsers, see [webauthn.me](https://a0.to/webauthnme-okta-docs).

### Example authentication flow

WebAuthn uses public-key cryptography to security communicate and validate the user's device, credentials, and other information. An example WebAuthn authentication challenge flow is as follows:

1. A user attempts to sign in to a Service Provider's website.
1. The website's back-end servers generate a challenge that's cryptographically signed using a public key.
1. The encrypted challenge and other identifying information is sent to the client app running in the browser.
1. The client app then calls WebAuthn APIs in the browser and passes the challenge to the authenticator for validation.
1. The challenge and other data are validated and the laptop's biometrics authenticator prompts the user for a fingerprint.
1. After the fingerprint is validated, the challenge is decrypted using a private key, repackaged with additional information, and re-encrypted using a private key.
1. The repackaged challenge is sent to the server, where it's decrypted using the public key. The server validates that it's the same challenge that started the flow.

In the previous example the public and private keys are generated on the user's device during enrollment. The following diagram illustrates the enrollment and challenge flows and how they're integrated within Okta.

<div class="full">

![Diagram showing the WebAuthn enrollment flow](/img/authenticators/authenticators-webauthn-flow-overview.png)

</div>

As the Service Provider, you can provide WebAuthn support to your users by enabling it in your Okta org and building out support for it in your application using the embedded SDK.

## Update configurations

Before you can start using Web Authentication (WebAuthn), you need to enable it in your Okta org and assign it an authentication policy that requires it to be used.

### Add WebAuthn to your org

First, add the WebAuthn authenticator to your org and enable it.

1. Open the **Admin Console** for your org.
2. Choose **Security > Authenticators** to show the available authenticators.
3. If **FIDO2 (WebAuthn)** isn't in the list:
   1. Click **Add Authenticator**.
   2. Click **Add** on the **FIDO2 (WebAuthn)** tile.
   3. Verify that **User verification** is set to **Discouraged**.
   4. Click **Add**.
    [[style="list-style-type:lower-alpha"]]

   If **FIDO2 (WebAuthn)** is in the list:
   1. Select **Actions > Edit** for **FIDO2 (WebAuthn)**.
   2. Verify that **User verification** is set to **Discouraged**. If not, click **Edit** and set **User verification** to **Discouraged**.
   3. Click **Save**.
    [[style="list-style-type:lower-alpha"]]

4. Select the **Enrollment** tab.
5. Check that **FIDO2 (WebAuthn)** is set to either **Optional** or **Required** in the **Eligible Authenticators** section of the default policy.
   1. If **FIDO2 (WebAuthn)** is set to **Disabled**, click **Edit** for the default policy
   2. Select **Optional** from the dropdown box for **FIDO2 (WebAuthn)**, and then click **Update Policy**.
    [[style="list-style-type:lower-alpha"]]

### Set your app integration to use the WebAuthn authenticator

New apps are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup. In production, it becomes evident when you can share your authentication needs between apps. You should create a policy specifically for your app for testing purposes.

1. Open the **Admin Console** for your org.
2. Choose **Security > Authentication Policies** to show the available authentication policies.
3. Click **Add a Policy**.
4. Give the policy a name, and then click **Save**.
5. Locate the Catch-all Rule of the new policy and select **Actions > Edit**.
6. Select **Allowed after successful authentication**.
7. Set **User must authenticate with** to **Password + Another factor**.
8. For **Possession factor constraints**
   1. Verify that **Device Bound** is selected.
   2. Verify that **FIDO2 (WebAuthn)** is listed in the box under **Additional factor types**. If it isn't listed, check that the authenticator has been enabled using steps 4 and 5 of [Add WebAuthn to your org](#add-webauthn-to-your-org).
   3. Click **Save**.
    [[style="list-style-type:lower-alpha"]]

9. Select the **Applications** tab for your newly created policy, and then click **Add App**.
10. Find your app in the list and click **Add** next to it.
11. Click **Close**.
12. Verify that the app is now listed in the **Applications** tab of the new policy.

## Software versions

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

## See also

<StackSnippet snippet="relatedusecases" />
