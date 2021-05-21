#### Step 1: Create the create account page

Create a page that accepts the user’s basic profile information. An example is
shown below:

<div class="sequence-diagram-format">

![Create your account page](/img/oie-embedded-sdk/ssr-create-your-account-page.png
 "Shows the user a create your account mockup page")

</div>

#### Step 2: Create a sign up link for new users

On the sign in page, create a sign up link that links to the create account
page.  Note the sign up link in the example below under the Continue button.

<div class="sequence-diagram-format">

![Sign up link](/img/oie-embedded-sdk/ssr-sign-up-link-page.png
 "Shows the user the sign up link on the login page")

</div>

#### Step 3: Call RegisterAsync to register the new user

When the user clicks on the register button, create a `UserProfile` object and
set its properties with the user profile information captured in the Create
account page. Pass this object into the `IdxClient’s` `RegisterAsync` method.

<div class="language-title">.Net / C#</div>

```DOTNET
var idxAuthClient = new IdxClient(null);

var userProfile = new UserProfile();
userProfile.SetProperty("firstName", model.FirstName);
userProfile.SetProperty("lastName", model.LastName);
userProfile.SetProperty("email", model.Email);

var registerResponse = await idxAuthClient.RegisterAsync(userProfile);
...

if (registerResponse.AuthenticationStatus == AuthenticationStatus.AwaitingAuthenticatorEnrollment)
    {
        Session["idxContext"] = registerResponse.IdxContext;
        TempData["authenticators"] = registerResponse.Authenticators;
        return RedirectToAction("SelectAuthenticator", "Manage");
    }

```

#### Step 4: Handle the response from RegisterAsync

If the org and application have been properly configured, `RegisterAsync` should
return a response with `AuthenticationStatus` equal to
`AwaitingAuthenticatorEnrollment`.  This status indicates there is a required
authenticator that needs to be verified.  In this case it will be the password
factor which is stored in the `Authenticators` property.

<div class="language-title">.Net / C#</div>

```DOTNET
var registerResponse = await idxAuthClient.RegisterAsync(userProfile);

if (registerResponse.AuthenticationStatus == AuthenticationStatus.AwaitingAuthenticatorEnrollment)
    {
        Session["idxContext"] = registerResponse.IdxContext;
        TempData["authenticators"] = registerResponse.Authenticators;
         return RedirectToAction("SelectAuthenticator", "Manage");
     }
```

#### Step 5: Build an authenticator list page

The next step is to build a page that shows the required factors that need to
be verified. After the call to `RegisterAsync` the user needs to see the password
factor requirement and select it for verification.

<div class="sequence-diagram-format">

![Verify Authenticator](/img/oie-embedded-sdk/ssr-verify-enroll-password.png
 "Page that shows the verify password factor")

</div>

The page should be generic and handle the list of authenticators returned from
the various methods of the SDK.  Use the Authenticators property in the
returned response to build the list.

<div class="language-title">.Net / C#</div>

```DOTNET
var authenticators = (IList<IAuthenticator>)TempData["authenticators"];

var viewModel = new SelectAuthenticatorViewModel();
viewModel.Authenticators = authenticators?
        .Select(x =>
          new AuthenticatorViewModel
          {
             Id = x.Id,
             Name = x.DisplayName
          })
        .ToList() ?? new List<AuthenticatorViewModel>();
```

#### Step 6: Call EnrollAuthenticatorAsync to verify the password authenticator

The next step is to call the `EnrollAuthenticatorAsync` method when the user
selects the authenticator.  In this case the `AuthenticatorId` for the
**password** factor is passed in.

<div class="language-title">.Net / C#</div>

```DOTNET
var enrollAuthenticatorOptions = new EnrollAuthenticatorOptions
{
     AuthenticatorId = model.AuthenticatorId,
};

var enrollResponse = await idxAuthClient.EnrollAuthenticatorAsync(enrollAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

#### Step 7: Handle the response to EnrollAuthenticatorAsync

`EnrollAuthenticatorAsync` returns a `AuthenticationStatus`  and if the enrollment
was successful this property should return `AwaitingAuthenticatorVerification`.
When `AwaitingAuthenticatorVerification` is returned, the next step is to verify
the authenticator. In this case, the user needs to verify the **password** authenticator.

<div class="language-title">.Net / C#</div>

```DOTNET
if (enrollResponse.AuthenticationStatus == AuthenticationStatus.AwaitingAuthenticatorVerification)
     {
        if (model.IsPasswordSelected)
        {
            return RedirectToAction("ChangePassword", "Manage");
        }
            return RedirectToAction("VerifyAuthenticator", "Manage");
     }
