---
title: Create Claims
---

Tokens contain claims that are statements about the subject (for example: name, role, or email address).

Create ID Token claims for OpenID Connect or access tokens for OAuth 2.0:

1. In the Developer Console, navigate to **API > Authorization Servers**.
2. Select the name of the Authorization Servery, and then click **Claims**. Okta provides a default subject claim. You can edit the mapping or create your own claims.
3. Click **Add Claim** and provide the requested information.

    * **Name**
    * **Include in token type**: Choose Access Token (OAuth 2.0) or ID Token (OpenID Connect). If you choose ID Token, you can also choose if the claim should be included only when requested, or always.
    * **Value type**: Choose whether you'll define the claim by a group filter or by an **Expression** written in Okta Expression Language.
        * **Mapping**: This option displays if you chose **Expression** in the previous field. Add the mapping here using [Okta's Expression Language](/docs/reference/okta-expression-language/), for example `appuser.username`.
          Be sure to check that your expression returns the results expected--the expression isn't validated here.
        * **Filter**: This option displays if you chose **Groups** in the previous field. Use it to add a group filter.
    * **Disable claim**: Check this option if you want to temporarily disable the claim for testing or debugging.
    * **Include in**: Specify whether the claim is valid for any scope, or select the scopes for which it is valid.

While in the Claims list, you can:

* Sort claims by type.
* Delete claims you've created, or disable claims for testing or debugging purposes.

![Claims List width:](/img/claims2.png "Claims List width:")

<NextSectionLink/>
