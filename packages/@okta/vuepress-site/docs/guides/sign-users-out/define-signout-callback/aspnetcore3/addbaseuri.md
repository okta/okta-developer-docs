Follow your base URI with `/signout/callback` (for example, `http://localhost:3000/signout/callback`).

In ASP.NET Core, you have two redirect options for your app after the user is signed out of Okta:

* **Option 1:** Whitelist the post sign-out URL in your Okta application settings in the Developer Console.

    * Follow your base URI with `/account/postsignout` (for example, `http://localhost:3000/account/postsignout`).

    * Modify the Okta configuration in your application to also include the **Logout redirect URI**.

    * Open the `Startup.cs` file and update the `Configuration` method to include `PostLogoutRedirectUri` in the Okta configuration:

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

    * Add the desired logic for the post sign-out callback. Open the controller where you handle the sign-out process and add a `PostSignOut` method:

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

* **Option 2:** Modify your `SignOut` action to include the action that you want to redirect to (for example, `Home`). After you sign users out of your app and out of Okta, you can redirect users to a specific location.

    Modify your `SignOut` action to include the action that you want to redirect to (for example, `Home`):

    ```csharp
    [HttpPost]
    public IActionResult SignOut()
    {
        return new SignOutResult(
            new[]
            {
                    OktaDefaults.MvcAuthenticationScheme,
                    CookieAuthenticationDefaults.AuthenticationScheme,
         },
            new AuthenticationProperties { RedirectUri = "/Home/" });
    }
    ```