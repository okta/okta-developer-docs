---
title: Registration Inline Hook
excerpt: Code the external service for a Registration Inline Hook
layout: Guides
---

This guide provides a working example of an Okta Registration Inline Hook. It uses the web site [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Registration Inline Hook calls.

<!-- >> **Note:** This guide is for customers using Okta Identity Engine. If you use Okta Classic Engine, see . -->

---

**Learning outcomes**

* Understand the Okta Registration Inline Hook calls and responses
* Implement a simple working example of a Registration Inline Hook with a Glitch.com project, which acts as an external service
* Preview and test a Registration Inline Hook

**What you need**

* A [Glitch.com](https://glitch.com) project or account.
* An Okta developer org. [Create an org for free](https://developer.okta.com/signup/).

**Sample code**

[Okta Registration Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-registrationhook?path=README.md)

---

In the following example, the external service code parses requests from Okta and responds with commands that indicate whether the end user's email domain is valid and allowed to register.

At a high-level, the following workflow occurs:

1. A user attempts to self-register for your Okta org.
1. A Registration Inline Hook fires during this process and sends a call to the external service with the user's data.
1. The external service evaluates the Okta call to make sure the user is from domain `example.com`.
1. The external service responds to Okta with a command to allow or deny the registration based on the email domain.

## Add Progressive Profile request code

This step includes the code that parses the body of the request received from Okta. These properties contain the credentials submitted by the end user who is trying to self register (self-service registration) or update their profile (Progressive Profile).

The following code allows an external service to supply values for updating attributes on a user profile.

> **Note:** The `requestType` field has a value of either `self.service.registration` or `progressive.profile`, depending on your settings in the Admin Console. <!-- See [link] -->

See the [request properties](/docs/reference/registration-hook/#objects-in-the-request-from-okta) of a Registration Inline Hook for full details.

```javascript
{
    "eventId": "YFtkmR0US_-WRIkMgC9V-g",
    "eventTime": "2021-12-07T22:22:05.000Z",
    "eventType": "com.okta.user.pre-registration",
    "eventTypeVersion": "1.0",
    "contentType": "application/json",
    "cloudEventVersion": "0.1",
    "source": "rul1bufGk5dJdRYw50g4",
    "requestType": "self.service.registration",
    "data": {
        "context": {
            "request": {
                "id": "reqQsH_sl8TSiu9WTC3VfS7yw",
                "method": "POST",
                "url": {
                    "value": "/idp/idx/enroll/update"
                },
                "ipAddress": "127.0.0.1"
            },
            "user": {
                "id": "00u1bspyAvImafPWz0g4",
                "passwordChanged": "2021-10-19T19:56:22.000Z",
                "profile": {
                    "login": "admin@okta.com",
                    "firstName": "Admin",
                    "lastName": "Admin",
                    "locale": "en",
                    "timeZone": "America/Los_Angeles"
                },
                "_links": {
                    "groups": {
                        "href": "http://oie-local.okta1.com:1802/api/v1/users/00u1bspyAvImafPWz0g4/groups"
                    },
                    "factors": {
                        "href": "http://oie-local.okta1.com:1802/api/v1/users/00u1bspyAvImafPWz0g4/factors"
                    }
                }
            }
        },
        "action": "ALLOW",
        "userProfileUpdate": {
            "test1": "value1",
            "test2": "value2"
        }
    }
}
```

> **Note:** The method definition that begins in this code snippet is incomplete. See [Send Progressive Profile response](#send-progressive-profile-response).

## Send Progressive Profile response

The external service responds to Okta indicating whether to accept the user self-registration or profile update by returning a `commands` object in the body of the HTTPS response, using a specified syntax within the object to indicate to Okta that the user should either be denied or allowed to self-register or update their profile.

This response example uses the `com.okta.user.progressive.profile.update` command to supply values for attributes in the response.

See the [response properties](/docs/reference/registration-hook/#objects-in-the-response-from-okta) of a Registration Inline Hook for full details.

```javascript
{
  "commands": [
    {
      "type": "com.okta.user.progressive.profile.update",
      "value": {
        "test1": "value1",
        "test2": "value2"
      }
    }
  ]
}

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

> **Note:** You can also set up an inline hook using the API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook).

### Enable the Registration Inline Hook

You can use Inline Hooks with the Progressive Profile feature to verify and modify user data. See [Progressive Profile support](/docs/concepts/inline-hooks/#progressive-profile-support) for general information about the Progressive Profile feature.

You must [enable and configure a profile enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) to implement a Registration Inline Hook.

> **Note:** Profile Enrollment and Registration Inline Hooks are only supported by the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 4.5 or later.

To associate the Registration Inline Hook with your Profile Enrollment policy:

1. In the Admin Console, go to **Security > Profile Enrollment**.

1. Click the Pencil icon to edit the policy and associate it with your Registration Inline Hook.

1. In **Profile enrollment**, click **Edit**.

1. Select **Allowed** for **Self-service registration**.

1. In **Inline hook**, from the drop-down menu select the hook that you set up and activated. See [Set up and activate the Registration Inline Hook](#set-up-and-activate-the-registration-inline-hook).

    > **Note:** You can associate only one Inline Hook at a time with your Profile Enrollment policy.

1. In **Run this hook**, select when you want your inline hook to run:
    - **When a new user is created**: Your inline hook is triggered once by a self-service registration request and again after the initial registration is completed.
    - **When attributes are collected for an existing user**: Your inline hook is triggered during the progressive profile process.
    - **Both**: Your inline hook is triggered by a self-service registration request and also during the progressive profile process.

1. Click **Save**.

Your Registration Inline Hook is configured for Profile Enrollment. You are now ready to preview and test the example.

## Preview and test

Your Okta org is set up to call the sample external service using a Registration Inline Hook, and the external service is ready to receive and respond to an Okta call.

In your Okta org, you can preview the request and response JSON right from the Admin Console. You can also test the code directly with self-registering users.

### Preview the Registration Inline Hook

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Select the Registration Inline Hook name (in this example, "Guide Registration Hook Code").
3. Click the **Preview** tab.
4. Select a user from your org in the first block titled "Configure Inline Hook request"; that is, a value for the `data.userProfile` object.
5. From the "Preview example Inline Hook request" block, click **Generate Request**.
    You should see the user's request information in JSON format that is sent to the external service.
6. From the "View service's response" block, click **View Response**.
    You should see the response from your external service in JSON format, which either allows or denies the self-registration.

### Test the Registration Inline Hook

To run a test of your Registration Inline Hook, go to the Okta sign-in page for your Okta org, click the **Sign Up** link, and attempt to self-register.

* If you use an allowable email domain, such as `john@example.com`, the user registration goes through.
* If you use an incorrect email domain, the user registration is denied. Review the error message, which displays the error summary from the external service code and is passed back to Okta.

> **Note:** Review [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) for information if encountering any setup or configuration difficulties.

## Next steps

Review the following guides to implement other Inline or Event Hook examples:

* [Event Hook](/docs/guides/event-hook-implementation/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/)
* [Token Inline Hook](/docs/guides/token-inline-hook/)

## See also

For a complete description of this Inline Hook type, see[Registration Inline Hook](/docs/reference/registration-hook/).
