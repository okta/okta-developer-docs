---
title: Token expiration and deactivation
---
## Token expiration

Okta uses a bearer token for API authentication with a sliding scale expiration. Tokens are valid for 30 days and automatically refresh with each API call. Tokens that aren't used for 30 days expire. The token lifetime is currently fixed and can't be changed for your organization.

## Token deactivation

If a user account is deactivated in Okta, the API Token is deprovisioned at the same time.