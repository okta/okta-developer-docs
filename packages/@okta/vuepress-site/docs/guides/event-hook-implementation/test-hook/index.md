---
title: Test the Event Hook
---
The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service when an Event is triggered; in this example, when a user is deactivated in the Okta org.

### Test
To run a test of your Event Hook, go to the Okta sign-in page for your Okta org.

1. Start by signing in as an administrator and creating a test user in the Developer Console. As an example, add the user John Doe as seen from the [Event Object sample code](docs/guides/event-hook-implementation/event-object).
2. For this user, select the User's profile by clicking John Doe's name.
3. Click the **More Actions** drop-down menu, and select **Deactivate**.
4. Confirm the deactivation.
5. Navigate to your Glitch application's log console. You should see the following output to the console:

    `The user John Doe has been deactivated on the Okta org!`

> **Tip:** Review the troubleshooting section for information if encountering any setup or configuration difficulties.
