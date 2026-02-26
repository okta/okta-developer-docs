#### Assign test users to your integration instance

For SSO-only flow tests, create your test users in Okta before you assign them to your integration. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign).

For SSO flow tests without JIT provisioning, you need to create the same test user in your app. If your integration supports JIT provisioning, Okta provisions the test user on your app automatically.

For SCIM provisioning, you can assign an imported user to your app. Alternatively, you can create a user in Okta that can be pushed to your app through SCIM before you assign the user to your app. See [About adding provisioned users](https://help.okta.com/okta_help.htm?type=oie&id=lcm-about-user-management).

> **Note:** You need an Okta admin role that grants permission to create users.

To assign test users to your integration:

1. Continue from the OIN Wizard > **Test integration** > **Generate instance** > your app instance page.
1. Click the **Assignments** tab.
1. Click **Assign**, and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have SSO into your app, and then click **Assign** for each.
1. Verify the user-specific attributes for any people that you add, and then select **Save and Go Back**.
1. Click **Done**.
1. Click **Begin testing** (upper-right corner) from the OIN Wizard. After the **Test integration** page appears, continue to the [Application instances for testing](#application-instances-for-testing) section to include your test instance in the OIN Submission Tester.

   > **Note:** If you're not in the OIN Wizard, go to **Your OIN Integration** > **Select protocol**  > **Configure your integration** > **Test integration**.
