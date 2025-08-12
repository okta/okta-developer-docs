> **Note**: Before you run the command, replace `$AUTH0_DOMAIN` with your Auth0 tenant's domain. For example, `your-tenant.us.auth0.com`.

```bash
auth0 login --domain $AUTH0_DOMAIN --scopes update:tenant_settings --scopes create:client_grants --scopes create:client_credentials --scopes update:client_credentials
```

The specified scopes ( `create:client_credentials`, `update:client_credentials`, `create:client_grants`, and `update:tenant_settings`) provide the CLI permissions to modify tenant-wide settings and create client grants, which are essential for the subsequent configuration steps.
