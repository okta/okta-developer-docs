For SSO-only flow tests, create your test users in Okta before you assign them to your integration. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topics in the Okta product documentation.

For SSO flow tests without JIT provisioning, you need to create the same test user in your app. If your integration supports JIT provisioning, Okta provisions the test user on your app automatically.

For SCIM provisioning, you can assign an imported user to your app. Alternatively, you can create a user in Okta that can be pushed to your app through SCIM before you assign the user to your app. See [About adding provisioned users](https://help.okta.com/okta_help.htm?type=oie&id=lcm-about-user-management).

> **Note:** You need to have the org admin role assigned to you before you can create users in Okta.