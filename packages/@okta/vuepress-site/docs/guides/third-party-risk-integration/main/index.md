---
title: Third-party risk provider integration
excerpt: Provides documentation on configuring an Okta org to receive risk events from a third-party provider
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure an Okta org to receive risk events from a third-party provider.

---

#### Learning outcomes

Understand how to set up and test third-party risk events with a sample app from the Postman Risk API collection.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* A configured Okta org for third-party risk providers. Contact your Okta customer support representative for this configuration.
* A [Postman client](https://www.postman.com/downloads/) to configure and test the risk provider integration. See [Get Started with the Okta APIs](/docs/reference/rest/) to set up Postman.
* The Risk API collection. Download from: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/47546754d382762468c6)

---

## About third-party risk provider integration with the Okta Risk Engine

The Okta Risk Engine evaluates authentication attempts by reviewing the risk score of the sign-in based on context and historical data. Using Okta Risk APIs, third-party risk providers can integrate with the Okta Risk Engine using a standard Okta service app. The third-party risk provider can send risk events that you can use when calculating the authentication risk based on the risk policy configured in the Okta org. The risk events are additionally logged as part of the System Log.

>**Note:** Third-party risk events are shared with and received from non-Okta apps. Non-Okta apps include web-based, offline, mobile, or other software app functionality that are provided by you or a third party and interoperate with the Okta Service. You aren't required to receive or use third-party risk events within Okta Risk Engine, but if you configure Okta Risk Engine to use third-party risk events, then you agree on behalf of your organization that Okta may receive and share data with the non-Okta app as necessary to provide this functionality. You may only use these third-party risk events if you’re a customer of both Okta and the non-Okta app. Okta can't guarantee continued partnerships or functionality with any non-Okta apps.

### High-level configurations

Creating a third-party risk provider integration follows the general configurations for creating an OAuth service app using the OAuth Client Credentials grant flow. The service app provides an integration for the default risk provider and the Okta Risk Engine. Risk Event API calls can test for a successful setup. Follow the high-level steps below to set up an example third-party risk provider integration.

