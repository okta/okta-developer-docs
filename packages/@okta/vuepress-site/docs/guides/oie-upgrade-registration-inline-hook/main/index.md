---
title: Upgrade registration inline hooks to Identity Engine
---

<ApiLifecycle access="ie" />

This guide explains what changes for your registration inline hook when you upgrade from Okta Classic Engine to Identity Engine, and how to update your external service so that self-service registration functions after the upgrade.

The registration inline hook still triggers during self-service registration and responds with the same `commands` object. However, Identity Engine changes where you enable the hook in the Admin Console and the shape of the inline hook request that Okta sends to your external service. Until you update your external service to consume the new request format, existing hooks may experience compatibility issues. Identity Engine also introduces a new use case for the hook: progressive profile enrollment.

> **Note:** This guide covers the upgrade. After you upgrade, see the [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/) for the complete Identity Engine implementation, including a runnable sample app. For the Classic Engine behavior that you're upgrading from, see [Registration inline hook for Classic Engine](/docs/guides/archive-registration-inline-hook/nodejs/main/).

---

#### Learning outcomes

* Understand what changes for a registration inline hook when you upgrade to Identity Engine.
* Move the hook from the self-service registration page to a user profile policy.
* Update your external service code to read the new Identity Engine inline hook request.
* Test that self-service registration works after the upgrade.

#### What you need

* An [Identity Engine-upgraded Okta org](/docs/guides/oie-upgrade-overview/)
* An existing Classic Engine registration inline hook and external service
* Access to the Admin Console with administrator permissions

#### Sample code

See [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/) for a complete Identity Engine sample app that implements the request handling described in this guide.

---

## What changes during the upgrade

When you upgrade your org from Classic Engine to Identity Engine, the registration inline hook continues to exist as the same hook type, but the following two aspects change:

