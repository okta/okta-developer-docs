## Create an Okta account management policy rule

Use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) to create a rule that requires <StackSnippet snippet="idp" inline /> to verify users when they enroll a new authenticator. Create your own `POST` request body or copy the [example request](#okta-account-management-policy-rule-example-request) and input your values.

Ensure that you’ve created a group for users who you want to verify with <StackSnippet snippet="idp" inline />. For example, create a group called "CLEAR1 IDV test group".

> **Note:** To add a rule using the Admin Console, see [Edit the Okta account management policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-edit-oamp).

1. [Retrieve the Okta account management policy ID](/docs/guides/okta-account-management-policy/main/#retrieve-the-okta-account-management-policy-id). Use the Okta account management policy `id` as the `policyId` value in your `POST` request to create the IDV rule.

1. Set the following request body parameters for the new IDV rule that you want to create:

   * Provide a `name` value.
   * Use the Okta account management policy `id` as the `policyId` value.
   * Set the group ID. Use the [List all groups call](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups) to find the `id` for the test group.
   * Set the `verificationMethod` type to `ID_PROOFING`.
   * Set the `verificationMethod.id` as the ID of the <StackSnippet snippet="idp" inline /> IdP that you created in the [previous section](#create-the-idv-vendor-in-okta).
   * Set `appSignOn` access value to `ALLOW`.
   * Use the following [Okta Expression Language](/docs/reference/okta-expression-language-in-identity-engine/) object:

    ```json
        "elCondition": {
            "condition": "accessRequest.operation == 'enroll'"
        }
    ```

    This expression requires users to verify their identity with the IDV vendor when they enroll a new authenticator.

1. Send the `POST /api/v1/policies/{policyId}/rules` request.

### Okta account management policy rule example request

```json
{
    "name": "Require IDV for authenticator enrollment",
    "priority": 1,
    "type": "ACCESS_POLICY",
    "system": false,
    "conditions": {
        "people": {
            "groups": {
                "include":
                    ["{groupId}"]
            }
        },
        "network": {
            "connection": "ANYWHERE"
        },
        "riskScore": {
            "level": "ANY"
        },
        "elCondition": {
            "condition": "accessRequest.operation == 'enroll'"
        },
        "userType": {
            "include": [],
            "exclude": []
        }
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "id": "{IDVId}",
                "type": "ID_PROOFING"
            }
        }
    }
}
```

### Example response

```json
{
    "id": "ruleId",
    "status": "ACTIVE",
    "name": "Require IDV for authenticator enrollment",
    "priority": 1,
    "created": "2024-11-14T21:16:55.000Z",
    "lastUpdated": "2024-11-14T21:16:55.000Z",
    "system": false,
    "conditions": {
        "people": {
            "users": {
                "exclude": []
            },
            "groups": {
                "include": [
                    {"groupId"}
                ]
            }
        },
        "network": {
            "connection": "ANYWHERE"
        },
        "riskScore": {
            "level": "ANY"
        },
        "elCondition": {
            "condition": "accessRequest.operation == 'enroll'"
        },
        "userType": {
            "include": [],
            "exclude": []
        }
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "id": {"IDVId"},
                "type": "ID_PROOFING"
            }
        }
    },
    "_links": {
        "self": {
            "href": "https://{yourOktadomain}/api/v1/policies/rstjqw4t47yn9lXUK5d7/rules/rull5mrtqkAVfIyWT5d7",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktadomain}/api/v1/policies/rstjqw4t47yn9lXUK5d7/rules/rull5mrtqkAVfIyWT5d7/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    },
    "type": "ACCESS_POLICY"
}
```

## Test the integration

You now have a <StackSnippet snippet="idp" inline /> project in a Sandbox environment. You can configure different IDV settings in the Sandbox environment and perform test verifications to see how your IDV flow works.

1. Go to your <StackSnippet snippet="idp" inline /> dashboard.
1. Go to **Projects** and select your project.
1. Click **Preview**.
1. Click **Generate** to create a link to a test verification session.
1. Open the generated link in a new browser tab.

You can use the link to test the IDV flow or you can share it with others. In the Sandbox environment, no actual verifications are performed. You can use test credentials to complete the verification. The test verification doesn't interact with Okta so you can only test the IDV flow.

To test the integration with Okta, you must use a real user account with verifiable user information and use a Production environment project. For example, if your IDV flow requires a government-issued ID, your user account must have an ID that matches that requirement.

When you're ready to go live with your <StackSnippet snippet="idp" inline /> project, you can publish your project to the Production environment. See [Going Live with <StackSnippet snippet="idp" inline />](http://docs.clearme.com/docs/going-live-with-clear).

> **Note:** Your user may not be able to complete the IDV flow if their information doesn't match the verifiable information required by your IDV vendor. Review the [System Log](https://help.okta.com/okta_help.htm?id=ext_Reports_SysLog) if you encounter errors when testing the IDV flow. See [Identity verification events](/docs/guides/idv-integration/main/#identity-verification-events) for information about IDV events in the System Log.
