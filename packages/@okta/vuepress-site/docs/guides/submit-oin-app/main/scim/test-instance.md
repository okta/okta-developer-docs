2. In the **General settings** tab, enter an **Application label** and any other required integration properties.
3. Click **Done**. Your generated test instance appears with more tabs for configuration.
4. Click **Provisioning** > **Configure API Integration**.
5. Select **Enable API integration**.
   * For custom or bearer authentication, specify the **API token** for your instance.
   * For OAuth 2.0 authentication, click **Authenticate with {yourApp}** and provide credentials for your test instance.
1. Click **Test API Credentials** to test authentication to your SCIM service. If there's an error, verify that the credentials are correct.
1. Click **Save**.
1. Select **Settings** > **To Okta** from the updated **Provisioning** tab.
1. In the **General** section, click **Edit** to schedule imports and configure the username format for imported users.

   You can also define a percentage of acceptable assignments before the [import safeguards](https://help.okta.com/okta_help.htm?id=csh-eu-import-safeguard) feature is automatically triggered.

1. Click **Save**. Next, [configure attribute mappings](#configure-attribute-mappings).

> **Note:** Your SCIM app must support redirect URIs that include the app name (`{appName}`) that's generated after you create your app instance. See SCIM service [authentication](/docs/guides/scim-provisioning-integration-prepare/main/#authentication) for a list of redirect URIs required. Your app name appears in the **General settings** tab or in the Admin Console URL when you're viewing the instance page.

#### Configure attribute mappings

> **Note:** Configure attribute-mapping instructions are only for SCIM integrations.

SCIM integrations that are submitted through the OIN Wizard have a default set of user attribute mappings. The user schema in your SCIM app might not support all of these attributes. Ensure the integration that you're submitting to Okta reflects the attributes that are supported by your app. The OIN team uses the attribute mappings in your test instance for your integration provisioning settings in the OIN catalog.

After you've enabled the provisioning API connection in your test instance, configure user attribute mappings to and from Okta in the **Provisioning** tab of your instance.

* **To App**: User attribute mappings from Okta to your app
* **To Okta**: User attribute mappings from your app to Okta

Configure the user attribute mappings after deleting the unnecessary mappings and attributes, and then proceed to configure the attributes:

**Delete mappings**

   1. Select **To App** on the left **Settings** panel.
   The **Provisioning to App** settings appear. The provisioning operations are already set by default from the [SCIM properties](#properties) section when you configured your integration.
   2. Scroll to the **{yourApp} Attribute Mappings** section.
   3. Click **X** next to the attribute that you want to delete, and then click **OK** to confirm.
      Repeat this step until you remove all the mappings for the attributes that you want to delete.
   4. Select **To App** on the left **Settings** panel.
   5. Scroll to the **Okta Attribute Mappings** section.
   6. Click **X** next to the attribute that you want to delete, and then click **OK** to confirm. 
   7. Repeat this step until you remove all the mappings for the attributes that you want to delete.

**Delete attributes**

   1. After removing all the mappings for the attributes that you want to delete, click **Go to Profile Editor**.

   2. In the **Profile Editor**, delete all the corresponding attributes from the mapping by clicking **X** next to the attribute and then **Delete Attribute** to confirm.
      Repeat this step for all the attributes that you want to delete.

**Add attributes and mappings**

   1. In the **Profile Editor**, click **Add Attribute**.

   2. Enter the information for the new attribute that you’re adding and then click **Save**.
      > **Note:** The **Scope** property determines whether the attribute that you're adding can be assigned at a group level or per user. If you want your admins to assign a value for this attribute at a group level, don't select the **User personal** checkbox.

   3. After adding attributes, go back to the **{yourApp} Attribute Mappings** section and click **Edit** to map your new attributes. A dialog appears with two dropdown fields.

   <div class="three-quarter border">

   ![Displays the map attribute dialog.](/img/oin/scim_check-attributes-14.png)

   </div>

   4. Select **Map from Okta Profile** in the first dropdown list.
   5. In the second dropdown list, select the Okta profile attribute that you want to map over to the SCIM attribute.
   6. Click **Save**.
   7. Repeat these steps for all SCIM attributes that you want to map (from Okta to your app).
   8. After you update the mappings from Okta to your app, click **To Okta** in the **Settings** section.
   9. Scroll to the **{yourApp} Attribute Mappings** section. Find the attribute that you want to update and click **Edit**. A dialog appears with two dropdown fields next to the **Attribute value**.
   10. Select **Map from {yourApp} App Profile** from the first dropdown list.
   11. In the second dropdown list, select the SCIM attribute that you want to map to the Okta attribute.
   12. Click **Save**.

After you complete your attribute mappings, you're ready to [test your SCIM integration](#test-your-scim-integration).
