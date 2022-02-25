Use the `[Authorize]` attribute on controllers or actions to require a signed-in user:

```csharp
[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    [HttpGet]
    [Route("~/api/messages")]
    [Authorize]
    public JsonResult Get()
    {
        return Json(new
        {
            messages = new dynamic[]
            {
                new { Date = DateTime.Now, Text = "This endpoint is protected." },
                new { Date = DateTime.Now, Text = "Hello, world!" },
            },
        });
    }
}
```
