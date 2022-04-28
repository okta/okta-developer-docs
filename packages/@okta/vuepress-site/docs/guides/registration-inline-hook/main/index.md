---
title: Registration Inline Hook
excerpt: Code the external service for a Registration Inline Hook
layout: Guides
---

This guide provides working examples of an Okta Registration Inline Hook for Self-Service Registration (SSR) and progressive profile support. It uses the web site [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Registration Inline Hook calls.

<!-- **Note:** This guide is for customers using Okta Identity Engine. If you use Okta Classic Engine, see [Registration Inline Hook for Classic Engine](/docs/guides/archive-registration-inline-hook/nodejs/main/). -->

---

**Learning outcomes**

* Understand the Okta Inline Hook calls and responses for SSR and progressive profile support.
* Implement simple working examples of a Registration Inline Hook with a Glitch.com project.
* Preview and test a Registration Inline Hook.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account
<!-- include setup for SSR and PP? -->

**Sample code**

[Okta Registration Inline Hook Example](https://glitch.com/~okta-inlinehook-registrationhook-v2)

---

## About Registration Inline Hook implementation

In the following examples, the external service code parses requests from Okta and responds with commands that indicate whether the end user's email domain is valid and allowed to register (for SSR) or update their profile (for progressive profile support).

You can use Registration Inline Hooks for SSR or progressive profile support or both. If you configure "both", you need to set up your code to handle the requests of both. As the end user either self-registers or updates their profile, Okta dynamically detects the request type. See [Enable the Registration Inline Hook](#enable-the-registration-inline-hook).

For SSR, at a high level the following workflow occurs:

1. An end user attempts to self-register for your Okta org.
1. A Registration Inline Hook fires during this process and sends a call to the external service with the user's data.
1. The external service evaluates the Okta call to make sure the user is from domain `example.com`.
1. The external service responds to Okta with a command to allow or deny the registration based on the email domain.

For progressive profile support, at a high level the following workflow occurs:

1. An existing registered user attempts to log in to their profile.
1. A profile enrollment policy presents a custom form that asks for additional data from the user.
1. A Registration Inline Hook fires during this process and sends a call to the external service with the user's data.
1. The external service responds to Okta with a command to add the new data to the user's profile.

See [Inline Hooks](/docs/concepts/inline-hooks/) for more general information.

<!-- Need to confirm with Erica: If you configure your org to process only SSR and your end user tries to update their profile, your end user receives an error message -->

## Add SSR request code

This step includes the code that parses the body of the request received from Okta. These properties contain the credentials submitted by the end user who is trying to self register (SSR).

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
            "firstName": "Alex",
            "lastName": "Jones",
            "login": "alex.jones@example.com",
            "email": "alex.jones@example.com"
        },
        "action": "ALLOW"
    }
}
```

> **Note:** The method definition that begins in this code snippet is incomplete. See [Send SSR response](#send-ssr-response).

## Send SSR response

The external service responds to Okta indicating whether to accept the user self-registration by returning a `commands` object in the body of the HTTPS response, using a specified syntax within the object to indicate to Okta that the user should either be denied or allowed to self-register.

This response example uses the `com.okta.user.profile.update` command to supply values for attributes in the response.

See the [response properties](/docs/reference/registration-hook/#objects-in-the-response-from-okta) of a Registration Inline Hook for full details.

```javascript
{
    "error": null,
    "commands": [
        {
            "type": "com.okta.user.profile.update",
            "value": {
                "test": "_selfRegistration"
            }
        }
    ],
    "debugContext": {}
}

```

## Add progressive profile request code

The following code allows an external service to supply values for updating attributes on a user profile.

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
                    "firstName": "Alex",
                    "lastName": "Jones",
                    "timeZone": "America/Los_Angeles",
                    "login": "alex.jones@example.com",
                    "locale": "en_US"
                },
                "id": "00u48gwcu01WxvNo"
            }
        },
        "action": "ALLOW",
        "userProfileUpdate": {
            "newly_collected_profile_attribute_2": "newly_collected_profile_attribute_value_2",
            "newly_collected_profile_attribute_1": "newly_collected_profile_attribute_value_1"
        }
    }
}
```

