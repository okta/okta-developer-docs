---
title: Multifactor authentication
meta:
  - name: description
    content: A high-level overview of multfiactor authentication
---

# Learn about multifactor authentication

<ApiLifecycle access="ie" />

Multifactor authentication (MFA) is an assurance method that requires users to provide two or more verification factors to gain access to a resource. It helps determine that the person who's signing in is who they claim to be.

This page provides a high-level overview of MFA, how it works in Okta, and the key concepts and terminology you need to understand when implementing MFA with Okta APIs.

---

#### Learning outcomes

* Learn the differences between authenticators, factors, and methods.
* Understand how MFA works in Okta.
* Understand how MFA works with policies.

---

## What is multifactor authentication

MFA requires users to supply two or more types of evidence that prove they are who they claim to be:

* **Something they know:** A knowledge-based factor, like a password or PIN. Authenticators that satisfy a knowledge factor rely on information that's only known to the user.
* **Something they have:** A possession-based factor, like a smartphone or hardware token. Authenticators that satisfy a possession factor prove that the user has a specific device in their control. For example, a user who enters a code from an authenticator app or approves a push notification demonstrates their possession of that device.
* **Something they are:** A biometric-based factor, like a fingerprint or facial recognition. Authenticators that satisfy a biometric factor verify a user's identity by scanning unique traits such as a fingerprint or using facial recognition.

Some authenticators can satisfy more than one factor type. For example, you can use Okta Verify as a possession factor and as a biometric factor.

### Why use MFA

You can use MFA to enhance the security of your Okta org and apps by requiring multiple forms of verification. MFA helps protect against unauthorized access, even if a password is compromised. By requiring multiple forms of authentication, MFA reduces the risk of account breaches and enhances your overall security posture.

See [Why Multi-Factor Authentication (MFA) Is Important](https://www.okta.com/identity-101/why-mfa-is-everywhere/).

### How MFA works in Okta

When a user signs in to an app, the sign-in process is controlled through a combination of policies, rules, and authenticators.

Admins configure [authenticator enrollment policies](#about-mfa-and-authenticator-enrollment-policies) to determine which authenticators are required or disallowed for users. And app sign-in policies are used to specify which authenticators are required when users sign in. You can [customize app sign-in policies](#about-mfa-and-app-sign-in-policies) to control other aspects of the sign-in process, in addition to specifying which authenticators are required.

There are many different ways that you can use authenticators in your org. MFA is one method that you can use to enhance the security of your org. You can also use Adaptive MFA, which is based on context, such as the user's location or device. See [Authentication](https://help.okta.com/okta_help.htm?type=oie&id=ext_Security).

## Key terms with MFA

* **Assurance**: The level of confidence that a user is who they claim to be, based on the authentication methods used.
* **Factor**: The category of authentication (knowledge, possession, biometric).
   > **Note:** In Classic Engine, "factor" is used interchangeably with "authenticator." In Identity Engine, a factor refers to the category of authentication (knowledge, possession, biometric), while an authenticator is a specific method or device. See [Understand the terminology in the User Factors API](#understand-the-terminology-in-the-user-factors-api).
* **Authenticator**: A method or device that a user possesses and controls and that they use to verify their identity. Authenticators can be used to satisfy different factor requirements. For example, Okta supports authenticators like Okta Verify, Smart Cards, and YubiKey One-Time Passcodes (OTPs), among others.
* **Authenticator method**: The security method used by an authenticator. Typically the authenticator method describes the protocol that the authenticator uses. See [Method characteristics](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators).
* **Authenticator enrollment**: The specific instance of an authenticator that a user has enrolled and that's linked to them and their account. It refers to the specific configuration of the authenticator and the user who's enrolled it.

See [Understand authenticator terminology with Okta APIs](#understand-authenticator-terminology-with-okta-apis) for more information about some of these terms and how they're used in Okta APIs.

For more conceptual information about MFA, see [What Is Multi-Factor Authentication (MFA)?](https://www.okta.com/blog/2021/08/multi-factor-authentication-mfa/)

### Understand authenticator terminology with Okta APIs

The terminology of authenticators in Okta's APIs is similar to the terminology that's used in the Admin Console. However, there are some slight differences in how they're represented in the APIs.

| Key term                  | Description  |
|---------------------------|--------------|
| [Authenticator key](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators!c=200&path=0/key&t=response) | The authenticator `key` parameter is the name of the authenticator. |
| [Authenticator type](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators!c=200&path=0/type&t=response) | The authenticator `type` parameter is a category for authenticators. There are various authenticator types and the parameter is used to group authenticators that rely on similar technologies. |
| [Method type](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticatorMethods!c=200&path=13/type&t=response) | The specific security method that an authenticator can use for verification. In the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/), the method `type` parameter refers to the specific security methods of an authenticator. It doesn't refer to any of the method characteristics, such as user presence or device-bound. |
| [Authenticator enrollment](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserAuthenticatorEnrollments/) | The instance of an authenticator that's registered to a specific user. |

See the following table for a list of authenticators, their keys, types, and method types.

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

There's an important distinction between the terms "authenticator" and "factor" in Identity Engine and Classic Engine.

The [User Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/) provides operations for managing factors. In the context of the User Factors API, "factors" work in similar ways as authenticator methods. You can use the User Factors API to manage user authenticators (factors).

> **Note:** The [User Authenticator Enrollments API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserAuthenticatorEnrollments/) provides similar operations as the User Factors API.

## About MFA and authenticator enrollment policies

Authenticator enrollment policies control which authenticators are available for a user and when a user can enroll a particular one. You can use these policies to enforce specific requirements for how users enroll authenticators.

To learn how to configure authenticator enrollment policies in the Admin Console, see [Authenticator enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-mfa-policy).

You can also configure them by using the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/).

## About MFA and app sign-in policies

App sign-in policies determine the extra levels of authentication that are performed before a user can access an app, or access certain account management functions. Admins can use these policies to specify the required level of assurance for different apps, user groups, or access scenarios. For example, you can set up an app sign-in policy where the required authenticators change based on the user's network location and device platform.

To learn how to configure app sign-in policies in the Admin Console, see [Add an app sign-in policy rule](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy).

You can also configure them by using the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/).

## Get started with MFA in your org

* [Learn about authentication in the Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=ext_Security_at_Okta)
* [Configure authenticators in the Admin Console](hhttps://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators)
* [Configure authenticators using the Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/)
* [Set up your org for different use cases](/docs/guides/set-up-org/main/#set-up-your-okta-org-for-your-use-cases)
* [Configure sign-on policies for common scenarios](/docs/guides/configure-signon-policy/main/#configure-sign-on-policies-for-common-scenarios)
