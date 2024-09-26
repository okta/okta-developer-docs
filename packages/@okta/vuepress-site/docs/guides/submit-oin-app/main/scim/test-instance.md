2. Specify the **Application label** and any integration properties required in the **General settings** tab.
3. Click **Done**. Your generated test instance appears with more tabs for configuration.
4. Click the **Provisioning** tab and click **Configure API Integration**.
5. Select **Enable API integration**.
   * For custom or bearer authentication, specify the **API token** for your instance.
   * For OAuth 2.0 authentication, click **Authenticate with {your_integration}** and provide credentials for your test instance.
1. Click **Test API Credentials** to test authentication to your SCIM service. If there's an error, check the credentials entered.
1. Click **Save**.
1. On the **Assignments** tab, ensure that the right users and groups in your org are assigned to the test instance. For instructions on how to assign the app integration to individual users and groups, see [Assign test users to your instance](#assign-test-users-to-your-integration-instance).

#### Configure provisioning attribute mappings

> **Note:** Configure provisioning attribute-mapping instructions are only for SCIM integrations.

SCIM integrations submitted through the OIN Wizard come with a default set of user attribute mappings. The user schema in your SCIM app might not support all of these attributes. Ensure that the integration you're submitting to Okta for review reflects the attributes supported by your app. The OIN team uses the attribute mappings in your test instance for your integration provisioning settings in the OIN catalog.

After you've enabled the provisioning API connection in your test instance, configure user attribute mappings to and from Okta in the **Provisioning** tab of your instance:

* **To App**: User attribute mappings from Okta to your app
* **To Okta**: User attribute mappings from your app to Okta

1. Select **To App** on the left **Settings** panel of the **Provisioning** tab.
  The **Provisiong to App** settings appear. The provisioning operations are already set by default from the [SCIM properties](#properties) section when you configured your integration.

1. Scroll to the **{yourApp} Attribute Mappings** section.

   * Delete attributes:
     1. Click **X** next to the attribute that you want to delete, and then click **OK** to confirm.

        Repeat this step until you remove all the mappings for the attributes that you want to delete.

     1. After removing all the mappings for the attributes that you want to delete, click **Go to Profile Editor**.

     1. In the Profile Editor, delete all the corresponding attributes from the mapping: click **X** next to the attribute, and then click **Delete Attribute** to confirm.

        Repeat this step for all the attributes that you want to delete.

   * Add attributes:

     1. In the Profile Editor, click **Add Attribute**.

     1. Enter the information for the new attribute that you’re adding and then click **Save**.

        > **Note:** The **Scope** property determines whether the attribute that you're adding can be assigned at a group level or per user. If you want your admins to be able to assign a value for this attribute at a group level, don't select the **User personal** checkbox.

     1. After adding attributes, go back to the **{yourApp} Attribute Mappings** section and click **Edit** to map your new attributes.

     1. In the dialog that appears, there are two dropdown fields. In the first dropdown menu, select **Map from Okta Profile**. In the second dropdown menu, choose the Okta profile attribute that you want to map the SCIM attribute from. Click **Save**.

          Repeat this step for all SCIM attributes that you want to map (from Okta to your app).

     <div class="three-quarter border">

     ![Displays the Map Attribute dialog.](/img/oin/scim_check-attributes-14.png)

     </div>

     5. After you update the mappings from Okta to your app, click **To Okta** in the **Settings** section.

     6. Scroll to the **{yourApp} Attribute Mappings** section. Look for the attribute that you want to update and click **Edit**.

     7. In the dialog that appears, there are two dropdown fields. In the first dropdown menu, select **Map from {yourApp} App Profile**. In the second dropdown menu, choose the Okta profile attribute that you want to map the SCIM attribute to. Click **Save**.

          Repeat this step for all SCIM attributes that you want to map (from your app to Okta).
