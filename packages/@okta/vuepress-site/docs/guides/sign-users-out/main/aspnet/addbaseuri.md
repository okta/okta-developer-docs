Follow your base URI with `/account/postsignout` (for example, `http://localhost:3000/account/postsignout`).

Then, you have to modify the Okta configuration in your application to also include the **Sign-out redirect URIs**.
Open the `Startup.cs` file and update the `Configuration` method to include `PostLogoutRedirectUri` in the Okta configuration:

```csharp
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        //...
        app.UseOktaMvc(new OktaMvcOptions()
        {
            //...
            PostLogoutRedirectUri = "http://localhost:3000/Account/PostSignOut",
        });
    }
}
```
Finally, add the desired logic for the post sign-out callback.
Open the controller where you handle the sign-out process and add a `PostSignOut` method:

```csharp
public class AccountController : Controller
{
    public ActionResult PostSignOut()
    {
        // Return to the home page after sign out
        return RedirectToAction("Index", "Home");
    }
}
```