---
title: Registration Inline Hook
excerpt: Code the external service for a Registration Inline Hook
layout: Guides
---

This guide provides a working example of an Okta Registration Inline Hook. It uses the web site [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Registration Inline Hook calls.

---

**Learning outcomes**

* Understand the Okta Registration Inline Hook calls and responses
* Implement a simple working example of a Registration Inline Hook with a Glitch.com project, which acts as an external service
* Preview and test a Registration Inline Hook

**What you need**

* A [Glitch.com](https://glitch.com) project or account.
* An Okta developer org. [Create an org for free](https://developer.okta.com/signup/).

**Sample code**

* [Okta Registration Inline Hook Example](https://glitch.com/~okta-inlinehook-registrationhook)

---

In the following example, the external service code parses requests from Okta and responds with commands that indicate whether the end user's email domain is valid and allowed to register.

At a high-level, the following workflow occurs:

1. A user attempts to self-register for your Okta org.
1. A Registration Inline Hook fires during this process and sends a call to the external service with the user's data.
1. The external service evaluates the Okta call to make sure the user is from domain "example.com".
1. The external service responds to Okta with a command to allow or deny the registration based on the email domain.

## Add request code

This step includes the code that parses the body of the request received from Okta, which gets the values of `data.userProfile`. These properties contain the credentials submitted by the end user who is trying to self register.

<StackSelector snippet="get-submitted-credentials"/>

## Send response

The external service responds to Okta indicating whether to accept the user self-registration, or not, by returning a `commands` object in the body of the HTTPS response, using a specified syntax within the object to indicate to Okta that the user should either be denied or allowed to self-register.

<StackSelector snippet="send-response" noSelector/>

## Activate and enable

The Registration Inline Hook must be set up and activated and enabled within your Okta Admin Console.

To set up and activate the Registration Inline Hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Click **Add Inline Hook** and select **Registration** from the drop-down menu.
3. Add a name for the hook (in this example, "Guide Registration Hook Code").
4. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint:  `https://your-glitch-projectname.glitch.me/registrationHook`.
5. Include authentication field and secret. In this example:

    * **Authentication Field** = `authorization`
    * **Authorization Secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`
6. Click **Save**.

The Registration Inline Hook is now set up with a status of active.

> **Note:** You can also set up an inline hook using an API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook) for further information.

### Enable the Registration Inline Hook

The procedure to enable the Registration Inline Hook is dependent on the type of org you are using: Okta Identity Engine or Okta Classic Engine. Follow the procedure for your specific org.

#### Enable a Registration Inline Hook in the Identity Engine

<ApiLifecycle access="ie" />
If you have an Identity Engine org, you must [enable and configure a profile enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment) to implement a Registration Inline Hook.

> **Note:** Profile Enrollment and Registration Inline Hooks are only supported with the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 4.5 or later.

To associate the Registration Inline Hook with your Profile Enrollment policy:

1. In the Admin Console, go to **Security > Profile Enrollment**.

1. Click the Pencil icon to edit the policy and associate it with your Registration Inline Hook.

1. In **Enrollment Settings**, click the More Options icon and then select **Edit**. Select **Allowed** for **Sign-up** in the **For new users** section.

1. Select your hook from the drop-down menu for **Use the following inline hook** under the options for **For new users** that you've set up an activated previously ("Guide Registration Hook Code"). The drop-down menu displays all the Registration Inline Hooks you have created.

1. Click **Save**.

Your Registration Inline Hook is now configured for Profile Enrollment. You are now ready to preview and test the example.

> **Note:** Only one Inline Hook can be associated with your Profile Enrollment policy at a time.

#### Enable the Registration Inline Hook in the Classic Engine

<ApiLifecycle access="ea" />
If you have a Classic Engine org, you must enable [self-service registration (SSR)](/docs/guides/set-up-self-service-registration/) to implement a Registration Inline Hook.

> **Note:** Self-service registration and Registration Inline Hooks are only supported with the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) version 2.9 or later.

To enable the Registration Inline Hook on the self-service registration page:

1. In the Admin Console, go to **Directory** > **Self-Service Registration**.

1. Click **Edit**.

1. From the **Extension** field drop-down menu, select the hook you've set up and activated previously ("Guide Registration Hook Code").

1. Click **Save**.

The Registration Inline Hook is now enabled for self-service registration. You are now ready to preview and test the example.

## Preview and test

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service using a Registration Inline Hook.

In your Okta org, you can preview the request and response JSON right from the Admin Console. You can also test the code directly with self-registering users.

### Preview

To preview the Registration Inline Hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
2. Select the Registration Inline Hook name (in this example, "Guide Registration Hook Code").
3. Click the **Preview** tab.
4. Select a user from your org in the first block titled "Configure Inline Hook request"; that is, a value for the  `data.userProfile` value.
5. From the "Preview example Inline Hook request" block, click **Generate Request**.
    You should see the user's request information in JSON format that is sent to the external service.
6. From the "View service's response" block, click **View Response**.
    You will see the response from your external service in JSON format, which either allows or denies the self-registration.

### Test

To run a test of your Registration Inline Hook, go to the Okta sign-in page for your Okta org, click the "Sign Up" link, and attempt to self-register.

* If you use an allowable email domain, such as `john@example.com`, the user registration goes through.
* If you use an incorrect email domain, the user registration is denied; review the error message, which displays the error summary from the external service code and is passed back to Okta.

> **Note:** Review [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) for information if encountering any setup or configuration difficulties.

## Next steps

Review the following guides to implement other Inline or Event Hook examples:

* [Event Hook](/docs/guides/event-hook-implementation/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/)
* [Token Inline Hook](/docs/guides/token-inline-hook/)

## See also

For further background on the Registration Inline Hook, see:

* [Registration Inline Hook](/docs/reference/registration-hook/) for a complete description of this Inline Hook type.