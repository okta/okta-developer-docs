#### Generate instance

Create an instance for your updated OIDC integration. See []
1. 
2. Specify the **Application label** and any app properties required in the **General settings** tab.
3. Click **Done**. The **Assignments** tab appears.
   You can assign users to your integration later, see the next [Assign test users to your integration](#assign-test-users-to-your-integration-instance) task.
4. Click the **Sign On** tab to view and copy the OIDC client ID and secret.
5. Click **View Setup Instructions** to open a new tab to your integration setup instructions. This is the customer configuration guide that you previously specified in the OIN Wizard.
6. Follow the instructions in your guide to set up the SSO integration on your app with the OIDC client ID and secret provided.
7. Follow these steps if you have an Identity Engine Developer Edition org:
   1. Click the **Sign On** tab, scroll to the **User authentication** section, and click **Edit**.
   1. Select **Password only** from the **Authentication policy** dropdown menu.
   [[style="list-style-type:lower-alpha"]]
   1. Click **Save**.
   > **Note:** Most recent Okta Developer Edition orgs are Identity Engine orgs. See [OIN Wizard authentication policy for testing](/docs/guides/submit-app-prereq/main/#oin-wizard-authentication-policy-for-testing).

8. [Assign test users to your instance](#assign-test-users-to-your-integration-instance) before you start testing your SSO flows.


Assign test users to your instances. See  [Assign test users to your app instance](/docs/guides/submit-oin-app/openidconnect/main/#assign-test-users-to-your-integration-instance).
