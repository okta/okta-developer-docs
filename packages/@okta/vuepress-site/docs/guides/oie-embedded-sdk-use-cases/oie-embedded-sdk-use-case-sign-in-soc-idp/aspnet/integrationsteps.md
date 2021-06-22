### Step 1: Make a call to GetIdentityProvidersAsync when user goes to sign in page

The first step is make a call to `GetIdentityProvidersAsync` when the sign in
page loads. This method retrieves all the identity providers that were added
to the routing rule (**Use this identity provider** field) in the
[Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers).

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

The code above calls `GetIdentityProvidersAsync` which returns a list of
identity providers. This list is sent to the view in a view model.

### Step 2: Loop through Identity Providers (During sign in page load)

The next step is to loop through the identity provider list and show links
for each of the configured identity providers. In this case there should
only be the one Facebook identity provider.

#### Code from sample app

The code (from the sample app) below shows the loop of identity providers
that build the buttons on the sign page.  In this use case there should
only be the Facebook identity provider.  The `Name` and `HRef` properties
set the link’s text and hyperlink.

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

#### Screenshot showing Sign in Facebook link

Sample of the button is shown in the sign on the screen below.

<div class="common-image-format">

![Social sign in screenshot](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-link.png
 "Social sign in screenshot")

</div>

### Step 3: User Clicks on Sign in with Facebook Idp link

The user clicks on the Sign in link which sends them initially to the Okta
org. The `HRef` property contains a URL linked to the Okta org.  From the org,
there the request gets routed to facebook for user login.  There is no
additional code changes you need to implement to perform this step.

### Step 4: User signs into Facebook

Next, the user enters their email and password and clicks login.
This page is hosted by Facebook. The user information you enter originates
from  a test user you configured in
[Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers). There are no code changes
you need to make in your app to support to this step.

<div class="common-image-format">

![Facebook sign in](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png
 "Facebook sign in")

</div>

### Step 5: Facebook redirects to your Okta org
If the user Facebook login is successful, facebook routes the user to the value you enter for **Valid OAuth Redirect URIs** and **Site URL** in
[Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers).
The value takes on the following format:  `https://{Okta org domain}/oauth2/v1/authorize/callback.` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`)

### Step 6: Okta org redirects to your app via the Sign-in redirect URIs

After Facebook sends the success login request to your Okta org, the org
redirects the request to your app via the Application’s
**Sign-in redirect URIs** field. This field was configured in
[Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

The value for the sample app is:
`https://localhost:44314/interactioncode/callback`

The callback to your app contains the sign in tokens that need to be stored
in session state. See the code below for an example:

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

### Step 7: Send user to default home page
The user is now successfully signed in and can be sent to the default
sign in page. In the case of the sample application, the default sign
page is the user profile page.
