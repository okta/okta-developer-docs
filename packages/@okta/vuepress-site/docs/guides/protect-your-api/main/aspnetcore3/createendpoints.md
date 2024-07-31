1. Create an empty API controller named `InfoController.cs` in the `Controllers` folder.

   1. Right-click the `Controllers` folder in **Solution Explorer** and select **Add** > **Controller...**
   [[style="list-style-type:lower-alpha"]]
   1. Select **API Controller - Empty**, and then click **Add**.
   1. Enter the name `InfoController.cs`, and then click **Add**.

1. Add the following `using` statements to the top of the file:

   ```csharp
   using Microsoft.AspNetCore.Authorization;
   using Microsoft.AspNetCore.Cors;
   using System.Collections.Generic;
   using System.Linq;
   using System.Security.Claims;
   ```

1. Replace the existing `InfoController` class with the following code:

   ```csharp
   [ApiController]
   [Route("api")]
   public class InfoController : ControllerBase
   {
     // GET: api/whoami
     [HttpGet]
     [Route("whoami")]
     public Dictionary<string, string> GetAuthorized()
     {
       var principal = HttpContext.User.Identity as ClaimsIdentity;
       return principal.Claims
          .GroupBy(claim => claim.Type)
          .ToDictionary(claim => claim.Key, claim => claim.First().Value);
     }

     // GET: api/hello
     [HttpGet]
     [Route("hello")]
     public string GetAnonymous()
     {
       return "You are anonymous";
     }
   }
   ```
