## Create an Okta account management policy rule

Use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) to create a rule that requires users to be verified by the IDV vendor when they enroll a new authenticator. Create your own `POST` request body or copy the [example request](#okta-account-management-policy-rule-example-request) and input your values.

Ensure that you’ve created a user account and group for that user. For example, add the user to a group called “Persona IDV test group”.

> **Note:** To add a rule using the Admin Console, see [Edit the Okta account management policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-edit-oamp).

1. [Retrieve the Okta account management policy ID](/docs/guides/okta-account-management-policy/main/#retrieve-the-okta-account-management-policy-id). Use the Okta account management policy `id` as the `policyId` value in your `POST` request to create the IDV rule.

1. Set the following request body parameters for the new IDV rule that you want to create:

   * Provide a `name` value.
   * Use the Okta account management policy `id` as the `policyId` value.
   * Set the group ID. Use the [List all groups call](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups) to find the `id` for the test group.
   * Set the `verificationMethod` type to `ID_PROOFING`.
   * Set the `verificationMethod` > `id` to the Okta Persona IdP that you created in the [previous section](#create-the-idv-vendor-in-okta).
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
