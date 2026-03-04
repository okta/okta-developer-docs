Okta recommends that you generate an instance for testing each protocol supported by your integration:

* You must generate separate instances for testing if you support two SSO protocols (one for OIDC and one for SAML). The OIN Submission Tester can only test one protocol at a time.
* If your SSO integration supports both SCIM and SCIM Entitlement Management, create one instance specifically for SCIM protocol and SCIM entitlement management testing. You also need to create a separate instance for each supported SSO protocol testing.
* For a Universal Logout integration, you can use the same instance that you created for SSO protocol testing.

There are certain conditions where you can test two protocols on one instance. You can create one instance for SSO and SCIM testing if your integration meets all of these conditions:

* It supports SCIM and one SSO protocol
* It doesn't support JIT provisioning
* The **Create User** SCIM operation is enabled