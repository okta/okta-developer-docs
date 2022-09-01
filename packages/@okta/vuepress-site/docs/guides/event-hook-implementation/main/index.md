---
title: Event hook implementation
excerpt: Code an external service for an event hook
layout: Guides
---

This guide provides a working example of an Okta event hook. It uses the website [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Okta event hook calls.

---

**Learning outcomes**

* Understand the Okta event hook calls and responses.
* Implement a simple working example of an Okta event hook with a Glitch.com project, which acts as an external service.
* Preview and test an Okta event hook.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account

**Sample code**

* [Okta Event Hook: Display Deactivated Users](https://glitch.com/~okta-event-hook)

---

## About event hook implementation

Event hooks are outbound calls from Okta that can be used to notify your own software systems of events occurring in your Okta org. See [Event hooks](/docs/concepts/event-hooks/) for an overview.

Setting up an event hook in your Okta org requires the following generic steps:

1. Implement your external web service to receive event hook calls from Okta.
1. Register the endpoint of your external service with Okta and configure event hook parameters.
1. Verify to Okta that you control the endpoint.
1. Begin receiving ongoing delivery of event notifications.

These steps are explained in the following event hook example, which uses the Okta event for a user deactivation. When this event occurs, the example external service code receives an Okta request. The external service responds with an acknowledgement to Okta that the request has been received and, in this example, simply displays the deactivated user’s name to the console.

This guide uses the website [Glitch.com](https://glitch.com) to act as an external service and to implement the event hook with an Okta org. See the following Glitch project to copy a working code example that implements the following scenario or build your own using the code snippets:

[Okta Event Hook: Display Deactivated Users](https://glitch.com/~okta-event-hook/)

> **Tip:** For another in-depth look at an event hook implementation, see the following Developer Experience blog example by Heather Wallander, [Build Easy User Sync Webhooks with Okta](https://developer.okta.com/blog/2020/07/20/easy-user-sync-hooks).

## Configure initial event hook verification

Okta event hooks require an initial verification of the external service endpoint prior to ongoing triggering of the Hook. For more information on this request, see [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

Add the following code to your external service to address this request.

> **Note:** Also, make sure to have the required default code and packages in your project. See [Overview and considerations](/docs/guides/common-hook-set-up-steps/main) for further information.

<StackSelector snippet="verification"/>

## Parse the event hook request

When a user is deactivated in the Okta org, your external service receives the event hook request from Okta, and must parse the Event Object to determine the user name or other data required by your external service.

In this example, after parsing the event hook request, the code simply displays the deactivated user to the console, and then replies to Okta with an empty, successful response (200).

<StackSelector snippet="parse-request" noSelector/>

## Examine the Event Hook object

The JSON body includes the properties accessed in this example, namely `target` and `displayName`. To see this or other Event Objects, call your Okta org with the [System Log API](/docs/reference/api/system-log), using the specific event type as a [filter parameter](/docs/reference/api/system-log/#filtering-results). For example:

```JavaScript
https://${yourOktaDomain}/api/v1/logs?filter=eventType eq "user.lifecycle.deactivated"
```

<StackSelector snippet="event-object" noSelector/>

## Enable and verify the event hook

The event hook must be set up and verified within your Okta Admin Console.

### Set up the event hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the Hook (in this example, "Deactivated User Event Hook").

5. In the **URL** field, add your external service URL, including endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/userDeactivated`.

6. Include authentication field and secret. In this example:

    - **Authentication field** = `authorization`

    - **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the Event Type you want to monitor. In this example, a user deactivated in the Okta org: `User deactivated`.

8. Click **Save & Continue**.

9. You can complete the one-time verification Okta call at this time or verify the event hook later. If you are using the Glitch example, proceed to verification.

> **Note:** You can also set up an event hook using an API. See [Event Hooks Management](/docs/reference/api/event-hooks/#create-event-hook).

### Verify the event hook

You must verify the event hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request) for further information on this process.

To complete the one-time verification of the event hook:

- After creating the event hook, and if your external service is ready to handle the request, click **Verify** to complete the one-time verification step.

or

- After making sure that your external service is ready for the external verification call, go to the event hooks table, click the **Actions** dropdown menu of any **UNVERIFIED** event hook, and select **Verify**.

The event hook is now set up with a status of **VERIFIED** and is ready to send event hook calls to your external service.

## Preview and test the event hook

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service when an event is triggered. In this example, the event is triggered when a user is deactivated in the Okta org.

### Preview

To run a preview call of your event hook, sign in to your Okta org as the super admin.

1. In the Admin Console, go to **Workflow** > **Event Hooks**.
2. Locate the event hook you created during the set-up step. In this example, select `Deactivated User Event Hook` or the name you gave the event hook.
3. Click the **Actions** menu for this hook, and select **Preview**.
4. In the **Configure Event Hook request** section, select an event from the **Event Type** drop-down menu. In this example, there is only one: `User deactivated (user.lifecycle.deactivate)`.
5. Select a previous recent event (in this case, a user deactivation) from the **System Log Event** drop-down menu. The **Preview & Deliver Event Hook** section populates the JSON body of the event hook. If no event is available, the JSON body populates with sample data.
6. Optionally, click **Edit** to modify the JSON body call. For example, you can change the `target` object's property, `displayName`, to `John Doe`.
7. Navigate to your Glitch application, opening the log console (**Tools** > **Logs**). Make sure your application is listening for requests.
8. Click **Deliver Request**. The event hook Preview displays the status request as either successful or a failure. Check your Glitch application console. The following message should display if successful:

     `The user John Doe has been deactivated on the Okta org!`

### Test

To run a test of your event hook:

1. Start by going to your Glitch application and opening the log console (**Tools** > **Logs**). Make sure your application is listening for requests.
2. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    - Go to **Directory** > **People**, and click **Add Person**.
    - As an example, add the user John Doe as seen from the [Event Object sample code](/docs/guides/event-hook-implementation/#examine-the-event-hook-object).
3. For this user, select the User's profile by clicking John Doe's name.
4. Click the **More Actions** drop-down menu, and select **Deactivate**.
5. Confirm the deactivation.
6. Navigate back to your Glitch application's log console. You should see the following output to the console:

    `The user John Doe has been deactivated on the Okta org!`

> **Note:** Review the [troubleshooting](/docs/guides/common-hook-set-up-steps/-/main/#troubleshoot-hook-implementations) section for information if you encounter any setup or configuration difficulties.

## Next steps

Review the following guides to implement other inline hook examples:

* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)

## See also

For background conceptual information on event hooks, see [Event hooks](/docs/concepts/event-hooks/).
