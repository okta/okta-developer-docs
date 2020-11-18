---
title: Enable and verify Event Hook
---
The Event Hook must be set up and activated within your Okta Developer Console.

To set up and activate the Event Hook:

1. Navigate to the Workflow > Event Hooks page.

2. Click **Create Event Hook**.

3. In the **Add Event Hook Endpoint** dialog box, complete the following fields:

    - Add a name for the hook (in this example, "Deactivated User Event Hook").

    - Add your external service URL, including the endpoint. For example, use your Glitch project name with the end point: https://your-glitch-projectname.glitch.me/userDeactivated).

    - Include authorization field. In this example, `authorization`

    - Include the authorization secret. In this eample, `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

4. In the **Requests** section of the dialog box, subscribe to the Event Type you want to monitor. In this example, a user deactivated in the Okta org: `User deactivated`

5. Click **Save & Continue**.

6. You can complete the one-time verification `GET` call at this time or verify the Event Hook later. If using the Glitch example, proceed to verification.

To complete the one-time verification of the Event Hook:

- After creating the Event Hook &ndash; and if your external service is ready to handle the request &ndash; click **Verify** to complete the one-time verfication step.

or

- In the Event Hooks table, click the Actions drop-down menu of any **UNVERIFIED** Event HGook, and select **Verify**, again, making sure that your external service is ready for the verification call.

The Event Hook is now set up with a status of **VERFIFIED** and is ready to send Event Hook calls to your external service.

<NextSectionLink/>