1. [Create a self-service app for the risk provider](#create-a-service-app-for-a-third-party-risk-provider)
2. [Update the default risk provider](#update-the-default-third-party-risk-provider)
3. [Test the integration](#test-the-integration)

## Create a service app for a third-party risk provider

Your Okta org requires that you set up an OAuth service app to integrate and consume risk events from a third-party risk provider.

Use the following high-level steps to configure this service app:

1. [Create a public/private key pair](#create-a-public-private-key-pair).
2. [Create and verify the service app](#create-a-service-app).
3. [Add a scope grant to the service app](#add-a-scope-grant-to-the-app).

See [Implement OAuth for Okta with a Service App](/docs/guides/implement-oauth-for-okta-serviceapp/).

### Create a public/private key pair

Before creating the service app for the third-party risk provider, you need to create a public/private key pair for client authentication. Use a tool such as the [JSON Web Key Generator](https://mkjwk.org/) to generate a public/private key pair for an example setup.

1. Go to [JSON Web Key Generator](https://mkjwk.org/).
2. Use the following values when generating the pair:

    - **Key Size**: 2048
    - **Key Use**: Signature
    - **Algorithm**: RS256
    - **Key ID**: SHA-256
    - **Show X.509**: No

3. Click **Generate**. A sample **Public Key** value follows:

    ```JSON
    {
    "kty": "RSA",
    "e": "AQAB",
    "use": "sig",
    "kid": "NhIpAobkW_7CfLFA2d1UUB8odnWbZMebCR8dm-O6aMM",
    "alg": "RS256",
    "n": "pqEM9uy9rPs6M8E3zGqnSjdgHRYj9pZ2LCb0sRzpg2r1BItPXknLPmrcVI0K4a84FpDRRoOc5zV-YILYIPA8JdAnazQiiGHfzzrNsTfcT-iD45-4Fb7tyuU2KQdwwZpP0FfWNcILgbdJbYdjfPM7AuKg3zok7xzZnk-wTJkGzdcya-0X5jX4hKl48hm8506CBep6fKhwZbjMXTt3R2bm-zqxYqjC5dXawx0ICniRnZyzNscmO6e3SYd0WDB-etQTHehbj1r0v6NOVZBWwsQEMP7_WZoUUS02mOODYSh-TI-deJ3Aw61iG5rKsQDgOZzGy2ZazyXJGhhfngGgzL4xfw"
    }
    ```

4. Copy the **Public Key** JSON value to your Postman environment's `publicKey` variable.
5. Make sure to save the JSON value for the **Public and Private Keypair**, which is required during testing.

For background information on this process, see [Create a public/private key pair](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-a-public-private-key-pair).

### Create a service app

Create the service app that integrates with the third-party risk provider using the previously generated public key for authentication.

1. Copy the name of your third-party risk provider to your Postman environment's `providerName` variable. In this example, use `Risk Provider Example`. Save the environment.

2. Call the following POST API from the Risk Integration Postman Collection: **Admin: API to create OAuth service client (for the provider)** (`https://${yourOktaDomain}/oauth2/v1/clients`).

3. Review the response, which includes the `jwks` key pair. The `client_name` value is the same value that you gave as the `providerName` variable. A sample response follows:

    ```JSON
    {
    "client_id": "0oaaaboyxsbrWdsk81d6",
    "client_id_issued_at": 1611263018,
    "client_name": "Risk Provider Example",
    "client_uri": null,
    "logo_uri": null,
    "redirect_uris": [
        "https://httpbin.org/get"
    ],
    "response_types": [
        "token"
    ],
    "grant_types": [
        "client_credentials"
    ],
    "jwks": {
        "keys": [
            {
                "kty": "RSA",
                "alg": "RS256",
                "kid": null,
                "use": "sig",
                "e": "AQAB",
                "n": "uNj5u6PSWYR0VOTEhVsVEMfiFCVcNBKyRGM0YHQjGlhEHO-28Dw68l8U1KdHdiNVrvL21S-bfQFyQWSTF5_w5x966SmNMPHtjkxoJ_BOxyed3bKkbfLZgq8GM5lsAwTE-NIbMmPciX9Z4VEapaiKbEqg3KSGVzJcEH18E8AiIMgQ0ts7NTJ33sOwtqdTsQfho5crqtPIy1Z0Svvraq-UA7-elDWj9duqLE-YIRx-6U9hdBJ5Q7bC12H_TwcyNoLLwvtdi2X8NNV93CLJ1xoDAS9o8FDmWWUqciXq4XLww1kJRFvOMMT7LLefYdhV1Ef7MTZrpTOlwoDfDDdltTUUmw"
            }
        ]
    },
    "token_endpoint_auth_method": "private_key_jwt",
    "application_type": "service"
    }
    ```

4. From the response, copy the `client_id` value, in this example `0oaaaboyxsbrWdsk81d6`, to your Postman environment's `clientId` variable. Save the environment.

5. Verify that the app is available by making a GET request using the following API from the Risk Integration Postman Collection: **Admin: API to get all OAuth service clients** (`https://${yourOktaDomain}/oauth2/v1/clients`).

This call retrieves all service apps from your Okta org, including the new Risk Integration service app.

For background information on this process, see [Create a service app and grant scopes](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-a-service-app-and-grant-scopes/).

### Add a scope grant to the app

Define the allowed Risk scope for use with the third-party risk provider service app.

1. Make a POST request using the following API from the Risk Integration Postman Collection: **Admin: API to grant scopes to the OAuth service client** (`/api/v1/apps/${clientId}/grants`).

    This call adds the `scopeId` to the value of: `okta.riskEvents.manage`.

2. Review the response for this addition. A sample portion of the response follows:

    ```JSON
     "_embedded": {
        "scope": {
            "id": "okta.riskEvents.manage"
        }
    },
    ```

For background information on granting scopes, see [Grant allowed scopes](/docs/guides/implement-oauth-for-okta-serviceapp/main/#grant-allowed-scopes).

>**Note:** If you get a "Resource Not Found" exception in this step, it's possible that your `clientId` or the URL aren't valid.

## Update the default third-party risk provider

The Okta org contains a default risk provider profile that must be configured for the third-party risk provider by your Okta administrator using the risk provider API. In your Okta org, you can have as many as three third-party risk providers available to send risk events to the Okta Risk Engine.

You can also configure each third-party risk provider to send three action types to the Okta Risk Engine: `none`, `log_only` (default), and `enforce_and_log`. In this example, the action is set to `enforce_and_log`, which uses the third-party risk event when calculating the risk for a sign-in.

See the following reference documentation: [Risk Provider API](/docs/reference/api/risk-providers).

In this example, use the following two procedures to set up your third-party risk provider:
- [Retrieve the default risk provider](#retrieve-the-default-risk-provider)
- [Update the risk provider ](#update-the-risk-provider)

### Retrieve the default risk provider

This procedure retrieves the default risk provider profile and Provider ID.

1. Make a GET request using the following API from the Risk Integration Postman Collection: **Admin: API to get all Provider Settings** (`https://${yourOktaDomain}/api/v1/risk/providers`).

2. Review the response that includes the Provider ID, default name, and action properties. A sample response follows:

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
                        "PUT",
                        "DELETE"
                    ]
                }
            }
        }
    }
    ]
    ```

3. From the response, copy the `id` value, in this example `rkpa9y5jpfe8l4ktr1d6`, to your Postman environment's `providerId` variable.

### Update the risk provider

This procedure updates the default risk provider profile with the service app ID, risk provider name, and the risk provider action.

1. Make a PUT request using the following API from the Risk Integration Postman Collection: **Admin: API to Update Provider Settings** (`https://${yourOktaDomain}/api/v1/risk/providers/${providerId}`). This call updates the default risk provider's data. The following data is included in the request body:

    ```JSON
    {
    "name": "{{providerName}}",
    "clientId": "{{clientId}}",
    "action": "enforce_and_log"
    }
    ```

2. Review the response from the call to make sure that the risk provider now contains the required data. A sample response follows:

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
                    "PUT",
                    "DELETE"
                ]
            }
        }
        }
    }
    ```

## Test the integration

With the creation of a service app for the third-party risk provider, and the update of the third-party risk provider profile, you can now test the integration using the Risk Events API.

This API is used by the third-party provider to send risk events to an Okta org for risk policy evaluation or the System Log. The third-party provider requires access to the public/private key pair and the service app ID (`clientId`) created by the Okta administrator in the [Create service app](#create-a-service-app-for-a-third-party-risk-provider) section.

In this test, the API sends a sample payload risk event to the Okta org that Okta can then consume and use to calculate the risk of the authentication.

>**Note:** Only IP-related risk events are available for consumption by the Okta org.

Use the following high-level steps to test the risk provider integration:

1. [Create a client assertion for the access token](#create-a-client-assertion)
2. [Create an access token](#create-an-access-token)
3. [Send a risk event to the Okta org](#send-a-risk-event-to-okta)
4. [Confirm the response and System Log](#confirm-the-response)

### Create a client assertion

This procedure creates a signed JSON Web Token (JWT) that is used as the client assertion value required in the request for a scoped access token.

1. Go to [Generate JWT](https://www.jsonwebtoken.dev/) to create a JWT.
2. In the **JWK KEY** field, copy the **Public and Private Keypair** that you generate when you create the service app ([Create a public/private key pair](#create-a-public-private-key-pair)).
3. In the **Payload** field, add the following JSON payload and substitute your service app ID (client ID) and your Okta org URL:

    ```JSON
    {
    "aud": "https://<url>/oauth2/v1/token",
    "iss": "<clientId>",
    "sub": "<clientId>"
    }
    ```

4. Click **Generate JWT**.
5. Copy the resulting JWT value to your Postman's `clientAssertion` environment variable. Save the environment.

For further background information on this process, see [Create and sign the JWT](/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-and-sign-the-jwt).

### Create an access token

This procedure creates an access token using the `clientAssertion` value required for authentication into the risk provider service app.

1. Make a POST request using the following API from the Risk Integration Postman Collection: **Partner: API to get the access token** (`https://${yourOktaDomain}/oauth2/v1/token`).
2. Review the response from the call and copy the `access_token` value to your Postman's `accessToken` environment variable. Don't include the leading and trailing double quotes around the `access_token` value while saving the `accessToken` variable. A sample response follows:

    ```JSON
    {
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJPeXd3TmtXSnBuX1ZaQzB4aUZKUlRIRmdvQXJwOXBaSkROZktiZG4wemVBIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlYwbHNUVVUxT3RIMlotOWhGcXExSlhteEF5ZXBqWVc0YXVLSnlwTjJiRTgiLCJpc3MiOiJodHRwczovL2R1ZmZpZWxkLm9rdGFwcmV2aWV3LmNvbSIsImF1ZCI6Imh0dHBzOi8vZHVmZmllbGQub2t0YXByZXZpZXcuY29tIiwic3ViIjoiMG9hYWFib3l4c2JyV2RzazgxZDYiLCJpYXQiOjE2MTEzNDcwNDAsImV4cCI6MTYxMTM1MDY0MCwiY2lkIjoiMG9hYWFib3l4c2JyV2RzazgxZDYiLCJzY3AiOlsib2t0YS5yaXNrRXZlbnRzLm1hbmFnZSJdfQ.YUYhkfj-vjW2zEWIfhdcqMMONRVUV81gdia1wf3C2HZ7qMG6u8aGsRpdaMBotHOeno3ECQupf_hcWpUOPJ6OJX1Zdycn6ui7nDcIar6JfSs6VoyOf_e4pNnj2iBPEy9_F4qlk08Z4tBPL9XMMzUnFKL3ZfMTspBNFwpzXAlrj_wzhDS2TrE0O2Z5EAQc1hKmx7cbCOPOmhtbHDjB1OYDiKlK1Z2OlXvHLxhHGDAVQaPf8tMMD8gqQQ3_Lxifi55gCv5h3ZfVyrJtfZK5v3ZrfapK1u1JbvjvJ2fvjUce0Lf2Jl0Gq8nwD0SZZTYdDxcwJny0F1rjq_FDulaBc0JrUw",
    "scope": "okta.riskEvents.manage"
    }
    ```
    >**Note**: The access token expires in 60 minutes (or the value set in the property `expires_in`).

