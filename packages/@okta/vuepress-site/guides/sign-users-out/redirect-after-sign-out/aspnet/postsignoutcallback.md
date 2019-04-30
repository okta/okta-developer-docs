Open the controller where you handle the sign out process and add a `PostSignOut` method:

```csharp
public class AccountController : Controller
{
    public ActionResult PostSignOut()
    {
        // Return to the home page after sign out
        return RedirectToAction("Index", "Home");
    }
}
```