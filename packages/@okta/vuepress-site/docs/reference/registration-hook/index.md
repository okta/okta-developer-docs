---
title: Registration inline hook reference
excerpt: Customize handling of user registration requests in Profile Enrollment
---

# Registration inline hook reference

The Registration Inline Hook API reference is now available at the new [Okta API reference portal](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook)

Explore the [Okta Public API Collections](https://www.postman.com/okta-eng/workspace/okta-public-api-collections/overview) workspace to get started with the Inline Hook API Postman Collection.

<!--

This page provides reference documentation for registration import inline hooks, one type of inline hook supported by Okta. It provides sample JSON objects that are contained in the outbound request from Okta to your external service, and sample JSON objects that you can include in your response.

## See also

For a general introduction to Okta inline hooks, see [inline hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

For steps to set up and activate the registration inline hook, see [Set up and activate the registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/#set-up-your-glitch-project).

For steps to enable this inline hook, see [Enabling a registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/#enable-the-registration-inline-hook).

For an example implementation of this inline hook, see [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/).

## About

The Okta registration inline hook allows you to integrate your own custom code into Okta's [Profile Enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) flow. The hook is triggered after Okta receives the registration or profile update request. Your custom code can:

- Allow or deny the registration attempt, based on your own validation of the information the user has submitted
- Set or override the values that are populated in attributes of the user's Okta profile

> **Note:** Profile Enrollment and self-service registration (SSR) inline hooks only work with the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 4.5 or later.

## Objects in the Request from Okta

The outbound call from Okta to your external service includes the following objects in its JSON payload:

### requestType

OTP request or event for which this transaction is being requested: self-service registration (SSR) or Progressive Enrollment.

Values for `requestType` are one of the following:

| Enum Value | Associated Okta Event |
|----------|-------------------------------------------------------|
| `self.service.registration` | self-service registration (SSR) |
| `progressive.profile` | Progressive Enrollment |

### data.userProfile

This object appears in SSR requests from Okta. The object contains name-value pairs for each registration related attribute supplied by the user in the Profile Enrollment form, including:

- `lastName`
- `firstName`
- `login`
- `email`
- other custom attributes on the Sign-In Widget

The following attributes aren't included in the `data.userProfile` object:

- the `password` field
- any fields corresponding to user profile attributes marked as sensitive in your Okta user schema

Using the `com.okta.user.profile.update` commands you send in your response, you can modify the values of the attributes, or add other attributes, before the values are assigned to the Okta user profile that will be created for the registering user.

You can only set values for profile fields which already exist in your Okta user profile schema. Registration inline hook functionality can only set values. It can't create new fields.

### data.UserProfileUpdate

<ApiLifecycle access="ie" /><br>

This object appears in Progressive Profile requests from Okta. The object contains the delta between existing name-value pairs and the attributes that your end user wants to update.

Use the `com.okta.user.progressive.profile.update` command in your response to progressively change the values of delta attributes in the user's Okta profile.

> **Note:** You can also allow end users to update non-sensitive attributes in addition to the delta attributes Okta sends in the request.

### data.action

> **Note:** The `data.action` object can appear in both SSR and Progressive Profile requests.

The action that Okta is currently set to take, regarding whether to allow this registration attempt.

There are two possible values:

- `ALLOW` indicates that the registration attempt will be allowed to proceed
- `DENY` indicates that the registration attempt will be terminated (no user will be created in Okta)

The action is `ALLOW` by default (in practice, `DENY` will never be sent to your external service).

Using the `com.okta.action.update` [command](#supported-commands) in your response, you can change the action that Okta will take.-->

<!-- Need to clarify if we need to include this in the docs. right now, it has no content. in the context of the registration inline hook guide, it allows customers to include the object in the console.log().

### data.context.user

<ApiLifecycle access="ie" /><br> -->

<!--

## Response objects that you send

The objects that you can return in the JSON payload of your response are an array of one or more `commands`, to be executed by Okta, or an `error` object, to indicate problems with the registration request. 

<HookResponseSize/>

The response objects are defined as follows:

### commands

The `commands` object lets you invoke commands to modify or add values to the attributes in the Okta user profile that will be created for this user, as well as to control whether or not the registration attempt is allowed to proceed.

This object is an array, allowing you to send multiple commands in your response. Each array element requires a `type` property and a `value` property. The `type` property is where you specify which of the supported commands you wish to execute, and `value` is where you supply parameters for that command.

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands). | String          |
| value    | Operand to pass to the command.                       | [value](#value) |

For example commands, see the [value](#value) section below.

#### Supported commands

The following commands are supported for the registration inline hook type:

| Command                      | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| com.okta.user.profile.update | Change attribute values in the user's Okta user profile. For SSR only. Invalid if used with a Progressive Profile response.  |
| com.okta.action.update       | Allow or deny the user's registration.                       |
| com.okta.user.progressive.profile.update   | Change attribute values in the user's Okta Progressive Profile. <ApiLifecycle access="ie" /> |

To set attributes in the user's Okta profile, supply a type property set to `com.okta.user.profile.update`, together with a `value` property set to a list of key-value pairs corresponding to the Okta user profile attributes you want to set. The attributes must already exist in your user profile schema.

To explicitly allow or deny registration to the user, supply a type property set to `com.okta.action.update`, together with a value property set to `{"registration": "ALLOW"}` or `{"registration": "DENY"}`. The default is to allow registration.

In Okta Identity Engine, to set attributes in the user's profile, supply a type property set to `com.okta.user.progressive.profile.update`, together with a `value` property set to a list of key-value pairs corresponding to the Progressive Enrollment attributes that you want to set. See [Registration inline hook - Send response](/docs/guides/registration-inline-hook/nodejs/main/#send-response). <ApiLifecycle access="ie" />

Commands are applied in the order that they appear in the array. Within a single `com.okta.user.profile.update` or `com.okta.user.progressive.profile.update` command, attributes are updated in the order that they appear in the `value` object.

You can never use a command to update the user's password, but you are allowed to set the values of attributes other than password that are designated sensitive in your Okta user schema. However, the values of those sensitive attributes, if included as fields in the Profile Enrollment form, aren't included in the `data.userProfile` object sent to your external service by Okta. See [data.userProfile](#data-userProfile).

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

For the registration inline hook, the `error` object provides a way of displaying an error message to the end user who is trying to register or update their profile.

> **Note:** Generic Progressive Enrollment error messages are only available in the Identity Engine.

* If you're using the Okta Sign-In Widget for Profile Enrollment, only the `errorSummary` messages of the `errorCauses` objects that your external service returns appear as inline errors, given the following:

   * You don't customize the error handling behavior of the widget.
   * The `location` of `errorSummary` in the `errorCauses` object specifies the request object's user profile attribute.

* If you don't return a value for the `errorCauses` object, and deny the user's registration attempt through the `commands` object in your response to Okta, one of the following generic messages appears to the end user:

   * "Registration cannot be completed at this time." (SSR)
   * "We found some errors. Please review the form and make corrections." (Progressive Enrollment)

* If you don't return an `error` object at all and the registration is denied, the following generic message appears to the end user:

   * "Registration denied." (SSR)
   * "Profile update denied." (Progressive Enrollment)

> **Note:** If you include an error object in your response, no commands are executed and the registration fails. This holds true even if the top-level `errorSummary` and the `errorCauses` objects are omitted.

## Timeout behavior

If there is a response timeout after receiving the Okta request, the Okta process flow stops. Depending on the request, either the self-service registration or the profile update is denied. One of the following default UI messages appears:

* "There was an error creating your account. Please try registering again." (SSR)
* "Your profile couldn't be updated at this time. Please try again later." (Profile Enrollment)

## Sample SSR request

The following is an example of a JSON request received from Okta. The request properties contain data submitted by the end user who is trying to self register.

See [request properties](#objects-in-the-request-from-okta) for full details.

```json
{
    "eventId": "04Dmt8BcT_aEgM",
    "eventTime": "2022-04-25T17:35:27.000Z",
    "eventType": "com.okta.user.pre-registration",
    "eventTypeVersion": "1.0",
    "contentType": "application/json",
    "cloudEventVersion": "0.1",
    "source": "regt4qeBKU29vSoPz0g3",
    "requestType": "self.service.registration",
    "data": {
        "context": {
            "request": {
                "method": "POST",
                "ipAddress": "127.0.0.1",
                "id": "123dummyId456",
                "url": {
                    "value": "/idp/idx/enroll/new"
                }
            }
        },
        "userProfile": {
            "firstName": "Rosario",
            "lastName": "Jones",
            "login": "rosario.jones@example.com",
            "email": "rosario.jones@example.com"
        },
        "action": "ALLOW"
    }
}
```

## Sample SSR responses

The external service responds to Okta indicating whether to accept the end user's self-registration attempt. If self-registration is allowed, an update to a user profile attribute can also be returned. The `commands` object in the body of the HTTPS response contains specific syntax that configures these operations.

See [response properties](#response-objects-that-you-send) for full details.

### Sample SSR response to update a user profile

The following sample response shows a successful self-registration attribute update using `com.okta.user.profile.update`:

```json
{
    "commands": [
        {
            "type": "com.okta.user.profile.update",
            "value": {
                "login": "first.last@example.com"
            }
        }
    ]
}
```

### Sample SSR response to deny a user registration

The following sample response uses the `DENY` value and a custom error caused by an invalid email domain:

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
                "location": "data.userProfile.email",
                "domain": "end-user"
            }
        ]
    }
}
```

## Sample progressive enrollment request

The following JSON example provides the end user's profile data to the external service for evaluation.

See [request properties](#objects-in-the-request-from-okta) for full details.

```json
{
    "eventId": "vzYp_zMwQu2htIWRbNJdfw",
    "eventTime": "2022-04-25T04:04:41.000Z",
    "eventType": "com.okta.user.pre-registration",
    "eventTypeVersion": "1.0",
    "contentType": "application/json",
    "cloudEventVersion": "0.1",
    "source": "regt4qeBKU29vS",
    "requestType": "progressive.profile",
    "data": {
        "context": {
            "request": {
                "method": "POST",
                "ipAddress": "127.0.0.1",
                "id": "123dummyId456",
                "url": {
                    "value": "/idp/idx/enroll/update"
                }
            },
            "user": {
                "passwordChanged": "2022-01-01T00:00:00.000Z",
                "_links": {
                    "groups": {
                        "href": "/api/v1/users/00u48gwcu01WxvNol0g7/groups"
                    },
                    "factors": {
                        "href": "/api/v1/users/00u48gwcu01WxvNol0g7/factors"
                    }
                },
                "profile": {
                    "firstName": "Rosario",
                    "lastName": "Jones",
                    "timeZone": "America/Los_Angeles",
                    "login": "rosario.jones@example.com",
                    "locale": "en_US"
                },
                "id": "00u48gwcu01WxvNo"
            }
        },
        "action": "ALLOW",
        "userProfileUpdate": {
            "employeeNumber": "1234"
        }
    }
}
```

## Sample progressive enrollment responses

The external service responds to Okta indicating whether to accept the end user's profile update. The response returns a `commands` object in the body of the HTTPS response. This object contains specific syntax that indicates whether the user is allowed or denied to update their profile with Okta.

See [response properties](#response-objects-that-you-send) for full details.

### Sample progressive enrollment response to update a user profile

The following sample response shows the addition of an employee number to an end user's profile:

```json
{
    "commands": [
        {
            "type": "com.okta.user.progressive.profile.update",
            "value": {
                "employeeNumber": "1234"
            }
        }
    ]
}
```

### Sample progressive enrollment response to deny a user registration

The following sample response uses the `DENY` value and a custom error caused by an invalid employee number:

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
        "errorSummary": "Incorrect employee number. Enter an employee number with 4 digits.",
        "errorCauses": [
            {
                "errorSummary": "Only employee numbers with 4 digits can register.",
                "reason": "INVALID_EMPLOYEE_NUMBER",
                "locationType": "body",
                "location": "data.userProfile.employeeNumber",
                "domain": "end-user"
            }
        ]
    }
}
``` -->
