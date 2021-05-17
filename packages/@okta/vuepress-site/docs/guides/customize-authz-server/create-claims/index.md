---
title: Create Claims
---

Tokens contain claims that are statements about the subject (for example: name, role, or email address).

Create ID Token claims for OpenID Connect or access tokens for OAuth 2.0:

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of the authorization server, and then click **Claims**. Okta provides a default subject claim. You can edit the mapping or create your own claims.
1. Click **Add Claim**, enter a **Name** for the claim, and configure the claim settings:

    * **Include in token type** &mdash; select **Access Token** (OAuth 2.0) or **ID Token** (OpenID Connect). If you choose **ID Token**, you can also define whether you want the claim included only when requested or always included.
    * **Value type** &mdash; select whether you want to define the claim by a **Groups** filter or by an **Expression** written using the Okta Expression Language.
    * **Value** &mdash; this option appears if you chose **Expression**. Use Okta Expression Language syntax to generate values derived from attributes in Universal Directory and app profiles. Add the mapping here using the [Okta Expression Language](/docs/reference/okta-expression-language/), for example `appuser.username`.
      * Check that your expression returns the results expected. You can validate an expression using the **Token Preview** tab.
    * **Filter** &mdash; this option appears if you chose **Groups**. Use it to add a group filter.
      > **Note:** Up to 100 groups are included in the claim. If the filter results in more than that, the request fails.
    * **Disable claim** &mdash; select if you want to temporarily disable the claim for testing or debugging.
    * **Include in** &mdash; specify whether the claim is valid for any scope or select the scopes for which the claim is valid.

<NextSectionLink/>
