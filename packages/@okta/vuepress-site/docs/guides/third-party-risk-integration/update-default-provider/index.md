---
title: Update default third-party risk provider
---

The Okta org contains a default Risk Provider profile, which must be configured for your third-party risk provider by using the Risk Provider API. On your Okta org, you can have as many as three third-party Risk Providers available to send risk signals to the Okta Risk Engine.

Each third-party risk provider can also be configured to send three action types to the Okta Risk Engine: `none`, `log_only` (default), and `enforce_and_log`. In this example, the action is set to `enforce_and_log`, which uses the third-party risk signal when calculating the risk for a sign-in.

For further detail on the Risk Provider API see the following reference documentation: [Risk Provider API](/docs/reference/api/risk-providers).

In this example, follow the following two procedures to set up your third-party Risk Provider:
- [Retrieve Default Risk Provider](/docs/guides/third-party-risk-integration/update-default-provider/#retrieve-default-risk-provider)
- [Update the Risk Provider ](/docs/guides/third-party-risk-integration/update-default-provider/#update-risk-provider)

### Retrieve Default Risk Provider
This procedure retrieves the default Risk Provider profile and Provider ID.

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
4. Copy the name of your third-party Risk Provider to your Postman environment's `providerName` variable. In this example, use `Risk Provider Example`.

### Update Risk Provider
This procedure updates the default Risk Provider profile with the service application ID, risk Provider name, and the risk provider action.

1. Call the following PUT API from the Risk Integration Postman collection: **Admin: API to Update Provider Settings** (`{{url}}/api/v1/risk/providers/{{providerId}}`), which updates the default Risk Provider's data. This data is included in the request body:

    ```JSON
    {
    "name": "{{providerName}}",
    "clientId": "{{clientId}}",
    "action": "enforce_and_log"
    }
    ```

2. Review the response from the call to make sure the Risk Provider now contains the required data. A sample response follows:

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