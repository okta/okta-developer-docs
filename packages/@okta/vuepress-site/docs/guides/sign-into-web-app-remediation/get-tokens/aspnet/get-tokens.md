

```csharp
var challengeResponse = await identifyResponse.Remediation.RemediationOptions
                                            .FirstOrDefault(x => x.Name == "challenge-authenticator")
                                            .ProceedAsync(identifyRequest);
// Exchange tokens
var tokenResponse = await challengeResponse.SuccessWithInteractionCode.ExchangeCodeAsync();
```
