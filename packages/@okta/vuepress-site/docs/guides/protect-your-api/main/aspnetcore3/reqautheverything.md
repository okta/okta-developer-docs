To require authentication for all actions, add an authorization policy to the `ConfigureServices` method in `Startup.cs`:

```csharp
public void ConfigureServices(IServiceCollection services)
{

  services.AddAuthorization();

  services.AddMvc(o =>
  {
    var policy = new AuthorizationPolicyBuilder()
      .RequireAuthenticatedUser()
      .Build();
    o.Filters.Add(new AuthorizeFilter(policy));
  });
}
```
