## Update resource server in Auth0

The resource server refers to the Okta Express Configuration API. When you authorize Okta for this resource server using OAuth 2.0, Okta receives an access token and uses it to access user and org information.

Run the following command to [update the resource server](https://auth0.github.io/auth0-cli/auth0_api.html) in Auth0:

> **Note**: The `expressconfigure:sso` scope allows Okta to configure SSO settings and the `expressconfigure:scim` scope allows for SCIM provisioning capabilities.

```bash
auth0 api patch resource-servers/https%3A%2F%2Fsystem.okta.com%2Factions%2Fexpress-configure%2Fv1 \
  --data '{
    "scopes": [
      {
        "value": "expressconfigure:sso",
        "description": "Configure SSO with Express Configuration"
      },
      {
        "value": "expressconfigure:scim",
        "description": "Configure SCIM with Express Configuration"
      }
    ]
  }'
```