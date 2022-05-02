---
title: Registration Inline Hook
excerpt: Code the external service for a Registration Inline Hook
layout: Guides
---

This guide provides working examples of an Okta Registration Inline Hook for Self-Service Registration (SSR) and Progressive Enrollment support. It uses the web site [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Registration Inline Hook calls.

> **Note:** This document is only for Okta Identity Engine. If you’re using Okta Classic Engine, see [Registration Inline Hook for Classic Engine](/docs/guides/archive-registration-inline-hook/nodejs/main/). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

**Learning outcomes**

* Understand the Okta Inline Hook calls and responses for SSR and Progressive Enrollment support.
* Implement working examples of a Registration Inline Hook with a Glitch.com project.
* Preview and test a Registration Inline Hook for SSR and Progressive Enrollment support.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account
* [A Profile Enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment)

**Sample code**

[Okta Registration Inline Hook Example](https://glitch.com/~okta-inlinehook-registrationhook-v2)

---

## About Registration Inline Hook implementation

In the following examples, the external service code parses requests from Okta and responds with commands that indicate the following:

* Whether the end user's email domain is valid and allowed to register (for SSR)
* Whether the end user's employee number is valid and allowed to be added to their profile (for Progressive Enrollment support)

In these examples, you set up your Registration Inline Hook to handle both SSR and Progressive Enrollment support. It is possible to configure one workflow and not the other. However, by configuring "both", you need to set up your code to handle the requests of both. When the end user attempts to self-register or update their profile, Okta dynamically detects the request type. See [Enable the Registration Inline Hook](#enable-the-registration-inline-hook).

For an SSR Inline Hook, at a high level the following workflow occurs:

1. An end user attempts to self-register for your Okta org.
1. A Registration Inline Hook fires during this process and sends a call to the external service with the user's data.
1. The external service evaluates the Okta call to make sure the user is from domain `example.com`.
1. The external service responds to Okta with a command to allow or deny the registration based on the email domain.

For a Progressive Enrollment Inline Hook, at a high level the following workflow occurs:

1. An existing registered user attempts to log in to their profile.
1. A Profile Enrollment policy presents a custom form that asks for additional data from the user.
1. A Registration Inline Hook fires during this process and sends a call to the external service with the user's data.
1. The external service responds to Okta with a command to allow or deny the addition of the new data to the user's profile.

See [Inline Hooks](/docs/concepts/inline-hooks/) for more general information.

<!-- Need to confirm with Erica: If you configure your org to process only SSR and your end user tries to update their profile, your end user receives an error message -->

## Parse SSR request code

This step includes the JSON that parses the body of the request received from Okta. These properties contain the credentials submitted by the end user who is trying to self register (SSR).

See the [request properties](/docs/reference/registration-hook/#objects-in-the-request-from-okta) of a Registration Inline Hook for full details.

```javascript
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

> **Note:** The method definition that begins in this code snippet is incomplete. See [Send response](#send-response).

## Parse Progressive Enrollment request code

The following JSON allows an external service to supply values for updating attributes on a user profile.

See the [request properties](/docs/reference/registration-hook/#objects-in-the-request-from-okta) of a Registration Inline Hook for full details.

```javascript
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

> **Note:** The method definition that begins in this code snippet is incomplete. See [Send response](#send-response).

## Send response

The external service responds to Okta indicating whether to accept the user's self-registration or profile update. The response returns a `commands` object in the body of the HTTPS response, using a specified syntax within the object to indicate to Okta that the user should either be denied or allowed to self-register or update their profile.

See the [response properties](/docs/reference/registration-hook/#objects-in-the-response-from-okta) of a Registration Inline Hook for full details.

```javascript
app.post('/registrationHook', async (request, response) => {
  console.log();

  var returnValue = {};

  if (request.body.requestType === 'progressive.profile') {
    // For example, 'employeeNumber' is an additional attribute collected after user registration.
    console.log('Employee number added to profile: ' + request.body.data.userProfileUpdate['employeeNumber']);
    var employeeNumber = request.body.data.userProfileUpdate['employeeNumber'];
    if (employeeNumber && employeeNumber.length === 4) {
      returnValue = {
        'commands':[
          {
            type: 'com.okta.user.progressive.profile.update',
            value: {
              'employeeNumber': 'E'.concat(employeeNumber),
            }
          }
        ]
      };
    } else {
      returnValue = {
        'commands':[
          {
            type: 'com.okta.action.update',
            value: {
              registration: 'DENY',
            },
          }
        ],
        'error': {
          'errorSummary':'Incorrect employee number. Enter an employee number with 4 digits.',
          'errorCauses':[{
            'errorSummary':'Only employee numbers with 4 digits can register.',
            'reason':'INVALID_EMPLOYEE_NUMBER',
            'locationType':'body',
            'location':'data.userProfile.employeeNumber',
            'domain':'end-user'
          }]
        }
      };
    }
  } else {
    console.log('Email for ' + request.body.data.userProfile['firstName'] + " " + request.body.data.userProfile['lastName'] + " " + request.body.data.userProfile['email']);
    var emailRegistration = request.body.data.userProfile['email'];
    if (emailRegistration.includes('example.com')) {
      returnValue = {
        'commands':[
          {
            type: 'com.okta.user.profile.update',
            value: {
              'login': emailRegistration,
            }
          }
        ]
      };
    } else {
      returnValue = {
        'commands':[
          {
            type: 'com.okta.action.update',
            value: {
              registration: 'DENY',
            },
          }
        ],
        'error': {
          'errorSummary':'Incorrect email address. Please contact your admin.',
          'errorCauses':[{
            'errorSummary':'Only example.com emails can register.',
            'reason':'INVALID_EMAIL_DOMAIN',
            'locationType':'body',
            'location':'data.userProfile.email',
            'domain':'end-user'
          }]
        }
      };
    }
  }

  response.send(JSON.stringify(returnValue));
})
```

## Set up, activate, and enable

The Registration Inline Hook must be set up, activated, and enabled within your Okta Admin Console.

### Set up and activate the Registration Inline Hook

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Click **Add Inline Hook** and select **Registration** from the drop-down menu.
1. Add a name for the hook (in this example, "Guide Registration Hook Code").
1. Add your external service URL, and append it with the endpoint. For example, use your Glitch project name with the endpoint (`registrationHook`):

   `https://your-glitch-projectname.glitch.me/registrationHook`

   * If using Glitch, your project needs to be live to work. For a live project, edit the sample code and create a Glitch remix. To find the live site link, click **Share**.

1. Include the authentication field and secret. In this example:

   * **Authentication Field** = `authorization`
   * **Authorization Secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

1. Click **Save**.

The Registration Inline Hook is now set up with a status of active.

> **Note:** You can also set up an Inline Hook using the API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook).

### Set up the employee number attribute

In the Progressive Enrollment example, you ask users to submit a valid employee number. `employeeNumber`, by default, is a read-only attribute. You need to change `employeeNumber` to `read-write`.

1. In the Admin Console, go to **Directory** > **Profile Editor**.
1. Select **User (default)**.
1. Under **Attributes**, find **Employee Number** and click the information icon.
1. In the **Employee Number** dialog, under **User permission**, select **Read-Write**.
1. Click **Save Attribute**.

Users can now update the employee number in their profile.

### Enable the Registration Inline Hook

To enable the Registration Inline Hook, you must associate it with a Profile Enrollment policy. In this example, you create an enrollment policy specifically for your hook. See [enable and configure a Profile Enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) for more details.

> **Note:** Profile Enrollment and Registration Inline Hooks are only supported by the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 4.5 or later.

To associate the Registration Inline Hook with a Profile Enrollment policy:

1. In the Admin Console, go to **Security > Profile Enrollment**.

1. Click **Add Profile Enrollment Policy**.

1. Give your policy a name (in this example, "Inline Hook"), and then click **Save**.

1. From the list of Enrollment Policies, find **Inline Hook** and click the pencil icon.

1. Click **Manage Apps**, then click **Add Apps to this Policy**.

1. Locate the **Okta Admin Console**, click **Apply**, then click **Close**.

1. Click **Back to Profile Enrollment Policy**.

1. In **Profile enrollment**, click **Edit**.

1. For **Self-service registration**, select **Allowed**.

1. In **Inline hook**, from the drop-down menu select the hook that you set up and activated. See [Set up and activate the Registration Inline Hook](#set-up-and-activate-the-registration-inline-hook).

   > **Note:** You can associate only one Inline Hook at a time with your Profile Enrollment policy.

1. In **Run this hook**, select **Both**. For our examples, this trigger allows both an SSR request and a Progressive Enrollment data update request.

1. Click **Save**.

1. Under **Profile Enrollment Form**, click **Add form input**.

1. From the drop-down menu, select **Employee number**.

1. In the **Add form input** dialog, under **Customize form input**, set **Input requirement** as **Optional**.

1. Slick **Save**.

Your Registration Inline Hook is configured for Profile Enrollment. You are now ready to preview and test the example.

## Preview the Registration Inline Hook

Your Okta org is set up to call the sample external service using a Registration Inline Hook, and the external service is ready to receive and respond to an Okta call.

In your Okta org, you can preview the request and response JSON in the Admin Console.

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Select the Registration Inline Hook name (in this example, **Guide Registration Hook Code**).
1. Click the **Preview** tab.
1. In the **Configure Inline Hook request** block, under **data.user.profile**, select a user from your org. That is, select a value from your `data.userProfile` object.
1. To test an SSR request, under **requestType**, select **Self-Service Registration**.
1. From the **Preview example Inline Hook request** block, select **Generate Request**.
   You should see user's request information in JSON format that is sent to the external service.
1. Click **Edit** to update your request before previewing the response. For this example, change the email domain to `@example.com`.
1. From the **View service's response** block, click **View Response**.
   You should see the response from your external service in JSON format, which either allows or denies the self-registration.
1. To test a profile update, under **data.user.profile** select a user from your org, and under **requestType** select **Progressive Profile**.
1. From the **Preview example Inline Hook request** block, select **Generate Request**.
1. Click **Edit** to update `userProfileUpdate`:
   ```javascript
   "userProfileUpdate": {
      "employeeNumber": "1234"
   ```
1. From the **View service's response** block, click **View Response**.
   You should see the response from your external service in JSON format, which either allows or denies the profile update.

## Test

You can also test the code directly with self-registering or profile-updating users.

### Test the SSR Registration Inline Hook

To run a test of your SSR Registration Inline Hook, go to the Okta sign-in page for your Okta org, click the **Sign Up** link, and attempt to self-register.
> **Note:** The **Employee number** field appears as optional. To test SSR, you can leave **Employee number** blank.

* If you use an allowable email domain, such as `rosario.jones@example.com`, the user registration goes through.
* If you use an incorrect email domain, the user registration is denied. Review the error message, which displays the error summary from the external service code and is passed back to Okta. See [error](/docs/reference/registration-hook/#error).

### Test the Progressive Enrollment Inline Hook

1. Sign in to the Okta Admin Console as an admin.
1. Go to **Security** > **Profile Enrollment**.
1. Under **Profile enrollment form**, find **Employee number** and click **Edit**.
1. Set the **Input requirement** to **Required**.
1. Click **Save**.
1. Log out from the Admin Console and sign in with your new `@example.com` credentials.

* If you use a valid login, the **Employee number** field appears on the next screen.
* If you enter an employee number in a valid format (4 digits), the update goes through.
* If you enter an employee number in an invalid format, the update is denied. Review the error message, which displays the error summary from the external service code and is passed back to Okta. See [error](/docs/reference/registration-hook/#error).

> **Note:** Review [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) for help with any difficulties during setup or configuration.

## Next steps

Review the following guides to implement other Inline or Event Hook examples:

* [Event Hook](/docs/guides/event-hook-implementation/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/)
* [Token Inline Hook](/docs/guides/token-inline-hook/)
* [Telephony Hook](/docs/reference/telephony-hook/)

## See also

For a complete description of this Inline Hook type, see [Registration Inline Hook](/docs/reference/registration-hook/).
