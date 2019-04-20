To require authentication for all actions, you can create an authorization policy to be used everywhere:

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(o =>
    {
        var policy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
        o.Filters.Add(new AuthorizeFilter(policy));
    });
}
```

Or, you could create a `BaseProtectedController`and make all of your controllers to inherit from it:

```
[Authorize]
public abstract class BaseProtectedController : Controller
{
    ...
}
```

With all routes protected, you can make specific routes accessible to unauthenticated users with the `[AllowAnonymous]` attribute.
