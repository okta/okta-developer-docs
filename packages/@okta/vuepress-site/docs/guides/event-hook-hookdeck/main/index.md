---
title: Event hooks with Hookdeck
excerpt: How to demonstrate event hooks using Hookdeck to expose a local app to the internet.
layout: Guides
---

This guide provides a functional example of an Okta event hook that uses the Hookdeck utility.

---

#### Learning outcomes

* Understand the Okta event hook calls and responses.
* Implement Okta event hooks using a local application and the Hookdeck utility.
* Preview and test an Okta event hook and review the call details with Hookdeck.

#### What you need

* [Okta Integrator Free Plan organization](https://developer.okta.com/signup/)
* A local application. See [Create a local application](#create-a-local-application) in this guide to install a sample code application.
* [Hookdeck](#install-hookdeck)

#### Sample code

* [Nodejs-webhook-server-example](https://github.com/hookdeck/nodejs-webhook-server-example). Installation instructions are available in [Create a local application](#create-a-local-application).

---

## About event hooks with Hookdeck

 Event hooks are outbound calls from Okta that can notify your own software systems of events that occur in your Okta org. The Hookdeck utility exposes a local application to the internet. It allows the local application to receive and respond to event hook calls. The Hookdeck utility enables the testing of event hooks locally, rather than implementing an internet-based production or test external service.

## Create a local application

<StackSnippet snippet="sample-app" />

## Install Hookdeck

If you already have Hookdeck installed, move on to [Run Hookdeck](#run-hookdeck). If not, follow the installation instructions at [Using the Hookdeck CLI](https://hookdeck.com/docs/using-the-cli) to install in your sample application folder (or the location of your choice).

Some installation notes:

* You don't need to have an account to install and run Hookdeck. However, a free account provides more features in the Hookdeck Dashboard and API authentication.
* If you choose not to create an account, you'll use the Hookdeck Console rather than the Dashboard.

### Run Hookdeck

1. After installing Hookdeck, if you created a Hookdeck account, run the following command in your terminal:

   ```shell
   hookdeck login
   ```

   Now start a session to forward your event hooks to a local port (`1337` in this example):

   ```shell
   hookdeck listen 1337
   ```

1. Complete the following interactive session to define the information about the Hookdeck session:

   * **What should your new source label be?**

      Enter: `okta`

   * **What path should the webhooks be forwarded to (i.e.: /webhooks)?**

      Enter: `/okta-webhooks-endpoint`

   * **What's the connection label (i.e.: My API)?**

      Enter: `My Okta Response Server`

   With this data, Hookdeck creates a session and URL to use for sending requests. If you see the following content in your terminal, Hookdeck is running successfully:

   <div class="three-quarter">

   ![An image of a terminal that displays a Hookdeck session status. The session status contains urls that tunnel into the local port.](/img/hooks/hookdeck-webhookURL.png)

   </div>

> **Note:** Use the **Webhook URL** that is available from the Hookdeck terminal session when setting up your event hook. For example, `https://events.hookdeck.com/e/src_t3PYSHLdsgNr`.

See [Hookdeck](https://hookdeck.com/) or their [Product docs](https://hookdeck.com/docs/introduction) for further information.

### Review Hookdeck dashboard

The Hookdeck dashboard provides an opportunity to review all calls to your local application. See [Browsing events](https://hookdeck.com/docs/browsing-event) for details on using this interface. Use the Dashboard link  provided by the Hookdeck utility to access details on your hook calls. For example, `http://dashboard..hookdeck.com?team_id=tm_DzF5wrNULyBG`. If you've not logged in to Hookdeck previously, you'll get a guest URL to Hookdeck Console instead.

Each call to your local application appears in the dashboard and includes the response body, header, and other details:

<div class="full border">

![An image of the Hookdeck web dashboard that includes the response body, header, and other details.](/img/hooks/hookdeck-dashboard.png)

</div>

### Hookdeck development workflow

Hookdeck URLs are reusable and permanent (when you create a free account) and serve the entire development lifecycle&mdash;from development to staging to production. See [Development Workflow](https://hookdeck.com/docs/dev-workflow) for more information on using Hookdeck.

## Create an Okta event hook

Create the Okta event hook to work with your local application. Set up and verify your event hook using the following Admin Console procedure or through the [Event Hooks Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EventHook/).

<EventHookEANoteProcedure/>

### Set up the event hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the hook (in this example, "New user event hook").

5. In the **URL** field, add your external service URL from Hookdeck. For this example, use the **Webhook URL** highlighted after running Hookdeck. See [Run Hookdeck](#run-hookdeck). For example, your URL should appear similar to: `https://events.hookdeck.com/e/src_t3PYSHLdsgNr`.

    >**Note:** Hookdeck generates the URL when creating the session and incorporates the local application's hook endpoint as part of the unique URL. That is, the endpoint isn’t explicitly defined as part of the URL.

6. Leave the **Authentication field** and **Authentication secret** values blank in this example.

    However, to add Basic Authentication, add the application code at [HTTP header: Basic Authentication](/docs/guides/common-hook-set-up-steps/nodejs/main/#http-header-basic-authentication) and then enter the following values for those fields:

    * **Authentication field** = `authorization`

    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the event type that you want to monitor. In this example, the event type is `User created` for a user created in the Okta org.

8. Click **Save & Continue**.

9. Complete the one-time verification Okta call by clicking **Verify**. You can also verify the event hook at a later time. See [Event hook verification](/docs/guides/event-hook-hookdeck/#event-hook-verification).

### Event hook verification

Verify the event hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request).

>**Note:** Hookdeck includes the capability to verify your endpoint, and no code is necessary for your local application.

To complete the one-time verification of the event hook:

* After creating the event hook, click **Verify** to complete the one-time verification step.

Or:

* Go to the Event Hooks table, click the **Actions** dropdown menu of your **UNVERIFIED** event hook, and select **Verify**.

The event hook is set up with a status of **VERIFIED**. It's ready to send event hook calls to your local application through Hookdeck.

## Preview, test, and review the event hook

With your local application now exposed externally through a Hookdeck session, you can preview and test Okta event hook calls. Review details of the calls by using the Hookdeck dashboard. The Okta org is set up to call your local application when a user-creation event triggers. In this example, the event triggers when you add a user to your Okta org.

### Preview

To run a preview call of your event hook:

1. In the Admin Console, go to **Workflow** > **Event Hooks**.
1. Locate the event hook that you created during the set-up step. In this example, select `New User Event Hook` or the name you gave the event hook.
1. Click the **Actions** menu for this hook, and select **Preview**.
1. In the **Configure Event Hook request** section, select an event from the **Event Type** dropdown menu. In this example, there’s only `User Created (user.lifecycle.create)`.
1. The most recent event populates the **Preview & Deliver Event Hook** section with the JSON body of the event hook if there’s one. If no event is available, the JSON body populates with sample data.
1. Ensure that both your Hookdeck session and local sample application are running.
1. Click **Deliver Request**. The Event Hook Preview displays the status request as either successful or a failure. Review your local application console to view the output of the event hook body. For example:

   <div class="three-quarter">

   ![An image of the application terminal with response body output to the console.](/img/hooks/hookdeck-event-hook-body.png)

   </div>

1. Review your Hookdeck terminal output for a line item reference to the specific call and a unique dashboard URL to the details on the call.

   <div class="three-quarter">

   ![An image of the Hookdeck terminal with output to the console.](/img/hooks/hookdeck-dashboardURL.png)

   </div>

1. Review your Hookdeck dashboard (`https://dashboard.hookdeck.com/cli/events`). Each call recorded by Hookdeck appears in the interface from which you can review the complete call response body, header, and other details.

### Test

To run a test of your event hook:

1. Ensure that both your Hookdeck session and local sample application are running.
1. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    * Go to **Directory** > **People**, and click **Add Person**. As an example, add the user Jane Doe with the following fields:
        * **First Name:** Jane
        * **Last Name:** Doe
        * **User Name:** jane.doe@hookdeckexample.com

1. Click **Save** to create a user. The new user triggers an event hook call.

1. Navigate back to your local application's console. The request body for this call appears in the console, as designed by the local application code.

1. Review your Hookdeck terminal output for a line item reference to the specific call and a unique dashboard URL to the details on the call.

1. Review the unique dashboard URL (for example, `https://dashboard.hookdeck.com/cli/events/evt_x3H5QdAL2JGvxMbvqcvwK8UF`). Scroll to the **Body** section and search for the **target** property. Your new user's name and ID appear there.

<div class="three-quarter border">

![An image of the Hookdeck dashboard that includes body details.](/img/hooks/hookdeck-body-target-property.png)

</div>

## See also

See [Event hooks](/docs/concepts/event-hooks/) for background conceptual information on event hooks.
