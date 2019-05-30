---
title: Create Scopes
---

Scopes specify what access privileges are being requested as part of the authorization. For example, the `email` scope requests access to the user's email address. There are certain reserved scopes that are created with any Okta authorization server, which are listed [here](/docs/api/resources/oidc/#scopes).

If you need scopes in addition to the reserved scopes provided, you can create them. Custom scopes can have corresponding claims that tie them to some sort of user information.

1. In the administrator UI, navigate to **API > Authorization Servers**.
2. Choose the name of the Authorization Server to display, and then select **Scopes**.
![Add Scopes width:](/img/scope1.png "Add Scopes width:")

3. Choose **Scopes > Add Scope**, and provide a name and description, then choose **Create** to save the scope.
![View Scopes width:](/img/scope2.png "View Scopes width:")

These scopes are referenced by the **Claims** dialog.

If you set a scope as "Default", then it will be included by default in any tokens that are created. Depending on which flow you are using, it might also allow you to exclude the `scope` parameter from your token request.

<NextSectionLink/>