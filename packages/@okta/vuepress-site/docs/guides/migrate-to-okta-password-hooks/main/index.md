---
title: Import Users with Inline Password Hooks
meta:
  - name: description
    content: Migrate users into Okta as they authenticate using password import inline hooks
layout: Guides
---

This guide explains how to use password import inline hooks to migrate users into Okta as they authenticate.

---

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Postman client to run API requests. See [Use Postman with the Okta REST APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.
* Example or test source data to test user and group creation requests. (Don’t use real user data when testing.)
* [A plan for migrating existing users to Okta](/docs/guides/migrate-to-okta-prerequisites/)

#### Sample code

[Creating users with password import inline hooks](#request-example) for a curl request example

---

## Migration Program Plan

A migration program uses the Okta [password import inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook) feature to seamlessly migrate users as they authenticate:

1. Create all the users from the legacy system in Okta with a provider set to: `IMPORT`. **NOTE:** This can be done in bulk and does NOT require individual user credentials.
2. Optional: Create groups and apps in Okta. Assign users to groups and assign groups and users to apps.
3. Create an application to service requests from Okta that can validate credentials against the legacy user system.
4. Register an Inline Password Hook with Okta that connects to the application created in step 3.

Typically, you run a migration program like this for a set period, such as 60 days. At the end of that time, you delete the inline password hook. For any users that haven’t completed the migration on their own, you can issue a password reset using the Okta API. Those users receive an email to change their password and can then sign in using Okta.

## Create all the users in Okta

You can create users in Okta, without credentials, in a state ready for migration as outlined in the **Create user with password import inline hook** section of the [Users API documentation](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/).

### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password" : {
      "hook": {
        "type": "default"
      }
    }
  }
}' "https://{yourOktaDomain}/api/v1/users?activate=true"
```

### Response Example

```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "status": "ACTIVE",
  "created": "2013-07-02T21:36:25.344Z",
  "activated": null,
  "statusChanged": null,
  "lastLogin": null,
  "lastUpdated": "2013-07-02T21:36:25.344Z",
  "passwordChanged": "2013-07-02T21:36:25.344Z",
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "isaac.brock@example.com",
    "login": "isaac.brock@example.com",
    "mobilePhone": "555-415-1337"
  },
  "credentials": {
    "password": {},
    "provider": {
      "type": "IMPORT",
      "name": "IMPORT"
    }
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

> **Note**: Notice that the user status is `ACTIVE`, but the provider type and name are `IMPORT`.

For more on creating users for password import, see this [reference section](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook).

## Create an Inline Password Hook Application

After configured, when a user with `credentials.provider.type=IMPORT` attempts authenticate, Okta will call _your_ application. Among other things, your application receives the username and plaintext password as submitted by the user. It's up to your application to validate the credentials against your legacy system.

If your application determines the credentials are correct against the legacy system, it would return a response that includes a `"credential": "VERIFIED"` value. The full response looks like this:

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

Okta then sets the supplied password in its backend (properly hashed) and transition the `credentials.provider.type` value from `IMPORT` to `OKTA`. This user is now fully migrated to Okta. From this point forward, when that particular user authenticates, your password hook is no longer called.

For more information on the request from Okta and types of responses your app can return, visit the [Password import inline hook reference](/https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook).

## Register the inline password hook application

For Okta to use your app, you must register the external service endpoint.

> **Note:** The external endpoint must be SSL protected and have a URL that starts with `https://`. Okta doesn't make calls to endpoints that aren’t SSL protected.

In the Admin Console, go to **Workflow** > **Inline Hooks**. Click **Add Inline Hook**.

You can also accomplish this using the [Inline Hooks Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook).

## End the migration program

Typically, you leave the inline password hook endpoint in service for a fixed period, such as 60 days.

During that time, a large percentage of your active users migrate over to Okta without them knowing or being disrupted in their usual workflow.

At the end of the migration program time, you'd do the following to migrate the "stragglers":

1. Use the [User Credentials API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserCred/#tag/UserCred/operation/resetPassword) to force a password reset for those users still with `credentials.provider.type` set to `IMPORT`.
2. Those users would receive an email to set their password with a link to follow.
3. Most active users would set a new password in Okta, which would complete their migration.

When you are in this phase of the migration, you can retire the legacy system from service.
