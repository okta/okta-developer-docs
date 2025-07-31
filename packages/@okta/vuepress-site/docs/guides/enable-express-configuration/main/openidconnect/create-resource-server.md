## Create a resource server in Auth0

The resource server refers to the Okta Express Configuration API. When you authorize Okta for this resource server using OAuth 2.0, Okta receives an access token and uses it to access user and org information.

 > **Note:** The instructions on this page are for the **<StackSnippet snippet="protocol-name" inline/>** protocol. <br>
    > If you want to change the protocol instructions on this page, select the protocol you want from the **Instructions for** dropdown list on the right.

Run the following command to [create the resource server](https://auth0.github.io/auth0-cli/auth0_api.html) in Auth0:

> **Note**: The `identifier` parameter is a unique URI that identifies the resource server. The `expressconfigure:sso` scope allows Okta to configure SSO settings.

```bash
auth0 api post resource-servers \
  --data '{
    "name": "Okta Express Configure API",
    "identifier": "https://system.okta.com/actions/express-configure/v1",
    "scopes": [
      {
        "value": "expressconfigure:sso",
        "description": "Configure SSO with Express Configuration"
      }
    ],
    "enforce_policies": true,
    "token_lifetime": 300,
    "allow_offline_access": false,
    "skip_consent_for_verifiable_first_party_clients": false
  }'
```