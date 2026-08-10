---
title: Configure Smart Card authentication and access policies for Access Gateway offline mode
meta:
  - name: description
    content: Learn how to configure a Smart Card authenticator and access policies for Access Gateway offline mode.
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure Smart Card authentication and access policies for Access Gateway when in offline mode. An access policy controls which authentication methods a group of users must use to sign in to an app when Access Gateway is in offline mode.

> **Note:** The Access Gateway APIs that are used for Smart Card authentication and access policy configuration are available in a Limited Early Access program and may be updated or changed based on feedback.

---

#### Learning outcomes

* Configure a Smart Card authenticator for Access Gateway offline mode.
* Create an access policy that controls which authentication methods a group of users must use to sign in.
* Assign an access policy to an app.

#### What you need

* Offline mode configured for Access Gateway. See [Configure offline mode for Access Gateway](/docs/guides/oag-offline-mode/main/).
* An identity provider (IdP) in your Access Gateway instance with failover mode set to `AUTOMATIC`.
* An app in your Access Gateway instance, such as a [generic app](https://help.okta.com/okta_help.htm?type=oag&id=ext_oag_app_gen_header) or or OpenID Connect (OIDC) app. See [Add an app for Access Gateway offline mode](/docs/guides/oag-configure-apps-offline-mode/main/).
* A Certificate Authority (CA) certificate chain for your Smart Card, as one or more Base64-encoded X.509 certificates in Distinguished Encoding Rules (DER) format.

---

## Overview

Access Gateway offline mode supports two authenticators:

* `password`: Authenticates users against your configured offline mode directory. This authenticator is automatically configured, always active, and read-only.
* `smart_card`: Authenticates users with a certificate-based Smart Card, such as a Personal Identity Verification (PIV) or Common Access Card (CAC). You create and manage this authenticator.

An access policy determines which authenticator, or combination of authenticators, a group of users must use to sign in to an app during offline mode. A policy contains one or more rules, and each rule has a group condition and an action that defines an ordered chain of authentication methods.

Access Gateway automatically creates a default access policy for each IdP. Access Gateway doesn't require an access policy before you activate offline mode for an app. But an app without one has no enforced sign-in requirement when offline. Always assign a policy before enabling offline mode for the app.
S
An access policy supports one rule, with a single authentication method chain. See [Create an access policy](#create-an-access-policy) for the supported chains.

## Configure Smart Card authentication and access policies for Access Gateway

The following sections explain which endpoints to use to configure a Smart Card authenticator and an access policy, and to assign that policy to an app.

1. [Create a Smart Card authenticator](#create-a-smart-card-authenticator).
1. [Activate the Smart Card authenticator](#activate-the-smart-card-authenticator).
1. [Create an access policy](#create-an-access-policy).
1. [Assign the access policy to an app](#assign-the-access-policy-to-an-app).

### Create a Smart Card authenticator

Create a Smart Card authenticator for your IdP. The authenticator stores the CA certificate chain that Access Gateway uses to validate Smart Card certificates, and the settings that Access Gateway uses to match a certificate to an Okta user.

A Smart Card authenticator is created with a status of `INACTIVE`. It isn't visible to users on the sign-in page, and it can't be referenced in an access policy chain, until you [activate it](#activate-the-smart-card-authenticator).

Before you configure the authenticator, review the following settings:

* `certificates` is your organization's own CA certificate chain, not one issued by Okta or Access Gateway. Ask your PKI or security team for this chain if you don't already have it.
* `offlineCrlFailover.url` is optional. Set it only if your organization publishes a CRL endpoint that Access Gateway can reach while in offline mode. If you don't set it, Access Gateway checks the CRL Distribution Point URLs embedded in the certificate chain instead.
* `userMatching` maps an identity value from the Smart Card certificate to an Okta user. `identitySource` is the certificate field that Access Gateway reads, and `matchType` is the type of Okta user attribute it's compared against. Choose values for both that match how your organization issues certificates and how your Okta users are set up. See the [IDPs Offline Mode Authenticators](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-authenticators) API documentation for the full list of supported values.
* `allowMultipleUserMatching` controls whether a single certificate is allowed to match more than one Okta user. Leave it `false` unless you expect certificates to be shared.

1. Retrieve your `idpId` by using the [List all IdPs](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps/other/listidps) endpoint.
1. Then, use the [Create an offline mode authenticator](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-authenticators/other/createofflinemodeauthenticator) endpoint.
1. In the request body, set the following values for the Smart Card authenticator:
   1. Set `key` as `smart_card`.
   1. In the configuration object, set `certificates` as an array of one or more Base64-encoded X.509 certificates in DER format.
   1. Optionally, set `offlineCrlFailover.url`.
   1. In the `userMatching` object, set `identitySource` and `matchType`. If you set `matchType` to `CUSTOM`, also set `matchAttribute` to the name of the custom attribute. Optionally, set `allowMultipleUserMatching`.
  [[style="list-style-type:lower-alpha"]]
1. Send the POST request.

#### Request example

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode/authenticators' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "key": "smart_card",
    "name": "Corporate PIV Card Authenticator",
    "configuration": {
      "certificates": [
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA75...",
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9x..."
      ],
      "offlineCrlFailover": {
        "url": "http://crl.company.com/piv-ca.crl"
      },
      "userMatching": {
        "allowMultipleUserMatching": false,
        "matchType": "CUSTOM",
        "matchAttribute": "employeeId",
        "identitySource": "SUBJECTDN_CN"
      }
    }
  }'
```

This example sets a CRL failover URL, so Access Gateway checks that endpoint for revoked certificates instead of the CRL Distribution Point URLs embedded in the certificate chain. It sets `identitySource` to `SUBJECTDN_CN` because certificates from this CA carry the employee's ID number in the certificate's Common Name (CN) field, rather than a name or email address. Because Common Name isn't a native email or username match, `matchType` is set to `CUSTOM` and `matchAttribute` to `employeeId`, so Access Gateway compares the certificate's CN against the `employeeId` custom attribute on the corresponding Okta user. `allowMultipleUserMatching` is `false` because each certificate belongs to exactly one employee.

#### Response example

```json
{
  "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "key": "smart_card",
  "status": "INACTIVE",
  "name": "Corporate PIV Card Authenticator",
  "configuration": {
    "certificates": [
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA75...",
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9x..."
    ],
    "offlineCrlFailover": {
      "url": "http://crl.company.com/piv-ca.crl"
    },
    "userMatching": {
      "allowMultipleUserMatching": false,
      "matchType": "CUSTOM",
      "matchAttribute": "employeeId",
      "identitySource": "SUBJECTDN_CN"
    }
  }
}
```

Copy the `id` from the response. You use it as the `authenticatorId` in the next step.

### Activate the Smart Card authenticator

Activate the Smart Card authenticator to make it available to users on the sign-in page and usable in an access policy chain.

1. Use the `authenticatorId` from the [previous step](#create-a-smart-card-authenticator).
1. Use the [Activate an offline mode authenticator](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-authenticators/other/activateofflinemodeauthenticator) endpoint.

#### Request example

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode/authenticators/{authenticatorId}/lifecycle/activate' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>'
```

#### Response example

```json
{
  "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "key": "smart_card",
  "status": "ACTIVE",
  "name": "Corporate PIV Card Authenticator",
  "configuration": {
    "certificates": [
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA75...",
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9x..."
    ],
    "offlineCrlFailover": {
      "url": "http://crl.company.com/piv-ca.crl"
    },
    "userMatching": {
      "allowMultipleUserMatching": false,
      "matchType": "CUSTOM",
      "matchAttribute": "employeeId",
      "identitySource": "SUBJECTDN_CN"
    }
  }
}
```

The authenticator's `status` is now `ACTIVE`. Users see a Smart Card sign-in option on the sign-in page, and you can reference `smart_card` in an access policy chain.

### Create an access policy

Create an access policy that defines which group of users must sign in using the Smart Card authenticator, the password authenticator, or both.

An access policy's rule chain must be one of the following four combinations of `password` and `smart_card`.

| Chain | `authenticationMethods` value |
|---|---|
| Password only | `[[{"key": "password"}]]` |
| Smart Card only | `[[{"key": "smart_card"}]]` |
| Password and Smart Card | `[[{"key": "password"}], [{"key": "smart_card"}]]` |
| Password or Smart Card | `[[{"key": "password"}, {"key": "smart_card"}]]` |

Each inner array in `authenticationMethods` is a required step in the chain. If you have multiple authenticators in a single array, then users can sign in with any of them. For example, the "Password or Smart Card" chain allows users to sign in with either a password or a Smart Card.

For the full schema reference, see [IDPs Offline Mode Authenticators](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-authenticators) and [IDPs Offline Mode Access Policy](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-access-policy).

Before you configure the policy, review the following settings:

* `conditions.groups.include` lists the groups that the rule applies to. These groups must already exist in your offline mode directory. See [Create and configure the offline mode directory](/docs/guides/oag-offline-mode/main/#create-and-configure-the-offline-mode-directory) if you haven't synced your groups yet.
* `actions.access` must be set to `allow`. It's currently the only supported value.
* `actions.chains` must be one of the four combinations of `password` and `smart_card` listed in the table above.

1. Retrieve your `idpId` by using the [List all IdPs](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps/other/listidps) endpoint.
1. Then, use the [Create an offline mode access policy](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-access-policy/other/createofflinemodeaccesspolicy) endpoint.
1. In the request body, set the following values for the access policy:
   1. Set `name` to a display name for the policy.
   1. In `rules`, add a rule object and set its `name`.
   1. In the rule's `conditions.groups.include`, list the group or groups that the rule applies to.
   1. In the rule's `actions`, set `access` to `allow`.
   1. In `actions.chains`, set `authenticationMethods` to one of the four supported combinations.
  [[style="list-style-type:lower-alpha"]]
1. Send the POST request.

#### Request example

```bash
curl -i -X POST \
  'https://oag.domain.tld/api/v2/idps/{idpId}/offline-mode/access-policies' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Engineering Policy",
    "rules": [
      {
        "name": "password and smartcard",
        "conditions": {
          "groups": {
            "include": [
              { "name": "Engineers" }
            ]
          }
        },
        "actions": {
          "access": "allow",
          "chains": [
            {
              "authenticationMethods": [
                [ { "key": "password" } ],
                [ { "key": "smart_card" } ]
              ]
            }
          ]
        }
      }
    ]
  }'
```

This policy requires users in the `Engineers` group to sign in with both a password and a Smart Card. See the table above for the other combinations of `password` and `smart_card`.

#### Response example

```json
{
  "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "name": "Engineering Policy",
  "isDefault": false,
  "rules": [
    {
      "name": "password and smartcard",
      "conditions": {
        "groups": {
          "include": [
            { "name": "Engineers" }
          ]
        }
      },
      "actions": {
        "access": "allow",
        "chains": [
          {
            "authenticationMethods": [
              [ { "key": "password" } ],
              [ { "key": "smart_card" } ]
            ]
          }
        ]
      }
    }
  ]
}
```

Copy the `id` from the response. You use it as the `accessPolicyId` in the next step.

### Assign the access policy to an app

Assign the access policy to an app so that Access Gateway enforces it when the app is in offline mode. A policy can be assigned to one or more apps. Every app that's used for offline mode must have an assigned access policy.

1. Retrieve your app's ID by using the [List all apps](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/listapplication) endpoint.
1. Use the `accessPolicyId` from the [previous step](#create-an-access-policy).
1. Then, use the [Assign an offline mode access policy to an application](https://developer.okta.com/docs/api/openapi/oag/oag/tags/application-offline-mode/other/assignapplicationofflinemodeaccesspolicy) endpoint.

#### Request example

```bash
curl -i -X PUT \
  'https://oag.domain.tld/api/v2/apps/{applicationId}/offline-mode/access-policy' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "accessPolicyId": "b2c3d4e5-f6a7-8901-bcde-f12345678901"
  }'
```

#### Response example

```json
{
  "accessPolicyId": "b2c3d4e5-f6a7-8901-bcde-f12345678901"
}
```

The app now enforces the assigned access policy when Access Gateway is in offline mode. Users in the policy's group condition must complete the policy's authentication method chain to sign in.

## Summary

You've successfully configured a Smart Card authenticator and an access policy for Access Gateway offline mode. Users in the group that's defined in the policy's condition must now sign in using the authentication method chain that you configured, such as a Smart Card, a password, or both, when Access Gateway is in offline mode.

## See also

* [Configure offline mode for Access Gateway](/docs/guides/oag-offline-mode/main/)
* [IDPs Offline Mode Authenticators API documentation](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-authenticators)
* [IDPs Offline Mode Access Policy API documentation](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps-offline-mode-access-policy)
* [Access Gateway API documentation](https://developer.okta.com/docs/api/openapi/oag/guides/overview)
* [Okta Access Gateway documentation](https://help.okta.com/okta_help.htm?type=oag&id=ext_oag_main)
