Use the `Authorize` attribute on controllers or actions to require a logged-in user:

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
                new { date = DateTime.Now, text = "I am a Robot." },
                new { date = DateTime.Now, text = "Hello, world!" },
            },
        });
    }
}
```