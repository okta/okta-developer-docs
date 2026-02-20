You can obtain the OAuth 2.0 access token using the client credentials flow with your service app credentials. Set environment variables to switch between test and production environments.

```bash
  # Set variables for test environment
  export OKTA_ORG_URL="https://dev-test.com"
  export OKTA_CLIENT_ID="0oa1234567890abcdef"
  export OKTA_PRIVATE_KEY_PATH="./keys/test-private-key.pem"

  # To target production, change these variables:
  # export OKTA_ORG_URL="https://acme-prod.okta.com"
  # export OKTA_CLIENT_ID="0oa9876543210fedcba"
  # export OKTA_PRIVATE_KEY_PATH="./keys/prod-private-key.pem"
```

To obtain an access token, you need to create a JWT and exchange it for an OAuth 2.0 access token. Terraform and PowerShell handle this process automatically. For direct API calls, you can use a helper script or library to generate the JWT.
