1. Generate an app instance from your updated integration configuration. See [Generate instances for testing](#generate-instances-for-testing).

   > **Note:** If your integration also supports SSO:
   > * You can avoid creating another app instance for SSO testing if these conditions apply:
   >     * Your integration supports SCIM and one SSO protocol.
   >     * Your integration doesn't support SSO JIT.
   >     * The **Create User** SCIM operation is enabled.
   > * You should already have an instance of your published integration for SSO backwards-compatibility testing. See [Required app instances](#required-app-instances).

1. Execute the [Runscope CRUD tests](#runscope-crud-tests) and the [Okta manual integration tests](#manual-okta-scim-integration-tests) with your generated test instance.

1. [Submit your updated integration](#submit-your-updates) after all required tests are successful.
