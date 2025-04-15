---
title: Integration with identity verification vendors
meta:
  - name: description
    content: An overview of how IDVs can integrate with Okta.
---

# Integration with identity verification vendors

Developers and organizations can use identity verification vendors (IDVs) to integrate identity verification flows into their authentication and authorization processes. This page explains how IDVs integrate with Okta.

## Overview

IDVs typically verify the identities of users by requiring them to submit a proof of identity. The proof of identity matches a user’s digital identity against a trusted data source. IDVs provide identity verification flows as part of their services. Okta admins and developers can integrate those IDV flows into their orgs.

IDV flows are customizable and can be configured in different ways to verify user identities. For example, you can set up a flow that requires a user’s first and last names to be matched against a picture of their driver’s license or passport. Or configure a flow that requires users to take selfies as proof of liveliness.

Okta admins and developers can integrate a variety of IDVs and their flows with their orgs. The following section explains the standardized process for how IDVs can integrate with Okta.

## How IDVs integrate with Okta

<div class="full border">

![Step by step diagram of the IDV integration process.](/img/concepts/diagram-idv-integration.png)

</div>

1. In your app, the user does one of the following actions to trigger an Okta account management policy evaluation:
   * Enrolls or unenrolls an authenticator
   * Recovers their password
   * Unlocks their account

1. Okta sends a `POST /oauth2/par` request to the IDV.
1. The IDV processes the request and sends a response to Okta with a `request_uri`.
1. The `request_uri` redirects the user to the identity verification flow of the IDV.
1. A `GET /oauth2/authorize` request to the IDV authorization endpoint is sent from the user’s browser to start the IDV flow. The `GET` request contains the `request_uri` parameter.
1. The user completes the IDV flow, and an `authorization_code` is created and returned to Okta in a response.
1. Okta creates a `POST /token` request with information from the redirect response and sends it to the IDV.
1. The IDV sends an `id_token` containing the results of the flow back to Okta.
1. Okta evaluates the results and completes the policy evaluation.
1. The user is marked as successful or `FAILED`.

### Summary of steps

The following sections summarize the steps involved in the IDV integration.

#### Policy evaluation

A user triggers an Okta account management policy evaluation. There are several ways to trigger a policy evaluation:

* A user enrolls or unenrolls an authenticator
* A user recovers their password
* A user unlocks their account

#### POST /oauth2/par request to IDV

