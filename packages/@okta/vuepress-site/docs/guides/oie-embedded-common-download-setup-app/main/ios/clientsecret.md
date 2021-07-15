### Client secret

The Swift SDK includes a reference to the client secret because it can
potentially be used on some server-to-server use cases. The sample app
does not use a client secret and its recommended never to use
it for native client applications. As an alternative, use the
[PKCE](https://developer.okta.com/docs/guides/implement-auth-code-pkce/overview/)
flow.
