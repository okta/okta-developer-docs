---
title: Token Inline Hook
excerpt: Customize tokens returned by the Okta API Access Management process flow.
---

# Token Inline Hook

<ApiLifecycle access="ea" />

This page provides reference documentation for:

- JSON objects that are contained in the outbound request from Okta to your external service

- JSON objects that you can include in your response

This information is specific to the Token Inline Hook, one type of inline hook supported by Okta.

## See Also

For a general introduction to Okta inline hooks, see [Inline Hooks](/use_cases/inline_hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/api/resources/inline-hooks).

For steps to enable this inline hook, see below, [Enabling a Token Inline Hook](#enabling-a-token-inline-hook).

## About

This type of inline hook is triggered when OAuth 2.0 and OpenID Connect (OIDC) tokens are minted by your Okta Custom Authorization Server. Before sending the token to the requester, Okta calls out to your external service, and your service can respond with commands to add custom claims to the token.

This functionality can be used to add data that is sensitive, calculated at runtime, or complexly-structured and not appropriate for storing in Okta user profiles. Data added this way is never logged or stored by Okta. As an example, tokens minted for a medical app could be augmented with confidential patient data provided by your external service and not stored in Okta.

In addition to adding custom claims, you can modify or remove an existing custom claim or an OIDC standard profile claim. You can also update how long an access token or an ID token is valid.

This inline hook works only when using an Okta Custom Authorization Server, not the built-in Okta Authorization Server.

## Objects in the Request from Okta

For the Token Inline Hook, the outbound call from Okta to your external service includes the following objects in its JSON payload:

### data.identity

Provides information on the properties of the ID token that Okta has generated, including the existing claims that it contains.

| Property | Description                   | Data Type                    |
|----------|-------------------------------|------------------------------|
| claims   | Claims included in the token. | [claims](#claims) object     |
| lifetime | Lifetime of the token.        | [lifetime](#lifetime) object |

### data.access

Provides information on the properties of the access token that Okta has generated, including the existing claims that it contains.

| Property | Description                        | Data Type                    |
|----------|------------------------------------|------------------------------|
| claims   | Claims included in the token.      | [claims](#claims) object     |
| lifetime | Lifetime of the token.             | [lifetime](#lifetime) object |
| scopes   | The scopes contained in the token. | [scopes](#scopes) object     |

#### claims

Consists of name-value pairs for each included claim. For descriptions of the claims that can be included, see Okta's [OpenID Connect and OAuth 2.0 API reference](/docs/api/resources/oidc/#tokens-and-claims).

#### lifetime

| Property   | Description                              | Data Type |
|------------|------------------------------------------|-----------|
| expiration | Time in seconds until the token expires. | Number    |

#### scopes

The set of scopes that have been granted. For descriptions of the scopes that can be included, see Okta's [OpenID Connect and OAuth 2.0 API reference](/docs/api/resources/oidc/#tokens-and-claims).

## Objects in the Response that You Send

For the Token Inline hook, the `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

### commands

The `commands` object is where you can provide commands to Okta. It is where you can tell Okta to add additional claims to the token.

The `commands` object is an array, allowing you to send multiple commands. In each array element, there needs to be a `type` property and `value` property. The `type` property is where you specify which of the supported commands you want to execute, and `value` is where you supply an operand for that command.

In the case of the Token hook type, the `value` property is itself a nested object in which you specify a particular operation, a path to act on, and a value.

| Property | Description                                                              | Data Type       |
|----------|--------------------------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands).                    | String          |
| value    | Operand to pass to the command. It specifies a particular op to perform. | [value](#value) |

#### Supported Commands

The following commands are supported for the Token Inline Hook type:

| Command                 | Description             |
|-------------------------|-------------------------|
| com.okta.identity.patch | Modify an ID token.     |
| com.okta.access.patch   | Modify an access token. |

> Note: The `commands` array should only contain commands that can be applied to the requested tokens. For example, if the token is an ID token, the `commands` array shouldn't contain commands of the type `com.okta.access.patch`.

#### value

The `value` object is where you specify the specific operation to perform. It is an array, allowing you to request more than one operation.

| Property | Description                                                                                                                                                                                                       | Data Type       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| op       | The name of one of the [supported ops](#list-of-supported-ops).                                                                                                                                                   | String          |
| path     | Location within the token to apply the operation, specified as a slash-delimited path. When adding a claim, this always begins with `/claims/`,  and is followed by the name of the new claim that you are adding. | String          |
| value    | Value to set the claim to.                                                                                                                                                                                        | Any JSON object |

#### List of Supported Ops

| Op      | Description               |
|---------|---------------------------|
| add     | Add a claim.              |
| replace | Modify an existing claim. |
| remove  | Remove an existing claim. |

### error

When you return an error object, it should have the following structure:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error. | String    |

Returning an error object causes Okta to return an OAuth 2.0 error to the requester of the token, with the value of `error` set to `server_error`, and the value of `error_description` set to the string that you supplied in the `errorSummary` property of the `error` object that you returned.

## Sample JSON Payload of a Request

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

## Sample JSON Payloads of Responses

This section provides example JSON payloads for the supported operations.

### Sample Response to Add a Claim

> Note: The `add` operation can only be used to add new claims to a token, not to overwrite the value of a claim already included in the token. See [Sample Response to Replace an Existing Claim](/use_cases/inline_hooks/token_hook/token_hook/#sample-response-to-replace-an-existing-claim).

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
### Sample Response to Replace an Existing Claim

You can modify existing custom claims or OIDC standard profile claims, such as `birthdate` and `locale`. You can't, however, modify any system-specific claims, such as `iss` or `ver`, and you can't modify a claim that isn't currently part of the token in the request payload. Attempting to modify a system-specific claim or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events.

For the list of Access token reserved claims that you can't modify, see [Access Tokens Scopes and Claims](https://developer.okta.com/docs/api/resources/oidc/#access-token-scopes-and-claims). Note that although the `aud` claim is listed as a reserved claim, you can modify that claim in a response.

See [ID Token Claims](https://developer.okta.com/docs/api/resources/oidc/#id-token-claims) for a list of ID token reserved claims that you can't modify.

```json
{
   "commands": [ 
        { 
            "type": "com.okta.identity.patch",
            "value": [ 
                 { 
                     "op": "replace",
                     "path": "/claims/extPatientId",
                     "value": "1234"
                  }
             ] 
         }, 
         { 
             "type": "com.okta.access.patch",
             "value": [
                  { 
                     "op": "replace",
                     "path": "/claims/external_guid",
                     "value": "F0384685-F87D-474B-848D-2058AC5655A7" 
                   }
              ] 
          }
      ]
}
```

### Sample Response to Modify Token Lifetime
You can modify how long the Access and ID tokens are valid by specifying the `lifetime` in seconds. The `lifetime` value must be a minimum of five minutes (300 seconds) and a maximum of 24 hours (86,400 seconds).

```json
{
   "commands": 
     [ 
        { 
            "type": "com.okta.identity.patch",
            "value": [ 
                 { 
                     "op": "replace",
                     "path": "/token/lifetime/expiration",
                     "value": 36000
                  }
             ] 
         }, 
         { 
             "type": "com.okta.access.patch",
             "value": [
                  { 
                     "op": "replace",
                     "path": "/token/lifetime/expiration",
                     "value": 36000 
                   }
              ] 
          }
      ]
}
```
### Sample Response to Remove Token Claims
You can remove existing custom claims or OIDC standard profile claims, such as `birthdate` or `locale`. You can't, however, remove any system-specific claims, such as `iss` or `ver`, and you can't remove a claim that isn't currently part of the token in the request payload. Attempting to remove a system-specific claim or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events. 

For the list of Access token reserved claims that you can't remove, see [Access Tokens Scopes and Claims](https://developer.okta.com/docs/api/resources/oidc/#access-token-scopes-and-claims). Note that although the `aud` claim is listed as a reserved claim, you can remove that claim in a response.

See [ID Token Claims](https://developer.okta.com/docs/api/resources/oidc/#id-token-claims) for a list of ID token reserved claims that you can't remove.

> Note: For the `remove` operation, the `value` property isn't required and should be set to `null`. Providing any other value fails the entire PATCH response.

```json
{
   "commands": 
     [ 
        { 
            "type": "com.okta.identity.patch",
            "value": [ 
                 { 
                     "op": "remove",
                     "path": "/claims/birthdate",
                     "value": null
                  }
             ] 
         }, 
         { 
             "type": "com.okta.access.patch",
             "value": [
                  { 
                     "op": "remove",
                     "path": "/claims/external_guid"
                   }
              ] 
          }
      ]
}
```

## Enabling a Token Inline Hook

To activate the inline hook, you first need to register your external service endpoint with Okta using the [Inline Hooks Management API](/docs/api/resources/inline-hooks).

You then need to associate the registered inline hook with a Custom Authorization Server Policy Rule by completing the following steps:

1. Go to **API > Authorization Servers**.

1. Select a Custom Authorization Server from the list.

1. Select the Access Policies tab and and select a policy to use with the hook. In most cases, just pick the Default Policy.

1. One of the policy's rules needs to trigger the inline hook. Click the pencil icon for a rule to edit it. If you only have one rule, edit the Default Policy Rule.

1. Click the **Use this inline hook** dropdown menu. Any inline hooks you have registered will be listed. Select the hook you would like to use.

1. Click **Update Rule**.

> Note: Only one inline hook can be associated with each rule.

