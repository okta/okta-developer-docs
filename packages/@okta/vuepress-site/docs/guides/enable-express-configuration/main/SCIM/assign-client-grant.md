Run the following commands to create the client credentials. Ensure that you update the `client_id` value with the OIDC app client ID and include the Auth0 domain in the `audience` parameter.

> **Note:** When updating an existing OIDC Express Configuration to add SCIM provisioning, you must first delete or disable (toggling it off in your Auth0 dashboard) the existing client grant before running the following command. This step is required as Auth0 does not support modifying existing grants.

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
  }`
```
