### Prepare an OIDC integration

#### Multi-tenancy

Okta uses a [multi-tenant](/docs/concepts/multi-tenancy) local credential system for OIDC integrations. Each instance of your app integration inside a customer org has a separate set of OIDC client credentials that are used to access your application.

For example, consider a scenario where your app integration is added to 10 separate customer orgs. Seven of those customers create a single instance of your app integration. However, the other three customers each create two separate instances of your app integration so they can use different configuration options. This scenario creates a total of 13 sets of client credentials for your application that you need to track.

This multi-tenant approach is different from other IdPs that use a global credential system, where a given application has the same customer credentials across all orgs.

#### Prerequisites

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
