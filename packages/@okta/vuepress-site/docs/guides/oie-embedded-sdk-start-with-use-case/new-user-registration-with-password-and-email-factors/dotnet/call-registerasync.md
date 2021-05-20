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
