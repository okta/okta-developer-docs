#### Client secret

The Swift SDK includes a reference to the client secret because it can potentially be used on some server-to-server use cases. The Swift SDK sample app doesn't use a client secret because client secrets aren't recommended for native client applications. Instead, use the
[Authorization Code with PKCE flow](/docs/guides/implement-grant-type/authcodepkce/main/) for controlling access to your native application.
