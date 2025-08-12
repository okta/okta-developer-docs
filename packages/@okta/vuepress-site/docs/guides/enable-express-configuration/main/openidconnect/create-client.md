### Create a client

Register the OIN as an OAuth client in your Auth0 tenant. This client allows Okta to securely interact with Auth0 APIs.

Run the following command to create a client. Ensure that you provide configuration values that are specific to your app.

> **Notes**:
> * The `express_configure_sp_client_id` value refers to the client ID of the app that you're enabling Express Configuration for.
> * The `organization_usage` value ensures that users sign in using an org. Set this value to `true`, as it’s a prerequisite for Express Configuration. Setting the value to `true` ensures that Express Configuration functions within the context of an org, which provides secure and structured access control.
> * The `organization_require_behavior` value determines how the org's sign-in behavior is handled. See [Define Organization Behavior](https://auth0.com/docs/manage-users/organizations/configure-organizations/define-organization-behavior).
> * Save the public key provided by Okta Express Configuration in the `okta-public-key.pem` file.
> * Ensure that you make note of the Okta OIN Integration Client app client ID after it’s created. Share this client ID with the Okta Express Configuration team to configure your app in the OIN.

```bash
auth0 api post clients \
  --data '{
    "name": "Okta OIN Integration Client",
    "description": "For Okta OIN Integration",
    "app_type": "regular_web",
    "callbacks": ["https://system-admin.okta.com/admin/app/generic/oauth20redirect"],
    "oidc_conformant": true,
    "grant_types": ["authorization_code", "client_credentials"],
    "jwt_configuration": {
      "alg": "RS256"
    },
    "client_authentication_methods": {
       "private_key_jwt": {
         "credentials": [
           {
              "name": "OIN Public Key",
              "credential_type": "public_key",
              "pem": '"$(jq -Rs '.' ./okta-public-key.pem)"',
              "alg": "RS256"
           }
         ]
       }
    },
    "organization_require_behavior": "post_login_prompt",
    "organization_usage": "require",
    "client_metadata": {
      "express_configure_sp_client_id": "'$SERVICE_APP_CLIENT_ID'"
    }
  }'
```