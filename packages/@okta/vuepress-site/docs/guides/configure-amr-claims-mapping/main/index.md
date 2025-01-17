---
title: Configure claims sharing
excerpt: Learn how to configure an identity provider to send claims during SSO in an Okta-to-Okta (org2org) scenario
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure an <OpenID Connect Identity Provider (IdP)> to send authentication claims during Single Sign-On (SSO) in an Okta-to-Okta (org2org) scenario.

---

#### Learning outcomes

* Know the purpose of claims sharing
* Configure your <OpenID Connect Identity Provider (IdP)> to send authentication claims during SSO

#### What you need

* [Okta Developer Edition org](https://developer.okta.com/signup)
* An existing <OpenID Connect IdP> that's able to send authentication claims to Okta. This guide focuses on the Okta org2org use case.
* The **Org2Org Claims Sharing** feature enabled for both orgs. To enable, go to **Settings | Features**, locate the feature and enable.

---

## Overview

Authentication claims sharing allows an admin to configure their Okta org to trust claims from <OpenID Connect IdPs> during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication.

Claims also provide important context to Okta during policy evaluation. For example, these claims give Okta a better understanding of which factors were used by the external IdP to verify the user's identity. They do this by conveying all the information from the IdP needed to make policy decisions in the SP. The Okta session stores the details of the authentications that have been done in a way that can easily be translated to and from external authentications. This creates a more seamless and secure user experience, reduces friction, and boosts productivity.

### Okta-to-Okta orgs and authentication claims

< The data shared between an Okta IdP and an Okta SP is included in the <SAMLRespone> in a new reserved tag in the `Extension` section called `OktaAuth`. The content is communicated in a JSON Web Token. The entire response is encrypted with a published encryption key from the SP org. You can retrieve it by calling the public endpoint `/api/v1/idps/{idpId}/idp-metadata.xml`. The payload of the JWT contains a boolean that indicates whether or not MFA was done in the IdP as well as an array of JSON objects describing each authenticator verified before signing the user in.

#### Example SAML Response

```JSON
<saml2:AuthnStatement AuthnInstant="2024-08-21T21:22:21.250Z" SessionIndex="id29513242525044581346797160">
    <saml2:AuthnContext>
        <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:X509</saml2:AuthnContextClassRef>
        <saml2:AuthnContextDecl>
            <AuthenticationContextDeclaration xmlns="urn:okta:saml:2.0:OktaAuth">
                <Extension>
                    <OktaAuth xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">
                        eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.rClRoDXjtYFBv8hTSSjnOsRaQXsYZty25vYKgyTsWP6tUHgC5w34fA8UC2eEu0tgqKaP16K0DmJKj2RaB30pqPf_FvKkWGgp6NZI_1vA6ZLK0mmDXNzaYGsiRkXvgVCUcYP6O1J47E1OmaEQctcDXRdEvNLXNlcmykZ19h6UzO6DoDxBde0wE_GOTXW_eRdyg86T-ztYmaVEPQu2c6smwuXIwRuEp-tiq-gUpxe6-bkw-E75y9Mecs0tSd36n5z4KusBXZ96PpOVi0bC6Wk7aJX-XW5mnOXvdEpbPgymGnTP784x7_zdJlEiUZChPMDPr3JDpYXAMVe1yYmjaeX6xQ.MY6P5HIRCperbtCl.nXqsU19voMKXScu8qKDO5eRLWDtmNMWOSQ1zP2Vfmn2ZlLLtWiJaoNuWMn5IQspTQLArbWejsH_eXZHDeyA9eKQD2GPH4q0fF9B7vQi6hqRx1-SGQKNJi7NTD-kTiGy6xGp0H6CDA9kstQ3GFXBF0sM4ZanhDJuIh8EsdOyWZjOOjUiS6XrQkm0r2hH0iwgmLoyUeBynLzggUwUP3hi_ReFlNdQtI5pRvmGCv4Xf7_ofwAAo-OLOBXSr4ciyNdAIo-kuyFBGAstqh0-35pZ54jIjQJ3Biye40yqS9EWUrBhcBhz-JVsVgizC58QYxVFVlWVNL-M4DMu56u_VPIbcmW_Vzui1TQaVlqFSo1NKmO9aeRNF2ItV0ljxNkojYkJN07rpuuibAgdqjQolcxlY1-ucrgG-C7u936zOZPoHtswN3q9Bq5L5jKV2vwEnhu7BSRG0rGhyeikEJZzZ9MqDZxn7D4VZ7Mj6_l01f9LpUUHVQgPd6X1vUHqdaW4fdja86unF_i_FlPN7Rp__hqEzgloDDA7aVybPIqwkNCv2PY226iUuTDnooAOMQLNH555qqj0a4yIME-0zAN7m93RsS9fjrAhKbL3WBwwxF9RijgJFCxLjUiDIjgVaMM_E37e0tikjqhmmImKhyk00oirbZNE5g1S7hilAJPE5S5gVb8v3buO894JBdOUfPgNjClrPaJ0GAvsjXpNm1nUKpOaycWmTyuDJdePVDvk6UztjjrjWLZNaB7WDq22F8VRjsxD6cwGZm1GxI4kDEb_vZrVihLYGn9295_IwfPNrixIcsIMBoaaMsCZDDvBuThkCAv8d2AwpnbiE1GKDPNDA8GShrjZmkAc6tPuUKZoB7LVfMpPurcNaZQyWKtwVRZWM_TkBS_ecz2aw0hIkaF0L1cqPR85fTW1aC-RK_yZRcGw7pLcGUSgTvsMFPzEnexCSlntRJ3EUbcd4w8LoxYTuE1n67yJi9Dik2DSfbgPdK9GT_fs0cN8-Gc65FgYfUvP5pttWh5dHozzM2CfKOBk2s_jZ5ZqyeXkgL9G6djlAEG1GN8M7JrbQR0PzHePLrq5DfNLY4JlQzHbWG7UaGKjrXRdMm3Tp6cg_EWqgTVPVTpv8QVUJXm8LJSziTNcWQfCw_CG1hLrfvrbDOE1s8aIS_gViH9-gUAar5AhxGo5sz9AEHZeIC3sklaQ-pIJq2KaDRUXktQEBbMEY5o6uWdn2Xy7nOkEEj4Cj0dtsJHtBSB12nnQYrtUYO68uuax_BKXQg3MCAArtK9jB3u5WTXf3IUSZUCFOGMyGBAa0TeRPsJcd9t2oSUxZUV8JjLDnPlaf9RIK6_oKiCXpKZwR9YMXMOxlLsTzg3yBo1HRkOqRvc9R0DYG-ghoHFHHkjPvfQUmAPX-t6qycAx848tpTI138ZtGf413z1NzmUjxtsvsBz1ydP6ZZIQXc1e8__KCPR8IGNcITHTUKRMh3Nc9CgLY2f0GGrtedAwmBWYNMGCoaR_wWrjZ8tF-q3owLn8ja-KGMVJEWQ7iDHKR0gvvYept2-cDpcWGxg0Bzvh_AzZDv31qz-DPeB0ahQsVmC1uJIWOkKBa3SGIRyuqHz2rztkLn6dJdSZBPTRybDCLU9lu17hX-T-I50l8D9FTmCJTTcm1zszxecRXe6VsUBoUeeJn6Zk8xpY35fpPnUGDMdbrJnZ1Hc2CTp4q2Ym1yw7zfVR0mPVbbaZXir81rGkrD4MqCUQqUQuPT6chOShY59TR499c9THnRCsuIVZhg4u4-j0L2cfL-9EhxHanB86nEKquRCJ-Fisf77HdgHZhh52htBd7MOYRU6GXuJh9nwW2l-RppfM.wzZ_mCBoNwot00-l1wCSWg
                    </OktaAuth>
                </Extension>
            </AuthenticationContextDeclaration>
        </saml2:AuthnContextDecl>
    </saml2:AuthnContext>
</saml2:AuthnStatement>
```

#### Payload of the JWT

```JSON
{
  "mfaVerified": "true",
  "factorVerifications": [
    {
      "factor": {
        "type": "AUTHENTICATOR",
        "displayName": "Phone",
        "status": "ACTIVE",
        "authenticatorType": "phone",
        "methodType": "sms",
        "authenticatorKeyName": "phone_number",
        "profile": {
          "phoneNumber": "+1 XXX-XXX-2282"
        },
        "properties": [],
        "propertiesToVerify": [],
        "propertiesRequiredToVerify": [],
        "factorClassesToBeChallengedByThisMethod": [],
        "usableForRecoveryOnly": false,
        "userVerificationKeyUnavailable": false
      },
      "verificationTimestamp": 1724277328376
    }
  ]
}
```

The data shared between an Okta IdP and an Okta SP is included in the ID token under a new reserved claim name called `okta-auth`. The content is communicated in a JSON Web Token. The entire response is encrypted with a published encryption key from the SP org. You can retrieve it by calling the public endpoint `/api/v1/idps/{idpId}/idp-metadata.xml`.

#### Example ID token

```JSON
{
  "aud": "ts1hjc8xh3",
  "auth_time": 1720481750,
  "email": "jon.smith@example.com",
  "exp": 1720482230,
  "family_name": "Smith",
  "given_name": "Jon",
  "iat": 1720481810,
  "iss": "https://idp.okta.com",
  "nonce": "3byzgGdVLxjNUQ3X73rYgQBUc_DO4AJ2",
  "sub": "jon.smith@example.com",
  "okta_auth": {
      "mfaVerified": "true",
      "factorVerifications": [
        {
          "factor": {
            "type": "AUTHENTICATOR",
            "displayName": "Phone",
            "status": "ACTIVE",
            "authenticatorType": "phone",
            "methodType": "sms",
            "authenticatorKeyName": "phone_number",
            "profile": {
                "phoneNumber": "+1 XXX-XXX-2282"
            },
            "properties": [],
            "propertiesToVerify": [],
            "propertiesRequiredToVerify": [],
            "factorClassesToBeChallengedByThisMethod": [],
            "usableForRecoveryOnly": false,
            "userVerificationKeyUnavailable": false
          },
          "verificationTimestamp": 1724277328376
        }
      ]
    }
}
```

## AMR claims sharing flow

<div class="three-quarter">

![Flow diagram that displays the communication between the user, user agent, authorization server, and the Identity Provider](/img/auth/amr-claims-mapping-oidc.png)
<!-- https://www.figma.com/design/YH5Zhzp66kGCglrXQUag2E/📊-Updated-Diagrams-for-Dev-Docs?node-id=4696-3134&t=vwcppYyoeWOz2kEQ-11
amr-claims-mapping-oidc.png -->

</div>

1. A user attempts to sign in to an <OpenID Connect> app using an Okta IdP through the browser (user agent).
2. The browser redirects the user to the Okta `/authorize` endpoint to authenticate.
3. Okta redirects the user to the Okta IdP.
4. The IdP authenticates the user.
5. The identity provider redirects the user to Okta. The identity provider response contains the supported claims.

    > **Note:** Claims are stored in an Okta session and considered during policy evaluation.

6. Okta redirects the user to the browser. The user isn't challenged for MFA if the factors used by the identity provider meet policy requirements.
7. The browser sends a request to the Okta `/token` endpoint.
8. Okta responds with the access token and the claims in the ID token.

## Configure the IdP to send authentication claims

To use claims sharing, there are a few steps to consider. Configure your <> IdP to send authentication claims. Add the `trust claims: true` key and value pair to your IdP update.

Alternatively, you can enable the **Trust claims from this provider** checkbox in the Admin Console. See [robs link here]().

### OpenID Connect Identity Provider



#### Example <> IdP update request

< This request is an example of a SAML IdP update to trust claims. In the `policy` section, the `trust claims: true` key and value pair appears.

```JSON
{
    "type":"SAML2",
    "status":"ACTIVE",
    "features":[],
    "id":"0oa78rktqwQbG2m9O0g4",
    "orgUrl":"http://sp-oie.okta1.com:1802",
    "name":"Org2Org",
    "created":null,
    "lastUpdated":"2025-01-15T19:45:03.000Z",
    "protocol":{
        "endpoints":{
            "authorization":{"binding":"HTTP-REDIRECT"},
            "token":{"binding":"HTTP-POST"},
            "userInfo":null,
            "jwks":{"binding":"HTTP-REDIRECT"},
            "acs":{
                "binding":"HTTP-POST",
                "type":"INSTANCE"},
            "sso":{
                "url":"http://idp-oie.okta1.com:1802/app/okta_org2org/exk78hrRdLRNV4EZY0g4/sso/saml",
                "binding":"HTTP-POST",
                "destination":"http://okta.com"
                }
        },
        "scopes":[],
        "settings":{
            "nameFormat":"urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "honorPersistentNameId":true
        },
        "type":"SAML2",
        "algorithms":{
            "response":{
                "signature":{
                    "algorithm":"SHA-256",
                        "scope":"ANY"
                }
            },
        "request":{
            "signature":{
                "algorithm":"SHA-256",
                    "scope":"REQUEST"
              }
          }
        },
        "credentials":{
            "trust":{
                "issuer":"http://www.okta.com/exk78hrRdLRNV4EZY0g4",
                "audience":"https://www.okta.com/saml2/service-provider/spjhiydxfezknoimtoye",
                "kid":"eb5c22a1-c2c2-484b-839f-2ca6d29fd519",
                "revocation":null,
                "revocationCacheLifetime":0
             },
        "signing":{"kid":"uiiidnMQ4_WXZlt-ovtrRKJDK6UivJfFSnrfN4nNdwg"}
        }
    },
    "policy":{
        "trustClaims":true,
        "accountLink":{
            "action":"AUTO",
            "filter":null},
            "provisioning":{
                "action":"AUTO",
                "profileMaster":false,
                "groups":{"action":"NONE"}
            },
    "maxClockSkew":120000,
    "subject":{
        "userNameTemplate":{
            "template":"idpuser.subjectNameId"},
        "filter":"",
        "matchType":"USERNAME",
        "matchAttribute":null
        },
    "mapAMRClaims":false
    },
    "_links":{
        "acs":{
            "hints":{
                "allow":["POST"]
                },
            "href":"http://sp-oie.okta1.com:1802/sso/saml2/0oa78rktqwQbG2m9O0g4",
        "type":"application/xml"
        },
    "metadata":{
        "hints":{
            "allow":["GET"]
        },
        "href":"http://sp-oie.okta1.com:1802/api/v1/idps/0oa78rktqwQbG2m9O0g4/metadata.xml",
        "type":"application/xml"
        },
    "users":{
        "hints":{
            "allow":["GET"]
            },
        "href":"http://sp-oie.okta1.com:1802/api/v1/idps/0oa78rktqwQbG2m9O0g4/users"
    },
    "authorize":{
        "hints":{
            "allow":[]
            }
        },
    "clientRedirectUri":{
        "hints":{"allow":[]}
        },
    "deactivate":{
        "href":"http://sp-oie.okta1.com:1802/api/v1/idps/0oa78rktqwQbG2m9O0g4/lifecycle/deactivate",
        "hints":{"allow":["POST"]}
        }
    }
}
```
>

#### Example update response

```JSON
{
    "id": "0oa78rktqwQbG2m9O0g4",
    "name": "Org2Org",
    "status": "ACTIVE",
    "created": null,
    "lastUpdated": "2025-01-15T19:45:16.000Z",
    "protocol": {
        "type": "SAML2",
        "endpoints": {
            "sso": {
                "url": "http://idp-oie.okta1.com:1802/app/okta_org2org/exk78hrRdLRNV4EZY0g4/sso/saml",
                "binding": "HTTP-POST",
                "destination": "http://okta.com"
            },
            "acs": {
                "binding": "HTTP-POST",
                "type": "INSTANCE"
            }
        },
        "algorithms": {
            "request": {
                "signature": {
                    "algorithm": "SHA-256",
                    "scope": "REQUEST"
                }
            },
            "response": {
                "signature": {
                    "algorithm": "SHA-256",
                    "scope": "ANY"
                }
            }
        },
        "settings": {
            "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "honorPersistentNameId": true
        },
        "credentials": {
            "trust": {
                "issuer": "http://www.okta.com/exk78hrRdLRNV4EZY0g4",
                "audience": "https://www.okta.com/saml2/service-provider/spjhiydxfezknoimtoye",
                "kid": "eb5c22a1-c2c2-484b-839f-2ca6d29fd519",
                "revocation": null,
                "revocationCacheLifetime": 0
            },
            "signing": {
                "kid": "uiiidnMQ4_WXZlt-ovtrRKJDK6UivJfFSnrfN4nNdwg"
            }
        }
    },
    "policy": {
        "provisioning": {
            "action": "AUTO",
            "profileMaster": false,
            "groups": {
                "action": "NONE"
            },
            "conditions": {
                "deprovisioned": {
                    "action": "NONE"
                },
                "suspended": {
                    "action": "NONE"
                }
            }
        },
        "accountLink": {
            "filter": null,
            "action": "AUTO"
        },
        "subject": {
            "userNameTemplate": {
                "template": "idpuser.subjectNameId"
            },
            "filter": "",
            "matchType": "USERNAME",
            "matchAttribute": null
        },
        "maxClockSkew": 120000,
        "mapAMRClaims": false,
        "trustClaims": true
    },
    "type": "SAML2",
    "_links": {
        "metadata": {
            "href": "http://sp-oie.okta1.com:1802/api/v1/idps/0oa78rktqwQbG2m9O0g4/metadata.xml",
            "type": "application/xml",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "acs": {
            "href": "http://sp-oie.okta1.com:1802/sso/saml2/0oa78rktqwQbG2m9O0g4",
            "type": "application/xml",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "users": {
            "href": "http://sp-oie.okta1.com:1802/api/v1/idps/0oa78rktqwQbG2m9O0g4/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "http://sp-oie.okta1.com:1802/api/v1/idps/0oa78rktqwQbG2m9O0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
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
