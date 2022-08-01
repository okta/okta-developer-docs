---
title: Event Hooks with Hookdeck
excerpt: How to demonstrate Event Hooks using Hookdeck to expose a local app to the internet.
layout: Guides
---

This guide provides a working example of an Okta Event Hook that uses the Hookdeck utility.

---

**Learning outcomes**

* Understand the Okta Event Hook calls and responses.
* Implement Okta Event Hooks using a local application and the Hookdeck utility.
* Preview and test an Okta Event Hook and review the call details with Hookdeck.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* A local application. See [Create a local application](#create-a-local-application) in this guide to install a sample code application.
* [Hookdeck](#install-hookdeck)

**Sample code**

* [nodejs-webhook-server-example](https://github.com/hookdeck/nodejs-webhook-server-example). Installation instructions are available in [Create a local application](#create-a-local-application).

---

## About Event Hooks with Hookdeck

 Event Hooks are outbound calls from Okta that can notify your own software systems of events that occur in your Okta org. The Hookdeck utility exposes a local application to the internet and receives and responds to Event Hook calls. The Hookdeck utility enables the testing of Event Hooks locally, rather than implementing an internet-based production or test external service.

## Create a local application

<StackSnippet snippet="sample-app" />

## Install Hookdeck

If you already have Hookdeck installed, move on to [Run Hookdeck](#run-hookdeck). If not, follow the installation instructions at [Using The Hookdeck CLI](https://hookdeck.com/docs/using-the-cli) to install in your sample application folder (or the location of your choice).

Some installation notes:

* You don't need to have an account to install and run Hookdeck, but creating a free account provides more features as well as API authentication.

### Run Hookdeck

After installing Hookdeck, start a session to forward your Event Hooks to a local port (1337 in this example). Run the following command in your terminal:

```shell
nodejs-webhook-server-example> hookdeck listen 1337
```

Complete the following interactive session to define the information about the Hookdeck session:

* **What should your new source label be?**

    Enter: `okta`

* **What path should the webhooks be forwarded to (i.e.: /webhooks)?**

    Enter: `/okta-webhooks-endpoint`

* **What's the connection label (i.e.: My API)?**

    Enter: `My Okta Response Server`

With this data, Hookdeck creates a session and URL to use for sending requests. If you see the following content in your terminal, Hookdeck is running successfully:

<div class="three-quarter">

![A screen shot of a terminal that displays a Hookdeck session status. The session status contains urls that tunnel into the local port.](/img/hooks/hookdeck-and-event-hooks-session.png)

</div>

> **Note:** You'll use the **Webhook URL** that is available from the Hookdeck terminal session when setting up your Event Hook. For example, `https://events.hookdeck.com/e/src_jHlvbIjGsgY2xhYZeCGxohK4`.

See [Hookdeck](https://hookdeck.com/) or their [Product docs](https://hookdeck.com/docs/introduction) for further information.

### Review Hookdeck dashboard

The Hookdeck dashboard provides an opportunity to review all calls to your local application. See [Browsing Events](https://hookdeck.com/docs/browsing-event) for details on using this interface. With the Hookdeck utility running, use the guest account **Login URL** to access details on your hook calls. For example, your initial guest account URL appears similar to: `https://api.hookdeck.com/signin/guest?token=5sszlk2ndmkp5puy07uixrqtatkzvhwc13gctx9o3gmgczcrfu`.

Each call to your local application appears in the dashboard and includes the response body, header, and other details:

<div class="full border">

![A screen shot of the Hookdeck web dashboard that includes the response body, header, and other details.](/img/hooks/hookdeck-dashboard.png)

</div>

### Hookdeck development workflow

Hookdeck URLs are reusable and permanent (when you create a free account) and serve the entire development lifecycle&mdash;from development to staging to production. See [Development Workflow](https://hookdeck.com/docs/dev-workflow) for more information on using Hookdeck.

## Create an Okta Event Hook

Create the Okta Event Hook to work with your local application, which can now be exposed externally. The Event Hook must be set up and verified within your Okta Admin Console.

### Set up the Event Hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the Hook (in this example, "New User Event Hook").

5. In the **URL** field, add your external service URL from Hookdeck. For this example, use the **Webhook URL** highlighted after running Hookdeck. See [Run Hookdeck](#run-hookdeck). For example, your URL should appear similar to: `https://events.hookdeck.com/e/src_s8lCGfojGBPj8L0lszAZl6fD`.

    >**Note:** Hookdeck generates the URL when creating the session and incorporates the local application's hook endpoint as part of the unique URL. That is, the endpoint is not explicitly defined as part of the URL.

6. Leave the **Authentication field** and **Authentication secret** values blank in this example.

    However, to add Basic Authentication, add the application code that is required at [Add Basic Authorization and Body Parsing](/docs/guides/common-hook-set-up-steps/nodejs/main/#add-basic-authorization-and-body-parsing) and then enter the following values for those fields:

    * **Authentication field** = `authorization`

    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the Event Type that you want to monitor. In this example, the Event Type is `User created` for a user created in the Okta org.

8. Click **Save & Continue**.

9. Complete the one-time verification Okta call at this time by clicking **Verify**. You can also verify the Event Hook at later time. See [Event Hook verification](/docs/guides/event-hook-hookdeck/#event-hook-verification).

### Event Hook verification

You must verify the Event Hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

>**Note:** Hookdeck includes the capability to verify your endpoint, and no code is necessary for your local application.

To complete the one-time verification of the Event Hook:

* After creating the Event Hook, click **Verify** to complete the one-time verification step.

or

* Go to the Event Hooks table, click the **Actions** drop-down menu of your **UNVERIFIED** Event Hook, and select **Verify**.

The Event Hook is now set up with a status of **VERIFIED** and is ready to send Event Hook calls to your local application through Hookdeck.

## Preview, test, and review the Event Hook

With your local application now exposed externally through a Hookdeck session, you can preview and test Okta Event Hook calls, and review details of the calls by using the Hookdeck dashboard. The Okta org is also set up to call your local application when an event is triggered. In this example, the event triggers when a user is added to your Okta org.

### Preview

To run a preview call of your Event Hook:

1. In the Admin Console, go to **Workflow** > **Event Hooks**.
1. Locate the Event Hook that you created during the set-up step. In this example, select `New User Event Hook` or the name you gave the Event Hook.
1. Click the **Actions** menu for this hook, and select **Preview**.
1. In the **Configure Event Hook request** section, select an event from the **Event Type** drop-down menu. In this example, there is only `User Created (user.lifecycle.create)`.
1. The most recent event populates the **Preview & Deliver Event Hook** section with the JSON body of the Event Hook if there is one. If no event is available, the JSON body populates with sample data.
1. Ensure that both your Hookdeck session and local sample application are running.
1. Click **Deliver Request**. The Event Hook Preview displays the status request as either successful or a failure. Review your local application console to view the output of the Event Hook body. For example:

   <div class="three-quarter">

   ![A screen shot of the application terminal with response body output to the console.](/img/hooks/hookdeck-application-console-output.png)

   </div>

1. Review your Hookdeck terminal output for a line item reference to the specific call and a unique dashboard URL to the details on the call.

   <div class="full">

   ![A screen shot of the Hookdeck terminal with response line item output to console.](/img/hooks/hookdeck-terminal-output.png)

   </div>

1. Review your Hookdeck dashboard (`https://dashboard.hookdeck.com/cli/events`). Each call recorded by Hookdeck appears in the interface from which you can review the complete call response body, header, and other details.

    <div class="half border">

    ![A screen shot of the Hookdeck dashboard that includes body details.](/img/hooks/hookdeck-dashboard-small.png)

    </div>

### Test

To run a test of your Event Hook:

1. Ensure that both your Hookdeck session and local sample application are running.
1. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    * Go to **Directory** > **People**, and click **Add Person**. As an example, add the user Jane Doe with the following fields:
        * **First Name:** Jane
        * **Last Name:** Doe
        * **User Name:** jane.doe@hookdeckexample.com

1. Click **Save** to create a new user. The new user triggers an Event Hook call.

1. Navigate back to your local application's console. The request body for this call appears in the console, as designed by the local application code.

1. Review your Hookdeck terminal output for a line item reference to the specific call and a unique dashboard URL to the details on the call.

1. Review the unique dashboard URL (for example, `https://dashboard.hookdeck.com/cli/events/evt_x3H5QdAL2JGvxMbvqcvwK8UF`). Scroll to the **Body** section and open the **"Root"** > **"Data"** sections. Your new user's name and username appear under the **"target"** property.

<div class="three-quarter">

![A screen shot of the Hookdeck dashboard that includes body details.](/img/hooks/hookdeck-body-detail.png)

</div>

## See also

See [Event Hooks](/docs/concepts/event-hooks/) for background conceptual information on Event Hooks.
