Add an authorization policy to the `ConfigureServices` method in `Startup.cs` to require authentication for all actions:

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
