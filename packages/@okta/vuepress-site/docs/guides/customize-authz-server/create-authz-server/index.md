---
title: Create an Authorization Server
---

> **Note:** If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account and you don't want to create any additional custom authorization servers, you can skip this step because you already have a custom authorization server created for you called "default". The `{authServerId}` for the default server is `default`.

1. In the Developer Console, navigate to **API > Authorization Servers**.

2. Select **Add Authorization Server** and enter the **Name**, **Audience**, and **Description** for the authorization server.

  > **Note:** The **Audience** is the URI for the OAuth 2.0 resource server that consumes the access tokens. Use an absolute path such as `https://api.example.com/pets`.
      This value is used as the default [audience](https://tools.ietf.org/html/rfc7519#section-4.1.3) for access tokens.

When you finish, the authorization server's **Settings** tab displays the information that you provided. If you need to edit any of the information, such as the [Signing Key Rotation](/docs/concepts/key-rotation/), click **Edit**.

<NextSectionLink/>
