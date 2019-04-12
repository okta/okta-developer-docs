To require authentication for all actions you can create an authorization policy to be used everywhere:

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

Also, you can opt to create a `BaseProtectedController` decorated with the `Authorize` attribute and make all your controllers to inherits it:

```
[Authorize]
public abstract class BaseProtectedController : Controller
{
    ...
}
```

For those actions/controllers that need to be accessible for non-authenticated users you will have to decorate them with the `AllowAnonymous` attribute. 
