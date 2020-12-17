In this sample, were showing only a basic flow of handling the `identify` request and `challenge-authenticator` request

```csharp
// Create a new client passing the desired scopes
var client = new IdxClient(new IdxConfiguration()
            {
                Issuer = "{YOUR_ISSUER}", // e.g. https://foo.okta.com/oauth2/default, https://foo.okta.com/oauth2/ausar5vgt5TSDsfcJ0h7
                ClientId = "{YOUR_CLIENT_ID}",
                ClientSecret = "{YOUR_CLIENT_SECRET}", //Required for confidential clients.
                RedirectUri = "{YOUR_REDIRECT_URI}", // Must match the redirect uri in client app settings/console
                Scopes = "openid profile offline_access",
            });

// Call Introspect - interactionHandle is optional; if it's not provided, a new interactionHandle will be obtained.
var introspectResponse = await client.IntrospectAsync();

// Identify with username
var identifyRequest = new IdxRequestPayload();
            identifyRequest.StateHandle = introspectResponse.StateHandle;
            identifyRequest.SetProperty("identifier", " foo@example.com");

var identifyResponse = await introspectResponse.Remediation.RemediationOptions
                                                        .FirstOrDefault(x => x.Name == "identify")
                                                        .ProceedAsync(identifyRequest);

// Challenge with password
identifyRequest = new IdxRequestPayload()
            {
                StateHandle = identifyResponse.StateHandle,
            };

            identifyRequest.SetProperty("credentials", new
            {
                passcode = "foo",
            });


var challengeResponse = await identifyResponse.Remediation.RemediationOptions
                                            .FirstOrDefault(x => x.Name == "challenge-authenticator")
                                            .ProceedAsync(identifyRequest);

```
