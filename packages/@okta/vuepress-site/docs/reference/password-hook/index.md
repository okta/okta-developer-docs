---
title: Password Inline Hook Reference
excerpt: Verify a user-supplied password during user import
---

# Password Inline Hook Reference≠

<ApiLifecycle access="ea" />

This page provides reference documentation for:

- JSON objects contained in the outbound request from Okta to your external service

- JSON objects you can include in your response

This information is specific to the Password Inline Hook, one type of Inline Hook supported by Okta.

## See Also

For a general introduction to Okta Inline Hooks, see [Inline Hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

For steps to enable this Inline Hook, see below, [Enabling a Password Inline Hook](#enabling-a-password-inline-hook).

## About

The Password Inline Hook allows you to....

Link to the new section of the /users API reference page covering "Create user with Hook-based password migration".

Your custom code can respond with a command to confirm that the password supplied is valid, or to indicate that it is not.

## Objects in the Request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

### data.credential

This object contains the password that the end user supplied when logging in.

### data.action

Specifies the default? Will affect behaviour if external service returns empty response.

## Objects in Response You Send

The objects that you can return in the JSON payload of your response are an array of one or more `commands`, to be executed by Okta, or an `error` object, to indicate problems with the verification request. These objects are defined as follows:

### commands

The `commands` object lets you invoke commands to modify or add values to the attributes in the Okta user profile that will be created for this user, as well as to control whether or not the registration attempt is allowed to proceed.

This object is an array, allowing you to send multiple commands in your response. Each array element requires a `type` property and a `value` property. The `type` property is where you specify which of the supported commands you wish to execute, and `value` is where you supply parameters for that command.

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands). | String          |
| value    | Operand to pass to the command.                       | [value](#value) |

For example commands, see the [value](#value) section below.

#### Supported Commands

The following commands are supported for the Registration Inline Hook type:

| Command                | Description                                      |
|------------------------|--------------------------------------------------|
| com.okta.action.update | Indicate whether the supplied password is valid. |

To indicate whether the supplied password is valid, supply a type property set to `com.okta.action.update`, together with a value property set to `{"credential": "VERIFIED"}` or `{"credential": "UNVERIFIED"}`. The default is to allow registration.

#### value

The `value` object is the parameter to pass to the command.

For `com.okta.action.update` commands, `value` should be an object containing a `credential` property set to either `VERIFIED` or `UNVERIFIED`, for example:

```json
{
   "commands":[
      {
         "type":"ccom.okta.action.update",
         "value":{
            "credential":"UNVERIFIED",  
         }
      }
   ]
}
```

The above example tells Okta that the password sent does not verify.

The same result could also be accomplished by means of an empty response, as follows:

```http
Status code 204 NO CONTENT
```

### error

See [error](/docs/concepts/inline-hooks/) for general information on the structure to use for the `error` object.

In the case of the Password Inline Hook, the `error` object provides....

> **Note:** If you include an error object in your response, (will the action command be executed?).

## Sample JSON Payload of Request

```json
{
  "eventId": "GOsk4z6tSSeZo6X08MvKaw",
  "eventTime": "2019-08-27T18:07:24.000Z",
  "eventType": "com.okta.user.credential.password.import",
  "eventTypeVersion": "1.0",
  "contentType": "application/json",
  "cloudEventVersion": "0.1",
  "source": "https://${yourOktaDomain}/api/v1/inlineHooks/${hookId}",
  "data": {
    "context": {
      "request": {
        "id": "XWVxW2zcaH5-Ii74OsI6CgAACJw",
        "method": "POST",
        "url": {
          "value": "/api/v1/authn"
        },
        "ipAddress": "98.124.153.138"
      },
      "credential": {
        "username": "stuart.minion@okta.com",
        "password": "ADRumble@6"
      }
    },
    "action":{
      "credential": "UNVERIFIED"
    }
  }
}
```

## Sample JSON Payload of Response

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
## Enabling a Password Inline Hook

To activate the Inline Hook, you first need to register your external service endpoint with Okta; see [Inline Hook Setup](/docs/concepts/inline-hooks/#inline-hooks_setup).

You then need to associate the registered Inline Hook with a created user profile......

Numbered list of the steps.

Your Password Inline Hook is now configured for the new user you have created.
