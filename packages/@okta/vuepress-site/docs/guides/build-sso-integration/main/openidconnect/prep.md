### Prepare an OIDC integration

Before you create a new OIDC integration in Okta:

1. Have your application developed and tested, with a front-end (for example, JavaScript and HTML) and back-end (for example, middleware and database software) stack, along with services available through APIs, and accepting HTTP connections.
1. Based on the [type of application that you have built](/docs/concepts/oauth-openid/#what-kind-of-client-are-you-building), determine the correct [OAuth 2.0 flow](/docs/concepts/oauth-openid/#recommended-flow-by-application-type) that is required below the OIDC identity layer.

    For OIDC applications destined for the OIN, you can create either of the following:

    * A Web application with a dedicated server-side back-end capable of securely storing a client secret and exchanging information with an authorization server through trusted back-channel connections.
       > **Note** Okta recommends using the Authorization Code flow with an exchange of the client credentials for controlling the access between your application and the resource server.
    * A Single Page Application (SPA) that uses an Authorization Code flow with a Proof Key for Code Exchange (PKCE).
       > **Note:** Okta recommends this method to control the access between your SPA application and a resource server.

1. Determine the sign-in redirect URIs on your system. A redirect URI is where Okta sends the authentication response and ID token during the sign-in flow. You can specify more than one URI if required.
1. Your application must support automatic credential rotation. For more information, see [Key rotation](/docs/reference/api/oidc/#key-rotation).

> **Note:** The Okta SDKs can't be used for OIN app integration development if you need to validate access tokens with the org authorization server. This is due to the OIN restriction of using an org authorization server and the Authorization Code flow.
