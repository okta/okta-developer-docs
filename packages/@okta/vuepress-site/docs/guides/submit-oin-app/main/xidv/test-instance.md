
1. From the **Test integration** page, click **Generate instance**. 

   The **Identity Providers** > **Security** tab opens, displaying the **Configure IDV instance** page. When your integration is published in the OIN catalog, the customer admin uses this configuration page to activate your service. This enables you to assume the customer admin persona to verify that labels and properties are appropriate for your integration.

   If you need to change any labels or properties, go back to edit your submission.

   > **Note:** The Integrator Free Plan has no limit on active app instances. You can create as many test instances as needed for your integration. To deactivate any instances that you no longer need, see [Deactivate an app instance in your org](#deactivate-an-app-instance-in-your-org).

1. Under **General settings**, enter the name of the app instance in the **Instance name** field.
1. In the **Configure identity verification** section, enter the following properties:

   | Property | Description |
   | :--- | :--- |
   | **Client ID \*** | Enter the client ID from your IDV vendor. |
   | **Client secret \*** | Enter the client secret from your IDV vendor. |
   | **Scope \*** | The `openid`, `profile`, and `identity_assurance` scopes are pre-filled in the field and are required to perform the verification. Select the field and enter the name of another scope that you want to add. Press **Enter**. Repeat for each additional scope that you want to add. |

1. Click **Finish** to complete configuring your instance.
1. Add your user attributes by clicking the user profile dropdown menu, selecting the appropriate profile attribute, and mapping it to your configuration.
1. Click **Finish**. 
1. Click **Begin testing**. This action redirects you back to the **Test integration** page, where the newly created instance appears under the detected instances section.

##### Run the OIN Submission Tester for IDV

The OIN Submission Tester uses a real-time policy evaluation workflow to verify that your identity verification service correctly interacts with Okta core auditing systems.

1. In the **OIN submission tester** section, click **Add test user**. The **Test user for identity verification** dialog appears.
1. Select an active test user from your directory. 
   * **Note:** If you need to populate your environment with more accounts, click **Add more users to directory** before making your selection.
1. Click **Add test user** to bind the selected account to the active test cycle.
1. Click **Run test** to initiate the automated test sequence. The tester executes the following validation flow:
   * **Policy rule generation**: The tester creates a rule for the selected test user on the **Authentication Policies** tab of your [Okta Access Management Policy](/docs/guides/okta-account-management-policy/main).
   * **Isolated session execution**: The tester opens a browser window in incognito mode. Sign in to this session using the test user credentials.
   * **Identity verification flow invocation**: Once authenticated, manually trigger an event to force an [Okta account management policy](/docs/guides/okta-account-management-policy/main) evaluation. For a list of valid events, see [Alternate Use Cases for IDV](https://developer.okta.com/docs/guides/add-id-verification-idp/customidv/main/#alternate-use-cases).
   * **Identity verification flow evaluation**: Complete the identity proofing checkpoints that are required by your vendor service platform. If the integration fails to communicate with Okta, the tester displays an error message. For details on the System Log events that are captured during this phase, see [Identity Verification Events](/docs/guides/idv-integration/main/#identity-verification-events).
   * **Session cleanup**: The incognito window closes automatically, and the temporary authentication policy rule is deleted from your organization configuration.

1. Review your test results on the main **Test integration** page. When the testing sequence passes successfully, the following status criteria display with confirmation check marks:
   * **All required app instances are active**
   * **User to be tested on IDV added**
   * **All required tests passed within the past 48 hours**