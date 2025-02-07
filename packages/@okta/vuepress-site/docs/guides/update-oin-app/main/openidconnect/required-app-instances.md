The **Required app instances** section shows you the instances detected in your org that are available to test your integration. It also shows you the test instances required for the OIN Submission Tester based on your selected protocols:

* The **CURRENT VERSION** status indicates the instances that you need to test your current integration submission.
* The **PUBLISHED VERSION** status indicates the instances that you need to test backwards compatibility.

[Generate an instance](#generate-instance) to test the specific protocol if **No instance detected** appears next to the protocol.

> **Notes:**
> * Generate separate instances for testing if you support two SSO protocols (one for OIDC and one for SAML). The OIN Submission Tester can only test one protocol per instance.
> * You should already have an instance of your published integration for backwards-compatibility testing. If you don't have a published-version instance, exit the OIN Wizard and create the OIN-published instance. See [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) to create an OIN-published instance for backwards-compatibility testing.
