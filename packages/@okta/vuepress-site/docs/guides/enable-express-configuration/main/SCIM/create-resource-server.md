> **Note**: The `identifier` parameter is a unique URI that identifies the resource server. The `expressconfigure:sso` scope allows Okta to configure Single Sign-On (SSO) settings and `expressconfigure:scim` scope allows for SCIM provisioning capabilities.

```bash
auth0 api post resource-servers \
  --data '{
    "name": "Okta Express Configure API",
    "identifier": "https://system.okta.com/actions/express-configure/v1",
    "scopes": [
      {
        "value": "expressconfigure:sso",
        "description": "Configure SSO with Express Configuration"
      },
       {
        "value": "expressconfigure:scim",
        "description": "Configure SCIM with Express Configuration"
      }
    ],
    "enforce_policies": true,
    "token_lifetime": 300,
    "allow_offline_access": false,
    "skip_consent_for_verifiable_first_party_clients": false
  }'
```