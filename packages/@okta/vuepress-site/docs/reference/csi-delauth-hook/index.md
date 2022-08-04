---
title: Custom Source Delegated Authentication Inline Hook Reference
excerpt: Allow delegated authentication to custom identity sources.
---

# Custom Source Delegated Authentication Inline Hook Reference

<ApiLifecycle access="beta" />

This page provides reference documentation for:

- JSON objects contained in the outbound request from Okta to your external service

- JSON objects you can include in your response

This information is specific to the Custom Source Delegated Authentication Inline Hook, one type of Inline Hook supported by Okta.

## See also

For a general introduction to Okta inline hooks, see [inline hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

## About

The Custom Source Delegated Authentication Inline Hook enables you to delegate authentication of a user to an external identity source.

The hook supports a few operations. It first allows you to import a user into Okta after a successful authentication. From there it allows delegated authentication of the user to the external source, and fetches the latest profile of the user from the external source.

Each of these operations corresponds to an individual inline hook invocation, and each corresponding request is tagged with a `requestType` property in the request headers.

The following sections describe each of these operations and the objects in their requests and responses.

## User attributes

To support user lifecycle and credential lifecycle operations, we expect the external source to provide certain attributes:

- `status`: The status of the user, with a value of ACTIVE or DISABLED
- `passwordExpiryTime`: The time when the user's password expires, in the form of Epoch time as milliseconds
- `lastUpdate`: When the user's profile was last updated in the external source, in the form of Epoch time as milliseconds

## Delegated authentication request

This type of request has the following `requestType`: `user.authenticate`


### Objects in the request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

#### data.context.credential

Provides two name-value pairs, one for identifying the subject user to authenticate, and the other for providing the password of that user.

#### data.action

The current default action that Okta takes if your external service sends an empty HTTP 204 response. You can override the default action by returning a `commands` object in your response specifying the action to take.

### Objects in the response you send

The `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

#### commands

The `commands` object is where you can provide commands to Okta. It's an array, allowing you to send multiple commands. Each array element needs to consist of the following name-value pair:

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands) | String          |
| value    | The parameter to pass to the command                  | [value](#value) |

##### Supported commands

The following command is supported for the delegated authentication request:

| Command                         | Description                                                                                                              |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `com.okta.action.update`          | Specify the result of the authentication, either success or one of the causes of failure. |

##### value

The `value` object is the parameter to pass to the command. For the `com.okta.action.update` command, `value` should be an object that contains a `credential` property set to one of the following values:

- `VERIFIED`: The user is authenticated successfully.
- `UNVERIFIED`: The user fails to authenticate due to invalid credentials.
- `ACCOUNT_LOCKED`: The user account is locked.
- `ACCOUNT_DISABLED`: The user account is disabled.
- `PASSWORD_EXPIRED`: The user password is expired.
- `UNKNOWN_USER`: The user doesn't exist in the source.

For example, to indicate that the user authenticates successfully, you can return the following:

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "credential": "VERIFIED"
    }
  }]
}
```

Another example for the situation when the user account fails authentication due to account being disabled:

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "credential": "ACCOUNT_DISABLED"
    }
  }]
}
```

#### error

When you return an error object, it should contain an `errorSummary` sub-object:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error  | String    |

Returning an error object causes Okta to record a failure event in the Okta System Log. The string that you supplied in the `errorSummary` property of the `error` object is recorded in the System Log event.

### Sample JSON payload of request from Okta to your external service

```json
{
  "eventId": "3o5iAzq1SmOGmmssqDyzeM",
  "eventTime": "2020-12-10T23:10:33.000Z",
  "eventType": "com.okta.custom.source.delegated.authentication",
  "eventTypeVersion": "1.0",
  "contentType": "application/json",
  "cloudEventVersion": "0.1",
  "requestType": "user.authenticate",
  "source": "https://{yourOktaDomain}/api/v1/inlineHooks/cal11h7VDs8LC4DAi0g4",
  "data": {
    "context": {
      "request": {
        "id": "X9Ma2IQOokP4O1Cqr85u9QAACx0",
        "method": "POST",
        "url": {
          "value": "/api/v1/authn"
        },
        "ipAddress": "127.0.0.1"
      },
      "credential": {
        "sub": "6ycN3AkgJfun",
        "password": "eoJE!JR^##7ppK"
      }
    },
    "action": {
      "credential": "UNVERIFIED"
    }
  }
}
```

### Sample JSON payloads of the responses from your external service to Okta

```json
{
  "commands":[
    {
      "type":"com.okta.action.update",
      "value":{
        "credential":"VERIFIED"
      }
    }
  ]
}
```

## Profile fetch request

This type of request has the following `requestType`: `profile.fetch`


### Objects in the request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

#### data.appUser.profile

Provides a name-value pair for identifying the subject user to fetch profile for.

#### data.action

The current default action that Okta takes if your external service sends an empty HTTP 204 response. You can override the default action by returning a `commands` object in your response that specifies the action to take.

### Objects in the response you send

The `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

