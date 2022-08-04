### 1: The user signs in

After you complete the steps in the [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/aspnet/main/) use case and the Widget loads successfully, the next step is for the user to sign in. There is no additional code that you need to add to your app for this step. The user enters their credentials and clicks the **Next** or **Sign In** button.

<div class="half">

![Displays an example Widget sign-in page](/img/oie-embedded-sdk/oie-embedded-widget-use-case-sign-in-screen.png)

</div>

### 2: Handle the callback from the Widget

This step handles the callback from the Widget that returns an `interaction_code`. This code is redeemed in the next step for tokens. The callback URL must be identical and is defined in the following locations:

* The `RedirectURI` parameter in the configuration setting that is defined in [Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
* A URI that is defined in the **Sign-in redirect URIs** field in the Okta Application. The **Sign-in redirect URIs** field is described in [Create a new application](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-a-new-application).

For the sample application, the **RedirectURI** should be set to `https://localhost:44314/interactioncode/callback`

The sample application uses the MVC architecture and defines the following `Callback` function in the `InteractionCodeController` controller to handle the callback.

```csharp
public async Task<ActionResult> Callback(string state = null, string interaction_code = null, string error = null, string error_description = null)
{

}
```

### 3: Get the tokens

The next step is to call `RedeemInteractionCodeAsync` inside the callback function for the `IdxClient`. The interaction code is used to get the ID and access tokens, which you can subsequently use to pull user information.

```csharp
Okta.Idx.Sdk.TokenResponse tokens = await _idxClient.RedeemInteractionCodeAsync(idxContext, interaction_code);
```

### 4: Persist the tokens in a session

Persist the tokens in session for future use. The following code from the sample app uses `IAuthenticationManager` from `Microsoft.Owin.Security` to persist the tokens in session.

```csharp
ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, tokens);
_authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, identity);
```

### 5 (Optional): Get the user profile information

Depending on your implementation, you can choose to pull user information. When you use the tokens that are provided by the `RedeemInteractionCodeAsync` method, you can request the user profile information from the `v1/userinfo` endpoint. The following code from the sample app provides details for this call.

```csharp
public static async Task<IEnumerable<Claim>> GetClaimsFromUserInfoAsync(IdxConfiguration configuration, string accessToken)
{
    Uri userInfoUri = new Uri(IdxUrlHelper.GetNormalizedUriString(configuration.Issuer,
       "v1/userinfo"));
    HttpClient httpClient = new HttpClient();
    var userInfoResponse = await httpClient.GetUserInfoAsync(new UserInfoRequest
           {
                Address = userInfoUri.ToString(),
                Token = accessToken,
           }).ConfigureAwait(false);
   var nameClaim = new Claim(ClaimTypes.Name, userInfoResponse.Claims.FirstOrDefault(x => x.Type
            == "name")?.Value);
   return userInfoResponse.Claims.Append(nameClaim);
}
```
