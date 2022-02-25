To require authentication for all actions, you can create an authorization policy to be used everywhere:

```csharp
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

Or you can opt to create a `BaseProtectedController` and make all of your controllers inherit from it:

```csharp
[Authorize]
public abstract class BaseProtectedController : ControllerBase
{
    // ...
}
```

For those actions/controllers that need to be accessible for non-authenticated users, you have to decorate them with the `AllowAnonymous` attribute. 
