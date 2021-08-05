---
title: Sessions
category: management
---

# Sessions API

Okta uses a cookie-based authentication mechanism to maintain a user's authentication Session across web requests. The Okta Sessions API provides operations to create and manage authentication Sessions for users in your Okta organization.

>**Note:** Some browsers block third-party cookies by default, which disrupts Okta functionality in certain flows. See [FAQ: How Blocked Third Party Cookies Can Potentially Impact Your Okta Environment](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment).

>**Note:** The Sessions API doesn't support direct authentication. Direct authentication is supported through the [Authentication API](/docs/reference/api/authn/#authentication-operations) or through OIDC using the [Resource Owner Password flow](/docs/guides/implement-grant-type/ropassword/main/).

### Session cookie

Okta uses an HTTP session cookie to provide access to your Okta organization and applications across web requests for an interactive user agent such as a web browser. A session cookie has an expiration configurable by an administrator for the organization and is valid until the cookie expires or the user closes the Session (logout) or browser application.

### Session token

A [session token](/docs/reference/api/authn/#session-token) is a one-time bearer token that provides proof of authentication and may be redeemed for an interactive SSO session in Okta in a user agent. Session tokens can only be used **once** to establish a Session for a user and are revoked when the token expires.

Okta provides a very rich [Authentication API](/docs/reference/api/authn/) to validate a [user's primary credentials](/docs/reference/api/authn/#primary-authentication) and secondary [MFA factor](/docs/reference/api/authn/#verify-factor). A session token is returned after successful authentication, which can be later exchanged for a session cookie that uses one of the following flows:

- [Retrieving a session cookie by visiting the OpenID Connect Authorization Endpoint](/docs/guides/session-cookie/#retrieving-a-session-cookie-via-openid-connect-authorization-endpoint)
- [Retrieving a session cookie by visiting a session redirect link](/docs/guides/session-cookie/#retrieving-a-session-cookie-by-visiting-a-session-redirect-link)
- [Retrieving a session cookie by visiting an application embed link](/docs/guides/session-cookie/#retrieving-a-session-cookie-by-visiting-an-application-embed-link)

>**Note:** **Session tokens** are secrets and should be protected at rest and during transit. A session token for a user is equivalent to having the user's actual credentials.

## Get started

Explore the Sessions API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ff723148292df05bb58b)

## Session operations

### Create Session with a session token

<ApiOperation method="post" url="/api/v1/sessions" />

Creates a new Session for a user with a valid session token. Use this API if, for example, you want to set the session cookie yourself instead of allowing Okta to set it, or you want to hold the Session ID to delete a Session through the API instead of visiting the logout URL.

Don't use this API unless you need a Session `id`. Instead, use one of the following flows to obtain a SSO session with a `sessionToken`:

- [Retrieving a session cookie by visiting the OpenID Connect Authorization Endpoint](/docs/guides/session-cookie/#retrieving-a-session-cookie-via-openid-connect-authorization-endpoint)
- [Retrieving a session cookie by visiting a session redirect link](/docs/guides/session-cookie/#retrieving-a-session-cookie-by-visiting-a-session-redirect-link)
- [Retrieving a session cookie by visiting an application embed link](/docs/guides/session-cookie/#retrieving-a-session-cookie-by-visiting-an-application-embed-link)

>**Note:** This operation can be performed anonymously without an API token.

##### Request parameters

| Parameter        | Description                                                   | Param Type | DataType                        | Required | Default |
| ---------------- | ------------------------------------------------------------- | ---------- | ------------------------------- | -------- | ------- |
| additionalFields | Optional [Session properties](#optional-session-properties)   | Query      | String (comma-separated values) | FALSE    |         |
| sessionToken     | The session token obtained through the [Authentication API](/docs/reference/api/authn/)        | Body       | String                          | TRUE     |         |

##### Response parameters

The response contains the new [Session](#session-object) for the user if the `sessionToken` is valid.

If an invalid `sessionToken` is provided, a `401 Unauthorized` status code is returned.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "sessionToken": "00HiohZYpJgMSHwmL9TQy7RRzuY-q9soKp1SPmYYow"
}' "https://${yourOktaDomain}/api/v1/sessions"
```

##### Response example

``` json
{
  "id": "101W_juydrDRByB7fUdRyE2JQ",
  "login": "user@example.com",
  "userId": "00ubgaSARVOQDIOXMORI",
  "expiresAt": "2015-08-30T18:41:35.818Z",
  "status": "ACTIVE",
  "lastPasswordVerification": "2015-08-30T18:41:35.818Z",
  "lastFactorVerification": null,
  "amr": [
    "pwd"
  ],
  "idp": {
    "id": "00oi5cpnylv792IcF0g3",
    "type": "OKTA"
  },
  "mfaActive": false,
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "refresh": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ/lifecycle/refresh",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "user": {
      "name": "Isaac Brock",
      "href": "https://${yourOktaDomain}/api/v1/users/00uit00ZK6ELuzPoD0g3",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Get Session

<ApiOperation method="get" url="/api/v1/sessions/${sessionId}" />

Gets Session information for a given Session ID

>**Note:** This is an administrator operation and requires an API token.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ"
```

##### Response example

If the Session is valid, a [Session object](#session-object) is returned.

If the Session is invalid, a `404 Not Found` response is returned.

``` json
{
  "id": "101W_juydrDRByB7fUdRyE2JQ",
  "login": "user@example.com",
  "userId": "00u0abcdefGHIJKLMNOP",
  "status": "ACTIVE",
  "expiresAt": "2016-01-03T09:13:17.000Z",
  "lastPasswordVerification": "2016-01-03T07:02:00.000Z",
  "lastFactorVerification": null,
  "amr": [
    "pwd"
  ],
  "idp": {
    "id": "01a2bcdef3GHIJKLMNOP",
    "type": "OKTA"
  },
  "mfaActive": true,
  "_links": {
    "refresh": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ/lifecycle/refresh",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ",
      "hints": {
        "allow": [
           "GET",
           "DELETE"
        ]
      }
    },
    "user": {
      "name": "Isaac Brock",
      "href": "https://${yourOktaDomain}/api/v1/users/00uit00ZK6ELuzPoD0g3",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Extend Session

<ApiOperation method="put" url="/api/v1/sessions/${sessionId}" /> <ApiLifecycle access="deprecated" />

Extends the lifetime of a user's Session

>**Note:** This endpoint is deprecated. Use the [Refresh Session](#refresh-session) API instead.

>**Note:** This is an administrator operation and requires an API token.

##### Request parameters

| Parameter | Description                            | Param Type | DataType | Required | Default |
| --------- | -------------------------------------- | ---------- | -------- | -------- | ------- |
| id        | `id` of a valid Session                | URL        | String   | TRUE     |         |

##### Response parameters

The response contains the extended [Session](#session-object) with an updated `expiresAt` timestamp for the user if the `id` is valid.

If the Session is invalid, a `404 Not Found` response is returned.

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ"
```

##### Response example

``` json
{
  "id": "101W_juydrDRByB7fUdRyE2JQ",
  "login": "user@example.com",
  "userId": "00ubgaSARVOQDIOXMORI",
  "expiresAt": "2015-08-30T18:41:35.818Z",
  "status": "ACTIVE",
  "lastPasswordVerification": "2015-08-30T18:41:35.818Z",
  "lastFactorVerification": null,
  "amr": [
    "pwd"
  ],
  "idp": {
    "id": "00oi5cpnylv792IcF0g3",
    "type": "OKTA"
  },
  "mfaActive": false,
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "refresh": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ/lifecycle/refresh",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "user": {
      "name": "Isaac Brock",
      "href": "https://${yourOktaDomain}/api/v1/users/00uit00ZK6ELuzPoD0g3",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Refresh Session

Refreshes an existing Session using the `id` for that Session. (This is equivalent to the deprecated [Extend Session](#extend-session) operation).

>**Note:** This is an administrator operation and requires an API token.

<ApiOperation method="post" url="/api/v1/sessions/${sessionId}/lifecycle/refresh" />

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required | Default |
| --------- | ----------------------- | ---------- | -------- | -------- | ------- |
| id        | `id` of a valid Session | URL        | String   | TRUE     |         |

##### Response parameters

The response contains the refreshed [Session](#session-object) with an updated `expiresAt` timestamp for the user if the `id` is valid.

If the Session is invalid, a `404 Not Found` response is returned.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ/lifecycle/refresh"
```

##### Response example

``` json
{
  "id": "101W_juydrDRByB7fUdRyE2JQ",
  "login": "user@example.com",
  "userId": "00ubgaSARVOQDIOXMORI",
  "expiresAt": "2015-08-30T18:41:35.818Z",
  "status": "ACTIVE",
  "lastPasswordVerification": "2015-08-30T18:41:35.818Z",
  "lastFactorVerification": null,
  "amr": [
    "pwd"
  ],
  "idp": {
    "id": "00oi5cpnylv792IcF0g3",
    "type": "OKTA"
  },
  "mfaActive": false,
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "refresh": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ/lifecycle/refresh",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "user": {
      "name": "Isaac Brock",
      "href": "https://${yourOktaDomain}/api/v1/users/00uit00ZK6ELuzPoD0g3",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Close Session

<ApiOperation method="delete" url="/api/v1/sessions/${sessionId}" />

Closes a user's Session (logout)

>**Note:** This is an administrator operation and requires an API token.

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required | Default |
| --------- | ----------------------- | ---------- | -------- | -------- | ------- |
| id        | `id` of a valid Session | URL        | String   | TRUE     |         |

##### Response parameters

If the Session is successfully closed, a `204 No Content` response is returned.

If the Session is invalid, a `404 Not Found` response is returned.

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ"
```

##### Response example

``` http
HTTP/1.1 204 No Content
```

### Get current Session

<ApiOperation method="get" url="/api/v1/sessions/me" /> <SupportsCors />

Gets Session information for the current user. Use this method in a browser-based application to determine if the user is signed in.

>**Note:** This operation requires a session cookie for the user. An API token isn't allowed for this operation.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Cookie: ${okta_session_cookie}" \
"https://${yourOktaDomain}/api/v1/sessions/me"
```

##### Response example

If the Session is valid, a [Session object](#session-object) is returned.

If the Session is invalid, a `404 Not Found` response is returned.

``` json
{
    "id": "101W_juydrDRByB7fUdRyE2JQ",
    "login": "user@example.com",
    "userId": "00u0abcdefGHIJKLMNOP",
    "status": "ACTIVE",
    "createdAt": "2016-01-03T07:02:00.000Z",
    "expiresAt": "2016-01-03T09:13:17.000Z",
    "lastPasswordVerification": "2016-01-03T07:02:00.000Z",
    "lastFactorVerification": null,
    "amr": [
        "pwd"
    ],
    "idp": {
        "id": "01a2bcdef3GHIJKLMNOP",
        "type": "OKTA"
    },
    "mfaActive": true,
    "_links": {
        "refresh": {
            "href": "https://${yourOktaDomain}/api/v1/sessions/me/lifecycle/refresh",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/sessions/me",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "name": "Isaac Brock",
            "href": "https://${yourOktaDomain}/api/v1/users/me",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### Refresh current Session

Refreshes the Session for the current user

>**Note:** This operation requires a session cookie for the user. An API token isn't allowed for this operation.

<ApiOperation method="post" url="/api/v1/sessions/me/lifecycle/refresh" /> <SupportsCors />

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Cookie: ${okta_session_cookie}" \
"https://${yourOktaDomain}/api/v1/sessions/me/lifecycle/refresh"
```

##### Response example

If the Session is valid, a [Session object](#session-object) is returned.

If the Session is invalid, a `404 Not Found` response is returned.

``` json
{
    "id": "101W_juydrDRByB7fUdRyE2JQ",
    "login": "user@example.com",
    "userId": "00u0abcdefGHIJKLMNOP",
    "status": "ACTIVE",
    "createdAt": "2016-01-03T07:02:00.000Z",
    "expiresAt": "2016-01-03T09:13:17.000Z",
    "lastPasswordVerification": "2016-01-03T07:02:00.000Z",
    "lastFactorVerification": null,
    "amr": [
        "pwd"
    ],
    "idp": {
        "id": "01a2bcdef3GHIJKLMNOP",
        "type": "OKTA"
    },
    "mfaActive": true,
    "_links": {
        "refresh": {
            "href": "https://${yourOktaDomain}/api/v1/sessions/me/lifecycle/refresh",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/sessions/me",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "name": "Isaac Brock",
            "href": "https://${yourOktaDomain}/api/v1/users/me",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

#### Option: Use the HTTP Header Prefer
Okta now supports [the HTTP Header `Prefer`](https://tools.ietf.org/html/rfc7240#section-4.2) in the [Sessions API for refreshing Sessions](/docs/reference/api/sessions/#refresh-current-session). You can extend the Session lifetime, but skip any processing work that is related to building the response body.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Prefer: return=minimal" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/sessions/me/refresh"
```
>**Note:** `me` can also be an ID.

##### Response example

```http
HTTP/1.1 204 No Content
Preference-Applied: return=minimal
```

### Close current Session

Closes the Session for the user who is currently signed in. Use this method in a browser-based application to sign out a user.

>**Note:** This operation requires a session cookie for the user. An API token isn't allowed for this operation.

<ApiOperation method="delete" url="/api/v1/sessions/me" /> <SupportsCors />

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Cookie: ${okta_session_cookie}" \
"https://${yourOktaDomain}/api/v1/sessions/me"
```

##### Response example

If the Session is successfully closed, a `204 No Content` response is returned.

If the Session is invalid, a `404 Not Found` response is returned.

``` http
HTTP/1.1 204 No Content
```

## Session object

### Example

``` json
{
  "id": "101W_juydrDRByB7fUdRyE2JQ",
  "login": "user@example.com",
  "userId": "00ubgaSARVOQDIOXMORI",
  "expiresAt": "2015-08-30T18:41:35.818Z",
  "status": "ACTIVE",
  "lastPasswordVerification": "2015-08-30T18:41:35.818Z",
  "lastFactorVerification": "2015-08-30T18:41:35.818Z",
  "amr": [
    "pwd",
    "otp",
    "mfa"
  ],
  "idp": {
    "id": "00oi5cpnylv792IcF0g3",
    "type": "OKTA"
  },
  "mfaActive": true,
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "refresh": {
      "href": "https://${yourOktaDomain}/api/v1/sessions/101W_juydrDRByB7fUdRyE2JQ/lifecycle/refresh",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "user": {
      "name": "Isaac Brock",
      "href": "https://${yourOktaDomain}/api/v1/users/00uit00ZK6ELuzPoD0g3",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
```

### Session properties

Sessions have the following properties:

| Property                                  | Description                                                                                   | DataType                                  | Nullable | Unique | Readonly |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------- | -------- | ------ | -------- |
| id                                        | A unique key for the Session                                                                    | String                                    | FALSE    | TRUE   | TRUE     |
| login                                     | A unique identifier for the user (username)                                                     | String                                    | FALSE    | TRUE   | TRUE     |
| userId                                    | A unique key for the [user](/docs/reference/api/users/#get-user-with-id)                                             | String                                    | FALSE    | TRUE   | TRUE     |
| expiresAt                                 | A timestamp when the Session expires                                                                | Date                                      | FALSE    | TRUE   | TRUE     |
| status                                    | Current [status](#session-status) of the Session                                              | `ACTIVE`, `MFA_REQUIRED`, or `MFA_ENROLL` | FALSE    | TRUE   | TRUE     |
| lastPasswordVerification                  | A timestamp when the user last performs the primary or step-up authentication with a password            | Date                                      | TRUE     | TRUE   | TRUE     |
| lastFactorVerification                    | A timestamp when user last performs multifactor authentication                                | Date                                      | TRUE     | TRUE   | TRUE     |
| amr                                       | Authentication method reference                                                               | [AMR object](#amr-object)                 | FALSE    | FALSE  | TRUE     |
| idp                                       | The Identity Provider that is used to authenticate the user                                               | [IDP object](#idp-object)                 | FALSE    | FALSE  | TRUE     |
| mfaActive                                 | Indicates whether the user has [enrolled an MFA factor](/docs/reference/api/factors/#list-enrolled-factors)        | Boolean                                   | FALSE    | FALSE  | TRUE     |

>**Note:** The `mfaActive` parameter is a <ApiLifecycle access="deprecated" /> feature. Use the `lastFactorVerification` attribute in conjunction with `amr` to understand if the user has performed MFA for the current Session. Use the [Factors API](/docs/reference/api/factors/#list-enrolled-factors) to query the factor enrollment status for a given user.

#### Optional Session properties

The [Create Session](#create-session-with-session-token) operation can optionally return the following properties when requested.

| Property                                      | Description                                                                                                                                                                       |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cookieToken                                   | Another one-time token that is used to obtain a session cookie by visiting either an application's embed link or a Session redirect URL.                                     |
| cookieTokenUrl                                | The URL for a transparent 1x1 pixel image that contains a one-time session token that, when visited, sets the session cookie in your browser for your organization.                 |

>**Note:** The `cookieToken` is a <ApiLifecycle access="deprecated" /> property. Instead, use the [Authentication API](/docs/reference/api/authn/) that supports the full user authentication pipeline and produces a `sessionToken` that you can use in this API.

>**Note:** The `cookieTokenUrl` is a <ApiLifecycle access="deprecated" /> property, because modern browsers block cookies that are set through embedding images from another origin (cross-domain).

### Session status

The following values are defined for the status of a Session:

- `ACTIVE`: The Session is established and fully validated.
- `MFA_REQUIRED`: The Session is established, but requires second factor verification.
- `MFA_ENROLL`: The Session is established, but the user needs to enroll in a second factor.

### AMR object

The [authentication methods reference](https://tools.ietf.org/html/draft-ietf-oauth-amr-values-01) ("AMR") specifies which authentication methods are used to establish the Session. The value is a JSON array with one or more of the following values:

| Value    | Description                                            | Example                                                                                                |
| -------- | ------------------------------------------------------ | -------------------------------------------------------------------------                              |
| `pwd`    | Password authentication                                | Standard password-based login                                                                          |
| `swk`    | Proof-of-possession (PoP) of a software key            | Okta Verify with Push                                                                                  |
| `hwk`    | Proof-of-possession (PoP) of a hardware key            | Yubikey factor                                                                                         |
| `otp`    | One-time password                                      | Okta Verify, Google Authenticator                                                                      |
| `sms`    | SMS text message to the user at a registered number    | SMS factor                                                                                             |
| `tel`    | Telephone call to the user at a registered number      | Phone call factor                                                                                      |
| `geo`    | Use of geo-location information                        | IP Trust and Network Zone policy conditions                                                            |
| `fpt`    | Fingerprint biometric authentication                   | Okta Verify with Touch ID                                                                              |
| `kba`    | Knowledge-based authentication                         | Security Question factor                                                                               |
| `mfa`    | Multiple-factor authentication                         | This value is present whenever any MFA factor verification is performed.                               |
| `mca`    | Multiple-channel authentication                        | Authentication requires communication over more than one channel, such as Internet and mobile network. |
| `sc`    | Smart card authentication                                | User authenticated using a smart card, such as a Personal Identity Verification (PIV) card or Common Access Card (CAC)                                                                          |

### IDP object

Specifies the Identity Provider that is used to authenticate the user

| Property     | DataType                                                      | Nullable  | Unique  | Readonly | MinLength | MaxLength | Validation |
| ------------ | ------------------------------------------------------------- | --------- | ------- | -------- | --------- | --------- | ---------- |
| id           | String                                                        | FALSE     | FALSE   | TRUE     |           |           |            |
| type         | `OKTA`, `ACTIVE_DIRECTORY`, `LDAP`, `FEDERATION`, or `SOCIAL` | FALSE     | FALSE   | TRUE     |           |           |            |

>**Note:** The `id` is the org ID if the type is `OKTA`. Otherwise, it is the IDP instance ID.

```json
{
  "idp": {
    "id": "0oabhnUQFYHMBNVSVXMV",
    "type": "ACTIVE_DIRECTORY"
  }
}
```
