### Create a role

Run the following command to [create a role](https://auth0.github.io/auth0-cli/auth0_roles_create.html) for users who manage the Express Configuration integration. This command creates a role named `EXPRESS_CONFIGURE_ADMIN_ROLE`.

> **Note**: Skip this step if you already have a suitable role for managing Express Configuration.

```bash
auth0 roles create \
  --name "EXPRESS_CONFIGURE_ADMIN_ROLE" \
  --description "Administrator role for Express Configuration"
```