> **Note:** The method definition that begins in this code snippet is incomplete. See [Send progressive profile response](#send-progressive-profile-response).

## Send progressive profile response

The external service responds to Okta indicating whether to accept the user self-registration by returning a `commands` object in the body of the HTTPS response, using a specified syntax within the object to indicate to Okta that the user should either be denied or allowed to self-register.

This response example uses the `com.okta.user.profile.update` command to supply values for attributes in the response.

See the [response properties](/docs/reference/registration-hook/#objects-in-the-response-from-okta) of a Registration Inline Hook for full details.

```javascript
{
    "error": null,
    "commands": [
        {
            "type": "com.okta.user.progressive.profile.update",
            "value": {
                "test": "_progressiveProfiling"
            }
        }
    ],
    "debugContext": {}
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

You must [enable and configure a profile enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) to implement a Registration Inline Hook.

Also, you can use Inline Hooks with progressive profile support to verify and modify user data. See [Progressive Profile support](/docs/concepts/inline-hooks/#progressive-profile-support).

> **Note:** Profile enrollment and Registration Inline Hooks are only supported by the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 4.5 or later.

To associate the Registration Inline Hook with your Profile Enrollment policy:

1. In the Admin Console, go to **Security > Profile Enrollment**.

1. Click the Pencil icon to edit the policy and associate it with your Registration Inline Hook.

1. In **Profile enrollment**, click **Edit**.

1. Select **Allowed** for **Self-service registration**.

1. In **Inline hook**, from the drop-down menu select the hook that you set up and activated. See [Set up and activate the Registration Inline Hook](#set-up-and-activate-the-registration-inline-hook).

   > **Note:** You can associate only one Inline Hook at a time with your Profile Enrollment policy.

1. In **Run this hook**, select when you want your inline hook to run:
   * **When a new user is created**: This trigger occurs during a self-service registration request.
   * **When attributes are collected for an existing user**: This trigger occurs during a progressive profile sign-in request.
   * **Both**: This trigger occurs during a self-service registration request and a progressive profile sign-in request.

1. Click **Save**.

Your Registration Inline Hook is configured for Profile Enrollment. You are now ready to preview and test the example.

## Preview and test

Your Okta org is set up to call the sample external service using a Registration Inline Hook, and the external service is ready to receive and respond to an Okta call.

In your Okta org, you can preview the request and response JSON right from the Admin Console. You can also test the code directly with self-registering users.

### Preview the Registration Inline Hook

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Select the Registration Inline Hook name (in this example, "Guide Registration Hook Code").
1. Click the **Preview** tab.
1. In the "Configure Inline Hook request" block, under "data.user.profile", select a user from your org. That is, select a value from your `data.userProfile` object.
1. Under "requestType", select **Self-Service Registration** or **Progressive Profile**.
1. From the "Preview example Inline Hook request" block, click **Generate Request**.
   You should see the user's request information in JSON format that is sent to the external service.
1. From the "View service's response" block, click **View Response**.
   You should see the response from your external service in JSON format, which either allows or denies the self-registration.

### Test the Registration Inline Hook

To run a test of your SSR Registration Inline Hook, go to the Okta sign-in page for your Okta org, click the **Sign Up** link, and attempt to self-register.

* If you use an allowable email domain, such as `john@example.com`, the user registration goes through.
* If you use an incorrect email domain, the user registration is denied. Review the error message, which displays the error summary from the external service code and is passed back to Okta.

To run a test of your progressive profile Registration Inline Hook, go to the Okta sign-in page for your Okta org and attempt to sign in.



> **Note:** Review [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) for information if encountering any setup or configuration difficulties.

## Next steps

Review the following guides to implement other Inline or Event Hook examples:

* [Event Hook](/docs/guides/event-hook-implementation/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/)
* [Token Inline Hook](/docs/guides/token-inline-hook/)

## See also

For a complete description of this Inline Hook type, see[Registration Inline Hook](/docs/reference/registration-hook/).
