The **Required app instances** section shows you the instances detected in your org that are required to test your integration.

* The **CURRENT VERSION** status indicates the instances that you need to test your current integration submission. [Generate an instance](#generate-an-instance) to test SCIM if **No instance detected** appears next to the **SCIM** label.
* The **PUBLISHED VERSION** status indicates the instances that you need to test backwards compatibility for SSO. If your integration only supports the SCIM protocol, then the OIN Wizard doesn't require a published-version instance.

Depending on the nature of your updates, you may need to generate instances for backwards-compatibility testing. Okta recommends that you execute the Runscope tests on your SCIM published-version instance for backwards compatibility, but it's not a requirement for submission.

   * If you're only updating app profiles or mapping, then you don't need to create an extra app instance for SCIM backwards-compatibility testing. You can test the app profile updates in the updated instance version of your submission. See [Configure attribute mappings](#configure-attribute-mappings) when you generate a SCIM instance for testing. However, if you're updating the properties such as description, logo, or guide link, then Okta recommends that you create an extra app instance for SCIM backwards-compatibility testing.

   * If you're updating all other properties from the **Configure your integration** and **Test integration** pages, then Okta recommends SCIM backwards-compatibility testing:

      * If you tested and submitted your published integration from the same Okta Integrator Free Plan organization, you might already have an existing backwards-compatible instance. Use this older app instance version to test backwards compatibility. See [Test your integration](#test-your-integration).

      * If you don't have an instance based on the published integration, exit the OIN Wizard and create an instance of the SCIM OIN-published instance. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) to create an OIN-published instance for SCIM backwards-compatibility testing.

> **Notes:** If your integration also supports SSO:
> * You can avoid creating another app instance for SSO testing if these conditions apply:
>     * Your integration supports SCIM and one SSO protocol.
>     * Your integration doesn't support SSO JIT.
>     * The **Create User** SCIM operation is enabled.
> * You should already have an instance of your published integration for SSO backwards-compatibility testing. The OIN Wizard ensures that an SSO published instance is available in your org before you update your integration.  If you don't have a published-version instance for SSO testing, exit the OIN Wizard and create the SSO OIN-published instance. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) to create an OIN-published instance for backwards-compatibility testing.
