Generate a SCIM instance based on your submission configuration:

1. From the **Test integration** page, click **Generate instance**. A page appears to add your instance details.

    > **Note:** There's a limit of five app instances in an Okta Developer Edition org. The **Generate instance** option is deactivated when you reach this limit. Deactivate unused instances to make room for new instances in your org. See [Deactivate app instances in your org](/docs/guides/submit-oin-app/scim/main/#deactivate-an-app-instance-in-your-org).

1. In the **General settings** tab, enter an **Application label** and any other required integration properties.
1. Click **Done**. Your generated test instance appears with more tabs for configuration.
1. Click **Provisioning** > **Configure API Integration**.
1. Select **Enable API integration**.
   * For custom or bearer authentication, specify the **API token** for your instance.
   * For OAuth 2.0 authentication, click **Authenticate with {yourApp}** and provide credentials for your test instance.
1. Click **Test API Credentials** to test authentication to your SCIM service. If there's an error, verify that the credentials are correct.
1. Click **Save**.
1. Select **Settings** > **To Okta** from the updated **Provisioning** tab.
1. In the **General** section, click **Edit** to schedule imports and configure the username format for imported users.

   You can also define a percentage of acceptable assignments before the [import safeguards](https://help.okta.com/okta_help.htm?id=csh-eu-import-safeguard) feature is automatically triggered.

1. Click **Save**. Next, [configure attribute mappings](#configure-attribute-mappings).

> **Note:** Your SCIM app must support redirect URIs that include the app name (`{appName}`). This app name string is generated after you create your app instance. See SCIM service [authentication](/docs/guides/scim-provisioning-integration-prepare/main/#authentication) for a list of redirect URIs required. Your app name appears in the **General settings** tab or in the Admin Console URL when you're viewing the instance page.

#### Configure attribute mappings

SCIM attribute mappings are configured at the instance-level. Ensure that these mappings reflect the current attributes supported by your app. The OIN team uses the updated attribute mappings in your test instance for integration provisioning settings in the OIN catalog.

After you've enabled the provisioning API connection in your test instance, configure attribute mappings to and from Okta in the **Provisioning** tab.

* **To App**: User attribute mappings from Okta to your app
* **To Okta**: User attribute mappings from your app to Okta

Configure the user attribute mappings after deleting the unnecessary mappings and attributes, and then proceed to configure the attributes:

   * **Update attributes**

   To update attributes:

   1. Select **To App** on the left **Settings** panel of the **Provisioning** tab.
  The **Provisioning to App** settings appear. The provisioning operations are already set by default from the [SCIM properties](#properties) section when you configured your integration.

   1. Scroll to the **{yourApp} Attribute Mappings** section.
   1. Click **Go to Profile Editor**.
   1. In the Profile Editor, click **Add Attribute**.
   1. Enter the information for the new attribute that you’re adding and then click **Save**.
       > **Note:** The **Scope** property determines whether the attribute that you're adding can be assigned at a group level or per user. If you want your admins to assign a value for this attribute at a group level, don't select the **User personal** checkbox.

   1. After adding attributes, go back to the **{yourApp} Attribute Mappings** section and click **Edit** to map your new attributes. A dialog appears with two dropdown fields.

   1. Select **Map from Okta Profile** in the first dropdown list.
   1. In the second dropdown list, select the Okta profile attribute that you want to map over to the SCIM attribute.
   1. Click **Save**.
   1. Repeat these steps for all SCIM attributes that you want to map (from Okta to your app).
      <div class="three-quarter border">

         ![Displays the map attribute dialog.](/img/oin/scim_check-attributes-14.png)

      </div>

   7. After you update the mappings from Okta to your app, click **To Okta** in the **Settings** section.
   8. Scroll to the **{yourApp} Attribute Mappings** section. Find the attribute that you want to update and click **Edit**. A dialog appears with two dropdown fields next to **Attribute value**.
   9. Select **Map from {yourApp} App Profile** from the first dropdown list.
   10. In the second dropdown list, select the SCIM attribute that you want to map to the Okta attribute.
   11. Click **Save**.
   12. Repeat these steps for all SCIM attributes that you want to map from your app to Okta (in the **Settings** > **To Okta** panel).

   * **Update mappings**
   To update mappings:

   1. In the Profile Editor, click **Mappings**.
   1. Click **{yourApp} to Okta User** at the top of the page.
   1. Scroll to the attribute that you want to delete, click the mapping icon (yellow arrow) and select **Do not map**.

    <div class="three-quarter border">

         ![Displays the map attribute dialog.](/img/oin/scim_unmap-attribute.png)

      </div>

   1. Click **Save Mappings**.
   1. Perform **Do not map** and **Save Mappings** actions for all attributes that you want to remove from your app to Okta mappings.
   1. Click **Apply updates now** to save all the attributes you unmapped.

   1. In the Profile Editor, click **Mappings**.
   1. Click **Okta User to {yourApp}** at the top of the page.
   1. Scroll to the attribute that you want to delete, click the mapping icon (yellow arrow) and select **Do not map**.
   1. Click **Save Mappings**.

   1. Perform **Do not map** and **Save Mappings** actions for all attributes that you want to remove from Okta to your app mappings.
   1. Click **Apply updates now** to save all the attributes you unmapped.

   1. In the Profile Editor, delete all the corresponding attributes from the mapping by clicking **X** next to the attribute and then clicking **Delete Attribute** to confirm.

   1. Repeat this step for all the attributes that you want to delete.

After you complete your attribute mappings, you're ready to [test your integration](#test-your-integration).
