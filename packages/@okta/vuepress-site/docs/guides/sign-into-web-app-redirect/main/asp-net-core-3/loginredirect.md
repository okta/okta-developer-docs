Create a link for the user to start the sign-in process and be redirected to Okta.

1. Open the **Views** > **Shared** > **_Layout.cshtml** file.
1. Add the code for a sign-in link directly above `<ul class="navbar-nav flex-grow-1>`:

   ```razor
   @if (User.Identity.IsAuthenticated)
   {
      <ul class="nav navbar-nav navbar-right">
         <li>
            <p class="navbar-text">Hello, @User.Identity.Name</p>
         </li>
         <li>
            <a class="nav-link" asp-controller="Home" asp-action="Profile" id="profile-button">
               Profile
            </a>
         </li>
         <li>
            <form class="form-inline" asp-controller="Account" asp-action="SignOut" method="post">
               <button type="submit" class="nav-link btn btn-link text-dark" id="logout-button">
                  Sign Out
               </button>
            </form>
         </li>
      </ul>
   }
   else
   {
      <ul class="nav navbar-nav navbar-right">
         <li>
            <a asp-controller="Account" asp-action="SignIn" id="login-button">
               Sign In
            </a>
         </li>
      </ul>
   }
   ```

1. Add code to handle the `Sign In` click.
   1. Create an empty MVC controller named `AccountController.cs` in the `Controllers` folder.
      1. Right-click the `Controllers` folder in **Solution Explorer** and select **Add** > **Controller...**
      [[style="list-style-type:lower-alpha"]]
      1. Select **MVC Controller - Empty**, and then click **Add**.
      1. Enter the name `AccountController.cs`, and then click **Add**.

   1. Add the following `using` statements to the top of the controller:

      ```csharp
      using Microsoft.AspNetCore.Authentication;
      using Microsoft.AspNetCore.Authentication.Cookies;
      using Okta.AspNetCore;
      ```

   1. Add an `IActionResult` for `SignIn`:

      ```csharp
      public IActionResult SignIn()
      {
         if (!HttpContext.User.Identity.IsAuthenticated)
         {
            return Challenge(OktaDefaults.MvcAuthenticationScheme);
         }

         return RedirectToAction("Index", "Home");
      }
      ```

   1. Add another `IActionResult` right below it for `SignOut`:

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
