---
title: User Import Inline Hook Reference
excerpt: Add custom logic to the user import process.
---

# User Import Inline Hook Reference

<ApiLifecycle access="ea" />

This page provides reference documentation for:

- JSON objects contained in the outbound request from Okta to your external service

- JSON objects you can include in your response

This information is specific to the User Import Inline Hook, one type of Inline Hook supported by Okta.

## See also

For a general introduction to Okta Inline Hooks, see [Inline Hooks](/docs/concepts/inline-hooks/).

For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

For steps to enable this Inline Hook, see below, [Enabling a User Import Inline Hook](#enabling-a-user-import-inline-hook).

## About

The User Import Inline Hook enables you to add custom logic to the process of importing new users into Okta from an app.

You can resolve conflicts in user name or other profile attributes, modify values of profile attributes, and control whether the imported user is treated as a match for an existing user or not.

The hook is invoked for each user being imported, at the point immediately after any applicable profile attribute mappings have been applied, and any potential matches with existing users have been found, but before the Okta user profile is created.

## Objects in the request from Okta

The outbound call from Okta to your external service will include the following objects in its JSON payload:

### data.appUser.profile

Provides the name-value pairs of the attributes contained in the app user profile of the user who is being imported. You can change the values of attributes in the user's app profile by means of the `commands` object you return. If you change attributes in the app profile, they will then flow through to the Okta user profile, based on matching and mapping rules.

### data.user

Provides information on the Okta user profile currently set to be used for the user who is being imported, based on the matching rules and attribute mappings that were applied.

`data.user.profile` contains the name-value pairs of the attributes in the user profile.  If the user has been matched to an existing Okta user, a `data.user.id` object will be included, containing the unique identifier of the Okta user profile.

You can change the values of the attributes by means of the `commands` object you return.

### data.action.result

The current default action that Okta will take in the case of the user being imported. The two possible values are:

- `CREATE_USER`: A new Okta user profile will be created for the user.
- `LINK_USER`: The user will be treated as a match for the existing Okta user identified by the value of `data.user.id`.

 You can change the action that will be taken by means of the `commands` object you return.

### data.context

This object contains a number of sub-objects, each of which provides some type of contextual information. You cannot affect these objects by means of the commands you return. The following sub-objects are included:

- `data.context.conflicts`: List of user profile attributes that are in conflict.
- `data.context.application`: Details of the app from which the user is being imported.
- `data.context.job`: Details of the import job being run.
- `data.context.matches`: List of Okta users currently matched to the app user based on import matching. There can be more than one match.
- `data.context.policy`: List of any Policies that apply to the import matching.

## Objects in response you send

The `commands` and `error` objects that you can return in the JSON payload of your response are defined as follows:

### commands

The `commands` object is where you can provide commands to Okta. It is an array, allowing you to send multiple commands. Each array element needs to consist of the following name-value pair:

| Property | Description                                           | Data Type       |
|----------|-------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands). | String          |
| value    | The parameter to pass to the command.                 | [value](#value) |

#### Supported commands

The following commands are supported for the User Import Inline Hook type:

| Command                         | Description                                                                                                              |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| com.okta.appUser.profile.update | Change values of attributes in the user's app user profile.                                                              |
| com.okta.user.profile.update    | Change values of attributes in the user's Okta user profile.                                                             |
| com.okta.action.update          | Specify whether to create a new Okta user for the user being imported or treat them as a match of an existing Okta user. |
| com.okta.user.update            | Specify the existing Okta user that the imported user should be treated as a match of.                                   |

When using the `com.okta.action.update` command to specify that the user should be treated as a match, you need to also provide a `com.okta.user.update` command that serves to specify which Okta user to match to. See [Specifying that the User is a Match](#specifying-that-the-user-is-a-match) below.

#### value

The `value` object is the parameter to pass to the command. In the case of the `com.okta.appUser.profile.update` and `com.okta.user.profile.update` commands, the parameter should be a list of one or more profile attributes and the values you wish to set them to, for example:

```json
{
  "commands": [{
    "type": "com.okta.user.profile.update",
    "value": {
      "firstName": "Stan"
    }
  }]
}
```

In the case of the `com.okta.action.update` command, the parameter should be a `result` property set to either `CREATE_USER` or `LINK_USER`, for example:

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "result": "CREATE_USER"
    }
  }]
}
```

#### Specifying that the user is a match

When using the `com.okta.action.update` command to specify that the user should be treated as a match, you need to also provide a `com.okta.user.update` command that sets the `id` of the Okta user, for example:

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "result": "LINK_USER"
    }
  }, {
    "type": "com.okta.user.update",
    "value": {
      "id": "00garwpuyxHaWOkdV0g4"
    }
  }]
}
```

