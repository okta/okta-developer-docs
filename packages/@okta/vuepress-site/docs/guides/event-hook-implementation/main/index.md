---
title: Event hook implementation
excerpt: Code an external service for an event hook
layout: Guides
---

This guide provides a working example of an Okta event hook. It uses the website [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Okta event hook calls.

---

**Learning outcomes**

* Understand the Okta event hook calls and responses.
* Implement a working example of an Okta event hook with a Glitch.com project, which acts as an external service.
* Preview and test an Okta event hook.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account

**Sample code**

* [Okta Event Hook: Display Deactivated Users](https://glitch.com/~okta-event-hook)

---

## About event hook implementation

Event hooks are outbound calls from Okta that notify your own applications of events occurring in your Okta org. See [Event hooks](/docs/concepts/event-hooks/) for an overview.

Setting up an event hook in your Okta org requires the following generic steps:

1. Implement your external web service to receive event hook calls from Okta.
1. Register the endpoint of your external service with Okta and configure event hook parameters.
1. Verify to Okta that you control the endpoint.
1. Begin receiving ongoing delivery of event notifications.

The following event hook example uses the Okta event for a user deactivation. When this event occurs, the example external service code receives an Okta request. The external service responds with an acknowledgment to Okta that the request has been received, and displays the deactivated user’s name to the console.

> **Tip:** For another look at an event hook implementation, see the following developer experience blog example by Heather Wallander, [Build Easy User Sync Webhooks with Okta](https://developer.okta.com/blog/2020/07/20/easy-user-sync-hooks).

## Set up the sample external service

This guide uses the website [Glitch.com](https://glitch.com) to act as an external service and to implement the event hook with an Okta org. See the following Glitch project to remix (copy) a working code example that implements an event hook when a user is deactivated: [Okta Event Hook: Display Deactivated Users](https://glitch.com/~okta-event-hook/).

Review the following sections to understand how to receive and parse the event hook call. Or use the code snippets to create the project on your own. If you copy the project, you can go directly to the section [Enable and verify the event hook](#enable-and-verify-the-event-hook), which completes the setup.

### Configure initial event hook verification

Okta event hooks require an initial verification of the external service endpoint before the ongoing triggering of the hook. For more information on this request, see [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

Add the following code to your external service to receive and respond to this one-time verification request.

> **Note:** Also, make sure to have the required default code and packages in your project. See [Overview and considerations](/docs/guides/common-hook-set-up-steps/main) for further information.

<StackSelector snippet="verification" noSelector/>

### Parse the event hook request

Your external service receives the event hook request from Okta after a user is deactivated. Your external service must parse the event object of the request to determine the username or other data required by your external service.

In this example, after parsing the event hook request, the code displays the deactivated user to the console, and then replies to Okta with an empty, successful response (200).

<StackSelector snippet="parse-request" noSelector/>

### Examine the event hook object

The JSON body sent as part of the Okta request includes the properties accessed in this example, namely `target` and `alternateId`. To see this or other event objects, call your Okta org with the [System Log API](/docs/reference/api/system-log), using the specific event type as a [filter parameter](/docs/reference/api/system-log/#filtering-results). For example:

```JavaScript
https://${yourOktaDomain}/api/v1/logs?filter=eventType eq "user.lifecycle.deactivate"
```

<StackSelector snippet="event-object" noSelector/>

## Enable and verify the event hook

Set up and verify the event hook within your Admin Console.

### Set up the event hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the hook (in this example, "Deactivated User Event Hook").

5. In the **URL** field, add your external service URL, including endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/userDeactivated`.

6. Include authentication field and secret. In this example:

    * **Authentication field** = `authorization`

    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the event type you want to monitor. In this example, a user deactivated in the Okta org: `User deactivated`.

8. Click **Save & Continue**.

9. You can complete the one-time verification Okta call now or verify the event hook later. If you’re using the Glitch example, proceed to verification.

> **Note:** You can also set up an event hook using an API. See [Event Hooks Management](/docs/reference/api/event-hooks/#create-event-hook).

### Verify the event hook

Verify the event hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

To complete the one-time verification of the event hook:

* After creating the event hook, and if your external service is ready to handle the request, click **Verify** to complete the one-time verification step.

Or

* After ensuring that your external service is ready for the verification call, go **Workflow > Event Hooks**, click the **Actions** dropdown menu of any **UNVERIFIED** event hook, and select **Verify**.

The event hook now has a status of **VERIFIED** and is ready to send event hook calls to your external service.

## Preview and test the event hook

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is ready to call the external service when an event triggers. In this example, the event triggers when a user is deactivated in the Okta org.

### Preview

To run a preview call of your event hook, sign in to your Okta org as the super admin.

1. In the Admin Console, go to **Workflow** > **Event Hooks**.
2. Locate the event hook that you created during the set-up step. In this example, select `Deactivated User Event Hook` or the name you gave the event hook.
3. Click the **Actions** menu for this hook, and select **Preview**.
4. In the **Configure Event Hook request** section, select an event from the **Event Type** dropdown menu. In this example, there’s only one: `User deactivated (user.lifecycle.deactivate)`.
5. Select a previous recent event (in this case, a user deactivation) from the **System Log Event** drop-down menu. The **Preview & Deliver Event Hook** section populates the JSON body of the event hook. If no event is available, the JSON body populates with sample data.
6. Optionally, click **Edit** to modify the JSON body call. For example, you can change the `target` object's property, `alternateId`, to `john.doe@example.com`.
7. Go to your Glitch application, opening the log console (**Tools** > **Logs**). Ensure your application is listening for requests.
8. Click **Deliver Request**. The event hook preview displays the status request as either successful or a failure. Check your Glitch application console. The following message should display if successful:

     `The user john.doe@example.com has been deactivated on the Okta org!`

### Test

To run a test of your event hook:

1. Start by going to your Glitch application and opening the log console (**Tools** > **Logs**). Ensure your application is listening for requests.
2. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    * Go to **Directory** > **People**, and click **Add Person**.
    * As an example, add the user John Doe as seen from the [Event object sample code](/docs/guides/event-hook-implementation/#examine-the-event-hook-object).
3. For this user, select the User's profile by clicking John Doe's name.
4. Click the **More Actions** dropdown menu, and select **Deactivate**.
5. Confirm the deactivation.
6. Navigate back to your Glitch application's log console. You should see the following output to the console:

    `The user john.doe@example.com has been deactivated on the Okta org!`

> **Note:** Review the [troubleshooting](/docs/guides/common-hook-set-up-steps/-/main/#troubleshoot-hook-implementations) section for information if you encounter any setup or configuration difficulties.

## Next steps

Review the following guides to implement other inline hook examples:

* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)
* [SAML assertion inline hook](/docs/guides/saml-inline-hook)
* [Telephony inline hook](/docs/guides/telephony-inline-hook)

## See also

For background conceptual information on event hooks, see [Event hooks](/docs/concepts/event-hooks/).
