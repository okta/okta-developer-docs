
> **Note:** If you are updating configuration for SCIM provisioning, ensure that you delete the existing client grant (or toggle it off in the Auth0 Dashboard) before running the command below, as Auth0 doesn’t allow updating existing grants.

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