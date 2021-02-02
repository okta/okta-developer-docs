---
title: Preview and Test the Event Hook
---
The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service when an event is triggered. In this example, the event is triggered when a user is deactivated in the Okta org.

### Preview
To run a preview call of your Event Hook, sign in to your Okta org as the super admin.

1. In the Admin Console, go to **Workflow** > **Event Hooks**.
2. Locate the Event Hook you created during the set-up step. In this example, select `Deactivated User Event Hook` or the name you gave the Event Hook.
3. Click the **Actions** menu for this hook, and select **Preview**.
4. In the **Configure Event Hook request** section, select an event from the **Event Type** drop-down menu. In this example, there is only one: `User deactivated (user.lifecycle.deactivate)`.
5. Select a previous recent event (in this case, a user deactivation) from the **System Log Event** drop-down menu. The **Preview & Deliver Event Hook** section populates the JSON body of the Event Hook. If no event is available, the JSON body populates with sample data.
6. Optionally, click **Edit** to modify the JSON body call. For example, you can change the `target` object's property, `displayName`, to `John Doe`.
7. Navigate to your Glitch application, opening the log console (**Tools** > **Logs**). Make sure your application is listening for requests.
8. Click **Deliver Request**. The Event Hook Preview displays the status request as either successful or a failure. Check your Glitch application console. The following message should display if successful:

     `The user John Doe has been deactivated on the Okta org!`

### Test
To run a test of your Event Hook:

1. Start by going to your Glitch application and opening the log console (**Tools** > **Logs**). Make sure your application is listening for requests.
2. In your Okta org, sign in as an administrator and create a test user in the Admin Console.
    - Navigate to **Directory** > **People**, and click **Add Person**.
    - As an example, add the user John Doe as seen from the [Event Object sample code](/docs/guides/event-hook-implementation/event-object).
3. For this user, select the User's profile by clicking John Doe's name.
4. Click the **More Actions** drop-down menu, and select **Deactivate**.
5. Confirm the deactivation.
6. Navigate back to your Glitch application's log console. You should see the following output to the console:

    `The user John Doe has been deactivated on the Okta org!`

> **Note:** Review the [troubleshooting](/docs/guides/common-hook-set-up-steps/troubleshooting) section for information if you encounter any setup or configuration difficulties.