* Where you enable the hook: In Classic Engine, you enable the hook on the **Self-Service Registration** page. In Identity Engine, self-service registration is driven by a [user profile policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) (profile enrollment), and you enable the hook there instead. See [Move the hook to a user profile policy](#move-the-hook-to-a-user-profile-policy).

* The inline hook request format: Identity Engine adds a `requestType` property to the request and sends a request for a new use case (progressive profile enrollment). Your external service might need code updates to read the new request properly. See [Changes to the inline hook request](#changes-to-the-inline-hook-request).

The way that you create the hook (in the Admin Console under **Workflow** > **Inline Hooks**, or through the [Inline Hooks Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createInlineHook)) doesn't change. The `commands` object that your service returns to allow or deny a registration also stays the same.

> **Note:** To use Identity Engine's profile enrollment and progressive profile enrollment with registration inline hooks, the [Okta Sign-In Widget](/docs/guides/embedded-siw/) must be version 4.5 or later.

## Move the hook to a user profile policy

In Classic Engine, you enable a registration inline hook by selecting it from the **Extension** dropdown menu on the **Self-Service Registration** page (**Directory** > **Self-Service Registration**). That page and the Classic Engine self-service registration feature aren't used in Identity Engine.

In Identity Engine, self-service registration is configured through a user profile policy, and you associate the inline hook with that policy:

1. In the Admin Console, go to **Security** > **User Profile Policies**.
1. Select the user profile policy that applies to your app (or click **Add user profile policy** to create one and add your app to it).
1. Click the **Enrollment** tab, and then click **Edit** in **Profile Enrollment**.
1. For **Self-service registration**, select **Allowed**.
1. From the **Inline hook** menu, select your existing registration inline hook.

   > **Note:** You can associate only one inline hook at a time with a user profile policy.

1. From **Run this hook**, select **When a new user is created**, and then click **Save**.

For profile enrollment options, see [Configure user profile policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) and the detailed steps in [Create an enrollment policy for profile enrollment (SSR)](/docs/guides/registration-inline-hook/nodejs/main/#create-an-enrollment-policy-for-profile-enrollment-ssr).

## Changes to the inline hook request

In both Classic Engine and Identity Engine, the hook triggers before a user is registered (`eventType` is `com.okta.user.pre-registration`). The key difference is that Identity Engine adds a `requestType` property to the request. This property identifies which registration use case triggered the hook, and it determines where in the request the submitted fields arrive:

* `self.service.registration`: A new user self-registers. This is the equivalent of the Classic Engine self-service registration flow. The submitted fields arrive in the `data.userProfile` object.
* `progressive.profile`: An existing user is prompted for more profile information when they sign in. This use case is new in Identity Engine. The submitted fields arrive in the `data.userProfileUpdate` object, and the existing user's current profile is in the `data.context.user.profile` object.

Because Classic Engine has only one registration flow, your existing external service likely reads `data.userProfile` directly without inspecting a request type. After the upgrade, your service must branch on `requestType` so that it reads the correct properties for each use case.

### Self-service registration request

For `self.service.registration`, the submitted fields are in `data.userProfile`, as in Classic Engine:

> **Note:** The `requestType` is `self.service.registration`.

```json
{
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
            "firstName": "Jessie",
            "lastName": "Smith",
            "login": "jessie.smith@example.com",
            "email": "jessie.smith@example.com"
        },
        "action": "ALLOW"
    }
}
```

### Progressive profile enrollment request

For `progressive.profile`, the new or updated fields are in `data.userProfileUpdate`, and the existing user's profile is in `data.context.user.profile`:

> **Note:** The `requestType` is `progressive.profile`.

```json
{
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
                "profile": {
                    "firstName": "Jessie",
                    "lastName": "Smith",
                    "login": "jessie.smith@example.com",
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

See the [registration inline hook request properties](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook) for full details.

## Update your external service code

Update your external service so that it branches on `requestType`. Keep your existing self-service registration logic for `self.service.registration`, and add handling for `progressive.profile` only if you want to use that new use case.

The following Classic Engine example handles the single registration flow by reading `data.userProfile` directly:

```javascript
// Classic Engine: a single registration flow, no requestType
app.post('/registrationHook', async (request, response) => {
  const emailRegistration = request.body.data.userProfile['email'];
  let returnValue = {};

  if (emailRegistration.includes('example.com')) {
    returnValue = {
      commands: [
        { type: 'com.okta.action.update', value: { registration: 'ALLOW' } }
      ]
    };
  } else {
    returnValue = {
      commands: [
        { type: 'com.okta.action.update', value: { registration: 'DENY' } }
      ],
      error: {
        errorSummary: 'Incorrect email address. Please contact your admin.'
      }
    };
  }

  response.send(JSON.stringify(returnValue));
});
```

The following Identity Engine example branches on `requestType`. The `self.service.registration` branch keeps the original allow or deny logic, and the `progressive.profile` branch reads `data.userProfileUpdate` and returns the new `com.okta.user.progressive.profile.update` command:

```javascript
// Identity Engine: branch on requestType
app.post('/registrationHook', async (request, response) => {
  let returnValue = {};

  if (request.body.requestType === 'self.service.registration') {
    // Equivalent to the Classic Engine self-service registration flow
    const emailRegistration = request.body.data.userProfile['email'].split('@');
    if (emailRegistration[1].includes('example.com')) {
      returnValue = {
        commands: [
          { type: 'com.okta.action.update', value: { registration: 'ALLOW' } }
        ]
      };
    } else {
      returnValue = {
        commands: [
          { type: 'com.okta.action.update', value: { registration: 'DENY' } }
        ],
        error: {
          errorSummary: 'Incorrect email address. Please contact your admin.'
        }
      };
    }
  } else if (request.body.requestType === 'progressive.profile') {
    // New in Identity Engine: read the submitted update from data.userProfileUpdate
    const employeeNumber = request.body.data.userProfileUpdate['employeeNumber'];
    if (employeeNumber && employeeNumber.length === 4) {
      returnValue = {
        commands: [
          {
            type: 'com.okta.user.progressive.profile.update',
            value: { employeeNumber: employeeNumber }
          }
        ]
      };
    } else {
      returnValue = {
        commands: [],
        error: {
          errorSummary: 'Enter an employee number with 4 digits.'
        }
      };
    }
  }

  response.status(200).send(JSON.stringify(returnValue));
});
```

> **Note:** If your external service only processes self-service registrations, you can still add the `requestType` check defensively so that a future progressive profile policy doesn't send your service a request that it doesn't expect.

For the complete external service implementation, including the full `error` object and progressive profile policy setup, see [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/).

## Test your upgraded registration inline hook

After you've moved the hook to a user profile policy and updated your external service, verify that registration still works.

1. Make sure that your external service is running and reachable at the URL configured on the inline hook.
1. In the Admin Console, go to **Workflow** > **Inline Hooks**, select your registration inline hook, and click **Preview**. Generate a request with the **Self-Service Registration** request type and confirm that your service returns the expected `ALLOW` or `DENY` response.
1. Go to the sign-in page for your org, click the sign-up link, and attempt to self-register:
   * With an allowed value (for example, an `example.com` email), registration succeeds.
   * With a disallowed value, registration is denied and the `errorSummary` from your service appears on the sign-in page.

For detailed preview and test steps, including progressive profile enrollment, see [Preview the registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/#preview-the-registration-inline-hook) and [Test your registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/#test-your-registration-inline-hook).

> **Note:** Review [Troubleshooting hook implementations](/docs/guides/hooks-best-practices/#troubleshoot-your-hook-implementations) for help with any difficulties during setup or configuration.

## Next steps

* Implement the full Identity Engine hook, including progressive profile enrollment: [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/)
* Continue your org upgrade: [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/) and [Plan embedded auth app upgrades](/docs/guides/oie-upgrade-plan-embedded-upgrades/)
* Upgrade your embedded widget: [Upgrade the Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/)

## See also

* For a complete description of this inline hook type, see the [registration inline hook reference](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook).
* For details on configuring user profile policies, see [Configure user profile policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment).
