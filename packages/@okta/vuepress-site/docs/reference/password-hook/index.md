---
title: Password Import Inline Hook Reference
excerpt: Verify a user-supplied password during migration of the user to Okta
---

# Password Import Inline Hook Reference

This page provides reference documentation for:

- JSON objects contained in the outbound request from Okta to your external service

- JSON objects you can include in your response

This information is specific to the Password Import Inline Hook, one type of Inline Hook supported by Okta.

## See Also

For a general introduction to Okta Inline Hooks, see [Inline Hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

For steps to enable this Inline Hook, see below, [Enabling a Password Import Inline Hook](#enabling-a-password-import-inline-hook).

## About

The Password Import Inline Hook enables migration of users from another data store in a case where you wish the users to retain their current passwords. It is meant to be used in conjunction with the [Create User with Password Import Inline Hook](/docs/reference/api/users#create-user-with-password-import-inline-hook) flow that is provided by the Users API.

The Password Import Inline Hook is triggered when the end user tries to sign in to Okta for the first time. Okta sends your external service the password that the user supplied. Your external service then needs to send a response to Okta indicating whether the password supplied by the end user is valid or not.

When your service returns a response that indicates that the password is valid, Okta sets the password for the user and won't call your service again. However, if Okta service is temporarily disrupted or degraded, Okta might not be able to set the password, and will need to call your service on subsequent authentication attempts until the password is successfully set. See [Password Inline Hook and Okta Service Mode](#password-inline-hook-and-okta-service-mode) and [Removing Password from Existing User Store](#removing-password-from-existing-user-store) for details.

## Objects in the Request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

### data.credential

This object contains `username` and `password` properties. These are user name and password that the end user supplied when attempting to sign in to Okta.

### data.action

This specifies the default action Okta is set to take. Okta will take this action if your external service sends an empty HTTP 204 response. You can override the default action by returning a `command` object in your response specifying the action to take.

## Objects in Response You Send

The objects that you can return in the JSON payload of your response are an array of one or more `commands` objects, which specify commands to be executed by Okta. This object is defined as follows:

### commands

For the Password Import Inline Hook, the `commands` object lets you specify whether Okta should accept the end user's login credentials as valid or not.

This object is an array. Each array element requires a `type` property and a `value` property. The `type` property is where you specify the command, and `value` is where you supply the parameter for the command

| Property | Description                                | Data Type       |
|----------|--------------------------------------------|-----------------|
| type     | A [supported command](#supported-command). | String          |
| value    | Operand to pass to the command.            | [value](#value) |

For the Password Import Inline Hook, you will typically only return one `commands` object with one array element in it.

For example commands, see the [value](#value) section below.

#### Supported Command

The following command is supported for the Password Import Inline Hook type:

| Command                | Description                                                            |
|------------------------|------------------------------------------------------------------------|
| com.okta.action.update | Indicates that an update action should occur for the supplied `value`. |

In this case, you are updating the authentication action that is taken for the user. You can specify how to proceed with the `value` object.

#### value

The `value` object is the parameter to pass to the command.

For `com.okta.action.update` commands, `value` should be an object that contains a `credential` property set to either `VERIFIED` or `UNVERIFIED`:

* To indicate that the supplied credentials are valid, supply a type property set to `com.okta.action.update` together with a value property set to `{"credential": "VERIFIED"}`.

* To indicate that the supplied credentials are not valid, supply a type property set to `com.okta.action.update` together with a value property set to`{"credential": "UNVERIFIED"}`.

For example, to indicate that the supplied credentials should not be accepted as valid, you would return the following:

```json
{
   "commands":[
      {
         "type":"com.okta.action.update",
         "value":{
            "credential":"UNVERIFIED",  
         }
      }
   ]
}
```

If the default action sent by Okta in the `action.credential` property of the request to your external service was `UNVERIFIED`, then the same result, of rejecting the user-supplied credentials, could also be accomplished by means of returning an empty response with HTTP status code `204 NO CONTENT`. This would cause Okta to proceed with the default action.

## Sample JSON Payload of Request

```json
{
  "eventId": "3o9jBzq1SmOGmmsDsqyyeQ",
  "eventTime": "2020-01-17T21:23:56.000Z",
  "eventType": "com.okta.user.credential.password.import",
  "eventTypeVersion": "1.0",
  "contentType": "application/json",
  "cloudEventVersion": "0.1",
  "source": "https://${yourOktaDomain}/api/v1/inlineHooks/cal2xd5phv9fsPLcF0g7",
  "data": {
    "context": {
      "request": {
        "id": "XiIl6wn7005Rr@fjYqeC7AAABxw",
        "method": "POST",
        "url": {
          "value": "/api/v1/authn"
        },
        "ipAddress": "98.124.153.138"
      },
      "credential": {
        "username": "isaac.brock@example.com",
        "password": "Okta"
      }
    },
    "action": {
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

## Enabling a Password Import Inline Hook

To enable a Password Import Inline Hook, you first need to register your external service endpoint with Okta and configure it as an Inline Hook of type `com.okta.user.credential.password.import`. See [Inline Hook Setup](/docs/concepts/inline-hooks/#inline-hook-setup). You can also use the Admin Console to register your external service endpoint and configure the hook by going to **Workflow > Inline Hooks** and clicking **Add Inline Hook**.

When creating a new user with the `/users` API, you need to use the [Create User with Password Import Inline Hook](/docs/reference/api/users#create-user-with-password-import-inline-hook) use case. This involves specifying a `credentials.password.hook` property in the request body.

When the end user that you have added attempts to sign in to Okta for the first time, the hook is triggered and Okta calls your external service, sending it the credentials that end user provided. Your service can check the credentials and respond with a command to indicate to Okta whether the credentials are valid or not.

## Password Inline Hook and Okta Service Mode

Normally, if your external service responds to Okta indicating that the credentials are valid, Okta saves the password and can authenticate the user independently from then on. However, if your Okta org is in a special [service mode](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_ref_service_op_mode)) at the time the end user signs in, then saving the password isn't possible, and the next time the end user attempts to sign in, the Password Import Inline Hook needs to be called again.

## Removing Password from Existing User Store

Because of the possibility of your org being in a special service mode, permanent deletion of user passwords from your existing user store should not be performed until success of the password migration can be verified. An Okta System Log [Event](/docs/reference/api/event-types/), `user.import.password`, is available for this purpose. An event of this type is created every time a Password Import Inline Hook is fired, with its `Event.Outcome` property providing a status of `FAILURE` or `SUCCESS` for the password import operation. If the status is `SUCCESS`, Okta has successfully saved the end user's password, and it's safe to delete it from your previous user store.

You can configure an [Event Hook](/docs/concepts/event-hooks/) to send this event type to you, to use to trigger automated cleanup of end user passwords after successful migration.

> **Note:** Only one Password Import Inline Hook can be created per org.
