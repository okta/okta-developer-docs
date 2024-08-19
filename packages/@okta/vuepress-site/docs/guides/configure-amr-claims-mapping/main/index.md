---
title: Configure AMR claims mapping
excerpt: Learn how to configure an OpenID Connect Identity Provider to send AMR claims during SSO to your org
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure an OpenID Connect Identity Provider to send Authentication Method Reference (AMR) claims during Single Sign-On (SSO) to your org.

---

#### Learning outcomes

* Know the purpose of AMR claims
* Configure your OpenID Connect Identity Provider (IdP) to send AMR claims during SSO

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An existing OpenID Connect Identity Provider (IdP) that's able to send AMR claims to Okta. This can be another Okta org (Org2Org) or a third party IdP. If your current Org2Org integration uses SAML, you need to implement a new one with OpenID Connect.
* The **IdP AMR Claims Mapping** feature enabled for your org. Contact [Okta Support](https://support.okta.com) to enable this EA feature.

---

## Overview

Authentication Method Reference (AMR) claims mapping allows an admin to configure their Okta org to accept AMR claims from OpenID Connect IdPs during SSO. Mapping AMR claims from third-party IdPs allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication.

AMR claims provide important context to Okta during policy evaluation. For example, AMR claims give Okta a better understanding of which factors were used by the external IdP to verify the user's identity. This creates a more seamless and secure user experience, reduces friction, and boosts productivity.

### Okta-to-Okta orgs and AMR claims

When you configure AMR claims in Okta-to-Okta orgs, there are some configuration steps to consider. To enable AMR claims in the Okta org that you connect to the IdP org, you must enable **Use standard AMR value format** in the IdP org to send AMR claim values in the correct format. See the [configuration steps](#okta-to-okta) in this guide.

## AMR claims mapping flow

<div class="three-quarter">

![Flow diagram that displays the communication between the user, user agent, authorization server, and the Identity Provider](/img/auth/amr-claims-mapping-oidc.png)
<!-- https://www.figma.com/design/YH5Zhzp66kGCglrXQUag2E/📊-Updated-Diagrams-for-Dev-Docs?node-id=4696-3134&t=vwcppYyoeWOz2kEQ-11
amr-claims-mapping-oidc.png -->

</div>

1. A user attempts to sign in to an OpenID Connect app through the browser (user agent).
2. The browser redirects the user to the Okta `/authorize` endpoint to authenticate.
3. Okta redirects the user to the external Identity Provider.
4. The Identity Provider authenticates the user.
5. The Identity Provider redirects the user to Okta. The Identity Provider response contains the supported AMR claims, for example: `sms`, `mfa`, and `pwd`.

    > **Note:** The AMR claims are stored in an Okta session and considered during policy evaluation.

6. Okta redirects the user to the browser. The user isn't challenged for MFA if the factors used by the Identity Provider meet policy requirements.
7. The browser sends a request to the Okta `/token` endpoint.
8. Okta responds with the access token and the AMR claims in the ID token.

## Configure the IdP for AMR claims

Before you configure Okta to accept AMR claims, it's important to first configure the IdP to send the claims correctly. Every IdP is different. Okta expects the IdP to pass the AMR claims in a specific way, depending on the supported federation protocol.

### OpenID Connect Identity Provider

At the OpenID Connect IdP, verify that the client app that you use for authenticating and authorizing users sends an `amr` array with the AMR claims in the OpenID Connect ID token (`id_token`).

The `amr` property is a JSON array of strings that are identifiers for [authentication methods](https://www.rfc-editor.org/rfc/rfc8176.html) used in the authentication. <!-- Supported values include "pwd", "mfa", "otp", "kba", "sms", "swk", and "hwk". Get Venkat input on listing all supported values in the next update of this doc -->

#### Example ID token with AMR claims

```json
{
  "ver": 1,
  "sub": "00uid4BxXw6I6TV4m0g3",
  "iss": "https://{yourOktaDomain}",
  "aud": "uAaunofWkaDJxukCFeBx",
  "iat": 1449624026,
  "exp": 1449627626,
  "amr": [
    "sms",
    "mfa",
    "pwd"
  ],
  "jti": "ID.4eAWJOCMB3SX8XewDfVR",
  "auth_time": 1449624026,
  "at_hash": "cpqKfdQA5eH891Ff5oJr_Q",
  "name" :"John Doe",
  "nickname":"Jimmy",
  "preferred_username": "john.doe@example.com",
  "updated_at":1311280970,
  "email":"john.doe@example.com",
  "email_verified":true,
  "address" : { "street_address": "123 Hollywood Blvd.",
      "locality": "Los Angeles",
      "region": "CA",
      "postal_code": "90210",
      "country": "US"
    },
  "phone_number":"+1 (425) 555-1212"
}
```

### Supported AMR values by authenticator type

The following table describes the AMR values that Okta supports:

* **Authenticator key**: Identifies an authenticator that you can add or remove using the Admin Console (**Security** > **Authenticators**).
* **Authenticator type**: Describes the type of authenticator. These attributes are especially useful in situations where there are apps and security keys being used together in an authentication flow.
* **Method type**: Defines the security method used by the authenticator.
* **AMR value**: Lists the supported AMR values for each authenticator.
* **Factor class**: Describes the type of authenticator factor.

| Authenticator key            | Authenticator type        | Method type       | AMR value                             | Factor class          |
| :--------------------------- | :------------------------ | :---------------- | :------------------------------------ | :-------------------- |
| `okta_password`                | `password`                  | `password`          | `pwd`                                   | Knowledge             |
| `security_question`            | `security_question`         | `security_question` | `kba`                                   | Knowledge             |
| `okta_email`                   | `email`                     | `email`             | `email`                                 | Possession            |
| `phone_number`                 | `phone`                     | `sms`               | `sms`                                   | Possession            |
|                              |                           | `voice`             | `tel`                                   | Possession            |
| `duo`                         | `app`                       | `duo`               | `duo`                                   | Possession            |
| `symantec_vip`                 | `app`                       | `otp`               | `symantec`                              | Possession            |
| `google_otp`                   | `app`                       | `otp`               | `google_otp`                            | Possession            |
| `okta_verify`                  | `app`                       | `totp`              | `okta_verify`, `otp`                      | Possession            |
|                              |                           | `push`              | `okta_verify`, `swk`                      | Possession, Inherence |
|                              |                           | `signed_nonce`      | `okta_verify`, `phr`                      | Possession, Inherence |
| `custom_app`                   | `app`                       | `push`              | `swk`                                  | Possession, Inherence |
| `webauthn`                     | `security_key`              | `webauthn`          | `pop`                                   | Possession, Inherence |
| `onprem_mfa`                   | `security_key`              | `otp`               | `oauth_otp`                             | Possession            |
| `rsa_token`                    | `security_key`              |                   | `rsa`                                   | Possession            |
| `yubikey_token`                | `security_key`              |                   | `yubikey`                               | Possession            |
| `custom_otp`                   | `security_key`              |                   | `otp`                                   | Possession            |
| `external_idp`                 | `federated`                 | `idp`               | `fed`                                   | Possession            |
| `smart_card_idp`               | `federated`                 | `cert`              | `sc` + `swk`, more options: `hwk` (replaces `swk`), `pin`,`mfa`    | Possession, Knowledge |

### Okta-to-Okta

Okta-to-Okta (Org2Org), also known as hub and spoke, refers to a deployment model where the IdP and Service Provider (SP) are both Okta orgs. Use the [Add an External Identity Provider guide for Okta-to-Okta](/docs/guides/add-an-external-idp/oktatookta/main/) to configure Okta-to-Okta orgs for AMR claims mapping.

<AMROktatoOkta/>

#### Use an existing Org2Org app

You can configure Okta-to-Okta orgs for AMR claims mapping with existing Org2Org OpenID Connect apps. If you want to force the IdP Okta org to authenticate, clear the **Disable Force Authentication** checkbox in the existing Org2Org app:

1. In the Admin Console, go to **Applications** > **Applications** and select the Org2Org app that you want to configure.
1. Select the **Sign On** tab and then click **Edit** in the **Settings** section.
1. Clear the **Disable Force Authentication** checkbox and click **Save**.

### Custom OpenID Connect apps

If you're using a custom OpenID Connect app in the Okta IdP org, `amr` claims are sent to the SP by default and no additional configuration is required.

## Configure Okta

Configuring an Okta org to receive AMR claims from an external IdP is similar across all IdP types. When you create an IdP in Okta, select **Trust AMR claims from this identity provider**. This enables Okta to evaluate that AMR claims sent in the IdP response meet sign-on policy requirements.

Use one of the following enterprise Identity Provider guides to configure an external IdP:

* [OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/main/)
* [Okta-to-Okta](/docs/guides/add-an-external-idp/oktatookta/main/)

> **Note:** Ensure that the IdP includes the correct AMR claims in the IdP response and that the claims match the requirements of your sign-on policies. If the claims don't satisfy the requirements, then users can't sign in to the application.

## Troubleshoot

An **Access denied** error occurs because of:

* Improper policy configuration
* Improper attribute/claim format from the IdP
* Improper IdP configuration (the IdP didn't challenge a factor that the sign-on policy requires.)

## Limitation

Okta doesn't pass auth requirements to the IdP.
