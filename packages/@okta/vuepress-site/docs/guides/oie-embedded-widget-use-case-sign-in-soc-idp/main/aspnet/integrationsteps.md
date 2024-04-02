### The user selects the Facebook Identity Provider

After you complete [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-social-idp-use-case), the **Sign in with Facebook** link appears automatically on the widget. You don't need to make any code changes to make the link appear.

<div class="half wireframe-border">

![The widget's sign-in form displays the username field, Next button, Sign in with Facebook button, and links to reset the password and sign up](/img/wireframes/widget-sign-in-form-username-only-sign-up-forgot-your-password-facebook-links.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4662-25341&mode=design&t=mABNx7Cm2rdSOFyx-11 widget-sign-in-form-username-only-sign-up-forgot-your-password-facebook-links
 -->

</div>

When the user clicks this link, they’re sent to the Facebook sign-in page.

### The user signs in to Facebook

The user enters their email and password, and clicks **Log In**. The Facebook platform hosts this page. Use the user information from the test user you configured in [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-social-idp-use-case). You don't need to make any code changes in your app for this step.

<div class="half border">

![Displays the Facebook sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png)

</div>

### Redirect the request to the Okta org

After the user signs in to Facebook, Facebook routes them to the **Valid OAuth Redirect URIs** and **Site URL** values you configured in [Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#_1-create-a-facebook-app-in-facebook). The value has the following format: `https://{Okta org domain}/oauth2/v1/authorize/callback`, for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`.

### Redirect the request to the client

Facebook sends the success sign-in request to your Okta org. The org then redirects the request to your app through the app's **Sign-in redirect URIs** field.

This step handles the callback from the widget that returns an `interaction_code`. This code is redeemed in the next step for tokens. The callback URL must be identical and is defined in these two locations:

* The `RedirectURI` parameter in the configuration setting that is defined in [Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
* A URI defined in the **Sign-in redirect URIs** field in the Okta Application. The **Sign-in redirect URIs** field is described in [Create a new application](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-a-new-application).

For the sample application, the **RedirectURI** should be set to `https://localhost:44314/interactioncode/callback`.

The sample application uses the MVC architecture and defines the following `Callback` function in the `InteractionCodeController` controller to handle the callback.

```csharp
public async Task<ActionResult> Callback(string state = null, string interaction_code = null, string error = null, string error_description = null)
{

}
```

### Get the tokens

The next step is to call `RedeemInteractionCodeAsync` inside the callback function for the `IdxClient`. The Interaction Code is used to get the ID and access tokens that you can then use to pull user information.

```csharp
Okta.Idx.Sdk.TokenResponse tokens = await _idxClient.RedeemInteractionCodeAsync(idxContext, interaction_code);
```

### Persist the tokens in a session

Persist the tokens in session for future use. The following code from the sample application uses `IAuthenticationManager` from `Microsoft.Owin.Security` to persist these tokens in session.

```csharp
ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, tokens);
_authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, identity);
```

### Get user profile information

Depending on your implementation, you can choose to pull user information. When you use the tokens that are provided by the `RedeemInteractionCodeAsync` method, you can request the user profile information from the `v1/userinfo` endpoint.
The following code from the sample app provides details on this call.

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
