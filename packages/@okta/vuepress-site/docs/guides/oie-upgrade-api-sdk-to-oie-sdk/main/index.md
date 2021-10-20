---
title: Upgrade your application to the Okta Identity Engine SDK
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

After your project is updated to the latest Okta Identity Engine SDKs, and you have an enabled Identity Engine org, you can begin the incremental process of migrating your application to use the Identity Engine SDK methods.

Review the following sections to understand the concepts behind the Okta Identity Engine SDK, and the differences between the Okta Classic Engine Authentication SDK and APIs and the Identity Engine approach to authentication. The mappings of Classic Engine Authentication SDK method calls, as well as back-end APIs, to the Okta Identity Engine SDK methods are provided for the following use cases:

- Basic sign-in authentication
- Multifactor sign-in authentication
- Password recovery
- Basic sign out

## Prerequisites

Before updating your applications to use the Okta Identity Engine SDK, ensure that you have completed the following tasks:

- Links to other docs like org migration
- Links to other docs like use interaction code grant
- Links to other docs like update your SDK

## Why upgrade your application to the Okta Identity Engine SDK

<StackSelector snippet="upgrade" noSelector />

## Okta Classic Engine Authn APIs and SDK vs Okta Identity Engine SDK

<StackSelector snippet="classicvsoie" noSelector />

## Mapping Authentication code to the Okta Identity Engine SDK

The following sections highlight the Okta Classic Engine Authn SDK method calls and back-end Authn APIs that require migration to the Okta Identity Engine SDK, which can perform authentication using the Identity Engine’s new features and workflows.

<StackSelector snippet="auth" noSelector />

### Mapping Authn APs to Okta Identity Engine SDK

If your application uses direct APIs for an authentication flow, your application code may call the following Okta APIs:

- `/api/v1/authn` to begin the primary authentication, which validates the password credentials and evaluates org policies
- If successful, call the `/api/v1/sessions` API with a sessionToken returned from the first call to create a new session

See the following sample calls and responses for this basic authentication flow:

#### 1. Call /api/v1/auth

```cURL
curl --location --request POST 'https://${yourOktaDomain}/api/v1/authn' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "john.doe@example.com",
  "password": "password123",
  "options": {
    "multiOptionalFactorEnroll": false,
    "warnBeforePasswordExpired": false
  }
}'

```

#### 2. Receive a successful response with a sessionToken

```JSON
{
    "expiresAt": "2021-10-07T18:19:36.000Z",
    "status": "SUCCESS",
    "sessionToken": "20111KWCKiTgnNgeaFjw760VitvCy7y-9cYl8lvN65754GmBuo_PPE6",
    "_embedded": {
        "user": {
            "id": "00u8eyowx5GiJhqvj1d6",
            "passwordChanged": "2020-12-21T19:39:06.000Z",
            "profile": {
                "login": "john.doe@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "locale": "en_US",
                "timeZone": "America/Los_Angeles"
            }
        }
    },
    "_links": {
        "cancel": {
            "href": "https://{yourOktaDomain}/api/v1/authn/cancel",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

#### 3 Use sessionToken from the response to call api/v1/sessions and create a session:

```cURL
curl --location --request POST 'https://duffield.oktapreview.com/api/v1/sessions' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS 00igKrTNyNLHCw0wYSIsoDF28cN4B3KZPETBz9pqz0' \
--header 'Cookie: JSESSIONID=16DC4838820F919032FC7BF01A8FE3E8' \
--data-raw '{
  "sessionToken": "20111MzxECyRs8sqQ8WG93-ftVtXQ_uBUbOqVt7RYbNFsZBAs1mw-Vl"
}'
```

#### 4 Receive a successful authentication response from the call

```JSON
{
    "id": "102XV1tNvxsTm69-StW_BCU-Q",
    "userId": "00u8eyowx5GiJhqvj1d6",
    "login": "john.doe@example.com",
    "createdAt": "2021-10-07T18:22:07.000Z",
    "expiresAt": "2021-10-07T20:22:07.000Z",
    "status": "ACTIVE",
    "lastPasswordVerification": "2021-10-07T18:22:07.000Z",
    "lastFactorVerification": null,
    "amr": [
        "pwd"
    ],
    "idp": {
        "id": "00o2di92cuwsnS0PS1d6",
        "type": "OKTA"
    },
    "mfaActive": true,
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/sessions/me",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "refresh": {
            "href": "https://${yourOktaDomain}/api/v1/sessions/me/lifecycle/refresh",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "user": {
            "name": "John Doe",
            "href": "https://{{yourOktaDomain}/api/v1/users/me",
            "hints":
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

If your application code implements these API calls and handles the responses shown, you need to update your code to use the Okta Identity Engine SDK idx.authentication method. This method encapsulates the authentication flow using recursive calls to the Identity Engine SDK method, and a successful response returns with access and ID tokens.

See [Okta Identity Engine SDK authentication flow]()

If you’re migrating a custom application using direct back-end Authentication APIs, you may want to work with your customer support team to assist you in migrating to the Identity Engine SDK.

## Mapping MFA Authentication code to the Okta Identity Engine SDK

The following sections highlight the Classic Engine Authn SDK method calls and back-end Authn APIs that require migration to the Okta Identity Engine SDK, which can perform multifactor authentication using the Identity Engine’s new features and workflows.

<StackSelector snippet="mfaauth" noSelector />

### Mapping MFA Authn APIs to Okta Identity Engine SDK

If your application uses direct APIs for a multifactor authentication flow, your application code may call the following Okta APIs:

- `/api/v1/authn` to begin the MFA authentication, with the password credentials, which sets the transaction state to MFA_REQUIRED
- `/api/authn/factors/(($emailFactorId}}/verify` to send the user an email with a sign-in code
- `/api/authn/factors/(($emailFactorId}}/verify` again with the sign-in code from the email challenge

>**Note:** If you call the direct `/api/v1/policies` API to manage or update MFA enrollment policies, you need to update these calls to use the Identity Engine policies. See App sign-on policy and Profile enrollment policy.

... coming (fix links in note above)

## Mapping Password Recovery code to the Okta Identity Engine SDK

The following sections highlight the Authn SDK method calls and back-end Authn APIs that require migration to the Okta Identity Engine SDK, which can perform a password reset using the Identity Engine’s new features and workflows.

<StackSelector snippet="pswrvy" noSelector />

### Mapping Password Recovery APIs to Okta Identity Engine

If your application uses direct APIs for a password recovery flow, your application code may call the following Okta APIs:

- `/api/v1/authn/recovery/password` to initiate the password recovery process and set the transaction state to RECOVERY_CHALLENGE
- `/api/v1/authn/recovery/token` to challenge the factor code
- `/api/v1/authn/credentials/reset_password` to reset the password if the challenge is successful

See the following sample calls and responses for the password recovery flow using SMS as a factor:

... more to come (include link in 1st bullet)

## Mapping Basic Sign out APIs to Okta Identity Engine SDK

<StackSelector snippet="signout" noSelector />