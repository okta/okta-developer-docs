---
title: Event hook filtering
excerpt:  Create an event hook filter for use with your external service code
layout: Guides
---

<ApiLifecycle access="ea" />

This guide provides a working example of an Okta event hook filter in use with an external service. It is based on the [Event hook implementation](/docs/guides/evevnt-hook-implementation) project, which uses the website [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Okta event hook calls.

<EventHookEANote/>

---

**Learning outcomes**

* Understand the Okta event hook calls and responses with a filter implementation.
* Implement a working example of an Okta event hook filter with a Glitch.com project, which acts as an external service.
* Test the Okta event hook filter.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account

**Sample code**

* [Okta Event Hook: Display Deactivated Users](https://glitch.com/~okta-event-hook)

---

## About event hook filters

Event hook filters reduce the amount of event hook calls to your external service endpoint. You can implement one or more filters to your event hook and apply them when creating a hook or at a later date. For further information, see [Event hooks](/docs/concepts/event-hooks/#which-events-are-eligible).

## Set up the sample external service

This guide uses the website [Glitch.com](https://glitch.com) to act as an external service and to implement the event hook with an Okta org. See the following Glitch project to remix (copy) a working code example that implements an event hook when a user is deactivated: [Okta Event Hook: Display Deactivated Users](https://glitch.com/~okta-event-hook/).

Review the [Event hook implementation](/docs/guides/event-hook-implementation) to understand how to receive and parse the event hook call in your external service code. After copying the project, go to the following section to create and event hook with a filter

## Create an event hook with a filter

The Glitch event hook example uses the Okta event for a user deactivation. This event hook triggers for every instance of a user deactivation. With event hook filters, we can create business logic, using the Okta Expression Language, to isolate only certain deactivations that trigger the event hook. In this example, deactivated users with an email of `test_user@example.com` don't trigger the event hook.

1. Sign in to your [Okta org](https://login.okta.com/).

1. From the Admin Console, go to **Workflow** > **Event Hooks**.

1. Click **Create Event Hook**.

1. In the **Endpoint URL** field, add your external service URL, including endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/userDeactivated`.

1. In the **Event Hook Name**, add a unique name for the hook (in this example, "Deactivated User Event Hook with Filter).

1. In the **Customize request** section, include authentication field and secret. In this example, use [Basic Authentication](/docs/guides/common-hook-set-up-steps/nodejs/main/#http-header-basic-authentication):

    * **Authentication field** = `authorization`

    * **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

1. In the **Select Events** section, subscribe to the event type you want to monitor. In this example, a user deactivated in the Okta org. Click in the field to search for `User deactivated`.

1. Click **Create hook & Continued**.

1. In the **Apply filters**, select the **Apply filter** checkbox.

1. Create the example filter by selecting the following values in the Simple UI:

    * **Field** = `target.alternateId`

    * **Operator** = `eq`

    * **Value** = `test_user@example.com`

1. Click the **User Okta Expression Language (advanced)** link to review the Okta Expression Language statement: `event.target.?[alternateId eq 'test_user@example.com'].size()>0`.

    This statement, when TRUE, triggers an event hook request to your external service when a user is deactivated with a `test_user@example.com`. All other deactivated users do not trigger an event hook.

1. Click **Save & Continue**.

1. On the **Preview** section, click **Skip this step**.

    >**Note:** The event hook preview feature bypasses the event hook filter. Do not test your filter with the **Preview** tab or screen.

1. Ensure your Glitch application is listening for your requests, and then click **Verify** to complete the one-time verification step. For more information on this process, see [One-time verification request](/docs/concepts/event-hooks/#one-time-verification-request).

## Create test users

In your Okta org, sign in as an administrator and create a couple of test users in the Admin Console.

1. Go to **Directory** > **People**, and click **Add Person**.

1. Fill in the following fields in the **Add Person** dialog:

    * First name  `Test`

    * Last name: `User`

    * Username: `test_user@example.com`

1. Click **Save and Add Another**