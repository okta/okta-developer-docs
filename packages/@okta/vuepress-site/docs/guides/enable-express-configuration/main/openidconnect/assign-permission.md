Assign the `expressconfigure:sso` permission to the specified role. Replace `$ROLE_ID` with the role ID that you want to grant permission to.

```bash
auth0 roles permissions add "$ROLE_ID" \
  --api-id "https://system.okta.com/actions/express-configure/v1" \
  --permissions "expressconfigure:sso"
```