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

The Okta Registration Inline Hook allows you to integrate your own custom code into Okta’s [Self-Service Registration](https://help.okta.com/en/prod/Content/Topics/Directory/eu-self-service.htm) flow. The hook is triggered when users attempt to register using Self-Service Registration, at the point after the registration submission is received but before the Okta user profile is created. Your custom code can:

- Set or override the valuse that will be populated in attributes of the user's Okta profile
- Allow or deny the registration attempt, based on your own validation of the information the user has submitted

## Objects in the Request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

### data.userProfile

This object contains name-value pairs for each attribute supplied by the user in the Self-Service Registration form, except for password.

By means of the `com.okta.user.profile.update` commands you send in your response, you can modify the values of the attributes, or add values for other attributes, before the values are assigned to the Okta user profile created for the registering user.

You can only set values for profile fields which already exist in your Okta user profile schema. Registration Inline Hook functionality can only set values, it cannot create new fields.

> Note: The `password` field, along with any attributes that are marked as sensitive in your Okta user schema, are omitted from the information sent to your external service in the `data.userProfile` object. The password or its hash is never sent to your external service in any way.

### data.action

The action that Okta is currently set to take, regarding whether to allow this registration attempt.

There are two possible values:

- `ALLOW` indicates that the registration attempt will be allowed to proceed
- `DENY` indicates that the registration attempt will be terminated (no user will be created in Okta)

The action is `ALLOW` by default (in practice, `DENY` will never be sent to your external service).

By means of the `com.okta.action.update` [command](#supported-commands) in your response, you can change the action that Okta will take.

## Objects in Response You Send

For the Registration Inline Hook, the `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

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

| Command                      | Description                                                       |
|------------------------------|-------------------------------------------------------------------|
| com.okta.user.profile.update | Set or modify an attribute in the Okta user profile that will be created for this user.                 |
| com.okta.action.update       | Allow or deny the user's registration. |

To set attributes in the user's Okta profile, supply a type property set to `com.okta.user.profile.update`, together with a `value` property set to a list of key-value pairs corresponding to Okta user profile attributes you want to set. The attributes must already exist in your user profile schema.

To explicitly allow or deny registration to the user, supply a type property set to `com.okta.action.update`, together with a value property set to `{"registration": "ALLOW"}` or `{"registration": "DENY"`}. The default is to allow registration.

Commands are applied in the order in which they appear in the array. Within a single command, attributes are updated in the order in which they appear in the `value` object.

#### value

The `value` object is the parameter to pass to the command.

For `com.okta.user.profile.update` commands, `value` should be an object containing one or more name-value pairs for the attributes you wish to update, for example:

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

The above example assumes that there is an attribute `customerId` defined in your Okta user schema (`middleName` is defined by default).

The same update may also be accomplished with two separate `com.okta.user.profile.update` commands as follows:

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

It is never permitted to use commands to update the user's password, but you are allowed to set the values of attributes other than password which are designated sensitive in your Okta user schema. Note however that the values of those sensistive attributes are not included in the `data.userProfile` object sent to your external service by Okta. See [data.userProfile](#data.userProfile).

For `com.okta.action.update` commands, `value` should be an object containing the attribute `action` set to a value of either `ALLOW` or `DENY`, indicating whether the registration should be permitted or not, for example:

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

Registrations are allowed by default, so though setting a value of `ALLOW` for the `action` field is valid, it is also superfluous, since this is the default behavior. 

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
