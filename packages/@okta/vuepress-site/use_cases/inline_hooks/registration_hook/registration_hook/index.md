---
title: Registration Inline Hook
excerpt: Customize handling of user registration requests in Self-Service Registration
---

# Registration Inline Hook

<ApiLifecycle access="ea" />

This page provides reference documentation for:

- JSON objects contained in the outbound request from Okta to your external service

- JSON objects you can include in your response

This information is specific to the Registration Inline Hook, one type of inline hook supported by Okta.

## See Also

For a general introduction to Okta inline hooks, see [Inline Hooks](/use_cases/inline_hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/api/resources/inline-hooks).

For steps to enable this inline hook, see below, [Enabling a Registration Inline Hook](#enabling-a-registration-inline-hook-for-self-service-registration).

## About

Okta Registration Inline Hooks are triggered when a user attempts to register through [Self-Service Registration](https://help.okta.com/en/prod/Content/Topics/Directory/eu-self-service.htm). This inline hook enables you to have your own custom code executed after a user attempts to register, before their registration completes. Your custom code can:

- Set or override attributes in the user's profile
- Allow or deny the registration attempt, based on your own validation of the user's profile

The remainder of this document describes the API contract for these hooks &mdash; both the request that Okta submits to your external service when a Registration Inline Hook is triggered and the format of the response that Okta expects to receive back from your external service.

## Objects in the Request from Okta

The outbound call from Okta to your external service will include the following objects in its JSON payload:

### data.userProfile

The profile of the registering user, containing name-value pairs for each attribute supplied by the user in the Self-Service Registration widget.

By means of the `com.okta.user.profile.update` commands you send in your response, you will be able to modify the values of these attributes, or add values for other attributes defined in you user schema, before the values are assigned to Okta user profile created for the registering user.

> Note: The `password` field, along with any attributes that are marked as sensitive in your Okta user schema, are omitted from the information sent to your external service in the `data.userProfile` object.  

### data.action

The action that Okta is currently set to take, regarding whether to all this registration attempt. There are two possible values:

- `ALLOW` indicates that the registration attempt will be allowed to proceed
- `DENY` indicates that the registration attempt will be terminated (no user will be created in Okta)

The action is `ALLOW` by default (in practice, `DENY` will never be sent to your external service).

By means of the `com.okta.action.update` [command](#supported-commands) in your response, you can change the action that Okta will take.

## Objects in Response You Send

For the Registration Inline Hook, the `commands`, `error`, and `debugContext` objects that you can return in the JSON payload of your response are defined as follows:

### commands

The `commands` object is where you can provide commands to Okta to update attributes in the user's profile or to change the action Okta will take in regard to the registration request.

The `commands` object is an array, allowing you to send multiple commands. Each array element requires a `type` property and a `value` property. The `type` property is where you specify which of the supported commands you wish to execute, and `value` is where you supply parameters for that command.

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands). | String          |
| value    | Operand to pass to the command.                       | [value](#value) |

For example commands, see the [value](#value) section below.

#### Supported Commands

The following commands are supported for the Registration Inline Hook type:

| Command                      | Description                                                       |
|------------------------------|-------------------------------------------------------------------|
| com.okta.user.profile.update | Set or modify an attribute in the user's profile.                 |
| com.okta.action.update       | Update the action that Okta will take on the user's registration. |

#### value

The `value` object is the parameter to pass to the command. For `com.okta.user.profile.update` commands, `value` should be an object containing one or more name-value pairs for the attribute(s) you wish to update. For example:

```json
{
   "commands":[
      {
         "type":"com.okta.user.profile.update",
         "value":{
            "middleName":"Danger",
            "customerId":12345
         }
      }
   ]
}
```

This assumes that there is an attribute `customerId` defined on the user schema (`middleName` is defined by default). The same update may also be accomplished with two separate `com.okta.user.profile.update` commands as follows:

```json
{
   "commands":[
      {
         "type":"com.okta.user.profile.update",
         "value":{
            "middleName":"Danger"
         }
      },
      {
         "type":"com.okta.user.profile.update",
         "value":{
            "customerId":12345
         }
      }
   ]
}
```

Commands are applied in the order in which they appear in the array. Within a single command, attributes are updated in the order in which they appear in the `value` object.

It is never permitted to use commands to update the user's password, but you are allowed to set the values of attributes other than password which are designated sensitive in your Okta user schema. Note however that the values of those sensistive attributes are not included in the `data.userProfile` object sent to your external service by Okta. See [data.userProfile](#data.userProfile).

For `com.okta.action.update` commands, `value` should be an object containing the key `action` with a value of either `ALLOW` or `DENY`, indicating whether the registration should be permitted or not:

```json
{
   "commands":[
      {
         "type":"com.okta.action.update",
         "value":{
            "action":"DENY",
         }
      }
   ]
}
```

Registrations are allowed by default, but returning the command shown in the example above will result in the registration request being denied. Thus, while supplying a value of `ALLOW` for the `action` field is valid, it is also superfluous, since this is the default behavior. 

### error

When you return an error object, it should have the following structure:

| Property     | Description                             | Data Type            |
|--------------|-----------------------------------------|----------------------|
| errorSummary | Human-readable summary of the error(s). | String               |
| errorCauses  | An array of ErrorCause objects.         | Array of ErrorCauses |

The `errorSummary` should be a general statement of any problem the external service encountered in handling the request from Okta. The `errorCauses` are intended to provide more detailed information and are particularly helpful if there were multiple problems. An `ErrorCause` object must include the following fields:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error. | String    |
| reason       | A brief, enum-like string indicating the nature of the error. E.g. `UNIQUE_CONSTRAINT` for a property uniqueness violation.      | String    |
| locationType | Where in the request the error was found (`body`, `header`, `url`, or `query`).    | String    |
| location     | The valid JSON path to the location of the error. E.g., if there was an error in the user's `login` field, the `location` should be `data.userProfile.login`.  | String    |
| domain       | Indicates the source of the error. If the error was on the user's profile, use `end-user`. If the error resulted from the external service, use `external-service`. | String    |

While there are no technical restrictions on the values for any of the fields in an `ErrorCause` object, using them as described in the table above allows you to provide rich error information that, along with the `debugContext`, can be very useful in determining why a user's registration failed.

> Note: If you are using the Okta Sign-In Widget for Self-Service Registration and have not customized its error handling behavior, only the `errorSummary` of the first `ErrorCause` object will be displayed to the user. By default (i.e. if the `errorCauses` object is empty), the user will see a callout stating that "Registration cannot be completed at this time" if their registration fails for hook-related reasons.

### debugContext

The `debugContext` is a free-form JSON object where you can provide information to be logged in the `debugContext` field of `inline_hook.response.processed` events in the Okta System Log. These events are fired when Okta has received a response from the external service but there is either:

- An error object in the response body (provided by the external service).
- A problem with the response body that prevents the registration from being completed. For example, the response might have provided a command with an invalid type or it may have tried to use a `com.okta.profile.update` command to update an ineligible property like `password`. 

The `debugContext` lets the external service provide information about its handling of the hook execution request (e.g. execution time, profile properties validated, etc.). This can be helpful for diagnosing what went wrong when a registration fails.

> Note: `inline_hook.response.processed` events are _not_ fired following a successful registration unless debugging is enabled for the configured hook.

## Sample Listing of JSON Payload of Request

```json
{
   "eventType":"com.okta.user.pre-registration",
   "eventTypeVersion":"1.0",
   "cloudEventVersion":"0.1",
   "source":"/api/v1/registration/reg17jsXFYSfBEkZh0g4/register",
   "eventID":"763F35F3-7D83-4547-836B-F55382ADBDC7",
   "eventTime":"2018-05-29T20:04:22Z",
   "contentType":"application/json",
   "data":{
      "context":{
         "request":{
            "id":"reqa-0DCpdKQe-td_UodXKpag",
            "method":"POST",
            "url":{
               "value":"http://example.okta.com/api/v1/registration/reg17jsXFYSfBEkZh0g4/register"
            },
            "ipAddress":"192.168.122.1",
            "locale":"en-US",
            "client":""
         }
      },
      "user":{
         "profile":{
            "firstName":"Isaac",
            "lastName":"Brock",
            "login":"isaac.brock@example.com",
            "mobilePhone":"555-415-1337"
         }
      }
   }
}
```

## Sample Listing of JSON Payload of Response

```json
{
   "commands":[
      {
         "type":"com.okta.action.update",
         "value":{
            "action":"DENY"
         }
      }
   ],
   "error":{
      "errorSummary":"Errors were found in the user profile",
      "errorCauses":[
         {
            "errorSummary":"You specified an invalid email domain",
            "reason":"INVALID_EMAIL_DOMAIN",
            "locationType":"body",
            "location":"data.userProfile.login",
            "domain":"end-user"
         }
      ]
   },
   "debugContext":{
      "executionTimeMillis":231
   }
}
```

## Enabling a Registration Inline Hook for Self-Service Registration

To activate the inline hook, you first need to register your external service endpoint with Okta using the [Inline Hooks Management API](/docs/api/resources/inline-hooks).

You then need to associate the registered inline hook with your Self-Service Registration policy. (What to do if you've not yet configured a policy...)

1. Go to **Directory > Self-Service Registration**.

1. Click **Edit**.

1. Select your hook from the **Extension** dropdown. If you have created multiple Registration Inline Hooks, you should see all of them displayed here.

1. Click **Save**.

Your Registration Inline Hook is now configured.

> Note: Only one inline hook can be associated with your Self-Service Registration policy at a time.
