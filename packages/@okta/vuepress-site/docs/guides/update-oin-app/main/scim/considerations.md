* You can't update a published SCIM integration with Basic authentication. This breaks the integration for existing customers. For any updates, you must submit a new SCIM integration that implements header authentication or OAuth 2.0 authentication. You can use either token or bearer token format for header authentication.

* You can add SCIM Entitlement Management capabilities only if your integration also supports SCIM provisioning.

* The API service capability is mutually exclusive of other capabilities in a submission. If you selected the provisioning capability, you can't select the API service capability.

* For published integrations that were migrated from the OIN Manager:
  
    * Contact <oin@okta.com> if you need to update configured properties that aren't available in the OIN Wizard.

    * The **Import users** and **Import groups** (if groups are managed) capabilities are automatically enabled in the OIN Wizard. You must support and test this capability if your previous SCIM integration didn't support it. If you need help with implementing this feature, contact <developers@okta.com>.

* Migrated published integrations from the OIN Manager don't have some OIN Wizard restrictions. For instance:

    * Published integrations can have more than three integration variables.
    * Published integrations can have variable names with uppercase letters.
    * Published integrations can use `http` (instead of enforced `https`) in URLs and Expression Language-supported properties.
