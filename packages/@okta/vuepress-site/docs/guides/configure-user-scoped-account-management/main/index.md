---
title: Configure user-scoped account management
meta:
  - name: description
    content: The MyAccount API now provides user-scoped endpoints that don’t require admin tokens. End users only need a bearer token to update their email and phone authenticators.
layout: Guides
sections:
- main
---

<ApiLifecycle access="ie" /><br>

This guide explains how to set up end-user driven account management in your org using the MyAccount API.

> **Note:** This guide is for the enhanced MyAccount API, accessible at `/idp/myaccount`. The `/api/v1/myaccount` endpoint is deprecated. See [MyAccount API (deprecated)](/docs/reference/api/archive-myaccount/) for the docs of the older API version.

> **Note:** This guide is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

<!-- > **Note:** This guide covers a narrow set of use cases that call the MyAccount API. Most use cases are covered by the SDKs. See -->

---
**Learning outcomes**

* Set up your org with the required scopes to call the MyAccount API.
* Allow your end users to call the API to update their profile and enroll another authenticator after they first sign in.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Access to the latest version of the MyAccount API: `/idp/myaccount`
* An existing OpenID Connect client app in Okta for testing in Okta
* [Postman client](https://www.getpostman.com/downloads/) to test requests. See [Get Started with the Okta APIs](https://developer.okta.com/code/rest/) for information on setting up Postman.
* The MyAccount API Postman collection that allows you to test the API calls that are described in this guide. Click **Run in Postman** to add the collection to your Postman workspace.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9cb68745dbf85ae3a871)

> **Note:** To run the Postman collection, you need an end-user access token. Use an [SDK](/docs/guides/auth-js/main/#handle-responses) to get the token.

---

## About user-scoped account management

The MyAccount API now provides user-scoped endpoints that don’t require admin tokens. End users only need a bearer token to update their profile, or email and phone authenticators. In addition, app developers can call the MyAccount API for active users outside of the authentication context. For example, after a user enrolls in the mandatory email factor and completes authentication, app developers can call the API to enroll the active user with the optional phone authenticator.

## About the Postman collection

It is up to you how you set up users to call the MyAccount API to manage their account. In this guide, we provide sample API calls using a Postman collection to demonstrate them in a language/platform neutral way.

> **Note:** To run the Postman collection, you need an end-user access token. Use an [SDK](/docs/guides/auth-js/-/main/) to get the token.

## API versioning

A valid API version in the `Accept` header is required to access the API. Current version: V1.0.0

```bash
Accept: application/json; okta-version=1.0.0
```

## Access Token assurance

MyAccount operations that create, update, or delete resources require access tokens that are 15 minutes old or younger. API calls with access tokens older than 15 minutes require re-authentication. If you don't re-authenticate the token, the API returns a 403 error with the following content in the header:

```bash
www-authenticate: Bearer realm="IdpMyAccountAPI", error="insufficient_authentication_context", error_description="The access token requires additional assurance to access the resource", max_age=900
```

## Grant the required scopes

> **Note:** If you have a custom Authorization Server, the MyAccount API-related scopes are granted by default. See [Create an Authorization Server](/docs/guides/customize-authz-server/-/main/).

When you are ready to grant the required scopes, follow these steps:

1. Sign in to your Okta organization with your administrator account and go to **Applications** > **Applications**.
1. Open your OpenID Connect client app.
1. On the **Okta API Scopes** tab, grant the following scopes:
   * For access to both GET and POST/DELETE endpoints:
      * `okta.myAccount.email.manage`
      * `okta.myAccount.phone.manage`
      * `okta.myAccount.profile.manage`
   * For access to GET endpoints only:
      * `okta.myAccount.email.read`
      * `okta.myAccount.phone.read`
      * `okta.myAccount.profile.read`


## Add a secondary email

<ApiOperation method="post" url="/idp/myaccount/emails" />

In this use case, the end user adds a `SECONDARY` email address to their account. The new email address is in UNVERIFIED status.

### Required scope and role

An Okta scope of `okta.myAccount.email.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make a POST request to the `/idp/myaccount/emails` endpoint.

### Request path parameters

N/A

### Request query parameters

N/A

### Request body

This API requires a [My Email Request object](#my-email-request-object) as its request body.

```bash
{
  "profile": {
      "email" : "some.secondary.email@okta.com"
  },
   "role": "SECONDARY",
   "sendEmail": true
}
```

#### Response body

The requested [My Email object](#my-email-object)

#### Error Responses

If an invalid email is passed to `profile` in the request body, the response returns a 400 BAD REQUEST with error code E0000001.

If the email operation isn't enabled for the request `role` in the org, the response returns a 403 FORBIDDEN with error code E0000038.

If the email already exists for the current user, the response returns a 409 CONFLICT with error code E0000157.

#### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${BEARER_TOKEN}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/emails"
```

#### Response

```json
{
    "id": "5a8de6071e1b94e0f4ec664b9e4869e8",
    "status": "UNVERIFIED",
    "profile": {
        "email": "secondary.email@okta.com"
    },
    "roles": [
        "SECONDARY"
    ],
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/emails/5a8de6071e1b94e0f4ec664b9e4869e8/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Add a phone

<ApiOperation method="post" url="/idp/myaccount/phones" />

Creates an UNVERIFIED status phone for either the `SMS` or `CALL` method to the user's MyAccount setting.

### Required scope and role

An Okta scope of `okta.myAccount.phone.manage` is required to use this endpoint.

> **Note:** Admin users aren't allowed to make a POST request to the `/idp/myaccount/phones` endpoint.

#### Request path parameters

N/A

#### Request body

This API requires a [My Phone Request object](#my-phone-request-object) as its request body.

```bash
{
  "profile": {
      "phoneNumber" : "+15555555555"
  },
   "sendCode": true,
   "method": "SMS"
}
```

### Response body

The requested [My Phone object](#my-phone-object)

### Error Responses

If an invalid phone number is passed to `profile` in the request body, the response returns a 400 BAD REQUEST with error code E0000001.

If an invalid `method` is passed in the request body, the response returns a 400 BAD REQUEST with error code E0000001.

If the phone authenticator isn't enabled for `method` in the org, the response returns a 403 FORBIDDEN with error code E0000038.

If the number of phone factors for the current user already reaches the maximum allowed per user or the phone factor is failed to create, the response returns a 400 BAD REQUEST ERROR with error code E0000001.

If the phone number already exists for the current user, the response returns a 409 CONFLICT with error code E0000157.

If the call providers fail to send a challenge when `sendCode` is `true`,  the response returns a 500 with error code E0000138.

### Request

```bash
curl -v -X POST \
-H "Authorization: Bearer ${token}" \
-H "Accept: application/json; okta-version=1.0.0" \
"https://${yourOktaDomain}/idp/myaccount/phones"
```

### Response

Returns an HTTP 201 status code response, with a location URL referring to the newly created phone in the response header.

```json
{
    "id": "sms1bueyI0w0HHwro0g4",
    "status": "UNVERIFIED",
    "profile": {
        "phoneNumber": "+15555555555"
    },
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "challenge": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "verify": {
            "href": "https://${yourOktaDomain}/idp/myaccount/phones/sms1bueyI0w0HHwro0g4/challenge",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## See also

* [MyAccount API](/docs/reference/api/myaccount/) reference documentation
