5. Depending on the nature of your updates, you may need to generate instances for testing:

   * If you're only updating app profiles, then you don't need to create an app instance for backward-compatibility testing. You can test the app profile updates in the updated instance version of your submission. See [Generate instance for testing](#generate-instances-for-testing) and [Configure attribute mappings](map-profile-attributes).

   * If you're updating all other properties from the **Configure your integration**, and **Test integration** pages, then you need a backward-compatible instance for testing:
      * If you tested and submitted your published integration from the same Okta Developer Edition org, you might have an existing backward-comptible instance already. Use this older app instance version to test backward compatibility. See [Testing backward-compatibiity].
      * If you don't have an instance based on the published integration, create an instance of the published integration. See [Generate a published OIN catalog instance](generate-a-published-oin-catalog-instance) OR See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) to create an instance for backwards-compatibility testing.

    > **Note:** The **Generate instance** option is disabled if you have five active instances in your org. [Deactivate instances](/docs/guides/submit-oin-app/openidconnect/main/#deactivate-an-app-instance-in-your-org) that you're not using.

<!-- Note to Van: remove this content, and place in another snippet for SCIM just after "update your integration" -->