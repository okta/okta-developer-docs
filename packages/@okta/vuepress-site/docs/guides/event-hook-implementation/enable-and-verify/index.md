---
title: Enable and verify Event Hook
---
The Event Hook must be set up and verfied within your Okta Developer Console.

### Set up the Event Hook
To set up the Event Hook:

1. Navigate to the **Workflow** > **Event Hooks** page.

2. Click **Create Event Hook**.

3. Add a name for the hook in the **Add Event Hook Endpoint** dialog box (in this example, "Deactivated User Event Hook").

4. Add your external service URL, including endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/userDeactivated`.

5. Include authentication field and secret. In this example:

    - **Authentication field** = `authorization`

    - **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

6. In the **Requests** section of the dialog box, subscribe to the Event Type you want to monitor. In this example, a user deactivated in the Okta org: `User deactivated`

7. Click **Save & Continue**.

8. You can complete the one-time verification Okta call at this time or verify the Event Hook later. If using the Glitch example, proceed to verification.

> **Note** You can also set up an Event Hook using an API. See [Inline Hooks Management](/docs/reference/api/inline-hooks/) for further information.

### Verify the Event Hook
You must verify the Event Hook to prove your external service controls the endpoint. See the [One-Time Verification Request](docs/concepts/event-hooks/#one-time-verification-request) for further information on this process.

To complete the one-time verification of the Event Hook:

- After creating the Event Hook &ndash; and if your external service is ready to handle the request &ndash; click **Verify** to complete the one-time verification step.

or

- In the Event Hooks table, click the Actions drop-down menu of any **UNVERIFIED** Event Hook, and select **Verify**, again, making sure that your external service is ready for the verification call.

The Event Hook is now set up with a status of **VERIFIED** and is ready to send Event Hook calls to your external service.

<NextSectionLink/>