After the user triggers a policy evaluation, Okta sends a `POST /oauth2/par` request to the IDV (authorization server?). The request contains standard [pushed authorization request (PAR)](https://www.rfc-editor.org/rfc/rfc9126.html#name-pushed-authorization-reques) parameters and a `verified_claims` object. The `verified_claims` object contains two identity verification attributes.

* The `claims` object defines specific information about a user that the IDV verifies
* The `verification` object provides assurance about the identifying information

See the following request example:

> **Note:** To improve readability, the following example values aren’t URL encoded.

```json
POST /oauth/par HTTP/1.1

Host: idv-vendor.com
Content-Type: application/x-www-form-urlencoded

{
  "response_type": "code",
  "client_id": "{{client_id}}",
  "client_secret": "{{client_secret}}",
  "code_challenge": "{{code_challenge}}",
  "code_challenge_method": "{{code_challenge_method}}",
  "scope": "openid profile identity_assurance idv_flow_{{idv_flow_id}}",
  "claims": {
    "id_token": {
      "verified_claims": [
        {
          "verification": {
            "trust_framework": {
              "value": "IDV-DELEGATED",
              "essential": true
            },
            "assurance_level": {
              "value": "VERIFIED",
              "essential": true
            }
          },
          "claims": {
            "given_name": {
              "fuzzy": "{{ud_first_name}}"
            },
            "family_name": "{{ud_last_name}}"
          }
        }
      ]
    }
  },
  "state": "{{external_state_token_id}}",
  "login_hint": "{{user_id}}",
  "redirect_uri": "https://org.okta.com/idp/identity-verification/callback"
}
```

| Parameter                                   | Description                                                                                                     | Param Type | DataType | Required |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|----------|----------|
| response_type                               | Determines the type of flow. Okta uses `code` to identify the request as an `authorization_code` flow.    |            |          |          |
| client_id                                   | Unique identifier of the IDV app.                                                                              | String     | String   | Yes      |
| client_secret                               | A confidential key associated with the IDV `client_id`.                                                          | String     | String   | Yes      |
| code_challenge                              | A cryptographic string derived from a code verifier. It’s used with the PKCE (Proof Key for Code Exchange) mechanism. | String     | String   | Yes      |
| code_challenge_method                       | The transformation method that’s used to create the code_challenge from the code verifier. Okta uses the `S256` method. | String     | String   | Yes      |
| scope                                       | Defines the permissions or access levels that are requested.                                                   | String     | String   | Yes      |
| scope.openid                                | Identifies the request as an OpenID Connect request.                                                           |            |          |          |
| scope.profile                               | Requests access to the end user's default profile claims.                                                      |            |          |          |
| scope.identity_assurance                    | Requests access to the `verified_claims` object.                                                                 |            |          |          |
| scope.idv_flow_{idv_flow_id}              | Identifies a specific identity verification flow from the IDV. Replace `{idv_flow_id}` with the ID of the flow. It can be omitted if the `client_id` and `client_secret` are configured to represent a specific flow from the IDV. |            |          | No       |
| claims.id_token                             | A JSON Web Token (JWT) that provides verifiable claims about the user, such as their identity and authentication details. |            |          |          |
| claims.id_token.verified_claims             | Contains the `verification` and `trust_framework` objects.                                                         |            |          |          |
| claims.id_token.verified_claims.verification | Specifies the parameters and requirements for verifying the claims. Okta uses both the `trust_framework` and `assurance_level` properties. See the OpenID definition of the [verification](https://openid.bitbucket.io/ekyc/openid-ida-verified-claims.html#name-verification-element) property. |            |          |          |
| claims.id_token.verified_claims.verification.trust_framework | Identifies the trust framework that provides assurance about the verified attributes. Okta sets `IDV_DELEGATED` as the default value. This value delegates the assurance policy to the IDV. `IDV_DELEGATED` is currently the only supported trust framework. See the OpenID definition of the [trust_framework](https://openid.net/specs/openid-ida-verified-claims-1_0.html#name-element-structure) property. |            |          |          |
| claims.id_token.verified_claims.verification.assurance_level | Identifies the assurance level for the identity claims of the end user. See the OpenID definition of the [assurance_level](https://openid.net/specs/openid-ida-verified-claims-1_0.html#name-element-structure) property. |            |          |          |
| claims.id_token.verified_claims.claims      | Contains user-specific attributes. `given_name` and `family_name` are currently the only supported claims. See the OpenID definition of the [claims](https://openid.net/specs/openid-ida-verified-claims-1_0.html#name-claims-element) property. |            |          |          |
| claims.id_token.verified_claims.claims.fuzzy | An extension that adds fuzzy logic to a specified claim to assist with matching the claim value. For example, the fuzzy extension is added to the `given_name` claim. The IDV doesn’t need to return an identical match for the user’s given name. The `assurance_level` can still be `VERIFIED`. |            |          |          |
| state                                       | A unique string used to maintain state between the request and the callback.                                    | String     | String   | Yes      |
| redirect_uri                                | The URI where the response is sent after the user completes the identity verification flow.                     | String     | String   | Yes      |
| login_hint                                  | Identifier that associates an Okta user within the IDV.                                                        |            |          |          |

#### IDV responds with request_uri

A successful request generates a `request_uri` in the response. The `request_uri` encodes the identity verification attributes so that they can be securely transmitted.

See the following response example:

```json
HTTP/1.1 201 Created
Content-Type: application/json
Cache-Control: no-cache, no-store

{
  "request_uri": "urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c",
  "expires_in": 60
}
```

#### Okta redirects user to IDV flow

After the response from the `POST` request is processed, Okta uses the `request_uri` to redirect the user to the IDV’s OAuth2 authorization endpoint.

#### Okta sends a GET /oauth2/authorize request to IDV

Okta sends a `GET /oauth2/authorize` request that delivers the `request_uri`. The IDV evaluates the `request_uri` so that the IDV flow can start.

> **Note:** For IDVs, Okta recommends renaming the authorization endpoint so that it's clear the endpoint is used for identity verification. For example, rename the endpoint to `/oauth2/idv-authorize`.

See the following request example:

```json
GET /oauth2/idv-authorize?request_uri=urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c HTTP/1.1

Host: idv-vendor.com
```

#### User completes the IDV flow

The user is then redirected to the IDV and completes the IDV flow.

#### IDV sends authorization_code to Okta

After the user completes the IDV flow, the IDV redirects them to the `redirect_uri` specified in the [`POST /oauth2/par` request](#post-oauth2par-request-to-idv). The `redirect_uri` contains an `authorization_code` that’s redeemed at the `/oauth2/token` endpoint to retrieve the IDV flow results.

#### Okta sends a POST /token request to IDV

Okta creates and sends a `POST /token` request to the IDV. The request contains a `code_verifier` value that’s compared against the `code_challenge` provided in the `/oauth2/par`request.

See the following request example:

> **Note:** To improve readability, the following example values aren’t URL encoded.

```json
POST /token HTTP/1.1

Host: idv-vendor.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id={{client_id}}
&client_secret={{client_secret}}
&code=42bbe6319f0b04a43d
&code_verifier=72e0dca42dd87b345f0652899cba4f92e7b9bb2422f7c5a301ffae41
&redirect_uri=https://org.okta.com/idp/identity-verification/callback
```

#### IDV responds with id_token

The IDV sends an `id_token` back to Okta in response. The `id_token` includes the `verified_claims` object. The values returned in this object determine the outcome of the initial policy evaluation for the user.

See the following response example:

```json
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache, no-store

{
  "id_token": {
    "verified_claims": [
      "verification": {
        "trust_framework": "IDV-DELEGATED",
        "assurance_level": "VERIFIED",
        "time": "2024-10-07T10:00:00Z"
      },
      "claims": {
        "given_name": {
          "fuzzy": "Dan"
        }
        "family_name": "Jones"
      }
    ]
  }
}
```

> **Note:** If an IDV doesn’t return the `claims` values, they can instead return a `MATCHED` value for any claims attributes. <How can they substitute the value?>

#### Okta completes the policy evaluation

After the `id_token` is returned in the response from the `POST /token`request, Okta can complete the policy evaluation.

Okta inspects `verified_claims` object. The policy evaluation is successful if the `trust_framework` and `assurance_level` values match the values that were passed in the [`POST /oauth2/par` request](#post-oauth2par-request-to-idv). If either of the `trust_framework` or `assurance_level` attributes aren’t included in the `POST /token` response or if the values are `null` or unexpected, then the `assurance_level` is marked as `FAILED`.
