---
title: Test the Token Inline Hook
---

The Token Inline Hook is now ready for testing:

- The Okta-Hosted-Login sample application is ready to authenticate users from your Okta org.
- The external service (Glitch.com project) is ready with code to receive and respond to an Okta call.
- The Okta org is setup to call the external service when a Token Inline Hook is triggered by a user sign-in from the Okta-Hosted-Login sample application.

### Test
To run a test of your Token Inline Hook:

1. Start your Okta-Hosted-Login server (`npm run Okta-Hosted-Login-Server`).

2. Navigate to your sample application (`http:/localhost:8080`.

3. Navigate to your Glitch.com project and open the Console Logs window (**Tools** > **Logs**).

4. Return to your sample application and sign in with an Okta user who is NOT in the Patients data store.

    - The user should sign in as normal; only the user name should appear in the Glitch log window.

5. Sign out of the sample application and now sign in with an Okta user who IS in the Patients data store.
    - The user should sign in as normal; however, this user should have a patient ID displayed in Glitch output, as well as a successful implementation record of the Token Inline Hook, available for review in your Okta org's System Log (**Reports** > **System Log**).

Tip: Review the [Token Inline Hooks troubleshooting](/docs/reference/token-hook/#troubleshooting) content or the [Troubleshooting](/docs/guides/overview-and-considerations/troublehooting) section for information on any difficulties.