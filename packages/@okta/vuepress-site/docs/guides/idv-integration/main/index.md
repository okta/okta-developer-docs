---
title: Integrate Okta with identity verification vendors
excerpt: How IDV vendors can integrate with Okta
layout: Guides
---

Developers and organizations can use identity verification (IDV) vendors to integrate IDV flows into their authentication and authorization processes.

This guide shows developers of IDV vendors how their IDV solutions integrate with Okta orgs.

---

#### Learning outcomes

Understand the standardized process of how IDV vendors integrate with Okta

#### What you need

* An IDV service that has an app and IDV flow
* [Okta Developer Edition organization](https://developer.okta.com/signup)
* The [Okta account management policy](/docs/guides/okta-account-management-policy/main/) feature enabled for an org
* The Identity verification with third party identity verification vendors feature enabled for an org

## About identity verification and IDV vendors

IDV vendors typically verify the identities of users by requiring them to submit a proof of identity. The proof of identity matches a user’s digital identity against a trusted data source. IDV vendors provide IDV flows as part of their services. Okta admins and developers can work with IDV vendors to integrate their IDV flows into their orgs.

IDV flows are customizable and can be configured in different ways to verify user identities. For example, IDV vendors can provide a flow that requires a user’s given and family names to be matched against a picture of their driver’s license or passport. Or they can provide a flow that requires users to take selfies as proofs of liveliness.

### Okta supported IDV vendors

Okta supports three IDV vendors that admins can configure in the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=id-verification) or by using [Okta APIs](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider).

* [Persona](/docs/guides/add-id-verification-idp/persona/main/)

