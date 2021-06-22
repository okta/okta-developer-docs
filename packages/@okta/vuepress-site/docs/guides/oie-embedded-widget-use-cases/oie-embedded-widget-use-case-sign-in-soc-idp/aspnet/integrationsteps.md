###  Step 1: User clicks on Sign in with Facebook link

If the the steps in
[Complete steps in Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-widget-use-cases/aspnet/oie-embedded-widget-use-case-sign-in-soc-idp/#step-2-complete-steps-in-set-up-your-okta-org-for-social-identity-providers),
were completed, the **Sign in with Facebook** link should
appear automatically on the widget. There are no code changes
need to make the link appear.

When the user cicks this link they are send to the Facebook login screen.

### Step 2: User signs into Facebook

Next, the user enters their email and password and clicks login.
This page is hosted by Facebook. The user information you enter originates
from  a test user you configured in
[Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers). There are no code changes
you need to make in your app to support to this step.

<div class="common-image-format">

![Facebook sign in](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png
 "Facebook sign in")

</div>

### Step 3: Facebook redirects to your Okta org
If the user Facebook login is successful, facebook routes the user to the value you enter for **Valid OAuth Redirect URIs** and **Site URL** in
[Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers).
The value takes on the following format:  `https://{Okta org domain}/oauth2/v1/authorize/callback.` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`)

### Step 4: Okta org redirects to your app via the Sign-in redirect URIs

After Facebook sends the success login request to your Okta org, the org
redirects the request to your app via the Application’s
**Sign-in redirect URIs** field.

This step handles the callback from the widget that
returns a `interaction_code`. This code will be redeemed in the
next step for tokens. The callback URL is defined in two locations
and must be identical. These locations are:

* The `RedirectURI` parameter in the configuration setting defined in
   [Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
* A URI defined in the **Sign-in redirect URIs** field in the Okta
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

### Step 5: Call RedeemInteractionCodeAsync to get tokens

The next step is to call the `IdxClient’s RedeemInteractionCodeAsync`
function inside the callback function. The interaction code is used get the ID
and access tokens, which you can subsequently use to pull user information.

```csharp
Okta.Idx.Sdk.TokenResponse tokens = await _idxClient.RedeemInteractionCodeAsync(idxContext, interaction_code);
```

### Step 6: Call user profile information (Optional)

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

### Step 7: Persist the tokens in session

The final step is to persist the tokens in session for future use.
The sample code below (from the sample application) uses
`IAuthenticationManager` from `Microsoft.Owin.Security` to persist
these tokens in session.

```csharp
ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, tokens);
_authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, identity);
```