#### commands

The `commands` object is where you can provide commands to Okta. It's an array that allows you to send multiple commands. Each array element needs to consist of the following name-value pair:

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands) | String          |
| value    | The parameter to pass to the command                | [value](#value) |

##### Supported commands

The following commands are supported for the profile fetch operation:

| Command                         | Description                                                                                                              |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `com.okta.action.update`         | Specify the result of the operation, either success or one of the causes of failure. |
| `com.okta.appUser.profile.update` | When profile fetch succeeds, this command contains the current profile for the user. |

##### value

For the `com.okta.action.update` command, `value` should be an object that contains an `appUser.profile` property set to one of the following values:

- `FETCHED`: The user profile is fetched successfully.
- `UNKNOWN_USER`: The user doesn't exist in the source.
- `FAILED`: The operation failed and the detailed cause is in the error object.

For example, to indicate that the profile is fetched successfully, you would return:

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "appUser.profile": "FETCHED"
    }
  }]
}
```

Another example for the situation when the specified user doesn't exist in the source, you would return:

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "appUser.profile": "UNKNOWN_USER"
    }
  }]
}
```

For the `com.okta.appUser.profile.update` command, `value` should be an object that contains a list of properties for the user profile, for example:

```json
    {
      "type": "com.okta.appUser.profile.update",
      "value": {
        "sub": "4kJ5iCmNNKTp4w",
        "website": "http://isaac.brock.net",
        "zoneinfo": "UTC",
        "birthdate": "10/30/1980",
        "address.locality": "Seattle",
        "gender": "male",
        "profile": "http://isaac.brock.net",
        "preferred_username": "isaac.Brock",
        "locale": "en-us",
        "given_name": "Issac",
        "middle_name": "Eugene",
        "picture": "http://isaac.brock.net/issac.png",
        "address.country": "USA",
        "address.postal_code": "98107",
        "address.region": "WA",
        "name": "Isaac.Brock",
        "nickname": "Isaac",
        "phone_number": "4258092036",
        "family_name": "Brock",
        "email": "isaac.brock@test.com",
        "address.street_address": "1423 NW Market St",
        "lastUpdate": "1648240001",
        "status": "ACTIVE"
      }
    }
```

The `com.okta.appUser.profile.update` command should be included only when the `com.okta.action.update` command returns a value of `FETCHED`.

#### error

When you return an error object, it should contain an `errorSummary` sub-object:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error | String    |

Returning an error object causes Okta to record a failure event in the Okta System Log. The string that you supplied in the `errorSummary` property of the `error` object is recorded in the System Log event.

### Sample JSON payload of request from Okta to your external service

```json
{
  "eventId": "3o5iAzq1SmOGmmssqDyzeM",
  "eventTime": "2020-12-10T23:10:33.000Z",
  "eventType": "com.okta.custom.source.delegated.authentication",
  "eventTypeVersion": "1.0",
  "contentType": "application/json",
  "cloudEventVersion": "0.1",
  "requestType": "profile.fetch",
  "source": "https://{yourOktaDomain}/api/v1/inlineHooks/cal11h7VDs8LC4DAi0g4",
  "data": {
    "context": {
      "request": {
        "id": "X9Ma2IQOokP4O1Cqr85u9QAACx0",
        "method": "POST",
        "url": {
          "value": "/api/v1/authn"
        },
        "ipAddress": "127.0.0.1"
      }
    },
    "appUser.profile": {
      "sub": "4kJ5iCmNNKTp4w"
    },
    "action": {
      "appUser.profile": "FAILED"
    }
  }
}
```

### Sample JSON payloads of the responses from your external service to Okta

```json
{
  "commands": [
    {
      "type":"com.okta.action.update",
      "value":{
        "appUser.profile": "FETCHED"
      }
    },
    {
      "type": "com.okta.appUser.profile.update",
      "value": {
        "sub": "4kJ5iCmNNKTp4w",
        "website": "http://isaac.brock.net",
        "zoneinfo": "UTC",
        "birthdate": "10/30/1980",
        "address.locality": "Seattle",
        "gender": "male",
        "profile": "http://isaac.brock.net",
        "preferred_username": "isaac.Brock",
        "locale": "en-us",
        "given_name": "Issac",
        "middle_name": "Eugene",
        "picture": "http://isaac.brock.net/issac.png",
        "address.country": "USA",
        "address.postal_code": "98107",
        "address.region": "WA",
        "name": "Isaac.Brock",
        "nickname": "Isaac",
        "phone_number": "4258092036",
        "family_name": "Brock",
        "email": "isaac.brock@test.com",
        "address.street_address": "1423 NW Market St",
        "lastUpdate": "1648240001",
        "status": "ACTIVE"
      }
    }
  ]
}
```

