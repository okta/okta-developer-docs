Update the Client Credentials for your Okta OIN Integration Client app to include SCIM-related scopes.

  1. Run this command to find the grant ID for your Okta OIN Integration Client app.

  > **Note:** Use the Okta OIN Integration Client app client ID that was generated during the Express Configuration setup for OIDC. For more information, see the [Create and assign Client Credentials](https://developer.okta.com/docs/guides/enable-express-configuration/openidconnect/main/#create-and-assign-client-credentials).

  ```bash
    auth0 api client-grants -q "client_id=${OKTA_OIN_INTEGRATION_CLIENT_ID}"
  ```

2. Run this command to update the scopes.

  > **Note:** Replace `${GRANT_ID}` with the grant ID that you found in the previous step.

  ```bash
  auth0 api patch client-grants/${GRANT_ID} \
    --data '{
      "scope": [
        "create:connections",
        "read:connections",
        "update:connections",
        "read:connections_options",
        "update:connections_options",
        "read:organization_connections",
        "create:organization_connections",
        "update:organization_connections",
        "read:scim_config",
        "create:scim_config",
        "read:scim_token",
        "create:scim_token",
        "delete:scim_token"
      ]
    }'
  ```
