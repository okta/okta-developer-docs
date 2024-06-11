---
title: Test your policies with access simulations
excerpt: Provides documentation on testing your policies using the Policy APIs simulate endpoint
layout: Guides
---

This guide explains how to test your access policies by using the `/simulate` endpoint of the Policy API.

---

#### Learning outcomes

* Understand how to configure and send policy simulation tests using the Policy API.
* Send and receive an example simulation call.

#### What you need

* [Okta Preview organization](https://developer.okta.com/login)
* An app to test your access policies

#### Sample code

If you need a simple app for testing, see [Sign users in to your SPA using the redirect model and AuthJS](/docs/guides/auth-js-redirect/main/).

---

## About Policy Simulation

You can use the Policy API to simulate real-world user requests to access an app. In the Admin Console, these simulations are run using the Access Testing Tool available from **Reports** > **Access testing tool**. See [Access Testing Tool](https://help.okta.com/okta_help.htm?type=oie&id=ext-access-test-tool). The API endpoint that underpins this tool is also available for developers to simulate policy configurations and to test app access. For full details on the API endpoint, see the [Policy API reference](/docs/reference/api/policy/#access-simulation).

The policy simulations run access tests based on existing policy configurations and which rules and settings are matched to create the authentication and enrollment requirements. Results of the tests determine individual or group access to an app. You can simulate matches for the following types of policies and rules:

* Authentication policies
* Authenticator enrollment policies
* Global Session Policies
* User enrollment policies for apps

For background information on policies, see [Policies](/docs/concepts/policies) and [Global session and authentication policies](/docs/guides/configure-signon-policy/main/).

## Sample use case

The sample use case creates a scenario based on group access to your sample app. The policy simulation endpoint tests access to the app when different groups are assigned to the app.

To configure this set up, create a group called Sales and ensure that only this group is assigned to your sample app. See [Manage Groups](https://help.okta.com/okta_help.htm?type=oie&id=ext_Directory_Groups).

In this use case, the app only allows users of the Sales group to access your sample app. Use the following calls to test this scenario.

## Create a Post call for Sales

For this call, you need the `id` for your app and the `id` for the Sales group.

To find these values:

1. Call the [Groups API](/docs/reference/api/groups/#find-groups) with the query parameter as follows: `https://{yourOktaDomain}/api/v1/groups?q=Sales`. Save the `id` value from the response.

1. Call the [Apps API](/docs/reference/api/apps/#list-applications) with the query parameter as follows: `https://{yourOktaDomain}/api/v1/apps?q={YourAppName}`. Save the `id` value from the response. Alternatively, the client ID available in the Admin Console is the `id` of your app.

To simulate the first scenario, use the following call but replace the following values:

* `{api_token}`: Your org's API token value

* `{yourOktaDomain}`: Your Okta domain, for example, `https://example.oktapreview.com`

* `{yourAppID}`: The `id` value that represents your sample app

* `{yourSalesGroupID}`: the `id` value that represents your Sales group

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
-d '{
  "appInstance": "{yourAppID}",
  "policyContext": {
    "groups": {"ids":["{yourSalesGroupID}"]}
    }
  }'
  "https://{yourOktaDomain}/api/v1/policies/simulate?expand=EVALUATED&expand=RULE"

```

### Review evaluation response for Everyone

After a successful call, meaning the Sales group has access to your app, you receive the following response, which displays the matching policies and rules:

```json
{
    "evaluation": [
        {
            "status": null,
            "policyType": "OKTA_SIGN_ON",
            "result": {
                "policies": [
                    {
                        "id": "00p7xut91eCkoRnDj1d7",
                        "name": "Default Policy",
                        "status": "MATCH",
                        "conditions": [],
                        "rules": [
                            {
                                "id": "0pr7xut91fAAYF66D1d7",
                                "name": "Default Rule",
                                "status": "MATCH",
                                "conditions": []
                            }
                        ]
                    }
                ]
            },
            "undefined": {
                "policies": []
            },
            "evaluated": {
                "policies": [
                    {
                        "id": "00p7xut91eCkoRnDj1d7",
                        "name": "Default Policy",
                        "status": "MATCH",
                        "conditions": [],
                        "rules": [
                            {
                                "id": "0pr7xut91fAAYF66D1d7",
                                "name": "Default Rule",
                                "status": "MATCH",
                                "conditions": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "status": null,
            "policyType": "ACCESS_POLICY",
            "result": {
                "policies": [
                    {
                        "id": "rst7xut96faIAgmti1d7",
                        "name": "Any two factors",
                        "status": "MATCH",
                        "conditions": [],
                        "rules": [
                            {
                                "id": "rul7xut96gmsOzKAA1d7",
                                "name": "Catch-all Rule",
                                "status": "MATCH",
                                "conditions": []
                            }
                        ]
                    }
                ]
            },
            "undefined": {
                "policies": []
            },
            "evaluated": {
                "policies": [
                    {
                        "id": "rst7xut96faIAgmti1d7",
                        "name": "Any two factors",
                        "status": "MATCH",
                        "conditions": [],
                        "rules": [
                            {
                                "id": "rul7xut96gmsOzKAA1d7",
                                "name": "Catch-all Rule",
                                "status": "MATCH",
                                "conditions": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "status": null,
            "policyType": "PROFILE_ENROLLMENT",
            "result": {
                "policies": [
                    {
                        "id": "rst7xut96hqm6jolx1d7",
                        "name": "Default Policy",
                        "status": "MATCH",
                        "conditions": [],
                        "rules": [
                            {
                                "id": "rul7xut96iP7HHcQi1d7",
                                "name": "Catch-all Rule",
                                "status": "MATCH",
                                "conditions": []
                            }
                        ]
                    }
                ]
            },
            "undefined": {
                "policies": []
            },
            "evaluated": {
                "policies": [
                    {
                        "id": "rst7xut96hqm6jolx1d7",
                        "name": "Default Policy",
                        "status": "MATCH",
                        "conditions": [],
                        "rules": [
                            {
                                "id": "rul7xut96iP7HHcQi1d7",
                                "name": "Catch-all Rule",
                                "status": "MATCH",
                                "conditions": []
                            }
                        ]
                    }
                ]
            }
        }
    ]
}
```

## Create a Post call for Everyone

For this call, you need the `id` for another group not assigned to your app, for example, the Okta **Everyone** group.

To find this value:

* Call the [Groups API](/docs/reference/api/groups/#find-groups) with the query parameter as follows: `https://{yourOktaDomain}/api/v1/groups?q=Everyone`. Save the `id` value from the response.

To simulate the second scenario, use the following call but replace the group ID for Sales for the group ID of another group. In this case, Everyone:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
-d '{
  "policyTypes":[],
  "appInstance": "{yourAppID}",
  "policyContext": {
    "groups": {"ids":["{yourEveryoneGroupID}"]},
    "risk":{"level":"LOW"}
  }
' "https://{yourOktaDomain}/api/v1/policies/simulate?expand=EVALUATED&expand=RULE'" \

```

### Review evaluation response for Sales

After the call, you receive the following error response, because the Everyone group isn't assigned to your app:

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: Groups",
    "errorLink": "E0000001",
    "errorId": "oaeFpUDkaPyRLKi62y404omKQ",
    "errorCauses": [
        {
            "errorSummary": "Access to YourAppName is not allowed. Everyone is not assigned to this application."
        }
    ]
}
```
