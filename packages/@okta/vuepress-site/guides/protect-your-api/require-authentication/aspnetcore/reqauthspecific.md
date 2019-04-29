Use the `Authorize` attribute on controllers or actions to require a signed-in user:

```csharp
public class MessagesController : Controller
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
                new { Date = DateTime.Now, Text = "I am a Robot." },
                new { Date = DateTime.Now, Text = "Hello, world!" },
            },
        });
    }
}
```