## Delegated authentication with profile fetch request

This type of request has the following `requestType`: `user.authenticate.fetch`


### Objects in the request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

#### data.context.credential

Provides two name-value pairs, one for identifying the subject user to authenticate, and the other for providing the password of that user.

#### data.action

The current default action that Okta takes if your external service sends an empty HTTP 204 response. You can override the default action by returning a `commands` object in your response that specifies the action to take.

### Objects in the response you send

The `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

#### commands

The `commands` object is where you can provide commands to Okta. It's an array that allows you to send multiple commands. Each array element needs to consist of the following name-value pair:

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands) | String          |
| value    | The parameter to pass to the command                 | [value](#value) |

##### Supported commands

The following commands are supported for the Custom Source Delegated Authentication Inline Hook type:

| Command                         | Description                                                                                                              |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `com.okta.action.update`          | Specify the result of the authentication, either success or one of the causes of failure. |

##### value

For the `com.okta.action.update` command, `value` should be an object that contains a `credential` property set to one of the following values if credential validation failed:

- `UNVERIFIED`: The user fails to authenticate due to invalid credentials.
- `ACCOUNT_LOCKED`: The user account is locked.
- `ACCOUNT_DISABLED`: The user account is disabled.
- `PASSWORD_EXPIRED`: The user password is expired.
- `UNKNOWN_USER`: The user doesn't exist in the source.

If credential validation succeeds, then `value` should be an object that contains an `appUser.profile` property set to one of the following values:

- `FETCHED`: The user is authenticated successfully and the profile is fetched successfully.
- `FAILED`: The operation failed and the detailed cause is in the error object.

For example, to indicate that the user authenticates successfully and the profile is fetched successfully, you would return:

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "appUser.profile": "FETCHED"
    }
  }]
}
```

Another example for the situation when the user account fails authentication due to the account being disabled:

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "credential": "ACCOUNT_DISABLED"
    }
  }]
}
```

#### error

When you return an error object, it should contain an `errorSummary` sub-object:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error | String    |

Returning an error object causes Okta to record a failure event in the Okta System Log. The string that you supplied in the `errorSummary` property of the `error` object is recorded in the System Log event.

### Sample JSON payload of the request from Okta to your external service

```json
{
  "eventId": "3o5iAzq1SmOGmmssqDyzeM",
  "eventTime": "2020-12-10T23:10:33.000Z",
  "eventType": "com.okta.custom.source.delegated.authentication",
  "eventTypeVersion": "1.0",
  "contentType": "application/json",
  "cloudEventVersion": "0.1",
  "requestType": "user.authenticate.fetch",
  "source": "https://{yourOktaDomain}/api/v1/inlineHooks/cal11h7VDs8LC4DAi0g4",
  "data": {
    "context": {
      "request": {
        "id": "X9Ma2IQOokP4O1Cqr85u9QAACx0",
        "method": "POST",
        "url": {
          "value": "/api/v1/authn"
        },
        "ipAddress": "127.0.0.1"
      },
      "credential": {
        "email": "isaac.brock@example.com",
        "password": "eoJE!JR^##7ppK"
      }
    },
    "action": {
      "credential": "UNVERIFIED"
    }
  }
}
```

### Sample JSON payloads of the responses from your external service to Okta

```json
{
  "commands": [
    {
      "type": "com.okta.action.update",
      "value": {
        "appUser.profile": "FETCHED"
      }
    },
    {
      "type": "com.okta.appUser.profile.update",
      "value": {
        "sub": "4kJ5iCmNNKTp4w",
        "website": "http://isaac.brock.net",
        "zoneinfo": "UTC",
        "birthdate": "10/30/1980",
        "address.locality": "Seattle",
        "gender": "male",
        "profile": "http://isaac.brock.net",
        "preferred_username": "isaac.Brock",
        "locale": "en-us",
        "given_name": "Issac",
        "middle_name": "Eugene",
        "picture": "http://isaac.brock.net/issac.png",
        "address.country": "USA",
        "address.postal_code": "98107",
        "address.region": "WA",
        "name": "Isaac.Brock",
        "nickname": "Isaac",
        "phone_number": "4258092036",
        "family_name": "Brock",
        "email": "isaac.brock@test.com",
        "address.street_address": "1423 NW Market St",
        "lastUpdate": "1648240001",
        "status": "ACTIVE"
      }
    }
  ]
}
```
