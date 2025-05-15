2. Specify the **Application label** and any integration properties required in the **General settings** tab.
3. Click **Done**. The **Assignments** tab appears.
   You can assign users to your integration later, see [Assign test users to your integration](#assign-test-users-to-your-integration-instance).
4. Click the **Sign On** tab.
5. Click **View SAML setup instructions** to open a new tab to your integration setup instructions. This is the customer configuration guide that you previously specified in the OIN Wizard.
6. Follow the instructions in your guide to set up the SAML SSO integration on your app.
    * Click **Copy** next to **Metadata URL** to copy the full SAML metadata URL required for the integration.
    * To view specific SAML metadata details, click the **More details** arrow.
7. Follow these steps if you have an Identity Engine Okta Integrator Free Plan org:
   1. Click the **Sign On** tab, scroll to the **User authentication** section, and click **Edit**.
   1. Select **Password only** from the **Authentication policy** dropdown menu.
   [[style="list-style-type:lower-alpha"]]
   1. Click **Save**.
   > **Note:** Most recent Okta Integrator Free Plan orgs are Identity Engine orgs. See [OIN Wizard authentication policy for testing](/docs/guides/submit-app-prereq/main/#oin-wizard-authentication-policy-for-testing).

8. [Assign test users to your instance](#assign-test-users-to-your-integration-instance) before you start testing your SSO flows.