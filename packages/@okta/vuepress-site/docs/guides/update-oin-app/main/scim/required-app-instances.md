The **Required app instances** section shows you the instances detected in your org that are available to test your integration. It shows you the test instances required for the OIN Submission Tester if your integration also supports SSO:

* The **CURRENT VERSION** status indicates the instances that you need to test your current integration submission.
* The **PUBLISHED VERSION** status indicates the instances that you need to test backwards compatibility for SSO. If your integration only supports the SCIM protocol, then the OIN Wizard doesn't require a published version instance.

[Generate an instance](#generate-an-instance) to test the specific protocol if **No instance detected** appears next to the protocol.

> **Notes:** If your integration also supports SSO:
> * You can avoid creating another app instance for SSO testing if these conditions apply:
>     * Your integration supports SCIM and one SSO protocol.
>     * Your integration doesn't support SSO JIT.
>     * The **Create User** SCIM operation is enabled.
> * You should already have an instance of your published integration for SSO backwards-compatibility testing. The OIN Wizard ensures that an SSO published instance is available in your org before you update your integration.  If you don't have a published-version instance for SSO testing, exit the OIN Wizard and create the SSO OIN-published instance. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) to create an OIN-published instance for backwards-compatibility testing.
