To enable Express Configuration for SCIM integration, your first step is to [Authenticate with the Auth0 CLI](https://auth0.github.io/auth0-cli/auth0_login.html) to establish a connection between your app environment and your Auth0 tenant. Run the following command to authenticate with the Auth0 CLI with the appropriate scopes.

> **Note**: Before you run the command, replace `$AUTH0_DOMAIN` with your Auth0 tenant's domain. For example, `your-tenant.us.auth0.com`.

```bash
auth0 login --domain $AUTH0_DOMAIN --scopes read:client_grants --scopes update:client_grants
```
