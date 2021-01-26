To enable persistent SSO for iOS apps, you need to update the [`usePersistentCookie`](/docs/reference/api/policy/#signon-action-object) parameter in the appropriate Okta sign-on policy. These steps use the Okta [Policy Postman collection](/docs/reference/postman-collections/) to enable the parameter.

Before you begin, be sure to:
- Create an [API token](/docs/guides/create-an-api-token/overview/) for your Org.
- Download the [Policy Postman collection](/docs/reference/postman-collections/).

1. In Postman, expand the **Policies (Okta API)** folder, and then the **Okta Sign On** folder.
2. Click the **Get Okta Sign On Policies** request to open it, and then click **Send** to run it.

    Example request:
    ```bash
    GET https://${yourOktaDomain}/api/v1/policies?type=OKTA_SIGN_ON
    ```
3. In the response, locate the policy that you want to modify and copy its `id` value.
    > **Tip:** You can also highlight the policy ID, right-click it, and set it as the value for the `policyId` variable in your environment.
4. Click the **Get Rules** request to open it.
5. In the request URL, replace the `policyId` variable with the policy ID that you copied. If you assigned the policy ID as a variable in your environment, skip this step.
    > **Tip:** To see which value is assigned to a variable, hover over the variable in the request URL and a box pops up that displays the currently assigned variable value.
6. Click **Send** to run the request.

    Example:
    ```bash
    GET https://${yourOktaDomain}/api/v1/policies/00p2sy9ploJnRwPwp5g7/rules
    ```
7. In the response, locate the rule that you want to modify, copy its `id` value, and copy the `actions` property section of the JSON payload.
    > **Note:** The rule named `Default Rule` cannot be modified. Therefore, copy the `id` value of a custom rule instead. If you only see a `Default Rule` in the response, then you should first [create a custom rule](/docs/guides/customize-authz-server/create-rules-for-policy/).

    > **Tip:** You can also highlight the rule ID, right-click, and set it as the value for the `ruleId` variable in your environment.
8. Click the **Update Sign On Rule** request to open it.
9. In the request URL, replace the `policyId` and `ruleId` variables with the policy ID and rule ID that you copied previously. If you assigned these as variables in your environment, skip this step.

    Example:
    ```bash
    PUT https://${yourOktaDomain}/api/v1/policies/00p2sy9ploJnRwPwp5g7/rules/0pr2syd4moJ2gFXnD5g7

    ```

    Or

    ```bash
    https://${yourOktaDomain}/api/v1/policies/{{policyId}}/rules/{{ruleId}}
    ```
10. Select the **Body** tab of the request and add `"type": "SIGN_ON",` just below the `name` parameter.
11. Replace the `actions` property with the `actions` property that you copied previously.
12. In the `actions` property section, change the `usePersistentCookie` parameter value to `true`.

    Body:
    ```json
    {
        "name": "Your Policy Rule",
        "type": "SIGN_ON",
        "actions": {
            "signon": {
                "access": "ALLOW",
                "requireFactor": true,
                "factorPromptMode": "ALWAYS",
                "rememberDeviceByDefault": false,
                "session": {
                    "usePersistentCookie": true,
                    "maxSessionIdleMinutes": 100,
                    "maxSessionLifetimeMinutes": 100
                }
            }
        }
    }
    ```
13. Click **Send** to run the update request.
