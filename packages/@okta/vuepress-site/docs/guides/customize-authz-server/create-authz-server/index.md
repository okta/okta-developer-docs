---
title: Create an Authorization Server
---

> **Note:** If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account, you can skip this step because you already have a custom Authorization Server created for you, called "default". The `{authServerId}` for the default server is `default`.

1. In the administration UI, navigate to **API > Authorization Servers**.

2. Choose **Add Authorization Server** and supply the requested information.

    * **Name**
    * **Audience:** URI for the OAuth 2.0 resource server that consumes the access tokens. Use an absolute path such as `https://api.example.com/pets`.
      This value is used as the default [audience](https://tools.ietf.org/html/rfc7519#section-4.1.3) for access tokens.
    * **Description**

When complete, your Authorization Server's **Settings** tab displays the information that you provided and allows you to edit it.
![Add Authorization Server width:](/img/auth_server2.png "Add Authorization Server width:")

Once the Authorization Server is created you can also edit the [Signing Key Rotation](/docs/concepts/key-rotation/) setting.

<NextSectionLink/>
