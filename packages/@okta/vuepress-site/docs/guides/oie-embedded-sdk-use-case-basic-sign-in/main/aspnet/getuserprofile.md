## Get the user profile information

After the user signs in successfully, you can use the tokens returned in the previous step to request basic user information. 

```csharp
public static async Task<IEnumerable<Claim>> GetClaimsFromUserInfoAsync(
   IdxConfiguration configuration, string accessToken)
{
   Uri userInfoUri = new Uri(
      IdxUrlHelper.GetNormalizedUriString(configuration.Issuer, "v1/userinfo")
   );
   HttpClient httpClient = new HttpClient();

   var userInfoResponse = await httpClient.GetUserInfoAsync(
      new UserInfoRequest { 
         Address = userInfoUri.ToString(), Token = accessToken,
      }
   ).ConfigureAwait(false);

   var nameClaim = new Claim(
      ClaimTypes.Name,
      userInfoResponse.Claims.FirstOrDefault(x => x.Type == "name")?.Value
   );
   return userInfoResponse.Claims.Append(nameClaim);
}
```
