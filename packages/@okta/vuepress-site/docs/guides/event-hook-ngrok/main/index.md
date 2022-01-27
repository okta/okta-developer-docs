---
title: Event Hooks with ngrok
excerpt: How to demonstrate Event Hooks using ngrok to expose a local app to the internet.
layout: Guides
---

This guide provides a working example of an Okta Event Hook. It uses the ngrok utility to expose a local application to the internet and receive and respond to Event Hook calls. Event Hooks are outbound calls from Okta that can notify your own software systems of events occurring in your Okta org. The ngrok utility enables the testing of Okta Event Hooks locally, rather than implementing an internet-based production or test external service.

---

**Learning outcomes**

* Understand the Okta Event Hook calls and responses.
* Implement Okta Event Hooks using a local application and the ngrok utility.
* Preview and test an Okta Event Hook and review the call details with ngrok.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* A local application. Or see [Create a local application](#create-a-local-application) in this guide for a simple example.
* The ngrok utility. See [Install ngrok](#install-ngrok).

**Sample code**

* See [Create a local application](#create-a-local-application) for this project's sample code.

---

## Create a local application

<StackSelector snippet="sample-app" noSelector/>

## Install ngrok

If you already have ngrok installed, move on to [Run ngrok](#run-ngrok). If not, follow the installation instructions at [https://ngrok.com/download](https://ngrok.com/download) to install in your sample application folder (or the location of your choice).

Some installation notes:

* You don't need to have an account to install and run ngrok, but creating a free account provides more features as well as basic authentication.
* You can install ngrok directly in your project folder, sample-app, as documented from the ngrok download page. Or you can install on your system's path directory to be able to run ngrok from any folder. Alternatively, you can install the executable in your favorite local folder, but you'll need the folder path when referencing the tool.

### Run ngrok

After installing ngrok, ensure that it's running by creating a "tunnel" into a local port (8082 in this example). If you installed directly into your project folder, sample-app, run the following command in your terminal:

```shell
sample-app > ./ngrok http 8082
```

or if you installed in your system path:

```shell
sample-app > ngrok http 8082
```

or if you used your favorite folder:

```shell
sample-app > ~/applications/ngrok http 8082
```

If you see the following content in your terminal, ngrok is running successfully:

![A screen shot of a terminal that displays an ngrok session status, with online in green. The session status contains urls that tunnel into the local port.](/img/ngrok-and-event-hooks-session-status.png)

> **Note:** Copy the forwarding URL that is available from the ngrok terminal session. For example, `https://2d20-142-126-163-77.ngrok.io`. You'll use this URL when setting up your Okta Event Hook.

See [ngrok](https://ngrok.com) or their [documentation](https://ngrok.com/docs) for further information.

### Review ngrok inspection interface

The ngrok inspection interface provides an opportunity to review all calls to your local application. See [ngrok documentation](https://ngrok.com/docs#inspect-requests) for details on using this interface. With the ngrok utility running, open the following URL in a browser: `http://localhost:4040`.

Each call to your local application appears in the interface and includes the response body, header, and other details:

![A screen shot of the ngrok web interface that includes the response body, header, and other details.](/img/ngrok-and-event-hooks-web-interface.png)

## Create an Okta Event Hook

Create the Okta Event Hook to work with your local application, which can now be exposed externally. The Event Hook must be set up and verified within your Okta Admin Console.

### Set up the Event Hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the Hook (in this example, "New User Event Hook").

5. In the **URL** field, add your external service URL, including endpoint. For this example, use the code endpoint, `/userCreated` from `server.js` with the `https://` URL from the [ngrok session](#run-ngrok). For example, your URL should appear similar to: `https://2d20-142-126-163-77.ngrok.io/userCreated`.

6. Include the **Authentication field** and **Authentication secret** values. In this example, our `server.js` code uses Basic Authentication:

    * **Authentication field** = `authorization`

    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the Event Type you want to monitor. In this example, a user created in the Okta org: `User created`.

8. Click **Save & Continue**.

9. With your ngrok session and local application running, complete the one-time verification Okta call at this time or verify the Event Hook later.

### Verify the Event Hook

You must verify the Event Hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

To complete the one-time verification of the Event Hook:

* After creating the Event Hook, and if your ngrok session and local application are ready to handle the request, click **Verify** to complete the one-time verification step.

or

* After making sure that your  ngrok session and local application are ready for the external verification call, go to the Event Hooks table, click the **Actions** drop-down menu of your **UNVERIFIED** Event Hook, and select **Verify**.

The Event Hook is now set up with a status of **VERIFIED** and is ready to send Event Hook calls to your external service.

>**Note:** A successful Event Hook verification also indicates your local application is working with the ngrok session! Review the ngrok terminal or inspector interface for details on the first `GET` call to your local application.

## Preview, test, and review the Event Hook

With your local application now exposed externally through an ngrok session, you can preview and test Okta Event Hook calls, as well as review details of the calls using the ngrok inspection interface. The Okta org is also set up to call your local application when an event is triggered. In this example, the event triggers when a user is added to your Okta org.

### Preview

To run a preview call of your Event Hook:

1. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    * Go to **Directory** > **People**, and click **Add Person**. As an example, add the user John Doe with the following fields:
        * **First Name:** John
        * **Last Name:** Doe
        * **User Name:** john.doe@example.com
1. In the Admin Console, go to **Workflow** > **Event Hooks**.
1. Locate the Event Hook you created during the set-up step. In this example, select `New User Event Hook` or the name you gave the Event Hook.
1. Click the **Actions** menu for this hook, and select **Preview**.
1. In the **Configure Event Hook request** section, select an event from the **Event Type** drop-down menu. In this example, there is only one: `User Created (user.lifecycle.create)`.
1. The most recent event (in this case, user John Doe created above) populates the **Preview & Deliver Event Hook** section with the JSON body of the Event Hook. You can also select an older event from the **System Log Event** drop-down menu. If no event is available, the JSON body populates with sample data.

    > **Note:** If you are using the preview sample data, you must edit the preview to add a `target` value, including an email using the `alternateId` property. For example, `"target": [{ "alternateId": "john.doe@example.com"}]`. Otherwise, the sample application code throws an error if the value in `target` property is `null`.

1. Ensure that both your ngrok session and local sample application are running.

    >**Note:** If you start a new ngrok session at any time, make sure to update the Event Hook URL.

1. Click **Deliver Request**. The Event Hook Preview displays the status request as either successful or a failure. Check your local application console. The following message appears if successful:

     `The user john.doe@example.com has been added to the Okta org!`

1. Check your ngrok inspection interface (`http://localhost:4040`). Each call recorded by ngrok appears in the interface from which you can review the complete call response body, header, and other details.

    ![A screen shot of the ngrok inspection interface that includes details of a call.](/img/ngrok-and-event-hooks-web-interface-small.png)

### Test

To run a test of your Event Hook:

1. Ensure that both your ngrok session and local sample application are running.
1. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    * Go to **Directory** > **People**, and click **Add Person**. As an example, add the user Jane Doe with the following fields:
        * **First Name:** Jane
        * **Last Name:** Doe
        * **User Name:** jane.doe@example.com

1. Navigate back to your local application's console. The following message appears if successful:

    `The user jane.doe@example.com has been added to the Okta org!`

1. Check your ngrok inspection interface (`http://localhost:4040`). Each call recorded by ngrok appears in the interface from which you can review the complete call response body, header, and other details.

    ![A screen shot of the ngrok inspection interface that includes details of a call.](/img/ngrok-and-event-hooks-web-interface-small.png)

## See also

For background conceptual information on Event Hooks, see [Event Hooks](/docs/concepts/event-hooks/).
