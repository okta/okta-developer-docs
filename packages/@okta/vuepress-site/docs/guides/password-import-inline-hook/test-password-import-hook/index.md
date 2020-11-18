---
title: Test your hook
---
The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service when a Password Import Inline Hook is triggered.

### Test

To run a test of your Password Import Inline Hook, go to the Okta sign-in page for your Okta org.

- Start by signing in with one of the users from the data store, for example, "michelletest@doesnotexist.com", and enter an incorrect password.
- Your result should be an "Unable to Sign On" error.
- Sign in again using the correct password.
- Your result should be access to the Okta org and the import of the user's password into Okta.
- Sign out and sign in again to ensure the hook is no longer called (by reviewing the Developer Console logs).

> **Tip:** Review the [troubleshooting](/docs/guides/overview-and-considerations/troubleshooting) section for information if encountering any setup or configuration difficulties.