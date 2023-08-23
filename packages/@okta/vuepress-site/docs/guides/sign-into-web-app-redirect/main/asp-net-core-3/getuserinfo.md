The user information that Okta returns in an ID token after a user has signed in is saved automatically in `HttpContext.User`. For example, you can check whether the user is signed in with `User.Identity.IsAuthenticated` in your actions or views and see all the user's claims in `User.Claims`. In this section, you create a simple profile page that lists all the claims returned.

1. Open the **Controllers** > **HomeController.cs** file.
1. Add the following `using` statement to the top of the controller:

   ```csharp
   using Microsoft.AspNetCore.Authorization;
   ```

1. Add an `IActionResult` called `Profile` to hand the claim data over to a new view you create next:

   ```csharp
   [Authorize]
   public IActionResult Profile()
   {
     return View(HttpContext.User.Claims);
   }
   ```

1. Create a razor view called `Profile` to display the user claims.
   1. Right-click the **Views** > **Home** folder in **Solution Explorer** and select **Add** > **View...**
   1. Select **Razor View - Empty**, and then click **Add**.
   1. Enter the name `Profile.cshtml`, and then click **Add**.
   1. Replace the contents of the new file with the following code:

      ```csharp
      @model IEnumerable<System.Security.Claims.Claim>

      @{
         ViewBag.Title = "View claims";
      }

      <h2>@ViewBag.Title</h2>

      <dl class="dl-horizontal">
         @foreach (var claim in Model)
         {
            <dt title="@claim.Type">
               @claim.Type
               <button type="button"
                  class="btn btn-link btn-xs"
                  aria-label="Copy to clipboard"
                  title="Copy to clipboard"
                  data-clipboard-text="@claim.Value">
                  <span class="glyphicon glyphicon glyphicon-copy" aria-hidden="true"></span>
               </button>
            </dt>

            <dd id="claim-@String.Format("{0}", claim.Type)">@claim.Value</dd>
         }
      </dl>
      ```
