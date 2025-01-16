---
title: Configure claims sharing
excerpt: Learn how to configure an identity provider to send claims during SSO in an org2org scenario
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure an <shared> identity provider (IdP) to send claims between Okta orgs during Single Sign-On (SSO).

---

#### Learning outcomes

* Know the purpose of claims sharing
* Configure your <shared> IdP to send authentication claims during SSO

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Two Okta orgs [configured for an Okta-to-Okta (org2org) scenario](/docs/guides/add-an-external-idp/oktatookta/main/).
* The **Org2Org Claims Sharing** feature enabled for your org. To enable, go to **Settings** > **Features**, locate the feature, and enable.

---

## Overview

Authentication claims sharing allows an admin to configure their Okta org to accept claims from <shared> IdPs during SSO. Mapping authentication claims from third-party IdPs allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication.

Authentication claims provide important context to Okta during policy evaluation. For example, authentication claims give Okta a better understanding of which factors were used by the external IdP to verify the user's identity. This creates a more seamless and secure user experience, reduces friction, and boosts productivity.

### Okta-to-Okta orgs and claims sharing

Okta-to-Okta (Org2Org), also known as hub and spoke, refers to a deployment model where the IdP and service provider (SP) are both Okta orgs. The Okta IdP org contains the client app that you want to use for authenticating and authorizing your users (the IdP). In your Okta SP org, add and configure the IdP ("connector") to trust claims. This IdP connects your org to the IdP org.

??redirect URI in the app that does the authentication and authorization is the SP org??

## Claims sharing flow

<div class="three-quarter">

![Flow diagram that displays the communication between the user, user agent, authorization server, and the Identity Provider](/img/auth/amr-claims-mapping-oidc.png)
<!-- https://www.figma.com/design/YH5Zhzp66kGCglrXQUag2E/📊-Updated-Diagrams-for-Dev-Docs?node-id=4696-3134&t=vwcppYyoeWOz2kEQ-11
amr-claims-mapping-oidc.png -->

</div>

1. A user attempts to sign in to <an or a shared> app through the browser (user agent).
2. The browser redirects the user to the Okta `/authorize` endpoint to authenticate.
3. Okta redirects the user to the external IdP.
4. The IdP authenticates the user.
5. The IdP redirects the user back to Okta. The IdP response contains the supported claims, for example: `sms`, `mfa`, and `pwd`.

    > **Note:** Claims are stored in an Okta session and considered during policy evaluation.

6. Okta redirects the user to the browser. The user isn't challenged for MFA if the factors used by the IdP meet policy requirements.
7. The browser sends a request to the Okta `/token` endpoint.
8. Okta responds with the access token and the claims in the <ID token>.

## Configure the IdP for claims sharing

Before you configure Okta to accept claims, it's important to first configure the IdP to send the claims correctly. Every IdP is different. Okta expects the IdP to pass the claims in a specific way, depending on the supported federation protocol.

### <OpenID Connect> IdP

At the <OpenID Connect> IdP, verify that the client app that you use for authenticating and authorizing users sends an `amr` array with the AMR claims in the <OpenID Connect ID token> (`id_token`).

The `amr` property is a JSON array of strings that are identifiers for [authentication methods](https://www.rfc-editor.org/rfc/rfc8176.html) used in the authentication. <!-- Supported values include "pwd", "mfa", "otp", "kba", "sms", "swk", and "hwk". Get Venkat input on listing all supported values in the next update of this doc -->

#### Example ID token with claims

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

## Configure Okta

Configuring an Okta org to receive claims from an external IdP is similar across all IdP types. When you create an IdP in Okta, select **Trust claims from this identity provider**. This enables Okta to evaluate that AMR claims sent in the IdP response meet sign-on policy requirements.

Use one of the following enterprise IdP guides to configure an external IdP:

* [OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/main/)
* [Okta-to-Okta](/docs/guides/add-an-external-idp/oktatookta/main/)

> **Note:** Ensure that the IdP includes the correct claims in the IdP response and that the claims match the requirements of your sign-on policies. If the claims don't satisfy the requirements, then users can't sign in to the app.

## Troubleshoot

An **Access denied** error occurs because of:

* Improper policy configuration
* Improper attribute/claim format from the IdP
* Improper IdP configuration (the IdP didn't challenge a factor that the sign-on policy requires.)

## Limitation

Okta doesn't pass auth requirements to the IdP.


API request to update policy constraints

{
    "system": false,
    "type": "ACCESS_POLICY",
    "id": "rul11mw8hg3WWivBn0g5",
    "name": "fgdgdfg",
    "priority": 0,
    "status": "ACTIVE",
    "created": "2025-01-06T22:46:38.000Z",
    "lastUpdated": "2025-01-06T22:46:38.000Z",
    "conditions": {
        "userType": {
            "include": [],
            "exclude": []
        },
        "network": {
            "connection": "ANYWHERE"
        },
        "people": {
            "users": {
                "exclude": [],
                "include": []
            },
            "groups": {
                "include": [],
                "exclude": []
            }
        },
        "riskScore": {
            "level": "ANY"
        },
        "platform": {
            "include": []
        },
        "elCondition": {}
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "factorMode": "2FA",
                "reauthenticateIn": "PT0S",
                "constraints": [
                    {
                        "possession": {
                            "hardwareProtection": "REQUIRED",
                            "phishingResistant": "REQUIRED",
                            "userPresence": "REQUIRED"
                        }
                    },
                    {
                        "possession": {
                            "hardwareProtection": "REQUIRED",
                            "phishingResistant": "REQUIRED"
                        }
                    }
                ],
                "type": "ASSURANCE"
            },
            "keepMeSignedIn": {
                "postAuth": "ALLOWED",
                "postAuthPromptFrequency": "P30D"
            }
        }
    },
    "initialMode": false,
    "_links": {
        "self": {
            "href": "http://sp-oie.okta1.com:1802/api/v1/policies/rstusiyKp2uMmRCeB0g4/rules/rul11mw8hg3WWivBn0g5",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "http://sp-oie.okta1.com:1802/api/v1/policies/rstusiyKp2uMmRCeB0g4/rules/rul11mw8hg3WWivBn0g5/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}