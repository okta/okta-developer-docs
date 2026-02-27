
1. From the **Test integration** page, click **Generate instance**. The **API Service integrations/ Authorize integration** page appears, where you can review the requested scopes.

    When your integration is published in the OIN catalog, the customer admin uses the Admin Console **Browse App Catalog** > [add an existing app integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) page to add your integration to their Okta org. The next few steps are exactly what your customer admins experience when they instantiate your integration with Okta. This enables you to assume the customer admin persona to verify that app labels and properties are appropriate for your integration.

    If you need to change any labels or properties, go back to edit your submission.

    > **Note:** The Integrator Free Plan has no limit on active app instances. You can create as many test instances as needed for your integration. To deactivate any instances that you no longer need, see [Deactivate an app instance in your org](#deactivate-an-app-instance-in-your-org).

2. On the **Authorize integration** page, click **Install & Authorize**.
3. Copy the client secret from the dialog and store it securely.
    > **Note**: For security purposes, the client secret is only displayed once and can't be retrieved later.
4. Click **Done**.
5. On the **General** tab, copy the **Okta domain** and **client ID** and securely store them for your integration test.
6. Configure your app using the Okta domain, client ID, and client secret.
7. Perform manual testing to verify your integration.
8. Once the testing is complete, click **Continue to submission**. The **Test integration** page appears.
9. Ensure that the **Test account requirements** and **API service requirements** checkboxes show a completed status.