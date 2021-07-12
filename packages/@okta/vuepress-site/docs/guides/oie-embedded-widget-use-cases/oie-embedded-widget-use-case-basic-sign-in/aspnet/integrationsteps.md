## Integration steps

###  Step 1: User signs in

After you complete the steps in [Use Case 1: Load the widget](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-load/) and the widget loads successfully, then the next step is for the user to sign in.  There is no additional code that needs to be added to your app for this step. The user enters their credentials, and clicks the **Next** or **Sign In** button.

<div class="common-image-format">

![Widget sign-in screen](/img/oie-embedded-sdk/oie-embedded-widget-use-case-sign-in-screen.png
 "Widget sign-in screen")

</div>

### Step 2: Set up callback from the widget

This step handles the callback from the widget that returns an `interaction_code`. This code is redeemed in the next step for tokens. The callback URL must be identical and is defined in the following locations:

* The `RedirectURI` parameter in the configuration setting that is defined in [Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
* A URI that is defined in the **Sign-in redirect URIs** field in the Okta Application. The **Sign-in redirect URIs** field is described in [Setup your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

For the sample application, the **RedirectURI** should be set to `https://localhost:44314/interactioncode/callback`

The sample application uses the MVC architecture and defines the following `Callback` function in the `InteractionCodeController` controller to handle the callback.

```csharp
public async Task<ActionResult> Callback(string state = null, string interaction_code = null, string error = null, string error_description = null)
{

}
```

### Step 3: Call RedeemInteractionCodeAsync to get tokens

The next step is to call `RedeemInteractionCodeAsync` inside the callback function for the `IdxClient`. The interaction code is used to get the ID and access tokens, which you can subsequently use to pull user information.

```csharp
Okta.Idx.Sdk.TokenResponse tokens = await _idxClient.RedeemInteractionCodeAsync(idxContext, interaction_code);
```

### Step 4: Call user profile information (Optional)

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

### Step 5: Persist the tokens in session

The final step is to persist the tokens in session for future use. The following code from the sample app uses `IAuthenticationManager` from `Microsoft.Owin.Security` to persist the tokens in session.

```csharp
ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, tokens);
_authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, identity);
```
