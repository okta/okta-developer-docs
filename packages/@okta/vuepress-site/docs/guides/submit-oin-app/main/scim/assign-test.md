#### Assign test users to your integration instance

For SSO-only flow tests, create your test users in Okta before you assign them to your app. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) and [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign).

For SSO flow tests without JIT provisioning, you need to create the same test user in your app. If the app supports JIT provisioning, Okta provisions the test user automatically.

For SCIM provisioning, you can assign an imported user to your app. Alternatively, you can create a user in Okta and push them to the app through SCIM. Then you can assign the user to the app. See [About adding provisioned users](https://help.okta.com/okta_help.htm?type=oie&id=lcm-about-user-management).

> **Note:** You need an Okta admin role that grants permission to create users.

To assign test users to your app:

1. In the OIN Wizard, go to **Test integration** > **Generate instance**.
1. Click the **Assignments** tab.
1. Click **Assign**, and then select either **Assign to People** or **Assign to Groups**.
1. Enter the people or groups that you want to assign to the app, and then click **Assign** for each.
1. Verify the user-specific attributes for the assigned users, and then select **Save and Go Back**.
1. Click **Done**.
1. Click **Begin testing** in the OIN Wizard. After the **Test integration** page appears, continue to the [Application instances for testing](#application-instances-for-testing) section to include your test instance in the OIN Submission Tester.

   > **Note:** If you're not in the OIN Wizard, go to **Your OIN Integration** > **Select protocol**  > **Configure your integration** > **Test integration**.
