---
title: Event hook filtering
excerpt:  Create an event hook filter for use with your external service code
layout: Guides
---

<ApiLifecycle access="ea" />

This guide provides a functional example of an Okta event hook filter. It's based on the [Event hook implementation](/docs/guides/event-hook-implementation) project, which uses the website [Glitch.com](https://glitch.com) to act as an external service. This service receives and responds to Okta event hook calls.

<EventHookEANote/>

---

#### Learning outcomes

* Understand the Okta event hook calls and responses with a filter implementation.
* Implement a functional example of an Okta event hook filter with a Glitch.com project.
* Test the Okta event hook filter.

#### What you need

* [Okta Developer Edition org](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account

**Sample code**

* [Okta Event Hook with Filtering](https://glitch.com/~okta-event-hook-with-filtering)

---

## About event hook filters

Event hook filters reduce the amount of event hook calls to your external service endpoint. The filter triggers hooks only for events based on the logic that you define. You can implement one or more filters for your event hook and apply them when creating a hook or apply them later. See [Event hooks](/docs/concepts/event-hooks/#which-events-are-eligible).

## Set up the sample external service

This guide uses the website [Glitch.com](https://glitch.com) to act as an external service and to implement the event hook with an Okta org. See the following Glitch project to remix (copy) a functional code example that implements an event hook when a user is added to a group: [Okta Event Hook with Filtering](https://glitch.com/~okta-event-hook-with-filtering/).

Review [Event hook implementation](/docs/guides/event-hook-implementation) to understand how to receive and parse the event hook call in your code. After copying the project, go to the following section to create an event hook with a filter.

## Create an event hook with a filter

The Glitch event hook example uses the Okta event triggered when a user is added to a group. This event hook triggers for every instance of a group addition. With event hook filters, you can create business logic, using the Okta Expression Language, to isolate only certain group additions that trigger the event hook. In this example, only users added to the Sales group trigger the event hook.

1. Sign in to your [Okta org](https://login.okta.com/).

1. From the Admin Console, go to **Workflow** > **Event Hooks**.

1. Click **Create Event Hook**.

1. In the **Endpoint URL** field, add your external service URL, including endpoint. For example, use your Glitch project name with the endpoint: `https://${your-glitch-projectname}.glitch.me/userAdded`.

1. In the **Event Hook Name**, add a unique name for the hook (in this example, "User added to Sales group event hook").

1. <HookBasicAuthStep/>

1. In the **Select Events** section, subscribe to the event type you want to monitor. In this example, a user added to a group. Click in the field to search for `User added to group`.

1. Click **Create hook & Continue**.

1. In the **Apply filters** section, select the **Apply filter** checkbox.

1. Create the example filter by selecting the following values in the Simple UI:

    * **Field** = `target.type`

    * **Operator** = `eq`

    * **Value** = `UserGroup`

    Click **Add Another**:

    * **Field** = `target.displayName`

    * **Operator** = `eq`

    * **Value** = `Sales`

1. Click the **User Okta Expression Language (advanced)** link to review the Okta Expression Language statement: `event.target.?[type eq 'UserGroup'].size()>0 && event.target.?[displayName eq 'Sales'].size()>0`.

    This statement triggers an event hook request to your external service when a user is added to the Sales group (the statement is TRUE). Other additions to different groups don't trigger an event hook.

    > **Note:** Review the Okta System Log (from the Admin Console, **Reports > System Log**) to create expressions that target your real-world event data.

1. Click **Save & Continue**.

1. In the **Preview** section, click **Skip this step**.

    >**Note:** The event hook preview bypasses the event hook filter. Don't test your filter with the **Preview** feature.

1. Ensure that your Glitch application is listening for your requests, and then click **Verify** to complete the one-time verification step. See [One-time verification request](/docs/concepts/event-hooks/#one-time-verification-request).

> **Note:** It may take a few minutes before events are sent to the event hook after it's created or updated.

## Create test data

In your Okta org, sign in as an administrator and create two groups in the Admin Console.

1. Go to **Directory** > **Groups**, and click **Add Group**.

1. Fill in the **Name** field in the **Add Group** dialog. In this example, use **Sales**.

1. Click **Save**.

1. Repeat the process to add a group named **Support**.

If necessary, create a test user:

1. Go to **Directory** > **People**, and click **Add Person**.

1. Fill in the following fields in the **Add Person** dialog:

    * First name  `Test`

    * Last name: `User`

    * Username: `test_user@example.com`

1. Click **Save**.

## Test the event hook filter

1. Go to your Glitch application and open the log console (**Tools** > **Logs**). Ensure that your application is listening for requests.

1. Return to your Okta org, and search for your test user.

1. Click the name of the test user's profile.

1. Click the **Groups** tab, and click in the search field. Search for the **Support** group, and click to add.

1. Search for **Sales** group, and click to add.

1. Go to your Glitch application's log console. There should only be the following output in the console:

    `The user Test User has been added to the Sales group!`

The event hook filter only triggers requests for the addition of a user to the Sales group. All other group additions are ignored.

## Next steps

Review the following guides to implement other inline hook examples:

* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)
* [SAML assertion inline hook](/docs/guides/saml-inline-hook)
* [Telephony inline hook](/docs/guides/telephony-inline-hook)

## See also

For background conceptual information on event hooks, see [Event hooks](/docs/concepts/event-hooks/).