```

#### Step 8: Build page to verify new password authenticator

Once the password authenticator is awaiting verification, the next step is to
build a page to that allows the user to verify the new password by supplying
the password.

<div class="sequence-diagram-format">

![Update password](/img/oie-embedded-sdk/ssr-verify-update-password.png
 "User updates the password for the new user.")

</div>

#### Step 9: Call VerifyAuthenticatorAsync to verify password

When the user fills out the new password, and clicks the register button, a
call to `VerifyAuthenticatorAsync` is made to verify (in the case set the
password for the new user).  Use the Code property in the
`VerifyAuthenticatorOptions` parameter to store the new password.

<div class="language-title">.Net / C#</div>

```DOTNET
var idxAuthClient = new IdxClient(null);

var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
{
   Code = code,
};

try
{
   var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

#### Step 10: Handle the response from VerifyAuthenticatorAsync

The next step is to handle the response from `VerifyAuthenticatorAsync`.
Since there is a required email factor that is next, the response’s
`AuthenticationStatus` should return `AwaitingAuthenticatorEnrollment` for
the email factor.  The user should be redirected to **authenticator list** page
you built in [Step 5](#step-5-build-an-authenticator-list-page).

<div class="sequence-diagram-format">

![Verify email auth](/img/oie-embedded-sdk/ssr-verify-email-auth.png
 "User selects email as the authenticator.")

</div>

<div class="language-title">.Net / C#</div>

```DOTNET
var authnResponse = await idxAuthClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);

switch (authnResponse.AuthenticationStatus)
{
    case AuthenticationStatus.AwaitingPasswordReset:
         Session["idxContext"] = authnResponse.IdxContext;
         return RedirectToAction("ChangePassword", "Manage");
    case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
         Session["idxContext"] = authnResponse.IdxContext;
         TempData["authenticators"] = authnResponse.Authenticators;
         return RedirectToAction("SelectAuthenticator", "Manage");
    case AuthenticationStatus.Success:
         var userName = (string)Session["UserName"] ?? string.Empty;
         var identity = AuthenticationHelper.GetIdentityFromAuthResponse(userName, authnResponse);
          _authenticationManager.SignIn(new AuthenticationProperties(), identity);
          return RedirectToAction("Index", "Home");
}
```

#### Step 11: Call EnrollAuthenticatorAsync to verify the email authenticator

Once the user selects the email authenticator, a call to
`EnrollAuthenticatorAsync` is made in the same manner as the password
authenticator.  In this case, however, the email `AuthenticatorId` is used. See
[Step 6](#step-6-call-enrollauthenticatorasync-to-verify-the-password-authenticator)
and the sample app for more details.

When the response returns `AwaitingAuthenticatorVerification`, the Okta platform
sends an email to the address provided by the user in the first page built
in [Step 1](#step-1-update-the-profile-enrollment-default-policy). The next
step is to redirect the user to a page to verify the code sent in the email.

#### Step 12: Build out email verification code page

Build out the email verification code page that will accept the code from
the email.

<div class="sequence-diagram-format">

![Verify email with code](/img/oie-embedded-sdk/ssr-verify-email-with-code.png
 "User enters verify code from email")

</div>

#### Step 13: Update the Email Factor Verification email template (optional)

The Okta org you created in [Create your Okta Account](#TODO) contains a list of email
templates used for correspondence with the users. One such template, named
**Email Factor Verification**, ..

TODO

#### Step 14: Call and handle the response from VerifyAuthenticatorAsync

The next step is to call and handle the response from `VerifyAuthenticatorAsync`
in the same manner that was done for the password factor in
[Step 9](#step-9-call-verifyauthenticatorasync-to-verify-password) and
[10](#step-10-handle-the-response-from-verifyauthenticatorasync). In
the case of the email verification, the code passed into
`VerifyAuthenticatorAsync` will be the code from the verification email.

#### Step 15: Handle when VerifyAuthenticatorAsync returns success

Once the email verification is successful and there are no more authenticators
to enroll and verify, the user is now successfully registered and can either be
sent back to a sign in page or be redirected to the default home page for successful
sign ins.

#### Step 16: Test the integration

Once you’ve completed the UI and code elements, test the integration.

### Troubleshooting Tips

1. Ensure when testing this use case you use a new email each time.
   If you have a gmail account you can reuse the same email by add a plus
   (+) and additional text (e.g. `myemail+1@gmail.com`, `myemail+2@gmail.com`, etc)

</div>
