---
title: Import Users with Inline Password Hooks
---

## Migration Program Plan

A migration program utilizes Okta's Inline Password Hook feature to seamlessly migrate users as they authenticate. The broad strokes look like:

1. Create all the users from the legacy system in Okta with a provider set to: `IMPORT`. **NOTE:** This can be done in bulk and does NOT require individual user credentials.
2. Optional: Create groups and applications in Okta. Assign users to groups and assign groups and users to applications
3. Create an application to service requests from Okta that can validate credentials against the legacy user system.
4. Register an Inline Password Hook with Okta that connects to the application created in step 3.

Typically, you run a migration program like this for a set period of time, say 60 days. At the end of that time, you delete the inline password hook. For any users that have not completed the migration on their own, you can issue a password reset using the Okta API. Those users would receive an email to change their password and would then be able to login using Okta.
