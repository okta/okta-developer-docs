The following code defines an endpoint that receives the `OTP` and `state` values from the magic link. It then attempts to retrieve the current Sign-In Widget configuration details from session state. If successful, the `OTP` and `state` values are added to the configuration details and passed to the Widget. If unsuccessful, the code assumes the callback has not come from the same browser and prompts the user accordingly.

```csharp
public async Task<ActionResult> Callback(
   string state, string otp, string error = null, string error_description = null)
{
   // handle errors if error is not null

   SignInWidgetConfiguration siwConfig = Session["siwConfig"] as SignInWidgetConfiguration;
   if (siwConfig != null)
   {
       siwConfig.Otp = otp;
       siwConfig.State = state;
       return View("SignInWidget", siwConfig);
   }

   return View(new MagicLinkCallbackModel {
      Message = $"Please enter the OTP '{otp}' in the original browser tab to finish the flow."
   });
}
```

> **Note**: For more information on magic links and OTP, including customizations and complete user journeys, see [Email Magic Links Overview](/docs/guides/email-magic-links-overview/main/).

### 4. Your app handles an authentication success response

After the user successfully verifies their identity, Identity Engine sends an interaction code in a query parameter to `${signInRedirectURI}`. For example, `http://localhost:44314/interactioncode/callback?interaction_code=2JFmObNY8snovJP6_UK5gI_l7RQ-....`

Create an endpoint that calls `idxClient.RedeemInteractionCodeAsync()` to exchange the interaction code for access tokens and `AuthenticationHelper.GetIdentityFromTokenResponseAsync()` to retrieve the user's OIDC claims information and pass it into your application. The user has now signed in.

```csharp
public async Task<ActionResult> Callback(
   string state = null, string interaction_code = null, string error = null, string error_description = null)
{
   try
   {
       IIdxContext idxContext = Session[state] as IIdxContext;

       // handle errors if error is not null or interaction_code is null

       Okta.Idx.Sdk.TokenResponse tokens =
         await _idxClient.RedeemInteractionCodeAsync(idxContext, interaction_code);
       ClaimsIdentity identity =
         await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, tokens);
       _authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, identity);

       return RedirectToAction("Index", "Home");
   }
   catch (Exception ex)
   {
      return View("Error", new InteractionCodeErrorViewModel {
         Error = ex.GetType().Name, ErrorDescription = ex.Message
      });
   }
}
```

Store these tokens for future requests and redirect the user to the default page.
