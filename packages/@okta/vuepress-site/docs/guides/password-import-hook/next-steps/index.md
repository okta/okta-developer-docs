---
title: Next steps
---

For full descriptions of each object included in the request and response of Password Inline Hook requests, see the sections [Objects in the Request from Okta](/docs/reference/password-hook/#objects-in-the-request-from-okta) and [Objects in the Response You Send](/docs/reference/password-hook/#objects-in-response-you-send) in the reference documentation for the Password Import Inline Hook.

When you have completed the implementation of your external service, you need to register your endpoint with Okta and configure the Inline Hook. You can use the Admin Console to do this, by going to **Workflow > Inline Hooks** and clicking **Add Inline Hook**. You can also do this via API. See [Inline Hook Setup](/docs/concepts/inline-hooks/#inline-hook-setup) for information.

With the Inline Hook configured and available, you can use the [Create User with Password Import Inline Hook](/docs/reference/api/users#create-user-with-password-import-inline-hook) flow to add new users and specify that the Inline Hook should be used to handle their password migration.

When end users that you have added in this way attempt to sign in to Okta for the first time, the Inline Hook is triggered and Okta calls your external service.

