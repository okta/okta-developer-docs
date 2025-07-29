Run the following commands to create the client credentials. Ensure that you update the `client_id` value with the OIDC app client ID and include the Auth0 domain in the `audience` parameter.

> **Note:** If you’re updating your Express Configuration integration for SCIM provisioning, delete the existing client grant or toggle it off in the Auth0 dashboard. Auth0 doesn’t allow you to update an existing grant, so make sure it’s removed before running the following command.

```bash
auth0 api post client-grants \
  --data '{
    "client_id": "'$OIN_APP_CLIENT_ID'",
    "audience": "https://'$AUTH0_DOMAIN'/api/v2/",
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