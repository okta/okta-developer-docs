---
title: Event Hooks with Hookdeck
excerpt: How to demonstrate Event Hooks using Hookdeck to expose a local app to the internet.
layout: Guides
---

<StackSelector class="cleaner-selector"/>

This guide provides a working example of an Okta Event Hook. It uses the Hookdeck utility to expose a local application to the internet and receive and respond to Event Hook calls. Event Hooks are outbound calls from Okta that can notify your own software systems of events occurring in your Okta org. The Hookdeck utility enables the testing of Okta Event Hooks locally, rather than implementing an internet-based production or test external service.

---

**Learning outcomes**

* Understand the Okta Event Hook calls and responses.
* Implement Okta Event Hooks using a local application and the Hookdeck utility.
* Preview and test an Okta Event Hook and review the call details with Hookdeck.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* A local application. Or see [Create a local application](#create-a-local-application) in this guide to install the sample code application.
* The Hookdeck utility. See [Install Hookdeck](#install-hookdeck).

**Sample code**

* See [A Simple Nodejs API](https://github.com/hookdeck/nodejs-webhook-server-example) for this project's sample code. Installation instructions are available in the next section, [Create a local application](#create-a-local-application).

---

## Create a local application

<StackSelector snippet="sample-app" noSelector/>

## Install Hookdeck

If you already have Hookdeck installed, move on to [Run Hookdeck](#run-ngrok). If not, follow the installation instructions at [Using The Hookdeck CLI](https://hookdeck.com/docs/using-the-cli) to install in your sample application folder (or the location of your choice).

Some installation notes:

* You don't need to have an account to install and run ngrok, but creating a free account provides more features as well as API authentication.
* The installation uses the [Homebrew](https://brew.sh/) package manager.

### Run Hookdeck

After installing Hookdeck, ensure that it's running by creating a "tunnel" into a local port (1337 in this example). Run the following command in your terminal:

```terminal
nodejs-webhook-server-example> hookdeck listen 1337
```

Complete the interactive session that follows to define the information about the Hookdeck session:

* **What source should you select?**

    Enter: `Create new source`

* **What should your new source label be?**

    Enter: `okta`

* **What path should the webhooks be forwarded to (i.e.: /webhooks)?**

    Enter: `/okta-webhooks-endpoint`

* **What's the connection label (i.e.: My API)?**

    Enter: `My Okta Response Server`

With this data, Hookdeck creates a session and URL to use for sending requests. If you see the following content in your terminal, Hookdeck is running successfully:

![A screen shot of a terminal that displays a Hookdeck session status. The session status contains urls that tunnel into the local port.](/img/hookdeck-and-event-hooks-session.png)

> **Note:** Copy the forwarding **Webhook URL** that is available from the Hookdeck terminal session. For example, `https://events.hookdeck.com/e/src_s8lCGfojGBPj8L0lszAZl6fD`. You'll use this URL when setting up your Okta Event Hook.

See [Hookdeck](https://hookdeck.com/) or their [Product docs](https://hookdeck.com/docs/introduction) for further information.

### Review Hookdeck dashboard

The Hookdeck dashboard provides an opportunity to review all calls to your local application. See [Browsing Events](https://hookdeck.com/docs/browsing-event) for details on using this interface. With the Hookdeck utility running, use the dashboard URL to access details on your hook calls: `https://dashboard.hookdeck.com/cli/events`.

Each call to your local application appears in the dashboard and includes the response body, header, and other details:

![A screen shot of the Hookdeck web dashboard that includes the response body, header, and other details.](/img/hookdeck-dashboard.png)

## Create an Okta Event Hook

Create the Okta Event Hook to work with your local application, which can now be exposed externally. The Event Hook must be set up and verified within your Okta Admin Console.

### Set up the Event Hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the Hook (in this example, "New User Event Hook").

5. In the **URL** field, add your external service URL from Hookdeck. For this example, use the **Webhook URL** highlighted after running Hookdeck, see [Run Hookdeck](#run-hookdeck). For example, your URL should appear similar to: `https://events.hookdeck.com/e/src_cdtj1gv7ltGbB8y83AdcTKgW`.

    >**Note:** Hookdeck generates the URL when creating the session and incorporates the local application's hook endpoint as part of the unique URL. That is, the endpoint is not explicitly defined as part of the URL.

6. Leave the **Authentication field** and **Authentication secret** values blank in this example. However, to add Basic Authentication, add the application code required at [Add Basic Authorization and Body Parsing](/docs/guides/common-hook-set-up-steps/nodejs/main/#add-basic-authorization-and-body-parsing) and then enter the following values for those fields:

    * **Authentication field** = `authorization`

    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the Event Type you want to monitor. In this example, a user created in the Okta org: `User created`.

8. Click **Save & Continue**.

9. With your Hookdeck session and local application running, complete the one-time verification Okta call at this time or verify the Event Hook later.

### Verify the Event Hook

You must verify the Event Hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

To complete the one-time verification of the Event Hook:

* After creating the Event Hook, and if your Hookdeck session and local application are ready to handle the request, click **Verify** to complete the one-time verification step.

or

* After making sure that your Hookdeck session and local application are ready for the external verification call, go to the Event Hooks table, click the **Actions** drop-down menu of your **UNVERIFIED** Event Hook, and select **Verify**.

The Event Hook is now set up with a status of **VERIFIED** and is ready to send Event Hook calls to your external service.

>**Note:** A successful Event Hook verification also indicates your local application is working with the Hookdeck session! Review the ngrok terminal or inspector interface for details on the first `GET` call to your local application.

## Preview, test, and review the Event Hook

With your local application now exposed externally through a Hookdeck session, you can preview and test Okta Event Hook calls, as well as review details of the calls using the Hookdeck dashboard. The Okta org is also set up to call your local application when an event is triggered. In this example, the event triggers when a user is added to your Okta org.

### Preview

To run a preview call of your Event Hook:

1. In the Admin Console, go to **Workflow** > **Event Hooks**.
1. Locate the Event Hook you created during the set-up step. In this example, select `New User Event Hook` or the name you gave the Event Hook.
1. Click the **Actions** menu for this hook, and select **Preview**.
1. In the **Configure Event Hook request** section, select an event from the **Event Type** drop-down menu. In this example, there is only one: `User Created (user.lifecycle.create)`.
1. The most recent event populates the **Preview & Deliver Event Hook** section with the JSON body of the Event Hook if there is one. You can also select an older event from the **System Log Event** drop-down menu. If no event is available, the JSON body populates with sample data.
1. Ensure that both your Hookdeck session and local sample application are running.

    >**Note:** If you start a new Hookdeck session at any time, make sure to update the Event Hook URL.

1. Click **Deliver Request**. The Event Hook Preview displays the status request as either successful or a failure. Review your local application console to view the output of the Event Hook body. For example:

   ![A screen shot of the application terminal with response body output to the console.](/img/hookdeck-application-console-output.png)

1. Review your Hookdeck terminal output for a line item reference to the specific call and a unique dashboard URL to the details on the call.

   ![A screen shot of the Hookdeck terminal with response line item output to console.](/img/hookdeck-terminal-output.png)

1. Review your Hookdeck dashboard (`https://dashboard.hookdeck.com/cli/events`). Each call recorded by Hookdeck appears in the interface from which you can review the complete call response body, header, and other details.

    ![A screen shot of the Hookdeck dashboard that includes body details.](/img/hookdeck-dashboard-small.png)

### Test

To run a test of your Event Hook:

1. Ensure that both your Hookdeck session and local sample application are running.
1. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    * Go to **Directory** > **People**, and click **Add Person**. As an example, add the user Jane Doe with the following fields:
        * **First Name:** Jane
        * **Last Name:** Doe
        * **User Name:** jane.doe@example.com

1. Navigate back to your local application's console. The request body for this call appears.

1. Review your Hookdeck terminal output for a line item reference to the specific call and a unique dashboard URL to the details on the call.

1. Review the unique dashboard URL (for example, `https://dashboard.hookdeck.com/cli/events/evt_x3H5QdAL2JGvxMbvqcvwK8UF`). Scroll to the **Body** section and open the **"Root"** > **"Data"** sections. Your new user's name and username appear under the **"target"** property:

 ![A screen shot of the Hookdeck dashboard that includes body details.](/img/hookdeck-body-detail.png)

## See also

For background conceptual information on Event Hooks, see [Event Hooks](/docs/concepts/event-hooks/).
