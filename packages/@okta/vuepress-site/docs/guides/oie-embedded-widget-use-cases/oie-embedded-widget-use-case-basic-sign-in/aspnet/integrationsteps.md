###  Step 1: User signs in

If the widget successfully loads after completing the steps in
[Use Case 1: Load the widget](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-load/),
then the next step is for the user to sign in.  There is no
additional code that needs to be added to your application for this
step.  The user enters their credentials, and clicks the Next or Sign
in button.  See screenshot below:

<div class="common-image-format">

![Widget sign in screen](/img/oie-embedded-sdk/oie-embedded-widget-use-case-sign-in-screen.png
 "Widget sign in screen")

</div>

### Step 2: Set up the callback from the widget

This step handles the callback from the widget that
returns a `interaction_code`. This code will be redeemed in the
next step for tokens. The callback URL is defined in two locations
and must be identical. These locations are:

1. The `RedirectURI` parameter in the configuration setting defined in
   [Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
1. A URI defined in the **Sign-in redirect URIs** field in the Okta
   Application. The **Sign-in redirect URIs** field is described in
   [Setup your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

For the sample application, the **RedirectURI** should be set to `https://localhost:44314/interactioncode/callback`

The sample application uses the MVC architecture and defines the following
function `Callback` in the `InteractionCodeController` controller to handle
the callback.

```csharp
public async Task<ActionResult> Callback(string state = null, string interaction_code = null, string error = null, string error_description = null)
{

}
```

### Step 3: Call RedeemInteractionCodeAsync to get tokens

The next step is to call the `IdxClient’s RedeemInteractionCodeAsync`
function inside the callback function. The interaction code is used get the ID
and access tokens, which you can subsequently use to pull user information.

```csharp
Okta.Idx.Sdk.TokenResponse tokens = await _idxClient.RedeemInteractionCodeAsync(idxContext, interaction_code);
```

### Step 4: Call user profile information (Optional)

Depending on your implementation, you may choose to pull user information.
Using the tokens provided by the `RedeemInteractionCodeAsync` method,
request the user profile information from the `v1/userinfo` endpoint.
The code below, from the sample app, details this call.

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

### Step 4: Persist the tokens in session

The final step is to persist the tokens in session for future use.
The sample code below (from the sample application) uses
`IAuthenticationManager` from `Microsoft.Owin.Security` to persist
these tokens in session.

```csharp
ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, tokens);
_authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, identity);
```
