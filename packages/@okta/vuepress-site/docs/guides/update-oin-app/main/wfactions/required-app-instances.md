The **Required app instances** section shows you the instances detected in your org that are required for the OIN Submission Tester:

* The **CURRENT VERSION** status indicates the instances that you need to test your current integration submission.
* The **PUBLISHED VERSION** status indicates the instances that you need to test backwards compatibility. This is only required if your integration supports SSO.

[Generate an instance](#generate-an-instance) to test the specific capability if **No instance detected** appears next to the capability label.

> **Notes:**
> * Generate separate instances for testing if you support two SSO protocols (one for OIDC and one for SAML). The OIN Submission Tester can only test one protocol per instance.
> * For Universal Logout integration, you can use the same instance that you created for SSO protocol testing.
> * If your integration includes SSO, see [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) to manually add a published instance if the wizard doesn't detect one. If your integration only supports provisioning API actions, no published-version instance is required (backward-compatibility testing isn't required).
