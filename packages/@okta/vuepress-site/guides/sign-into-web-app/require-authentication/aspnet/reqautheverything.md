To require authentication for all actions you can add the `Authorize` attribute in the filter config to apply it to every controller.

```csharp
public class FilterConfig
{
    public static void RegisterGlobalFilters(GlobalFilterCollection filters)
    {
        //...
        filters.Add(new AuthorizeAttribute());
    }
}
```

Or, you could create a `BaseProtectedController` and make all of your controllers inherit from it:

```csharp
[Authorize]
public abstract class BaseProtectedController : Controller
{
    //...
}
```

With all routes protected, you can make specific routes accessible to unauthenticated users with the `[AllowAnonymous]` attribute.