For further background information on this process, see [Get an access token](/docs/guides/implement-oauth-for-okta-serviceapp/main/#get-an-access-token).

### Send a risk event to Okta

This procedure sends a sample risk event payload to the Okta org.

1. Make a POST request using the following API from the Risk Integration Postman Collection: **Partner: API to send RiskEvents (Auth using access token)** (`/api/v1/risk/events/ip`). A sample payload follows, which includes two events:

    ```JSON
    [
     {
       "timestamp": "2021-01-20T00:00:00.001Z",
       "subjects": [
          {
            "ip": "6.7.6.7",
            "riskLevel": "LOW",
            "message": "none"
          },
          {
            "ip": "1.1.1.1",
            "riskLevel": "HIGH" ,
            "message": "Detected Attack tooling and suspicious activity"
          }
        ]
     }
    ]
    ```

2. Review the request status of the API call. If the status is `202 Accepted`, the Okta org consumed the risk events.

> **Note:** Rate limits of three calls per minute, per risk provider, apply to the `/api/v1/risk/events/ip` endpoint. Each call can contain multiple risk events.

See [Risk Events](/docs/reference/api/risk-events).

### Confirm the response

This procedure reviews the Admin Console's System Log to identify the risk event information logged after calling the Risk Event API.

1. Sign in to your Okta org as an administrator.
2. In the Admin Console, go to **Reports** > **System Log**.
3. Review the log file or search for the event `security.risk.signal.consume` that is logged when a risk provider sends a risk event to Okta.
4. With a risk action of `enforce_and_log`, and a risk-based policy configured, the third-party risk provider event is used when calculating the authentication risk. This information is logged in the `user.session.start` event.

### General troubleshooting tips
* Save the Postman environment after every change to the environment. Confirm that you’re using the correct Postman environment.
* Postman environment variables are case-sensitive. Ensure that there are no typos, no leading/trailing spaces, no leading or trailing double quotes in the environment variables.
* The org URL shouldn't be the admin URL (for example, use `https://demo-org.oktapreview.com` instead of  `https://demo-org-admin.oktapreview.com`). You don't need a trailing `/` at the end of the URL.

## See also

- [Implement OAuth for Okta with a Service App](/docs/guides/implement-oauth-for-okta-serviceapp/)
- [Risk Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RiskProvider/)
- [Risk Events API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RiskEvent/)
- [Risk Scoring and Risk Based Authentication](https://help.okta.com/okta_help.htm?id=csh-risk-scoring)
