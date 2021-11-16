---
title: Event Hooks with ngrok
excerpt: How to demonstrate Event Hooks using ngrok to expose a local app to the internet.
layout: Guides
---

This guide provides a working example of an Okta Event Hook. It uses the ngrok utility to expose a local application to the internet and receive and respond to Event Hook calls. Event Hooks are outbound calls from Okta that can notify your own software systems of events occurring in your Okta org. The ngrok utility enables the testing of Okta Event Hooks locally, rather than an internet-based production or test external service.

---

**Learning outcomes**

* Understand the Okta Event Hook calls and responses
* Implement Okta Event Hooks using a local application and the ngrok utility
* Preview and test an Okta Event Hook and review the call details with ngrok

**What you need**

* An Okta developer org. [Create an org for free](https://developer.okta.com/signup/).
* A local application. Or see [Create a local sample app](/#create-a-local-application) in this guide for a simple example.
* The ngrok utility. See [Install ngrok](/#install-ngrok).

**Sample code**

* The sample code is available directly from this guide.

---

## Install ngrok

If you already have ngrok installed, move on to the next step! If not, follow the installation instructions at [https://ngrok.com/download](https://ngrok.com/download).

Some installation notes:

* You do not need to have an account to install and run ngrok, but creating a free account provides more features as well as basic authentication.
* You can install ngrok directly in your project folder, as documented from the ngrok download page. Or you can install on your system's path directory to be able to run ngrok from any folder. Alternatively, you can install the executable in your favorite local folder, but you'll need the folder path when referencing the tool.

### Run ngrok

After installing ngrok, ensure that it's running by creating a "tunnel" into a local port (8082 in this example). If you installed directly into your project folder, run the following command in your terminal:

```terminal
> ./ngrok http 8082
```

or if you installed in your system path:

```terminal
> ngrok http 8082
```

or if you used your favorite folder:

```terminal
> ~/applications/ngrok http 8082
```

If you see the following content in your terminal, ngrok is running successfully:

![A screen shot of a terminal that displays an ngrok session status, with online in green. The session status contains urls that tunnel into the local port.](/img/ngrok-and-event-hooks-session-status.png)

> **Note:** Copy the forwarding URL that is available from the ngrok terminal session. For example, `https://00fca2fe2aec.ngrok.io`. You'll use this URL when setting up your Okta Event Hook.

See [ngrok](https://ngrok.com) or their [documentation](https://ngrok.com/docs) for further information.

## Create a local application

<StackSelector snippet="sample-app"/>

## Create an Okta Event Hook

Create the Okta Event Hook to work with your local application, which can now be exposed externally. The Event Hook must be set up and verified within your Okta Admin Console.

### Set up the Event Hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the Hook (in this example, "Deactivated User Event Hook").

5. In the **URL** field, add your external service URL, including endpoint. For this example, use the code endpoint, `/userDeactivated` from `server.js` with the `https://` URL from the ngrok session. For example, your URL should appear similar to: `https://28333dd3ddf3.ngrok.io/userDeactivated`.

6. Include authentication field and secret. In this example, our `server.js` code uses Basic Authentication:

    * **Authentication field** = `authorization`

    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the Event Type you want to monitor. In this example, a user deactivated in the Okta org: `User deactivated`.

8. Click **Save & Continue**.

9. Complete the one-time verification Okta call at this time or verify the Event Hook later. You need to have both your ngrok session and local application running to verify the initial Okta call.

### Verify the Event Hook

You must verify the Event Hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request) for further information on this process.

To complete the one-time verification of the Event Hook:

* After creating the Event Hook, and if your ngrok session and local application are ready to handle the request, click **Verify** to complete the one-time verification step.

or

* After making sure that your  ngrok session and local application are ready for the external verification call, go to the Event Hooks table, click the **Actions** drop-down menu of your **UNVERIFIED** Event Hook, and select **Verify**.

The Event Hook is now set up with a status of **VERIFIED** and is ready to send Event Hook calls to your external service.

>**Note:** A successful Event Hook verification also indicates your local application is working with the ngrok session! Review the ngrok terminal for details on the first `GET` call to your local application.

## Preview, test, and review the Event Hook

With your local application now exposed externally through an ngrok session, you can preview and test Okta Event Hook calls, as well as review details of the calls using the ngrok dashboard. The Okta org is also set up to call your local application when an event is triggered. In this example, the event triggers when a user is deactivated in the Okta org.

### Preview

To run a preview call of your Event Hook, sign in to your Okta org as the super admin.

1. In the Admin Console, go to **Workflow** > **Event Hooks**.
2. Locate the Event Hook you created during the set-up step. In this example, select `Deactivated User Event Hook` or the name you gave the Event Hook.
3. Click the **Actions** menu for this hook, and select **Preview**.
4. In the **Configure Event Hook request** section, select an event from the **Event Type** drop-down menu. In this example, there is only one: `User deactivated (user.lifecycle.deactivate)`.
5. Select a previous recent event (in this case, a user deactivation) from the **System Log Event** drop-down menu. The **Preview & Deliver Event Hook** section populates the JSON body of the Event Hook. If no event is available, the JSON body populates with sample data.

    > **Note:** If you are using the preview sample data, you must edit the preview to add a `target` value, including a display name, for example, `"target": [{ "displayName": "John Doe"}]`. Otherwise, the sample code throws an error if the value in the call is `null`.

6. Ensure that both your ngrok session and local sample application are running.

    >**Note:** If you start a new ngrok session at any time, make sure to update the Event Hook URL.

7. Click **Deliver Request**. The Event Hook Preview displays the status request as either successful or a failure. Check your local application console. The following message displays if successful:

     `The user John Doe has been deactivated on the Okta org!`

8. Check your ngrok terminal session. Each call recorded by ngrok appears in the terminal.

    ![A screen shot of the ngrok terminal that includes a simple line item of a call.](/img/ngrok-and-event-hooks-terminal-calls.png)

### Test

To run a test of your Event Hook:

1. Ensure that both your ngrok session and local sample application are running.
2. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    * Go to **Directory** > **People**, and click **Add Person**.
    * As an example, add the user John Doe as seen from the [Event Object sample code](/docs/guides/event-hook-implementation/event-object).
3. For this user, select the User's profile by clicking John Doe's name.
4. Click the **More Actions** drop-down menu, and select **Deactivate**.
5. Confirm the deactivation.
6. Navigate back to your local application's console. You should see the following output to the console:

    `The user John Doe has been deactivated on the Okta org!`
7. Check your ngrok terminal session. Each call recorded by ngrok appears in the terminal.

    ![A screen shot of the ngrok terminal that includes a simple line item of a call.](/img/ngrok-and-event-hooks-terminal-calls.png)

### Review ngrok dashboard

The ngrok inspection interface provides an opportunity to review all calls to your local application. See [ngrok documentation](https://ngrok.com/docs#inspect-requests) for details on using this interface. With the ngrok utility running, open the following URL in a browser: `http://localhost:4040`.

Each call to your local application appears in the interface and includes the response body, header, and other details:

![A screen shot of the ngrok web interface that includes the response body, header, and other details.](/img/ngrok-and-event-hooks-web-interface.png)

## See also

For background conceptual information on Event Hooks, see [Event Hooks](/docs/concepts/event-hooks/).