* [CLEAR Verified](https://docs.clearme.com/docs/getting-started) <ApiLifecycle access="ea" />

* [Incode](https://workforce.developer.incode.com/docs/incode-okta-idv-configuration) <ApiLifecycle access="ea" />

## How IDV vendors integrate with Okta

The following diagram shows the standardized process for how IDV vendors integrate with Okta.

<div class="full border">

![Step by step diagram of the IDV integration process.](/img/identity-verification/diagram-idv-integration.png)

</div>

1. An Okta user does one of the following actions to trigger an [Okta account management policy](/docs/guides/okta-account-management-policy/main) evaluation:
   * Enrolls or unenrolls an authenticator
   * Recovers their password
   * Unlocks their account

1. Okta then sends a `POST /oauth2/par` request to the IDV vendor's authorization server.
1. The IDV vendor processes the request and sends a response to Okta with a `request_uri`.
1. Okta receives the `request_uri` and uses it to construct a `GET /oauth2/authorize` request.
1. Okta redirects the `request_uri` to the user's browser. The user's browser sends the GET request to the IDV vendor's authorization endpoint to start the IDV flow. The GET request contains the `request_uri` parameter.
1. The user then completes the IDV flow, and the IDV vendor creates an `authorization_code` and returns it to Okta in a response.
1. Okta creates and sends a `POST /token` request to the IDV vendor that contains information from the redirect response.
1. The IDV vendor sends an `id_token` containing the results of the flow back to Okta.
1. Okta evaluates the results and completes the policy evaluation. The policy evaluation is marked as `VERIFIED` or `FAILED`.

## Summary of steps

The following sections detail the steps of an IDV vendor integration.

### Policy evaluation

A user triggers an Okta account management policy evaluation. There are several ways to trigger a policy evaluation:

* A user enrolls or unenrolls an authenticator
* A user recovers their password
* A user unlocks their account

### POST /oauth2/par request to IDV vendor

After the user triggers a policy evaluation, Okta sends a `POST /oauth2/par` request to the IDV vendor's authorization server.

The request contains standard pushed authorization request (PAR) [parameters](https://www.rfc-editor.org/rfc/rfc9126.html#name-pushed-authorization-reques) and a `verified_claims` object. The `verified_claims` object contains two identity verification objects that determine how the IDV flow interacts with Okta.

* The `claims` object passes the name of the Okta user to the IDV vendor.
* The `verification` object determines the trust framework between Okta and the IDV vendor and the necessary assurance level for a successful IDV flow. `IDV-DELEGATED` is the only trust framework that Okta supports for IDV vendor integration.

When Okta sends the request, a unique verification session is established.

#### POST /oauth2/par request example

To improve readability, the following example values aren’t URL encoded.

```json
POST /oauth2/par HTTP/1.1

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
  "redirect_uri": "https://{yourOktadomain}/idp/identity-verification/callback"
}
```

#### POST /oauth2/par error response

The error response for an unsuccessful `POST /oauth2/par` request uses this [structure](https://www.rfc-editor.org/rfc/rfc9126.html#name-error-response).

```json
 HTTP/1.1 400 Bad Request
 Content-Type: application/json
 Cache-Control: no-cache, no-store

 {
   "error": "invalid_request",
   "error_description":
     "The redirect_uri is not valid for the given client"
 }
```

#### Request parameters

| Parameter             | Description                                                                                                     | Param Type | DataType | Source |
|-----------------------|-----------------------------------------------------------------------------------------------------------------|------------|----------|----------|
| response_type         | Determines the type of flow. Okta uses `code` to identify the request as an `authorization_code` flow.    | String           | String         | Okta sets this value       |
| client_id             | Unique identifier of the IDV vendor app.                                                                              | String     | String   | IDV vendors set this value      |
| client_secret         | A confidential key associated with the IDV vendor's `client_id`.                                                          | String     | String   | IDV vendors set this value      |
| code_challenge        | A cryptographic string derived from a code verifier. It’s used with the PKCE (Proof Key for Code Exchange) mechanism. | String     | String   | Okta sets this value      |
| code_challenge_method | The transformation method that’s used to create the `code_challenge` from the code verifier. Okta uses the `S256` method. | String     | String   | Okta sets this value      |
| scope                 | Defines the permissions or access levels that are requested.                                                   | String     | String   | IDV vendors set this value      |
| openid                | Identifies the request as an OpenID Connect request.                                                           | String           | String         | IDV vendors set this value         |
| profile               | Requests access to the end user's default profile claims.                                                      | String            | String         | IDV vendors set this value         |
| identity_assurance    | Requests access to the `verified_claims` object.                                                                 | String           | String         | IDV vendors set this value         |
| idv_flow_{idv_flow_id} | Identifies a specific IDV flow from the IDV vendor. Replace `{idv_flow_id}` with the identifier of the flow. It can be omitted from the request if the `client_id` and `client_secret` are configured to represent a specific flow from the IDV vendor. | String           | String         | IDV vendors set this value       |
| verified_claims       | Contains the `verification` and `claims` objects.                                                         | Object           | Object         | IDV vendors set this value         |
| verification | Specifies the parameters and requirements for verifying the claims. Okta uses both the `trust_framework` and `assurance_level` properties. See the OpenID Connect definition of the [verification](https://openid.bitbucket.io/ekyc/openid-ida-verified-claims.html#name-verification-element) property. | Object           | Object         | IDV vendors set this value         |
| trust_framework | Identifies the trust framework that provides assurance about the verified attributes. Okta sets `IDV_DELEGATED` as the default value. This value delegates identity verification and the assurance policy to the IDV vendor. The IDV vendor is then responsible for verifying user identities and sends the results back to Okta. `IDV_DELEGATED` is currently the only supported trust framework. See the OpenID Connect definition of the [trust_framework](https://openid.net/specs/openid-ida-verified-claims-1_0.html#name-element-structure) property.  | String           | String         | IDV vendors set this value         |
| assurance_level | Identifies the assurance level that's required for the identity claims of the user. The IDV must map their verification results to the possible assurance levels, `VERIFIED` or `FAILED`. For a successful verification, the IDV vendor must pass  `VERIFIED` as the `assurance_level`. For a failed verification, the IDV vendor must pass `FAILED` or a `null` value. See the OpenID Connect definition of the [assurance_level](https://openid.net/specs/openid-ida-verified-claims-1_0.html#name-element-structure) property. | String           | String          | IDV vendors set this value         |
| claims      | Contains user-specific attributes. `given_name` and `family_name` are currently the only supported claims. See the OpenID Connect definition of the [claims](https://openid.net/specs/openid-ida-verified-claims-1_0.html#name-claims-element) property. | Object            | Object         | IDV vendors set this value         |
| fuzzy | An extension that adds fuzzy logic to a specified claim to assist with matching the claim value. For example, the `fuzzy` extension is added to the `given_name` claim. The IDV vendor doesn’t need to return an identical match for the user’s given name. The `assurance_level` can still be `VERIFIED`. | String           | String         | IDV vendors set this value         |
| state                 | A unique string that maintains a connection between the request and the callback.                                    | String     | String   | Okta sets this value      |
| redirect_uri          | The URI where the response is sent after the user completes the IDV flow.                     | String     | String   | IDV vendors set this value      |
| login_hint            | Identifier that associates an Okta user within the IDV vendor's app.                                                        | String           | String         | Okta sets this value         |

### IDV vendor responds with request_uri

A successful `POST /oauth2/par` request generates a `request_uri` that's sent back to Okta as a response. The `request_uri` encodes the identity verification attributes of the `POST /oauth2/par` request as a reference to the now established verification session.

#### POST /oauth2/par response example

```json
HTTP/1.1 201 Created
Content-Type: application/json
Cache-Control: no-cache, no-store

{
  "request_uri": "urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c",
  "expires_in": 60
}
```

### Okta redirects GET /oauth2/authorize request to user

Okta uses the `request_uri` in the IDV vendor response and constructs a `GET /oauth2/authorize` request. Okta then redirects the `request_uri`, that now contains the `GET /oauth2/authorize` request, to the user's browser.

### User's browser sends GET /oauth2/authorize request to IDV vendor

The user's browser sends the `GET` request to the IDV vendor's OAuth 2.0 authorization endpoint. The IDV vendor evaluates the `request_uri` so that the IDV flow can start.

> **Note:** For IDV vendors, Okta recommends renaming the authorization endpoint so that it's clear the endpoint is used for identity verification. For example, rename the endpoint to `/oauth2/idv-authorize`.

#### GET /oauth2/authorize request example

```json
GET /oauth2/idv-authorize?request_uri=urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c HTTP/1.1

Host: idv-vendor.com
```

#### GET /oauth2/authorize error response

The error response for an unsuccessful `GET /oauth2/authorize` request uses this [structure](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1).

```json
HTTP/1.1 302
GET /idp/identity-verification/callback?error=invalid_request&state=30pqcSFzH7H0bIftWwYRbNNwbpOpfY-W
```

### User completes the IDV flow

The user is then redirected to the IDV vendor app and completes the IDV flow.

### IDV vendor sends authorization_code to Okta

After the user completes the IDV flow, the IDV vendor redirects them to the `redirect_uri` specified in the `POST /oauth2/par` [request](#post-oauth2-par-request-to-idv-vendor). The user is redirected to their Okta org. The `redirect_uri` contains an `authorization_code` that’s redeemed at the `/oauth2/token` endpoint to retrieve the IDV flow results.

#### IDV vendor redirect to Okta example

```json
HTTP/1.1 302
GET /idp/identity-verification/callback?code=42bbe6319f0b04a43d&state=30pqcSFzH7H0bIftWwYRbNNwbpOpfY-W HTTP/1.1

Host: org.okta.com
Content-Type: application/x-www-form-urlencoded
```

### Okta sends a POST /token request to IDV vendor

Okta receives the `authorization_code` from the IDV vendor. Okta then uses it to construct and send a `POST /token` request to the IDV vendor. The request contains a `code_verifier` value that’s compared against the `code_challenge` value provided in the `POST /oauth2/par` [request](#post-oauth2-par-request-to-idv-vendor). The values must match for the `POST /token` request to succeed.

#### POST /token request example

To improve readability, the following example values aren’t URL encoded.

```json
POST /token HTTP/1.1

Host: idv-vendor.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id={{client_id}}
&client_secret={{client_secret}}
&code=42bbe6319f0b04a43d
&code_verifier=72e0dca42dd87b345f0652899cba4f92e7b9bb2422f7c5a301ffae41
&redirect_uri=https://{yourOktadomain}/idp/identity-verification/callback
```

#### POST /token error response

The error response for an unsuccessful `POST /token` request uses this [structure](https://openid.net/specs/openid-connect-core-1_0.html#TokenErrorResponse).

```json
 HTTP/1.1 400 Bad Request
 Content-Type: application/json
 Cache-Control: no-cache, no-store

 {
   "error": "invalid_request",
   "error_description":
     "The request is missing a required parameter"
 }
```

### IDV vendor responds with id_token

When the `POST /token` request succeeds, the IDV vendor sends an `id_token` in a JSON Web Token (JWT) encoded format back to Okta in response. The `id_token` includes the `verified_claims` object. This object contains the results of the identity verification for the user.

Note the following the ways to format the `claims` object for the `id_token` response:

* IDV vendors must not include any `claims` attributes other than the currently supported ones: `given_name` and `family_name`. Okta fails a policy evaluation that returns `claims` other than the supported ones.

* IDV vendors can choose to return a `MATCHED` value for any `claims` attributes, instead of returning identifying information about a user. Returning a `MATCHED` value still indicates that the verification was successful but doesn't require IDV vendors to pass identifying information of a user.

* IDV vendors can choose to not pass any `claims` values. They can pass `claims` as an empty object. See [Minimum conformant](https://openid.bitbucket.io/ekyc/openid-ida-verified-claims.html#name-minimum-conformant).

> **Note:** If an IDV vendor passes an empty `claims` object, then the `user.identity_verification` event marks all claims as verified or failed. Whether the claims are failed or verified depends on the `assurance_level` value that's passed.

#### IDV vendor id_token response example

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

### Okta completes the policy evaluation

After the `id_token` is returned in the response from the `POST /token` request, Okta completes the policy evaluation.

Okta inspects `id_token` object. The policy evaluation is successful if the `trust_framework` and `assurance_level` values match the values that were passed in the `POST /oauth2/par` [request](#post-oauth2-par-request-to-idv-vendor), `IDV-DELEGATED` and `VERIFIED`.

If either of the `trust_framework` or `assurance_level` attributes aren't included in the `id_token` [response](#idv-vendor-id-token-response-example) or if they have `null` or unexpected values, then Okta marks the policy evaluation as unsuccessful.

#### Failed policy evaluation example

For example, a user completes an IDV flow but provides a name that doesn't match the `given_name` value. The `assurance_level` value is sent back as `FAILED` in the `id_token` response. And the `given_name` value is returned as `null`.

```json
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache, no-store

{
  "id_token": {
    "verified_claims": [
      "verification": {
        "trust_framework": "IDV-DELEGATED",
        "assurance_level": "FAILED",
        "time": "2024-10-07T10:00:00Z"
      },
      "claims": {
        "given_name": null,
        "family_name": "Jones"
      }
    ]
  }
}
```

## Identity verification events

After Okta completes the policy evaluation, regardless of the result, an event is triggered, `user.identity_verification`. Okta admins can view this event in the System Log. See [Event Types](/docs/reference/api/event-type).

There are two possible results for the event: `ALLOW` (user is successfully verified) or `DENY` (user isn’t verified).

The `ALLOW` result provides a `CLAIMS_VERIFIED` reason that indicates the IDV vendor successfully verified the user.

There are multiple possible reasons for the `DENY` result:

* `IDV_NOT_VERIFIED`: Indicates that the IDV vendor is unable to provide information about possible reasons for failure.
* `CLAIMS_NOT_VERIFIED`: Indicates that the IDV vendor has assessed that not all `claims` attributes were verified.
* `CLAIM_GIVEN_NAME_NOT_VERIFIED`: Indicates that the `given_name` value wasn't verified.
* `CLAIM_FAMILY_NAME_NOT_VERIFIED`: Indicates that the `family_name` value wasn't verified.
