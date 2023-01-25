1. Add a new empty API Controller class to the Controller folder named `InfoController`.
2. Add the following `using` statements to the top of the file:

   ```csharp
   using Microsoft.AspNetCore.Authorization;
   using Microsoft.AspNetCore.Cors;
   using Microsoft.AspNetCore.Http;
   using Microsoft.AspNetCore.Mvc;
   using System.Collections.Generic;
   using System.Linq;
   using System.Security.Claims;
   ```

2. Create your secure and anonymous access API routes by replacing the existing `InfoController` class with the following:

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