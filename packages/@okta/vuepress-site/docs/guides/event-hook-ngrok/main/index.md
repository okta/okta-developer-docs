---
title: Event hooks with ngrok
excerpt: How to demonstrate event hooks using ngrok to expose a local app to the internet.
layout: Guides
---

<StackSelector />

This guide provides a functional example of an Okta event hook that uses the ngrok utility.

---

**Learning outcomes**

* Understand the Okta event hook calls and responses.
* Implement Okta event hooks using a local application and the ngrok utility.
* Preview and test an Okta event hook and review the call details with ngrok.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* A local application. See [Create a local application](#create-a-local-application) in this guide for a simple example.
* [ngrok](#install-ngrok)

**Sample code**

* See [Create a local application](#create-a-local-application) for this project's sample code.

---

## About event hooks with ngrok

Event hooks are outbound calls from Okta that can notify your software systems of events that occurred in your Okta org. The ngrok utility exposes local applications to the internet and receives and responds to event hook calls. This setup enables the development and testing of event hooks locally, rather than using an external test or production environment. The ngrok utility also provides a replay function to assist you in testing and developing your external service code.

To use this guide:

1. Create a local application or use an existing application.
1. Run the ngrok utility with your local application.
1. Create an event hook.
1. Preview and test the event hook.

## Create a local application

<StackSelector snippet="sample-app" noSelector/>

## Install ngrok

If you already have ngrok installed, move on to [Run ngrok](#run-ngrok). If not, follow the installation instructions at [https://ngrok.com/download](https://ngrok.com/download) to install in your sample application folder (or the location of your choice).

Installation notes:

* A free ngrok account isn't required, but can provide additional features including basic authentication.

* You can install ngrok in the system path directory or the project directory. Alternatively, you can install the executable in another local directory, as long as you reference the directory path when using the tool.

### Run ngrok

After installing ngrok, ensure that it's running by creating a "tunnel" into a local port (`8082` in this example). If you installed directly into your project directory (for example, `sample-app`), run the following command in your terminal:

```shell
sample-app > ./ngrok http 8082
```

If you see the following content in your terminal, ngrok is running successfully:

<div class="three-quarter">

![An image of a terminal that displays an ngrok session status, with online in green. The session status contains urls that tunnel into the local port.](/img/hooks/ngrok-and-event-hooks-session-status.png)

</div>

> **Note:** Copy the forwarding URL that is available from the ngrok terminal session. For example: `https://2d20-142-126-163-77.ngrok.io`. Use this URL when setting up your Okta event hook.

See [ngrok](https://ngrok.com) or their [documentation](https://ngrok.com/docs) for further information.

### Review ngrok inspection interface

The ngrok inspection interface provides an opportunity to review all calls to your local application. See [ngrok documentation](https://ngrok.com/docs#inspect-requests) for details on using this interface. With the ngrok utility running, open the following URL in a browser: `http://localhost:4040`.

Each call to your local application appears in the interface and includes the response body, header, replay functionality, and other details. Proceed to the following sections to see an example request.

<div class="three-quarter border">

![An image of the ngrok inspection interface that includes details of a call.](/img/hooks/ngrok-and-event-hooks-web-interface.png)

</div>

## Create an Okta event hook

Create the Okta event hook to work with your local application, which can now be exposed externally. You must configure and verify the event hook within your Admin Console.

<EventHookEANoteProcedure/>

### Set up the event hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the hook (in this example, "New user event hook").

5. In the **URL** field, add your external service URL. For this example, add the code endpoint, `/userCreated` from `server.js` to the end of the `https://` URL from the [ngrok session](#run-ngrok). For example: your URL should appear similar to: `https://2d20-142-126-163-77.ngrok.io/userCreated`.

6. Include the **Authentication field** and **Authentication secret** values. In this example, our `server.js` code uses Basic Authentication:

    * **Authentication field** = `authorization`

    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the Event Type you want to monitor. In this example, a user created in the Okta org: `User created`.

8. Click **Save & Continue**.

9. With your ngrok session and local application running, complete the one-time verification Okta call now. You can also verify the event hook later.

### Verify the event hook

You must verify the event hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

If you didn't verify the hook during the [Create the event hook](#create-an-okta-event-hook) procedure, ensure that your ngrok session and local application are ready for the external verification call, and go to the Event Hooks table, click the **Actions** dropdown menu of your **UNVERIFIED** event hook, and select **Verify**.

The event hook is now set up with a status of **VERIFIED** and is ready to send event hook calls to your external service.

>**Note:** A successful event hook verification also indicates that your local application is usable with the ngrok session. Review the ngrok terminal or inspector interface for details on the first `GET` call to your local application.

## Test, preview, and review the event hook

With your local application now exposed externally through an ngrok session, you can test and preview Okta event hook calls, and review details of the calls using the ngrok inspection interface. The Okta org is also set up to call your local application when an event is triggered. In this example, the event is triggered when a user is added to your Okta org.

### Test the event hook

To run a test of your event hook:

1. Ensure that both your ngrok session and local sample application are running.
1. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    * Go to **Directory** > **People**, and click **Add person**. As an example, add the user John Doe with the following fields:
        * **First name:** John
        * **Last name:** Doe
        * **Username:** john.doe@example.com

1. Navigate back to your local application's console. If the event hook was successful, the following message appears:

    `The user john.doe@example.com has been added to the Okta org!`

1. Check your ngrok inspection interface (`http://localhost:4040`). Each call recorded by ngrok appears in the interface from which you can review the complete call response body, header, and other details. See [Review ngrok inspection interface](/docs/guides/event-hook-ngrok/nodejs/main/#review-ngrok-inspection-interface). Click **Replay** on the ngrok inspection interface to replay the event hook call to assist in development. See [Replay the event hook](#replay-the-event-hook).

### Preview the event hook

To run a preview call of your event hook:

1. In the Admin Console, go to **Workflow** > **Event Hooks**.
1. Locate the event hook that you created during the set-up step. In this example, select `New User Event Hook` or the name you gave the event hook.
1. Click the **Actions** menu for this hook, and select **Preview**.
1. In the **Configure Event Hook request** section, select an event from the **Event Type** dropdown menu. In this example, the only available option is: `User Created (user.lifecycle.create)`.
1. The most recent event (in this case, user John Doe created previously) populates the **Preview & Deliver Event Hook** section with the JSON body of the event hook. You can also select an older event from the **System Log Event** dropdown menu. If no event is available, the JSON body populates with sample data.

    > **Note:**
    >
    > * The preview event hook JSON body can be modified for testing or development purposes. Click **Edit** to update the `"target"` field, for example.
    > * If you’re using the preview sample data, you must edit the preview to add a `target` value. Include an email address for the `alternateId` property. For example: `"target": [{ "alternateId": "john.doe@example.com"}]`

1. Ensure that both your ngrok session and local sample application are running.

    > **Note:** If you start a new ngrok session at any time, make sure to update the event hook URL.

1. Click **Deliver Request**. The Event Hook Preview displays the status request as either successful or a failure. Check your local application console. The following message appears if successful:

     `The user john.doe@example.com has been added to the Okta org!`

1. Check your ngrok inspection interface (`http://localhost:4040`). Each call recorded by ngrok appears in the interface from which you can review the response body, header, and other details. See [Review ngrok inspection interface](/docs/guides/event-hook-ngrok/nodejs/main/#review-ngrok-inspection-interface).

### Replay the event hook

The ngrok inspection interface provides a replay function that you can use to test your code without reproducing test conditions in Okta. To replay your call:

1. In the ngrok inspection interface (`http://localhost:4040`), select an event hook from Okta.

1. Click **Replay** > **Replay with modifications:**

1. Optionally, modify the request body with a different content. For example: `"target": [{ "alternateId": "jane.doe@example.com"}]`

1. Click **Replay**.

1. Your local application receives the modified request to process and provide a response.

See also [ngrok Documentation](https://ngrok.com/docs#inspect-replay).

## See also

For background conceptual information on event hooks, see [Event hooks](/docs/concepts/event-hooks/).
