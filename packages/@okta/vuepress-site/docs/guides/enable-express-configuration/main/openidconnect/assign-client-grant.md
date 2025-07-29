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
      "update:organization_connections"
    ]
  }'
```