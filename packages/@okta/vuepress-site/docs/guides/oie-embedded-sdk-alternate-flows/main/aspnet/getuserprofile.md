
Using the tokens obtained from the `IdxClient’s AuthenticateAsync`
method, make a request to the following endpoint:

```csharp
Uri userInfoUri = new Uri(IdxUrlHelper.GetNormalizedUriString(configuration.Issuer, "v1/userinfo"));
HttpClient httpClient = new HttpClient();
var userInfoResponse = await httpClient.GetUserInfoAsync(new UserInfoRequest
         {
             Address = userInfoUri.ToString(),
             Token = accessToken,
         }).ConfigureAwait(false);
var nameClaim = new Claim(
ClaimTypes.Name,userInfoResponse.Claims.FirstOrDefault(x => x.Type == "name")?.Value);
return userInfoResponse.Claims.Append(nameClaim);
```
