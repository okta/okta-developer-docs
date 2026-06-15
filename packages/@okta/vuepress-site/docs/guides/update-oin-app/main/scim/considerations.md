For published integrations that were migrated from the OIN Manager, if you need to update configured properties that aren't available in the OIN Wizard, contact <oin@okta.com>.

* You can't update a published SCIM integration with Basic authentication. This breaks the integration for existing customers. For any updates, you must submit a new SCIM integration that implements header authentication or OAuth 2.0 authentication. You can use either token or bearer token format for header authentication.

* If you edit a published SCIM integration that was migrated from the OIN Manager, the **Import users** (and **Import groups** if groups are managed) capability is automatically enabled in the OIN Wizard. You must support and test this capability if your previous SCIM integration didn't support it. If you need help with implementing this feature, contact <developers@okta.com>.

* When you update an integration that's already published, be mindful to preserve backwards compatibility for your integration. Older instances of your integration could be in use by Okta customers.

    * If you modify the **Name** (`name`) property of your [tenant settings](/docs/guides/submit-oin-app/openidconnect/main/#tenant-settings), Okta removes the original variable and creates a variable with your updated name. This action negatively impacts your existing customers if you use the original variable in your integration dynamic properties.

    * Migrated published integrations from the OIN Manager don't have some OIN Wizard restrictions. For instance:

        * Published integrations can have more than three integration variables
        * Published integrations can have variable names with uppercase letters
        * Published integrations can use `http` (instead of enforced `https`) in URLs and Expression Language-supported properties

    * Entitlement Management is only supported for SCIM-based provisioning.

    * If your update introduces new variables and you're using dynamic URLs, ensure that your tests cover various scenarios with different possible values for those variables. The newly introduced variables aren't populated for older instances of your integration.

        For example:
