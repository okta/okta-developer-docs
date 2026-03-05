    
* For an SSO integration, configure SSO and assign test users in the test instance.
* For a SCIM integration, configure provisioning and map user profile attributes in the test instance.
* For SCIM Entitlement Management integration, manually test this functionality as follows:

    1. Verify that the **Entitlement Management** feature is enabled. To enable it, see [Entitlement Management](https://help.okta.com/oie/en-us/content/topics/identity-governance/em/entitlement-mgt.htm?cshid=ext-entitlement-mgt).
        [[style="list-style-type:lower-roman"]]
    1. Configure provisioning and update the operations that are supported by your SCIM server.
    1. Verify that the resource types or entitlements that are supported by your SCIM server are listed on the **Governance** tab.

        >**Note:**  After provisioning is complete, it might take some time for the entitlements to load.

    1. Map user profile attributes on the test instance.
    1. Assign the entitlements to the users manually for testing or automatically through a policy. For more information, see [Assign entitlements to users](https://help.okta.com/oie/en-us/content/topics/identity-governance/em/assign-entitlements-users.htm).

* For the Universal Logout integration, assign the test user and enable the **Logout** option on the instance. You can use the same instance that you created for SSO integration testing.