### error

When you return an error object, it should contain an `errorSummary` sub-object:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error. | String    |

Returning an error object will cause Okta to record a failure event in the Okta System Log. The string you supplied in the `errorSummary` property of the `error` object will be recorded in the System Log event.

>**Note:** If a response to the Import Inline Hook request is not received from your external service within 3 seconds, a timeout occurs. In this scenario, the Okta import process continues and the user is created.

## Timeout behavior

If the external service times out after receiving an Okta request, the Okta process flow continues and the user is created.

## Sample JSON payload of request from Okta to your external service

```json
{
   "source":"cal7eyxOsnb20oWbZ0g4",
   "eventId":"JUGOUiYZTaKPmH6db0nDag",
   "eventTime":"2019-02-27T20:59:04.000Z",
   "eventTypeVersion":"1.0",
   "cloudEventVersion":"0.1",
   "eventType":"com.okta.import.transform",
   "contentType":"application/json",

   "data":{
      "context":{
         "conflicts":[
            "login"
         ],
         "application":{
            "name":"test_app",
            "id":"0oa7ey7aLRuBvcYUD0g4",
            "label":"app7ey6eU5coTOO5v0g4",
            "status":"ACTIVE"
         },
         "job":{
            "id":"ij17ez2AWtMZRfCZ60g4",
            "type":"import:users"
         },
         "matches":[

         ],
         "policy":[
            "EMAIL",
            "FIRST_AND_LAST_NAME"
         ]
      },

      "action":{
         "result":"CREATE_USER"
      },

      "appUser":{
         "profile":{
            "firstName":"Sally2",
            "lastName":"Admin2",
            "mobilePhone":null,
            "accountType":"PRO",
            "secondEmail":null,
            "failProvisioning":null,
            "failDeprovisioning":null,
            "externalId":"user221",
            "groups":[
               "everyone@clouditude.net",
               "tech@clouditude.net"
            ],
            "userName":"administrator2",
            "email":"sally.admin@clouditude.net"
         }
      },

      "user":{
         "profile":{
            "lastName":"Admin2",
            "zipCode":null,
            "city":null,
            "secondEmail":null,
            "postAddress":null,
            "login":"sally.admin@clouditude.net",
            "firstName":"Sally2",
            "primaryPhone":null,
            "mobilePhone":null,
            "streetAddress":null,
            "countryCode":null,
            "typeId":null,
            "state":null,
            "email":"sally.admin@clouditude.net"
         }
      }
   }
}
```

## Sample JSON payloads of responses from your external service to Okta

```json
{
  "commands": [{
    "type": "com.okta.action.update",
    "value": {
      "result": "LINK_USER"
    }
  }, {
    "type": "com.okta.user.update",
    "value": {
      "id": "00garwpuyxHaWOkdV0g4"
    }
  }]
}

{
  "commands": [{
    "type": "com.okta.user.profile.update",
    "value": {
      "firstName": "Stan"
    }
  }]
}

{
  "commands": [{
    "type": "com.okta.user.profile.update",
    "value": {
      "firstName": "Stan"
    }
  }]
}

{
  "commands": [{
    "type": "com.okta.appUser.profile.update",
    "value": {
      "firstName": "Stan",
      "lastName": "Lee"
    }
  }]
}
```

## Enabling a User Import Inline Hook

To activate the Inline Hook, you first need to register your external service endpoint with Okta using the [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

You then need to associate the registered Inline Hook with an app by completing the following steps in Admin Console:

1. Go to the **Applications** menu and scroll down to **Applications**.

1. Select the app that you want the Inline Hook to work with.

1. Select the **Provisioning** tab.

1. From the Settings column on the left side of the screen, select **To Okta**.

1. In the **Inline Hooks** section, click the **User Creation** dropdown menu. Any Inline Hooks you have registered will be listed. Select the one to use.

1. Click **Save**.

> **Note:** The above procedure for associating a User Import Inline Hook with an app using Admin Console cannot be used with AD or LDAP.
