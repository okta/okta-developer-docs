---
title: Create an authorization server
---

> **Note:** If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account and you don't want to create any additional Custom Authorization Servers, you can skip this step because you already have a Custom Authorization Server created for you called "default". The `{authServerId}` for the default server is `default`.

1. In the Developer Console, navigate to **API > Authorization Servers**.

2. Select **Add Authorization Server** and enter the **Name**, **Audience**, and **Description** for the Authorization Server.

  > **Note:** An access token that is minted by a Custom Authorization Server requires that you define the **Audience** property and that it matches the `aud` claim that is returned during access token validation. The **Audience** property should be set to the URI for the OAuth 2.0 resource server that consumes the access token. Use an absolute path such as `https://api.example.com/pets`. This value is used as the default [audience](https://tools.ietf.org/html/rfc7519#section-4.1.3) for access tokens.

When you finish, the Authorization Server's **Settings** tab displays the information that you provided. If you need to [edit any of the information](/docs/reference/api/authorization-servers/#authorization-server-properties), such as [Signing Key Rotation](/docs/concepts/key-rotation/), click **Edit**.

<NextSectionLink/>
