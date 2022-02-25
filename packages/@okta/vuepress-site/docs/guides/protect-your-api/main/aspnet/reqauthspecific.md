Use the `[Authorize]` attribute on controllers or actions to require a signed-in user:

```csharp
public class MessagesController : Controller
{
    [Route("~/api/messages")]
    [Authorize]
    [HttpGet]
    public IHttpActionResult Get()
    {
        return Json(new
        {
            messages = new dynamic[]
            {
                new { date = DateTime.Now, text = "This endpoint is protected." },
                new { date = DateTime.Now, text = "Hello, world!" },
            },
        });
    }
}
```
