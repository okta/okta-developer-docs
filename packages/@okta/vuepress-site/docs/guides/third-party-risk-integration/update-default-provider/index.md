---
title: Update default third-party risk provider
---
what is happening here?


The Risk Provider can have only 3 actions: `none`, `log_only` (default), and `enforce_and_log`.

For further detail on this API see the following reference documentation: [Risk Provider API](/docs/reference/api/risk-providers).



### Retrieve Default Risk Provider
This procedure retrieves the default Risk Provider profile and Provider ID.

1. Call the following GET API from the Risk Integration Postman collection: **Admin: API to get all Provider Settings** (`{{url}}/api/v1/risk/providers`).

2. Review the response, which includes the Provider ID, name, and action properties. A sample response follows:

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
    "name": "Risk Provider Default",
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