---
title: Test the Token Inline Hook
---

The Token Inline Hook is now ready for testing. You now have the following applications configured:

- The Okta-Hosted-Login sample application (`samples-nodejs-express-4`) is ready to authenticate users from your Okta org.
- The external service (Glitch.com project) is ready with code to receive and respond to an Okta Token Inline Hook call.
- The Okta org is setup to call the external service when a Token Inline Hook is triggered by a user sign-in from the Okta-Hosted-Login sample application, and ready to receive a response.

>**Note:** Make sure you have users assigned to your application and at least one user is part of the [Patients data store](/docs/guides/token-inline-hook/check-against-store/) in your Glitch application.

### Test your hook

1. Navigate to your sample application project folder (`samples-nodejs-express-4`).

2. Start your Okta-Hosted-Login server (`npm run okta-hosted-login-server`).

3. Navigate to your sample application (`http://localhost:8080`).

4. Navigate to your Glitch.com project and open the Console Logs window (**Tools** > **Logs**).

5. Return to your sample application and sign in with an Okta user who is NOT in the Patients data store.

    - The user should sign in as normal; only the user name should appear in the Glitch log window.
    - If you extended the sample application, click on `My Profile` in the left-hand navigation pane. Only the the user info claims are included in the table.

6. Sign out of the sample application, and now sign in with an Okta user who IS in the Patients data store.

    - The user should sign in as normal; however, this user should have a patient ID displayed in the Glitch console output, as well as a successful implementation record of the Token Inline Hook, available for review in your Okta org's System Log (**Reports** > **System Log**).
    - If you extended the sample application, click on `My Profile` in the left-hand navigation pane. The patient ID is added as part of the Claims table.

> **Note:** Review the [Token Inline Hooks troubleshooting](/docs/reference/token-hook/#troubleshooting) content or the [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/troubleshooting/) section for information on any difficulties.
