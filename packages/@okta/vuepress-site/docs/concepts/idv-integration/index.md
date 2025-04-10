---
title: Integration with identity verification vendors
meta:
  - name: description
    content: An overview of how IDVs can integrate with Okta.
---

# Integration with identity verification vendors

Developers and organizations can use identity verification vendors (IDVs) to integrate identity verification flows into their authentication and authorization processes. This page explains how IDVs integrate with Okta.

## Overview

IDVs verify the identities of users by requiring them to submit a proof of identity. The proof of identity matches a user’s digital identity against a trusted data source. IDVs provide identity verification flows as part of their services. Okta admins and developers can integrate those IDV flows into their orgs.

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

### Policy evaluation

A user signs triggers an Okta account management policy evaluation. There are several ways to trigger a policy evaluation:

* A user enrolls or unenrolls an authenticator
* A user recovers their password
* A user unlocks their account

#### POST /oauth2/par request to IDV

After the user triggers a policy evaluation, Okta sends a `POST /oauth2/par` request to the IDV (authorization server?). The request contains standard [pushed authorization request (PAR)](https://www.rfc-editor.org/rfc/rfc9126.html#name-pushed-authorization-reques) parameters and a `verified_claims` object. The `verified_claims` object contains identity verification attributes.

Those attributes are used to declare the specific information about a user that the IDV verifies and the trust framework that provides assurance about the identifying information.

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

* client_id: This is a unique identifier assigned to the application making the request. It is used to identify the client to the authorization server during the request.

* client_secret: A confidential key associated with the client_id, used for authenticating the client to the authorization server. It ensures that only authorized clients can make requests.

* code_challenge: This is a cryptographic string derived from a code verifier and is part of the PKCE (Proof Key for Code Exchange) mechanism. It helps to prevent interception and misuse of the authorization code.

* code_challenge_method: Specifies the transformation method (e.g., S256) used to create the code_challenge from the code verifier. This ensures consistency in the PKCE process between the client and the server.

* scope: Defines the permissions or access levels being requested, such as access to user identity or specific identity verification flows. It specifies what resources the client application wants to interact with.

* scope.openid

* scope.profile

* scope.identity_assurance

* scope.






* id_token: A JSON Web Token (JWT) containing identity information about the user. It provides verifiable claims about the user, such as their identity and authentication details.

* verified_claims: Encapsulates specific identity attributes that the identity verification vendor is required to verify. It declares the user attributes being verified (e.g., name, address) and the associated trust framework.

* verification: Specifies the parameters and requirements for verifying the claims, such as the trust framework and assurance level. It dictates how the identity verification process should be performed.

* trust_framework: Indicates the trust model or framework used to provide assurances about the verified attributes (e.g., "IDV-DELEGATED"). It ensures consistency in identity verification standards.

* assurance_level: Represents the confidence level in the verified identity, such as "VERIFIED". It helps to establish the reliability of the identity verification process.

* claims: Encapsulates user-specific attributes, such as given_name or family_name, which are being requested for verification. These attributes are evaluated and returned as part of the identity verification process.





| Parameter           | Description                                                                                    | Param Type | DataType | Required |
|---------------------|------------------------------------------------------------------------------------------------|------------|----------|----------|
| scope               | Identifies the request as an OpenID Connect request                                            | String     | String   | Yes      |
| openid              | Identifies the request as an OpenID Connect request                                            |            |          |          |
| profile             | Requests access to the end user's default profile claims                                       |            |          |          |
| identity_assurance  | Requests access to verified_claims object                                                      |            |          |          |
| idv_flow_{{idv_flow_id}} | Identifies a specific identity verification flow from the IDV to use. Replace {{idv_flow_id}} with the ID. It can be omitted if the client_id and client_secret are configured to represent a specific flow from the IDV. |            |          | No       |
| verified_claims     | Container for the verification and claims sub-attributes                                       |            |          |          |
| claims              | Container for parameters that identify a user.                                                 |            |          |          |
| verification        | Container for the parameters that are used to verify the associated claims. Okta uses the trust_framework and assurance_level parameters. Okta sets the trust_framework value to IDV-DELEGATED and the assurance_level value to VERIFIED. This configuration indicates that Okta delegates the assurance policy to the IDV. |            |          |          |

Supported trust frameworks could include those listed by OpenID Connect 4 Identity Assurance under the eKYC-IDA Identifiers and ISO/IEC.

A successful request generates a request_uri in the response. The request_uri encodes the identity verification attributes so that they can be securely transmitted. 

#### GET /oauth2/authorize request to IDV

After the response from the POST request is processed Okta uses the request_uri to redirect the user to the IDV’s OAuth2 authorization endpoint. 

> Note: For IDVs, Okta recommends renaming the authorization endpoint so its clear the endpoint is used for identity verification. For example, rename the endpoint to /oauth2/idv-authorize.

The GET /oauth2/authorize request delivers the request_uri that the IDV evaluates so that the IDV flow can start. 

See the following request example:
GET /oauth2/idv-authorize?request_uri=urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c HTTP/1.1

Host: idv-vendor.com

The user then completes the IDV flow by submitting some proof of identity. After they complete the IDV flow, the IDV redirects the user to the redirect_uri specified in the POST /oauth2/par request. The redirect_uri also contains an authorization_code that’s redeemed at the /oauth2/token endpoint to retrieve the IDV flow results. 

#### POST /token request to IDV

After the user is redirected to the redirect_uri with an authorization_code in the response, Okta creates a POST /token request. The request contains a code_verifier value that’s compared against the code_challenge provided in the /oauth2/par request. 

See the following request example:

> Note: To improve readability, the following example values aren’t URL encoded.

POST /token HTTP/1.1

Host: idv-vendor.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id={{client_id}}
&client_secret={{client_secret}}
&code=42bbe6319f0b04a43d
&code_verifier=72e0dca42dd87b345f0652899cba4f92e7b9bb2422f7c5a301ffae41
&redirect_uri=https://org.okta.com/idp/identity-verification/callback
 
The IDV sends an id_token back to Okta in response. The id_token includes the verified_claims object. The values returned in this object determine the outcome of the initial policy evaluation for the user. 

See the following response example:
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

> Note: If an IDV doesn’t return the claims values, they can instead return a MATCHED value for any claims attributes. <How can they substitute the value?>

#### Okta completes the policy evaluation

After the id_token is returned in the response from the POST /token request, Okta can complete the policy evaluation. 

Okta inspects verified_claims object. The policy evaluation is successful if the trust_framework and assurance_level values match the values that were passed in the POST /oauth2/par request. If either of the trust_framework or assurance_level attributes aren’t included in the POST /token response or if the values are null or unexpected, then the assurance_level is marked as FAILED. 
