The final step after all remediation is handled, is to exchange your interaction code to get access tokens

```csharp
var challengeResponse = await identifyResponse.Remediation.RemediationOptions
                                            .FirstOrDefault(x => x.Name == "challenge-authenticator")
                                            .ProceedAsync(identifyRequest);

// Exchange tokens
var tokenResponse = await challengeResponse.SuccessWithInteractionCode.ExchangeCodeAsync();
```
