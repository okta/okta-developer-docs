### Step: Navigate to the sign-in page

The first step is make a call to `GetIdentityProvidersAsync` when the sign in page loads. This method retrieves all the Identity Providers that were added to the routing rule (**Use this identity provider** field) in the [Set up your Okta org for social Identity Providers](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers).

```csharp
ViewBag.ReturnUrl = returnUrl;
IdentityProvidersResponse identityProvidersResponse = await
      _idxClient.GetIdentityProvidersAsync();
Session[identityProvidersResponse.State] = identityProvidersResponse.Context;
LoginViewModel loginViewModel = new LoginViewModel
   {
       IdpOptions = identityProvidersResponse.IdpOptions,
   };

...

return View(loginViewModel);
```

The code calls `GetIdentityProvidersAsync`, which returns a list of Identity Providers. This list is sent to the view in a view model.

### Step: Display the available Identity Providers

The next step is to loop through the identity provider list and show links for each of the configured Identity Providers. In this use case, only the Facebook identity provider is shown.

#### Code from sample app

The following code from the sample app shows the loop of Identity Providers that build the buttons on the sign-in page. In this use case, only the Facebook identity provider is shown. The `Name` and `HRef` properties set the link's text and hyperlink.

```html
   @foreach (IdpOption idpOption in Model)
   {
   <div class="form-group">
       <div class="col-md-offset-2 col-md-10">
           <input type="submit" value="Sign In with @(idpOption.Name)" class="btn btn-primary btn-stretch-wide" onclick="goTo(event, '@idpOption.Href')" />
       </div>
   </div>
   }
```

#### Sample page for the sign-in with Facebook link

The followng sample shows the button to sign in with Facebook.

<div class="common-image-format">

![Displays an example social sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-link.png)

</div>

### Step: Select the Facebook Identity Provider

The user clicks the sign-in link, which sends them initially to the Okta org. The `HRef` property contains a URL that's linked to the Okta org. From the org, the request gets routed to Facebook for user sign-in. You don't need to implement additional code changes to perform this step.

### Step: Sign in to Facebook

Next, the user enters their email and password, and clicks **Log in**. This page is hosted by Facebook. The user information that you enter originates from a test user that you configured in [Set up your Okta org (for social Identity Providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers). You don't need to make any code changes in your app to perform this step.

<div class="common-image-format">

![Displays an example Facebook sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png)

</div>

### Step: Redirect the request to the Okta org

If the user's Facebook login is successful, Facebook routes the user to the values that you entered in **Valid OAuth Redirect URIs** and **Site URL** in [Set up your Okta org (for social Identity Providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers). The values use the following format: `https://{Okta org domain}/oauth2/v1/authorize/callback.` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`)

### Step: Redirect the request to the client

After Facebook sends the success login request to your Okta org, the org redirects the request to your app through the Application's **Sign-in redirect URIs** field, which was configured in [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

The value for the sample app is `https://localhost:44314/interactioncode/callback`.

The callback to your app contains the sign-in tokens that need to be stored in session state. See the code below for an example:

```csharp
public async Task<ActionResult> Callback(string state = null, string interaction_code = null, string error = null, string error_description = null)
{
    IIdxContext idxContext = Session[state] as IIdxContext;

    Okta.Idx.Sdk.TokenResponse tokens =
          await _idxClient.RedeemInteractionCodeAsync(idxContext, interaction_code);

    ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync
          (_idxClient.Configuration, tokens);

     _authenticationManager.SignIn(new AuthenticationProperties
             { IsPersistent = false }, identity);

      return RedirectToAction("Index", "Home");
}
```

### Step: Redirect the user to default home page

The user is now successfully signed in and can be sent to the default sign-in page. In the sample application, the default sign-page is the user profile page.
