---
title: Token Inline Hook Reference
excerpt: Customize tokens returned by the Okta API Access Management process flow.
---

# Token Inline Hook Reference

This page provides reference documentation for:

- JSON objects that are contained in the outbound request from Okta to your external service

- JSON objects that you can include in your response

This information is specific to the Token Inline Hook, one type of Inline Hook supported by Okta.

## See also

For a general introduction to Okta Inline Hooks, see [Inline Hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

For steps to enable this Inline Hook, see below, [Enabling a Token Inline Hook](#enabling-a-token-inline-hook).

For an example implementation of this Inline Hook, see [Token Inline Hook](/docs/guides/token-inline-hook).

## About

This type of Inline Hook is triggered when OAuth 2.0 and OpenID Connect (OIDC) tokens are minted by your Okta Custom Authorization Server. Before sending the token to the requester, Okta calls out to your external service, and your service can respond with commands to add custom claims to the token or to modify existing claims.

This functionality can be used to add data that is sensitive, calculated at runtime, or complexly-structured and not appropriate for storing in Okta user profiles. Data added this way is never logged or stored by Okta. As an example, tokens minted for a medical app could be augmented with confidential patient data provided by your external service and not stored in Okta.

In addition to adding custom claims, you can modify or remove an existing custom claim or an OIDC standard profile claim. You can also update how long an access token or an ID token is valid.

This Inline Hook works only when using an [Okta Custom Authorization Server](/docs/guides/customize-authz-server/create-authz-server/), not the built-in Okta Authorization Server.

## Objects in the request from Okta

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

Consists of name-value pairs for each included claim. For descriptions of the claims that can be included, see Okta's [OpenID Connect and OAuth 2.0 API reference](/docs/reference/api/oidc/#tokens-and-claims).

#### lifetime

| Property   | Description                              | Data Type |
|------------|------------------------------------------|-----------|
| expiration | Time in seconds until the token expires. | Number    |

#### scopes

The set of scopes that have been granted. For descriptions of the scopes that can be included, see Okta's [OpenID Connect and OAuth 2.0 API reference](/docs/reference/api/oidc/#tokens-and-claims).

## Objects in the response that you send

For the Token Inline Hook, the `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

### commands

The `commands` object is where you can provide commands to Okta. It is where you can tell Okta to add additional claims to the token.

The `commands` object is an array, allowing you to send multiple commands. In each array element, there needs to be a `type` property and `value` property. The `type` property is where you specify which of the supported commands you want to execute, and `value` is where you supply an operand for that command.

In the case of the Token hook type, the `value` property is itself a nested object in which you specify a particular operation, a path to act on, and a value.

| Property | Description                                                              | Data Type       |
|----------|--------------------------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands).                    | String          |
| value    | Operand to pass to the command. It specifies a particular op to perform. | [value](#value) |

#### Supported commands

The following commands are supported for the Token Inline Hook type:

| Command                 | Description             |
|-------------------------|-------------------------|
| com.okta.identity.patch | Modify an ID token.     |
| com.okta.access.patch   | Modify an access token. |

> **Note:** The `commands` array should only contain commands that can be applied to the requested tokens. For example, if only an ID token is requested, the `commands` array shouldn't contain commands of the type `com.okta.access.patch`.

#### value

The `value` object is where you specify the specific operation to perform. It is an array, allowing you to request more than one operation.

| Property | Description                                                                                                                                                                                                       | Data Type       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| op       | The name of one of the [supported ops](#list-of-supported-ops).                                                                                                                                                   | String          |
| path     | Location within the token to apply the operation, specified as a slash-delimited path. When adding, replacing, or removing a claim, this always begins with `/claims/`  and is followed by the name of the new claim that you are adding. When replacing a token lifetime, the path should always be `/token/lifetime/expiration`. | String          |
| value    | Value to set the claim to.                                                                                                                                                                                        | Any JSON object |

#### List of supported ops

| Op      | Description               |
|---------|---------------------------|
| add     | Add a claim.              |
| replace | Modify an existing claim and update the token lifetime. |
| remove  | Remove an existing claim. |

#### Reserved claims for Token Hooks

Okta defines a number of reserved claims that can't be overridden. When you add a custom claim to a [token](/docs/reference/api/oidc/#tokens-and-claims) or modify a claim, avoid using the following reserved claims:

| Claim Name     | Token Type        |
|----------------|-------------------|
| acr            | Access Token      |
| amr            | Access Token      |
| as_uri         | Access Token      |
| cid            | Access Token      |
| groups         | Access Token      |
| rpt            | Access Token      |
| rsi            | Access Token      |
| uid            | Access Token      |
| username       | Access Token      |
| active         | ID Token          |
| aid            | ID Token          |
| app_id         | ID Token          |
| app_type       | ID Token          |
| at_hash        | ID Token          |
| auth_time      | ID Token          |
| client_id      | ID Token          |
| client_ip      | ID Token          |
| client_req_id  | ID Token          |
| client_type    |ID Token           |
| client_user_agent |ID Token        |
| cnf            | ID Token          |
| c_hash         | ID Token          |
| device_compliance |ID Token        |
| device_id      | ID Token          |
| device_known   | ID Token          |
| device_managed | ID Token          |
| device_name    |  ID Token         |
| device_trust   | ID Token          |
| did            | ID Token          |
| dst            | ID Token          |
| group          | ID Token          |
| groups         |  ID Token         |
| hotk           | ID Token          |
| idp            |  ID Token         |
| idp_iss        | ID Token          |
| mac_key        | ID Token          |
| may_act        | ID Token          |
| nonce          | ID Token          |
| oid            | ID Token          |
| okta_emailVerified | ID Token      |
| okta_lastUpdated | ID Token        |
| orig           | ID Token          |
| permissions    | ID Token          |
| purpose        | ID Token          |
| pwd_exp_days   |ID Token           |
| pwd_exp_time   | ID Token          |
| rid            | ID Token          |
| role           | ID Token          |
| scope          | ID Token          |
| scopes         | ID Token          |
| sid            | ID Token          |
| term           | ID Token          |
| user_ip        |  ID Token         |
| iss            | Access Token & ID Token |
| jti            | Access Token & ID Token |
| token_type     | Access Token & ID Token |
| ver            | Access Token & ID Token |

### error

When you return an error object, it should have the following structure:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error. | String    |

Returning an error object causes Okta to return an OAuth 2.0 error to the requester of the token, with the value of `error` set to `server_error`, and the value of `error_description` set to the string that you supplied in the `errorSummary` property of the `error` object that you returned.

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

This `add` operation adds `lax` to the end of the array. Alternatively, you can just specify the array name followed by a hyphen `-` in the path to append an element at the end of the array.

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

> **Note:** Attempting to add an element within an array that doesn't exist or specifying an invalid index results in the entire PATCH failing and errors logged in the token hooks events.

### Sample Response to Replace an Existing Claim

You can modify existing custom claims or OIDC standard profile claims, such as `birthdate` and `locale`. You can't, however, modify any system-specific claims, such as `iss` or `ver`, and you can't modify a claim that isn't currently part of the token in the request payload. Attempting to modify a system-specific claim or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events.

For the list of access token reserved claims that you can't modify, see [Access Tokens Scopes and Claims](/docs/reference/api/oidc/#access-token-scopes-and-claims). Note that although the `aud` and `sub` claims are listed as reserved claims, you can modify those claims in access tokens. You can't modify these claims in ID tokens.

See [ID Token Claims](/docs/reference/api/oidc/#id-token-claims) for a list of ID token reserved claims that you can't modify.

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

### Sample Response to Modify Token Lifetime

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

You can remove existing custom claims or OIDC standard profile claims, such as `birthdate` or `locale`. You can't, however, remove any system-specific claims, such as `iss` or `ver`, and you can't remove a claim that isn't currently part of the token in the request payload. Attempting to remove a system-specific claim or using an invalid operation results in the entire PATCH failing and errors logged in the token hooks events.

For the list of access token reserved claims that you can't remove, see [Access Tokens Scopes and Claims](/docs/reference/api/oidc/#access-token-scopes-and-claims).

See [ID Token Claims](/docs/reference/api/oidc/#id-token-claims) for a list of ID token reserved claims that you can't remove.

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

You can remove the element from the array by specifying the array name followed by the index of the element that you want to remove. You don't need to specify a value for the `remove` operation. But, you can specify `null` as the value if you want.

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

## Enabling a Token Inline Hook

To activate the Inline Hook, you first need to register your external service endpoint with Okta using the [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

You then need to associate the registered Inline Hook with a Custom Authorization Server Policy Rule by completing the following steps:

1. Go to **Security > API > Authorization Servers**.

1. Select a Custom Authorization Server from the list.

1. Select **Access Policies** and select a policy to use with the hook. In most cases, just pick the Default Policy.

1. One of the policy's rules needs to trigger the Inline Hook. Click the pencil icon for a rule to edit it. If you only have one rule, edit the Default Policy Rule.

1. Click the **Use this Inline Hook** dropdown menu. Any Inline Hooks you have registered are listed. Select the hook you would like to use.

1. Click **Update Rule**.

> **Note:** Only one Inline Hook can be associated with each rule.

## Troubleshooting

This section covers what happens when a token inline hook flow fails either due to the external inline hook service returning an error object or not returning a successful response, or the inline hook patch fails.

> **Note:** Administrators can use the [Okta System Log](/docs/reference/api/system-log/) to view errors. See the [Troubleshooting](/docs/concepts/inline-hooks/#troubleshooting) section in the Inline Hooks concept piece for more information on the events related to Inline Hooks that the Okta System Log captures.

- When there is a communication failure with the external service, the inline hook operation is skipped. The token is generated without any modification from the inline hook.

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
