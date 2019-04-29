Install the following dependencies in your project:

* [Microsoft.AspNet.WebApi.Cors](https://www.nuget.org/packages/Microsoft.AspNet.WebApi.Cors/)

Open the `WebApiConfig.cs` file and update the `Register` method to enable CORS:

```csharp
public static void Register(HttpConfiguration config)
{
    //...
    config.EnableCors();
}
```

Then, you need to enable cross-origin requests. Add the `EnableCors` attribute to your Web API controller or controller method:

```csharp
public class MessagesController : ApiController
{
    // The CORS policy is open for testing purposes. In a production application, you should restrict it to known origins.
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [Route("~/api/messages")]
    [Authorize]
    [HttpGet]
    public IHttpActionResult Get()
    {
        return Json(new
        {
            messages = new dynamic[]
            {
                new { date = DateTime.Now, text = "I am a Robot." },
                new { date = DateTime.Now, text = "Hello, world!" },
            },
        });
    }
}
```

Update your using statements to import `System.Web.Http.Cors`:

```csharp
using System.Web.Http.Cors;
```