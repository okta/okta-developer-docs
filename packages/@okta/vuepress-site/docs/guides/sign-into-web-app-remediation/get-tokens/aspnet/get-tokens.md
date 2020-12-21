

```csharp
// If login is successful, exchange tokens.
if (idxResponse.IsLoginSuccess)
{
    var tokenResponse = await idxResponse.SuccessWithInteractionCode.ExchangeCodeAsync();
    var idToken = tokenResponse.IdToken;
    var accessToken = tokenResponse.AccessToken;
    var refreshToken = tokenResponse.RefreshToken;
}
```
