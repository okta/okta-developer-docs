---
title: Token inline hook reference
excerpt: Customize tokens returned by the Okta API Access Management process flow.
---

# Token inline hook reference

This page provides reference documentation for token inline hooks, one type of inline hook supported by Okta. It provides sample JSON objects that are contained in the outbound request from Okta to your external service, and sample JSON objects that you can include in your response.

## See also

For a general introduction to Okta inline hooks, see [inline hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

For steps to enable this inline hook, see [Enabling a token inline hook](#enabling-a-token-inline-hook).

For an example implementation of this inline hook, see [Token inline hook](/docs/guides/token-inline-hook).

## About

This type of inline hook is triggered when OAuth 2.0 and OpenID Connect (OIDC) tokens are minted by your Okta custom authorization server. Before sending the token to the requester, Okta calls out to your external service. Your service can then respond with commands to add custom claims to the token or to modify existing claims.

Use this functionality to add data that is sensitive, calculated at runtime, or complexly structured and not appropriate for storing in Okta user profiles. Okta never logs nor stores data that is added this way. As an example, tokens minted for a medical app could be augmented with confidential patient data provided by your external service and not stored in Okta.

In addition to adding custom claims, you can modify or remove an existing custom claim or an OIDC standard profile claim. You can also update how long an access token or an ID token is valid.

This inline hook works only when using an [Okta custom authorization server](/docs/guides/customize-authz-server/main/#create-an-authorization-server), not the built-in Okta authorization server.

## Objects in the request from Okta

For the token inline hook, the outbound call from Okta to your external service includes the following objects in its JSON payload:

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

Consists of name-value pairs for each included claim. For descriptions of the claims that you can include, see the Okta [OpenID Connect and OAuth 2.0 API reference](/docs/reference/api/oidc/#tokens-and-claims).

#### lifetime

| Property   | Description                              | Data Type |
|------------|------------------------------------------|-----------|
| expiration | Time in seconds until the token expires. | Number    |

#### scopes

The set of scopes that have been granted. For descriptions of the scopes that can be included, see the Okta [OpenID Connect and OAuth 2.0 API reference](/docs/reference/api/oidc/#tokens-and-claims).

#### data.refresh_token

Provides the refresh token ID that you can store on the first access token request. When you make the refresh token grant, the ID matches what was stored. This allows you to connect the two requests.

| Property   | Description                              | Data Type |
|------------|------------------------------------------|-----------|
| jti        | Refresh token ID                         | String    |

## Objects in the response that you send

For the token inline hook, the `commands` and `error` objects that you can return in the JSON payload of your response are defined in the following sections.

<HookResponseSize/>

### commands

The `commands` object is where you can provide commands to Okta. It's where you can tell Okta to add more claims to the token.

The `commands` object is an array, allowing you to send multiple commands. In each array element, there needs to be a `type` property and `value` property. The `type` property is where you specify which of the supported commands you want to execute, and `value` is where you supply an operand for that command.

In the case of the token hook type, the `value` property is itself a nested object in which you specify a particular operation, a path to act on, and a value.

| Property | Description                                                              | Data Type       |
|----------|--------------------------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands).                    | String          |
| value    | Operand to pass to the command. It specifies a particular op to perform. | [value](#value) |

#### Supported commands

The following commands are supported for the token inline hook type:

| Command                 | Description             |
|-------------------------|-------------------------|
| com.okta.identity.patch | Modify an ID token.     |
| com.okta.access.patch   | Modify an access token. |

> **Note:** The `commands` array should only contain commands that can be applied to the requested tokens. For example, if only an ID token is requested, the `commands` array shouldn't contain commands of the type `com.okta.access.patch`.

#### value

The `value` object is where you specify the specific operation to perform. It's an array, allowing you to request more than one operation.

| Property | Description                                                                                       | Data Type       |
|----------|---------------------------------------------------------------------------------------------------|-----------------|
| op       | The name of one of the [supported ops](#list-of-supported-ops).                                   | String          |
| path     | Location within the token to apply the operation, specified as a slash-delimited path. When adding, replacing, or removing a claim, this always begins with `/claims/`  and is followed by the name of the new claim that you're adding. When replacing a token lifetime, the path should always be `/token/lifetime/expiration`. | String          |
| value    | Value to set the claim to.                                       | Any JSON object |

#### List of supported ops

| Op      | Description               |
|---------|---------------------------|
| add     | Add a claim.              |
| replace | Modify an existing claim and update the token lifetime. |
| remove  | Remove an existing claim. |

#### Reserved claims for Token Hooks

Okta defines various reserved claims that can't be overridden. When you add a custom claim to a [token](/docs/reference/api/oidc/#tokens-and-claims) or modify a claim, don't use the following reserved claims:

| Claim name     | Token type              |
|----------------|-------------------------|
| acr            | ID token & access token |
| active         | ID token |
| aid            | ID token |
| amr            | ID token |
| app_id         | ID token |
| app_type       | ID token |
| as_uri         | access token |
| at_hash        | ID token |
| aud            | ID token |
| auth_time      | ID token & access token |
| authorization_details  | access token |
| c_hash         | ID token |
| cid            | ID token & access token|
| client_id      | ID token |
| client_ip      | ID token |
| client_req_id  | ID token |
| client_type    | ID token |
| client_user_agent | ID token |
| cnf            | ID token & access token (if [DPoP](/docs/guides/dpop/main) enabled) |
| device_compliance | ID token |
| device_id      | ID token |
| device_known   | ID token |
| device_managed | ID token |
| device_name    | ID token |
| device_trust   | ID token |
| did            | ID token |
| dst            | ID token |
| exp            | ID token & access token |
| group          | ID token |
| groups         | ID token & access token |
| hotk           | ID token |
| iat            | ID token & access token |
| idp            | ID token |
| idp_iss        | ID token |
| iss            | ID token & access token |
| jti            | ID token & access token |
| mac_key        | ID token |
| may_act        | ID token |
| nonce          | ID token |
| oid            | ID token |
| okta_emailVerified | ID token |
| okta_lastUpdated | ID token |
| orig           | ID token |
| permissions    | ID token |
| purpose        | ID token |
| pwd_exp_days   | ID token |
| pwd_exp_time   | ID token |
| rid            | ID token |
| role           | ID token |
| rpt            | access token |
| rsi            | access token |
| scope          | ID token |
| scopes         | ID token |
| scp            | access token |
| sid            | ID token & access token |
| sub            | ID token |
| term           | ID token |
| token_type     | ID token & access token |
| uid            | access token |
| user_ip        | ID token |
| username       | access token |
| ver            | ID token & access token |

### error

When you return an error object, it should have the following structure:

| Property     | Description                          | Data type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error | String    |

Returning an error object causes Okta to return an OAuth 2.0 error to the requester of the token, with the value of `error` set to `server_error`, and the value of `error_description` set to the string that you supplied in the `errorSummary` property of the `error` object that you returned.

#### Sample error response

```json
"error": {
    "errorSummary": "Human-readable summary of the error"
}
```

> **Note:** If the error object doesn't include the `errorSummary` property defined, the following common default message is returned to the end user: `The callback service returned an error`.

## Sample JSON payload of a request

```json
{
  "source": "https://${yourOktaDomain}/oauth2/default/v1/authorize",
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
          "value": "https://${yourOktaDomain}/oauth2/default/v1/authorize?scope=openid+profile+email&response_type=token+id_token&redirect_uri=https%3A%2F%2Fhttpbin.org%2Fget&state=foobareere&nonce=asf&client_id=customClientIdNative"
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
          "uri": "https://${yourOktaDomain}/oauth2/default"
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
            "href": "https://${yourOktaDomain}/00uq8tMo3zV0OfJON0g3/groups"
          },
          "factors": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uq8tMo3zV0OfJON0g3/factors"
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
        "email": "administrator1@clouditude.net",
        "ver": 1,
        "iss": "https://${yourOktaDomain}/oauth2/default",
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
        "iss": "https://${yourOktaDomain}/oauth2/default",
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
    },
    "refresh_token": {
       "jti": "oarob4a0tckCkGcyo1d6"
    }
  }
}
```

## Sample JSON payloads of responses

This section provides example JSON payloads for the supported operations.

### Sample response to add a claim

Use the `add` operation to add new claims to a token. If you use the `add` operation and include an existing claim in your response with a different value, that value is replaced. Use the `replace` operation instead. See [Sample Response to Replace an Existing Claim](/docs/reference/token-hook/#sample-response-to-replace-an-existing-claim) for more information. Attempting to remove a system-specific claim or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events.

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

You can also use the `add` operation to add new members to existing JSON objects and new elements to existing arrays. For example, you have a JSON object in a claim called `employee_profile`, and you want to add the `department_id` member to the claim.

The existing target JSON object:

```json
{
   "employee_profile":{
      "employee_id":"1234",
      "name":"Anna"
   }
}
```

Add `department_id` by specifying the claim in the path, followed by the name of the object member.

> **Note:** Attempting to add a member within a JSON object that doesn't exist or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events.

```json
{
   "commands":[
      {
         "type":"com.okta.identity.patch",
         "value":[
            {
               "op":"add",
               "path":"/claims/employee_profile/department_id",
               "value":"4947"
            }
         ]
      }
   ]
}
```

The resulting JSON object:

```json
{
   "employee_profile":{
      "employee_id":"1234",
      "name":"Anna",
      "department_id":"4947"
   }
}

```

You can also append an element to an array by specifying the name of the array, followed by the index where you want to insert the element in the path. For example, you have an array that contains the user's preferred airports, and you want to add a new airport to the array.

The existing target JSON object:

```json
{
   "preferred_airports":[
      "sjc",
      "sfo",
      "oak"
   ]
}
```

```json
{
   "commands":[
      {
         "type":"com.okta.identity.patch",
         "value":[
            {
               "op":"add",
               "path":"/claims/preferred_airports/3",
               "value":"lax"
            }
         ]
      }
   ]
}
```

The resulting JSON object:

```json
{
   "preferred_airports":[
      "sjc",
      "sfo",
      "oak",
      "lax"
   ]
}
```

This `add` operation adds `lax` to the end of the array. Alternatively, you can specify the array name followed by a hyphen `-` in the path to append an element at the end of the array.

```json
{
   "commands":[
      {
         "type":"com.okta.identity.patch",
         "value":[
            {
               "op":"add",
               "path":"/claims/preferred_airports/-",
               "value":"lax"
            }
         ]
      }
   ]
}
```

**Note:** If you attempt to add an element within an array that doesn't exist or specify an invalid index, the entire PATCH fails and errors are logged in the token hooks events.

### Sample response to replace an existing claim

You can modify existing custom claims or OIDC standard profile claims, such as `birthdate` and `locale`. You can't, however, modify any system-specific claims, such as `iss` or `ver`, and you can't modify a claim that isn't currently part of the token in the request payload. Attempting to modify a system-specific claim or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events.

See [Access Tokens Scopes and Claims](/docs/reference/api/oidc/#access-token-scopes-and-claims) for the list of access token-reserved claims that you can't modify.

>**Note:** Although the `aud` and `sub` claims are listed as reserved claims, you can modify those claims in access tokens. You can't modify these claims in ID tokens.

See [ID Token Claims](/docs/reference/api/oidc/#id-token-claims) for a list of ID token-reserved claims that you can't modify.

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

You can also use the `replace` operation to modify members within JSON objects and elements within arrays. For example, you have a JSON object in a claim called `employee_profile`, and you want to update the email address of the employee.

The existing target JSON object:

```json
{
   "employee_profile":{
      "employee_id":"1234",
      "name":"Anna",
      "email":"anna.v@company.com"
   }
}
```

Specify the claim in the path, followed by the name of the object member that you want to modify.

> **Note:** Attempting to modify a member within a JSON object that doesn't exist or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events.

```json
{
   "commands":[
      {
         "type":"com.okta.identity.patch",
         "value":[
            {
               "op":"replace",
               "path":"/claims/employee_profile/email",
               "value":"anna@company.com"
            }
         ]
      }
   ]
}
```

The resulting JSON object:

```json
{
   "employee_profile":{
      "employee_id":"1234",
      "name":"Anna",
      "email":"anna@company.com"
   }
}
```

Similarly, you can replace elements in an array by specifying the array name and the valid index of the element that you want to replace in the path.

### Sample response to modify token lifetime

You can modify how long the access and ID tokens are valid by specifying the `lifetime` in seconds. The `lifetime` value must be a minimum of five minutes (300 seconds) and a maximum of 24 hours (86,400 seconds).

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

### Sample response to remove token claims

You can remove existing custom claims or OIDC standard profile claims, such as `birthdate` or `locale`. You can't, however, remove any system-specific claims, such as `iss` or `ver`, and you can't remove a claim that isn't currently part of the token in the request payload. If you attempt to remove a system-specific claim or use an invalid operation, the entire PATCH fails and errors are logged in the token hooks events.

See [Access Tokens Scopes and Claims](/docs/reference/api/oidc/#access-token-scopes-and-claims) for the list of access token-reserved claims that you can't remove.

See [ID Token Claims](/docs/reference/api/oidc/#id-token-claims) for a list of ID token-reserved claims that you can't remove.

> **Note:** The `value` property for the `remove` operation isn't required. If you provide it in the response, it should be set to `null`. Providing any other value fails the entire PATCH response.

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

You can also use the `remove` operation to remove members from existing JSON objects and elements from existing arrays. For example, you have an array that contains the user's preferred airports, and you want to remove an airport from the array.

Existing target JSON object:

```json
{
   "preferred_airports":[
      "sjc",
      "lax",
      "sfo",
      "oak"
   ]
}
```

You can remove the element from the array by specifying the array name followed by the index of the element that you want to remove. You don't need to specify a value for the `remove` operation, but you can specify `null` as the value if you want.

> **Note:** Attempting to remove an element within an array that doesn't exist or specifying an invalid value results in the entire PATCH failing and errors logged in the token hooks events.

```json
{
   "commands":[
      {
         "type":"com.okta.identity.patch",
         "value":[
            {
               "op":"remove",
               "path":"/claims/preferred_airports/1"
            }
         ]
      }
   ]
}
```

The resulting JSON object:

```json
{
   "preferred_airports":[
      "sjc",
      "sfo",
      "oak"
   ]
}
```

Similarly, you can remove a JSON object member by specifying the JSON object in the path, followed by the claim member that you would like to remove. For example, you have an `employee_profile` claim, and you want to remove `email` from it.

> **Note:** Attempting to remove a member within a JSON object that doesn't exist or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events.

The existing target JSON object:

```json
{
   "employee_profile":{
      "employee_id":"1234",
      "name":"Anna",
      "email":"anna.v@company.com"
   }
}
```

PATCH command that removes the employee's email:

```json
{
   "commands":[
      {
         "type":"com.okta.identity.patch",
         "value":[
            {
               "op":"remove",
               "path":"/claims/employee_profile/email"
            }
         ]
      }
   ]
}
```

The resulting JSON object:

```json
{
   "employee_profile":{
      "employee_id":"1234",
      "name":"Anna"
   }
}
```

## Timeout behavior

After receiving the Okta request, if there's a response timeout, the Okta process flow proceeds with original token returned. See [Troubleshooting](#troubleshooting).

## Enabling a token inline hook

To activate the inline hook, you first need to register your external service endpoint with Okta using the [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

You then need to associate the registered inline hook with a custom authorization server policy rule by completing the following steps:

1. Go to **Security** > **API** > **Authorization Servers**.

1. Select a custom authorization server from the list.

1. Select **Access Policies** and select a policy to use with the hook. In most cases, pick the Default Policy.

1. One of the policy's rules needs to trigger the inline hook. Click the pencil icon for a rule to edit it. If you only have one rule, edit the Default Policy Rule.

1. Click the **Use this Inline Hook** dropdown menu. Any inline hooks that you have registered are listed. Select the hook that you would like to use.

1. Click **Update Rule**.

> **Note:** You can associate only one inline hook with each rule.

## Troubleshoot

This section covers what happens when a token inline hook flow fails either due to the external inline hook service returning an error object or not returning a successful response, or the inline hook patch fails.

> **Note:** Administrators can use the [Okta System Log](/docs/reference/api/system-log/) to view errors. See the [Troubleshooting](/docs/concepts/inline-hooks/#troubleshooting) section in the inline hooks concept piece for more information on the events related to inline hooks that the Okta System Log captures.

- When there's a communication failure with the external service, a timeout for example, the inline hook operation is skipped. The token is generated without any modification from the inline hook.

  **Who can see this error?** Administrators

- When the external service returns a response with any other HTTP status code besides `200`, the inline hook operation is skipped. The token is generated without any modification from the inline hook.

  **Who can see this error?** Administrators

- When the external service returns an error object in the response, the entire token inline hook flow fails with no token generated.

  **Who can see this error?** Administrators, developers, and end users. When the OAuth 2.0 client receives the error, the client developer can see that error if the client has the debug information. What the end user sees depends on how errors are handled within the client.

  > **Note:** See the [error](/docs/reference/token-hook/#error) section on this page for more information on what to include in the error object of your response and what the OAuth 2.0 error includes that Okta returns to the requestor of the token.

- When a hook command (for example, updating, adding, and deleting claims) can't be performed, the inline hook operation is skipped. The token is generated without any modification from the inline hook.

  **Who can see this error?** Administrators

  The following actions result in an error:

  - Using an invalid command. For example, if only an ID token is requested, the `commands` array shouldn't contain commands of the type `com.okta.access.patch`.

  - Using an invalid operation

  - Attempting to remove a system-specific claim

  - Attempting to update a claim that doesn't exist

  - Attempting to update an element within an array that doesn't exist or specifying an invalid index

  - Attempting to remove a claim that doesn't exist
