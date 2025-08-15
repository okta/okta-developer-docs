---
title: Multifactor authentication
meta:
  - name: description
    content: A high-level overview of multfiactor authentication
---

# Learn about multifactor authentication

<ApiLifecycle access="ie" />

Multifactor authentication (MFA) is an assurance method that requires users to provide two or more verification factors to gain access to a resource, such as an app or user account. This page provides a high-level overview of MFA, how it works in Okta, and the key concepts and terminology you need to understand, when implementing MFA with Okta APIs.

---

#### Learning outcomes

* Learn the differences between authenticators, factors, and methods.
* Understand how MFA works in Okta.
* Understand how MFA works with policies.

---

## What is multifactor authentication

MFA requires users to supply two or more types of evidence that they are who they claim to be:

* **Something they know (knowledge-based factor, like a password or PIN):** Knowledge factors rely on information that's only known to the user.
* **Something they have (possession-based factor, like a smartphone or hardware token):** Possession factors prove that the user has a specific device in their control, often by requiring them to enter a code from an authenticator app or by approving a push notification.
* **Something they are (biometric-based factor, like a fingerprint or facial recognition):** Biometric factors verify identity by scanning unique traits such as a fingerprint or using facial recognition.

### Why use MFA

You can use MFA to enhance the security of your Okta org and apps by requiring multiple forms of verification. MFA helps protect against unauthorized access, even if a password is compromised. By requiring multiple forms of authentication, MFA reduces the risk of account breaches and enhances your overall security posture.

### How MFA works in Okta

Use MFA in your org to require users to verify their identity through multiple factors. The sign-in process is controlled through a combination of policies and authenticators. Admins configure authentication and enrollment policies to determine which authenticators are required or disallowed, how users enroll authenticators, and which authenticators are required when users sign in.

There are many different ways that you can use authenticators in your org. MFA is one method that you can use to enhance the security of your org. You can also use adaptive MFA which is based on context, such as the user's location or device. See [Authentication](https://help.okta.com/oie/en-us/content/topics/security/security_at_okta.htm).

## Key terms with MFA

* **Assurance**: The level of confidence that a user is who they claim to be, based on the authentication methods used.
* **Authenticator**: A method or device that a user possesses and controls and that they use to verify their identity. For example, Okta supports authenticators like Okta Verify, Smart Cards, and YubiKey One-Time Passcodes (OTPs), among others.
* **Factor**: The type of authentication method (knowledge, possession, biometric).
   > **Note:** In Okta Classic Engine, "factor" is used interchangeably with "authenticator". In Okta Identity Engine, a factor refers to the category of authentication (knowledge, possession, biometric), while an authenticator is a specific method or device. See [Understand the terminology in the User Factors API](#understand-the-terminology-in-the-user-factors-api).
* **Authenticator method**: The security method used by an authenticator. Typically the authenticator method describes the protocol that the authenticator uses. See [Method characteristics](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/about-authenticators.htm).
* **Authenticator enrollment**: The specific instance of an authenticator that a user has enrolled and that's linked to them and their account. It refers to the specific configuration of the authenticator and the user who's enrolled it.

See [Understand authenticator terminology with Okta APIs](#understand-authenticator-terminology-with-okta-apis) for more information about some of these terms and how they're used in Okta APIs.

For more conceptual information about MFA, see [What Is Multi-Factor Authentication (MFA)?](https://www.okta.com/blog/2021/08/multi-factor-authentication-mfa/).

### Understand authenticator terminology with Okta APIs

The terminology of authenticators in Okta's APIs is similar to the terminology that's used in the Okta Admin Console. However, there are some slight differences in how they're represented in the APIs.

| Key term                  | Description  |
|---------------------------|--------------|
| [Authenticator key](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators!c=200&path=0/key&t=response) | The authenticator `key` parameter is the name of the authenticator. |
| [Authenticator type](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators!c=200&path=0/type&t=response) | The authenticator `type` parameter is a category for authenticators. There are various authenticator types and the parameter is used to group authenticators that rely on similar technologies. |
| [Method type](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticatorMethods!c=200&path=13/type&t=response) | The specific security method that an authenticator can use for verification. In the APIs, the method `type` parameter refers to the specific security methods of an authenticator. It doesn't refer to any of the method characteristics, such as user presence or device-bound, for example. |
| [Authenticator enrollment](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserAuthenticatorEnrollments/) | The instance of an authenticator that is registered to a specific user. |

Refer to the table below for a list of authenticators, their keys, types, and method types.

| Authenticator key   | Authenticator type      | Method type             |
|---------------------|-------------------------|-------------------------|
| `custom_app`        | `app`                   | `push`                  |
| `custom_otp`        | `security_key`          | `otp`                   |
| `duo`               | `app`                   | `duo`                   |
| `external_idp`      | `federated`             | `idp`                   |
| `google_otp`        | `app`                   | `otp`                   |
| `okta_email`        | `email`                 | `email`                 |
| `okta_password`     | `password`              | `password`              |
| `okta_verify`       | `app`                   | `totp`, `push`, `signed_nonce` |
| `onprem_mfa`        | `security_key`            | `otp`                      |
| `phone_number`     | `phone`                   | `sms`, `voice`            |
| `rsa_token`        | `security_key`            | `otp`                      |
| `security_question` | `security_question`       | `security_question`       |
| `smart_card_idp`   | `federated`               | `cert`                    |
| `symantec_vip`     | `app`                     | `otp`                      |
| `tac`               | `tac`                    | `tac`                      |
| `webauthn`         | `security_key`            | `webauthn`                |
| `yubikey_token`    | `security_key`            | `otp`                      |

### Understand the terminology in the User Factors API

In Okta Classic, "factor" is used interchangeably with "authenticator". In Identity Engine, a factor refers to the category of authentication (knowledge, possession, biometric), while an authenticator is a specific method or device.

The [User Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/) provides operations for managing factors, with factors defined as authentication factors. In the context of the User Factors API, "factor" is used with the Classic Engine definition, meaning that you can use the API to manage user authenticators (factors).  which are the specific instances of authenticators that users have enrolled.

### Understand how MFA works with policies

* Explain how MFA works with authenticator enrollment policies
* Explain how MFA works with authentication policies
  * How devs/admins can configure authentication policies in different ways for different MFA configurations

How MFA Works with Authenticator Enrollment Policies
Authenticator enrollment policies in Okta determine how and when users are prompted to enroll in one or more authenticators. Admins can configure these policies to require specific authenticators for different user groups, set conditions for enrollment (such as requiring enrollment at first sign-in or after a set period), and control which authenticators are allowed or disallowed. This ensures that users have access to the right set of authentication methods and that enrollment processes align with your organization’s security and compliance requirements.

How MFA Works with Authentication Policies
Authentication policies define the rules for which authenticators must be used when users sign in or access sensitive resources. Admins can use these policies to specify the required level of assurance for different applications, user groups, or access scenarios. For example, a policy might require users to authenticate with both a password and Okta Verify for high-risk applications, or allow simpler authentication methods for lower-risk scenarios.

Developers and admins can configure authentication policies in flexible ways to support different MFA configurations. This includes setting up adaptive or contextual MFA, where the required authenticators change based on factors like user location, device, or risk level. By customizing these policies, organizations can balance security needs with user experience, ensuring that MFA requirements match the sensitivity of the resources being accessed.



## Get started with MFA in your org

* Link out to different parts of the docs to learn about:
  * Authenticator enrollment policies
  * Authentication policies
  * Configuring authenticators
  * Adaptive MFA
