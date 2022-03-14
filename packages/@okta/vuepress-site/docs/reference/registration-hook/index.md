---
title: Registration Inline Hook Reference
excerpt: Customize handling of user registration requests in Profile Enrollment
---

# Registration Inline Hook Reference

This page provides reference documentation for:

- JSON objects contained in the outbound request from Okta to your external service

- JSON objects you can include in your response

This information is specific to the Registration Inline Hook, one type of Inline Hook supported by Okta.

## See also

For a general introduction to Okta Inline Hooks, see [Inline Hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

For steps to enable this Inline Hook, see below, [Enabling a Registration Inline Hook](#enable-a-registration-inline-hook-for-profile-enrollment-in-okta-identity-engine). <ApiLifecycle access="ie" /><br>

For steps to enable this Inline Hook in Okta Classic Engine, see [Enabling a Registration Inline Hook in the Classic Engine](#enable-a-registration-inline-hook-for-self-service-registration-in-the-classic-engine).

For an example implementation of this Inline Hook, see [Registration Inline Hook](/docs/guides/registration-inline-hook).

## About

The Okta Registration Inline Hook allows you to integrate your own custom code into Okta's [Profile Enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) flow. The hook is triggered after Okta receives the registration request but before the user is created. Your custom code can:

- Set or override the values that will be populated in attributes of the user's Okta profile
- Allow or deny the registration attempt, based on your own validation of the information the user has submitted

> **Note:** Profile Enrollment and Registration Inline Hooks only work with the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 4.5 or later.

## Objects in the Request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

### data.userProfile

This object contains name-value pairs for each attribute supplied by the user in the Profile Enrollment form, except for the following:

- the `password` field
- any fields corresponding to user profile attributes marked as sensitive in your Okta user schema

Using the `com.okta.user.profile.update` commands you send in your response, you can modify the values of the attributes, or add other attributes, before the values are assigned to the Okta user profile that will be created for the registering user.

You can only set values for profile fields which already exist in your Okta user profile schema: Registration Inline Hook functionality can only set values; it cannot create new fields.

### data.action

The action that Okta is currently set to take, regarding whether to allow this registration attempt.

There are two possible values:

- `ALLOW` indicates that the registration attempt will be allowed to proceed
- `DENY` indicates that the registration attempt will be terminated (no user will be created in Okta)

The action is `ALLOW` by default (in practice, `DENY` will never be sent to your external service).

Using the `com.okta.action.update` [command](#supported-commands) in your response, you can change the action that Okta will take.

## Objects in response you send

The objects that you can return in the JSON payload of your response are an array of one or more `commands`, to be executed by Okta, or an `error` object, to indicate problems with the registration request. These objects are defined as follows:

### commands

The `commands` object lets you invoke commands to modify or add values to the attributes in the Okta user profile that will be created for this user, as well as to control whether or not the registration attempt is allowed to proceed.

This object is an array, allowing you to send multiple commands in your response. Each array element requires a `type` property and a `value` property. The `type` property is where you specify which of the supported commands you wish to execute, and `value` is where you supply parameters for that command.

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands). | String          |
| value    | Operand to pass to the command.                       | [value](#value) |

For example commands, see the [value](#value) section below.

#### Supported commands

The following commands are supported for the Registration Inline Hook type:

| Command                      | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| com.okta.user.profile.update | Change values of attributes in the user's Okta user profile. |
| com.okta.action.update       | Allow or deny the user's registration.                       |

To set attributes in the user's Okta profile, supply a type property set to `com.okta.user.profile.update`, together with a `value` property set to a list of key-value pairs corresponding to the Okta user profile attributes you want to set. The attributes must already exist in your user profile schema.

To explicitly allow or deny registration to the user, supply a type property set to `com.okta.action.update`, together with a value property set to `{"registration": "ALLOW"}` or `{"registration": "DENY"}`. The default is to allow registration.

Commands are applied in the order in which they appear in the array. Within a single `com.okta.user.profile.update` command, attributes are updated in the order in which they appear in the `value` object.

You can never use a command to update the user's password, but you are allowed to set the values of attributes other than password that are designated sensitive in your Okta user schema. Note, however, that the values of those sensitive attributes, if included as fields in the Profile Enrollment form, are not included in the `data.userProfile` object sent to your external service by Okta. See [data.userProfile](#data-userProfile) above.

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

The same result could also be accomplished by means of two separate `com.okta.user.profile.update` commands, as follows:

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

For `com.okta.action.update` commands, `value` should be an object containing the attribute `action` set to a value of either `ALLOW` or `DENY`, indicating whether the registration should be permitted or not, for example:

```json
{
  "commands": [
    {
      "type": "com.okta.action.update",
      "value": {
        "registration": "DENY"
      }
    }
  ]
}
```

Registrations are allowed by default, so setting a value of `ALLOW` for the `action` field is valid but superfluous.

### error

See [error](/docs/concepts/inline-hooks/#error) for general information about the structure to use for the `error` object.

For the Registration Inline Hook, the `error` object provides a way of displaying an error message to the end user who is trying to register.

* If you're using the Okta Sign-In Widget for Profile Enrollment, only the `errorSummary` messages of the `errorCauses` objects that your external service returns appear as inline errors, given the following:

   * You don't customize the error handling behavior of the Widget.
   * The `location` of `errorSummary` in the `errorCauses` object specifies the correct attribute. See [JSON response payload objects - error](/docs/concepts/inline-hooks/#error).

* If you don't return a value for the `errorCauses` object, and deny the user's registration attempt through the `commands` object in your response to Okta, one of the following generic messages appears to the end user:</br></br>
      `Registration cannot be completed at this time.`</br></br>
      `We found some errors. Please review the form and make corrections.` <ApiLifecycle access="ie" />

* If you don't return an `error` object at all and the registration is denied, the following generic message appears to the end user:</br>
      `Registration denied.`

> **Note:** If you include an error object in your response, no commands are executed and the registration fails. This holds true even if the top-level `errorSummary` and the `errorCauses` objects are omitted.

## Timeout behavior

If there is a response timeout after receiving the Okta request, the Okta process flow stops and registration is denied. The following message appears: "There was an error creating your account. Please try registering again".

## Sample JSON payload of request

```json
{
  "eventId": "GOsk4z6tSSeZo6X08MvKaw",
  "eventTime": "2019-08-27T18:07:24.000Z",
  "eventType": "com.okta.user.pre-registration",
  "eventTypeVersion": "1.0",
  "contentType": "application/json",
  "cloudEventVersion": "0.1",
  "source": "reghawlks3zOkRrau0h7",
  "data": {
    "context": {
      "request": {
        "id": "XWVxW2zcaH5-Ii74OsI6CgAACJw",
        "method": "POST",
        "url": {
          "value": "/api/v1/registration/reghawlks3zOkRrau0h7/register"
        },
        "ipAddress": "98.124.153.138"
      }
    },
    "userProfile": {
      "lastName": "Doe",
      "firstName": "John",
      "login": "john.doe@example.com",
      "email": "john.doe@example.com"
    },
    "action": null
  }
}
```

## Sample JSON payload of response

```json
{
  "commands": [
    {
      "type": "com.okta.action.update",
      "value": {
        "registration": "DENY"
      }
    }
  ],
  "error": {
    "errorSummary": "Incorrect email address. Please contact your admin.",
    "errorCauses": [
      {
        "errorSummary": "Only example.com emails can register.",
        "reason": "INVALID_EMAIL_DOMAIN",
        "locationType": "body",
        "location": "data.userProfile.login",
        "domain": "end-user"
      }
    ]
  }
}
```

## Enable a Registration Inline Hook for Profile Enrollment in Okta Identity Engine

<ApiLifecycle access="ie" /><br>

> **Note:** This feature is only available as a part of the Identity Engine. Please [contact support](mailto:dev-inquiries@okta.com) for further information.

To activate the Inline Hook, you first need to register your external service endpoint with Okta; see [Inline Hook Setup](/docs/concepts/inline-hooks/#inline-hooks_setup).

You then need to associate the registered Inline Hook with your Profile Enrollment policy. (For information on configuring a Profile Enrollment policy, see [Manage Profile Enrollment policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).)

1. Go to **Security > Profile Enrollment**.

1. Click the Pencil icon to edit the policy and associate it with your Registration Inline Hook.

1. In **Enrollment Settings**, click the More Options icon and then select **Edit**. Select **Allowed** for **Sign-up** in the **For new users** section.

1. Select your hook from the drop-down menu for **Use the following inline hook** under the options for **For new users**. If you have created multiple Registration Inline Hooks, you can see all of them displayed here.

1. Click **Save**.

Your Registration Inline Hook is now configured for Profile Enrollment.

> **Note:** Only one Inline Hook can be associated with your Profile Enrollment policy at a time.

## Enable a Registration Inline Hook for Self-Service Registration in the Classic Engine

<ApiLifecycle access="ea" />

> **Note:** Self-Service Registration only exists in the Classic Engine. For the Identity Engine, please see instructions for Profile Enrollment above.

To activate the Inline Hook, you first need to register your external service endpoint with Okta; see [Inline Hook Setup](/docs/concepts/inline-hooks/#inline-hooks_setup).

You then need to associate the registered Inline Hook with your Self-Service Registration policy. (For information on configuring a Self-Service Registration policy, see [Enable and configure a self-service registration policy](https://help.okta.com/okta_help.htm?id=ext_self_service_registration_policy).)

1. Go to **Directory > Self-Service Registration**.

1. Click **Edit**.

1. Select your hook from the **Extension** dropdown. If you have created multiple Registration Inline Hooks, you should see all of them displayed here.

1. Click **Save**.

Your Registration Inline Hook is now configured for Self-Service Registration.

> **Note:** Only one Inline Hook can be associated with your Self-Service Registration policy at a time.
