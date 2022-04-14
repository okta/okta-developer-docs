Although Okta doesn't provide a .Net library for JWT validation, the Microsoft OpenID Connect JWT libraries may be used for this purpose.

For additional details about the code described here, see [.NET JWT Validation Guide](/code/dotnet/jwt-validation/).

### Get the signing keys

Okta signs JWTs using [asymmetric encryption (RS256)](https://stackoverflow.com/a/39239395/3191599), and publishes the public signing keys in a JWKS (JSON Web Key Set) as part of the OAuth 2.0 and OpenID Connect discovery documents. The signing keys are rotated on a regular basis. The first step to verify a signed JWT is to retrieve the current signing keys.

The `OpenIdConnectConfigurationRetriever` class in the [Microsoft.IdentityModel.Protocols.OpenIdConnect](https://www.nuget.org/packages/Microsoft.IdentityModel.Protocols.OpenIdConnect/) package will download and parse the discovery document to get the key set. You can use it in conjunction with the `ConfigurationManager` class, which will handle caching the response and refreshing it regularly:

```csharp
// Replace with your authorization server URL:
var issuer = "https://${yourOktaDomain}/oauth2/default";

var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
    issuer + "/.well-known/oauth-authorization-server",
    new OpenIdConnectConfigurationRetriever(),
    new HttpDocumentRetriever());
```

Once you've instantiated the `configurationManager`, keep it around as a singleton. You only need to set it up once.

### Validate a token

The `JwtSecurityTokenHandler` class in the [System.IdentityModel.Tokens.Jwt](https://www.nuget.org/packages/System.IdentityModel.Tokens.Jwt) package will handle the low-level details of validating a JWT.

You can write a method that takes the token, the issuer, and the `configurationManager` you created. The method is `async` because the `configurationManager` may need to make an HTTP call to get the signing keys (if they aren't already cached):

```csharp
private static async Task<JwtSecurityToken> ValidateToken(
    string token,
    string issuer,
    IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
    CancellationToken ct = default(CancellationToken))
{
    if (string.IsNullOrEmpty(token)) throw new ArgumentNullException(nameof(token));
    if (string.IsNullOrEmpty(issuer)) throw new ArgumentNullException(nameof(issuer));

    var discoveryDocument = await configurationManager.GetConfigurationAsync(ct);
    var signingKeys = discoveryDocument.SigningKeys;

    var validationParameters = new TokenValidationParameters
    {
        RequireExpirationTime = true,
        RequireSignedTokens = true,
        ValidateIssuer = true,
        ValidIssuer = issuer,
        ValidateIssuerSigningKey = true,
        IssuerSigningKeys = signingKeys,
        ValidateLifetime = true,
        // Allow for some drift in server time
        // (a lower value is better; we recommend two minutes or less)
        ClockSkew = TimeSpan.FromMinutes(2),
        // See additional validation for aud below
        ValidateAudience = false,
    };

    try
    {
        var principal = new JwtSecurityTokenHandler()
            .ValidateToken(token, validationParameters, out var rawValidatedToken);

        return (JwtSecurityToken)rawValidatedToken;
    }
    catch (SecurityTokenValidationException)
    {
        // Logging, etc.

        return null;
    }
}
```

To use the method, pass it a token, and the issuer and `configurationManager` you declared earlier:

```csharp
var accessToken = "eyJh...";

var validatedToken = await ValidateToken(accessToken, issuer, configurationManager);

if (validatedToken == null)
{
    Console.WriteLine("Invalid token");
}
else
{
    // Additional validation...
    Console.WriteLine("Token is valid!");
}
```

This method will return an instance of `JwtSecurityToken` if the token is valid, or `null` if it is invalid. Returning `JwtSecurityToken` makes it possible to retrieve claims from the token later.

Depending on your application, you could change this method to return a boolean, log specific exceptions like `SecurityTokenExpiredException` with a message, or handle validation failures in some other way.

### Additional validation for access tokens

If you are validating access tokens, you should verify that the `aud` (audience) claim equals the audience that is configured for your Authorization Server in the Okta Developer Console.

For example, if your Authorization Server audience is set to `MyAwesomeApi`, add this to the validation parameters:

```csharp
ValidateAudience = true,
ValidAudience = "MyAwesomeApi",
```

You also must verify that the `alg` claim matches the expected algorithm which was used to sign the token. You'll have to perform this check after the `ValidateToken` method returns a validated token:

```csharp
// Validate alg
var validatedToken = await ValidateToken(accessToken, issuer, configurationManager);
var expectedAlg = SecurityAlgorithms.RsaSha256; //Okta uses RS256

if (validatedToken.Header?.Alg == null || validatedToken.Header?.Alg != expectedAlg)
{
    throw new SecurityTokenValidationException("The alg must be RS256.");
}
```

### Additional validation for ID tokens

When validating an ID token, you should verify that the `aud` (Audience) claim equals the Client ID of the current application.

Add this to the validation parameters:

```csharp
ValidateAudience = true,
ValidAudience = "xyz123", // This Application's Client ID
```

You also must verify that the `alg` claim matches the expected algorithm which was used to sign the token. You'll have to perform this check after the `ValidateToken` method returns a validated token:

```csharp
// Validate alg
var validatedToken = await ValidateToken(idToken, issuer, configurationManager);
var expectedAlg = SecurityAlgorithms.RsaSha256; //Okta uses RS256

if (validatedToken.Header?.Alg == null || validatedToken.Header?.Alg != expectedAlg)
{
    throw new SecurityTokenValidationException("The alg must be RS256.");
}
```

If you specified a nonce during the initial code exchange when your application retrieved the ID token, you should verify that the nonce matches:

```csharp
var validatedToken = await ValidateToken(idToken, issuer, configurationManager);

// Validate nonce
var expectedNonce = "foobar"; // Retrieve this from a saved cookie or other mechanism
var nonceMatches = validatedToken.Payload.TryGetValue("nonce", out var rawNonce)
    && rawNonce.ToString() == expectedNonce;

if (!nonceMatches)
{
    throw new SecurityTokenValidationException("The nonce was invalid.");
}
```

## Decode token claims

The sample `ValidateToken` method above both validates a token and decodes its claims. You can use the returned `JwtSecurityToken` object to inspect the claims in the token.

For example, you can get the `sub` (Subject) claim with the `Subject` property:

```csharp
Console.WriteLine($"Token subject: {validatedToken.Subject}");
```

You can access more claims with the `Payload` property, or loop over the entire `Claims` collection:

```csharp
Console.WriteLine("All claims:");

foreach (var claim in validatedToken.Claims)
{
    Console.WriteLine($"{claim.Type}\t{claim.Value}");
}
```
