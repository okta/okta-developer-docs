---
title: Test the integration
---

With the creation of a service application for the third-party risk provider, and the update of the third-party risk provider profile, you can now test the integration using the Risk Events API.

In practice, this API is used by the third-party provider to send risk events to an Okta org for risk policy evaluation or the system log. The third-party provider requires access to the public-private key pair and the service application ID (`clientId`) created by the Okta administrator in the [Create service application](/docs/guides/third-party-risk-integration/create-service-app/) section.

In this test, the API sends a sample payload risk event to the Okta org, which can be consumed by Okta and used to calculate the risk of the authentication.

>**Note:** Only IP-related risk events are available for consumption by the Okta org.

Use the following high-level steps to test the risk provider integration:

1. [Create a client assertion for the access token](/docs/guides/third-party-risk-integration/test-integration/#create-a-client-assertion)
2. [Create an access token](/docs/guides/third-party-risk-integration/test-integration/#create-an-access-token)
3. [Send a risk event to the Okta org](/docs/guides/third-party-risk-integration/test-integration/#send-a-risk-event-to-okta)
4. [Confirm the response and system log](/docs/guides/third-party-risk-integration/test-integration/#confirm-the-response)

### Create a client assertion

This procedure creates a signed JSON Web Token (JWT), which is used as the client assertion value required in the request for a scoped access token.

1. Navigate to [Generate JWT](https://www.jsonwebtoken.dev/) to create a JWT.
2. In the **JWK KEY** field, copy the **Public and Private Keypair** generated when you created the service application ([Create a public-private key pair](/docs/guides/third-party-risk-integration/create-service-app/#create-a-public-private-key-pair).)
3. In the **Payload** field, add the following JSON payload, substituting your service application ID (client ID) and your Okta org URL:

    ```JSON
    {
    "aud": "https://<url>/oauth2/v1/token",
    "iss": "<clientId>",
    "sub": "<clientId>"
    }
    ```

4. Click **Generate JWT**.
5. Copy the resulting JWT value to your Postman's `clientAssertion` environment variable. Save the environment.

For further background information on this process, see [Create and sign the JWT](/docs/guides/implement-oauth-for-okta-serviceapp/create-sign-jwt/).

### Create an access token

This procedure creates an access token using the `clientAssertion` value required for authentication into the risk provider service application.

1. Call the following POST API from the Risk Integration Postman collection: **Partner: API to get the access token** (`{{url}}/oauth2/v1/token`).
2. Review the response from the call, and copy the `access_token` value to your Postman's `accessToken` environment variable. Don't include the leading and trailing double quotes around the `access_token` value, below, while saving the `accessToken` variable. A sample response follows:

    ```JSON
    {
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJPeXd3TmtXSnBuX1ZaQzB4aUZKUlRIRmdvQXJwOXBaSkROZktiZG4wemVBIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlYwbHNUVVUxT3RIMlotOWhGcXExSlhteEF5ZXBqWVc0YXVLSnlwTjJiRTgiLCJpc3MiOiJodHRwczovL2R1ZmZpZWxkLm9rdGFwcmV2aWV3LmNvbSIsImF1ZCI6Imh0dHBzOi8vZHVmZmllbGQub2t0YXByZXZpZXcuY29tIiwic3ViIjoiMG9hYWFib3l4c2JyV2RzazgxZDYiLCJpYXQiOjE2MTEzNDcwNDAsImV4cCI6MTYxMTM1MDY0MCwiY2lkIjoiMG9hYWFib3l4c2JyV2RzazgxZDYiLCJzY3AiOlsib2t0YS5yaXNrRXZlbnRzLm1hbmFnZSJdfQ.YUYhkfj-vjW2zEWIfhdcqMMONRVUV81gdia1wf3C2HZ7qMG6u8aGsRpdaMBotHOeno3ECQupf_hcWpUOPJ6OJX1Zdycn6ui7nDcIar6JfSs6VoyOf_e4pNnj2iBPEy9_F4qlk08Z4tBPL9XMMzUnFKL3ZfMTspBNFwpzXAlrj_wzhDS2TrE0O2Z5EAQc1hKmx7cbCOPOmhtbHDjB1OYDiKlK1Z2OlXvHLxhHGDAVQaPf8tMMD8gqQQ3_Lxifi55gCv5h3ZfVyrJtfZK5v3ZrfapK1u1JbvjvJ2fvjUce0Lf2Jl0Gq8nwD0SZZTYdDxcwJny0F1rjq_FDulaBc0JrUw",
    "scope": "okta.riskEvents.manage"
    }
    ```
    >**Note**: The access token expires in 60 minutes (or the value set in the property `expires_in`).

For further background information on this process, see [Get an access token](/docs/guides/implement-oauth-for-okta-serviceapp/get-access-token/).

### Send a risk event to Okta

This procedure sends a sample risk event payload to the Okta org.

1. Call the following POST API from the Risk Integration Postman collection: **Partner: API to send RiskEvents (Auth using access token)** (`/api/v1/risk/events/ip`). A sample payload follows, which includes two events:

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

2. Review the request status of the API call. If the status is `202 Accepted`, the risk events were consumed by the Okta org.

> **Note:** Rate limits of three calls per minute, per risk provider, apply to the `/api/v1/risk/events/ip` endpoint. Each call can contain multiple risk events.

For reference information on this API, see [Risk Events](/docs/reference/api/risk-events).

### Confirm the response

This procedure reviews the Admin Console's System Log to identify the risk event information logged after calling the Risk Event API.

1. Sign in to your Okta org as an administrator.
2. In the Admin Console, go to **Reports** > **System Log**.
3. Review the log file or search for the event `security.risk.signal.consume`, which is logged when a risk provider sends a risk event to Okta.
4. With a risk action of `enforce_and_log`, and a risk-based policy setup, the third-party risk provider event is used when calculating the authentication risk. This information is logged in the `user.session.start` event.

### General troubleshooting tips
1. Save the Postman environment after every change to the environment. Confirm that you are using the correct Postman environment.
2. Postman environment variables are case sensitive. Make sure there are no typos, no leading/trailing spaces, no leading/trailing double qoutes in the environment variables.
3. The URL should not be the admin URL (ex: use https://demo-org.oktapreview.com vs https://demo-org-admin.oktapreview.com) and you don't need a trailing `/` at the end of the URL.
