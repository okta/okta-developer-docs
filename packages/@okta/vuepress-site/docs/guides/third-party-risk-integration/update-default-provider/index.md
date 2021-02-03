---
title: Update default third-party risk provider
---

The Okta org contains a default risk provider profile, which must be configured for your third-party risk provider by the Okta administrator using the risk provider API. On your Okta org, you can have as many as three third-party risk providers available to send risk events to the Okta Risk Engine.

Each third-party risk provider can also be configured to send three action types to the Okta Risk Engine: `none`, `log_only` (default), and `enforce_and_log`. In this example, the action is set to `enforce_and_log`, which uses the third-party risk event when calculating the risk for a sign-in.

For further detail on the Risk Provider API see the following reference documentation: [Risk Provider API](/docs/reference/api/risk-providers).

In this example, use the following two procedures to set up your third-party risk provider:
- [Retrieve the default risk provider](/docs/guides/third-party-risk-integration/update-default-provider/#retrieve-the-default-risk-provider)
- [Update the risk provider ](/docs/guides/third-party-risk-integration/update-default-provider/#update-the-risk-provider)

### Retrieve the default risk provider
This procedure retrieves the default risk provider profile and Provider ID.

1. Call the following GET API from the Risk Integration Postman collection: **Admin: API to get all Provider Settings** (`{{url}}/api/v1/risk/providers`).

2. Review the response, which includes the Provider ID, default name, and action properties. A sample response follows:

    ```JSON
    [
    {
        "id": "rkpa9y5jpfe8l4ktr1d6",
        "name": "Default ",
        "clientId": "null",
        "action": "log_only",
        "_links": {
            "self": {
                "href": "https://test.oktapreview.com/api/v1/risk/providers/rkpa9y5jpfe8l4ktr1d6",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT"
                    ]
                }
            }
        }
    }
    ]
    ```
3. From the response, copy the `id` value, in this example `rkpa9y5jpfe8l4ktr1d6`, to your Postman environment's `providerId` variable.

### Update the risk provider
This procedure updates the default risk provider profile with the service application ID, risk provider name, and the risk provider action.

1. Call the following PUT API from the Risk Integration Postman collection: **Admin: API to Update Provider Settings** (`{{url}}/api/v1/risk/providers/{{providerId}}`), which updates the default risk provider's data. This data is included in the request body:

    ```JSON
    {
    "name": "{{providerName}}",
    "clientId": "{{clientId}}",
    "action": "enforce_and_log"
    }
    ```

2. Review the response from the call to make sure the risk provider now contains the required data. A sample response follows:

    ```JSON
    {
    "id": "rkpa9y5jpfe8l4ktr1d6",
    "name": "Risk Provider Example",
    "clientId": "0oaaaboyxsbrWdsk81d6",
    "action": "enforce_and_log",
    "_links": {
        "self": {
            "href": "https://test.oktapreview.com/api/v1/risk/providers/rkpa9y5jpfe8l4ktr1d6",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        }
        }
    }
    ```

<NextSectionLink/>