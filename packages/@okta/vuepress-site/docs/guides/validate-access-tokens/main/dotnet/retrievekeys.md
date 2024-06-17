Okta signs JWTs using [asymmetric encryption (RS256)](https://auth0.com/blog/rs256-vs-hs256-whats-the-difference/). Okta publishes the public signing keys in a JSON Web Key Set (JWKS) as part of the OAuth 2.0 and OpenID Connect discovery documents. The signing keys are rotated regularly.

The first step to verify a signed JWT is to retrieve the current signing keys.

The `OpenIdConnectConfigurationRetriever` class in the [Microsoft.IdentityModel.Protocols.OpenIdConnect](https://www.nuget.org/packages/Microsoft.IdentityModel.Protocols.OpenIdConnect/) package downloads and parses the discovery document to get the key set. Use it with the `ConfigurationManager` class, which handles caching the response and refreshing it regularly:

```csharp
// Replace with your authorization server URL:
var issuer = "https://${yourOktaDomain}/oauth2/default";

var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
    issuer + "/.well-known/oauth-authorization-server",
    new OpenIdConnectConfigurationRetriever(),
    new HttpDocumentRetriever());
```

After you've instantiated the `configurationManager`, keep it around as a singleton. You only need to set it up once.
