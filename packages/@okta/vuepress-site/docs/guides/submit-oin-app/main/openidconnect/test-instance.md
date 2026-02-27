1. From the **Test integration** page, click **Generate instance**.

    A page appears to add your instance details. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app).

    When your integration is published in the OIN catalog, the customer admin uses the Admin Console **Browse App Catalog** > [add an existing app integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) page to add your integration to their Okta org. The next few steps are exactly what your customer admins experience when they instantiate your integration with Okta. This enables you to assume the customer admin persona to verify that app labels and properties are appropriate for your integration.

    If you need to change any labels or properties, go back to edit your submission.

    > **Note:** The Integrator Free Plan has no limit on active app instances. You can create as many test instances as needed for your integration. To deactivate any instances that you no longer need, see [Deactivate an app instance in your org](#deactivate-an-app-instance-in-your-org).

2. Specify the **Application label** and any app properties required in the **General settings** tab.
3. Click **Done**. The **Assignments** tab appears.
   You can assign users to your integration later, see the next [Assign test users to your integration](#assign-test-users-to-your-integration-instance) task.
4. Click the **Sign On** tab to view and copy the OIDC client ID and secret.
5. Click **View Setup Instructions** to open a new tab to your integration setup instructions. This is the customer configuration guide that you previously specified in the OIN Wizard.
6. Follow the instructions in your guide to set up the SSO integration on your app with the OIDC client ID and secret provided.
7. Follow these steps if you have an Identity Engine Okta Integrator Free Plan org:
   1. Click the **Sign On** tab, scroll to the **User authentication** section, and click **Edit**.
   1. Select **Password only** as the **App sign-in policy**.
   [[style="list-style-type:lower-alpha"]]
   1. Click **Save**.
   > **Note:** Integrator Free Plan orgs are Identity Engine orgs. See [OIN Wizard app sign-in policy for testing](/docs/guides/submit-app-prereq/main/#oin-wizard-app-sign-in-policy-for-testing).
8. Follow these steps if you have the Universal Logout integration with SSO:
   1. Click the **Sign On** tab, scroll to the **Logout** section.
   [[style="list-style-type:lower-alpha"]]
   1. Click **Edit** and select **App logs out when: Okta system or admin initiates logout**.
   1. Click **Save**.

9. [Assign test users to your instance](#assign-test-users-to-your-integration-instance) before you start testing your SSO flows.