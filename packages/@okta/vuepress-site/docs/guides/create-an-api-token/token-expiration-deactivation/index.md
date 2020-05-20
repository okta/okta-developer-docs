---
title: Token expiration and deactivation
---

With the token created, you can begin using it, supplying it in the `Authorization` header of calls to Okta API endpoints.

#### Token expiration

Tokens are valid for 30 days from creation or last use, so that the 30 day expiration  automatically refreshes with each API call.

Tokens that aren't used for 30 days expire.

The 30-day period is currently fixed and can't be changed for your organization.

#### Token deactivation

If a user account is deactivated in Okta, any API Token created by that user account is deprovisioned at the same time.

#### Next steps

See [Use Postman with the Okta REST APIs](/code/rest/) for a guide to trying out Okta APIs using Postman, as an easy way to explore.

For information on the general principles the Okta API follows, see [API Overview](/docs/reference/api-overview/).

For reference documentation for each API, see [API Reference](/docs/reference/).

