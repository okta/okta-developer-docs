1. From the **Test integration** page, click **Generate instance**.

   A page appears to add your instance details. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app).

   When your integration is published in the OIN catalog, the customer admin uses the Admin Console **Browse App Catalog** > [add an existing app integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) page to add your integration to their Okta org. The next few steps are exactly what your customer admins experience when they instantiate your integration with Okta. This enables you to assume the customer admin persona to verify that app labels and properties are appropriate for your integration.

   If you need to change any labels or properties, go back to edit your submission.

1. In the **General settings** tab, enter an **Application label** and any other required integration properties.
1. Click **Done**. Your generated test instance appears with more tabs for configuration.
1. If your integration supports entitlement management, go to **Entitlement Management** in the **General** tab.Click **Edit** and enable entitlement management.

   The **Governance** tab appears in the app page.

1. Click **Provisioning** > **Configure API Integration**.
1. Select **Enable API integration**.
1. Click **Save**.
1. Select **Settings** > **To Okta** from the updated **Provisioning** tab.
1. In the **General** section, click **Edit** to schedule imports and configure the username format for imported users.

   You can also define a percentage of acceptable assignments before the [import safeguards](https://help.okta.com/okta_help.htm?id=csh-eu-import-safeguard) feature is automatically triggered.

1. Click **Save**.
