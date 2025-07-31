## Update resource server in Auth0

The resource server refers to the Okta Express Configuration API. When you authorize Okta for this resource server using OAuth 2.0, Okta receives an access token and uses it to access user and org information.

 > **Note:** The instructions on this page are for the **<StackSnippet snippet="protocol-name" inline/>** protocol. <br>
    > If you want to change the protocol instructions on this page, select the protocol you want from the **Instructions for** dropdown list on the right.

Run the following command to [update the resource server](https://auth0.github.io/auth0-cli/auth0_api.html) in Auth0:

> **Note**: The `identifier` parameter is a unique URI that identifies the resource server. The `expressconfigure:sso` scope allows Okta to configure SSO settings and `expressconfigure:scim` scope allows for SCIM provisioning capabilities.

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