## Create an Okta account management policy rule

Use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) to create a rule that requires users to be verified by the IDV when they enroll a new authenticator. To add a rule using the Admin Console, see [Edit the Okta account management policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-edit-oamp).

Ensure that you’ve created a user account and group for that user. For example, add the user to a group called “Persona IDV test group”.

1. [Retrieve the Okta account management policy ID](/docs/guides/okta-account-management-policy/main/#retrieve-the-okta-account-management-policy-id) to use it in the next step.

1. Send a `POST` request to the `/api/v1/policies/{policyId}/rules` endpoint. Use the Okta account management policy `id` as the `policyId` value.

1. Set the following request body parameters:

   * Provide a `name` value.
   * Set the group ID. Use the [List all groups call](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups) to find the ID for the test group.
   * Set the `verificationMethod` type to `ID_PROOFING`.
   * Set the `verificationMethod` > `id` to the Okta Persona IdP that you created in the [previous section](#create-the-identity-verification-provider-in-okta).
   * Set `appSignOn` access value to `ALLOW`.
   * Use the following [Okta Expression Language](/docs/reference/okta-expression-language-in-identity-engine/) object:

    ```json
        "elCondition": {
            "condition": "accessRequest.operation == 'enroll'"
        }
    ```

    This expression requires users to verify their identity with the IDV when they enroll a new authenticator.

1. Send the `POST` request.

### Example request

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
