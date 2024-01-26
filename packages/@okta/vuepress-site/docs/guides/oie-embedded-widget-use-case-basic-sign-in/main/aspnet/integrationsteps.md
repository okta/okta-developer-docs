### Your app displays the sign-in page

Build a sign-in page that captures the user's name and password with the Widget. Ensure that the page completes the steps described in [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/aspnet/main/) when the page loads.

### The user submits their username and password

When the user submits their credentials, the Widget sends an identify request to Identity Engine. This returns an interaction code to the sign-in redirect URI that you configured earlier.

### Your app handles an authentication success response

Handle the callback from Identity Engine to the sign-in redirect URI.

1. Check for any errors returned from Identity Engine. If the user correctly supplies their password, there are no errors.
1. Call `idxClient.RedeemInteractionCodeAsync()` to exchange the code for the user's ID and access tokens from the authorization server.
1. Include the ID tokens when you call `AuthenticationHelper.GetIdentityFromTokenResponseAsync()` to retrieve the user's OIDC claims information, and then save the ID tokens for future use.
1. Redirect the user to the default page after a successful sign-in attempt.

The user has now signed in.

```csharp
public async Task<ActionResult> Callback(
  string state = null, string interaction_code = null,
  string error = null, string error_description = null)
{
   try
   {
      IIdxContext idxContext = Session[state] as IIdxContext;

      // error handling elided

      Okta.Idx.Sdk.TokenResponse tokens =
         await idxClient.RedeemInteractionCodeAsync(
            idxContext, interaction_code);

      ClaimsIdentity identity =
         await AuthenticationHelper.GetIdentityFromTokenResponseAsync(
            idxClient.Configuration, tokens);
      authenticationManager.SignIn(
         new AuthenticationProperties { IsPersistent = false }, identity);

      return RedirectToAction("Index", "Home");
   }
   catch (Exception ex)
   {
      return View("Error", 
         new InteractionCodeErrorViewModel {
            Error = ex.GetType().Name, ErrorDescription = ex.Message });
   }
}
```

### Get the user profile information

After the user signs in successfully, request basic user information from the authorization server using the tokens that were returned in the previous step.

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
