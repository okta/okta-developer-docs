To require authentication for all actions, you can create an authorization policy in the `Startup.cs` class that you can use everywhere:

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
