---
title: Create Scopes
---

Scopes specify what access privileges are being requested as part of the authorization. For example, the `email` scope requests access to the user's email address. There are certain reserved scopes that are created with any Okta authorization server that are listed on the OpenID Connect & OAuth 2.0 [Scopes](/docs/reference/api/oidc/#scopes) section.

If you need scopes in addition to the reserved scopes provided, you can create them. Custom scopes can have corresponding claims that tie them to some sort of user information.

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of the Authorization Server, and then select **Scopes**.
1. Select **Scopes** and then **Add Scope**.
1. Enter a **Name**, **Display phrase**, and **Description**.

    > **Note:** The **Display phrase** is what the user sees in the **Consent** dialog box.

1. Select **Require user consent for this scope** to require that a user grant consent for the scope.

    > **Note:** You can configure individual clients to ignore this setting and skip consent.

1. Select **Set as a default scope** if you want Okta to grant authorization requests to apps that don't specify scopes on an authorization request. If the client omits the scope parameter in an authorization request, Okta returns all of the default scopes that are permitted in the access token by the access policy rule.
1. Select **Include in public metadata** if you want the scope to be [publicly discoverable](/docs/reference/api/oidc/#well-known-oauth-authorization-server).
1. Click **Create**.

Scopes that you add are referenced by the <GuideLink link="../create-claims">**Claims** dialog box</GuideLink>.

If you set a scope as a default scope, then it is included by default in any tokens that are created. Depending on which flow you are using, it might also allow you to exclude the `scope` parameter from your token request.

<NextSectionLink/>
