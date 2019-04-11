To require authentication for all actions you can the `Authorize` attribute in the filter config to apply it to every controller.

```
public class FilterConfig
{
    public static void RegisterGlobalFilters(GlobalFilterCollection filters)
    {
        ...
        filters.Add(new AuthorizeAttribute());
    }
}
```

Also, you can opt to create a `BaseProtectedController`and make all your controllers to inherits it:

```
[Authorize]
public abstract class BaseProtectedController : Controller
{
    ...
}
```

For those actions/controllers that need to be accessible for non-authenticated users you will have to decorate them with the `AllowAnonymous` attribute. 
