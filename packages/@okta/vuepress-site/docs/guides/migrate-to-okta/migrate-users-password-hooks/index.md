---
title: Import Users with Inline Password Hooks
---

## Migration Program Plan

A migration program utilizes Okta's [Password Import Inline Hook](/docs/reference/password-hook/) feature to seamlessly migrate users as they authenticate. The broad strokes look like:

1. Create all the users from the legacy system in Okta with a provider set to: `IMPORT`. **NOTE:** This can be done in bulk and does NOT require individual user credentials.
2. Optional: Create groups and applications in Okta. Assign users to groups and assign groups and users to applications
3. Create an application to service requests from Okta that can validate credentials against the legacy user system.
4. Register an Inline Password Hook with Okta that connects to the application created in step 3.

Typically, you run a migration program like this for a set period of time, say 60 days. At the end of that time, you delete the inline password hook. For any users that have not completed the migration on their own, you can issue a password reset using the Okta API. Those users would receive an email to change their password and would then be able to login using Okta.

### Create all the users in Okta

You can create users in Okta, without credentials, in a state ready for migration as outlined in the [Create User with Password Import Inline Hook](/docs/reference/api/users/#create-user-with-password-import-inline-hook) section of the docs.


#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
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
}' "https://${yourOktaDomain}/api/v1/users?activate=true"
```

#### Response Example

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
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

> Notice that the user status is `ACTIVE`, but the provider type and name are `IMPORT`.

For more on creating users for password import, see this [reference section](/docs/reference/api/users/#create-user-with-password-import-inline-hook).

### Create an Inline Password Hook Application

Once configured, when a user with `credentials.provider.type=IMPORT` attempts authenticate, Okta will call _your_ application. Among other things, your application receives the username and plaintext password as submitted by the user. It's up to your application to validate the credentials against your legacy system.

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

Okta will then set the supplied password in its backend (properly hashed) and transition the `credentials.provider.type` value from `IMPORT` to `OKTA`. This User is now fully migrated to Okta. From this point forward, when that particular user authenticates, your password hook will no longer be called.

For more information on the Request from Okta and types of Responses your application can return to Okta, visit the [Password Import Inline Hook Reference](/docs/reference/password-hook/).

### Register the Inline Password Hook Application

In order for Okta to use your application, you must register the external service endpoint.

> **NOTE:** The external endpoint must be SSL protected and have a URL that starts with `https://`. Okta will NOT make calls to endpoints that are not SSL protected.

In the Admin Console, go to **Workflow** > **Inline Hooks**. Click **Add Inline Hook**.

You can also accomplish this using the [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

### Ending the Migration Program

Typically, you leave the Inline Password Hook endpoint in service for a fixed period of time - for instance, 60 days.

During that time, a large percentage of your active users will migrate over to Okta without them knowing or being disrupted in their usual workflow.

At the end of the migration program time, you'd do the following to migrate the "stragglers":

1. Use the [Management API](/docs/reference/api/users/#reset-password) to force a password reset for those users still with `credentials.provider.type` set to `IMPORT`.
2. Those users would receive an email to set their password with a link to follow.
3. Most active users would set a new password in Okta, which would complete their migration.

When you are in this phase of the migration, you can retire the legacy system from service.
