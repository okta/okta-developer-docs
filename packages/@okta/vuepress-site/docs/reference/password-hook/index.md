---
title: Password import inline hook reference
excerpt: Verify a user-supplied password during migration of the user to Okta
---

# Password import inline hook reference

The Password Import Inline Hook API reference is now available at the new [Okta API reference portal](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook)

Explore the [Okta Public API Collections](https://www.postman.com/okta-eng/workspace/okta-public-api-collections/overview) workspace to get started with the Inline Hook API Postman Collection.

<!--

This page provides reference documentation for password import inline hooks, one type of inline hook supported by Okta. It provides sample JSON objects that are contained in the outbound request from Okta to your external service, and sample JSON objects that you can include in your response.

## See also

For a general introduction to Okta inline hooks, see [inline hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/).

For steps to enable this inline hook, see below, [Enabling a password import inline hook](#enabling-a-password-import-inline-hook).

For an example implementation of this inline hook, see [Password import inline hook](/docs/guides/password-import-inline-hook).

## About

The password import inline hook enables migration of users from another data store in a case where you wish the users to retain their current passwords. It is meant to be used in conjunction with the [Create User with password import inline hook](/docs/reference/api/users#create-user-with-password-import-inline-hook) flow that is provided by the Users API.

The password import inline hook is triggered when the end user tries to sign in to Okta for the first time. Okta sends your external service the password that the user supplied. Your external service then needs to send a response to Okta indicating whether the password supplied by the end user is valid or not.

If your service returns a response that indicates that the password is valid, Okta sets the password for the user and won't normally need to call your service again. However, if your Okta org is in read-only mode, it might not be possible to set the password. Okta then needs to call your external service again when the end user attempts to signs in. See [Password inline hook and Okta read-only mode](#password-inline-hook-and-okta-read-only-mode) and [Removing Password from Existing User Store](#removing-password-from-existing-user-store) for details.

>**Note:** Password policies do not apply to the password import inline hook. That is, if your external service validates the password, the password imports even if it does not meet the Okta [password policy](/docs/reference/api/policy/#password-policy) requirements.

## Objects in the request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

### data.context.credential

This object contains `username` and `password` properties. These are the user name and password that the end user supplied when attempting to sign in to Okta.

### data.action

This specifies the default action Okta is set to take. Okta will take this action if your external service sends an empty HTTP 204 response. You can override the default action by returning a `commands` object in your response specifying the action to take.

## Objects in response you send

The objects that you can return in the JSON payload of your response are an array of one or more `commands` objects, which specify commands to be executed by Okta.

<HookResponseSize/>

### commands

For the password import inline hook, the `commands` object lets you specify whether Okta should accept the end user's login credentials as valid or not.

This object is an array. Each array element requires a `type` property and a `value` property. The `type` property is where you specify the command, and `value` is where you supply the parameter for the command.

| Property | Description                                | Data Type       |
|----------|--------------------------------------------|-----------------|
| type     | A [supported command](#supported-command). | String          |
| value    | Operand to pass to the command.            | [value](#value) |

For the password import inline hook, you typically only return one `commands` object with one array element in it.

For example commands, see the [value](#value) section below.

#### Supported command

The following command is supported for the password import inline hook type:

| Command                | Description                                                            |
|------------------------|------------------------------------------------------------------------|
| com.okta.action.update | Indicates that an update action should occur for the supplied `value`. |

In this case, you are updating the authentication action that is taken for the user. You specify how authentication should proceed using the `value` object.

#### value

The `value` object is the parameter to pass to the command.

For `com.okta.action.update` commands, `value` should be an object that contains a `credential` property set to either `VERIFIED` or `UNVERIFIED`:

- To indicate that the supplied credentials are valid, supply a type property set to `com.okta.action.update` together with a value property set to `{"credential": "VERIFIED"}`.

- To indicate that the supplied credentials are not valid, supply a type property set to `com.okta.action.update` together with a value property set to`{"credential": "UNVERIFIED"}`.

For example, to indicate that the supplied credentials should not be accepted as valid, you would return the following:

```json
{
   "commands":[
      {
         "type":"com.okta.action.update",
         "value":{
            "credential":"UNVERIFIED"
         }
      }
   ]
}
```

If the default action sent by Okta in the `action.credential` property of the request to your external service was `UNVERIFIED`, then the same result, of rejecting the user-supplied credentials, could also be accomplished by means of returning an empty response with HTTP status code `204 NO CONTENT`. This would cause Okta to proceed with the default action.

## Timeout behavior

If a response to the password import inline hook request is not received from your external service within 3 seconds, a timeout occurs. In this scenario, the Okta process flow stops and the user can't sign in. The password is not imported and the inline hook is called the next time the end user attempts to sign in.

## Sample JSON payload of request

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

## Sample JSON payload of response

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

## Enabling a password import inline hook

To enable a password import inline hook, you first need to register your external service endpoint with Okta and configure it as an inline hook of type `com.okta.user.credential.password.import`. See [Inline hook setup](/docs/concepts/inline-hooks/#inline-hook-setup). You can also use the Admin Console to register your external service endpoint and configure the hook by going to **Workflow > Inline Hooks** and clicking **Add Inline Hook**.

When creating a new user with the `/users` API, you need to use the [Create User with password import inline hook](/docs/reference/api/users#create-user-with-password-import-inline-hook) use case. This involves specifying a `credentials.password.hook` property in the request body.

When the end user that you have added attempts to sign in to Okta for the first time, the hook is triggered and Okta calls your external service, sending it the credentials that the end user provided. Your service can check the credentials and respond with a command to indicate to Okta whether the credentials are valid or not.

## Password inline hook and Okta read-only mode

Normally, if your external service responds to Okta indicating that the credentials are valid, Okta saves the password and can authenticate the user independently from then on. However, if your Okta org is in [read-only mode](https://support.okta.com/help/s/article/What-is-Oktas-Readonly-Mode?language=en_US) when the end user signs in, then saving the password might not be possible. The next time the end user attempts to sign in, the password import inline hook needs to be called again.

## Removing Password from existing user store

Because of the possibility of your org being in read-only mode, don't attempt to permanently delete user passwords from your existing user store until the success of the password import is verified. The `user.import.password` Okta System Log [Event](/docs/reference/api/event-types/) is available for this purpose. This type of event is created every time a password import inline hook is triggered. The event's `Event.Outcome` property provides a status of `FAILURE` or `SUCCESS` for the password import operation. If the status is `SUCCESS`, Okta has successfully saved the end user's password, and it's safe to delete it from your previous user store.

You can configure an [Event hook](/docs/concepts/event-hooks/) to send this event type to you, to use to trigger automated cleanup of end user passwords after successful migration.

> **Note:** Only one password import inline hook can be created per org. -->
