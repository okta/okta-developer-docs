---
title: SAML Assertion Inline Hook
excerpt: Customize SAML assertions returned by Okta.
---

# SAML Assertion Inline Hook

<ApiLifecycle access="ea" />

This page provides reference documentation for:

- JSON objects contained in the outbound request from Okta to your external service

- JSON objects you can include in your response

This information is specific to the SAML Assertion Inline Hook, one type of inline hook supported by Okta.

## See Also

For a general introduction to Okta inline hooks, see [Inline Hooks](/use_cases/inline_hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/api/resources/inline-hooks).

For steps to enable this inline hook, see below, [Enabling a SAML Assertion Inline Hook](#enabling-a-saml-assertion-inline-hook).

## About

This type of inline hook is triggered when Okta generates a SAML assertion in response to an authentication request. Before sending the SAML assertion to the service provider that will consume it, Okta calls out to your external service. Your external service can respond with commands to add attributes to the assertion or modify its existing attributes.

This functionality can be used to add data that is sensitive, calculated at runtime, or complexly-structured and not appropriate for storing in Okta user profiles. Data added this way is never logged or stored by Okta. As an example, SAML assertions generated for a medical app could be augmented with confidential patient data provided by your external service and not stored in Okta.

This inline hook works only when using custom SAML apps, not apps from the OIN.

## Objects in the Request from Okta

The outbound call from Okta to your external service will include the following objects in its JSON payload:

### data.assertion.subject

### data.assertion.authentication

### data.assertion.conditions

### data.assertion.claims

Provides a JSON representation of the existing `<saml:AttributeStatement>` element contained in the in the SAML assertion Okta has generated. The following table demonstrates how a SAML XML element is represented in a JSON object:

| SAML XML | JSON Object |

### data.assertion.lifetime


### data.context




## Objects in Response You Send

For the Token Inline hook, the `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

### commands

The `commands` object is where you can provide commands to Okta. It is where you can tell Okta to add additional claims to the token.

The `commands` object is an array, allowing you to send multiple commands. In each array element, there needs to be a `type` property and `value` property. The `type` property is where you specify which of the supported commands you wish to execute, and `value` is where you supply an operand for that command.

In the case of the Token hook type, the `value` property is itself a nested object, in which you specify a particular operation, a path to act on, and a value.

| Property | Description                                                              | Data Type       |
|----------|--------------------------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands).                    | String          |
| value    | Operand to pass to the command. It specifies a particular op to perform. | [value](#value) |

#### Supported Commands

The following commands are supported for the SAML Assertion Inline Hook type:

| Command                 | Description             |
|-------------------------|-------------------------|
| com.okta.assertion.patch | Modify a SAML assertion.     |

#### value

The `value` object is where you specify the specific operation to perform. It is an array, allowing you to request more than one operation.

| Property | Description                                                                                                                                                                                                       | Data Type       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| op       | The name of one of the [supported ops](#list-of-supported-ops).                                                                                                                                                   | String          |
| path     | Location, within the assertion, to apply the operation, specified as a slash-delimited path. When adding a claim, this will always begin with `/claims/`,  and be followed by the name of the new claim you are adding. | String          |
| value    | Value to set the claim to.                                                                                                                                                                                        | Any JSON object |

#### List of Supported Ops

| Op  | Description  |
|-----|--------------|
| add | Add a claim. |
| replace | Modify an existing attribute statement. |

### error

When you return an error object, it should have the following structure:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error. | String    |

Returning an error object will cause Okta to return an OAuth 2.0 error to the requester of the token, with the value of `error` set to `server_error`, and the value of `error_description` set to the string you supplied in the `errorSummary` property of the `error` object you returned.

## Sample Listing of JSON Payload of Request

```json
{
  "source": "https://{yourOktaDomain}/oauth2/default/v1/authorize",
  "eventId": "3OWo4oo-QQ-rBWfRyTmQYw",
  "eventTime": "2019-01-15T23:20:47.000Z",
  "eventTypeVersion": "1.0",
  "cloudEventVersion": "0.1",
  "contentType": "application/json",
  "eventType": "com.okta.oauth2.tokens.transform",
  "data": {
    "context": {
      "request": {
        "id": "reqv66CbCaCStGEFc8AdfS0ng",
        "method": "GET",
        "url": {
          "value": "https://{yourOktaDomain}/oauth2/default/v1/authorize?scope=openid+profile+email&response_type=token+id_token&redirect_uri=https%3A%2F%2Fhttpbin.org%2Fget&state=foobareere&nonce=asf&client_id=customClientIdNative"
        },
        "ipAddress": "127.0.0.1"
      },
      "protocol": {
        "type": "OAUTH2.0",
        "request": {
          "scope": "openid profile email",
          "state": "foobareere",
          "redirect_uri": "https://httpbin.org/get",
          "response_mode": "fragment",
          "response_type": "token id_token",
          "client_id": "customClientIdNative"
        },
        "issuer": {
          "uri": "https://{yourOktaDomain}/oauth2/default"
        },
        "client": {
          "id": "customClientIdNative",
          "name": "Native client",
          "type": "PUBLIC"
        }
      },
      "session": {
        "id": "102Qoe7t5PcRnSxr8j3I8I6pA",
        "userId": "00uq8tMo3zV0OfJON0g3",
        "login": "administrator1@clouditude.net",
        "createdAt": "2019-01-15T23:17:09.000Z",
        "expiresAt": "2019-01-16T01:20:46.000Z",
        "status": "ACTIVE",
        "lastPasswordVerification": "2019-01-15T23:17:09.000Z",
        "amr": [
          "PASSWORD"
        ],
        "idp": {
          "id": "00oq6kcVwvrDY2YsS0g3",
          "type": "OKTA"
        },
        "mfaActive": false
      },
      "user": {
        "id": "00uq8tMo3zV0OfJON0g3",
        "passwordChanged": "2018-09-11T23:19:12.000Z",
        "profile": {
          "login": "administrator1@clouditude.net",
          "firstName": "Add-Min",
          "lastName": "O'Cloudy Tud",
          "locale": "en",
          "timeZone": "America/Los_Angeles"
        },
        "_links": {
          "groups": {
            "href": "https://{yourOktaDomain}/00uq8tMo3zV0OfJON0g3/groups"
          },
          "factors": {
            "href": "https://{yourOktaDomain}/api/v1/users/00uq8tMo3zV0OfJON0g3/factors"
          }
        }
      },
      "policy": {
        "id": "00pq8lGaLlI8APuqY0g3",
        "rule": {
          "id": "0prq8mLKuKAmavOvq0g3"
        }
      }
    },
    "identity": {
      "claims": {
        "sub": "00uq8tMo3zV0OfJON0g3",
        "name": "Add-Min O'Cloudy Tud",
        "email": "webmaster@clouditude.net",
        "ver": 1,
        "iss": "https://{yourOktaDomain}/oauth2/default",
        "aud": "customClientIdNative",
        "jti": "ID.YxF2whJfB3Eu4ktG_7aClqtCgjDq6ab_hgpiV7-ZZn0",
        "amr": [
          "pwd"
        ],
        "idp": "00oq6kcVwvrDY2YsS0g3",
        "nonce": "asf",
        "preferred_username": "administrator1@clouditude.net",
        "auth_time": 1547594229
      },
      "token": {
        "lifetime": {
          "expiration": 3600
        }
      }
    },
    "access": {
      "claims": {
        "ver": 1,
        "jti": "AT.W-rrB-z-kkZQmHW0e6VS3Or--QfEN_YvoWJa46A7HAA",
        "iss": "https://{yourOktaDomain}/oauth2/default",
        "aud": "api://default",
        "cid": "customClientIdNative",
        "uid": "00uq8tMo3zV0OfJON0g3",
        "sub": "administrator1@clouditude.net",
        "firstName": "Add-Min",
        "preferred_username": "administrator1@clouditude.net"
      },
      "token": {
        "lifetime": {
          "expiration": 3600
        }
      },
      "scopes": {
        "openid": {
          "id": "scpq7bW1cp6dcvrz80g3",
          "action": "GRANT"
        },
        "profile": {
          "id": "scpq7cWJ81CIP5Qkr0g3",
          "action": "GRANT"
        },
        "email": {
          "id": "scpq7dxsoz6LQlRj00g3",
          "action": "GRANT"
        }
      }
    }
  }
}
```

## Sample Listing of JSON Payload of Response

```json
{
  "commands": [
    {
      "type": "com.okta.identity.patch",
      "value": [
        {
          "op": "add",
          "path": "/claims/extPatientId",
          "value": "1234"
        }
      ]
    },
    {
      "type": "com.okta.access.patch",
      "value": [
        {
          "op": "add",
          "path": "/claims/external_guid",
          "value": "F0384685-F87D-474B-848D-2058AC5655A7"
        }
      ]
    }
  ]
}
```
## Enabling a SAML Assertion Inline Hook

To activate the inline hook, you first need to register your external service endpoint with Okta using the [Inline Hooks Management API](/docs/api/resources/inline-hooks).

You then need to associate the registered inline hook with a Custom Authorization Server Policy Rule by completing the following steps in Admin Console:

1. Go to **Security > API Authorization Servers**.

1. Select the Custom Authorization Server to use this inline hook with.

1. One of the rules defined in the Custom Authorization server needs to be used to trigger invocation of the inline hook. Click the pencil icon for that rule to open it for editing.

1. In the **Advanced Settings** section, click the **Assertion Inline Hook** dropdown menu. Any inline hooks you have registered will be listed. Select the one to use.

1. Click **Update Rule**.

> Note: Only one inline hook can be associated with each rule.

