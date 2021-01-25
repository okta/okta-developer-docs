---
title: Create a service application for third-party risk provider
---

Your Okta org requires the set up of an OAuth service application to integrate and authenticate third-party risk signals from a third-party risk provider.

Use the following high-level steps to configure this service application:

1. [Create a public-private key pair](/docs/guides/third-party-integration/create-service-app)
2. [Create and verify the service application](/docs/guides/third-party-integration/create-service-app)
3. [Add a scope grant to the service application](/docs/guides/third-party-integration/create-service-app)

For background information on this general process, see [Implement OAuth for Okta with a Service App](/docs/guides/implement-oauth-for-okta-serviceapp/overview/).

### Create a public-private key pair
Prior to creating the service application for the third-party risk provider, you need to create a public-private key pair for client authentication. Use a tool such as the [JSON Web Key Generator](https://mkjwk.org/) to generate  a public-private key pair for an example setup.

To generate a public-private key pair:
1. Navigate to [JSON Web Key Generator](https://mkjwk.org/).
2. Use the following values when generating the pair:

    - **Key Size**: 2048
    - **Key Use**: Signature
    - **Algorithm**: RS256
    - **Key ID**: SHA-256

3. Click **Generate**.
4. Copy the **Public Key** JSON value to your Postman environment's `publicKey` variable.
5. Make sure to save the JSON value for the **Public and Private Key pair**, which is required during testing.

For background information on this process, see [Create a public/private key pair](/docs/guides/implement-oauth-for-okta-serviceapp/create-publicprivate-keypair).

### Create a service application
Create the service application that integrates with the third-party Risk Provider using the previously generated public key for authentication.

To create the service application:
1. Call the following POST API from the Risk Integration Postman collection: Admin: API to create OAuth service client (for the provider) (`{{url}}/oauth2/v1/clients`).

2. Review the response, which includes the `jwks` key pair. Note, the `clint_name` value is the same value you gave to the `providerName` variable. A sample response follows:

    ```JSON
    {
    "client_id": "0oaaaboyxsbrWdsk81d6",
    "client_id_issued_at": 1611263018,
    "client_name": "Risk Provider Company",
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

3. From the response, copy the `client_id` value, in this example `0oaaaboyxsbrWdsk81d6`, to your Postman environment's `clientId` variable.

4. Verify the application is available by calling the following GET API from the Risk Integration Postman collection: Admin: API to get all OAuth service clients (`{{url}}/oauth2/v1/clients`).

This call retrieves all service applications from your Okta org, including the new Risk Integration service application.

For background information on this process, see [Create a service app and grant scopes](/docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/).

### Add scope grant to application
You must now define the allowed Risk scope for use with the third-party Risk Provider service application.

To add the Risk scope grant to the service application:

1. Call the following POST API from the Risk Integration Postman collection: Admin: API to grant scopes to the OAuth service client (`{{url}}/api/v1/apps/{{clientId}}/grants`).

    This call adds the `scopeId` to  the value of: `okta.riskEvents.manage`.

2. Review the response for this addition. A sample portion of the response follows:

    ```JSON
     "_embedded": {
        "scope": {
            "id": "okta.riskEvents.manage"
        }
    },
    ```

For background information on granting scopes, see [Grant allowed scopes](docs/guides/implement-oauth-for-okta-serviceapp/create-serviceapp-grantscopes/#grant-allowed-scopes).