Open the `Startup.cs` file and update the `ConfigureServices` method to enable CORS:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    //...
    services.AddCors(options =>
    {
        // The CORS policy is open for testing purposes. In a production application, you should restrict it to known origins.
        options.AddPolicy(
            "AllowAll",
            builder => builder.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader());
    });
}
```

Then, you need to enable cross-origin requests. Add the `EnableCors` attribute with the `AllowAll` policy to your Web API controller or controller method:

```csharp
[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    [HttpGet]
    [Route("~/api/messages")]
    [EnableCors("AllowAll")]
    public JsonResult Get()
    {
        return Json(new
        {
            messages = new dynamic[]
            {
                new { Date = DateTime.Now, Text = "I am a Robot." },
                new { Date = DateTime.Now, Text = "Hello, world!" },
            },
        });
    }
}
```

Update your `using` statements to import `Microsoft.AspNetCore.Cors`:

```csharp
using Microsoft.AspNetCore.Cors;
// ...
```